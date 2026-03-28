> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# Unified Asset-Fleet Data Model for Smart Public-Service Operations – From GIS Assets to Real-Time Vehicle Telemetry

## Executive Summary

This report defines a comprehensive Level 2 Data Model integrating public infrastructure assets with real-time fleet telemetry. By unifying static GIS asset data with dynamic vehicle tracking, municipalities can transition from reactive maintenance to predictive, data-driven operations. 

Key strategic insights driving this model include:
* **Asset-Centric Standardization Reduces Silos**: Establishing a canonical `asset_id` linked to work orders and inspections eliminates duplicate records often seen in legacy systems like Cityworks, where related objects are listed when an asset is attached to a work order [1] [2].
* **Granular Geometry Types Enable Precise Analytics**: Utilizing specific geometry types (point, line, polygon) per asset type aligns with ESRI models and supports advanced network analysis [3] [4].
* **High-Frequency Telemetry Is Manageable**: Tracking 100 fleet vehicles at 10-second intervals generates approximately 864,000 messages daily, consuming only ~247 MB to 432 MB of storage, making high-fidelity tracking highly feasible.
* **Vendor Field Mismatches Pose Integration Risk**: While Verizon Connect, Geotab, and Samsara all provide core location data, variations in diagnostic and event fields require a canonical telemetry schema to normalize incoming feeds [5] [6] [7].

## Project Context & Objectives

Modern public-service agencies require a unified view of their operations. Historically, infrastructure management (e.g., ESRI, Cityworks) and fleet management (e.g., Geotab, Samsara) have existed in silos. This disconnected approach leads to inefficient routing, delayed maintenance, and "ghost" work orders. 

This data model bridges the gap by linking the physical condition and location of assets directly to the vehicles and crews servicing them. The objective is to provide a schema that supports real-time dynamic routing, predictive maintenance scoring, and seamless integration with leading telematics providers.

## Asset & Infrastructure Entity Design

The Asset Entity serves as the foundational layer, representing physical infrastructure. It incorporates spatial data, lifecycle metrics, and relationship mappings.

### Core Asset Fields

The core fields define the identity, type, and spatial location of the asset.

* `asset_id`: UUID (Primary Key)
* `asset_type`: Enum (`road_segment`, `bridge`, `transformer`, `water_main`, `sewer_line`, `fire_hydrant`, `streetlight`, `traffic_signal`, `stormwater_drain`, `sidewalk_segment`, `park_facility`, `public_building`)
* `location`: Geometry (Point, LineString, or Polygon). For example, streetlights use point geometry, while sewer mains use lines [8] [3].
* `address` / `nearest_address`: String
* `neighborhood`, `council_district`, `census_tract`: String
* `installation_date`: Date
* `last_inspection_date`: Timestamp
* `condition_rating`: Integer (1-5) or String (A-F)

### Technical Attributes

Technical attributes track the physical properties and historical performance of the asset.

* `material`: String (e.g., ductile iron for water mains) [3].
* `capacity` / `specifications`: JSONB (Key-value pairs for specific asset metrics).
* `failure_history`: Array of JSON objects `[{date: Timestamp, type: String, description: String}]`.
* `mean_time_between_failures`: Float (Calculated field in days).
* `maintenance_schedule`: String (Cron expression or interval).

### Relationship Modeling

Assets do not exist in isolation; they are part of a broader network and organizational structure.

* `owning_department`: String (e.g., "Public Works", "Water Utilities").
* `related_assets`: Array of UUIDs. This supports impact analysis, such as linking a transformer to the addresses it serves, or tracking equipment that may be removed for maintenance and stored in a warehouse [3].

## Fleet / Vehicle Telemetry Entity Design

The Fleet Entity tracks the vehicles responsible for servicing the infrastructure, combining static vehicle profiles with dynamic, real-time state information.

### Static Vehicle Attributes

* `vehicle_id`: UUID (Primary Key)
* `vehicle_type`: Enum (`plow_truck`, `street_sweeper`, `garbage_truck`, `utility_truck`, `inspection_vehicle`, `emergency_vehicle`, `supervisor_vehicle`)
* `assigned_crew_id`: UUID (Foreign Key to Crew table)
* `equipment_mounted`: Array of Strings (e.g., `["plow", "spreader"]`)

### Dynamic Telemetry Attributes

* `current_location`: Point (Lat/Lng)
* `timestamp`: Timestamp
* `heading`: Float (0-360 degrees)
* `speed`: Float (mph or km/h)
* `route_id`: UUID (Foreign Key to Route table)
* `route_completion_pct`: Float (0.0 - 100.0)
* `breadcrumb_trail`: Array of JSON objects `[{lat: Float, lng: Float, timestamp: Timestamp}]`
* `status`: Enum (`idle`, `en_route`, `on_site`, `returning`, `out_of_service`, `refueling`)
* `shift_start`, `shift_end`: Timestamp
* `fuel_level`: Float (Percentage 0.0 - 100.0, if available via OBD integration)

## Route Entity & Service Scheduling

The Route Entity connects the fleet to the assets by defining the geographic path and the specific infrastructure segments requiring service.

### Route Geometry & Segments

* `route_id`: UUID (Primary Key)
* `route_name`: String
* `service_type`: Enum (`snow_removal`, `street_cleaning`, `trash_collection`)
* `priority_level`: Integer (1 = Highest, 5 = Lowest)
* `geometry`: LineString or Polygon
* `scheduled_start`, `scheduled_end`: Timestamp
* `actual_start`, `actual_end`: Timestamp
* `completion_status`: Enum (`not_started`, `in_progress`, `completed`, `skipped`)
* `segments`: Ordered Array of UUIDs (Foreign Keys to Asset `road_segment` IDs)

### Route-Based Asset Impact

By storing ordered `segments` (road segment IDs) within the Route entity, dispatch systems can dynamically recalculate routes. If a specific road segment's `condition_rating` drops below a safe threshold, the routing engine can automatically bypass that segment and alert the assigned crew.

## Real-Time Telemetry Message Schema

To ingest data from various telematics providers, a standardized JSON schema is required for the real-time data stream.

### Message Format Specification

The canonical telemetry payload must include the following fields:
* `vehicle_id`: String/UUID
* `timestamp`: ISO 8601 DateTime
* `lat`: Float
* `lng`: Float
* `speed`: Float
* `heading`: Float
* `event_type`: String (e.g., "periodic_update", "ignition_on", "pto_engaged")

### Example Messages

```json
[
 {
 "vehicle_id": "v-101",
 "timestamp": "2026-03-28T08:00:00Z",
 "lat": 37.5407,
 "lng": -77.4360,
 "speed": 0.0,
 "heading": 90.0,
 "event_type": "ignition_on",
 "status": "idle"
 },
 {
 "vehicle_id": "v-101",
 "timestamp": "2026-03-28T08:05:30Z",
 "lat": 37.5415,
 "lng": -77.4350,
 "speed": 25.5,
 "heading": 45.0,
 "event_type": "periodic_update",
 "status": "en_route"
 },
 {
 "vehicle_id": "v-102",
 "timestamp": "2026-03-28T09:15:00Z",
 "lat": 37.5500,
 "lng": -77.4400,
 "speed": 5.0,
 "heading": 180.0,
 "event_type": "pto_engaged",
 "status": "on_site"
 },
 {
 "vehicle_id": "v-103",
 "timestamp": "2026-03-28T10:20:15Z",
 "lat": 37.5300,
 "lng": -77.4200,
 "speed": 0.0,
 "heading": 270.0,
 "event_type": "engine_fault",
 "status": "out_of_service"
 },
 {
 "vehicle_id": "v-104",
 "timestamp": "2026-03-28T11:45:00Z",
 "lat": 37.5600,
 "lng": -77.4500,
 "speed": 0.0,
 "heading": 0.0,
 "event_type": "refueling_start",
 "status": "refueling"
 }
]
```

## Data Volume, Storage & Retention Planning

High-frequency telemetry generates significant data. Proper capacity planning is essential for a fleet of ~100 vehicles (e.g., a city the size of Richmond).

### Volume Calculations (Day/Week/Month)

The following table outlines the expected data volume for 100 vehicles operating 24/7, comparing different polling intervals and average message sizes (300 bytes vs. 500 bytes).

| Polling Interval | Messages per Day | Daily Volume (300B) | Daily Volume (500B) | Weekly Volume (500B) | Monthly Volume (500B) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **10 seconds** | 864,000 | ~247 MB | ~432 MB | ~3.0 GB | ~12.9 GB |
| **30 seconds** | 288,000 | ~82 MB | ~144 MB | ~1.0 GB | ~4.3 GB |
| **60 seconds** | 144,000 | ~41 MB | ~72 MB | ~0.5 GB | ~2.1 GB |

*Takeaway*: Even at a highly granular 10-second interval, the monthly data volume remains under 15 GB, making high-frequency tracking highly cost-effective.

### Cost-Effective Storage Architecture

Given the manageable data volumes, municipalities should implement a tiered storage architecture. 
* **Hot Tier**: Store the last 30 days of telemetry in a high-performance operational database (e.g., PostgreSQL with PostGIS) to support real-time dashboards and immediate route calculations.
* **Cold Tier**: Archive data older than 30 days to low-cost object storage (e.g., AWS S3 Glacier) in compressed Parquet format. Retain this data for 12 to 36 months to support liability claims, historical route optimization, and seasonal failure analysis.

## Interoperability Mapping to Leading Fleet Platforms

To ensure the data model can ingest data from existing municipal fleet contracts, the canonical schema must map to the APIs of major telematics providers.

### Field-by-Field Mapping Table

| Canonical Field | Verizon Connect API | Geotab API (GetFeed) | Samsara API |
| :--- | :--- | :--- | :--- |
| `vehicle_id` | `VehicleId` [9] | `device.id` [6] | `id` (Asset ID) [10] |
| `timestamp` | `Timestamp` | `dateTime` [6] | `time` [7] |
| `lat` / `lng` | `Latitude` / `Longitude` [9] | `latitude` / `longitude` [6] | `latitude` / `longitude` [7] |
| `speed` | `Speed` | `speed` [6] | `speed` [10] |
| `heading` | `Heading` | `bearing` | `heading` [7] |
| `event_type` | `Status` [5] | `ignitionStatus` / Diagnostics [6] | `ecuSpeedMph` / Stats [11] |

*Takeaway*: While core location and speed data are universally available, diagnostic events (like Geotab's `ignitionStatus` or Samsara's historical stats) require custom ETL adapters to normalize into the canonical `event_type` field.

## Entity-Relationship Diagram & Work-Order Integration

The relationships between the entities form the core of the operational system:

1. **Asset ↔ Work Order**: One-to-Many. An asset (e.g., a water main) can have multiple historical work orders. When an asset is attached to a work order in systems like Cityworks, related objects are also listed, allowing comprehensive maintenance tracking [1] [2].
2. **Work Order ↔ Route**: Many-to-One. Multiple work orders (e.g., pothole repairs) can be assigned to a single Route for a given shift.
3. **Route ↔ Fleet**: One-to-Many. A Route is assigned to a specific `vehicle_id` and `assigned_crew_id` for execution.
4. **Fleet ↔ Telemetry**: One-to-Many. A vehicle generates a continuous stream of telemetry points, which are aggregated into the `breadcrumb_trail` and used to calculate `route_completion_pct`.

## Implementation Roadmap & Governance

1. **Phase 1: Asset Standardization**: Migrate existing GIS data into the canonical Asset schema, ensuring all features have the correct geometry types and a unified `asset_id`.
2. **Phase 2: Telematics Integration**: Deploy ETL adapters to ingest data from the city's current telematics provider (Verizon, Geotab, or Samsara) into the Telemetry Data Stream Schema.
3. **Phase 3: Dynamic Routing & Work Orders**: Link the Asset and Fleet data via the Route entity, enabling dispatchers to assign work orders based on real-time vehicle locations and asset condition ratings.

## References

1. *Add Relationships to Assets - Cityworks GIS Management*. https://help.cityworks.com/Admin/3-9/Content/GIS/AddRelationshipstoAssets.htm
2. *Add Relationships to Assets - Cityworks GIS Management*. https://help.cityworks.com/Designer/15-5/Content/GIS/AddRelationshipstoAssets.htm
3. *[PDF] ArcGIS Data Models: Water Utilities - Esri*. https://content.esri.com/support/datamodels/water%20utilities/arcgis_water_utilities.pdf
4. *Configure Stormwater Data Management—ArcGIS Solutions*. https://doc.arcgis.com/en/arcgis-solutions/11.4/reference/configure-stormwater-data-management.htm
5. *API integration - Verizon Connect*. https://www.verizonconnect.com/services/api-integration/
6. *GetFeed*. https://developers.geotab.com/myGeotab/apiReference/methods/GetFeed/
7. *Locations snapshot - Samsara API*. https://developers.samsara.com/reference/getvehiclelocations
8. *Introduction to Streetlight Management—ArcGIS Solutions*. https://doc.arcgis.com/en/arcgis-solutions/11.4/reference/introduction-to-streetlight-management.htm
9. *Create API and webhook integrations - Verizon Connect*. https://reveal-help.verizonconnect.com/hc/en-ca/articles/5491815998099-Create-API-and-webhook-integrations
10. *List asset location and speed data in an organization. - Samsara API*. https://developers.samsara.com/reference/getlocationandspeed
11. *Insuretech - Overview - Samsara*. https://developers.samsara.com/docs/insuretech