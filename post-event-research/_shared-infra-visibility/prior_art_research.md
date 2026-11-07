# Prior Art Research — Infrastructure Project Visibility

**Pillar:** Thriving and Sustainable Built Environment
**Problem Statement:** Help residents find and understand transportation and infrastructure projects happening in their neighborhoods.
**Applies to:** StreetLights, RideShift RVA
**Research Date:** April 1, 2026
**Method:** Synthesis of existing pillar research corpus (`pillar-repos/pillar-thriving-built-environment/research/`)

**Primary sources from existing corpus:**
- `E1_prior_art_project_trackers.md` — National landscape of municipal project trackers (Boston, Chicago, Philadelphia, Louisville, Arlington, Alexandria, Norfolk)
- `E2_prior_art_service_status.md` — Snow/fleet status tools and zone-based MVP patterns
- `E3_prior_art_311_integration.md` — 311-to-project-map integrations (Seattle, San Francisco, Philadelphia, Boston)
- `E4_prior_art_failures.md` — Why civic transparency tools die post-launch (NYC, EveryBlock, Sunlight Foundation)
- `E5_prior_art_weekend_viable.md` — 48-hour hackathon builds that shipped (ClearStreets, Syracuse, Adopt-a-Drain)
- `D1_data_arcgis_dpw.md` — Richmond GeoHub layers, CIP Dashboard, VDOT crash data
- `D2_data_open_data_portal.md` — Richmond Socrata datasets, Impact Map, platform fragmentation
- `D3_data_grant_documentation.md` — Harvard D³ grant documentation (not directly relevant to PS1; included for completeness)
- `C4_services_gaps.md` — DPW public information gaps, stale pages, peer benchmarking vs. Roanoke

---

## 1. Comparable Tools Nationally

### Capital Project Trackers (Long-Horizon Transparency)

**Alexandria Capital Infrastructure Map**
The strongest model for Richmond's CIP layer. Displays capital projects from the City's cross-departmental project management system. Pop-ups reveal project name, phase, planned budget, schedule dates, monthly progress updates, and a link to the dedicated project webpage. Filterable by name and phase. Demonstrates that PM-system integration yields the richest per-project data — but requires disciplined, continuous updates to avoid data rot (`E1_prior_art_project_trackers.md`).

**Boston Citywide Project Tracker**
Covers 213 projects with clear phase tags (Pending, Completed, Construction, Design, Planning) and highly accessible plain-language summaries. Uses a Map/List toggle and neighborhood/phase filters. However, the companion Transportation Projects map explicitly excludes routine resurfacing and curb ramp upgrades — illustrating the critical need to state scope limitations prominently (`E1_prior_art_project_trackers.md`).

**Louisville Transportation Capital Projects Dashboard**
Distinguishes between funded projects moving toward construction and unfunded "serious contender" projects — strong transparency pattern for managing expectations. However, its last update was September 2023, making it a cautionary tale: a dashboard without a published update SLA becomes a ghost dashboard (`E1_prior_art_project_trackers.md`).

**Norfolk CIP Dashboard (Power BI)**
Shows $285M in FY2025 adopted amounts across a multi-page Power BI dashboard. High financial transparency, but creates a new dataset each fiscal year and fragments "Mapped" vs. "Other" CIP projects across pages. Demonstrates the risk of unstable project IDs across budget cycles (`E1_prior_art_project_trackers.md`).

**NYC Capital Projects Dashboard**
Mandated by Local Law 37 for public transparency and tri-annual updates. An April 2024 Comptroller audit found the dashboard had not been updated since September 2023, contained only 46.8% of Financial Management System IDs and 58.1% of planned commitments, and entirely excluded projects from the School Construction Authority, MTA, and most HPD projects. The NYC Comptroller stated the resulting data products are "not useful for project management, financial management, or transparency." However, NYC Parks and NYCHA maintain successful dashboards with detailed timelines, funding sources, and bi-weekly updates — proving that scoped, well-governed dashboards succeed while comprehensive but unfunded ones fail (`E4_prior_art_failures.md`).

### Operational Trackers (Near-Term Disruption Visibility)

**Philadelphia StreetSmartPHL**
The most relevant operational model for Richmond. Consolidates street-level operations into a single portal (PavePHL, PermitPHL, PlowPHL, PickupPHL). Refreshes data hourly. PermitPHL includes a direct line to 311, allowing users to report non-permitted closures directly from the map. Target for Richmond: unify closures, paving, and service disruptions into a similarly integrated entry point (`E1_prior_art_project_trackers.md`, `E3_prior_art_311_integration.md`).

**Chicago ChiStreetWork**
Best-in-class notification system. Allows residents to draw a custom boundary on a Google Maps interface and receive daily, weekly, or monthly alerts about upcoming roadwork and special events. Maps data from one month in the past to one year in the future, including a 5-year history of repaved streets. Coordination has led to an estimated $183M in savings since 2012 by reducing re-cutting of newly paved streets (`E1_prior_art_project_trackers.md`).

### 311-to-Project Integrations

Three integration patterns emerge nationally (`E3_prior_art_311_integration.md`):

| Pattern | Complexity | Resident Value | Example |
|:---|:---|:---|:---|
| **Embedded 311 on closure map** | High (API/permit sync) | High (answers "Is this legal?" + reporting) | Philadelphia StreetSmartPHL |
| **Link-out to 311** | Low (simple URL) | Medium (user switches context) | Boston Capital Projects → BOS:311 |
| **Multi-agency explorer (no 311)** | Medium (inter-department data) | Medium (good for planning, poor for immediate issues) | San Francisco SF STREETS |

Richmond's fastest path is Pattern 2 (link-out to RVA311), evolving to Pattern 1 if RVA311 supports Open311 or exposes an API.

### Zone-Based Status Tools (No GPS Required)

The 48-hour MVP for fleet/service visibility does not require GPS. Every major snow/plow tool relies on GPS for its core functionality, but their most effective expectation-management features — activation thresholds, schedule windows, issue reporting forms — require zero live telemetry. A zone-based, phase-driven status map with address lookup and timestamps can ship in 48 hours using static priority shapefiles, operational phases, and manual status toggles (`E2_prior_art_service_status.md`).

---

## 2. Weekend-Viable Architectures

### Pattern 1: Static Map + Preprocessed GeoJSON + Cron
ClearStreets (Chicago) pulled GPS dots via script, snapped them to the street grid, and served via CartoDB/Leaflet. An SF street cleaning app achieved a fully backend-less architecture using GitHub Actions to regenerate static data daily. **Flow:** Fetch → Transform → Write GeoJSON → Serve via GitHub Pages → Render in Leaflet (`E5_prior_art_weekend_viable.md`).

### Pattern 2: Live Status Map with Point Feeds
Bypass the database if the city provides a live endpoint. Syracuse's hackathon used thousands of GPS rows from Automated Vehicle Location Devices on public works vehicles. **Flow:** Poll FeatureServer every few minutes → Cache last N points → Render clusters and "last seen" timestamps (`E5_prior_art_weekend_viable.md`).

### Pattern 3: Claim-and-Remind (Adopt-a-Thing)
Code for San Francisco built Adopt-a-Drain using open drain location data at no cost. 7,688 drains adopted. Requires minimal infrastructure: read-only map of assets → claim form → email reminders → admin CSV export (`E5_prior_art_weekend_viable.md`).

**48-hour anti-patterns:** Multi-agency portals, heavy authentication, route optimization algorithms. The Syracuse hackathon judges preferred a simple color-coded recency map (green 0-12h, orange 12-24h, red >24h) over complex analytics (`E5_prior_art_weekend_viable.md`).

---

## 3. Richmond's Data Landscape

### Immediately Usable Sources

| Source | Access | Update Cadence | MVP Fit |
|:---|:---|:---|:---|
| **Capital Project Dashboard** (ArcGIS webmap `270285e87d684a95bd1ebd9a078aa6df`) | Public AGOL | Quarterly (stated) | Go — funded projects with phase, manager, estimated completion |
| **Road Centerlines** (Richmond GeoHub + VGIN RCL fallback) | Feature Service / Download | VGIN quarterly | Go — base context and address proximity |
| **VDOT Full_Crash FeatureServer** | Public REST API | Unclear (data covers through Nov 2025) | Go — safety context filtered to severe (K/A) crashes |
| **Street Sweeping** (Socrata `2dh8-bzzs`) | OData/CSV | Last updated 2024-04-24 | Go — environmental maintenance route polygons |

### Available but Stale or Risky

| Source | Issue |
|:---|:---|
| **Richmond Impact Map** (Socrata `aq4i-4gpd`) | Lists "Weekly" cadence but last updated 2023-03-31. Contact dataset owner Chad Costello for refresh (`D2_data_open_data_portal.md`). |
| **ArcGIS PCI + Paving App** | Interactive map with PCI ratings; FY25/FY26 paving lists published as PDFs requiring manual conversion (`D2_data_open_data_portal.md`). |

### Not Currently Public

| Source | Barrier |
|:---|:---|
| **Construction / ROW permits** | Not discoverable as a public GIS layer; lives in the Online Permit Portal (`D1_data_arcgis_dpw.md`). |
| **RVA311 service requests** | Not published as a Socrata dataset; requires a one-time CSV export request from the CSR team (`D2_data_open_data_portal.md`). |
| **Traffic incidents** | "Traffic Info" app exists but API availability unknown; VDOT 511 is the fallback (`D2_data_open_data_portal.md`). |

---

## 4. Failure Modes and Sustainability Risks

### Top 3 Failure Modes for Richmond

| Failure Mode | Evidence | Richmond Trigger |
|:---|:---|:---|
| **Data staleness** | NYC dashboard missed updates for 6+ months; contained only 46.8% of IDs (`E4_prior_art_failures.md`). | Limited staff capacity; no automated pipeline. |
| **Orphaned tool** | ACM research: projects die without institutional integration and stable funding (`E4_prior_art_failures.md`). EveryBlock shut down twice despite users. | No continuation pathway named post-hackathon. |
| **Vendor/API fragility** | Sunlight Foundation APIs sunset with 28,570 keys and 543K daily calls (`E4_prior_art_failures.md`). Twitter API priced out civic tools. | GPS not ready; reliance on temporary scraping or third-party workarounds. |

### Sustainability Playbook from Prior Art

- **Narrow scope:** 5-10 priority projects from a single system-of-record. Manual CSV uploads monthly, not brittle scrapers (`E4_prior_art_failures.md`).
- **Governance document:** Formal scope, 4-8 hours/month maintenance budget, strict deprecation policy if funding lapses (`E4_prior_art_failures.md`).
- **Open standards:** Avoid proprietary APIs. Mirror datasets locally. Design graceful degradation UI ("Data temporarily unavailable as of [Date]") (`E4_prior_art_failures.md`).
- **ETL to static:** Normalize nightly, serve from CDN, decouple the UI from upstream source churn and ArcGIS rate limits (`A5_problem_landscape_infrastructure_data_fragmentation.md`).

---

## 5. UX Patterns That Work

Adopted from the seven national exemplars (`E1_prior_art_project_trackers.md`):

| Pattern | Source City | Why It Matters |
|:---|:---|:---|
| **Address/intersection search** | Chicago, Philadelphia | Residents start with "my street," not a project ID. |
| **Phase and status filters** | Boston, Alexandria | Let users narrow to Planning, Design, Construction. |
| **Map/list toggle** | Boston | Not everyone reads maps; text-based navigation is critical for accessibility. |
| **Plain-language summaries** | Boston (120-200 word descriptions) | Technical project descriptions alienate residents. |
| **Geo-fenced subscriptions** | Chicago ChiStreetWork | User-defined boundaries with daily/weekly/monthly alerts. |
| **Inline 311 reporting** | Philadelphia StreetSmartPHL | Let residents report issues directly from the map. |
| **"Included/Excluded" banners** | Boston, Louisville | State what the map does *not* show. Display "Last Updated" timestamp. |

---

## 6. Key Citations for Judges

- **On the two-track model:** "No single city provides a perfect out-of-the-box solution. Richmond should adopt Alexandria's rigorous CIP data structure, Philadelphia's unified operational portal, and Chicago's proactive notification system" (`E1_prior_art_project_trackers.md`).
- **On notification ROI:** ChiStreetWork's coordination has led to an estimated $183M in savings since 2012 by reducing instances of newly repaved streets being cut into for underground work (`E1_prior_art_project_trackers.md`).
- **On fragmented data nationally:** "Trillions of dollars are spent every year on infrastructure and estimates suggest between 10 and 30% of infrastructure investment is lost through inefficiency, mismanagement and corruption. Access to better and more joined up data is essential" (OC4IDS) (`A4_problem_landscape_public_works_transparency.md`).
- **On NYC's failure:** "The resulting data products are not useful for project management, financial management, or transparency" (NYC Comptroller) (`E4_prior_art_failures.md`).
- **On call deflection target:** Philadelphia's model targets a 15-25% reduction in 311 calls related to "what's happening on my street" within 6 months of launch (`E1_prior_art_project_trackers.md`).
