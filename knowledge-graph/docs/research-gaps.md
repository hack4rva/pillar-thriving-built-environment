> **Note:** This document was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../../docs/methodology.md) for details.

# Research Gaps

Questions the knowledge graph **cannot** answer from this repository, and what data
would close each gap. Machine-readable version: `data/unanswered_questions.json`
(20 questions, also shown in the app's Open Questions tab, linked to the graph nodes
they concern).

## Gaps closed or narrowed by external research (2026-08-01)

Targeted web research (`extraction/records/external.json`, evidence records ev:W-1
through ev:W-11) resolved or narrowed several gaps. Answered questions stay in the
open-question list with an `answered`/`partially_answered` status — they document
what the corpus itself could not say.

| Question | Outcome |
|----------|---------|
| `q:arpa-portion` | **Answered.** The City's ARPA spending plan allocates **$16M** to the Southside Community Center and **$20M** to Lucks Field, within a **$154M** total city allocation ($78M to community centers) — rva.gov/arp (official) |
| `q:raise-tiger-details` | **Answered (negative).** No City of Richmond award in USDOT's FY2024 RAISE agreements; the City submitted a **$40M application** (Fall Line Trail); Warner/Kaine provided a $2M earmark |
| `q:cip-funding-mix` | **Partially answered.** Aggregate FY2025–29 proposed CIP mix: **64% G.O. bonds ($575M), 28% federal/state/regional transportation funds ($257.8M), 7% cash, 1% prior-year** — official Council presentation. Per-project attribution still unknown |
| `q:fall-line-gap-size` | **Partially answered (reported).** Cost anticipated **>$400M** vs **~$280M raised** (Oct 2024) → gap on the order of **$120M+**; CVTA is the largest funder at $124.5M |
| `q:gps-schema`, `q:e-031` | **Partially answered.** No vendor is public, but the City's DPW telematics solicitation (OpenGov project 100739) specifies plow up/down and sander on/off via PTO, real-time + logged tracking — a documented schema starting point |
| `q:cleaning-zone-data`, `q:e-033` | **Partially answered.** rva.gov publishes the residential sweeping schedule (12+ named routes, date windows, map links); the Dec 2025 sweeping pause is confirmed by an official press release |
| `q:e-030` | **Partially answered.** Richmond GeoHub exposes ArcGIS REST FeatureServer endpoints (e.g. RichmondCityRoads); no dedicated DPW transportation-projects layer identified |

Bonus context found: VDOT already runs a public statewide plow-tracking map (7,000+
plows, two-minute updates) — a working precedent for the fleet-visibility problem,
though it excludes Richmond city streets, which DPW plows (~240 staff, 75 trucks,
~1,800 lane miles per DPW in Jan 2026).

## Financial gaps still open

| Gap | What would close it |
|-----|---------------------|
| **Per-project funding sources** (`q:cip-funding-mix`, remaining half): which of the 125 projects are bond-, grant-, or cash-funded | Per-project funding-source field from the CIP system / CAFR |
| **ARPA expenditure vs allocation**: allocations are now verified; actual spending to date is not | Federally required SLFRF quarterly/annual reports for Richmond |
| **Outcomes** (`q:outcome-measurements`): zero outcome measurements exist for any of the 133 funding flows | Any post-completion evaluation, 311 volume deltas, usage data |
| **Beneficiary accounting**: 124 of 125 project flows end at the project because the corpus never names beneficiaries | Project-level service-area or beneficiary documentation |
| **RAISE outcome**: whether the City's $40M application was awarded in a later cycle | Future USDOT award announcements / USASpending.gov |

## Operational data gaps (from `research/93_missing_information_gaps.md` and E-030…E-034)

The GPS **vendor** remains unidentified (the solicitation is public; the award is
not), and the corpus's core constraint stands: GPS is **incomplete as of March
2026** — any fleet MVP must use synthetic or schedule data. Still missing:
machine-readable snow/street-cleaning zone boundaries (the schedule is published as
an HTML table with per-route map links), P1/P2 snow-route line geometries (only
street name lists exist), and anonymized 311 request data with monthly inquiry
volumes.

## Governance and people gaps

- **Daniel Klein's affiliation** (`q:daniel-klein-role`): listed as a champion with no
  organization; in the review queue rather than guessed.
- **Post-hackathon sponsor** (`q:champion-commitment`): no DPW sponsor commitment is
  documented.
- **Plain-language standard** (`q:plain-language-standard`): unknown whether the City
  has an official plain-language vocabulary for public works.
- **Richmond 300 mapping** (`q:richmond-300-mapping`): CIP projects are not mapped to
  the comprehensive-plan goals they implement.
- **Resident device usage / digital literacy** (`q:device-usage`): unquantified,
  though accessibility research (B5) depends on it.

## Data-quality anomalies (review queue)

- **D3 report mismatch** (`r:d3-report-anomaly`, `q:d3-report-provenance`):
  `research/D3_data_grant_documentation.md` documents a *Harvard* grant program, not
  Richmond grant documentation. Classified `disputed`; the intended Richmond research
  for that corpus slot is missing.
- **"City of Richmond GIS" vs DPW** (`r:city-gis-vs-dpw`): dataset ownership wording
  is ambiguous between the GIS office and DPW; aliased provisionally, flagged.
- **CVTA's role in closing the trail gap** (`r:cvta-funder-question`): whether CVTA is
  expected to close the Fall Line Trail gap is not stated; modeled as `ADDRESSES`
  with reduced confidence.

## What this means for graph completeness

Provenance coverage is 100% and referential integrity is clean, so the graph is
*internally* sound — but it can only be as complete as the corpus plus the verified
external findings. The honest summary after external research: **destinations of
money are well documented (125 projects, dollar-precise); the aggregate origin mix
is now externally verified (bonds/grants/cash), and two ARPA allocations are
dollar-precise — but per-project origins, beneficiaries, and outcomes remain mostly
absent.** The remaining unknowns are per-project attribution and expenditure data,
which only City systems (CIP accounting, SLFRF reports) can provide.
