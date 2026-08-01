> **Note:** This document was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../../docs/methodology.md) for details.

# Data Methodology

How the graph in `data/` was produced, what was automated versus manually curated, and
how it was verified. The companion documents are [ontology.md](ontology.md) (what the
node/edge types mean) and
[financial-flow-methodology.md](financial-flow-methodology.md) (how amounts are
computed).

## Pipeline overview

`make extract` runs `scripts/extract.js`, which is deterministic and uses **no LLM at
runtime**. Two kinds of input feed the graph:

### 1. Deterministic parsers (`extraction/parsers/`)

Structured files are parsed mechanically; re-running always yields the same output.

| Parser | Source file | Produces |
|--------|-------------|----------|
| `cip_csv.js` | `research/COR_CIP_Dashboard_projects.csv` | 125 `Project` nodes with costs/phases/completion dates, `Person` (project manager) nodes, `FUNDS`/`MANAGES`/`LOCATED_IN` edges, one financial flow per project, ARPA flows where the description mentions ARPA |
| `evidence_log.js` | `evidence_log.md` | `Evidence` records for E-/D-/R- entries, `ResearchQuestion` and `Risk` nodes |
| `source_inventory.js` | `02_data/source_inventory.csv` | `Dataset` nodes and `PUBLISHES`/`ASSOCIATED_WITH` edges |

### 2. Curated extraction records (`extraction/records/`)

Prose content (problem statements, research reports, stakeholder descriptions) cannot
be parsed mechanically, so entities, relationships, flows, and questions extracted
from it are recorded as **hand-curated JSON records**. Curation is not trust-based:
every record carries provenance (`sourceDoc`, `sourceLocation`, `excerpt`), and at
build time `verifyProvenance()` re-reads the source file and confirms the quoted
excerpt actually exists there.

### 3. External research records (`extraction/records/external.json`)

Targeted web research (performed 2026-08-01) against the corpus's open questions,
recorded as curated JSON with **URL provenance**: every finding carries the source
URL, a verbatim excerpt from the retrieved page, and an access date. Classification
is source-based:

- Official government sources (rva.gov pages and PDFs, transportation.gov award
  lists) → `externally_verified`, evidence status `confirmed`.
- Project-organization and news figures (falllinetrail.org, Richmond BizSense, WTVR)
  → evidence status `likely`; graph elements stay `reported_but_unverified`.

External records can add nodes/edges/flows, attach evidence to existing claims
(`HAS_EVIDENCE`), upgrade a claim's evidence status, enrich flow stages with verified
amounts, and attach answers to open questions (`status: answered | partially_answered`
plus an `answer` string — questions are annotated, never removed). Updates append
URL provenance; they never overwrite corpus provenance.

Verification outcomes (from `extraction_report.json`):

- `exact` (190): excerpt found at the cited location.
- `moved` (0): excerpt found elsewhere in the file — flagged, location updated in report.
- `missing` (0): excerpt not found — the record is **rejected into the review queue**,
  never added to the graph.
- `unchecked` (2): records whose provenance points at a whole file/dataset rather than
  quotable text (e.g. the CSV itself).
- `external` (23): URL provenance from external research — not file-verifiable at
  build time; the excerpt and access date are recorded for human re-verification.

This means curated content cannot silently drift from its sources: editing a research
file breaks verification loudly at the next extract. External findings are the one
exception (a web page can change after the access date), which is why they are
counted separately and carry access dates.

## Normalization

- **Deterministic IDs**: nodes are `n:<kind>:<slug-of-canonical-name>`; edges are
  `e:<12-hex>` hashed from source + target + type + sourceDoc. Re-extraction is stable,
  so diffs of `data/` are meaningful.
- **Alias resolution** (`extraction/aliases.json`): "DPW", "Richmond DPW", and
  "Richmond Department of Public Works" resolve to one node; same for CVTA, VDOT,
  GRTC, etc. Aliases are stored on the node and searchable in the app.
- **Merging**: when a parser and a curated record produce the same node ID, attributes
  merge; conflicting descriptions are surfaced as warnings rather than overwritten.
- **Contradiction handling**: conflicting claims become `disputed` elements plus a
  review-queue item (e.g. the D3 report anomaly) instead of picking a winner.

## Privacy

The CIP CSV contains project managers' emails and phone numbers. The pipeline keeps
the manager's **name and public role** (they are named public officials performing
public duties on a public dashboard) and **drops emails and phone numbers entirely** —
they appear nowhere in `data/`. No other personal information exists in the corpus.

## Validation

- `make validate` (`scripts/validate.js`): Ajv validation of every output against
  `data/schema/graph.schema.json`, referential integrity (every edge endpoint and flow
  stage endpoint must exist), and financial sanity rules (documented and proposed
  totals never mixed; rollups marked `isEstimate` must carry a methodology string).
- `make test`: 54 Vitest tests covering ID determinism, money/date parsing, provenance
  verification behavior, parser outputs against ground truths in the raw files, the
  generated graph, external-research integration (classification, anti-double-counting,
  question annotation), and fixture scenarios (complete path, proposed path, disputed
  flow, unknown destination, multi-intermediary, partial disbursement, conflicting
  amounts).

## Known limitations

- Curated records cover the *material* entities and claims in the 70-report corpus,
  not every sentence; recall is bounded by curation effort. Coverage priorities were
  the problem statements, evidence log, stakeholder lists, and every financial mention.
- `sourceLocation` granularity for markdown is line ranges, which can shift if research
  files are edited; provenance verification catches this (`moved`/`missing`).
- Nothing is fetched from the live web **at extract time**; external findings were
  gathered once (2026-08-01), recorded with URLs, excerpts, and access dates in
  `extraction/records/external.json`, and are replayed deterministically by the
  pipeline. Web pages can change after their access date; re-verification is a human
  step.
