# A Thriving and Sustainable Built Environment — Hackathon Challenge

This file defines the two practical problem statements for this pillar and the top-rated blue sky vision. Read this before reading anything else in the repository.

---

## The Two Problems You're Solving

### Problem 1: Transportation Project Visibility & Discoverability

**Score: 25/32 — Strong**

**Statement:**
How might we use technology to improve how Richmond residents find and understand transportation and infrastructure projects happening in their neighborhoods so that project information is clear, centralized, and easy to track?

**Why this problem matters:**
DPW manages transportation projects across Richmond — safety improvements, streetscape upgrades, grant-funded initiatives. Project information exists, but it is fragmented across ArcGIS maps, program pages, grant documents, and internal tools. A resident who sees orange construction cones on their street cannot reliably find out what the project is, which department owns it, how long it lasts, or where to get updates.

**Build toward:**
- City Infrastructure Explorer Map (address or neighborhood search, project status)
- "What's Happening Here?" mobile lookup tool (address → plain-language project summary)
- SMS lookup service for residents without smartphones
- Opt-in notification system for nearby project updates

**Key constraints:**
- Existing ArcGIS maps and program pages must remain the official source — do not replace them, surface them
- Technical descriptions must be translated into plain language
- Staff capacity for manual content updates is limited — automate or cache where possible
- Do not claim to be an authoritative or real-time view of project status

**Data sources to verify:**
- Richmond GeoHub: https://richmond-geo-hub-cor.hub.arcgis.com/
- Richmond Open Data Portal: https://data.richmondgov.com/
- DPW program pages (verify current URLs before building on them)

---

### Problem 2: Fleet Operations Visibility & Public Communication

**Score: 22/32 — Needs work (data gaps are significant)**

**Statement:**
How might we use technology to improve how Richmond residents and DPW staff track the progress of services like snow removal and street cleaning so that operations are easier to coordinate and residents receive timely, accurate updates?

**Why this problem matters:**
During storms and seasonal cleaning cycles, residents want to know when their street will be serviced. Route progress reporting is largely manual. Supervisors lack real-time visibility into route completion. Public updates require manual compilation. GPS devices are being installed fleet-wide — but the infrastructure is not complete as of the hackathon date.

**Build toward:**
- Zone-based schedule display: "Zone 7 street cleaning scheduled Wednesday–Friday this week"
- Fleet route progress dashboard using a synthetic/mock GPS data schema
- Notification proof-of-concept that fires when a zone transitions to "completed"

**Key constraints:**
- GPS infrastructure is not yet complete — real-time tracking is not available
- Any fleet MVP must use synthetic data or historical zone schedules
- Do not claim to show real-time vehicle locations
- Public tools must not expose sensitive operational data (route timing, driver locations)

**What you cannot build this weekend:**
- Anything requiring a live GPS feed
- A system claiming to show current route completion based on actual DPW data
- A tool requiring integration into DPW's internal routing systems

**Data gaps (these are blocking — teams must address them):**
- No sample GPS route data or schema description is currently linked in this repository
- No historical street cleaning or snow removal schedules by zone are linked
- Teams choosing this problem must scope carefully or create a synthetic schema and state clearly it is a proof of concept

---

## The Blue Sky Vision

### Reimagining Safer Streets — 22/27 — Strong ★

**Statement:**
How might we use technology to help Richmond residents, advocates, and City planners identify and prioritize locations for transportation safety improvements so that investments are directed toward the highest-need corridors and communities?

**Why this scored well:**
Clear user (resident, advocate, planner). Public data exists (crash data, road network, project data on GeoHub). Addresses a documented problem in transportation planning. Map-based visualization is demonstrable in a weekend.

**Hackathon path if you're aiming at this vision:**
Build a map that overlays publicly available crash data with existing transportation project locations. Let a resident or advocate identify corridors where no project is currently planned. Keep the scope to exploration — never claim the tool guides official resource allocation.

**Required disclaimers:**
- Output must be labeled "for exploration only, not official planning guidance"
- Crash and injury data requires careful handling — anonymize, use aggregate counts, never display individual incidents
- Do not frame as a tool that replaces formal City transportation planning processes

The blue sky is the ceiling. Problem 1 (Transportation Project Visibility) is the practical floor. A team that builds Problem 1 with this blue sky framing — adding a layer about where gaps in current project coverage exist — will have a compelling pitch for both the Pillar Award and the Moonshot Award.

---

## How Your Solution Will Be Judged (Pillar Award)

The Pillar Award uses the following weights. For full category definitions and scoring anchors, see [`/RUBRIC.md`](../../RUBRIC.md) at the hackathon root.

| Category | Weight | What judges are asking |
|----------|--------|------------------------|
| **Impact** | **5** | Does this directly address one of the two problem statements above? |
| **User Value** | 4 | Is there a specific, real user? Does the prototype improve their experience? |
| **Feasibility** | 3 | Could this be piloted by DPW or a City partner within a year? |
| **Innovation** | 3 | Does the team bring fresh thinking to infrastructure transparency or fleet ops? |
| **Execution** | 3 | Does a working demo exist? Is the flow coherent? |
| **Equity** | 3 | Does the solution reach residents with limited digital access or language barriers? |

**Score formula:** Sum of (category score 1–5 × weight). Maximum 105.

**Tiebreaker:** User Value score.

**What wins here:** A prototype that makes infrastructure information findable or fleet operations trackable, using real public data, scoped tightly to what is demonstrable in a weekend.

**What loses here:** Tools claiming real-time GPS tracking, solutions requiring DPW internal system integration, or projects that present exploratory data as official City information.
