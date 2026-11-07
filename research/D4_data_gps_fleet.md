> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# From Dots to Decisions: A DPW-Ready GPS Schema for Richmond's Snow and Sweeping Ops

## Executive Summary

As the City of Richmond prepares to modernize its Department of Public Works (DPW) fleet tracking, designing a robust, vendor-agnostic data schema is critical for both internal operations and public transparency. Research into municipal deployments reveals that Samsara and Geotab dominate the DPW landscape, offering off-the-shelf integrations with Esri's ArcGIS ecosystem [1] [2]. 

To build a successful prototype, Richmond must adopt a dual-geometry approach: utilizing line segments for granular snow plow completion tracking and polygons for street sweeping zones [3] [4]. Furthermore, the system requires two distinct data views. The public-facing map needs simplified, time-bucketed status updates (e.g., "serviced within 1 hour") with built-in latency to manage expectations and privacy [5] [2]. Conversely, the internal supervisor dashboard requires high-fidelity telemetry, vehicle health diagnostics, and route assignment data to optimize fleet utilization [6] [7]. By building a synthetic schema modeled on these industry standards, Richmond can rapidly prototype its dashboards today and seamlessly plug in a real vendor API tomorrow.

## Vendor Landscape and Integration Paths

Municipal DPW departments are increasingly converging around a few key telematics providers that offer robust API ecosystems and native GIS integrations.

| Vendor | Municipal Adoption Examples | Key Capabilities & Outcomes | Integration Pathway |
| :--- | :--- | :--- | :--- |
| **Samsara** | City of Syracuse (80+ snow vehicles), Houston Public Works (3,800+ assets) [2] [7] | Reduced citizen calls by 30% via public maps; real-time dash cam video; utilization reporting [2] [7]. | Seamless API integration with Esri; custom-built public coverage maps [2]. |
| **Geotab** | City of Port Colborne (300+ assets), City of Miami Gardens [8] | Real-time collision investigation; salt usage optimization; EV transition planning [8]. | Native ingestion via ArcGIS Velocity using the Geotab (LogRecord) feed [1]. |

**Actionable Insight:** Richmond should prioritize schema compatibility with Samsara and Geotab APIs. Designing the prototype around Esri Feature Services ensures that when the final vendor is selected, the data can be ingested directly via tools like ArcGIS Velocity without bespoke middleware engineering [1].

## Standard GPS Telemetry Schema (Inference based on common fleet systems)

Based on the Geotab Data Connector and ArcGIS Velocity LogRecord schemas, the following represents the industry-standard telemetry payload produced by modern fleet GPS systems [6] [1].

| Field Name | Data Type | Description |
| :--- | :--- | :--- |
| `device_id` | String | Unique identifier for the telematics device [1]. |
| `vin` | String | 17-character Vehicle Identification Number [6]. |
| `ts_utc` | Timestamp | UTC timestamp for the measured GPS reading (mapped from `dateTime` or `LastGps_DateTime`) [6] [1]. |
| `latitude` | Float | Latitude for the valid measured GPS reading [6]. |
| `longitude` | Float | Longitude for the valid measured GPS reading [6]. |
| `speed_kph` | Integer/Float | Speed in km/h for the last valid reading [6]. |
| `heading_deg` | Float | Bearing/direction of the vehicle [1]. |
| `device_health` | String | Status indicating if the device is working properly [6]. |
| `group_names` | String | Operational groups (e.g., "Sweepers") used for filtering [1]. |

**Actionable Insight:** Always store timestamps in UTC and speed in standard units (km/h) at the database level to prevent data drift, converting to local time and mph only at the UI layer [6].

## Snow and Sweeping Route Data Models

Cities structure their operational data differently depending on the service type. Richmond currently uses polygons for street sweeping areas, containing fields for `Name` and `Schedule1` through `Schedule4` [4]. However, snow removal requires segment-level tracking.

| City | Operation | Geometry Type | Key Schema Fields |
| :--- | :--- | :--- | :--- |
| **Richmond, VA** | Street Sweeping | MultiPolygon | `id`, `name`, `schedule1-4`, `shape_area` [4]. |
| **San Francisco, CA** | Street Sweeping | Line Segments | `cnn` (street ID), `cnnrightleft` (side), `weekday`, `fromhour`, `tohour` [3]. |
| **Denver, CO** | Street Sweeping | Polygons | Schedule areas, months, weeks, days [9]. |
| **Richmond, VA** | Snow Removal | Line Segments | Priority 1 (700 miles), Priority 2 (200 miles), Priority 3 (1600 miles) [10]. |

**Actionable Insight:** The prototype schema must support dual geometries. Use polygons for sweeping zones and schedules, but use line segments for snow plowing to accurately calculate completion percentages against Richmond's specific Priority 1, 2, and 3 lane-mile targets [10].

## Minimum Schemas by Audience

To accelerate development, the prototype should expose two distinct API payloads tailored to different user needs.

### Public Service Status Display
The public map requires minimal data to protect privacy and manage expectations. Anchorage's public app explicitly notes that vehicle locations are time-delayed, only show when in motion, and that segment status is inferred [5]. Syracuse uses color-coded buckets (green for <1 hour, blue for <3 hours, gray for unplowed) [2].
* **Required Fields:** `segment_id`, `service_type`, `priority_level`, `status_bucket` (e.g., "0-1h", "1-3h", ">3h"), `last_service_ts`.

### Internal Supervisor Dashboard
Supervisors need high-fidelity data to manage the fleet, identify underutilized assets, and monitor safety [7].
* **Required Fields:** `vehicle_id`, `ts_utc`, `lat`, `lon`, `speed_kph`, `heading_deg`, `device_health`, `current_assignment`, `route_progress_pct`.

## Recommended Synthetic Data Schema for Hackathon Use

This relational schema is designed for a hackathon prototype, allowing developers to build realistic applications that can later be swapped to live Esri or vendor feeds.

**1. `vehicles` (Metadata)**
* `vehicle_id` (String, PK)
* `vin` (String)
* `class` (String) - e.g., "Heavy Plow", "Sweeper"
* `group_names` (String)
* `device_health` (String)

**2. `positions` (Real-time Telemetry)**
* `position_id` (String, PK)
* `vehicle_id` (String, FK)
* `ts_utc` (Timestamp)
* `lat` (Float)
* `lon` (Float)
* `speed_kph` (Float)
* `heading_deg` (Float)

**3. `segments` (Snow Routes)**
* `segment_id` (String, PK)
* `route_priority` (Integer) - 1, 2, or 3 [10]
* `geom_line` (GeoJSON/WKT)
* `lane_miles` (Float)

**4. `coverage` (Computed Status)**
* `segment_id` (String, PK)
* `service_type` (String) - "Snow" or "Sweep"
* `last_service_ts` (Timestamp)
* `status_bucket` (String)
* `service_confidence` (Float) - 0.0 to 1.0

## Example Mock Data Records

```json
[
 {
 "table": "vehicles",
 "record": {
 "vehicle_id": "DPW-PLOW-042",
 "vin": "1HTMMAAN3LH123456",
 "class": "Heavy Plow",
 "group_names": "Snow_Ops_North",
 "device_health": "OK"
 }
 },
 {
 "table": "positions",
 "record": {
 "position_id": "pos_98765",
 "vehicle_id": "DPW-PLOW-042",
 "ts_utc": "2026-03-17T14:30:00Z",
 "lat": 37.5407,
 "lon": -77.4360,
 "speed_kph": 25.5,
 "heading_deg": 185.0
 }
 },
 {
 "table": "segments",
 "record": {
 "segment_id": "seg_broad_st_01",
 "route_priority": 1,
 "geom_line": "LINESTRING(-77.4360 37.5407, -77.4350 37.5400)",
 "lane_miles": 0.5
 }
 },
 {
 "table": "coverage",
 "record": {
 "segment_id": "seg_broad_st_01",
 "service_type": "Snow",
 "last_service_ts": "2026-03-17T14:30:00Z",
 "status_bucket": "0-1h",
 "service_confidence": 0.95
 }
 },
 {
 "table": "vehicles",
 "record": {
 "vehicle_id": "DPW-SWP-011",
 "vin": "1HTMMAAN3LH654321",
 "class": "Street Sweeper",
 "group_names": "Sweepers_Museum_Dist",
 "device_health": "OK"
 }
 }
]
```

## Documentation for Future Integration

To ensure the hackathon prototype can be connected to a real GPS system (like Samsara or Geotab) post-installation, document the following integration contracts:

1. **Field Mapping Matrix:** Maintain a strict mapping document. For example, document that Geotab's `LastGps_DateTime` maps to the prototype's `ts_utc`, and `LastGps_Speed` maps to `speed_kph` [6].
2. **Esri Velocity Configuration:** If using ArcGIS Velocity, document the required HTTP polling URL, database name, and group filters (e.g., filtering for the "Sweepers" group) required to ingest the LogRecord feed [1].
3. **Inference Logic:** Clearly document the spatial logic used to convert raw point data (`positions`) into line completion (`coverage`). Note that Anchorage explicitly warns users that segment plow status is inferred by combining vehicle locations, speed, and direction, which can occasionally result in false positives [5]. Future integrations will need to tune this spatial matching algorithm.

## References

1. *Geotab (LogRecord)—ArcGIS Velocity - Esri Documentation*. https://doc.arcgis.com/en/velocity/ingest/geotab-logrecord.htm
2. *City of Syracuse | Samsara for Public Works*. https://www.samsara.com/customers/city-of-syracuse
3. *Archived Street Sweeping data (as of Jan 27, 2025) | DataSF*. https://data.sfgov.org/City-Infrastructure/Archived-Street-Sweeping-data-as-of-Jan-27-2025-/xsry-uuyt
4. *StreetSweeping | Open Data Portal | City of Richmond, Virginia*. https://data.richmondgov.com/Sustainability-and-Natural-Environment/StreetSweeping/km2h-uk82
5. *Winter Plow Operations GPS - Public App*. https://experience.arcgis.com/experience/3c1fb9c6717242a49e5f62432b853c93
6. *Geotab Data Connector Data Schema and Dictionary*. https://support.geotab.com/mygeotab/mygeotab-add-ins/doc/data-conn-schema
7. *Houston Public Works | Samsara*. https://www.samsara.com/customers/city-of-houston-public-works
8. *City of Port Colborne Enhances Fleet Safety and Efficiency | Geotab*. https://www.geotab.com/case-study/city-of-port-colborne/
9. *Street Sweep Schedule - Overview*. https://geospatialdenver.maps.arcgis.com/home/item.html?id=7d8b51c3026c47718e1cecb6385758c8
10. *Snow Removal | Richmond*. https://www.rva.gov/public-works/snow-removal