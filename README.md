<div align="center">

# A Thriving and Sustainable Built Environment — Decision Funnel

Richmond Civic Hackathon • March 27–29, 2026

[![Pillar](https://img.shields.io/badge/Pillar-Built_Environment-4c68d7)](#)
[![Stage](https://img.shields.io/badge/Stage-Decision_Funnel-00a38f)](#)
[![Focus](https://img.shields.io/badge/Focus-From_Idea_%E2%86%92_MVP-ff7a59)](#)

</div>

This is a guided decision environment for teams working on the A Thriving and Sustainable Built Environment pillar. It's designed to help you quickly choose a credible, source‑linked, weekend‑buildable MVP—and avoid fantasy software.

Journey stages: Land → Orient → Choose → Research → Compare MVPs → Lock Scope → Build → Validate → Demo → Hand‑off

Three questions to answer fast: 1) What problem are we actually solving? 2) Can we credibly demo by Sunday? 3) What should we refuse to build?

---

## The Challenge

**→ Full detail in [`CHALLENGE.md`](CHALLENGE.md).** Read it before anything else — it defines the two problems, the top blue sky vision, data constraints, how Pillar Award weights use the shared rubric, and optional per-problem prompts to help your team think about the categories (not a second judge rubric).

### Problem 1: Transportation Project Visibility & Discoverability — 25/32 — Strong

> How might we use technology to improve how Richmond residents find and understand transportation and infrastructure projects happening in their neighborhoods so that project information is clear, centralized, and easy to track?

Build toward: City Infrastructure Explorer Map (address search → project status) · "What's Happening Here?" mobile lookup tool · SMS lookup service · Opt-in notification system

⚠ Do not replace ArcGIS or DPW program pages — surface and translate them. Technical descriptions must become plain language.

---

### Problem 2: Fleet Operations Visibility & Public Communication — 22/32 — Needs work

> How might we use technology to improve how Richmond residents and DPW staff track the progress of services like snow removal and street cleaning?

Build toward: Zone-based schedule display · Fleet route progress dashboard using synthetic GPS schema · Notification proof-of-concept

⚠ GPS infrastructure is NOT complete as of the hackathon date. Any fleet MVP must use mock/synthetic data. Never claim real-time vehicle locations.

---

### Top Blue Sky: Reimagining Safer Streets — 22/27 — Strong

> How might we use technology to help residents, advocates, and City planners identify and prioritize locations for transportation safety improvements?

Map publicly available crash data against existing transportation project locations. Label everything as exploratory — never claim to guide official resource allocation.

---

### Pillar Award Rubric

| Category | Weight | Dominant question |
|----------|--------|-------------------|
| **Impact** | **5** | Does this directly address one of the two problems above? |
| User Value | 4 | Is there a specific real user? Does the prototype improve their experience? |
| Feasibility | 3 | Could this be piloted by DPW or a City partner within a year? |
| Innovation | 3 | Fresh thinking on infrastructure transparency or fleet ops? |
| Execution | 3 | Does a working demo exist? Is the flow coherent? |
| Equity | 3 | Does it reach residents with limited digital access or language barriers? |

Official rubric — category definitions, scoring anchors, and judge-facing guidance: [`../RUBRIC.md`](../RUBRIC.md)

---

## Table of Contents

0. [The Challenge](#the-challenge)
1. Quick Start
2. Repo Map
3. Guardrails
4. Decision Phases
   - Phase 0: Landing & Framing
   - Phase 1: Rapid Orientation
   - Phase 2: Problem Selection
   - Phase 3: Research Spin‑Up
   - Phase 4: Opportunity Framing
   - Phase 5: Scope Lock
   - Phases 6–9: Build → Validate → Demo
5. Verification Workflow
6. Hackbot Helper
7. Appendix: Pillar Context & Rubric

---

## Quick Start

Do these first 15–30 minutes to get moving:

1) Read: `CHALLENGE.md` — the two problems, top blue sky, Pillar Award weights, and optional per-problem rubric prompts (start here, not QUICKSTART.md)
2) Read: `QUICKSTART.md`
2) Skim: `00_core/00_pillar_overview.md` and `01_problem_space/02_targeted_problem_statements.md`
3) Capture a 5‑bullet "Working Direction" using `99_templates/working_direction_note.md`
4) Decide your path:
   - Path A — already have a rough problem: jump to Phase 2 and Phase 4
   - Path B — need help choosing: start at Phase 1 and proceed in order

---

## Repo Map

| Directory | Contents |
|-----------|----------|
| `research/` | 70 deep research reports (core corpus) |
| `00_core/` | Pillar overview and MAP alignment |
| `01_problem_space/` | Scored problem statements |
| `02_data/` | Data source inventory and index |
| `03_artifacts/` | Synthesized artifacts (journeys, benchmark scan, prototype recommendations) |
| `04_build_guides/` | MVP shapes, architectures, demo advice |
| `05_prompts/` | Research prompts and runners |
| `99_templates/` | Team and project templates |
| `skills/` | Hackbot skill definitions |

- Evidence tracker: `evidence_log.md`
- Data index: `02_data/00_index.md`
- Source inventory (CSV): `02_data/source_inventory.csv`

## Navigation Files

| File | Purpose |
|------|---------|
| `CORPUS_GUIDE.md` | Canonical orientation for humans and AI agents navigating the research corpus |
| `manifest.json` | Machine-readable index of all significant repository files |
| `research/index.json` | Machine-readable index of all 70 research reports with key_terms |
| `research/INDEX.md` | Human-readable table of contents for the research directory |
| `MAINTENANCE.md` | How to add, update, and synchronize reports and metadata |

---

## Guardrails

- Pick one user, one workflow, and one credible data/doc base.
- Avoid GPS dependency — fleet GPS infrastructure is explicitly incomplete as of March 2026.
- Never claim to show real-time vehicle locations.
- Always cite official sources. Log every claim in `evidence_log.md`.
- Keep AI constrained to explanation, retrieval, translation, and guidance.

---

## Decision Phases

<details open>
<summary><strong>Phase 0 — Landing & Framing</strong></summary>

Goal: understand what this repo is and how to use it without "exploring" for two hours.

What this pillar is about:
- Infrastructure project transparency, fleet operations visibility, and resident awareness of neighborhood construction and services under A Thriving and Sustainable Built Environment.

Success patterns:
- Source‑linked, narrow scope, credible demo, explicit limits.

Anti‑patterns:
- Real-time GPS claims; DPW internal system integration; sustainability compliance tools; private data needs.

Admin quick links:
- Research hub: `research_notes.md`
- Evidence tracker: `evidence_log.md`
- Source inventory (CSV): `02_data/source_inventory.csv`
- Artifacts: see Repo Map below

Call to action: choose Path A or Path B.

</details>

<details open>
<summary><strong>Phase 1 — Rapid Orientation (20–30 min)</strong></summary>

Read just enough to build a shared mental model:
- `QUICKSTART.md`
- `00_core/00_pillar_overview.md`
- `00_core/01_map_alignment.md`
- `01_problem_space/02_targeted_problem_statements.md`

Filter for:
- user groups; pain points; what the City actually cares about
- problems that are software‑shaped vs policy‑shaped vs infrastructure‑shaped

Team checkpoint — Working Direction (use `99_templates/working_direction_note.md`):

```
## Working Direction
- Pillar: A Thriving and Sustainable Built Environment
- Candidate problem:
- Likely user:
- Why it matters:
- Why it seems weekend‑buildable:
- Biggest uncertainty:
```

</details>

<details>
<summary><strong>Phase 2 — Problem Selection (30–45 min)</strong></summary>

Files:
- `01_problem_space/01_bluesky_problem_statements.md`
- `01_problem_space/02_targeted_problem_statements.md`
- `05_prompts/01_problem_selection_prompt.md`

Decision rule — choose only if the problem has:
- a real user and understandable workflow
- a plausible public data/document base
- a demoable artifact by Sunday
- no GPS infrastructure dependency (or a clear mock-data plan if fleet-related)

Output: Decision Memo (`99_templates/decision_memo.md`)

```
## Chosen Problem
## User
## Why this one
## Why not the others
## Risks
```

</details>

<details>
<summary><strong>Phase 3 — Research Spin‑Up (60–90 min)</strong></summary>

Goal: gather just enough evidence to avoid fantasy software.

Use the runner to execute targeted prompts and capture findings:
- Perplexity runner: `05_prompts/perplexity_runner/` (see its README)
- Research plan: `05_prompts/research/01_master_research_prompt.txt`
- Data index: `02_data/00_index.md`

Evidence Log structure (log in `evidence_log.md`):

```
## Evidence Log
### Confirmed
### Likely but unverified
### Missing
### Useful datasets
### Useful source documents
### Prior art
### Risks
```

Tip: parse URLs from API metadata; don't ask for URLs in prompt text.

</details>

<details>
<summary><strong>Phase 4 — Opportunity Framing (45–60 min)</strong></summary>

Compare at least two MVP shapes before choosing.

Files:
- `04_build_guides/01_mvp_shapes.md`
- `04_build_guides/02_recommended_architectures.md`
- `03_artifacts/prototype_recommendations.md`

Output:

```
## MVP Options
1. …
2. …
3. …

## Recommended MVP
## Why
## What we are explicitly not building
```

</details>

<details>
<summary><strong>Phase 5 — Scope Lock (45–60 min)</strong></summary>

Pin down must‑haves, mockables, data, AI role, limits, and demo path.

Files:
- `99_templates/project_one_pager_template.md`

Key sentence:

> By Sunday, we will show a prototype that helps [user] do [specific thing] using [specific data/docs], without pretending to do [dangerous overclaim].

</details>

<details>
<summary><strong>Phases 6–9 — Build → Validate → Demo</strong></summary>

Build:
- Break work into FE/BE/data/content; assign source verification and demo owner.
- Keep AI constrained to explanation, retrieval, translation, and guidance.
- If building fleet-related tool, use mock data — never promise live GPS.

Validate:
- Use risk review prompts and red flags; check source links and clarity.
- Verify any project timeline claims against official DPW sources.

Demo:
- Follow `04_build_guides/05_demo_advice.md`.

</details>

---

## Verification Workflow

1) Add official URLs and dates in `evidence_log.md`; flip status to Verified.
2) Mirror verified sources into `02_data/source_inventory.csv` with access mode and key fields.
3) After verification, promote findings into the Executive Brief inside `research_notes.md`.

---

## Hackbot Helper

You can use Hackbot to reconstruct context, run research, and shape an MVP.

- Boot prompt: `HACKBOT_BOOT_PROMPT.md`
- Team skills: `skills/**/SKILL.md` (repo_memory, problem_scoping, research_runner, dataset_mapper, opportunity_mapper, mvp_designer, risk_review, demo_coach, repo_librarian, continuity_planner)
- Research corpus skills: (research_corpus_navigation, cross_report_synthesis, evidence_grounded_answering, report_update_protocol)
- Team profile (recommended): `99_templates/team_profile_template.md`

Hackbot resources:

| Resource | File |
|----------|------|
| Boot prompt | `HACKBOT_BOOT_PROMPT.md` |
| Agent specification | `AGENTS.md` |
| Corpus guide | `CORPUS_GUIDE.md` |
| Full file manifest | `manifest.json` |

Notes:
- Hackbot never invents government programs or GPS data availability. It cites official sources and encourages verification.
- For best results, create a team profile so Hackbot can map tasks to roles and follow your communication preferences.

---

## Appendix: Pillar Context & Rubric

<details>
<summary>Open context from the Pillar Committee session (February 26, 2026)</summary>

Working Session: February 26, 2026, 10:00 AM – 12:00 PM

Departmental champion: Al Wiggins (DCAO Operations), Daniel Klein
Nonprofit partners: Nathan Burrell (Groundwork RVA), Justin Doyle or Shannon Orcutt (James River Association), Richard Hankins (Partnership for Smarter Growth)

Rubric Score Summary
| Statement                              | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | Total | Band        |
|----------------------------------------|----|----|----|----|----|----|----|----|----|-------|-------------|
| Transportation Project Visibility      | —  | —  | —  | —  | —  | —  | —  | —  | 25    | Strong      |
| Fleet Operations Visibility            | —  | —  | —  | —  | —  | —  | —  | —  | 22    | Needs work  |

Dimension key: D1 Clarity | D2 Scope | D3 Data readiness | D4 Champion | D5 Population & impact | D6 Operating environment | D7 Success criteria | D8 Accessibility

Quick‑kill flags: both targeted statements lack a continuation pathway. Fleet Operations also triggers D3=2 — GPS infrastructure explicitly incomplete.

Targeted Statement 1: Transportation Project Visibility & Discoverability (Score 25/32 — Strong)
- Problem, context, constraints, success, and gaps are in `01_problem_space/02_targeted_problem_statements.md`.

Targeted Statement 2: Fleet Operations Visibility & Public Communication (Score 22/32 — Needs work)
- Problem, context, constraints, success, and gaps (significant D3=2) are in `01_problem_space/02_targeted_problem_statements.md`.

Blue Sky Statements
- See `01_problem_space/01_bluesky_problem_statements.md`.

Prioritized Actions Before March 27, 2026
1) Pre-stage mock GPS data or schema description for Fleet Operations (Tier 1 urgent)
2) Name departmental champion: Al Wiggins (DCAO Operations), Daniel Klein
3) Link ArcGIS URLs and open data catalog datasets into Transportation Visibility statement
4) Specify output types for each targeted statement

</details>
