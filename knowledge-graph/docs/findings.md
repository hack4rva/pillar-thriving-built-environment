> **Note:** This analysis was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../../docs/methodology.md) for details.

# Findings — What This Dataset Uniquely Shows

The corpus behind this knowledge graph is messy, incomplete, and local. Its
contribution to the wider conversation about built-environment transparency is
not any single fact about Richmond — it is that the dataset maps, **with
verifiable provenance, exactly where public money becomes untraceable**, and
gives ignorance the same data structure as knowledge. Every claim of the form
"X is unknown" below is itself a cited, queryable record.

Five findings fall out of that. Each is stated with the query result that
supports it; all queries run against the generated `data/` files (regenerate
with `make extract`; reproduction snippets at the end). Figures are as of the
2026-08-01 extraction: 296 nodes, 547 edges, 133 financial flows.

---

## 1. The needs-to-money join is empty — not underfunded, *unjoinable*

The graph holds **$982.3M** in documented project-level funding and **7**
documented resident needs. The number of financial edges touching any need:
**zero**. Only one need has any inbound edge at all, and it is coordination,
not money ("DPU Utilities is coordinating on the funding gap" —
`n:agency:richmond-dpu → n:need:fall-line-trail-funding-gap`).

The structural insight: the city organizes money by **asset** (a project row
in a CIP dashboard), residents articulate needs by **outcome** ("I can't tell
when my street gets swept"), and no join key between the two exists anywhere
in the public record. The transparency field knows the "crosswalk problem" in
the abstract; this dataset renders it as a two-column board with no lines on
it — the **Needs vs Money** view in the explorer is this finding as a picture.

Sources: `data/graph.json` (Need nodes and their edge sets);
`docs/problem_space/targeted_problem_statements.md` for the needs themselves.

## 2. The public record of a ~$1B capital program is one CSV deep

**100.0%** of edge-level documented dollars ($982.32M of $982.37M) and **162
of 296** entities trace their provenance to a single file:
`research/COR_CIP_Dashboard_projects.csv` — an export of one dashboard. The
only non-CIP dollar figure in the entire corpus is a $50K grant already
flagged as anomalous in the review queue (`data/review_queue.json`; it
concerns Harvard faculty, not Richmond infrastructure).

The finding is not "Richmond publishes a dashboard." It is that the entire
public evidentiary base for a billion-dollar program has a **single point of
failure**, and the graph can prove that because it kept provenance on
everything. If that dashboard disappears, the project-level public record of
the capital program disappears with it.

Sources: provenance `sourceDoc` distribution over `data/nodes.json` and
`data/edges.json`.

## 3. Money is visible at both ends and opaque in the middle

External research verified the aggregate sources of the capital budget — 64%
G.O. bonds, 28% federal/state/regional transportation funds, 8% cash
(evidence `ev:W-4`, flow `f:cip-sources-fy25-29`) — and the corpus documents
all 125 project costs. What exists nowhere: **which source funds which
project**. The same pattern repeats one level down: ARPA *allocations* are
published to the dollar ($154M city total; $16M Southside Community Center;
$20M Lucks Field — `ev:W-1`..`ev:W-3`) but *expenditures* are not.

Money is transparent at the moment of promise and opaque at the moment of
spending. The graph quantifies it: **131 of 133 financial flows have at least
one stage with an unknown amount — a 98% pipeline-opacity rate.** That single
number is a sharper transparency metric than most scorecards.

Sources: `data/financial_flows.json`;
`docs/financial-flow-methodology.md` (anti-double-counting rules that keep
this honest).

## 4. Fleet visibility is a property of who owns the asphalt, not of technology

VDOT already operates a public map of 7,000+ snow plows refreshing every two
minutes (`ev:W-10`, node `n:dataset:vdot-plow-map`). Richmond DPW is
*procuring* the identical telemetry — plow up/down and sander on/off via PTO
connections (OpenGov solicitation 100739, `ev:W-7`) — with no public-facing
layer. Same storm, same metro area: whether a resident can see the plow
depends on **which government maintains their street**.

"Transparency ends at the jurisdictional boundary" is a sharper framing than
"the city needs GPS," and it only emerges when the state precedent and the
city procurement sit in one graph.

Sources: `data/evidence.json` (`ev:W-7`, `ev:W-10`); the corpus's own GPS
constraint in `admin/evidence_log.md`.

## 5. Negative evidence is a first-class citizen

The corpus implied a RAISE/TIGER grant award; targeted research found **no
City of Richmond entry** in USDOT's FY2024 RAISE agreements and a **$40M
pending application** for the Fall Line Trail (`ev:W-9`). The dataset stores
that absence — with a source, an access date, and a confidence cap
(`reported_but_unverified`, because absence in one year's list is not proof
of absence).

Almost no civic dataset records "we looked and it wasn't there." Yet that is
the finding downstream researchers need most, because it is the one that
otherwise gets silently re-litigated forever. Here, negative results are
citable rows like any other.

Sources: `data/evidence.json` (`ev:W-9`); question `q:raise-tiger-details` in
`data/unanswered_questions.json` (status: answered).

---

## The meta-finding

Taken together: this is a city capital program where every claim — including
the claims of ignorance — carries a verifiable citation, so **"what we don't
know" is a queryable dataset rather than a complaint**. The Fog of War mode is
that sentence rendered: verified elements lit, unverified faded, explicit
unknowns as question markers in the dark. For practitioners, it converts "we
need more transparency" into five named choke points, each with the data that
would close it listed in [research-gaps.md](research-gaps.md).

## Reproducing the numbers

All figures derive from the committed `data/` files. Examples (run from
`knowledge-graph/`):

```bash
# Finding 1 — needs with financial inbound edges (expect 0 of 7)
node -e "
const g=require('./data/graph.json');
const needs=g.nodes.filter(n=>n.type==='Need');
const funded=needs.filter(n=>g.edges.some(e=>e.target===n.id&&e.financial));
console.log(needs.length,'needs,',funded.length,'with financial inbound edges');"

# Finding 2 — provenance concentration (expect research/COR_CIP_Dashboard_projects.csv on top)
node -e "
const g=require('./data/graph.json');const byDoc={};
for(const n of g.nodes){const d=n.provenance?.[0]?.sourceDoc||'none';byDoc[d]=(byDoc[d]||0)+1;}
console.log(Object.entries(byDoc).sort((a,b)=>b[1]-a[1]).slice(0,3));"

# Finding 3 — pipeline opacity rate (expect 131 of 133)
node -e "
const f=require('./data/financial_flows.json');
console.log(f.filter(x=>x.stages?.some(s=>s.amountUSD==null)).length,'of',f.length,
'flows have an unknown-amount stage');"
```

Caveats: these are findings about the **public record as captured in this
corpus plus targeted external research**, not about the City's internal
books. A funding-source ledger may exist internally; the finding is that it
is not public. Counts shift when the corpus or `extraction/records/` change —
re-run the queries after any re-extract rather than trusting this file's
numbers blindly.
