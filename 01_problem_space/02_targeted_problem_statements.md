# Targeted Problem Statements — A Thriving and Sustainable Built Environment

---

## 1) Transportation Project Visibility & Discoverability

**Score: 25/32 — Strong**

### Problem statement
How might we use technology to improve how Richmond residents find and understand transportation and infrastructure projects happening in their neighborhoods so that project information is clear, centralized, and easy to track?

### Context
The Department of Public Works (DPW) manages transportation projects across Richmond: safety improvements, streetscape upgrades, grant-funded initiatives, and long-term mobility programs. Project information exists across multiple platforms — ArcGIS maps, program pages, grant documentation, and internal tracking tools. Residents who want to understand what is happening in their neighborhood struggle to locate information or interpret technical descriptions.

A resident who sees orange construction cones on their street may have no reliable way to find:
- what the project is
- which department or contractor is responsible
- how long it will last
- where to get updates

This information exists somewhere — but it is fragmented across systems and written in technical language.

### Constraints
- Existing systems such as ArcGIS project maps must remain in place
- Project information must remain technically accurate
- Staff capacity for manual updates is limited
- Some project details evolve during design and permitting phases
- Budget constraints limit development of large custom platforms

### Success would mean
- Residents can search by address or neighborhood
- All nearby infrastructure projects appear in one place
- Project status is clearly visible (planned, design, construction, complete)
- Technical descriptions are translated into plain language
- Staff receive fewer repetitive information requests

### Example ideas
- City Infrastructure Explorer Map
- "What's Happening Here?" Mobile Lookup Tool
- SMS Lookup Service
- Opt-In Notification System

### Gaps to close before the hackathon
- ArcGIS map and program page URLs are not yet linked into this statement — verify current public layer names on Richmond GeoHub
- Output type unspecified — teams should choose between map, lookup tool, or notification system
- Resident device usage and digital literacy range are undocumented

### Open data that may support this statement
- Richmond GeoHub: https://richmond-geo-hub-cor.hub.arcgis.com/
- Richmond Open Data Portal: https://data.richmondgov.com/
- DPW program pages (verify current URLs)

---

## 2) Fleet Operations Visibility & Public Communication

**Score: 22/32 — Needs work (D3=2)**

### Problem statement
How might we use technology to improve how Richmond residents and DPW staff track the progress of services like snow removal and street cleaning so that operations are easier to coordinate and residents receive timely, accurate updates?

### Context
DPW manages highly visible operational services: snow removal and street cleaning. During storms and seasonal cleaning cycles, residents seek information about when their street will be serviced. Route progress reporting is largely manual, supervisors lack real-time visibility into route completion, and public updates require manual compilation.

GPS devices are being installed across the fleet. This creates new opportunities — but the infrastructure is not yet complete as of the hackathon date. Any solution must work with what exists now or be explicitly built against a documented schema of what the GPS data will look like when ready.

Two user groups are affected:
1. DPW supervisors who need route completion visibility without calling every driver
2. Residents who want to know when their street will be cleaned or plowed

### Constraints
- GPS infrastructure is still being implemented — real-time GPS tracking is not available
- Public tools should avoid exposing sensitive operational data (route timing, driver locations)
- Staffing capacity for manual oversight is limited
- Any fleet MVP built this weekend must use synthetic/mock data or historical zone schedules

### Success would mean
- Supervisors can see route progress without manual check-ins
- Public updates are automated or significantly streamlined
- Residents can see when their street is scheduled or completed
- Fewer unexpected tickets or towing during street cleaning
- Improved public confidence during snowstorms

### Example ideas
- Street Service Status Map (zone-based, schedule-driven)
- Fleet Route Progress Dashboard (mock GPS data schema)

### Gaps — significant (D3=2)
- No sample GPS route data or schema description exists yet
- No historical street cleaning or snow removal schedules by zone are linked
- The GPS data schema that the future system will produce has not been documented
- These gaps must be addressed before or during the hackathon for a fleet MVP to be viable

### What teams can build without complete GPS data
- A zone-based schedule display: "Zone 7 cleaning scheduled Wednesday–Friday this week"
- A mock dashboard using a synthetic GPS schema (lat/lng, timestamp, route_id, completion_pct)
- A notification proof-of-concept that would fire when a zone transitions to "completed"

### What teams should not build
- Anything claiming to show real-time vehicle locations
- A system that requires live GPS feed integration
- Tools that claim to display current route completion based on actual DPW data
