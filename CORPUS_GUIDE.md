> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](docs/methodology.md) for details.

# Research Corpus Guide

**A Thriving and Sustainable Built Environment Pillar — Richmond Civic Hackathon**

This file is the canonical orientation document for both human readers and AI agents using this research corpus. Read it before diving into individual reports.

---

## What This Corpus Is

This repository contains a structured research corpus on Richmond's built environment problem space — infrastructure project transparency, fleet operations visibility, and resident awareness of neighborhood construction and public works services — organized to support a weekend civic hackathon. It includes:

- **70 deep research reports** generated via Parallel.ai (pro processor) from the prompt corpus in `05_prompts/research/` (in `research/`) — sections **A–I** (Richmond pillar core), plus **J–Q** (cross-domain transparency, service tracking, data models, simulation, architecture, and synthesis)
- **Evidence-synthesized artifacts** (in `03_artifacts/`)
- **Data source inventory** (in `02_data/`)
- **Build and demo guides** (in `04_build_guides/`)
- **Skills** — executable procedural guides for AI agents (in `skills/`)
- **Templates** — team and project scaffolding (in `99_templates/`)

The corpus is grounded in publicly verifiable claims about Richmond. It does not contain invented data, unverified program descriptions, or fabricated citations.

---

## Canonical Source of Truth

| Priority | File | What It Contains |
|----------|------|-----------------|
| 1 (highest) | `research/[SECTION][N]_*.md` | Primary research reports — authoritative content |
| 2 | `evidence_log.md` | Verified claims with official URLs |
| 3 | `03_artifacts/*.md` | Evidence-synthesized artifacts (research notes, journeys, recommendations) |
| 4 | `02_data/` | Data source inventory with access details |
| 5 (lowest) | Index and manifest files | Navigation aids — not authoritative for claims |

**Rule:** Navigation aids (README, index.json, manifest.json, CORPUS_GUIDE.md) reduce search scope. They are not substitutes for reading original reports. Before making substantive claims, read the source report.

---

## How the Corpus Is Organized

### Top-Level Directories

```
research/         <- 70 deep research files (the core corpus)
03_artifacts/     <- synthesized artifacts (research notes, journeys, recommendations)
02_data/          <- data source inventory and index
04_build_guides/  <- MVP shapes, architectures, demo advice
00_core/          <- pillar overview and MAP alignment
01_problem_space/ <- problem statements (scored)
skills/           <- agent skill definitions
99_templates/     <- team and project templates
evidence_log.md   <- root-level verified claims tracker
```

### Research Section Structure

The `research/` directory is organized into labeled sections:

| Section | Topic | Files |
|---------|-------|-------|
| `00–01` | Context & Framing | 2 files |
| `90–93` | Cross-Cutting Analysis | 4 files |
| `A` | Problem Landscape | A1–A5 |
| `B` | Users & Stakeholders | B1–B5 |
| `C` | Services & Programs | C1–C5 |
| `D` | Data Sources | D1–D5 |
| `E` | Prior Art & Benchmarks | E1–E5 |
| `F` | Opportunities | F1–F5 |
| `G` | Risks & Guardrails | G1–G5 |
| `H` | MVP Feasibility | H1–H5 |
| `I` | Demo Guidance | I1–I5 |
| `J` | Transparency theory & asymmetry | J1–J3 |
| `K` | Outages, work orders, smart-city visibility, predictive restoration | K1–K4 |
| `L` | Data models (requests, assets, workforce/events, external context) | L1–L4 |
| `M` | Simulation (ETA/queues, routes, outage duration) | M1–M2 |
| `N` | External data playbooks (311/open data; utility/weather/geo) | N1–N2 |
| `O` | Architecture (GIS + work orders; realtime / digital twins) | O1–O2 |
| `P` | Consumer-grade civic tracking UX | P1 |
| `Q` | Gaps, failures, innovation synthesis | Q1 |

**How J–Q relates to A–I:** Sections **A–I** remain the primary Richmond hackathon spine (problem → demo). Sections **J–Q** deepen **unified “city service tracker”** and **transparency** work: theory (J), operational and smart-city patterns (K), **entity/data models** (L), **simulation and ETAs** (M), **national data/API playbooks** (N), **system architecture** (O), **resident-facing UX** (P), and a **cross-cutting gap/opportunity** capstone (Q). When a question is Richmond-specific, start in **A–I** and **D**; when it is about **schemas, ETAs, or Domino’s-style UX**, add **L, M, P**; when it is about **open data or 311 nationally**, add **N1**; for **failure modes and ghost dashboards**, add **Q1** with **E4** and **G1**.

---

## How to Navigate the Corpus

### Start With Navigation Artifacts (Always)

**Before reading any research report, use navigation files to narrow scope:**

1. **`manifest.json`** (root) — machine-readable index of all significant files with summaries and tags
2. **`research/index.json`** — structured metadata for all 70 research files (id, section, title, summary, key_terms)
3. **`research/INDEX.md`** — human-readable table of contents for the research directory
4. **`README.md`** (root) — decision phases and overall repo map

### Navigation Decision Tree

```
User question received
        |
Is it about the hackathon process?
  YES -> README.md, QUICKSTART.md, 04_build_guides/
  NO |
Is it about a specific problem domain?
  Infrastructure project visibility -> research/A1, A4, A5, B1, D1, D2, F2, H1, H2
  Fleet operations / snow removal   -> research/A2, B2, D4, D5, F3, H3, H4
  Unified service tracker / Domino's-style UX / ETAs -> J2, J3, L1, M1, P1, N1, Q1; Richmond data still from A–I and D
  Transparency theory / asymmetry   -> research/J1, J2, J3
  Data modeling for trackers        -> research/L1–L4, O1
  Simulation / probabilistic ETAs   -> research/M1, M2 (with G2, H4 on GPS and labeling)
  Both / overview                   -> read 00_pillar_summary_context first
        |
Narrow to section using research/index.json
        |
Read original .md files for claims
        |
Verify against evidence_log.md if needed
```

### Question-to-Section Mapping

| User Question Type | Start Here |
|-------------------|-----------|
| What problems exist? | `A` section (A1–A5) |
| Who are the users? | `B` section (B1–B5) |
| What services exist already? | `C` section (C1–C5) |
| What data is available? | `D` section (D1–D5), `02_data/` |
| What has been built elsewhere? | `E` section (E1–E5) |
| What should we build? | `F` section (F1–F5) |
| What could go wrong? | `G` section (G1–G5) |
| Is this feasible in a weekend? | `H` section (H1–H5) |
| How do we demo this? | `I` section (I1–I5) |
| Why is civic transparency hard (theory)? | `J` section (J1–J3) |
| Outages, work orders, smart-city visibility? | `K` section (K1–K4) |
| Data models / schemas for service tracking? | `L` section (L1–L4) |
| Simulation, queues, ETAs, routes? | `M` section (M1–M2) |
| Open data & 311 APIs (cross-city)? | `N1`; utility/weather/geo playbooks: `N2` |
| GIS + work-order / realtime architecture? | `O` section (O1–O2) |
| Consumer-grade resident UX for tracking? | `P1` |
| What usually fails / where to innovate? | `Q1` (also `E4`, `92_red_flags.md`) |
| What datasets are mentioned? | `D1`, `D2`, `D3`, `02_data/source_inventory.csv` |
| What is the executive summary? | `research/00_pillar_summary_context.md` |
| What are the top research questions? | `research/90_top_10_research_questions.md` |
| What are the red flags? | `research/92_red_flags.md` |
| What data is verified? | `evidence_log.md` |

---

## How to Use the Metadata Files

### `research/index.json`

A JSON array with one entry per research file. Each entry has:
- `id` — file basename (e.g., `A1_problem_landscape_infrastructure_visibility`)
- `section` — section label (e.g., `A`, `B`, `cross-cutting`)
- `title` — display title
- `summary` — 1–2 sentence grounded summary
- `key_terms` — 6 relevant terms for keyword search

**Use it to:** find which files are relevant before reading them. Do not answer questions from summaries alone — read the source `.md` file.

### `manifest.json`

A comprehensive machine-readable index of all significant files in the repository. Each entry includes:
- `id`, `path`, `type`, `title`, `summary`
- `pillar`, `tags`, `recommended_audience`
- `read_after` — what to read first
- `source_of_truth` — whether this file is authoritative

**Use it to:** build a retrieval index, understand the full scope of the corpus, or identify which file type to use for a given purpose.

### `evidence_log.md`

A table of verified claims with official source URLs, access dates, and verification status. Status values: `Confirmed`, `Likely`, `Unverified`, `Missing`.

**Use it to:** check whether a specific factual claim has been verified. Do not invent claims that are not in this log.

---

## How AI Agents Should Use This Corpus

### Required Behavior

1. **Always read navigation artifacts before raw reports.** Start with `research/index.json` or `manifest.json` to identify relevant files. Do not dive into arbitrary `.md` files without knowing their scope.

2. **Read original reports before making substantive claims.** The summaries in index files are useful for navigation, not for citation. If a question requires a specific fact, find it in the source `.md` file.

3. **Scope before answering.** Identify the relevant section(s) first. A question about DPW ArcGIS data belongs to sections `D` and `C`. A question about demo strategy belongs to section `I`.

4. **Acknowledge when files have not been read.** If a report appears relevant but has not been read in the current context, say so rather than guessing from summaries.

5. **Cite the source file.** When presenting findings, reference the file they came from (e.g., "Per `research/A1_problem_landscape_infrastructure_visibility.md`...").

6. **Distinguish navigation files from source-of-truth files.** `manifest.json`, `README.md`, `research/INDEX.md`, and `index.json` are navigation aids. They are not authoritative for factual claims.

7. **Mark uncertainty explicitly.** If a claim cannot be verified from the files that have been read, use: `[Unverified]` or `[Requires reading: filename]`.

### How to Answer Cross-Report Questions

When a question requires synthesis across multiple reports:
1. Use `research/index.json` to identify all potentially relevant files
2. Read the summaries, then decide which reports need full reading
3. Read the source files
4. Synthesize from source content, citing each report separately
5. Note any tensions or contradictions between reports
6. Do not blend claims from different sections without acknowledging the synthesis

### When to Read Additional Files

You MUST read additional files before answering if:
- The question involves a specific dataset or data layer -> read D section
- The question involves a specific user persona -> read B section
- The question requires a factual claim about Richmond programs or services -> check `evidence_log.md`
- The answer requires citing prior art -> read E section
- The question is about risk or guardrails -> read G section
- The question involves GPS, fleet, or snow operations -> read A2, D4, D5, F3, G2

---

## What This Corpus Does NOT Contain

- Legal advice or compliance determinations
- Official City positions or policy commitments
- Private resident or business data
- Live GPS feed data (GPS infrastructure is explicitly incomplete as of March 2026)
- Authoritative DPW operational data
- Verified program availability (programs change; always encourage users to verify)

When information is absent, say: "This repository does not contain that information."

---

## Recommended Reading Orders for Common Scenarios

### New team at hackathon start
1. `README.md` -> `QUICKSTART.md` -> `00_core/00_pillar_overview.md`
2. `01_problem_space/02_targeted_problem_statements.md`
3. `research/00_pillar_summary_context.md` (executive brief)
4. `04_build_guides/01_mvp_shapes.md`

### Team choosing between Transportation Project Visibility and Fleet Operations
1. `research/A3_problem_landscape_compare_statements.md`
2. `research/A1_problem_landscape_infrastructure_visibility.md`
3. `research/A2_problem_landscape_fleet_operations.md`
4. `research/F1_opportunities_ranked.md`
5. `research/H1_mvp_48hr_framework.md`

### Team deep-diving on data availability
1. `02_data/source_inventory.csv` and `02_data/00_index.md`
2. `research/D1_data_arcgis_dpw.md`
3. `research/D2_data_open_data_portal.md`
4. `research/D4_data_gps_fleet.md`
5. `evidence_log.md`

### Team building a project visibility tool
1. `research/F2_opportunities_project_visibility.md`
2. `research/H1_mvp_48hr_framework.md`
3. `research/H2_mvp_project_visibility.md`
4. `research/D1_data_arcgis_dpw.md`
5. `research/G1_risks_inaccurate_project_info.md`

### Team building a fleet / snow ops tool
1. `research/A2_problem_landscape_fleet_operations.md`
2. `research/F3_opportunities_fleet_ops.md`
3. `research/H3_mvp_fleet_ops.md`
4. `research/H4_mvp_mock_data.md`
5. `research/G2_risks_gps_dependency.md`

### Team building a unified / “city service” or Domino’s-style tracker
1. `research/P1_ux_consumer_grade_civic_tracking.md`
2. `research/L1_data_model_work_orders_service_requests.md`
3. `research/J2_information_asymmetry_government_services.md`, `research/J3_private_sector_transparency_paradigms.md`
4. `research/N1_data_sources_municipal_open_data_311.md`, `research/D1_data_arcgis_dpw.md`, `research/D2_data_open_data_portal.md`
5. `research/M1_simulation_probabilistic_eta_queue_modeling.md`, `research/Q1_gaps_failures_innovation_opportunities.md`
6. `research/G2_risks_gps_dependency.md`, `research/G1_risks_inaccurate_project_info.md`, `research/92_red_flags.md`

### Agent answering research questions
1. `research/index.json` -> identify relevant section
2. Section INDEX.md or index -> narrow to specific files
3. Source `.md` files -> read for claims
4. `evidence_log.md` -> verify specific facts

---

## File Naming Conventions

Research files follow the pattern: `[SECTION][NUMBER]_[TOPIC_SLUG].md`

Examples:
- `A1_problem_landscape_infrastructure_visibility.md` — Section A, file 1, topic: infrastructure visibility
- `G5_risks_guardrails.md` — Section G, file 5, topic: guardrails checklist
- `90_top_10_research_questions.md` — Cross-cutting file 90

Sections run **A through I** (five files each), then **J through Q** (variable counts: J1–J3, K1–K4, L1–L4, M1–M2, N1–N2, O1–O2, P1, Q1). Cross-cutting files use 90–93. Context files use 00–01.

---

## See Also

- `skills/corpus_navigation_sync/SKILL.md` — Mandatory checklist when adding or removing research (keeps this guide and indexes aligned)
- `AGENTS.md` — Hackbot agent specification and research corpus navigation instructions
- `MAINTENANCE.md` — How to add, update, and synchronize reports and metadata
- `manifest.json` — Machine-readable index of all significant files
- `research/index.json` — Machine-readable index of all research reports
