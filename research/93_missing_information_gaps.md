# Unblocking Richmond DPW MVPs: Data Gaps, Evidence, and Fast Workarounds

## Executive Summary

The development of Minimum Viable Products (MVPs) for the Richmond Department of Public Works (DPW) faces several information gaps, but existing public data provides immediate workarounds. Public ArcGIS layers for capital projects are currently accessible, allowing for the immediate development of project maps and cards. Snow operations are managed by route priority rather than geographic zones, requiring a shift in the schedule tracker's design. While specific fleet GPS schemas and street sweeping schedules remain unpublished, vendor-agnostic data adapters and targeted records requests can keep development unblocked. 

## Why This Matters Now

Blockers to DPW MVPs can be turned into accelerators by leveraging existing public data. You can launch Shapes A and B (project maps and cards) and de-risk Shape D (schedule tracker) in weeks by using existing ArcGIS Online (AGOL) services while formalizing missing schemas via FOIA and vendor-agnostic design. The primary objectives are to deliver these MVPs quickly while reducing resident inquiry load and increasing trust via source-linked, plain-language content.

## Gap-by-Gap Assessment

Every identified information gap has a viable 2–4 week workaround. Formal data requests should run in parallel with these immediate actions.

| Gap | Known | Unknown | What it blocks | Recommended workaround |
|---|---|---|---|---|
| 1. GeoHub layer names & availability | Public AGOL services exist: Capital Projects FS (5 layers) [1]; CIP points FS [2]; Richmond Roads FS [3] | Exact GeoHub dataset names, ownership, and field lists for DPW transportation project layers | Shape A/B MVP data source confidence and field mapping | Use Capital Projects FS and CIP points FS now; script AGOL discovery; FOIA definitive DPW GeoHub list |
| 2. GPS fleet schema | No published DPW schema found | Vendor, feed format, fields, event cadence | Fleet MVP accurate schema | Define canonical FleetEvent/RouteProgress; build adapter; confirm with DPW in post-hackathon meeting |
| 3. Snow/sweeping zones | Snow uses priority routes (P1: 700 lane-mi/28%; P2: 200/8%; local: 64%) [4] | Zone boundaries (if any) for snow or sweeping | Shape D Schedule Tracker geography | Digitize P1/P2 list to a line layer; request official route geometries; use council districts for sweeping |
| 4. Historical sweeping schedules | None published found | Past and planned sweeping calendars by zone/route | Schedule display | Records request to Street Maintenance; run forward schedule pilot on 1–2 districts |
| 5. Program page URLs | Snow Removal page [4]; CIP Dashboard [5]; Richmond Connects [6] | Comprehensive list of all DPW program pages | Source linking in cards | Add known links now; run site crawl to discover more; confirm in DPW review |
| 6. Plain-language standard | Accessible tone observed on Snow page [4]; no formal guideline found | Official vocabulary replacements | Consistent resident-friendly copy | Adopt Federal PLAIN; create Richmond glossary; test on 10 residents |
| 7. Inquiry volume | None surfaced | Monthly calls/emails/311 for project status | MVP impact sizing | Request RVA311 extracts; add in-app feedback form to estimate deflection |
| 8. Champion commitment | None confirmed | Willing sponsor, review cadence | Post-hackathon continuity | Send 1-pager + demo ask; align with CIP Dashboard owner; propose 2-week pilot corridor |

## Public GIS Sources Inventory

Two public project layers plus a base road layer can power early MVPs. Candidate-project maps should be visually segregated from active execution projects.

| Asset | Endpoint | Scope/Notes | Key fields (examples) |
|---|---|---|---|
| Capital Projects (FeatureServer) | services2.arcgis.com/Q6Lq3evZUGfPrN7o/... [1] | Layers: Transportation Projects (0), Sanitary (1), Drainage (2), Water (3), Major Non-City (4) [1] | Fields TBD per layer (schema call required) |
| Capital_Improvement_Projects_Pie | services5.arcgis.com/i75zh9vlhYUpqwjr/... [2] | Engineering/CIP points; current and expired projects [2] | prj_name, CIP_Number, Manager, url, descrip, CATEGORY, Active [2] |
| Roads (FeatureServer/0) | services1.arcgis.com/k3vhq11XkBNeeOfM/... [3] | Polygon basemap of roads [3] | Paved, FIPS, CreatedDate, EditDate, GlobalID [3] |
| Candidate Projects Web Map | timmons-group.maps.arcgis.com/... [6] | Planning candidate projects aggregated from multiple sources [6] | Unique project identifier; status [6] |

## Snow and Street Cleaning Operational Geography

For snow removal, DPW operates by priority routes rather than geographic zones. The city prioritizes 700 lane miles (28% of the city) as Priority 1 Snow Routes, 200 lane miles (8%) as Priority 2, and 1600 lane miles (64%) as Priority 3 local neighborhood streets [4]. Because crews follow this set priority list, the City does not take individual snow removal requests through 311 [4]. 

A "zone map" may mislead residents. A route-status UI with clear priority logic will better set expectations. The immediate action is to digitize the Priority 1 and 2 route list into a line layer and display status badges. For sweeping, where zones are unconfirmed, the team should pilot a council-district proxy and allow residents to subscribe to updates per district.

## Fleet GPS Data Schema Strategy

Since the specific GPS vendor and schema are unknown, the team must define a canonical schema (FleetEvent, RouteAssignment, RouteProgress) and build an adapter to whatever vendor DPW ultimately adopts. Canonical fields should include `vehicle_id`, `timestamp_utc`, `lat`, `lon`, and `work_state`. Once a vendor is named, per-vendor mappers can be implemented rapidly.

## Content and Communications Layer

Trust comes from visible source links and readable language. Known official URLs include the Snow Removal page [4], the CIP Dashboard [5], and Richmond Connects [6]. The team should add "Learn more" links in project cards and log clicks. To address the lack of a formal plain-language standard, the team should implement a glossary based on Federal PLAIN guidelines and run user comprehension tests.

## Demand and Impact Estimation

Without inquiry volume data, ROI is speculative. Lightweight instrumentation can size impact in weeks. The team should request an RVA311 export filtered to construction status and roadwork. Additionally, adding a "Couldn't find your project?" form to the MVP will help measure the weekly submission rate and correlate it with MVP usage to estimate deflection.

## Stakeholder and Governance Plan

A 20-minute decision meeting with DPW leaders can unlock data stewardship and a pilot. The team should send a one-pager detailing the problem, solution, data sources, and a 2-week pilot plan. Proposing a specific pilot corridor and concrete success metrics (e.g., 20% fewer status calls) will help secure a champion.

## Risk Register

Top risks include data authority, schema drift, and absent sweeping routes. Each has a concrete mitigation strategy.

| Risk | Evidence | Impact | Mitigation |
|---|---|---|---|
| Using planning data for execution status | Candidate Projects map is not DPW-committed [6] | Misinformation | Separate layers; label clearly; link official pages |
| Unknown GPS schema | No vendor/schema found | Rework risk | Canonical schema + adapters; 30-min review |
| No sweeping zones/schedules | None published found | Schedule UI delay | Records request; proxy via districts + signage capture |
| Stale AGOL layers | Edit dates vary | Outdated info | Nightly metadata checks; freshness badges |

## Next 30-Day Action Plan

Parallelize the build and data formalization to show value fast.

| Day range | Deliverable | Owner | Acceptance criteria |
|---|---|---|---|
| 1–5 | Data audit + schema introspection | Data Eng | Field dictionary; API health checks; freshness badges |
| 1–7 | Shape A/B MVP slice | Frontend | Cards render from FS; filter by category; link clicks logged |
| 3–10 | Snow P1/P2 digitization + route-status UI | GIS + Frontend | P1/P2 lines in map; status toggles; disclaimer present |
| 5–12 | Canonical Fleet schema + adapter scaffolding | Backend | JSON schema; unit tests pass; mapping registry stub |
| 7–14 | Records requests (sweeping routes/schedules) | PM | Requests submitted; ETA received |
| 10–15 | Plain-language glossary + resident test | UX Writer | >20% comprehension gain in test |
| 12–20 | DPW leadership readout + pilot decision | PM | Meeting held; champion named; pilot corridor chosen |
| 15–30 | Shape D pilot (snow route status) | Team | Live beta; feedback captured; next steps decided |

## References

1. *Capital Projects (FeatureServer)*. https://services2.arcgis.com/Q6Lq3evZUGfPrN7o/arcgis/rest/services/Capital%20Projects/FeatureServer
2. *Layer: Capital Improvement Projects (ID:0)*. https://services5.arcgis.com/i75zh9vlhYUpqwjr/arcgis/rest/services/Capital_Improvement_Projects_Pie/FeatureServer/0
3. *Fetched web page*. https://services1.arcgis.com/k3vhq11XkBNeeOfM/arcgis/rest/services/Roads/FeatureServer/0?f=pjson
4. *Snow Removal | Richmond*. https://www.rva.gov/public-works/snow-removal
5. *Capital Improvement Program Dashboard*. https://experience.arcgis.com/experience/86362b12585448b583b74a3a2ae32745
6. *Richmond Connects: Map Collection Overview*. https://storymaps.arcgis.com/stories/f97d698bdb1e4be79d0bce1717c3bc27