> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# Build-Now, Wire-Later: Credible Richmond DPW MVPs with Mock + Historical Data

## Executive Summary
To build credible, demo-ready MVPs for Richmond's built environment challenges without fully operational primary data sources, teams must adopt a "build-now, wire-later" architecture. Richmond provides a solid geospatial spine—specifically live Centerlines and Council Districts—that can anchor these prototypes in reality [1] [2]. While event-level 311 data and specific street sweeping schedules are not readily available in bulk, high-level operational data like snow removal priority lane miles (700 miles for Priority 1) provide a credible baseline for simulation [3]. By implementing a thin data adapter layer, teams can seamlessly swap mocked JSON feeds for live APIs later, ensuring the prototype remains transparent, technically sound, and highly persuasive to civic stakeholders.

## Purpose and Success Criteria
The primary goal is to ship credible Minimum Viable Products (MVPs) that function beautifully today while explicitly planning for tomorrow's live data. We will deliver two transparent-by-design MVPs that use live Richmond GIS layers for context and cleanly mocked feeds for unavailable data, with a documented path to production wiring.

## Richmond Data Landscape
Richmond's open data ecosystem provides strong foundational layers, though operational event logs remain sparse. Live centerlines and districts are dependable anchors; 311 volumes are high but bulk access is unclear; snow priorities are documented but not as a public layer.

### Verified GIS Anchors with URLs and Fields

| Layer Name | Purpose | Records/Polygons | REST URL |
| :--- | :--- | :--- | :--- |
| **Centerlines** | Base road network for routing and snapping | 29,423 segments | `services1.arcgis.com/.../CarriagewayCenterlines/FeatureServer/0` [2] |
| **Council Districts** | Zone-based rollups and filtering | 9 districts | `services1.arcgis.com/.../CouncilDistricts/FeatureServer/0` [1] |
| **Addresses** | Geocoding and specific location mapping | Active addresses | `richmond-geo-hub-cor.hub.arcgis.com/datasets/...` [4] |
| **Zoning Districts** | Land use context | Citywide | `richmond-geo-hub-cor.hub.arcgis.com/datasets/zoning-districts-1` [5] |

*Takeaway: These live layers allow the MVP to render real city context, making the mocked operational data layered on top feel grounded and authentic.*

### Operations Context Sources
The Department of Public Works (DPW) publishes operational scopes that can serve as simulation baselines. For snow removal, Priority 1 routes cover 700 lane miles (28% of the city), and Priority 2 routes cover 200 lane miles (8%) [3]. Additionally, trash collection routes service 65,000 residences across 90 routes, visible via a dedicated web app [6].

### Potential Proxies and Gaps
While the city handled 208,216 RVA311 requests in 2025 (up from over 83,000 in 2024) [7] [8], a bulk Socrata dataset for these requests is not immediately discoverable on the Open Data Portal [9]. Consequently, historical street sweeping schedules and snow completion logs remain unknown.

## MVP Architecture
A "build-now, wire-later" approach requires isolating the application logic from the data source. A thin adapter, combined with configuration flags and a local cache, isolates your app from data volatility and makes mock/live swapping trivial.

### Data Adapter Design
Implement a data adapter layer that normalizes requests and responses against a strict JSON Schema contract. This layer handles retries, caching, and rate-limiting, ensuring the UI components don't care whether the data comes from a local JSON file or a live REST API.

### Config-Driven Endpoints and Feature Flags
Use environment variables to control data flow: `GEOHUB_BASE_URL`, `GEOHUB_LAYERS={centerlines,council_districts}`, `TELEMETRY_SOURCE=json|api`, and `PROJECTS_SOURCE=csv|api`. This allows instant toggling during a demo if a live endpoint fails.

### Documentation That Builds Trust
Include a "Swap Checklist" in the repository README. Add inline source badges in the UI (e.g., "Data Source: Mocked Telemetry") and outline an API integration plan targeting Richmond's ArcGIS organization endpoints.

### Failure Cases and Mitigations
If a REST endpoint returns a 5xx error or times out, the adapter should automatically fall back to a cached snapshot. If schema drift occurs, the adapter version can be pinned and transformed to match the expected UI contract.

## Fleet Operations Demo
Designing convincing synthetic AVL (Automated Vehicle Location) without deployed GPS requires snapping simulated tracks to Richmond centerlines at plausible speeds and timings.

### Event Schema and Output Formats
Standard municipal telematics output a GeoJSON Point feature containing: `timestamp` (ISO 8601 UTC), `vehicle_id`, `lat`, `lon`, `speed_mps`, `heading_deg`, `accuracy_m`, `event_type`, and `route_id`.

### Route and Track Generation Against Real Streets
Use the Centerlines polyline geometry [2] to generate paths. Interpolate points at 1–5 second intervals, include stops or dwell times at intersections, and add slight spatial jitter (3–8 meters) to mimic real-world GPS noise.

### Plausibility Calibration
Ensure simulated speeds match the operational reality of sweepers and plows (e.g., 5–25 mph). Account for turning radii, pauses on corners, and segment coverage to accurately reflect the 700 lane miles of Priority 1 snow routes [3].

### Validation and QA
Perform a visual pass on the basemap to ensure tracks don't cross buildings. Implement a "no teleport" rule to flag any coordinate jumps greater than 100 meters per second.

### Risks and Ethics
Clearly label the mock data. Do not attribute simulated performance metrics to actual DPW operations, and include proper attribution for the underlying GIS layers.

## Transportation Project Visibility MVP
Render projects over live Council Districts [1] and Centerlines [2] with a CSV-backed pipeline that can be replaced by a future API.

### Minimal Project Schema and Caching
Define a schema including `project_id`, `name`, `description`, `status`, `geometry` (point/line), `start/end dates`, and `funding source`. 

### Handling Sparse/Changing GeoHub APIs
Build an adapter that consumes FeatureServers where available, but relies on a local CSV/GeoJSON cache updated via a pre-demo script to prevent live-demo failures.

## Substitution Data Sources When GPS Is Missing
Pair mocked AVL with public context (weather, zones, complaints) to create believable scenarios.

### Weather-Driven Snow Event Scenarios
Use DPW snow priority proportions [3] to simulate a storm response. Anchor the simulation to historical Richmond winter events to provide narrative weight.

### Community Signals and Zones
Use Council Districts [1] for spatial rollups. While bulk 311 data is missing, you can manually curate a small set of mock 311-style complaints (e.g., "missed street cleaning") to serve as qualitative signals.

### Communications Layer
If using social media complaints as a narrative layer, ensure they are carefully curated, anonymized if necessary, and explicitly labeled as illustrative examples.

## Judge/Demo Strategy
Confidence comes from clarity—explicit data-source labels, a live-call success, a flip-to-mock fallback, and a concrete integration plan.

### Live + Mock Side-by-Side
Show one live GeoHub layer call (e.g., Council Districts) next to the mocked telemetry. Include a visible "Source: Live/Mock" toggle in the UI to demonstrate the adapter pattern in real-time.

### Roadmap Slide
Present a clear path to production, including FOIA targets (sweeping logs, snow completions), API contracts, and security/privacy considerations for eventual live AVL integration.

## Risk Register and Mitigations
We’ve identified API, data quality, licensing, and perception risks with specific mitigations.

### Top Risks
GeoHub uptime or schema drift; lack of official schedule/route layers; mock-data credibility undermining the prototype's perceived value.

### Mitigations
Rely on local caches and adapter transforms. Provide explicit labeling of all mock data. Outline a plan for a data-sharing MOU or FOIA requests to acquire the missing operational logs.

## Implementation Plan for a 3-Person Team (Hackathon)
With clear roles and scripts, a team can generate believable Richmond GPS tracks and wire the adapter in under 3 hours.

### Roles and Timeline
1. **Data Wrangler (Hour 1):** Extract Centerlines [2] and Council Districts [1] as GeoJSON. Identify 3-5 continuous routes along major arterials.
2. **Simulation Engineer (Hours 1-2):** Write a Python script to interpolate points along the extracted routes at 5-second intervals, applying 10-15 mph speeds and outputting the standard telemetry JSON schema.
3. **Integrator (Hours 2-3):** Build the frontend adapter to consume the JSON, overlay it on the live GeoHub basemap, and implement the "Mock Data" UI badges.

### Deliverables Checklist
- Cached GeoJSON basemap layers.
- Simulated telemetry JSON file.
- Configured data adapter.
- README with "Swap Checklist".
- Demo script highlighting the architecture.

## Appendices

### Facts
* Richmond GeoHub hosts a Centerlines feature layer with 29,423 records (`services1.arcgis.com/.../CarriagewayCenterlines/FeatureServer/0`) [2].
* Richmond GeoHub hosts a Council Districts feature layer with 9 records (`services1.arcgis.com/.../CouncilDistricts/FeatureServer/0`) [1].
* DPW Snow Removal Priority 1 routes cover 700 lane miles; Priority 2 covers 200 lane miles [3].
* Richmond handled 208,216 RVA311 requests in 2025 [8].
* Trash collection services 65,000 residences across 90 routes [6].

### Inferences
* Because 311 volumes are high, specific categories (like missed trash or snow) can be used to infer service frequency and zone patterns, even if bulk data must be mocked for the demo.
* Snow routes likely follow major arterials and collectors, which can be approximated using the Centerlines layer.
* Standard telemetry schemas (timestamp, lat, lon, speed, heading) are sufficient to simulate municipal fleet movements.

### Unknowns
* Availability of historical street cleaning schedules or DPW service event logs on the Open Data Portal.
* Availability of route or zone completion data in FOIA-accessible maintenance logs.
* Direct Socrata API endpoints for bulk RVA311 service request records.
* Specific DPW service zone polygons (e.g., exact street sweeping zones) as raw feature layers.

### Endpoint Index
* **Centerlines:** `https://services1.arcgis.com/k3vhq11XkBNeeOfM/arcgis/rest/services/CarriagewayCenterlines/FeatureServer/0`
* **Council Districts:** `https://services1.arcgis.com/k3vhq11XkBNeeOfM/arcgis/rest/services/CouncilDistricts/FeatureServer/0`

## References

1. *Council Districts | Richmond GeoHub*. https://richmond-geo-hub-cor.hub.arcgis.com/datasets/cor::council-districts-3/explore?location=37.532339%2C-77.484166%2C12.50
2. *Centerlines | Richmond GeoHub*. https://richmond-geo-hub-cor.hub.arcgis.com/datasets/centerlines/explore
3. *Snow Removal | Richmond*. https://www.rva.gov/public-works/snow-removal
4. *Addresses | Richmond GeoHub - ArcGIS Online*. https://richmond-geo-hub-cor.hub.arcgis.com/datasets/674d645c444f4191998f0ebb96e56047_0/about
5. *Zoning Districts | Richmond GeoHub - ArcGIS Online*. https://richmond-geo-hub-cor.hub.arcgis.com/datasets/zoning-districts-1/about
6. *Trash Collection | Richmond*. https://www.rva.gov/public-works/trash-collection
7. *About RVA 311 | Richmond*. https://www.rva.gov/citizen-service-and-response/about-rva-311
8. *Most common RVA 311 requests: What Richmonders needed help with in 2025 | WRIC ABC 8News*. https://www.wric.com/news/local-news/richmond/311-requests-richmond-2025/
9. *Open Data Portal | City of Richmond, Virginia | Open Data Portal | City of Richmond, Virginia*. https://data.richmondgov.com/