> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# 48-Hour Fleet Visibility: Schedule-First Wins that De-risk GPS and Build Trust

## Executive Summary

A schedule-first, manual-status path delivers immediate resident value and positions GPS for seamless integration later. By leveraging existing zone polygons and schedule data, municipalities can stand up resident-facing maps and supervisor dashboards without waiting for perfect telematics. For example, ArcGIS's Street Sweeping Operations explicitly supports sharing sweeping schedules and status with the public [1]. Furthermore, supervisor oversight does not strictly require GPS; tools like ArcGIS Workforce allow mobile workers to mark assignments as completed, feeding directly into ArcGIS Dashboards for high-level project status [2] [3]. By adopting GTFS-aligned schemas now, the eventual introduction of real-time GPS will be a simple plug-in upgrade rather than a system rebuild.

## Solution Directions Overview

The following table compares the five proposed solution directions based on their data requirements, complexity, and feasibility for a 48-hour build. Directions 1, 3, and 5 are immediately shippable and form the core recommendation.

| Solution Direction | GPS Requirement | Core Data Required | Exists Today? | Tech Complexity | Primary User Value | 48h Feasibility |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Zone-based schedule display** | Not needed | Zone polygons, weekly schedule | Yes (GIS/Spreadsheets) | Low | Resident transparency | High |
| **2. Supervisor route dashboard** | Mock acceptable | Mock vehicle positions, route geometries | Can synthesize | Medium-High | Supervisor oversight | Medium |
| **3. Manual status update tool** | Not needed | Zones/routes table, status table, user auth | Can create | Low | Supervisor control | High |
| **4. Integrated supervisor + resident** | Optional | Combined data from 1 & 3 | Yes (if 1 & 3 exist) | Medium | Unified operations | High |
| **5. Notification prototype** | Optional | Status-change events, subscriptions | Can create | Low-Medium | Comms/Resident alerts | High |

*Takeaway: Prioritize Directions 1, 3, and 5 for immediate impact. Direction 4 naturally emerges from combining 1 and 3, while Direction 2 serves as a powerful "future-state" demo using mock data.*

## Direction 1: Zone-Based Cleaning Schedule Display

This direction provides immediate resident value with zero GPS dependency, forming the public baseline for fleet visibility.

* **User Workflow:** Residents check their address or zone to see upcoming service windows and the last-known completion timestamp.
* **GPS Requirement:** None. Schedule and zone data suffice.
* **Data Required & Existence:** Requires zone polygons (e.g., GeoJSON or Feature Services) and a schedule table (zone_id, service_day, start_time, end_time). Most municipalities already maintain this in GIS and spreadsheets.
* **Technical Complexity:** Low. It requires a simple web map with a UI filter and address search.
* **Value Delivered:** High transparency that deflects 311 calls and establishes a canonical resident view [1].
* **Demo Path (48h):** Load zone polygons, ingest a schedule CSV, and build a searchable web map that color-codes zones by their next service date.
* **Future with GPS:** Add "coverage heat" or "last pass" timestamps. It is often better to show generalized progress per zone rather than live vehicle dots to avoid misinterpretation by residents [4].

## Direction 2: Supervisor Route Completion Dashboard

This direction demonstrates the end-state value and validates the schema, even with mocked data, though it requires higher build effort.

* **User Workflow:** Supervisors monitor route progress, vehicle speeds, and route coverage, prioritizing dispatch and reviewing exceptions [5].
* **GPS Requirement:** Mock GPS is acceptable for the demo; real GPS is needed for production automation.
* **Data Required & Existence:** Requires mock vehicle positions (time-series data: vehicle_id, lat, lon, speed, heading, timestamp), route shapes, and a vehicle roster. This must be synthesized for the demo.
* **Technical Complexity:** Medium-High. Requires generating believable tracks and coverage logic.
* **Value Delivered:** High for supervisors; proves the future state and validates the real-time user experience.
* **Demo Path (48h):** Generate synthetic tracks along route shapes, compute coverage percentages for each zone, and build dashboard elements (lists, charts, KPIs) mirroring real-time operations [5].
* **Future with GPS:** Replace the mock feed with actual AVL/telematics data while maintaining the exact same schema and UX.

## Direction 3: Manual Status Update Tool

A low-lift, high-control operational signal that integrates cleanly with dashboards and resident views.

* **User Workflow:** Field crews or supervisors mark a zone or route as "In Progress" or "Completed" and add notes (e.g., blockages like illegally parked cars) [4].
* **GPS Requirement:** None.
* **Data Required & Existence:** Requires a master table of zones/routes and an assignments/status table. This can be easily created.
* **Technical Complexity:** Low. Mirrors the ArcGIS Workforce "complete assignment" pattern [2].
* **Value Delivered:** Provides reliable, auditable status updates, avoids GPS data quality pitfalls, and creates an event stream for notifications.
* **Demo Path (48h):** Create a simple web form or layer editing app to change status, and build internal dashboard indicators filtered by status (e.g., "Completed", "In Progress") [3].
* **Future with GPS:** Auto-complete statuses when a GPS coverage threshold is met, but retain the manual override for exceptions and quality control.

## Direction 4: Integrated Supervisor + Resident Tool

A thin integration layer that multiplies value by powering two distinct audiences with the same underlying data.

* **User Workflow:** Supervisors update the status internally; residents immediately see their zone turn "Completed" on the public map, complete with timestamps and relevant notes.
* **GPS Requirement:** Optional. Works perfectly with manual status updates today and automated triggers tomorrow.
* **Data Required & Existence:** Combines the schedule/zones from Direction 1 and the status table from Direction 3.
* **Technical Complexity:** Medium. Requires role-based views and content filtering to ensure internal notes stay private while public statuses are shared.
* **Value Delivered:** Builds trust and efficiency. For example, Syracuse uses internal dashboards to monitor operations while simultaneously providing a public map that updates every 5 minutes, garnering thousands of views during storms [4].
* **Demo Path (48h):** Publish two apps against the same services: an org-only dashboard for operations and a public map with simplified status and address search [5].
* **Future with GPS:** The supervisor view gains live operational widgets, while the resident view gains near-real-time "last serviced" stamps.

## Direction 5: Notification Prototype

Event-driven communications can start from manual status flips today, with GPS and geofencing added later.

* **User Workflow:** Communications staff set subscriptions by zone; residents receive an email or SMS when their zone's status changes to "Completed."
* **GPS Requirement:** Optional. The trigger is a manual status change now, and a geofence later.
* **Data Required & Existence:** Requires status change events (from Direction 3) and a subscription list.
* **Technical Complexity:** Low-Medium. Can be implemented as a webhook or scheduled job watching for status transitions.
* **Value Delivered:** High perceived responsiveness, which significantly reduces inbound 311 inquiries.
* **Demo Path (48h):** On a status update, fire a simple email to a test list and display logs and delivery metrics.
* **Future with GPS:** Trigger alerts based on automated coverage thresholds or geofences, ensuring throttling is in place to avoid spamming residents.

## Schema Requirements

Reusing industry patterns future-proofs integrations and accelerates GPS adoption. The schema should align with General Transit Feed Specification (GTFS) standards.

* **Zones & Routes:** Use `locations.geojson` for zones (represented as GeoJSON polygons) and `shapes.txt` for route alignments [6].
* **Vehicles:** Align with GTFS-Realtime `VehicleDescriptor` fields, including `id`, `label`, and `license_plate` [7].
* **Status Events:** A compact table tracking `event_id`, `zone_id`, `status`, `event_time`, and `notes`.
* **Mock GPS:** A time-series table tracking `vehicle_id`, `timestamp`, `lat`, `lon`, `speed`, and `heading`.

## 48-Hour Recommendation & Demo Strategy

**Recommendation:** Ship a cohesive MVP bundle consisting of Directions 1, 3, and 5. Present Direction 4 as the unified application layer, and mock Direction 2 to show future extensibility.

**Framing the GPS Gap Positively:** Position the lack of immediate GPS as a deliberate architectural choice that prioritizes data quality and trust. Emphasize that the system is "designed for real-time, but delivering value today." By using GTFS-aligned schemas [6] [7], the architecture is a "swap-in" model—when AVL data arrives, it plugs directly into the mock vehicle feed without requiring changes to the dashboards or APIs. Furthermore, relying on timestamped zone statuses rather than live vehicle dots avoids false precision, a lesson learned from cities like Syracuse where recently plowed streets might appear skipped during heavy snowfall [4].

## References

1. *Street Sweeping Operations - ArcGIS Solutions*. https://www.arcgis.com/apps/solutions/street-sweeping-operations
2. *Work in the field—ArcGIS Workforce | Documentation*. https://doc.arcgis.com/en/workforce/android-phone/help/complete-your-first-assignment.htm
3. *Monitor Your Workforce Project Using ArcGIS Dashboards*. https://www.esri.com/arcgis-blog/products/workforce/field-mobility/monitor-your-workforce-project-using-operations-dashboard-for-arcgis
4. *Syracuse Uses Smart Maps to Track Snowplows*. https://www.esri.com/about/newsroom/blog/syracuse-tracks-maps-snowplows
5. *Oversee snowplows in real time | Documentation - ArcGIS*. https://learn.arcgis.com/en/projects/oversee-snowplows-in-real-time/
6. *Reference - General Transit Feed Specification*. https://gtfs.org/documentation/schedule/reference/
7. *Reference - General Transit Feed Specification*. https://gtfs.org/documentation/realtime/reference/