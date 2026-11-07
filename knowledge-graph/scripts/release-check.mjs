/**
 * Release check for the multi-pillar deployment.
 *
 * Loads every dataset the site links to, in a real browser, switches through
 * each view the pillar offers, and reports what a visitor would actually
 * encounter: console errors, failed requests, missing copy, and how long the
 * thing takes to become interactive. The per-pillar unit tests check the data;
 * this checks the thing that ships.
 *
 *   node scripts/release-check.mjs [baseUrl]
 */
import { chromium } from 'playwright';

const BASE = process.argv[2] ?? 'http://localhost:4173';
const PILLARS = [
  'thriving-built-environment', 'thriving-neighborhoods', 'thriving-families',
  'city-storytelling', 'thriving-inclusive-communities', 'thriving-economy',
  'thriving-city-hall', 'richmond',
];

const browser = await chromium.launch();
const failures = [];

for (const pillar of PILLARS) {
  const page = await browser.newPage();
  const errors = [];
  const badRequests = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('requestfailed', (r) => badRequests.push(`${r.url()} ${r.failure()?.errorText}`));
  page.on('response', (r) => { if (r.status() >= 400) badRequests.push(`${new URL(r.url()).pathname} ${r.status()}`); });

  const t0 = Date.now();
  await page.goto(`${BASE}/knowledge-graph/index.html?pillar=${pillar}`, { waitUntil: 'domcontentloaded' });
  // __kg is assigned on the last line of boot, so it is the interactive signal.
  await page.waitForFunction(() => window.__kg?.nodeCount > 0, { timeout: 90000 })
    .catch(() => errors.push('never became interactive'));
  const loadMs = Date.now() - t0;

  const shell = await page.evaluate(() => ({
    title: document.querySelector('#pillar-name')?.textContent?.trim(),
    subtitle: document.querySelector('#app-subtitle')?.textContent?.trim(),
    nodes: window.__kg?.nodeCount ?? 0,
    // Capability gating hides views a pillar has no data for, so only the
    // visible ones are the offer.
    views: [...document.querySelectorAll('#mode-switch button')]
      .filter((b) => b.offsetParent !== null)
      .map((b) => b.dataset.mode),
    canvas: Boolean(document.querySelector('#graph3d canvas')),
  }));

  // Every offered view has to survive being opened.
  const viewProblems = [];
  for (const mode of shell.views) {
    const before = errors.length;
    await page.evaluate((m) => document.querySelector(`#mode-switch button[data-mode="${m}"]`).click(), mode);
    await page.waitForTimeout(600);
    const help = await page.evaluate(() => document.querySelector('#mode-help')?.textContent?.trim() ?? '');
    if (errors.length > before) viewProblems.push(`${mode}: threw`);
    if (help.length < 40) viewProblems.push(`${mode}: no explanation shown`);
  }

  const problems = [];
  if (errors.length) problems.push(`console: ${[...new Set(errors)].slice(0, 3).join(' | ')}`);
  if (badRequests.length) problems.push(`requests: ${[...new Set(badRequests)].slice(0, 3).join(' | ')}`);
  if (!shell.title) problems.push('no pillar title rendered');
  if (!shell.canvas) problems.push('no 3D canvas');
  if (loadMs > 15000) problems.push(`slow: ${(loadMs / 1000).toFixed(1)}s to interactive`);
  problems.push(...viewProblems);
  if (problems.length) failures.push({ pillar, problems });

  console.log(`${problems.length ? 'FAIL' : 'ok  '} ${pillar.padEnd(31)} `
    + `${String(shell.nodes).padStart(5)} nodes ${String(loadMs).padStart(6)}ms  `
    + `${shell.views.length} views: ${shell.views.join(' ')}`);
  console.log(`      ${shell.title} — ${shell.subtitle ?? ''}`);
  for (const p of problems) console.log(`      ! ${p}`);
  await page.close();
}

await browser.close();
console.log(failures.length ? `\n${failures.length} dataset(s) with problems` : '\nall datasets clean');
process.exit(failures.length ? 1 : 0);
