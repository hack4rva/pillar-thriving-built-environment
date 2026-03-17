# Richmond’s Path to a Unified Infrastructure Project Finder: What to Build Next, Using What We Already Have

## Executive Summary

Richmond’s infrastructure data is currently fragmented across multiple public channels, creating a discoverability problem for residents. Data lives on ArcGIS Hubs, standalone WebApps, and the Socrata-powered Open Data Portal. However, the City has significant momentum: the Paving Condition Index (PCI) of "Satisfactory or Good" streets has improved dramatically from 35% in 2018 to 75% in 2024 [1]. By consolidating existing endpoints—such as the DPW's Richmond Impact Map and ArcGIS feature layers—into a single, address-searchable map, Richmond can build public trust without starting from scratch. 

Cities like New York, Boston, and Portland provide clear, proven schemas for project transparency that Richmond can adopt immediately. Furthermore, while advanced features like real-time snowplow tracking require GPS fleet management systems, Richmond can launch a highly effective "planned work" and "winter ready" portal today using existing data, adding real-time telematics once fleet upgrades are complete.

## Why This Matters Now

Richmond’s recent infrastructure gains create a unique opportunity to build public trust. The City reports that streets with a Paving Condition Index (PCI) of Satisfactory or Good improved from 35% in 2018 to 75% in 2024 [1]. The Department of Public Works (DPW) already publishes a PCI Interactive Map and fiscal year paving lists [2]. Converting this progress into a unified, project-by-project pipeline allows residents to see exactly what is planned, in design, or under construction near their homes, shifting the narrative from reactive complaints to proactive transparency.

## Richmond Data Inventory with Direct Endpoints

Multiple ArcGIS and Socrata assets already expose REST endpoints. Consolidating these is the first step toward a unified map.

### ArcGIS Hub Assets: Bicycle Infrastructure

* **Verifiable Findings:** The Richmond GeoHub hosts a "Bicycle Infrastructure, Completed" dataset [3]. This layer includes Bike Lanes, Non-Motorized Shared Spaces, Paved Off-Roadway Paths, and Shared Roadways [3]. It is accessible as a Feature Layer [4].
* **Inferences:** This validates that ArcGIS REST endpoints are available and establishes a pattern for publishing other transportation layers.
* **Unknowns:** The exact update frequency and whether planned/in-progress bike infrastructure is maintained in the same accessible format.

### Paving and PCI via ArcGIS WebApp

* **Verifiable Findings:** The DPW Paving page links to an interactive map (ArcGIS WebApp item ID: 30c7084e3a2242a9beb47f75dd18c4db) that displays PCI ratings and is updated as paving projects are completed [2].
* **Inferences:** The existence of this WebApp implies that REST-accessible feature layers for PCI and paving segments exist behind it.
* **Unknowns:** The exact layer names, field schemas, and direct REST URLs until the item JSON is fully inspected.

### Socrata: Richmond Impact Map

* **Verifiable Findings:** The "Richmond Impact Map" on the Open Data Portal (data.richmondgov.com) is provided by the Department of Public Works [5]. It maps projects that may impact travel or parking, categorized under Transportation with tags like impact, traffic, right of way, and closure [5]. It has 1,559 views but was last updated on March 31, 2023 [5].
* **Inferences:** A DPW-owned dataset for closures exists but suffers from an update gap. It requires automated ETL processes to be useful.
* **Unknowns:** Why the updates stopped in 2023 and what internal system currently tracks active right-of-way closures.

## DPW Datasets on data.richmondgov.com

To support an infrastructure project lookup tool, Richmond can leverage existing datasets on its Open Data Portal [6].

### Confirmed: Richmond Impact Map

* **Verifiable Findings:** As noted, the Richmond Impact Map is a foundational dataset for near-term closures and impacts, accessible via OData and Socrata APIs [5].

### Likely Candidates: Sidewalks and Active Transportation

* **Verifiable Findings:** StoryMaps and analyses exist for sidewalk gaps and transit walksheds [7], as well as proposed BikePedRVA projects [8].
* **Inferences:** The presence of these analyses and DPW's active paving programs [2] suggests that underlying datasets for sidewalk work, right-of-way permits, and alley maintenance likely exist internally and could be published to the portal.
* **Unknowns:** Specific dataset titles and endpoints for active construction permits.

## Benchmarking What "Good" Looks Like

Successful cities converge on a reusable core schema for public project data. Richmond should adopt these essential fields.

### Core Public Project Fields Across Leading Cities

| City / Dataset | Structure & Geometry | Essential Fields | Source |
| :--- | :--- | :--- | :--- |
| **NYC DOT (Blocks)** | 27 columns; MultiLine geometry | ProjectID, ProjTitle, FMSID, ProjectType, ProjectStatus, DesignStartDate, ConstructionEndDate, CurrentFunding | [9] |
| **NYC DOT (Intersections)** | 30 columns; MultiPoint geometry | ProjectID, ProjTitle, FMSID, ProjectType, ProjectStatus, DesignStartDate, ConstructionEndDate, CurrentFunding | [10] |
| **NYC Capital Projects** | 16 columns; 3,320 rows | PID, Project Name, Description, Current Phase, Design Start, Forecast Completion, Budget Forecast | [11] |
| **Boston Capital Projects** | FeatureServer; GeoJSON/CSV/SHP | Managed by Boston Maps; includes FY2020-FY2023 capital projects | [12] |
| **Portland PBOT** | Polygon features (CIP Polys) | Capital Improvement Projects for City Bureaus | [13] |

*Key Takeaway:* A minimal, interoperable schema can be locked in today based on these proven models.

### Implications for Richmond's Schema

* **Inferences:** Richmond should define a core schema including: `project_id`, `title`, `description` (plain language), `geometry`, `lead_agency`, `external_id` (for financial tracking), `project_type`, `status/phase`, `key_dates` (design start, construction start/end), `budget`, `contact`, and `last_updated`.

## Resident Discovery Barriers

Residents in mid-sized cities often cannot find information about active construction projects due to several common barriers:

* **Multi-Portal Fragmentation:** Data is scattered across Richmond GeoHub [3], the Open Data Portal [5], and standalone rva.gov pages [2].
* **Lack of Address Search:** Residents want to know "what is happening on my block," but current tools often require panning and zooming on a citywide map rather than entering a home address.
* **Stale Data:** When tools like the Richmond Impact Map are not updated for years [5], residents lose trust in the platform.
* **Jargon:** Technical engineering descriptions are published without plain-language summaries.

## GPS Fleet Management: What it Buys and What to Specify

* **Verifiable Findings:** A GPS fleet management system produces telematics data.
* **Inferences:** Operationally, installing this system means DPW can track breadcrumb GPS paths, timestamps, vehicle IDs, engine hours, speed, and Power Take-Off (PTO) states (e.g., when a plow is down or a spreader is active).
* **Unknowns:** The specific vendor API, data sampling rate (e.g., 1-10 seconds), data retention policies, and which fields are permissible for public release.

## Winter Ops Transparency: Boston vs. Chicago

Cities take different approaches to winter operations transparency based on their technological maturity.

| Feature | Boston "Winter Ready" Model | Chicago "Plow Tracker" Model |
| :--- | :--- | :--- |
| **Core Data** | Published routes, service levels, readiness info, scheduled priorities, Capital Plan investments [14] | Real-time truck locations, coverage heatmaps, plow/spreader telemetry |
| **Requires Live GPS/AVL?** | No | Yes |
| **Public Value** | Sets expectations, shows preparedness, indicates where/when services are likely | Provides live status and immediate accountability |

*Key Takeaway:* Richmond can deliver a highly valuable "What to expect on my street" layer without GPS on day one, reserving live-truck visualization for a Phase 2 rollout after fleet telematics are installed.

## Current State of rva.gov Public Works Navigation

* **Verifiable Findings:** The DPW page on rva.gov includes a burger menu with links to Paving, Parking, Sidewalks, Snow Removal, and CIP/Projects [2]. The Paving page hosts a link to the Interactive Map and PDF lists for FY25 and FY26 [2].
* **Inferences:** It takes a resident at least 3-4 clicks from the homepage to find a specific map, and there is no single "Project Finder" entry point that aggregates paving, sidewalks, and capital projects.
* **Unknowns:** The exact web traffic and bounce rates on these specific subpages.

## Build vs. Buy: Low-Cost Options to Ship in 4-6 Weeks

Richmond can build an address-based project lookup tool using existing open-source or low-cost tools.

| Component | Recommended Tool | Rationale |
| :--- | :--- | :--- |
| **Mapping Library** | Esri Leaflet or ArcGIS JS API | Native support for ArcGIS REST endpoints; low development lift. |
| **Geocoding** | Esri World Geocoder | Allows address buffer queries to intersect project layers. |
| **Data Sources** | ArcGIS FeatureServer & Socrata API | Leverages existing infrastructure (e.g., Boston's pattern [12] and Richmond's Impact Map [5]). |
| **Hosting** | ArcGIS Hub Site or GitHub Pages | Fast deployment for static sites with client-side queries. |

*Key Takeaway:* Existing APIs plus open-source map libraries are sufficient to pilot an address-based finder without expensive new software licenses.

## Plain Language That Builds Trust

* **Verifiable Findings:** NYC's Department of City Planning (DCP) Capital Projects Database (CPDB) successfully linked project IDs to Checkbook NYC's FMS ID to connect budgets with project narratives [15].
* **Inferences:** Richmond must translate technical descriptions into plain language. Every project card should answer: "What is it?", "Why here?", "When?", "What to expect?", and "Who to contact?"

## Failure Modes and How to Avoid Them

Civic infrastructure transparency tools commonly fail for process reasons, not technological ones.

* **Stale Data:** Tools get ignored when data decays. The Richmond Impact Map hasn't been updated since 2023 [5]. *Mitigation:* Implement automated ETL jobs and display a visible "last updated" timestamp.
* **Schema Drift:** *Mitigation:* Lock in a minimal core schema (like NYC DOT's [9]) and version any changes.
* **Lack of Ownership:** *Mitigation:* Assign a specific data steward within DPW with KPIs tied to data freshness.
* **Poor UX:** *Mitigation:* Ensure the tool is mobile-first, includes address search, and offers Spanish translation.

## Implementation Roadmap

* **0-30 Days (Inventory & Prototype):** Catalog all ArcGIS/Socrata endpoints. Define the core schema. Build a clickable mockup with address search and ingest the existing Impact Map [5].
* **31-60 Days (Pilot & Automate):** Add PCI and paving segments [2]. Set up automated ETL jobs. Conduct user testing and apply plain-language templates.
* **61-90 Days (Scale & Prepare):** Expand to include sidewalk and right-of-way projects. Embed the unified finder on the rva.gov homepage. Validate the incoming AVL/GPS vendor API for future real-time integration.

## References

1. *Richmond’s big map of paving progress | Richmond*. https://rva.gov/city-stuff-press-releases-and-announcements/news/richmonds-big-map-paving-progress-0
2. *Paving | Richmond*. https://www.rva.gov/public-works/paving
3. *Bicycle Infrastructure, Completed | Richmond GeoHub*. https://richmond-geo-hub-cor.hub.arcgis.com/datasets/bicycle-infrastructure-completed/about
4. *Bicycle Infrastructure, Completed*. https://richmond-geo-hub-cor.hub.arcgis.com/datasets/cor::bicycle-infrastructure-completed/explore
5. *Richmond Impact Map | Open Data Portal | City of Richmond, Virginia*. https://data.richmondgov.com/Transportation/Richmond-Impact-Map/aq4i-4gpd
6. *Open Data Portal | City of Richmond, Virginia | Open Data Portal | City of Richmond, Virginia*. https://data.richmondgov.com/
7. *Sidewalk Analysis*. https://storymaps.arcgis.com/stories/d6aa226c65db407cbaf4cb91848834ea
8. *BikePedRVA Proposed Projects  *. https://storymaps.arcgis.com/stories/49834e6fb5c54329aef2cd276024a98c
9. *Street and Highway Capital Reconstruction Projects - Block | NYC Open Data*. https://data.cityofnewyork.us/Transportation/Street-and-Highway-Capital-Reconstruction-Projects/jvk9-k4re
10. *Street and Highway Capital Reconstruction Projects - Intersection | NYC Open Data*. https://data.cityofnewyork.us/Transportation/Street-and-Highway-Capital-Reconstruction-Projects/97nd-ff3i
11. *Capital Projects | NYC Open Data*. https://data.cityofnewyork.us/City-Government/Capital-Projects/n7gv-k5yt
12. *Capital Projects (FY2023) - Dataset - Analyze Boston*. https://data.boston.gov/dataset/capital-projects-fy2023
13. *Capital Improvement Projects CIP Polys*. https://gis-pdx.opendata.arcgis.com/datasets/capital-improvement-projects-cip-polys
14. *Capital Plan - Dataset - Analyze Boston*. https://data.boston.gov/dataset/capital-budget
15. *Welcome to the world DCP's Capital Projects Database*. https://medium.com/nyc-planning-digital/welcome-to-the-world-dcps-capital-projects-database-693a8b9782ac