#!/usr/bin/env node
// Chrome validation + screenshots (plan: "Playwright Chrome validation").
// Serves the built app from dist/, drives it in headless Chromium, checks the
// validation checklist, and writes screenshots to docs/screenshots/.
// Run `npm run build` first.
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, extname } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..', 'dist');
const SHOTS = resolve(import.meta.dirname, '..', 'docs', 'screenshots');
const PORT = 8932;
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };

if (!existsSync(resolve(ROOT, 'index.html'))) {
  console.error('dist/ not found — run `npm run build` first.');
  process.exit(1);
}
mkdirSync(SHOTS, { recursive: true });

const server = createServer((req, res) => {
  const path = resolve(ROOT, '.' + (req.url === '/' ? '/index.html' : req.url.split('?')[0]));
  if (!existsSync(path)) { res.writeHead(404); res.end('nf'); return; }
  res.writeHead(200, { 'Content-Type': MIME[extname(path)] ?? 'application/octet-stream' });
  res.end(readFileSync(path));
}).listen(PORT);

const results = [];
const check = (name, ok, detail = '') => {
  results.push({ name, ok, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
};

// Default headless Chromium uses SwiftShader for WebGL, which works on this VM.
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1680, height: 1050 } });
const consoleErrors = [];
page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
page.on('pageerror', (err) => consoleErrors.push(String(err)));

const shot = (name) => page.screenshot({ path: resolve(SHOTS, name) });
const settle = (ms = 1200) => page.waitForTimeout(ms);

// -------------------------------------------------------------- initial load
await page.goto(`http://localhost:${PORT}/`);
await page.waitForFunction(() => window.__kg?.nodeCount > 0, null, { timeout: 20000 });
await settle(9000); // let the force layout settle and the camera fit
const stats = (await page.textContent('#stats'))?.trim() ?? '';
check('initial load', /nodes/i.test(stats) || stats.length > 0, stats.split('\n')[0]);
check('WebGL renderer active', /webgl/i.test(stats), stats.match(/webgl[^\s·|]*/i)?.[0] ?? 'renderer info not in stats');
await page.click('#btn-reset-camera');
await settle(1500);
await shot('01-overview-explore.png');

// -------------------------------------------------------------------- search
await page.fill('#search', 'Fall Line Trail');
await page.press('#search', 'Enter');
await settle();
const detail = (await page.textContent('#detail-content')) ?? '';
check('search selects a node', /fall line trail/i.test(detail));
await shot('02-search-selection.png');

// --------------------------------------------------------------- money flow
await page.click('#mode-switch button[data-mode="money"]');
await settle(400);
const pick = page.locator('#mode-help [data-goto-node]').first();
check('money mode shows quick picks', (await pick.count()) > 0);
await pick.click();
await settle(1500);
const moneyDetail = (await page.textContent('#detail-content')) ?? '';
check('money mode follows funding downstream', /fund|flow|amount|\$/i.test(moneyDetail));
await shot('03-money-flow.png');

// -------------------------------------------------------- flow + sankey view
await page.click('#drawer-tabs button[data-tab="flows"]');
await settle(300);
const flowBtn = page.locator('#drawer-content [data-goto-flow]').first();
check('funding flow table renders', (await flowBtn.count()) > 0);
await flowBtn.click();
await settle(1000);
const hasSankey = (await page.locator('#detail-content svg').count()) > 0;
check('flow inspector renders Sankey SVG', hasSankey);
await shot('04-flow-sankey.png');

// -------------------------------------------------------------- beneficiary
await page.click('#mode-switch button[data-mode="beneficiary"]');
await settle(400);
await page.locator('#mode-help [data-goto-node]').first().click();
await settle(1200);
const benDetail = (await page.textContent('#detail-content')) ?? '';
check('beneficiary report renders', /program|serve|need|funding/i.test(benDetail));
await shot('05-beneficiary.png');

// ------------------------------------------------------------ problem space
await page.click('#mode-switch button[data-mode="problem"]');
await settle(400);
await page.locator('#mode-help [data-goto-node]').first().click();
await settle(1200);
const probDetail = (await page.textContent('#detail-content')) ?? '';
check('problem-space report renders', /affected|intervention|question|need/i.test(probDetail));
await shot('06-problem-space.png');

// ------------------------------------------------------------------ timeline
await page.click('#mode-switch button[data-mode="timeline"]');
await settle(400);
check('timeline bar visible in timeline mode', await page.locator('#timeline-bar').isVisible());
await page.locator('#timeline-slider').fill('2026.5');
await page.locator('#timeline-slider').dispatchEvent('input');
await settle(1200);
const tlabel = (await page.textContent('#timeline-label'))?.trim();
check('timeline scrub updates label', /2026/.test(tlabel ?? ''), tlabel);
await shot('07-timeline.png');
await page.click('#mode-switch button[data-mode="explore"]');
await settle(400);

// ---------------------------------------------------------------- path trace
await page.evaluate(() => {
  window.__kg.selectNode('n:agency:richmond-dpw', false);
  window.__kg.selectNode('n:region:city-of-richmond', true);
});
await settle(1200);
const hint = (await page.textContent('#graph-hint'))?.trim() ?? '';
check('path tracing between two nodes', /path traced/i.test(hint), hint);
await shot('08-path-trace.png');
await page.keyboard.press('Escape');
await settle(300);

// ------------------------------------------------------------------- filters
const firstFilter = page.locator('#filters input[type="checkbox"]').first();
check('filter checkboxes render', (await page.locator('#filters input[type="checkbox"]').count()) > 10);
await firstFilter.uncheck();
await settle(800);
const hintAfterFilter = (await page.textContent('#graph-hint'))?.trim() ?? '';
check('filters change visible node count', hintAfterFilter !== hint, hintAfterFilter);

// ---------------------------------------------------- empty state (no nodes)
await page.evaluate(() => {
  document.querySelectorAll('#filters input[type="checkbox"]').forEach((cb) => {
    if (cb.checked) cb.click();
  });
});
await settle(1000);
const emptyHint = (await page.textContent('#graph-hint'))?.trim() ?? '';
check('empty-filter state handled gracefully', /no nodes match/i.test(emptyHint), emptyHint);
await shot('09-empty-state.png');
await page.click('#btn-reset-all');
await settle(1500);
const resetHint = (await page.textContent('#graph-hint'))?.trim() ?? '';
check('reset restores the graph', /entities shown/i.test(resetHint), resetHint);

// ----------------------------------------------------------------- tables UI
await page.click('#drawer-tabs button[data-tab="entities"]');
await settle(300);
check('entity table renders rows', (await page.locator('#drawer-content [data-goto-node]').count()) > 10);
await page.click('#drawer-tabs button[data-tab="quality"]');
await settle(300);
const quality = (await page.textContent('#drawer-content')) ?? '';
check('data-quality report renders', /provenance|funding|unknown/i.test(quality));
await shot('10-data-quality.png');
await page.click('#drawer-tabs button[data-tab="questions"]');
await settle(300);
check('open questions render', /\?/.test((await page.textContent('#drawer-content')) ?? ''));
await page.click('#drawer-tabs button[data-tab="review"]');
await settle(300);
check('review queue renders', ((await page.textContent('#drawer-content')) ?? '').length > 50);

// --------------------------------------------------------------- 2D fallback
await page.click('#btn-2d');
await settle(2500);
check('2D fallback renders SVG graph', (await page.locator('#graph2d svg circle').count()) > 10);
await shot('11-2d-fallback.png');
await page.click('#btn-2d');
await settle(300);

// ------------------------------------------------------- keyboard navigation
await page.keyboard.press('/');
check('"/" focuses search box', await page.evaluate(() => document.activeElement?.id === 'search'));
await page.keyboard.press('Escape');

// ---------------------------------------------------------------- responsive
await page.setViewportSize({ width: 920, height: 720 });
await settle(1500);
check('responsive layout at 920px', await page.locator('#graph3d canvas').isVisible());
await shot('12-responsive-920px.png');

// -------------------------------------------------------------------- report
const fatalErrors = consoleErrors.filter((e) => !/favicon/i.test(e));
check('no console errors', fatalErrors.length === 0, fatalErrors.slice(0, 3).join(' | '));

await browser.close();
server.close();

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed. Screenshots in docs/screenshots/.`);
process.exit(failed.length ? 1 : 0);
