---
title: "From Address to Active Projects in 48 Hours: A Feasible MVP Blueprint"
pillar: thriving-built-environment
section: H
problem_statement: transportation-project-visibility
tags:
  - 48-hour MVP
  - address lookup
  - Census Geocoder
  - ArcGIS FeatureService
  - Leaflet
  - GeoJSON
summary: "Technical blueprint for building an address-based infrastructure project lookup in 48 hours using Census Geocoder, ArcGIS FeatureService spatial queries, and Leaflet mapping with a static GeoJSON fallback."
geography: Richmond, VA
source: parallel-ai-pro
status: raw
related_reports:
  - H2_mvp_project_visibility
  - D1_data_arcgis_dpw
  - G1_risks_inaccurate_project_info
---

# From Address to Active Projects in 48 Hours: A Feasible MVP Blueprint

## Executive Summary
Building an address-based infrastructure project lookup MVP in 48 hours is highly feasible using off-the-shelf components. By combining the US Census Geocoder for address resolution [1], direct ArcGIS FeatureService spatial queries for project data [2] [3], and Leaflet for mapping [4], a three-person team can deliver a robust end-to-end demo this weekend. 

The critical path relies on securing a single stable dataset and successfully chaining the geocoder to the spatial query. UI polish is secondary to data plumbing. To mitigate risks, the team must avoid complex pagination by utilizing ArcGIS's built-in point-and-distance queries [5] [6], default to the Census API over rate-limited OpenStreetMap alternatives [7], and maintain a static GeoJSON fallback to guarantee a flawless demo regardless of live API availability.

## Objective and MVP Scope
**Key takeaway:** Deliver an address-to-project lookup for one jurisdiction with a map and 3–5 project results in 48 hours.

The user story is straightforward: A user enters an address, the system geocodes it, queries a FeatureService by distance, and displays a synchronized list and map with project status popups. To ensure success within 48 hours, the scope is strictly constrained to one city/county dataset, one specific layer, four canonical fields (name, status, URL, geometry), and a maximum of 5 results. The success metric is a 95%+ success rate on 10 curated demo addresses with a sub-1.5-second median response time.

## Technical Feasibility
**Key takeaway:** The combination of Census Geocoder, ArcGIS FeatureService, and Leaflet provides all necessary capabilities out of the box.

* **Address Geocoding:** The US Census Geocoder API provides a single-line address endpoint that returns JSON coordinates. Using the `benchmark=4` (Public_AR_Current) parameter, it reliably converts addresses to WGS84 coordinates [1]. It also supports batch processing of up to 10,000 addresses [8].
* **Project Data Access:** ArcGIS REST APIs support querying feature layers using spatial parameters. By passing a point geometry, a distance, and units, the API returns nearby features without requiring complex client-side filtering [5] [6] [9].
* **Map/UI:** Leaflet's `L.geoJSON` function, combined with the `onEachFeature` option, allows developers to easily bind popups to map markers using the properties of the returned GeoJSON data [4] [10] [11].

## Data Source Shortlist
**Key takeaway:** Choose one stable single-layer dataset to minimize schema risk during the build.

| Jurisdiction/Service | Layers | Spatial Reference | Max Record Count | Notes |
| --- | --- | --- | --- | --- |
| Capital Projects (FeatureServer) | 5 (Transportation, Sanitary, Drainage, Water, Major Non-City) | 102100 (3857) | 2000 | Multi-layer; good for future scope [2] |
| Capital_Projects_FY23 (FeatureServer) | 1 (Capital Projects 0) | 102100 (3857) | 2000 | Simpler schema; ideal for MVP [3] |

**Decision:** Start with `Capital_Projects_FY23` for minimal complexity. The single-layer structure reduces the need for complex data mapping.

## Query Design
**Key takeaway:** A compact ArcGIS REST query with point+distance returns relevant projects fast and avoids pagination limits.

The pipeline flows from the address to the Census Geocoder, extracting the latitude and longitude [1]. These coordinates are then fed into an ArcGIS query with a point buffer. 

Required parameters for the ArcGIS REST query include [5] [6] [9]:
* `geometryType=esriGeometryPoint`
* `geometry=<lon,lat>` (simple point syntax)
* `inSR=4326` (crucial for matching the geocoder's WGS84 output)
* `distance=250` (meters)
* `units=esriSRUnit_Meter`
* `spatialRel=esriSpatialRelIntersects`
* `outFields=*` (or a specific whitelist)
* `f=json`

To protect against zero-result queries in sparse areas, the application should implement an adaptive radius: starting at 250 meters, expanding to 500 meters, and finally 1000 meters if no results are found.

## 48-Hour Build Framework

### Hour 0–4 (Friday evening): Pre-code verification and decisions
* **Tasks:** Choose the primary FeatureServer layer, select 10 demo addresses, and confirm the geocoder choice. (Product/Researcher)
* **Decision Gates:** Must successfully hit the Census single-line endpoint [1] and confirm the FeatureServer query returns results via a manual URL test [3] [6].
* **Risk Checkpoints:** Spatial Reference (SR) mismatches or CORS issues.
* **Fallback:** Switch to a pre-fetched GeoJSON snapshot if live APIs fail initial tests.

### Hour 4–12 (Friday night / Saturday morning): Minimum buildable core
* **Tasks:** Implement `geocode()` using the Census API; implement `queryProjectsNearPoint()`; stub the Leaflet map to render GeoJSON points and popups [1] [5] [4]. (Developer)
* **Decision Gates:** End-to-end success on 3 test addresses (address -> coordinates -> projects -> map).
* **Risk Checkpoints:** The `distance` parameter might not be supported on the chosen layer [5].
* **Fallback:** If distance is unsupported, use an envelope (bounding box) query with a small extent.

### Hour 12–24 (Saturday): Working demo checkpoint
* **Tasks:** Implement the adaptive radius logic; synchronize the list and map; map fields for name, status, and URL; cap results at 5; add loading/error states. (Developer/Product)
* **Decision Gates:** The "happy path" is complete. All 10 demo addresses return a list and map in under 1.5 seconds.
* **Risk Checkpoints:** Unexpected field schema variations across different project types.
* **Fallback:** Implement a raw attribute fallback renderer that simply dumps available text fields into the popup.

### Hour 24–36 (Saturday night / Sunday morning): Polish, testing, and content
* **Tasks:** Apply CSS styling, add attribution footers, build an "About" page, cache demo addresses, and create a `/status` health route that pings the geocoder and FeatureServer. (All)
* **Decision Gates:** All non-functional requirements (attribution, health links) pass review.
* **Risk Checkpoints:** Accidental misuse of fallback geocoders like Nominatim, which has strict usage policies [7].
* **Fallback:** Lock the application to the Census API only and remove any Nominatim code paths.

### Hour 36–48 (Sunday): Demo prep, rehearsal, and final risk review
* **Tasks:** Finalize the scripted demo flow, prepare the offline contingency (static GeoJSON), and record a backup screencast. (Product/Researcher)
* **Decision Gates:** Successful dry-runs on both conference Wi-Fi and a mobile hotspot.
* **Risk Checkpoints:** Sudden API outages during the live presentation.
* **Fallback:** Toggle the application into "offline mode" using static data.

## Critical Path
**Key takeaway:** Three tasks block everything else and must be prioritized.

| Task | Blocks | Unblock Strategy |
| --- | --- | --- |
| Select primary FeatureServer layer | All query and mapping work | Decide by Hour 2; if unstable, switch to secondary dataset [2] [3]. |
| Implement geocode() via Census | Any query against FeatureServer | Cache 10 demo addresses; precompute lat/lon JSON [1]. |
| Implement queryProjectsNearPoint() | UI list/map, adaptive radius | If distance is unsupported, switch to bbox; if CORS fails, add a proxy [5]. |

## Fallback if "GeoHub API" is Unavailable
**Key takeaway:** Skip branded Hub search APIs and use direct FeatureServer endpoints and static caches.

If a specific city's "GeoHub" portal goes down, the underlying ArcGIS FeatureServices often remain active. The MVP should integrate directly with the FeatureServer layer URLs [2] [3]. Furthermore, the team must maintain a static GeoJSON snapshot of the 10 demo addresses. In offline mode, Leaflet's `addData` method can render this static data instantly, bypassing the need for live API calls entirely [10] [11].

## Demo-Ready Definition
**Key takeaway:** A demo-ready MVP provides one clean flow with graceful fallbacks.

The MVP is "demo-ready" when a user can enter a U.S. address and instantly see 0–5 nearby projects within a 250–1000 meter radius. The list and map must be synchronized, with each item displaying a name, status, external link, and distance. Map popups must open upon selection [4]. The application must gracefully handle loading states, zero-result scenarios (by displaying a "widened radius" badge), and API errors. Finally, it must include proper attribution footers for the Census Bureau and the data owner.

## Risks and Mitigations
**Key takeaway:** Proactive Spatial Reference (SR) handling and static caches eliminate demo fragility.

| Failure Mode | Symptom | Mitigation |
| --- | --- | --- |
| SR mismatch (layer 102100 vs input 4326) | 0 results returned | Always pass `inSR=4326` in the query; add an SR validator to the health check [5] [6]. |
| Distance unsupported on layer | 0 results despite nearby projects | Inspect layer capabilities; fallback to a bounding box (envelope) query [5] [6]. |
| Geocoder outage | Address errors/timeouts | Use cached lat/lon coordinates for the 10 demo addresses; switch to static mode [1]. |
| Nominatim policy breach | 429 Too Many Requests / Blocked | Avoid Nominatim in the production demo; if used, provide a valid User-Agent and email [7] [12]. |
| Max Record Count exceeded | Truncated responses | Use spatial filters and `outFields` to minimize payload; cap results at N=5 [2] [3]. |

## Test Plan and Content
**Key takeaway:** A small, realistic test set unlocks confidence and speed.

The researcher should curate 10 specific addresses near known capital projects, documenting the expected results and approximate distances. Acceptance criteria dictate that 9 out of 10 addresses must return at least 1 project within 1000 meters, all popups must render correctly, and response times must remain under 1.5 seconds. The test set must include edge cases, such as a suburban address expected to yield zero initial results (to test the radius expansion) and a dense urban address to test the 5-result cap.

## Legal/Attribution
**Key takeaway:** Stay within usage policies to avoid mid-demo blocks.

The US Census Geocoder is approved for public use and supports up to 10,000 addresses in a batch [8]. Proper attribution should be included in the footer. If Nominatim is used as a fallback, the team must strictly adhere to its Acceptable Use Policy, which mandates identifying the application via an email address or User-Agent and severely limiting request volume, as it runs on donated servers with limited capacity [7] [12] [13]. Finally, the application must credit the jurisdiction providing the FeatureService data [2] [3].

## References

1. *US census geocoding API*. https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.html
2. *Capital Projects (FeatureServer)*. https://services2.arcgis.com/Q6Lq3evZUGfPrN7o/arcgis/rest/services/Capital%20Projects/FeatureServer
3. *Capital_Projects_FY23 (FeatureServer)*. https://services.arcgis.com/sFnw0xNflSi8J0uh/arcgis/rest/services/Capital_Projects_FY23/FeatureServer
4. *Using GeoJSON with Leaflet - Leaflet - a JavaScript library for interactive maps*. https://leafletjs.com/examples/geojson/
5. *Query (Feature Service/Layer) | ArcGIS REST APIs | Esri Developer*. https://developers.arcgis.com/rest/services-reference/enterprise/query-feature-service-layer/
6. *Query (Feature Service) | ArcGIS REST APIs | Esri Developer*. https://developers.arcgis.com/rest/services-reference/enterprise/query-feature-service/
7. *Nominatim Usage Policy (aka Geocoding Policy)*. https://operations.osmfoundation.org/policies/nominatim/
8. *Census Bureau Public Geocoder*. https://www2.census.gov/geo/pdfs/maps-data/data/FAQ_for_Census_Bureau_Public_Geocoder.pdf
9. *Query features | Documentation - Esri Developer*. https://developers.arcgis.com/documentation/portal-and-data-services/data-services/feature-services/query-features/
10. *Documentation - Leaflet - a JavaScript library for interactive maps*. https://leafletjs.com/reference.html
11. *javascript - Leaflet Popup with additional information from GeoJSON - Stack Overflow*. https://stackoverflow.com/questions/14506989/leaflet-popup-with-additional-information-from-geojson
12. *Search - Nominatim 5.2.0 Manual*. https://nominatim.org/release-docs/latest/api/Search/
13. *Reverse Geocoding - Nominatim 5.2.0 Manual*. https://nominatim.org/release-docs/latest/api/Reverse/