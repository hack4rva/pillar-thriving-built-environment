> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../../docs/methodology.md) for details.

# Graph Ontology

This document defines the semantics of the knowledge graph generated into `data/`.
The machine-enforced version is [`data/schema/graph.schema.json`](../data/schema/graph.schema.json);
every generated record is validated against it (`make validate`).

## Node types

The schema accepts the full node-type vocabulary from the project specification. The
types actually **used** for this repository, and what they mean here, are:

| Type | Used for | Examples |
|------|----------|----------|
| `Problem` | A documented problem statement | Transportation Project Visibility, Fleet Operations Visibility |
| `Need` | A specific documented need of a population or staff group | "Residents need to find project info by address" |
| `Person` | Named individuals in a documented public/organizational role only | Chad Phillips (DPW GIS), Al Wiggins (DCAO Operations) |
| `Population` | A broad affected group | Richmond residents |
| `ConstituentGroup` | A narrower stakeholder group | DPW supervisors, DPW communications staff, residents with accessibility needs |
| `Organization` | Entities not clearly government/nonprofit | GRTC Transit, contractors (when named) |
| `GovernmentAgency` | Federal, state, regional, and city agencies | Richmond DPW, VDOT, CVTA, U.S. Treasury |
| `Nonprofit` | Nonprofit partners | Groundwork RVA, James River Association, Partnership for Smarter Growth |
| `Program` | An ongoing government program | Capital Improvement Program, snow removal, street cleaning |
| `Project` | A discrete capital project | The 125 CIP dashboard projects |
| `Policy` | Adopted plans and policies | Richmond 300 Master Plan, Winter Maintenance Plan 2025-2026 |
| `Proposal` | A proposed intervention that does not exist yet | Hackathon MVP shapes (project explorer, snow priority lookup) |
| `Fund` | A named funding source or pool | ARPA, City of Richmond CIP budget, CVTA regional funds |
| `Budget` | A budget allocation attached to a project or program | Individual CIP project budgets are stored on FUNDS edges rather than separate Budget nodes (see below) |
| `Service` | A delivered public service | Snow removal service, street cleaning service, 311 |
| `GeographicRegion` | Places | City of Richmond, named neighborhoods/corridors when load-bearing |
| `Outcome` | A measured or claimed result | (rare in this corpus; most outcomes are *missing*, which is itself recorded) |
| `Evidence` | An entry in `evidence_log.md` | E-001 … E-034, D-00x, R-00x |
| `Claim` | A material claim made in the corpus that is not yet an evidence-log entry | "GPS fleet infrastructure is incomplete" |
| `ResearchQuestion` | An open question | From `research/93_missing_information_gaps.md` and evidence-log "Missing" entries |
| `Risk` | A documented risk | R-001 … R-004, G-section risks |
| `DecisionPoint` | A documented decision that gates money or scope | e.g. VDOT authorization to advertise for bidding |
| `Dataset` | A concrete data source (repo-specific addition) | CIP CSV, GeoHub, Socrata portal, WMP PDF |
| `UnknownEntity` | An explicit placeholder when the corpus does not document a source/destination of money (repo-specific addition) | "Unknown funding source(s) for CIP projects" |

**Repo-specific additions.** `Dataset` is added because the corpus's central concern is
which public data sources exist and can be trusted; datasets participate in edges
(`PUBLISHES`, `DEPENDS_ON`, `HAS_EVIDENCE`). `UnknownEntity` is added so that undocumented
funding sources/destinations appear as explicit first-class nodes instead of being
silently omitted (a core requirement of the project brief).

## Edge types

The schema accepts the full edge vocabulary from the specification. Three types were added:

- `MANAGES` — a Person manages a Project (from the CIP dashboard "Manager" column).
- `PUBLISHES` — an agency publishes a Dataset.
- `ADDRESSES` — a Program/Proposal/Project addresses a Problem or Need (clearer than
  overloading `IMPLEMENTS`, which is reserved for implementing a Policy).

Financially meaningful edges (`FUNDS`, `GRANTS_TO`, `APPROPRIATES_TO`, `PASSES_THROUGH`,
`DISTRIBUTES_TO`, `CONTRACTS_WITH`, `DONATES_TO`, `INVESTS_IN`) carry a `financial`
object (amount, mechanism, status, restrictions) and, when they belong to a multi-stage
flow, a `flowId` pointing into `financial_flows.json`.

## Required attributes

Every node: `id`, `type`, `label`, `repo`, `evidenceStatus`, `provenance[]`.
Every edge: `id`, `source`, `target`, `type`, `description`, `repo`, `evidenceStatus`,
`confidence`, `provenance[]`.

Every provenance entry: `sourceDoc` (repo-relative path or URL) and `sourceLocation`
(line range such as `lines 24-32`, a CSV row key such as `row OBJECTID=32`, a PDF page,
or a heading), plus an optional verbatim `excerpt`. The extraction pipeline verifies
line-range excerpts against the actual source files at build time; records that fail
verification are diverted to the review queue instead of the graph.

## Evidence classification

Every material node and edge carries exactly one `evidenceStatus`:

| Status | Meaning here |
|--------|--------------|
| `documented` | Stated in a repository source-of-truth file (problem statements, CIP CSV, evidence log Confirmed) |
| `externally_verified` | Confirmed against an official external source with URL (evidence log "Confirmed" entries with URLs) |
| `proposed` | A proposal/intervention that does not exist yet (MVP shapes, notification systems) |
| `reported_but_unverified` | Reported in working-session notes or research reports without verification (evidence log "Likely"/"Unverified") |
| `inferred` | A relationship the extraction inferred from context rather than an explicit statement |
| `hypothetical` | Hypotheses to test (e.g. `research/91_top_10_hypotheses_to_test.md`) |
| `disputed` | Contradicted by another source in the corpus, or of disputed relevance (e.g. `research/D3_data_grant_documentation.md`) |
| `unknown` | Existence is implied but nothing else is documented (UnknownEntity nodes and their edges) |

Rendering rule (enforced in the visualization): solid edges = documented/externally_verified;
dashed = proposed; dotted = inferred/hypothetical/reported_but_unverified; warning
treatment = disputed; hollow "?" nodes = unknown. Proposed or inferred funding is never
drawn with the visual weight of documented funding.

## Financial statuses

`proposed | approved | committed | disbursed | partially_disbursed | completed | canceled | unknown`

For CIP projects, the corpus documents a project **cost** (budget) and a **phase**
(Planning/Design, Pre-Construction, Construction, Completed). We map: Completed phase →
flow status `completed`; Construction → `partially_disbursed` (construction underway
implies partial expenditure — labeled an estimate); other phases → `committed` (the CIP
lists funded projects). The mapping is an explicit, documented estimate, flagged
`rollup.isEstimate = true`.

## Alias handling

`extraction/aliases.json` maps every alias (abbreviations, informal names, legal names)
to one canonical node ID. Original wording is preserved in the node's `aliases` array and
in provenance excerpts. Example: "DPW", "Public Works", "Richmond DPW" →
`n:agency:richmond-dpw` (label: "Richmond Department of Public Works (DPW)").

## Temporal semantics

`temporal.start` / `temporal.end` are ISO dates or the corpus's coarser wording
("Fall 2026", "Summer 2027") normalized to a sortable `{year, seasonOrdinal}` form by the
pipeline where possible; the original string is always kept. `temporal.asOf` records when
a status narrative was true (the CIP export is quarterly). "TBD" and "N/A" are preserved
as `null` with the original string in `attrs` — never converted to fabricated dates.

## Determinism

Node IDs are `n:<kind>:<slug>` derived from canonical names; edge IDs are `e:<12-hex>`
from a SHA-256 of `source|target|type|sourceDoc`; flow IDs are human-assigned stable
slugs. Re-running extraction on unchanged sources reproduces identical IDs (verified by
tests). Only `meta.generatedAt` / `extractedAt` timestamps change between runs.
