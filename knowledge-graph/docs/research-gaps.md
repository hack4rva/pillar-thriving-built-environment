> **Note:** This document was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../../docs/methodology.md) for details.

# Research Gaps

Questions the knowledge graph **cannot** answer from this repository, and what data
would close each gap. Machine-readable version: `data/unanswered_questions.json`
(20 questions, also shown in the app's Open Questions tab, linked to the graph nodes
they concern).

## Financial gaps (the biggest blind spots)

| Gap | What would close it |
|-----|---------------------|
| **CIP funding mix** (`q:cip-funding-mix`): the corpus never states what mix of city bonds, state, and federal money funds the $982M CIP budget or any individual project | City adopted budget documents / CAFR; per-project funding-source field from the CIP system |
| **ARPA portions** (`q:arpa-portion`): three projects are "partially funded through ARPA" with no dollar split | City ARPA allocation reports (federally required SLFRF reporting) |
| **Fall Line Trail gap size** (`q:fall-line-gap-size`): a funding gap is documented to exist; its size and who will close it are not | CVTA/VDOT project finance documents |
| **RAISE/TIGER awards** (`q:raise-tiger-details`): referenced but no confirmed Richmond award in the corpus | A USASpending.gov query for City of Richmond DOT awards — externally verifiable today |
| **Outcomes** (`q:outcome-measurements`): zero outcome measurements exist for any of the 131 funding flows | Any post-completion evaluation, 311 volume deltas, usage data |
| **Beneficiary accounting**: 124 of 125 project flows end at the project because the corpus never names beneficiaries | Project-level service-area or beneficiary documentation |

## Operational data gaps (from `research/93_missing_information_gaps.md` and E-030…E-034)

GeoHub layer names and REST endpoints for DPW projects; the GPS vendor and schema
being installed (the corpus documents that GPS is **incomplete as of March 2026** —
any fleet MVP must use synthetic or schedule data); snow/street-cleaning zone
boundaries and structured schedules; P1/P2 snow-route line geometries (only street
name lists exist); anonymized 311 request data and monthly inquiry volumes.

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
*internally* sound — but it can only be as complete as the corpus. The honest summary:
**destinations of money are well documented (125 projects, dollar-precise); origins,
beneficiaries, and outcomes are mostly absent.** Closing the financial gaps above
would convert one `unknown` source node and one `unknown` destination node into real
entities and make percentage-reaching-beneficiaries computable for the first time.
