# Prior Art Research — Fleet Operations & Street Service Tracking

**Pillar:** Thriving and Sustainable Built Environment
**Problem Statement:** Improve how DPW supervisors and residents track the progress of services like snow removal and street cleaning in real time.
**Applies to:** Stay Informed (All Your Bass), Road Maintenance Fleet Tracker
**Research Date:** April 1, 2026
**Method:** Synthesis of existing pillar research corpus (`pillar-repos/pillar-thriving-built-environment/research/`)

**Primary sources from existing corpus:**
- `E1_prior_art_project_trackers.md` — Leading municipal project tracker tools nationally
- `E2_prior_art_service_status.md` — Snow status tools and zone-based fallback patterns
- `E4_prior_art_failures.md` — Why civic dashboards die after launch
- `E5_prior_art_weekend_viable.md` — 48-hour civic tech build patterns and success cases
- `D4_data_gps_fleet.md` — GPS/AVL schema, vendor landscape, and synthetic data strategy
- `D5_data_quality.md` — GPS data gap risks and schema-first adapter approach
- `G2_risks_gps_dependency.md` — GPS dependency risks and schema drift mitigation
- `G4_risks_data_freshness.md` — Data freshness, staleness thresholds, and trust implications
- `F3_opportunities_fleet_ops.md` — Schedule-first solution directions for fleet visibility
- `C4_services_gaps.md` — Richmond DPW public information gaps and peer benchmarks

---

## 1. Comparable Tools Nationally

### GPS-Based Plow Trackers (Production Systems)

**NYC PlowNYC**
The largest-scale municipal plow tracker in the US. DSNY tracks ~2,200 vehicles across 19,000 lane miles using GPS, publishing "last serviced" data by street segment in time buckets (0–1h, 1–3h, 3–6h). Activates only after 2" of snow accumulation. Uses static zone designations (Critical, Sector, Narrow, Non-DSNY) alongside live GPS. Focuses on service delivery status rather than vehicle locations. Key lesson: residents reported streets untouched for two days despite GPS showing them as plowed — accuracy gaps in GPS-based systems are highly visible and erode trust (`E2_prior_art_service_status.md`).

**Chicago Plow Tracker / ChiStreetWork**
Tracks 510 vehicles across 9,400+ lane miles using a 30-second GPS refresh rate. The companion ChiStreetWork platform allows residents to draw custom geographic boundaries and receive daily/weekly/monthly alerts about upcoming roadwork. Includes a 5-year history of repaved streets and a 12-month future lookahead. Estimated $183M in savings since 2012 by reducing instances of newly repaved streets being cut into for underground work. Route-centric (not vehicle-dot-centric) public display avoids exposing vehicle IDs (`E1_prior_art_project_trackers.md`, `E2_prior_art_service_status.md`).

**VDOT Plows (Virginia)**
Statewide vehicle tracking with ~2-minute update intervals. Activates after 2" accumulation. Explicitly warns users that "not all snow plows may appear due to vehicle technology and cellular network differences." This honest caveat setting is a critical UX pattern — it preempts the trust failures NYC experienced (`E2_prior_art_service_status.md`).

**Denver Plow Tracker**
GPS-based with 10-minute refresh. Schedule-based messaging sets expectations: residential streets plowed between 3 AM–3 PM. Notes that trucks may perform other duties while appearing on the map. Demonstrates the value of combining GPS dots with operational schedule context (`E2_prior_art_service_status.md`).

### Zone-Based and Manual-Status Systems

**Pittsburgh Snow Response Dashboard**
GPS-based but honestly partial. Publicly states the dashboard is "not comprehensive" and some treated routes won't appear. Includes a fallback "Snow Route Coverage" map as the primary view. Best example of graceful degradation when telemetry is incomplete (`E2_prior_art_service_status.md`).

**Arlington County Snow Activity Map**
"Almost real-time" plow progress from county fleet GPS. Pairs the map with a "Snow Issue Form" for resident reporting — the issue form works even when GPS data is incomplete. Phase-based operational model. Demonstrates that a feedback channel is as important as a display channel (`E2_prior_art_service_status.md`).

**Syracuse "Plowing Through the Data"**
Hackathon-built plow tracker that succeeded because the city's Chief Data Officer was embedded from day one. Used color-coded time buckets (green <1h, blue <3h, gray = unplowed) that judges preferred over a competing team's route optimization algorithm. The city planned evaluation for production use. Key lesson: simplicity wins in hackathons and in production (`E5_prior_art_weekend_viable.md`).

---

## 2. Operational Portal Models (Beyond Snow)

**Philadelphia StreetSmartPHL**
Consolidates four operational tools — PavePHL, PermitPHL, PlowPHL, PickupPHL — into a single portal. Refreshes hourly. Includes inline 311 reporting from map pop-ups. Best model for a unified DPW operations entry point. Demonstrates that street closures, paving status, and snow response can share a single map interface (`E1_prior_art_project_trackers.md`).

**Alexandria Capital Infrastructure Map**
ArcGIS dashboard integrated with the City's cross-departmental project management system. Pop-ups show project name, phase, planned budget, schedule dates, monthly progress updates, and a link to the project webpage. Strongest model for the long-term CIP layer — but requires disciplined, continuous PM-system updates (`E1_prior_art_project_trackers.md`).

---

## 3. Hackathon-to-Production Patterns

### What Ships in 48 Hours

| Pattern | Example | Stack | Key Success Factor |
|---|---|---|---|
| **Recency map** | ClearStreets (Chicago) | Python scripts, MatchGPX2OSM, Fusion Tables/CartoDB, Leaflet | Answered one question: "Has my street been plowed?" Built overnight with 1 week prep (`E5_prior_art_weekend_viable.md`) |
| **Claim-and-remind** | Adopt-a-Drain (SF) | Web map, signup, email reminders | 7,688 drains adopted; sustained by SFPUC institutional support (`E5_prior_art_weekend_viable.md`) |
| **Schedule lookup** | SF Street Cleaning App | Static frontend, GitHub Actions cron, Leaflet/Folium | Zero backend; daily data regeneration via cron. Backend-less architecture (`E5_prior_art_weekend_viable.md`) |
| **Voice triage** | 311+ (SF) | AI voice + human handoff | Won hackathon; judges cited "easy to plug in" to existing SF 311 (`E5_prior_art_weekend_viable.md`) |

### What Kills 48-Hour Projects
Multi-agency portals, heavy authentication, and route optimization algorithms consistently exceed weekend timeframes. The Syracuse hackathon's third-place team attempted route optimization; judges preferred the first-place team's simpler recency map. "One-stop shop" concepts like SF OS collapse under edge cases and lack post-hackathon ownership (`E5_prior_art_weekend_viable.md`).

### Tiered MVP Strategy for Fleet Tracking
- **Tier 1 (Guaranteed):** Live point map of vehicles from an open FeatureServer. Color by status, add "last seen" badge.
- **Tier 2 (Stretch):** Breadcrumb trails for the last 60 minutes per vehicle.
- **Tier 3 (High Risk):** Street-segment recency shading. Only attempt with a tested snap-to-road library and a proven feed by hour 6 (`E5_prior_art_weekend_viable.md`).

---

## 4. The GPS Data Gap — What D3=2 Means

Richmond's fleet GPS data is at readiness level D3=2 — "ad hoc" in maturity framework terms, meaning access is not formalized, schemas are unstable, and uptime is unguaranteed. This is the central constraint both demos face.

### Schema-First Adapter Strategy
Build against a strict, versioned synthetic schema (`v0alpha`) aligned with GTFS-Realtime and Mobility Data Specification (MDS) standards. Core fields: `vehicle_id`, `timestamp` (ISO-8601), `lat`/`lon` (5 decimal places), `bearing`, `speed_mps`, `state` (idle/moving/offline), `ttl` (seconds until next expected update). When the real GPS feed arrives, swap the data adapter, not the application (`D5_data_quality.md`, `G2_risks_gps_dependency.md`).

### Vendor Landscape
Samsara and Geotab dominate municipal DPW deployments. Syracuse (Samsara) reduced citizen calls by 30% via public coverage maps. Both vendors integrate natively with Esri ArcGIS Velocity. Richmond's schema should be compatible with both to avoid vendor lock-in (`D4_data_gps_fleet.md`).

### Dual-Geometry Data Model
Snow removal requires line segments (to calculate completion % against Richmond's P1=700mi, P2=200mi, P3=1,600mi lane-mile targets). Street sweeping uses polygons (Richmond's existing `StreetSweeping` dataset on data.richmondgov.com contains MultiPolygon zones with `schedule1-4` fields). The schema must support both geometries (`D4_data_gps_fleet.md`).

### Synthetic Data Labeling
Prototypes must feature persistent UI labels ("Demo uses synthetic MDS telemetry data") and frame the GPS gap as an engineering feature: "We built a schema-first adapter mapped to GTFS and MDS standards. When the real GPS data arrives, we swap the adapter, not the application" (`D5_data_quality.md`, `G2_risks_gps_dependency.md`).

---

## 5. Why Civic Dashboards Die — And How to Avoid It

### The Three Failure Modes Most Relevant to Richmond

| Failure Mode | Evidence | Richmond Trigger |
|---|---|---|
| **Data staleness** | NYC Capital Projects Dashboard missed updates for 6+ months; contained only 46.8% of project IDs (`E4_prior_art_failures.md`) | Limited staff capacity; no automated pipeline ready |
| **Orphaned tool** | Civic tech projects die without institutional integration and stable funding; volunteer burnout is the norm (`E4_prior_art_failures.md`) | No continuation pathway named post-hackathon |
| **Vendor/API fragility** | Sunlight Foundation API sunset (28,570 keys, 543K daily calls); Twitter API price hikes killed urban research tools (`E4_prior_art_failures.md`) | GPS not ready implies reliance on temporary workarounds |

### What Survives
NYC Parks and NYCHA maintain successful dashboards because they provide detailed timelines, funding sources, and frequent (bi-weekly) updates with named project leads and contact emails. Adopt-a-Drain survived because SFPUC institutionalized it. ClearStreets (Chicago) eventually sunsetted because DataMade found public apps peak early — long-term interest comes from professionals, not general public (`E4_prior_art_failures.md`, `E5_prior_art_weekend_viable.md`).

### Handoff Requirements
The hackathon prototype must include: a documented data dictionary, a step-by-step manual for updating data, a "kill switch" protocol if the city cannot maintain the tool, and a 4–8 hour/month maintenance budget estimate. Scope must be narrow — 5–10 priority projects from a single system-of-record, not a comprehensive citywide dashboard (`E4_prior_art_failures.md`).

---

## 6. Data Freshness and Trust

### Per-Dataset Freshness SLAs

| Data Type | Expected Cadence | Soft Warning (2×) | Hard Warning (3×+) |
|---|---|---|---|
| Active fleet positions (storm) | Minutes | ≥30 min | ≥60 min |
| Zone completion status | Hourly | ≥2 hours | ≥4 hours |
| Street sweeping schedule | Weekly | ≥14 days | ≥30 days |

87% of residents say a great digital government experience increases their trust; 81% say a negative experience decreases it. Stale data is not neutral — a dashboard showing a street as "Active" months after completion actively erodes credibility (`G4_risks_data_freshness.md`).

### UX Patterns for Freshness
- Always display "Last updated" timestamps near the data, not just in a footer
- Use color-coded staleness chips (green = on time, yellow = late, red = stale)
- Deploy dataset-level banners when hard thresholds are breached
- Provide a "Report outdated info" button to convert user distrust into actionable corrections
- Distinguish "Data Updated" from "Info Updated" to prevent false precision (`G4_risks_data_freshness.md`)

---

## 7. Richmond-Specific Context

### What Exists Today
- **Snow priority routes:** P1 (700 lane miles), P2 (200 lane miles), P3 (1,600 lane miles) across Northside, Southside, Downtown/Fan/Museum District, East End (`A2_problem_landscape_fleet_operations.md`)
- **Street sweeping zones:** Published as MultiPolygon on data.richmondgov.com with schedule fields (`D4_data_gps_fleet.md`)
- **DPW comms channels:** Project webpages, press releases, @DPW_RichmondVA on X, NBC12/WTVR amplification (`B1_users_concerned_resident.md`)
- **RVA311:** Active service request system that many CIP projects originate from (`B1_users_concerned_resident.md`)

### What's Missing
- No public-facing fleet status of any kind
- No "last serviced" timestamps for any street service
- No machine-readable priority route shapefiles confirmed on open data portal
- No data-sharing pipeline between DPW operations and 311/comms (`C4_services_gaps.md`)
- Construction project pages mix stale content (2021 hearing deadlines still live) with closed surveys showing no results (`C4_services_gaps.md`)
- No public NTMP queue despite 1,000+ traffic calming requests per year (`C4_services_gaps.md`)

### Peer Benchmark: Roanoke
Roanoke provides a centralized CIP & Construction hub with per-project estimated timelines, maps, and portfolio scale (215 capital projects, >$140M). Richmond's DPW pages offer no equivalent centralized, date-stamped project index (`C4_services_gaps.md`).

---

## 8. Solution Directions Ranked by Feasibility

From `F3_opportunities_fleet_ops.md`, five solution directions assessed for a 48-hour build:

| Direction | GPS Needed? | 48h Feasibility | Primary Value |
|---|---|---|---|
| **1. Zone-based schedule display** | No | High | Resident transparency — address lookup + next service window |
| **2. Supervisor route dashboard** | Mock OK | Medium | Supervisor oversight — validates future-state UX |
| **3. Manual status update tool** | No | High | Operational signal — crews mark zones complete |
| **4. Integrated supervisor + resident** | Optional | High | Multiplier — one data layer powers two audiences |
| **5. Notification prototype** | Optional | High | Comms — SMS/email on status change |

**Recommended bundle:** Ship Directions 1, 3, and 5 as a cohesive MVP. Present Direction 4 as the unified layer. Mock Direction 2 to demonstrate the future state with GPS. Frame the GPS gap positively: "designed for real-time, but delivering value today" (`F3_opportunities_fleet_ops.md`).
