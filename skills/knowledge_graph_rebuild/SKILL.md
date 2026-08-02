---
name: knowledge_graph_rebuild
description: Recreate the evidence-backed knowledge graph and 3D funding explorer from scratch — for this pillar or ported to a different pillar repo
user-invocable: true
allowed-tools: Bash(npm:*), Bash(make:*), Bash(node:*)
metadata:
  author: built-environment
---

> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../../docs/methodology.md) for details.

# Rebuild the Knowledge Graph / 3D Funding Explorer

This skill is the recipe for the `knowledge-graph/` app: an evidence-backed
knowledge graph of the pillar's problem and funding landscape, rendered as an
interactive 3D explorer. Use it to rebuild the app from scratch in this repo,
or to port it to a different pillar repo that has its own research corpus.

Just running the existing app is a different skill: `skills/run_knowledge_graph/SKILL.md`.
Filling gaps with web research afterwards is also separate: `skills/external_research_gap_fill/SKILL.md`.

## When To Use

- A different pillar repo wants its own knowledge graph + funding explorer.
- `knowledge-graph/` was lost, corrupted, or needs a ground-up rebuild.
- You need to understand *why* the pipeline is shaped the way it is before
  making structural changes to it.

## Inputs

- A pillar research corpus: markdown reports, an evidence log, structured data
  (CSVs), and problem-space documents.
- Node.js 20+ and a Chromium-capable machine for validation.

## Outputs

- `knowledge-graph/` app: extraction pipeline, generated `data/`, Vite +
  TypeScript UI, tests, headless-Chrome checks, and docs.
- All commands wired through a `Makefile` (`install`, `extract`, `validate`,
  `dev`, `test`, `build`, `preview`, `screenshots`).

## Non-negotiable principles

These are the rules that make the graph trustworthy. Everything else is
implementation detail.

1. **Every material node, edge, and flow carries provenance** — source
   document, location, and a verbatim excerpt. The pipeline verifies excerpts
   against source files at extraction time (`verifyProvenance` in
   `extraction/lib.js`): repo files are checked `exact`/`moved`/`missing`;
   URLs are `external`; excerpt-less records are `unchecked`.
2. **Every element is classified by evidence status**: `documented`,
   `externally_verified`, `proposed`, `reported_but_unverified`, `inferred`,
   `hypothetical`, `disputed`, `unknown`. The UI encodes status with dash
   patterns, opacity, and badges — never color alone. Policy:
   `knowledge-graph/docs/evidence-policy.md`.
3. **Deterministic IDs.** Nodes are `n:<kind>:<slug>`, edges are a 12-hex hash
   of `(source, type, target, discriminator)`. Two extraction runs over the
   same corpus produce byte-identical output. Never use random or
   auto-incrementing IDs.
4. **Money lives on flows, and upstream money is never added to project
   totals.** Multi-stage funding is modeled as first-class `FinancialFlow`
   objects with per-stage amounts, rollups (`originatingUSD`, `committedUSD`,
   `disbursedUSD`, `reachingFinalUSD`), and explicit `unknowns`. When an
   upstream source (e.g. an ARPA allocation) funds projects already counted at
   project level, record it as its own flow and state in the rollup
   methodology that it is context, not additive. Rules:
   `knowledge-graph/docs/financial-flow-methodology.md`.
5. **Unknowns are first-class data.** Missing amounts stay `null` (never
   guessed), open questions live in `unanswered_questions.json`, uncertain
   records go to `review_queue.json`, and `UnknownEntity` nodes represent
   things the corpus says exist but cannot identify.
6. **Privacy**: named individuals appear only in their public professional
   roles; never extract contact details (the CIP parser deliberately drops
   manager emails/phones).

## Architecture (pinned)

Vite + vanilla TypeScript; rendering via `3d-force-graph` (Three.js/WebGL,
d3-force-3d layout). Decision rationale and alternatives considered:
`knowledge-graph/docs/architecture.md`.

Pinned dependencies (from `knowledge-graph/package.json`): `3d-force-graph`
1.80.0, `three` 0.185.1, `three-spritetext` 1.10.0, `d3` 7.9.0, `d3-sankey`
0.12.3; dev: `vite` 8.2.0, `typescript` 7.0.2, `vitest` 4.1.10, `playwright`
1.62.1, `ajv` 8.20.0, `ajv-formats` 3.0.1, `csv-parse` 7.0.1.

## Build order

Work through the phases in order; each has a verification gate. When porting
to another pillar, copy the "reuse verbatim" files and rewrite the
"pillar-specific" ones (see the porting checklist at the end).

### Phase 0 — Corpus inventory

Read before building: the repo README, `AGENTS.md`, the evidence log, the
problem-space docs, and the data-source inventory. Produce a list of:

- structured data files worth a dedicated parser (e.g. a CIP projects CSV)
- documents to mine for curated records (problems, needs, orgs, claims, funding)
- every explicit "unknown" or open question stated in the corpus
- named people, and what is public about their roles

Gate: you can name the corpus's central problem(s), its funding story, and its
top 10 unknowns without inventing anything.

### Phase 1 — Scaffold

Create `knowledge-graph/` with `package.json` (scripts: `extract`, `validate`,
`dev`, `build`, `preview`, `test`, `screenshots`), `vite.config.ts`,
`tsconfig.json`, `Makefile`, `.gitignore` (`node_modules/`, `dist/`). Copy
these from this repo — they contain nothing pillar-specific.

Gate: `make install && make dev` serves an empty page without errors.

### Phase 2 — Ontology and schema

Reuse `knowledge-graph/docs/ontology.md` and
`knowledge-graph/data/schema/graph.schema.json` verbatim; extend only if the
new corpus needs node/edge types that genuinely don't fit. Core node types:
Problem, Need, PopulationGroup, Person, Organization, GovernmentAgency,
Program, Project, Fund, Grant, Legislation, Location, Claim, Evidence,
EvidenceRecord, ResearchQuestion, Risk, Dataset, DecisionPoint, UnknownEntity.
Core edge types: AFFECTS, ADDRESSES, FUNDS, APPROPRIATES_TO, PASSES_THROUGH,
ADMINISTERS, MANAGES, OPERATES, PARTNERS_WITH, LOCATED_IN, HAS_EVIDENCE,
PUBLISHES, ASSOCIATED_WITH, BLOCKED_BY.

Gate: schema validates against Ajv with `ajv-formats`, and every attribute in
the ontology doc exists in the schema.

### Phase 3 — Extraction pipeline

Two kinds of input, one merge step:

- **Deterministic parsers** (`extraction/parsers/*.js`) for structured
  sources. Each exports a function returning `{ nodes, edges, flows }` built
  with the `makeNode`/`makeEdge` factories from `extraction/lib.js`. These are
  pillar-specific — rewrite them for the new corpus.
- **Curated records** (`extraction/records/*.json`): `entities.json`,
  `relationships.json`, `flows.json`, `questions.json`, `review.json`, and
  optionally `external.json`. These are hand-written JSON with full provenance
  — the human-judgment layer. Rewrite for the new corpus; keep the shapes.

`scripts/extract.js` orchestrates: run parsers, load curated records, resolve
aliases via `extraction/aliases.json` (canonical ID per alias — e.g. "DPW" →
`n:agency:richmond-dpw`), merge/deduplicate nodes, verify all provenance,
detect broken node references, compute metrics
(`extraction/metrics.js`), and write `data/` plus a copy under `public/data/`
for the app: `graph.json`, `nodes.json`, `edges.json`, `financial_flows.json`,
`evidence.json`, `unanswered_questions.json`, `review_queue.json`,
`extraction_report.json`.

Gate: `make extract` reports zero `missing` provenance and zero broken
references; run twice and `git diff data/` is empty (determinism).

### Phase 4 — Financial flows

For every funding relationship: an edge with a `financial` block (amount,
mechanism, status `proposed|approved|committed|disbursed|delivered|unknown`,
restrictions) and, for anything multi-stage, a `FinancialFlow` with ordered
stages, a rollup, and explicit `unknowns`. Apply principle 4
(anti-double-counting) ruthlessly: edge-level sums must equal the
project-level documented total, with upstream source flows kept out of it.

Gate: `make validate` passes its financial sanity checks (stage amounts never
exceed origin, rollup percentages in range, flow endpoints exist).

### Phase 5 — Validation

`scripts/validate.js`: Ajv schema validation of every generated file,
referential integrity (edge endpoints, flow stages, `relatedNodeIds`,
`flowId`s), and the financial sanity rules. This file is pillar-agnostic —
copy it.

Gate: `make validate` exits 0.

### Phase 6 — Visualization

Copy `src/` wholesale — it is data-driven and contains almost nothing
pillar-specific (grep for the repo name and the handful of quick-pick node IDs
in `src/modes.ts` and `src/overview.ts`). The modes, and what each must do:

| Mode | Behavior |
|------|----------|
| Overview | Default landing dashboard: totals, biggest projects, pipeline, unfunded needs; click-through into the network |
| Money Flow | Follow-the-money: highlight downstream financial paths from a source; animated particles along funded edges |
| Beneficiary | Pick a population group; report programs serving it, funding reaching it, unmet needs |
| Problem Space | Pick a problem; needs, affected groups, interventions, risks, open questions |
| Timeline | Year scrubber over temporal validity |
| Network | Free 3D exploration with search, filters, expand/collapse, path tracing |
| Fog of War | Uncertainty made visible: verified elements lit, unverified faded, unknowns as question markers in the dark |
| Needs vs Money | Two-column orphan board: documented needs vs funding flows, with connection lines and an explicit callout when needs are unfunded |

Plus the drawer (entities/flows tables with CSV/JSON export, questions,
data-quality report, review queue), detail panel with Sankey per flow, a 2D
fallback (`graph2d.ts`), and the visual language in `src/visual.ts` (shape +
icon per node type, dash pattern per evidence status — never color alone).

Gate: `make dev`, click through every mode with the browser console open; no
errors.

### Phase 7 — Tests and Chrome validation

- `tests/lib.test.js` — ID determinism, money/date parsing, provenance
  verification (pillar-agnostic; adjust fixture paths).
- `tests/parsers.test.js` — one suite per parser, asserting counts and
  spot-checking known rows (pillar-specific).
- `tests/graph.test.js`, `tests/scenarios.test.js` — generated-data integrity
  and fixture scenarios (copy; scenarios fixture is generic).
- `scripts/screenshot.js` — Playwright headless Chrome: boots the built app,
  walks every mode, exercises search/filters/selection/2D/keyboard/responsive,
  captures screenshots to `docs/screenshots/`, fails on console errors.

Gate: `make test` and `make screenshots` both fully pass.

### Phase 8 — Documentation

Write (or adapt) in `knowledge-graph/docs/`: `problem-space-summary.md`,
`ontology.md`, `architecture.md`, `data-methodology.md`,
`financial-flow-methodology.md`, `evidence-policy.md`, `research-gaps.md`.
Every count stated in docs and README must match `extraction_report.json` —
re-check after any re-extract.

## Porting checklist (different pillar)

Reuse verbatim: `package.json` (rename), `vite.config.ts`, `tsconfig.json`,
`Makefile`, `.gitignore`, `data/schema/graph.schema.json`,
`extraction/lib.js`, `extraction/metrics.js`, `scripts/validate.js`,
`scripts/screenshot.js` (trim pillar-specific checks), all of `src/`,
`tests/lib.test.js`, `tests/graph.test.js`, `tests/scenarios.test.js` +
fixtures, `docs/ontology.md`, `docs/architecture.md`, `docs/evidence-policy.md`.

Rewrite for the new corpus: `extraction/parsers/*`, `extraction/records/*`,
`extraction/aliases.json`, `tests/parsers.test.js`, quick-picks in
`src/modes.ts` / `src/overview.ts`, and the narrative docs
(`problem-space-summary.md`, `data-methodology.md`,
`financial-flow-methodology.md`, `research-gaps.md`, `README.md`).

## Guardrails

- Never invent programs, datasets, amounts, or City positions. If the corpus
  doesn't say it, the graph doesn't contain it — model the gap instead
  (`UnknownEntity`, `null` amount, open question).
- Never present `proposed`/`hypothetical` elements visually as facts.
- Keep generated `data/` committed so the app runs without re-extraction, but
  treat it as build output: resolve merge conflicts by regenerating, not by
  hand-editing.
