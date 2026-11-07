# Post-Event Research Index — A Thriving and Sustainable Built Environment

**Pillar:** A Thriving and Sustainable Built Environment
**GitHub:** [hack4rva/pillar-thriving-built-environment](https://github.com/hack4rva/pillar-thriving-built-environment)
**Problem Statements:**
- PS1: Infrastructure Project Visibility — Help residents find and understand transportation and infrastructure projects in their neighborhoods
- PS2: Fleet Operations & Street Service Tracking — Improve how DPW supervisors and residents track services like snow removal and street cleaning in real time

**For AI agents:** Read this file to locate any post-event research artifact. Do not list the directory.

---

## Shared Research (Cross-Demo, Per Problem Statement)

| Dir | JTBD | Pain Points | Prior Art |
|-----|:----:|:-----------:|:---------:|
| [`_shared-infra-visibility/`](_shared-infra-visibility/) | ✅ | ✅ | ✅ |
| [`_shared-fleet-ops/`](_shared-fleet-ops/) | ✅ | ✅ | ✅ |

These files synthesize the problem statement across all demos in that PS. Read them before reading any per-project file.

---

## Per-Project Research Inventory

| Project | Problem Statement | JTBD | Pain | Prior Art | Solution Ideas |
|---------|------------------|:----:|:----:|:---------:|:--------------:|
| [`all-your-bass/`](all-your-bass/) | PS2: Fleet Ops | ✅ | ✅ | ✅ | ✅ |
| [`rideshift-rva/`](rideshift-rva/) | Misaligned | ✅ | ✅ | ✅ | ✅ |
| [`road-maintenance-fleet-tracker/`](road-maintenance-fleet-tracker/) | PS2: Fleet Ops | ✅ | ✅ | ✅ | ✅ |
| [`streetlights/`](streetlights/) | PS1: Infra Visibility | ✅ | ✅ | ✅ | ✅ |

**Note:** `rideshift-rva` was misaligned — it is a transit/mobility tool that belongs in Thriving Economy.

---

## Research Answers (`_research-answers/`)

Parallel AI queries that answered the JTBD open questions. Read `QUERY_MAP.md` to see which file answers which question.

| File | Problem Statement | Questions Answered |
|------|------------------|-------------------|
| [`QUERY_MAP.md`](_research-answers/QUERY_MAP.md) | Both | Full map of JTBD questions → query files |
| [`iv_q1_data.md`](_research-answers/iv_q1_data.md) | PS1 | GeoHub project layers, VDOT data, ArcGIS APIs, data staleness |
| [`iv_q2_equity.md`](_research-answers/iv_q2_equity.md) | PS1 | Equity gaps, language access, comparable city tools |
| [`fo_q1_data.md`](_research-answers/fo_q1_data.md) | PS2 | DPW fleet GPS access, telemetry formats, service route data |
| [`fo_q2_equity.md`](_research-answers/fo_q2_equity.md) | PS2 | Equity distribution of services, comparable real-time trackers |

---

## Agent Reading Sequence

```
1. Read this file (INDEX.md) — orient
2. For PS1 context: _shared-infra-visibility/jtbd_analysis.md
3. For PS2 context: _shared-fleet-ops/jtbd_analysis.md
4. For a specific project: <project>/jtbd_analysis.md → <project>/pain_points.md → <project>/prior_art_research.md
5. For answered research questions: _research-answers/QUERY_MAP.md → relevant query file
```
