> **Note:** This summary was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../../docs/methodology.md) for details.

# Problem-Space Summary — pillar-thriving-built-environment

Plain-language summary of what this repository is about and what the knowledge graph
found. Every claim below is in the graph with file-level provenance; where the corpus
is silent, that is stated rather than guessed. Figures come from
`data/extraction_report.json` (regenerate with `make extract`).

## What problem is this repository trying to address?

Two documented problems, both about **visibility into Richmond public works**:

1. **Transportation project opacity** (`n:problem:project-opacity`): residents cannot
   easily find out what infrastructure project is happening on their street, why, or
   when it will finish. The City publishes a CIP dashboard of 125 funded projects, but
   the information is technical, scattered, and not searchable by address.
2. **Fleet operations invisibility** (`n:problem:fleet-invisibility`): residents cannot
   see when snow removal or street cleaning will reach them, and DPW supervisors lack
   route-completion visibility. A key constraint is documented, not assumed: **DPW's
   fleet GPS infrastructure is incomplete as of March 2026**, so no live-tracking
   solution is currently possible.

## Who is affected?

Documented affected groups: Richmond residents near active projects, residents needing
timely snow/street-cleaning information, residents with accessibility and
digital-literacy constraints (per `research/B5_users_accessibility.md`), DPW
communications staff absorbing repeated status inquiries, and DPW supervisors without
route visibility. The corpus does **not** quantify how many people are affected
(open question `q:inquiry-volume`).

## Who holds influence and resources?

City of Richmond (CIP capital budget, GeoHub open-data platform), Richmond DPW
(operations and communications), Richmond City Council (appropriations), the Central
Virginia Transportation Authority and VDOT (regional/state transportation funding, Fall
Line Trail), the U.S. federal government (ARPA, RAISE/TIGER grants), plus hackathon
partner organizations (Groundwork RVA, James River Association, Partnership for Smarter
Growth) who hold community relationships rather than money.

## The funding story

- **$982.3M in documented funding** across 125 CIP projects (CIP dashboard CSV, per-project
  costs). This is the money whose *destination* is known.
- **The money's origin: the corpus is silent, but external research (2026-08-01)
  verified the aggregate mix** from the City's FY2025 Proposed CIP Budget Council
  presentation — 64% general obligation bonds ($575M), 28% federal/state/regional
  transportation funds ($257.8M), 7% pay-as-you-go cash, 1% prior-year appropriations
  (FY2025–29 proposed; flow `f:cip-sources-fy25-29`). What remains genuinely unknown —
  and still modeled as an `UnknownEntity` feeding the CIP fund (flow
  `f:cip-budget-sources`) — is *which* sources fund each individual project.
- **ARPA**: three projects (Southside Community Center, Lucks Field Community Center,
  the Williamsburg Avenue CSO improvement) are documented in the corpus as *partially*
  ARPA-funded with no dollar split. External research closed most of this gap: the
  City's published ARPA spending plan allocates **$16M to Southside** and **$20M to
  Lucks Field**, within a **$154M total city ARPA allocation** ($78M of it to
  community centers). The Williamsburg CSO portion remains unknown.
- **Fall Line Trail**: CVTA and VDOT funding is documented, and so is a **funding gap**.
  External research sized it (reported figures): anticipated cost **>$400M** versus
  **~$280M raised** as of Oct 2024 — a gap on the order of **$120M+**, with CVTA the
  largest funder at $124.5M. This remains the clearest documented case of a need
  without enough money attached.
- **Federal RAISE/TIGER grants**: referenced via USASpending in the corpus with no
  confirmed award. External check: USDOT's FY2024 RAISE agreements contain **no City
  of Richmond award**; the City submitted a **$40M application** (Fall Line Trail),
  outcome unknown. Modeled as `reported_but_unverified` with the negative finding
  recorded.
- **~$78.5M disbursed (estimate)**: completed-phase projects assumed fully spent; the
  corpus contains no expenditure ledger, so this is labeled an estimate with its
  methodology, never presented as fact. (The verified ARPA figures are *allocations*,
  not expenditures — the same caveat applies.)
- **Documented ≠ delivered**: the pipeline never adds documented, proposed, and
  disbursed figures together, and externally verified upstream amounts live on flows
  rather than being added to the project-level total (see
  [financial-flow-methodology.md](financial-flow-methodology.md)).

## Where money stalls or disappears from view

- Between **source and the CIP fund**: origins undocumented (1 flow with unknown source).
- Between **project and beneficiary**: for 124 of 125 projects the corpus never names
  who benefits; flows end at the project node rather than inventing beneficiaries.
- **All 7 documented needs have no funding attached** — the needs in this corpus
  (address-level project lookup, plain-language descriptions, service-timing
  visibility, supervisor route visibility, inquiry deflection, equitable access,
  closing the Fall Line Trail gap) are needs for *information tools*, and no funding
  flow in the corpus targets them.
- **No outcomes are documented for any of the 133 funding flows** (`q:outcome-measurements`).

## Facts vs. proposals vs. hypotheses

The graph separates these by `evidenceStatus`: 755 graph elements are `documented`,
29 `externally_verified` (corpus claims confirmed against official external sources —
rva.gov, transportation.gov — via `admin/evidence_log.md` or the 2026-08-01 external
research), 16 `proposed` (hackathon solution patterns, not funded programs),
25 `reported_but_unverified`, 5 `inferred` (each with the inference stated),
5 `disputed`, 8 explicitly `unknown`. The notable disputed item:
`research/D3_data_grant_documentation.md`
describes a Harvard grant program, not Richmond — recorded as a data-quality anomaly
in the review queue, not silently dropped or blended in.

## What information is missing?

20 open questions are tracked in `data/unanswered_questions.json` and rendered in the
app's Open Questions tab. External research (2026-08-01) **answered 2** of them
(the Southside ARPA portion; the RAISE/TIGER award question) and **narrowed 7 more**
(CIP source mix, Fall Line gap size, GPS schema, cleaning-zone data, GeoHub
endpoints); answered questions stay listed with their answers. The full narrative is
in [research-gaps.md](research-gaps.md).
