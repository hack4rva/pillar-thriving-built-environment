---
name: external_research_gap_fill
description: Answer the knowledge graph's open questions with targeted web research and integrate findings via extraction/records/external.json without corrupting corpus-derived totals
user-invocable: true
allowed-tools: Bash(npm:*), Bash(make:*), Bash(node:*)
metadata:
  author: built-environment
---

> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../../docs/methodology.md) for details.

# External Research Gap Fill

The knowledge graph deliberately records what the research corpus does *not*
know: open questions in `data/unanswered_questions.json`, `null` amounts,
`UnknownEntity` nodes, and flows with unknown endpoints. This skill is the
protocol for closing those gaps with targeted web research and folding the
findings back into the graph — with the same provenance discipline as the
rest of the pipeline, and without inflating corpus-derived financial totals.

Prerequisite: a working `knowledge-graph/` app (see
`skills/knowledge_graph_rebuild/SKILL.md`). Web access via the Parallel
skills (`/parallel:web-search`, `/parallel:web-extract`) or equivalent.

## When To Use

- After extraction, when `unanswered_questions.json` has open questions that
  official public sources could plausibly answer.
- When a claim in the graph sits at `reported_but_unverified` and a primary
  source might confirm or refute it.
- Before a demo, to upgrade the graph's weakest load-bearing claims.

## Outputs

- `extraction/records/external.json` — the single file that carries all
  external findings. Never edit generated `data/` directly.
- Regenerated `data/`, updated docs, and (if warranted) new tests.

## Process

### Step 1 — Pick targets

Read `data/unanswered_questions.json` and `docs/research-gaps.md`. Prioritize
questions that are (a) load-bearing for the funding story, (b) answerable
from official sources, (c) cheap to check. Skip questions that require
internal agency data — mark those as needing City/agency guidance instead.

### Step 2 — Search, preferring official sources

Source hierarchy, which determines the evidence status you may assign:

| Source type | Max status |
|-------------|-----------|
| Government site, adopted budget, press release, procurement portal, federal award list | `externally_verified` |
| Project organization's own materials, meeting transcripts | `reported_but_unverified` |
| News coverage (including news quoting officials) | `reported_but_unverified` |
| Blogs, social media, aggregators | do not use |

Quote excerpts **verbatim** from the retrieved page. Record the URL and access
date in every provenance entry (`"note": "accessed YYYY-MM-DD via web search"`).
Negative evidence (e.g. "no award to this city appears in the FY2024 list") is
a finding too — record it, but cap it below `confirmed`, since absence in one
list is not proof of absence.

### Step 3 — Write `external.json`

One file, seven kinds of block (all optional). Follow the shapes in the
existing `extraction/records/external.json`:

- `evidence`: web evidence records (`id` like `ev:W-1`, claim, status, URL
  provenance). The pipeline turns these into `Evidence` nodes.
- `entities` / `relationships`: genuinely new nodes and edges the corpus
  lacked (e.g. an upstream Fund, a precedent Dataset).
- `flows`: new upstream financial flows (see the money rule below).
- `nodeUpdates`: upgrade an existing node's `evidenceStatus`, append a dated
  note, add URL provenance — while **preserving** the original corpus
  provenance.
- `flowUpdates`: set previously-null amounts, update stages/rollup/unknowns,
  append provenance.
- `questionAnswers`: set `status` (`answered` | `partially_answered`) and an
  `answer` on existing questions. Answered questions stay in the dataset —
  they document what the corpus itself did not know.

### Step 4 — Apply the money rule (anti-double-counting)

This is the most common way to corrupt the graph. When external research
reveals an upstream allocation (e.g. a federal grant total that funds projects
already counted at project level):

- Put the amount on a **flow** (new upstream flow, or a stage/rollup of an
  existing one), not on edges — keep edge-level `amountUSD: null` with the
  amount referenced via `flowId`.
- State in the rollup `methodology` that the flow is upstream context and
  **not additive** to project-level documented totals.
- The pipeline's `totalDocumentedFundingUSD` must be unchanged by upstream
  findings — assert this in a test (see `tests/external.test.js`).
- Amounts you looked for but did not find stay `null`, with a note saying the
  search happened and came up empty.

### Step 5 — Re-extract, validate, test

```bash
cd knowledge-graph
make extract     # external blocks are merged; URL provenance counts as "external"
make validate
make test        # extend tests/external.test.js for new findings
make screenshots # answered/partial question badges appear in the drawer
```

Check the extraction report: `provenanceVerification.external` should equal
the number of URL-provenance records, and `externalResearch` metrics
(questions answered/narrowed, evidence records, research date) should match
what you did.

### Step 6 — Sync documentation

Update, with the same numbers everywhere:

- `docs/research-gaps.md` — add a dated "gaps closed or narrowed" section;
  move resolved items out of the open lists.
- `docs/financial-flow-methodology.md` — document new upstream flows and why
  they are not additive.
- `docs/evidence-policy.md`, `docs/data-methodology.md`,
  `docs/problem-space-summary.md`, `README.md` — refresh counts and the
  funding narrative.

## Guardrails

- Never upgrade a status above what the source hierarchy allows; when in
  doubt, `reported_but_unverified`.
- Never let external findings silently overwrite corpus provenance — external
  provenance is *appended*.
- Never fabricate an excerpt; if you cannot quote the page, do not cite it.
- Allocations are not expenditures: say which one the source documents, and
  keep the other as an explicit unknown.
- Respect the pillar's data-safety rules (e.g. no publishing of sensitive
  operational details) even when a source exposes them.
