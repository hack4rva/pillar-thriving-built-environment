> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# Richmond GeoHub DPW Data: Public Inventory, Quality, and API Playbook

## Executive Summary
Richmond’s GeoHub presents a bifurcated data landscape for Department of Public Works (DPW) and transportation use cases. The core network layers—specifically Street Centerlines, Sidewalks, and Transportation Surfaces—are actively maintained and feature rich, making them highly reliable for routing and pedestrian analytics. However, operational and project-specific layers are severely outdated, with some datasets untouched since 2018. 

Crucially, despite a 2019 press release announcing interactive Pavement Condition Index (PCI) scores [1], no current, standalone public PCI feature layer is available. Furthermore, Richmond lags behind peer cities like Charlotte and Norfolk in publishing transparent, up-to-date capital project feeds and multimodal trip counts. For hackathon teams and developers, success depends on leveraging the robust base layers, utilizing defensive API pagination to navigate strict `maxRecordCount` limits (1,000–2,000 records), and standardizing mixed spatial references on the fly.

## What Richmond Publishes Today — Base networks are solid; operations are mixed

The public ArcGIS REST services backing Richmond GeoHub reveal a stark contrast between foundational infrastructure data and operational tracking. 

| Layer Name | Geometry | Last Edit Date | MaxRecordCount | Key Fields & Notes |
| --- | --- | --- | --- | --- |
| Carriageway Centerlines | Line | 2025-05-14 | 1000 | `FunctionalClass`, `OneWay`, `PostedSpeed`, addressing [2] |
| Sidewalks_View | Polygon | 2026-03-16 | 2000 | `Status`, `Condition` (1-5), `Side_of_Street`, `CouncilDistrict` [3] |
| Transportation Surfaces | Polygon | 2023-12-08 | 2000 | 167,567 features; `SubType` includes Sidewalks, Driveways [4] [5] |
| Street Closures (view) | Point | 2026-03-02 | 2000 | `Utility`, `Closure` type, `DisplayOnMap` (Active/Inactive) [6] |
| Bicycle Facilities | Line | 2021-01-05 | 2000 | `Status` only; highly stale [7] |
| FY21 Transportation Projects | Point | 2020-12-02 | 2000 | `Project`, `Address` only; stale [8] |
| Snow Routes P2 | Line | 2018-01-03 | 2000 | Includes `PCI` field; very stale [9] |
| Street Sweeping Locations | Polygon | 2020-08-17 | 2000 | `Schedule` fields; stale [10] |
| High Injury Network 2018 | Line | 2019-07-09 | 2000 | 2018 HIN; static historical data [11] |
| GRTC Accessibility Stops | Multipoint | 2023-04-04 | 2000 | Only `OBJECTID` exposed; likely incomplete [12] |

*Takeaway: Prioritize Centerlines, Sidewalks, and Street Closures for "current conditions" applications. Treat all other layers as historical or illustrative.*

### Inventory by theme — Exactly what’s available to the public
**Fact:** Richmond publicly exposes its core road network via the Carriageway Centerlines and Roads (Polygon) layers [5] [2]. Pedestrian infrastructure is covered by a massive Transportation Surfaces layer (167,567 records) [4] and a dedicated Sidewalks_View [3]. Operational data includes an actively updated Street Closures view [6], alongside older datasets for Snow Routes [9] and Street Sweeping [10]. Modal and safety data include a 2018 High Injury Network [11], a 2021 Bicycle Facilities layer [7], and a sparse GRTC Accessibility Stops layer [12].

### What’s missing for DPW use cases
**Inference:** Richmond is missing critical transparency layers that are standard in modern municipal GIS portals. There is no live Pavement Condition Index (PCI) layer, no comprehensive citywide capital projects feed (only an outdated FY21 layer [8]), and no public asset-level inventories for traffic signals or streetlights. 

## Data quality and freshness — Where the data is reliable vs risky

Editor tracking and domain usage suggest strong internal governance on core assets, but operational layers require strict validation before use.

* **Success Patterns:** The `Sidewalks_View` layer was updated as recently as March 16, 2026, and utilizes strict coded domains for condition and status [3]. Similarly, `Street Closures` is actively maintained (last edited March 2, 2026) [6], and `Carriageway Centerlines` was updated in May 2025 [2].
* **Failure Cases:** Project and seasonal layers are abandoned. `Snow_Routes_P2` has not been edited since January 2018 [9]. `FY21_Transportation_Projects` is frozen in December 2020 [8]. `Bicycle Facilities` has not been updated since January 2021 [7]. 
* **Inference:** The City likely manages active capital projects and current snow operations in internal, non-public dashboards, leaving the public GeoHub with deprecated snapshots.

## Schema patterns and join keys — How to model Richmond’s assets fast

Richmond's active layers share consistent schema patterns that enable robust relational joins and UI filtering.

* **Roads/Centerlines:** The `CarriagewayCenterlines` layer is highly detailed, featuring `FunctionalClass` (e.g., Principal Arterial, Minor Arterial), `OneWay` indicators, `PostedSpeed`, and comprehensive left/right addressing ranges [2].
* **Sidewalks:** The `Sidewalks_View` layer is excellent for asset management apps, tracking `Status` (In Service, Planned, Retired), `Condition` (coded 1-5, Excellent to Poor), `Condition_Date`, `Side_of_Street`, and `CouncilDistrict` [3].
* **Street Closures:** Designed for live mapping, this layer includes `Utility` (Gas, Sewer, Water, Stormwater), `Closure` type (Road, Right Lane, Left Lane), and a critical `DisplayOnMap` field (Active/Inactive) [6].
* **Design Recommendation:** Normalize assets using common keys where available (e.g., `FIPS` = 760 for Richmond [5] [2]). Maintain domain dictionaries in your application to map coded values to human-readable labels.

## Spatial reference pitfalls — Normalize geometry early

**Fact:** Richmond's public services do not use a unified spatial reference system, which will break naive map mashups. 
* `CarriagewayCenterlines` and `Sidewalks_View` use Virginia State Plane South NAD83 (WKID: 102747 / 2284) [2] [3].
* `Bicycle Facilities` and `Street Closures` use Web Mercator (WKID: 102100 / 3857) [7] [6].
* `High_Injury_Network_2018` uses NAD83 Geographic (WKID: 4269) [11].

**Action:** Always explicitly request an output spatial reference (`outSR=4326` for standard GeoJSON/GPS compatibility or `102100` for web maps) in your REST API queries to force the server to reproject the data before delivery.

## ArcGIS REST API playbook — Queries that won’t break in production

To build stable applications against Richmond's GeoHub, developers must respect Esri's server-side constraints. The `maxRecordCount` is strictly enforced: 1,000 for Centerlines [2] and 2,000 for most other layers [5] [3]. Esri documentation notes that while points can theoretically support up to 16,000 records, lines and polygons are hard-capped at 2,000 [13]. Furthermore, aggressive querying can result in HTTP 429 (Rate Limited) responses [14].

### Recommended Query Patterns for Hackathon Teams

**1. Paginated Pull (Bypassing the 1k/2k limit):**
Use `resultOffset` and `resultRecordCount` to loop through large datasets like Centerlines [14].
```
/FeatureServer/0/query?where=1=1&outFields=OBJECTID,FunctionalClass,OneWay,PostedSpeed&f=json&outSR=4326&returnGeometry=true&orderByFields=OBJECTID&resultOffset=0&resultRecordCount=1000
```

**2. Spatial Bounding Box Filter (For high-volume layers):**
The Transportation Surfaces layer has 167,567 records [4]. Never query `1=1`. Use an envelope geometry filter.
```
/FeatureServer/0/query?where=SubType IN (3,4,8)&geometry={xmin,ymin,xmax,ymax}&geometryType=esriGeometryEnvelope&inSR=4326&outSR=4326&f=json
```

**3. Live Operational Filtering (Street Closures):**
Filter the view layer server-side to only pull active disruptions [6].
```
/FeatureServer/0/query?where=DisplayOnMap='Active'&outFields=Utility,Closure,Location&f=json&outSR=4326
```

**Performance Tip:** Prefer `f=json` or `f=pbf` over `f=geojson` for faster server response times, and set `returnGeometry=false` if you only need to summarize attribute data [14].

## Limitations and risks — What could derail your analysis

* **Schema Drift in View Layers:** `Sidewalks_View` and `Street Closures` are updatable views (`Is View: true`, `Source Schema Changes Allowed: true`) [3] [6]. Field aliases or domains can change without notice. Code defensively with field-existence checks.
* **Missing Attributes:** The `GRTCaccessibilitystops` layer exposes an `OBJECTID` but no other attributes [12]. **Inference:** This is likely a permissions error or an incomplete placeholder. Do not rely on it for transit analytics.
* **Rate Limiting:** The ArcGIS server will return a `429` response if overwhelmed [14]. Implement exponential backoff and cache intermediate results locally.

## Peer benchmarking — Where Richmond stands vs Norfolk, Raleigh, Charlotte

Richmond’s base network data is competitive, but the city falls behind regional peers in operational transparency and multimodal data.

| City | Street Centerlines | Capital Projects | Multimodal & Ops Data |
| --- | --- | --- | --- |
| **Richmond** | Yes (Updated 2025) [2] | Stale (FY21 only) [8] | Stale bike/snow data; active street closures [7] [6] [9] |
| **Norfolk** | Yes (Updated 2024) [15] | Unknown | Publishes active Bike and Pedestrian Trip Counts [16] |
| **Charlotte** | Yes | Live Capital Projects Dashboard [17] | Broad portfolio via open data portal |
| **Raleigh** | Yes | Various dashboards | Mature open data ecosystem [18] |

*Takeaway: To provide immediate value in a hackathon, emulate Charlotte’s transparency by fusing Richmond's Street Closures, Centerlines, and Sidewalks into a "Capital Projects Lite" dashboard.*

## Hackathon build plan — 48-hour roadmap to a credible MVP

To build a successful prototype over a weekend, focus strictly on the actively maintained layers and clearly flag stale content.

1. **Data Ingestion & ETL:** Pull `CarriagewayCenterlines`, `Sidewalks_View`, and `Street Closures`. Force all geometries to `outSR=4326`. Map the coded domains (e.g., Condition 1-5) to readable text.
2. **Feature 1: Active Disruption Monitor:** Map the `Street Closures` layer where `DisplayOnMap='Active'`, joined spatially to the `CarriagewayCenterlines` to show impacted functional classes.
3. **Feature 2: Pedestrian Equity Explorer:** Use `Sidewalks_View` to map sidewalk conditions by `CouncilDistrict`. 
4. **Handling Gaps:** Since PCI and current capital projects are missing, design pluggable UI endpoints marked "Data Requested from DPW" to show the city what *could* be built if they published the data. Use the 2018 HIN layer [11] strictly as a "historical reference" overlay.

## Validation tasks and open questions — De-risk before demo

**Specific layer names or types to verify (Unknown/Inference):**
* **Current PCI Layer:** A 2019 press release announced a PCI map [1]. Verify with DPW/GeoHub admins if a current PCI feature service exists under a non-public or differently named item ID.
* **Current Capital Projects:** `FY21_Transportation_Projects` is deprecated [8]. Ask if a live CIP (Capital Improvement Plan) layer exists.
* **GRTC Accessibility Stops:** Verify if the lack of attributes [12] is intentional. If so, teams should ingest GTFS data directly from GRTC instead.
* **Traffic Signals/Streetlights:** No public inventory was found. Verify if read-only views can be provisioned for the event.

## References

1. *City Releases Pavement Condition Scores through Interactive Mapping Application | Richmond*. https://www.rva.gov/press-releases-and-announcements/news/city-releases-pavement-condition-scores-through-interactive
2. *Layer: Centerlines (ID:0)*. https://services1.arcgis.com/k3vhq11XkBNeeOfM/ArcGIS/rest/services/CarriagewayCenterlines/FeatureServer/0
3. *Layer: area_Sidewalk (ID:0)*. https://services1.arcgis.com/k3vhq11XkBNeeOfM/ArcGIS/rest/services/Sidewalks_View/FeatureServer/0
4. *Transportation Surfaces - Richmond GeoHub - ArcGIS*. https://richmond-geo-hub-cor.hub.arcgis.com/datasets/transportation-surfaces-2
5. *Layer: Roads (Polygon) (ID:0)*. https://services1.arcgis.com/k3vhq11XkBNeeOfM/ArcGIS/rest/services/Roads/FeatureServer/0
6. *Fetched web page*. https://services1.arcgis.com/k3vhq11XkBNeeOfM/ArcGIS/rest/services/Utility_Work_Locations_and_Street_Closures_view/FeatureServer/0
7. *Layer: Bicycle Facilities (ID:0)*. https://services1.arcgis.com/k3vhq11XkBNeeOfM/ArcGIS/rest/services/Bicycle_Facilities/FeatureServer/0
8. *Layer: Sheet1 (ID:0)*. https://services1.arcgis.com/k3vhq11XkBNeeOfM/ArcGIS/rest/services/FY21_Transportation_Projects/FeatureServer/0
9. *Fetched web page*. https://services1.arcgis.com/k3vhq11XkBNeeOfM/ArcGIS/rest/services/Snow_Routes_P2/FeatureServer/0
10. *Fetched web page*. https://services1.arcgis.com/k3vhq11XkBNeeOfM/ArcGIS/rest/services/street_sweeping_locations/FeatureServer/0
11. *Fetched web page*. https://services1.arcgis.com/k3vhq11XkBNeeOfM/ArcGIS/rest/services/High_Injury_Network_2018/FeatureServer/0
12. *Fetched web page*. https://services1.arcgis.com/k3vhq11XkBNeeOfM/ArcGIS/rest/services/GRTC_Accessibility_Stops/FeatureServer/0
13. *FAQ: What Are the Limits of the maxRecordCount and maxRecordCountFactor Properties at REST*. https://support.esri.com/en-us/knowledge-base/faq-what-are-the-limits-of-the-maxrecordcount-and-maxre-000030432
14. *Query table features | Documentation - Esri Developer - ArcGIS*. https://developers.arcgis.com/documentation/portal-and-data-services/data-services/feature-services/query-table-features/
15. *Street Centerline - City of Norfolk - Dataset - Virginia Open Data Portal*. https://data.virginia.gov/dataset/street-centerline-city-of-norfolk
16. *Bike and Pedestrian Trip Counts - City of Norfolk, VA Open Data*. https://data.norfolk.gov/Recreation/Bike-and-Pedestrian-Trip-Counts/x3iy-p3xt
17. *Capital Projects Dashboard - City of Charlotte*. https://www.charlottenc.gov/Growth-and-Development/Projects/Capital-Projects-Dashboard
18. *Apps, Maps, and Open Data | Raleighnc.gov*. https://raleighnc.gov/apps-maps-and-open-data