> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](methodology.md) for details.

# Participant handout

This file is a copy of [`CHALLENGE.md`](../CHALLENGE.md) plus this cover note so you can share one Markdown document. Official judge categories are described in `RUBRIC.md` at the hackathon repository root (the directory that contains `pillar-repos`). The body below mirrors `CHALLENGE.md` in this repository.

---

# A Thriving and Sustainable Built Environment: Hackathon Challenge

This file defines the two practical problem statements for this pillar and the top-rated blue sky vision. Read this before reading anything else in the repository.

---

## The Two Problems You're Solving

### Problem 1: Transportation Project Visibility & Discoverability

**Statement:**
How might we use technology to improve how Richmond residents find and understand transportation and infrastructure projects happening in their neighborhoods so that project information is clear, centralized, and easy to track?

**Why this problem matters:**
DPW manages transportation projects across Richmond: safety improvements, streetscape upgrades, grant-funded initiatives. Project information exists, but it is fragmented across ArcGIS maps, program pages, grant documents, and internal tools. A resident who sees orange construction cones on their street cannot reliably find out what the project is, which department owns it, how long it lasts, or where to get updates.

**Build toward:**
- City Infrastructure Explorer Map (address or neighborhood search, project status)
- "What's Happening Here?" mobile lookup tool (address → plain-language project summary)
- SMS lookup service for residents without smartphones
- Opt-in notification system for nearby project updates

**Key constraints:**
- Existing ArcGIS maps and program pages must remain the official source: do not replace them, surface them
- Technical descriptions must be translated into plain language
- Staff capacity for manual content updates is limited: automate or cache where possible
- Do not claim to be an authoritative or real-time view of project status

**Data sources to verify:**
- Richmond GeoHub: https://richmond-geo-hub-cor.hub.arcgis.com/
- Richmond Open Data Portal: https://data.richmondgov.com/
- DPW program pages (verify current URLs before building on them)

#### Participant guide: connecting to the rubric (if you chose this problem)

Optional prompts for your team: not a substitute for [`RUBRIC.md`](../../RUBRIC.md), which judges use for category definitions.

- **Impact:** Show how residents (or partners) can **find or understand** transportation / infrastructure projects in their area without replacing official GeoHub or City pages.
- **User Value:** A clear user (resident, block association, advocate) and a concrete “what I learned” from your demo.
- **Feasibility:** Respect “surface, don’t replace” official sources; avoid claiming authoritative or real-time City status without evidence.
- **Innovation:** Plain language, address lookup, notifications, or cross-linking beats a raw map embed alone.
- **Execution:** Walkable demo (search → summary → link to official source).
- **Equity and inclusion:** SMS, simple language, or low-literacy-friendly paths where you can justify them.

**What often works well:** Explorer map, “what’s happening here” lookup, or opt-in alerts tied to real public data.

**What to avoid:** Presenting exploratory data as official City truth, or implying complete coverage without saying what’s missing.

*Try asking yourself:* Could a resident on my block understand what the cones are for and where to verify it officially?

---

### Problem 2: Fleet Operations Visibility & Public Communication

**Statement:**
How might we use technology to improve how Richmond residents and DPW staff track the progress of services like snow removal and street cleaning so that operations are easier to coordinate and residents receive timely, accurate updates?

**Why this problem matters:**
During storms and seasonal cleaning cycles, residents want to know when their street will be serviced. Route progress reporting is largely manual. Supervisors lack real-time visibility into route completion. Public updates require manual compilation. GPS devices are being installed fleet-wide, but the infrastructure is not complete as of the hackathon date.

**Build toward:**
- Zone-based schedule display: "Zone 7 street cleaning scheduled Wednesday-Friday this week"
- Fleet route progress dashboard using a synthetic/mock GPS data schema
- Notification proof-of-concept that fires when a zone transitions to "completed"

**Key constraints:**
- GPS infrastructure is not yet complete: real-time tracking is not available
- Any fleet MVP must use synthetic data or historical zone schedules
- Do not claim to show real-time vehicle locations
- Public tools must not expose sensitive operational data (route timing, driver locations)

**What you cannot build this weekend:**
- Anything requiring a live GPS feed
- A system claiming to show current route completion based on actual DPW data
- A tool requiring integration into DPW's internal routing systems

**Data gaps (these are blocking: teams must address them):**
- No sample GPS route data or schema description is currently linked in this repository
- No historical street cleaning or snow removal schedules by zone are linked
- Teams choosing this problem must scope carefully or create a synthetic schema and state clearly it is a proof of concept

#### Participant guide: connecting to the rubric (if you chose this problem)

Optional prompts for your team: [`RUBRIC.md`](../../RUBRIC.md) remains authoritative for judges.

- **Impact:** Improve **clarity** of service progress (snow, cleaning, etc.) for residents or coordination narrative for staff: without live GPS you do not have.
- **User Value:** Resident (“when is my street?”) or supervisor story told honestly with schedule/synthetic schema as labeled.
- **Feasibility:** No live GPS feed, no DPW internal integration, no sensitive route/driver exposure; synthetic data clearly labeled.
- **Innovation:** Zone schedules, labeled mock progress, or notification proofs tied to a credible schema.
- **Execution:** Demo shows zone or route concept end-to-end as a proof of concept.
- **Equity and inclusion:** Consider neighborhoods that rely on public updates during storms or limited digital access.

**What often works well:** Zone-based schedule UI, dashboard on **synthetic** GPS schema, notification POC with explicit disclaimers.

**What to avoid:** Real-time vehicle tracking, pretending live DPW data exists, or leaking operational detail.

*Try asking yourself:* Could a resident understand what “done” means for their area without us faking a live truck feed?

---

## The Blue Sky Vision

### Reimagining Safer Streets

**Statement:**
How might we use technology to help Richmond residents, advocates, and City planners identify and prioritize locations for transportation safety improvements so that investments are directed toward the highest-need corridors and communities?

**Why this fits a weekend build:**
Clear user (resident, advocate, planner). Public data exists (crash data, road network, project data on GeoHub). Addresses a documented problem in transportation planning. Map-based visualization is demonstrable in a weekend.

**Hackathon path if you're aiming at this vision:**
Build a map that overlays publicly available crash data with existing transportation project locations. Let a resident or advocate identify corridors where no project is currently planned. Keep the scope to exploration; never claim the tool guides official resource allocation.

**Required disclaimers:**
- Output must be labeled "for exploration only, not official planning guidance"
- Crash and injury data requires careful handling: anonymize, use aggregate counts, never display individual incidents
- Do not frame as a tool that replaces formal City transportation planning processes

The blue sky is the ceiling. Problem 1 (Transportation Project Visibility) is the practical floor. A team that builds Problem 1 with this blue sky framing: adding a layer about where gaps in current project coverage exist: will have a compelling pitch for both the Pillar Award and the Moonshot Award.

**Rubric connection (blue sky):** Closest fit is **Problem 1** (visibility / discovery) plus safety and ethics around crash or project data. Use the Problem 1 participant guide and your required disclaimers; if you touch fleet-like ideas, also respect Problem 2 constraints (no live GPS fiction).

---

## Judges and the rubric

Hackathon judges evaluate prototypes using the shared categories described in [`RUBRIC.md`](../../RUBRIC.md) at the hackathon repository root. That document lists the category names and what judges are asked to consider.

The **Participant guide** sections under each problem above are optional ways to prepare your pitch. They are not official instructions to judges.
