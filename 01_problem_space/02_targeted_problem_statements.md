# Targeted Problem Statements — A Thriving and Sustainable Built Environment

---

## 1) Transportation Project Visibility & Discoverability

**Score: 25/32 — Strong**
**Dataset status: VERIFIED — CIP Dashboard export provided by DPW GIS Team (Chad Phillips, 804-646-6565)**

### Problem statement
How might we use technology to improve how Richmond residents find and understand transportation and infrastructure projects happening in their neighborhoods so that project information is clear, centralized, and easy to track — and so that residents can see how those projects connect to the City's long-term plans?

### Context
The Department of Public Works (DPW) manages transportation projects across Richmond: safety improvements, streetscape upgrades, grant-funded initiatives, and long-term mobility programs. The City's CIP (Capital Improvement Program) Dashboard is the authoritative public source for funded projects, but the data is technical and not designed for residents.

A resident who sees orange construction cones on their street may have no reliable way to find:
- what the project is
- which department or contractor is responsible
- how long it will last
- where to get updates

The CIP data now available to hackathon teams includes **125 funded projects** across categories:
- Road Improvements (59 projects)
- Pedestrian and Bike (29 projects)
- Parks & Recreation (12 projects)
- Bridge Repair (6 projects)
- New Facility Construction (5 projects)
- Stormwater, Water, Sewer, Public Art, Facility Maintenance (remainder)

Each project record includes: name, category, cost, description, location (text), project manager, contact email/phone, phase, status narrative, and estimated completion date.

**Policy alignment opportunity:** Many of these projects directly implement goals from Richmond's long-range master plan, [Richmond 300](https://www.rva.gov/planning-development-review/master-plan). Teams can surface that connection — showing residents not just *what* is being built, but *why* it aligns with the City's stated vision for their neighborhood.

### Constraints
- The live CIP ArcGIS dashboard is updated quarterly — data may not reflect day-of construction status
- Location field is descriptive text, not always a parseable address — geocoding may require manual review for edge cases
- Project manager contact info is included in the dataset; teams should not surface individual emails in a public-facing tool without confirming that is appropriate
- Existing City systems must remain authoritative — any tool built should link back to the official CIP dashboard, not replace it

### Success would mean
- Residents can search by address or neighborhood and see nearby funded projects
- Project status is clearly visible (Planning/Design, Pre-Construction, Construction, Completed)
- Technical descriptions are translated into plain language
- Policy context is visible — projects link to Richmond 300 goals where applicable
- Staff receive fewer repetitive information requests

### Example ideas
- Address or neighborhood search that surfaces nearby CIP projects on a map
- Plain-language project cards with phase, timeline, and a "why this matters" summary
- "What's Happening Here?" mobile lookup
- Opt-in notification when a nearby project changes phase

### What is now unblocked
The CIP dataset is verified and in the repository at `research/COR_CIP_Dashboard_projects.csv`. Teams can begin building immediately. The live ArcGIS FeatureService (confirmed public and queryable) returns **polygon geometry** for all projects — no geocoding needed. A single API call returns all 125 projects as GeoJSON ready to drop into a map.

### Remaining gaps
- Richmond 300 goal tags have not been mapped to individual CIP projects — a team willing to do that manually could create significant additional value
- Richmond 300 goal tags have not been mapped to individual CIP projects — a team willing to do that manually could create significant additional value
- Resident device usage and digital literacy range in affected neighborhoods are undocumented

### Verified data sources
- **CIP project export (CSV):** `research/COR_CIP_Dashboard_projects.csv` — 125 projects, provided by DPW GIS Team
- **CIP Dashboard (live):** https://experience.arcgis.com/experience/86362b12585448b583b74a3a2ae32745
- **CIP ArcGIS webmap:** https://www.arcgis.com/apps/mapviewer/index.html?webmap=270285e87d684a95bd1ebd9a078aa6df
- **Richmond GeoHub:** https://richmond-geo-hub-cor.hub.arcgis.com/
- **Richmond 300 Master Plan:** https://www.rva.gov/planning-development-review/master-plan

---

## 2) Fleet Operations Visibility & Public Communication

**Score: 22/32 — Needs work (D3=2)**
**Dataset status: PARTIALLY VERIFIED — WMP 2025-2026 provided by DPW (Daniel Wagner / Chad Phillips). Snow route priority classification confirmed. GPS data still unavailable.**

### Problem statement
How might we use technology to improve how Richmond residents and DPW staff track the progress of services like snow removal and street cleaning so that operations are easier to coordinate and residents receive timely, accurate updates?

### Context
DPW manages highly visible operational services: snow removal and street cleaning. During storms and seasonal cleaning cycles, residents seek information about when their street will be serviced. Route progress reporting is largely manual, supervisors lack real-time visibility into route completion, and public updates require manual compilation.

**Snow removal route structure (now verified):**

The Winter Maintenance Plan (WMP) 2025-2026, available at `research/WMP 2025-2026.pdf`, defines the snow route priority system beginning on page 67:

- **Priority 1:** Primary arterials and emergency access routes — plowed and treated first
- **Priority 2:** Secondary arterials and collector roads — addressed after Priority 1 is complete
- **Priority 3:** All other streets (neighborhood/residential roads) — not listed individually in the WMP; implicitly all streets not classified as P1 or P2

Only Priority 1 and Priority 2 routes are named in the WMP document. Priority 3 is the residual category — any street not on a P1 or P2 list is a neighborhood road.

**Street cleaning** is a separate operation from snow removal. Public-facing schedule information is at: https://www.rva.gov/public-works/street-cleaning

GPS devices are being installed across the fleet. This creates new opportunities — but the infrastructure is not yet complete as of the hackathon date. Any solution must work with the WMP route classification that now exists, or be explicitly built against a documented schema of what the GPS data will look like when ready.

Two user groups are affected:
1. DPW supervisors who need route completion visibility without calling every driver
2. Residents who want to know when their street will be cleaned or plowed

### Constraints
- GPS infrastructure is still being implemented — real-time GPS tracking is not available
- Public tools should avoid exposing sensitive operational data (route timing, driver locations)
- Staffing capacity for manual oversight is limited
- Any fleet MVP built this weekend must use WMP route data or synthetic mock data — not live GPS

### Success would mean
- Residents can look up their street and see its snow priority classification (P1, P2, or P3/neighborhood)
- Residents understand what that priority means for expected service timing
- Supervisors can see route progress without manual check-ins (mock/schema-driven)
- Fewer unexpected tickets or towing during street cleaning
- Improved public confidence during snowstorms

### Example ideas
- Snow Route Priority Lookup: resident enters address, sees priority tier and what that means in plain language ("Your street is a Priority 3 neighborhood road — it will be plowed after all Priority 1 and 2 routes are complete")
- Street Service Status Map: color-coded by P1/P2/P3, with schedule-based status
- Fleet Route Progress Dashboard: mock GPS schema to show what supervisors would see when GPS is live
- Street Cleaning Zone Lookup using the public schedule page

### What is now unblocked
The WMP 2025-2026 is in the repository. P1 and P2 route lists begin on page 67. Teams can extract those route names/segments and build a lookup against them. P3 is the implicit residual — no extraction needed; any street not on a P1/P2 list is P3.

### Remaining gaps
- P1 and P2 route geometries (GIS lines) have not been extracted from the WMP — teams will need to either parse the street names from the PDF or request a shapefile from DPW
- Street cleaning zone boundaries and schedule data are not yet in the repository — teams should reference the public page and may need to scrape or manually structure zone data
- GPS data schema that the future system will produce has not been documented — teams building a supervisor dashboard should define this schema themselves as a design artifact
- These gaps are partially closable at the hackathon; the P1/P2 street list is the most important to extract first

### What teams should not build
- Anything claiming to show real-time vehicle locations
- A system that requires live GPS feed integration
- Tools that claim to display current route completion based on actual DPW data

### Verified data sources
- **Winter Maintenance Plan 2025-2026:** `research/WMP 2025-2026.pdf` — snow route priority classification begins pg. 67; provided by DPW (Daniel Wagner, Chad Phillips)
- **Street cleaning public schedule:** https://www.rva.gov/public-works/street-cleaning
