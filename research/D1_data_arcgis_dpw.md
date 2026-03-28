---
title: "Richmond DPW GeoHub: Target Layers and Gaps for a Fast Project Explorer"
pillar: thriving-built-environment
section: D
problem_statement: transportation-project-visibility
tags:
 - GeoHub
 - ArcGIS layers
 - CIP dashboard
 - road centerlines
 - VDOT
 - permit data
summary: "Layer-by-layer assessment of Richmond's ArcGIS GeoHub for DPW data. Identifies MVP-ready layers (CIP dashboard, road centerlines, VDOT crash data) and gaps (construction permits, closures) for a fast project explorer."
geography: Richmond, VA
source: parallel-ai-pro
status: raw
related_reports:
 - D2_data_open_data_portal
 - C2_services_arcgis_landscape
 - H1_mvp_48hr_framework
---

> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# Richmond DPW GeoHub: Target Layers and Gaps for a Fast Project Explorer

## Executive Summary

The City of Richmond possesses a robust, publicly accessible GIS infrastructure that can immediately support a Minimum Viable Product (MVP) for a project explorer map. The most critical finding is that capital projects are already centralized and public: the City’s Capital Project Dashboard aggregates active, funded projects across departments and is updated on a quarterly basis [1]. This dashboard exposes essential project details, including descriptions, locations, project managers, current phases, and estimated completion dates [1]. 

To build a dependable explorer, scale demands reliable base layers. The Department of Public Works (DPW) manages 832 center-lane miles of streets, 836 miles of sidewalks, and 83 bridges [2]. Road centerlines are available directly through the Richmond GeoHub [3], with a proven statewide fallback available via the Virginia Geographic Information Network (VGIN), which publishes quarterly updates [4]. Furthermore, safety data is plug-and-play via state REST services; Richmond’s Vision Zero dashboard utilizes the Virginia Department of Transportation (VDOT) public FeatureServer for crash data [5]. 

While core transportation and capital improvement projects are well-documented, construction and Right-of-Way (ROW) permit activity is not currently discoverable as a public GIS layer. The fast path to user value is to build the MVP around the existing Capital Improvement Program (CIP) feed, road centerlines, and VDOT crash data, while deferring permit and signal data to a phase 2 roadmap.

## Data Landscape: Public and Reliable GeoHub Feeds

Three immediately usable data sources exist on the Richmond ArcGIS Online (AGOL) and GeoHub ecosystem. Other requested datasets are currently sparse or exist only as programmatic web pages rather than structured spatial data.

* **Capital Project Dashboard**: This interactive data and map tool serves as a centralized location for capital project information from all city departments [1]. It is updated quarterly and displays projects that have received funding and are in various phases of planning, design, or construction [1]. 
* **Road Centerlines**: The Richmond GeoHub hosts a "Centerlines" dataset covering the city and surrounding areas [3]. Additionally, the VGIN Road Centerlines (RCL) program provides a consistent, seamless statewide digital road centerline file updated quarterly, serving as a highly reliable alternative [4].
* **Vision Zero / Crash Data**: The City's Vision Zero Dashboard (covering 2017 to November 2025) directly consumes the VDOT "Full_Crash" FeatureServer [5]. This dataset includes valuable attributes for filtering, such as pedestrian/bicycle involvement, work zone relations, school zone relations, and severity (Killed or Incapacitated) [5].
* **Missing Data**: No obvious public GIS layers for construction permits, street closures, traffic signals, or dedicated bikeway inventories surfaced during this inventory. These are likely managed internally or through separate non-GIS portals like the Socrata-based Open Data Portal [6].

## Layer-by-Layer Status and Risk Assessment

The following table details the verified and inferred status of the requested layer types. CIP Projects, Council Districts, Centerlines, and VDOT Crashes are ready for MVP integration. Permits and specific program inventories require further investigation.

| Layer Type | Likely GeoHub/AGOL Item(s) | Access Method | Update Frequency | Expected Key Fields | Gaps / Risks | MVP Fit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Transportation & Capital Improvement Projects** | Capital Project Dashboard (AGOL Webmap) | Public AGOL dashboard / webmap [1] | Quarterly (Stated) [1] | Description, location, manager, phase, estimated completion date [1] | Not real-time; only includes funded projects [1]. | Go |
| **Road Network & Street Centerlines** | "Centerlines" (Richmond GeoHub) [3]; VGIN VBMP RCL [4] | Feature Service / Download [4] [3] | City: Not documented (metadata Dec 2025) [10]; VGIN: Quarterly [4] | Address, road name, state route number [4] | City attributes/currency not publicly documented; potential conflation issues with VGIN. | Go |
| **Traffic Safety Improvements** | VDOT Full_Crash FeatureServer [5] | Public REST API [5] | Unclear (Dashboard covers up to Nov 2025) [5] | Severity (K/A), ped/bike flags, alcohol, school/work zone [5] | Licensing/attribution requirements; positional accuracy of crash points. | Go |
| **Streetscape & Mobility Programs** | DPW Construction Projects Page [2] | Web page (non-GIS) [2] | As projects progress | Program name (e.g., New Sidewalk Program) [2] | No dedicated GIS layer; must rely on project categorization within the CIP feed. | Go (as filter) |
| **Construction Permit Activity** | Online Permit Portal [9] | Web portal (non-GIS) [9] | Real-time as issued [9] | Permit ID, type, status, issue/expire, location | May require login, internal API access, or non-GIS source integration. | Watch |

*Key Takeaway*: The MVP can be fully powered by the CIP dashboard's underlying webmap, the VGIN/City centerlines, and the VDOT crash REST endpoint. "Transportation improvement projects" and "Streetscape programs" should be modeled as categorical filters on the primary CIP dataset rather than separate layers.

## Access and Integration Plan

Access friction is low for the core layers, as they are built on public-facing Esri infrastructure. 

* **CIP Projects**: The Capital Project Dashboard is backed by a public webmap (ID: 270285e87d684a95bd1ebd9a078aa6df) [7]. The underlying FeatureLayer(s) should be extracted to access the geometry and attributes (phase, estimated completion, manager). **Refresh Cadence**: Quarterly, aligning with the City's stated update schedule [1].
* **Road Centerlines**: Attempt to consume the Richmond "Centerlines" layer as a public Feature Service [3]. If it is restricted to download-only, automate quarterly pulls or switch to the VGIN RCL REST endpoint [4]. **Refresh Cadence**: Quarterly.
* **VDOT Crashes**: Utilize the `Full_Crash` FeatureServer endpoint exposed by the Vision Zero dashboard (`services.arcgis.com/p5v98VHDX9Atv3l7/arcgis/rest/services/Full_Crash/FeatureServer/0`) [5]. **Refresh Cadence**: Monthly (if upstream updates allow), otherwise quarterly.
* **Authentication**: All identified services are public; no login is expected. Rate limits on the VDOT server should be monitored.

## Unknowns Requiring Direct Verification

To finalize the data pipeline, specific schema details must be verified directly against the AGOL REST endpoints.

| Layer | Fields to Confirm via REST/JSON | Priority |
| :--- | :--- | :--- |
| **CIP Projects** | Phase domain values; estimated completion date format; project type taxonomy; geometry types (point/line/polygon); budget fields. | High |
| **Centerlines (City)** | Presence of `one_way`, `func_class`, `speed`, `ownership`; last updated timestamp. | High |
| **VGIN RCL** | Field mapping compatibility with City schema; road names vs. route IDs. | Medium |
| **VDOT Full_Crash** | Exact update cadence; severity coding values; license/attribution text requirements. | High |
| **Permits (ROW/Utility)** | Dataset existence on Open Data Portal; spatial granularity (point vs. segment). | High |

*Key Takeaway*: A timeboxed 1-day technical verification pass on the CIP webmap JSON and VDOT REST endpoints will completely de-risk the MVP schema design.

## Data Quality and Coverage Risks

Anticipating data limitations and setting user expectations early is critical for adoption and trust.

* **Timeliness vs. User Expectation**: The CIP dashboard is updated quarterly [1]. Users may expect real-time construction status. **Mitigation**: Prominently display "Data as of [YYYY-MM-DD]" badges on the UI and link directly to the DPW project page for the latest public meeting notices and updates [2].
* **Scope Limitations**: The CIP dashboard only displays projects that have received funding [1]. It excludes unfunded requests and routine maintenance. **Mitigation**: Add a content disclaimer clarifying the scope, and provide a link to the RVA311 system for citizens to request new improvements [2].
* **Geographic Edge Cases**: The City notes that "some project boundaries may cross multiple districts" [1]. **Mitigation**: Ensure the application logic supports many-to-many relationships for filtering, allowing a single project to appear in multiple council district searches.
* **Crash Data Precision**: Crash event locations may lack pinpoint accuracy and suffer from reporting lags. **Mitigation**: Default the filter to severe crashes (Killed or Incapacitated) to reduce noise [5], aggregate to corridors if necessary, and include mandatory VDOT/VDMV attribution [5].

## MVP Recommendation: Layer Stack and UX

The fastest path to delivering user value is to build a focused, address-centric project explorer utilizing the four verified public layers. 

**Core MVP Layer Stack:**
1. **CIP Projects**: Direct FeatureLayer from the Capital Project Dashboard webmap.
2. **Council Districts**: Extracted from the City's AGOL environment to provide constituent context [1].
3. **Road Centerlines**: City "Centerlines" or VGIN RCL for base context and address proximity [4] [3].
4. **VDOT Full_Crash**: Filtered by default to severe (K/A) crashes to provide safety context around planned infrastructure [5].

**Recommended UX Features:**
* **Address Search**: Utilize the AGOL locator to allow users to find projects near their homes or commutes, mimicking the existing dashboard's search functionality [1].
* **Filters**: Implement filters for Project Type (road, bridge, streetscape), Phase (planning, design, construction), Council District, and Severe Crash presence within a 0.25-mile radius.
* **Detail Panel**: When a project is selected, display the description, phase, estimated completion, and project manager contact info [1].

## Phase 2 Roadmap: Signals, Bikeways, and Permits

Data gaps identified in this inventory should not block the MVP but must be scoped for Phase 2.

* **Traffic Signals & Intersections**: Run targeted queries with DPW Traffic Engineering. If internal, plan a data extract pipeline.
* **Bikeways & Trails**: Search GeoHub specifically for shared-use paths. If the City lacks an authoritative layer, evaluate supplementing with OpenStreetMap data, noting that local groups like MapRVA are actively mapping pedestrian infrastructure [8].
* **Permits & Street Closures**: Coordinate directly with DPW Right-of-Way to define a minimal schema for an internal API or automated export, as these are not currently public on the GeoHub.

## 48-Hour Verification Plan

To lock the MVP scope immediately, the following tasks should be executed over the next 48 hours:

1. **GIS Lead**: Extract the CIP webmap layers and Council Districts endpoints; capture JSON schemas and domain values.
2. **Data Engineer**: Attempt to connect to the City Centerlines REST endpoint; if it is download-only, test an ingest/host pipeline using the VGIN RCL as a fallback.
3. **Analyst**: Validate the VDOT Full_Crash fields (specifically severity coding) and draft the necessary layer metadata notes and attributions.
4. **Product Manager**: Confirm with DPW contacts that all "transportation improvements" are accurately categorized within the CIP feed and identify a point of contact for ROW permits.

## References

1. *CIP | Richmond*. https://rva.gov/budget-and-strategic-planning/cip
2. *Construction Projects & Road Improvements | Richmond*. http://www.rva.gov/public-works/construction-projects-road-improvements
3. *Centerlines | Richmond GeoHub*. https://richmond-geo-hub-cor.hub.arcgis.com/datasets/centerlines/explore
4. *Virginia Road Centerlines (RCL) - Overview*. https://www.arcgis.com/home/item.html?id=cd9bed71346d4476a0a08d3685cb36ae
5. *Vision Zero Dashboard (2017 to November 2025)*. https://cor.maps.arcgis.com/apps/dashboards/e6097a6342f148ce912ba98e04551e70?utm_source=CheersRVA&utm_medium=email&utm_campaign=school-walk-ins-the-us-open-cup-and-dutch-cities
6. *Open Data Portal | City of Richmond, Virginia | Open Data Portal | City of Richmond, Virginia*. https://data.richmondgov.com/
7. *City of Richmond CIP Dashboard*. https://www.arcgis.com/apps/mapviewer/index.html?webmap=270285e87d684a95bd1ebd9a078aa6df
8. *Mapping Pedestrian Infrastructure*. https://maprva.org/projects/sidewalks/
9. *Online Permit Portal | Richmond*. https://www.rva.gov/planning-development-review/online-permit-portal
10. *Virginia Road Centerlines (RCL) Metadata*. https://www.arcgis.com/home/item.html?id=cd9bed71346d4476a0a08d3685cb36ae