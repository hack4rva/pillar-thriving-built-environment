> **Note:** This document was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../../docs/methodology.md) for details.

# Financial Flow Methodology

How money is modeled, which numbers are facts versus estimates, and the exact
assumptions behind every computed figure. Source of numbers:
`data/financial_flows.json` and the `metrics` block of `data/extraction_report.json`.

## The model

Every funding flow is a first-class record with:

- **stages**: an ordered list of `from → to` hops, each with its own mechanism, amount
  (or `null`), evidence status, and note. Multi-stage example:
  `US federal government → ARPA → City of Richmond → Southside Community Center → Southside residents`.
- **status**: `proposed` / `committed` / `partially_disbursed` / `completed` / `unknown`.
  CIP dashboard phases map to statuses as follows: `Completed` → completed,
  `Construction` → partially_disbursed, pre-construction phases → committed (the
  problem statement describes the dashboard as "125 *funded* projects", so
  pre-construction money is committed, not proposed).
- **restrictions**: recorded where documented (e.g. ARPA federal eligibility rules);
  `restricted: true` with an explanatory string.
- **rollup**: originating / committed / disbursed / reaching-final amounts plus
  `pctReachingFinal`, always carrying `isEstimate` and a `methodology` string when any
  component is not directly documented.
- **unknowns**: an explicit list of what the corpus does not say about this flow.

Edges that carry money reference their flow via `flowId`, so the 3D view, the Sankey
inspector, and the tables all resolve to the same record.

## Computed figures and their assumptions

| Figure | Value (current extract) | How it is computed | Assumptions |
|--------|------------------------|--------------------|-------------|
| Documented funding | $982,322,153 | Sum of per-project CIP costs + other documented amounts | None — every dollar cites a source cell/line |
| Proposed funding | $0 | Sum of `proposed`-status amounts | Hackathon solution patterns carry no dollar figures, so nothing accrues |
| Disbursed (estimate) | $78,468,766 | Sum of costs of **completed-phase** projects | Completed projects assumed fully spent; **the corpus has no expenditure ledger**, so this is an estimate and labeled as such everywhere it appears |
| Reaching final beneficiaries | not computable | — | Only 1 of 131 flows has a documented/inferable final beneficiary stage; computing a percentage would be fiction, so the app reports "not computable" with the reason |
| Administrative overhead | not computable | — | No administrative cost is documented anywhere in the corpus |
| Flows with unknown source | 1 | Flows whose first stage starts at an `UnknownEntity` | The CIP fund's source mix (bonds/state/federal) is undocumented |
| Flows with unknown destination | 1 | Flows ending at an `UnknownEntity` | Federal RAISE/TIGER money referenced without a confirmed Richmond award |

## Rules the pipeline enforces (tested in `tests/`)

1. **Documented, proposed, and disbursed totals are never summed together.** They are
   different epistemic categories, not components of one number.
2. **No invented endpoints.** If the corpus does not say where money comes from or
   goes, the flow starts/ends at an explicit `UnknownEntity` node or simply stops at
   the last documented hop. The one inferred beneficiary hop (Southside Community
   Center → Southside residents) is marked `inferred` with its reasoning.
3. **Every estimate carries its methodology** in `rollup.methodology`; schema
   validation fails otherwise.
4. **Conflicting amounts** become `disputed` records with both figures preserved
   (fixture-tested; the current corpus contains no live amount conflict).
5. **Unknown amounts are `null`, never zero** — zero is a documented value, null is
   absence. UI renders null as "unknown".

## Funding gaps

A *gap* is a documented need with no funding flow attached. Current extract: **all 7
documented needs are unfunded**, including the one explicitly financial gap in the
corpus — the Fall Line Trail funding gap, whose existence is documented but whose size
is not (`q:fall-line-gap-size`). Gaps are listed in the Data Quality tab and in
`extraction_report.json → metrics.needsWithNoFunding`.
