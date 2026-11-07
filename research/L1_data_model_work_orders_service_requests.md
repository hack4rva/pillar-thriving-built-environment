> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# Building a Future-Proof Work-Order Layer: A Cross-Platform Data Model for Multi-Domain Public-Service Tracking

## Executive Summary

Municipalities and public service agencies face a critical data fragmentation problem. An analysis of four major 311-style and work-order APIs—Open311, Cityworks, SeeClickFix, and Salesforce—reveals highly divergent field vocabularies that force costly ETL pipelines. For instance, Open311 lists standard request fields [1], Cityworks panels expose over 50 searchable work-order columns [2], SeeClickFix issues return numerous JSON keys [3], and the Salesforce Case object contains dozens of fields [4]. 

To resolve this, the following implementation-ready data model consolidates these disparate schemas into a single canonical architecture. By standardizing on a core 5-step status backbone, utilizing GeoJSON for spatial consistency, and introducing native dependency handling (a feature explicitly documented in Cityworks [2] but lacking natively in Open311 [1] and SeeClickFix [3]), this model future-proofs integration. It eliminates duplicate pipelines, aligns status lifecycles, and provides a robust foundation for multi-domain public-service tracking encompassing power, sanitation, road maintenance, and emergency response.

## Core Design Principles

To ensure seamless interoperability across legacy systems and modern citizen apps, this data model adheres to five foundational design principles:

| Principle | Rationale |
|-----------|-----------|
| **Canonical Enums** | Aligns the four major platforms (Open311, Cityworks, SeeClickFix, Salesforce) to reduce mapping complexity and prevent data-entry errors. |
| **GeoJSON Location** | Supports both points and polygons natively. This maps cleanly to SeeClickFix's GeoJSON point objects [3], Cityworks' X/Y coordinates [2], and Open311's lat/lng requirements [1]. |
| **Unified Status State Machine** | Guarantees a consistent workflow across all service domains, mapping external vendor statuses to a standardized internal lifecycle. |
| **Native Dependency Arrays** | Enables complex project sequencing (e.g., water shut-off before pipe repair) without requiring ad-hoc custom tables. |
| **Audit-First Architecture** | Stores raw source values and immutable status histories to ensure traceability and compliance. |

## Entity-Relationship Diagram

The following ASCII diagram illustrates the core entities, their primary/foreign keys, and cardinality. One Service Request can map to zero or one Work Orders, while one Work Order can have multiple Service Requests (enabling deduplication).

```text
+----------------+ +----------------+ +-----------------+
| ServiceRequest | | WorkOrder | | Crew/Vehicle |
|----------------| |----------------| |-----------------|
| request_id PK |<--+ | job_id PK |<--+ | crew_id PK |
| source_system | | | service_type | | | vehicle_id PK |
| category | | | priority_level | | +-----------------+
| subcategory | | | status | |
| description | | | status_history | | +-----------------+
| location | | | summary | | | Attachment |
| photos | | | location | | |-----------------|
| linked_job_id |---+ | reported_by | +--| attachment_id PK|
| status | | assigned_crew |<-----| job_id FK |
| notes | | assigned_veh |<-----|... |
+----------------+ | estimated_* | +-----------------+
 | actual_* |
 | dependencies |
 | related_jobs |
 +----------------+
```

*Note: The `dependencies` and `related_jobs` arrays reference `job_id` within the same table to support parent-child relationships and task sequencing.*

## Field-by-Field Schema

This schema defines the exact data types, constraints, and examples for the Work Order and Service Request entities.

### Work Order / Job Entity

| Field | Type | Constraints | Example |
|-------|------|-------------|---------|
| `job_id` | UUID | PK, NOT NULL | `c3f9e3a2-1b4d-4f8a-9c2e-d5f6b7c8e9f0` |
| `service_type` | ENUM | NOT NULL (11 defined domains) | `pothole_repair` |
| `priority_level` | ENUM | NOT NULL (`emergency`, `urgent`, `high`, `standard`, `low`) | `urgent` |
| `status` | ENUM | NOT NULL (10 defined states) | `dispatched` |
| `status_history` | JSONB | NOT NULL, immutable array | `[{"status":"reported","ts":"2026-03-28T08:12:00Z"}]` |
| `description` | TEXT | NOT NULL | `"Downed transformer on Main St."` |
| `plain_language_summary` | VARCHAR(255) | NOT NULL | `"Power outage affecting 12 homes"` |
| `location` | GEOMETRY | NOT NULL, GeoJSON format | `{"type":"Point","coordinates":[-71.0589,42.3601]}` |
| `reported_by` | ENUM | NOT NULL (`311`, `sensor`, `internal`, `citizen_app`, `proactive_inspection`) | `311` |
| `assigned_crew_id` | UUID | FK to Crew, NULLABLE | `a1b2c3d4-...` |
| `assigned_vehicle_id` | UUID | FK to Fleet, NULLABLE | `v5w6x7y8-...` |
| `estimated_start_time` | TIMESTAMPTZ | NULLABLE | `2026-03-28T09:00:00Z` |
| `estimated_duration` | INTERVAL | NULLABLE | `PT2H` |
| `estimated_completion_time`| TIMESTAMPTZ | GENERATED | `2026-03-28T11:00:00Z` |
| `actual_start_time` | TIMESTAMPTZ | NULLABLE | `2026-03-28T09:15:00Z` |
| `actual_completion_time` | TIMESTAMPTZ | NULLABLE | `2026-03-28T10:50:00Z` |
| `dependencies` | UUID | Array of `job_id`s | `["b4e5f6..."]` |
| `related_jobs` | UUID | Array of `job_id`s | `["c7d8e9..."]` |
| `created_at` | TIMESTAMPTZ | DEFAULT now() | `2026-03-28T08:00:00Z` |
| `updated_at` | TIMESTAMPTZ | AUTO-UPDATE | `2026-03-28T08:15:00Z` |

### Service Request Entity (Citizen-Facing)

| Field | Type | Constraints | Example |
|-------|------|-------------|---------|
| `request_id` | UUID | PK, NOT NULL | `9f2e1d3c-...` |
| `source_system` | ENUM | NOT NULL (`311`, `web`, `app`, `phone`, `email`) | `app` |
| `category` | VARCHAR(100) | NOT NULL | `"Road"` |
| `subcategory` | VARCHAR(100) | OPTIONAL | `"Pothole"` |
| `description` | TEXT | NOT NULL | `"Large pothole near school"` |
| `location` | GEOMETRY | NOT NULL, GeoJSON format | `{"type":"Point","coordinates":[-71.0620,42.3540]}` |
| `photos/attachments` | JSONB | Array of URLs | `["https://cdn.city.gov/pothole1.jpg"]` |
| `linked_job_id` | UUID | FK to WorkOrder, NULLABLE | `c3f9e3...` |
| `status` | ENUM | NOT NULL (`open`, `acknowledged`, `in_progress`, `resolved`, `closed`) | `open` |
| `resolution_notes` | TEXT | OPTIONAL | `"Filled with cold mix"` |

## Status State Machine

Status lifecycles diverge across platforms but share a core backbone. Open311 utilizes statuses like open, acknowledged, and closed [1]. SeeClickFix supports Open, Acknowledged, Closed, and Archived [3] [5]. Salesforce Case uses New, Working, and Closed [4]. The following state machine unifies these transitions.

| Transition | Allowed From | Allowed To | External Mapping (Open311 / SeeClickFix / Cityworks / Salesforce) |
|------------|--------------|------------|-------------------------------------------------------------------|
| **Report** | — | `reported` | Open311 `open`; SeeClickFix `Open`; Cityworks `reported`; Salesforce `New` |
| **Acknowledge** | `reported` | `acknowledged` | Open311 `acknowledged`; SCF `Acknowledged`; Cityworks `acknowledged`; SF `Working` |
| **Queue** | `acknowledged` | `queued` | Internal Step |
| **Dispatch** | `queued` | `dispatched` | Internal Step |
| **En-Route** | `dispatched` | `en_route` | Internal Step |
| **Start Work** | `en_route` | `in_progress` | Open311 `in_progress`; Cityworks `in_progress`; SF `Working` |
| **Put on Hold** | `in_progress` | `on_hold` | Internal Step |
| **Complete** | `in_progress` / `on_hold` | `completed` | Open311 `closed`; SCF `Closed`; Cityworks `completed`; SF `Closed` |
| **Verify** | `completed` | `verified` | Optional QA Step |
| **Close** | `verified` | `closed` | All platforms converge to final *closed* state |

## Sample Records

### 1. Power Restoration

```json
{
 "WorkOrder": {
 "job_id": "e1a2b3c4-...",
 "service_type": "power_restoration",
 "priority_level": "emergency",
 "status": "dispatched",
 "status_history": [
 {"status": "reported", "ts": "2026-03-28T14:05Z", "actor": "311"},
 {"status": "acknowledged", "ts": "2026-03-28T14:15Z", "actor": "ops"}
 ],
 "description": "Downed transformer on Oak St.",
 "plain_language_summary": "Power outage affecting 30 homes",
 "location": {"type": "Point", "coordinates": [-71.0589, 42.3601]},
 "reported_by": "311",
 "assigned_crew_id": "crew-101",
 "estimated_start_time": "2026-03-28T15:00Z",
 "estimated_duration": "PT3H"
 },
 "ServiceRequest": {
 "request_id": "r9f8e7d6-...",
 "source_system": "311",
 "category": "Power",
 "subcategory": "Outage",
 "description": "No power on Oak St. since 6 am.",
 "location": {"type": "Point", "coordinates": [-71.0589, 42.3601]},
 "linked_job_id": "e1a2b3c4-...",
 "status": "open"
 }
}
```

### 2. Pothole Repair

```json
{
 "WorkOrder": {
 "job_id": "p1245-...",
 "service_type": "pothole_repair",
 "priority_level": "high",
 "status": "in_progress",
 "description": "Deep pothole near 5th Ave.",
 "plain_language_summary": "Pothole causing traffic slowdown",
 "location": {"type": "Point", "coordinates": [-71.0620, 42.3540]},
 "assigned_crew_id": "crew-202",
 "estimated_duration": "PT2H"
 },
 "ServiceRequest": {
 "request_id": "req-5555-...",
 "source_system": "app",
 "category": "Road",
 "subcategory": "Pothole",
 "description": "Large pothole on 5th Ave, near crosswalk.",
 "location": {"type": "Point", "coordinates": [-71.0620, 42.3540]},
 "photos": ["https://cdn.city.gov/pothole5.jpg"],
 "linked_job_id": "p1245-...",
 "status": "in_progress",
 "resolution_notes": "Pending crew"
 }
}
```

### 3. Snow Removal

```json
{
 "WorkOrder": {
 "job_id": "s9876-...",
 "service_type": "snow_removal",
 "priority_level": "standard",
 "status": "queued",
 "description": "Plow Main St. after 2-inch snowfall.",
 "plain_language_summary": "Snow removal for Main St.",
 "location": {
 "type": "Polygon", 
 "coordinates": [[[-71.0600, 42.3600], [-71.0605, 42.3600], [-71.0605, 42.3605], [-71.0600, 42.3605], [-71.0600, 42.3600]]]
 },
 "estimated_start_time": "2026-03-28T06:00Z",
 "estimated_duration": "PT8H"
 },
 "ServiceRequest": {
 "request_id": "snow-001-...",
 "source_system": "sensor",
 "category": "Snow",
 "subcategory": "Removal",
 "description": "Automated sensor detected 2-inch snowfall on Main St.",
 "location": {"type": "Point", "coordinates": [-71.0602, 42.3602]},
 "linked_job_id": "s9876-...",
 "status": "open"
 }
}
```

## Cross-Platform Mapping Table

This table demonstrates how the canonical schema maps to the specific fields of Open311, Cityworks, SeeClickFix, and Salesforce.

| Core Field | Open311 (GeoReport v2) | Cityworks (WorkOrder) | SeeClickFix (Issue) | Salesforce (Case/WorkOrder) |
|------------|-----------------------|-----------------------|----------------------|-------------------|
| `job_id` / `request_id` | `service_request_id` [1] | `WO Number` [2] | `id` [3] | `CaseNumber` [4] |
| `service_type` | `service_code` [1] | `Domain` [6] | `request_type.title` [7] | `Custom_Service_Type__c` |
| `priority_level` | `priority` [1] | `Priority` [2] | **N/A** (custom) | `Priority` [4] |
| `status` | `status` [1] | `Status` [2] | `status` [3] | `Status` [4] |
| `status_history` | **N/A** | `Status History` | **N/A** (uses `updated_at` [3]) | `CaseHistory` |
| `description` | `description` [1] | `Description` [2] | `description` [3] | `Description` [4] |
| `location` | `lat`/`long` or `address` [1] | `X`/`Y` Location(s) [6] | `point` (GeoJSON) [3] | `Location` [8] |
| `reported_by` | `account_id` [1] | `Initiated By` [2] | `reporter` [3] | `CreatedById` |
| `estimated_*` | `expected_start_date` [1] | `Projected Start/Finish` [2] | **N/A** | `DueDate` |
| `attachments` | `media_url` [1] | `Has Attachment` [6] | `media` [3] | `Attachment` [4] |
| `dependencies` | **N/A** | `Dependency` / Child WO [2] | **N/A** | `Related_Work_Order__c` |

*Note: For fields marked **N/A**, the canonical model provides native support that must be handled via custom extensions in the respective external systems.*

## References

1. *GeoReport v2*. https://wiki.open311.org/GeoReport_v2/
2. *Work Order Panel Fields - Cityworks GIS Management*. https://help.cityworks.com/AMS/15-8/Content/Online/AMS/15-8/WorkOrder/WOPanelFields.htm
3. *Issues - SeeClickFix API*. https://dev.seeclickfix.com/v2/issues/
4. *Case | Object Reference for the Salesforce Platform*. https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_case.htm
5. *API v2 - Issues - Changing Status*. https://dev.seeclickfix.com/v2/issues/changing_status/
6. *Work Order Search Fields - Cityworks GIS Management*. https://help.cityworks.com/AMS/15-7/Content/WorkOrder/Search/WOSearchFields.htm
7. *API v2 - Issues - Report Form*. https://dev.seeclickfix.com/v2/issues/reporting/
8. *WorkOrder | Object Reference for the Salesforce Platform*. https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_workorder.htm