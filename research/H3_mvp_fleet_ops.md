# Build-Now Fleet Visibility: A GPS-Ready MVP for Richmond

## Executive Summary
Richmond can deliver a highly credible, zone-based fleet coverage MVP today using open GIS data, with a clean architectural path to auto-activation once the city's GPS rollout is complete. By implementing an "Estimated vs. Confirmed" dual-status model, a hackathon team can bypass the immediate need for live vehicle telemetry. Richmond already possesses 29,423 street centerline segments to anchor zone and route coverage [1]. 

The most viable approach for a 48-hour build is a map-first "coverage by segment" model. Teams should seed synthetic routes by sampling centerline segments within council districts, assigning simple time windows to create "scheduled completion" baselines. A supervisor dashboard can manually mark blocks as "in-progress" or "done." When GPS and telematics (like Power Take-Off or spreader data) eventually arrive, the system will simply auto-advance segment coverage using trip events without requiring a UI or database rebuild. Public trust hinges on explicit latency messaging and confidence scoring, learning from cities like Denver and NYC that have navigated the pitfalls of raw GPS tracking.

## Context and Goal: Credit-Worthy MVP Without Assuming GPS
The core weakness of Richmond's fleet operations problem statement is the incomplete GPS system rollout, meaning no live vehicle telemetry feed can be assumed available. 

### Constraints and Opportunity in a Weekend Build
Live vehicle telemetry and per-vehicle positions are currently blocked. However, schedule-based ETAs, manual supervisor confirmations, and segment-level coverage using public GIS are entirely feasible. The opportunity lies in building a system that provides immediate operational value through manual and schedule-based tracking, while laying the exact groundwork needed for future automated data streams.

### Success Definition for Lasting Value
A successful prototype features a production-ready schema and UI that become smarter when GPS or Power Take-Off (PTO) data arrives, without requiring any refactoring. The architecture must support a simple "data source swap" from manual/mock inputs to a live webhook.

## Case Studies: Earning Trust Before Full GPS
Cities earn public trust by clearly distinguishing estimated versus confirmed statuses, disclosing latency, and explaining edge cases where raw location data does not equal completed service.

### NYC PlowNYC: Auto-GPS Sync and Resident Skepticism
New York City's PlowNYC tracker automatically syncs with GPS devices on sanitation trucks [2]. However, residents reported that streets marked green (plowed) on the map were completely impassable [2]. The Department of Sanitation had to clarify that plows are raised two inches off the ground to protect roadways, and rapid snowfall can make a recently plowed street look untouched within hours [2]. This demonstrates that raw location data does not confirm service delivery without state-of-service signals and clear public messaging.

### Denver Plow Tracker: Explicit Latency Disclosure
Denver's plow tracker website publicly states that the map display is delayed by 15 minutes [3]. Transparent latency settings calibrate public expectations and prevent users from expecting real-time, down-to-the-second accuracy that the system cannot guarantee.

### Seattle Winter Weather Map: Recency Framing
During snow events, Seattle's Winter Weather Response Map shows planned response routes and streets that have been "recently plowed" [4]. Using "recency" language avoids overclaiming exact times or perfect coverage, reducing public friction.

### Boston and Syracuse: Coverage-First Operations
Boston utilizes Samsara's Coverage Map to monitor which districts have not had streets plowed, allowing them to redeploy vehicles efficiently and reduce constituent complaints [5]. Syracuse integrated Samsara's GPS data with Esri to create a public plow map showing the last time a street was plowed, improving transparency and saving staff time [5].

| City / Tool | Data Basis | Latency / Framing | Trust Tactic | Notable Issue / Outcome |
| :--- | :--- | :--- | :--- | :--- |
| **NYC PlowNYC** | GPS auto-sync [2] | Implied real-time [2] | Explainers on raised blades and re-accumulation [2] | False positives reported by trapped residents [2] |
| **Denver Plow Tracker** | GPS [3] | 15-minute delay [3] | Clear latency label [3] | Sets realistic expectations [3] |
| **Seattle Weather Map** | Service data + plans [4] | "Recently plowed" [4] | Recency framing [4] | Avoids overpromising exact coverage [4] |
| **Syracuse Plow Map** | Samsara GPS + Esri [5] | "Last time plowed" [5] | Public transparency [5] | Reduced resident calls, improved efficiency [5] |

## Data Foundations Available Today in Richmond
Richmond's open data ecosystem provides enough structural geometry to build a credible, zone-based progress tracker without live GPS.

### Street Centerlines and Segmentation
Richmond's Centerlines feature layer contains 29,423 records (updated May 2025) [1]. This dataset includes critical fields such as `CarriagewayID`, `Functional Class`, `Posted Speed`, and address ranges [1]. These segments serve as the atomic unit of coverage for the MVP.

### Zones and Overlays
The city provides a Council Districts dataset, which is ideal for zone rollups and high-level visualization [6]. Additionally, the Virginia Geographic Information Network (VGIN) provides statewide Road Centerlines (RCL) as a dynamic fallback dataset [7].

### Operational Proxies
Richmond's 311 system handles service requests for potholes, sidewalks, and stormwater [8]. Historical 311 data and city schedules from the Open Data Portal can serve as baseline inputs for generating realistic synthetic schedules [8] [9].

## Minimum Useful Schema with Incomplete GPS
An event-based, segment-centric model unlocks progress tracking now and seamlessly accepts telemetry later via a simple data-source swap. Samsara provides REST APIs and Webhooks covering telematics and diagnostics, making future integration straightforward [10] [11].

| Field | Type | Required for MVP | Source Now | Source Later | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `zone_id` | string | Yes | Council Districts | Same | Enables zone rollups |
| `route_id` | string | Yes | Synthetic schedule | Ops/GIS | Groups of segments |
| `segment_id` | string | Yes | Centerlines.CarriagewayID | Same | Atomic coverage unit |
| `status` | enum | Yes | Manual/Schedule | GPS/PTO | scheduled, active, completed, blocked |
| `event_timestamp` | datetime | Yes | Synthetic/manual | GPS webhook | ISO 8601 format |
| `completion_pct` | number | Yes | Derived | Derived | Segments done / total |
| `data_source` | enum | Yes | schedule, manual | gps, pto | Trust label for UI |
| `confidence` | float | Yes | Low/Med | Computed | Based on corroboration |
| `vehicle_id` | string | No | N/A | Telematics | Becomes available later |
| `pto_state` | enum | No | N/A | Sensors | Service confirmation signals |

## MVP Product Scope and Demo Interactions
The smallest viable demo that proves the concept without live GPS consists of a Zone Status Board, an Address Lookup tool, and a Supervisor Panel for manual advancement.

### Public Map and Address Lookup
The public-facing UI should feature a map with color-coded zones displaying completion percentages, "Estimated" or "Confirmed" badges, and last-updated timestamps. An address lookup allows users (and judges) to enter a street and see a panel stating the scheduled window, latest status, and the data source badge.

### Supervisor Panel
The internal operations view allows a supervisor to select a route or segment and manually set the status or bulk-advance progress. Supervisors can also add condition tags, such as "blocked—downed limb."

### Demo Flow for Hackathon Judges
1. Start with the public address lookup using a sample address to show "Estimated by schedule."
2. Open the supervisor panel and manually confirm a few segments.
3. Switch back to the public view to watch the completion percentage update and the status flip to "Confirmed."
4. Show a "GPS Connector" screen featuring an environment variable toggle that switches the ingest from mock CSV/JSON data to a `/webhook/gps/samsara` endpoint.

## Trust and Communication Plan
Labeling "Estimated" statuses without undermining credibility requires proactive caveats and clear visual indicators.

### Badges and Latency Disclosure
Use explicit status pairs: "Estimated" (based on schedule) and "Confirmed" (based on manual input or future GPS). Include a clear latency disclosure, such as "Map updates every 10–15 minutes," mirroring Denver's successful strategy [3].

### Explainers and Dispute Mechanisms
Incorporate a "What this means" explainer for false positives. Explain why a street may look unplowed after a pass (e.g., raised blades, rapid re-accumulation), directly addressing the issues NYC faced [2]. Add a "disputed" flag that residents or field leads can toggle to request verification.

## Activation Path When GPS Arrives
Designing for a data source swap prevents weekend code from becoming throwaway. When GPS goes live, the database and UI remain unchanged.

### Ingest and Mapping
Switch the ingest to a Samsara REST API or webhook [10]. Normalize the incoming data to `RouteEvents` with a status of "visited." Infer actual service confirmation only when Power Take-Off (PTO) or material spreader data is present [5] [12]. Map the GPS lat/lon to the nearest `segment_id` and the `device_id` to the `vehicle_id`.

## Risks, Failure Modes, and Mitigations
* **False Positive Completions**: Raw GPS signals are noisy. Mitigate this by requiring corroboration (e.g., PTO/blade evidence or supervisor confirmation) before marking a segment as "Confirmed."
* **Latency Confusion**: Users may expect real-time updates. Mitigate by badging latency explicitly and showing "last updated" timestamps.
* **Route Assignment Errors**: Pre-planned routes may not match reality. Mitigate by allowing manual reassignment of segments in the supervisor UI.

***

## Research Outputs

### Facts
* Denver's plow tracker website explicitly states a 15-minute delay for its map updates [3].
* Seattle's Winter Weather Response Map shows planned response routes and streets that have been "recently plowed" [4].
* NYC's PlowNYC tracker automatically syncs with GPS devices on sanitation trucks [2].
* NYC residents reported streets marked as plowed on PlowNYC were impassable; DSNY explained plows are raised two inches off the ground and snow can re-accumulate rapidly [2].
* Samsara's Coverage Map allows fleets to see traversed streets, PTO engagement, and material spreader utilization [5].
* The City of Boston used Samsara's Coverage Map to identify unplowed districts and deploy vehicles accordingly [5].
* The City of Syracuse integrated Samsara GPS data with Esri to provide a public plow map showing the last time a street was plowed [5].
* Samsara provides REST APIs and Webhooks for telematics and diagnostic data integration [10] [11].
* Richmond's Centerlines feature layer contains 29,423 records, updated May 14, 2025, and includes `CarriagewayID`, `Functional Class`, `Posted Speed`, and address ranges [1].
* Richmond provides public datasets for Council Districts and 311 service requests [8] [6].

### Inferences
* **Judges' Minimum Bar**: In a hackathon setting, demonstrating a clear user journey and a credible, GPS-ready architecture will outweigh the lack of live raw data hookups. A supervisor-advance flow proves the concept effectively.
* **Recency Framing Reduces Friction**: Using terms like "recently serviced" rather than "live now" likely reduces complaint volumes by setting realistic expectations regarding latency and the definition of service.
* **Confidence Scoring Evolution**: Confidence scoring will start with conservative defaults (e.g., 0.4 for schedule, 0.6 for manual) and become highly automated and accurate once PTO, blade, and spreader telemetry arrive.

### Unknowns
* The specific availability, timing, and vendor capabilities of Richmond DPW's upcoming GPS rollout (e.g., whether they will have blade position or PTO integration immediately).
* Whether Richmond has highly granular, machine-readable street-cleaning or leaf-collection schedules readily accessible for the weekend build.
* Internal DPW route definitions and service priorities, which may require assumptions or a quick check-in with city staff.

### Recommended Mock GPS Data Schema
This schema can be seeded into a demo database in under 2 hours using Richmond's open data.

* **Zones**: `zone_id` (string, e.g., "RVA-02"), `zone_name` (string), `geometry_id` (ref), `last_updated` (datetime)
* **Routes**: `route_id` (string, e.g., "RVA-2A"), `zone_id` (string), `service_date` (date), `planned_start` (datetime), `planned_end` (datetime), `status` (enum: scheduled/active/completed)
* **RouteSegments**: `route_id` (string), `segment_id` (string, mapped from Centerlines.CarriagewayID), `priority` (int), `planned_sequence` (int)
* **SegmentCoverage**: `segment_id` (string), `latest_status` (enum: scheduled/active/completed/blocked/disputed), `last_event_id` (string), `last_updated` (datetime), `data_source` (enum: schedule/manual/gps/pto), `confidence` (float 0.0-1.0)
* **RouteEvents**: `event_id` (string), `route_id` (string), `segment_id` (string|null), `vehicle_id` (string|null), `status` (enum), `event_timestamp` (datetime), `lat` (float|null), `lon` (float|null), `pto_state` (enum: on/off/unknown), `blade_pos` (enum: up/down/unknown), `data_source` (enum), `notes` (string)

**Example Seed Values:**
* *Zones*: RVA-02, "2nd District", geom_02, 2026-03-17T14:30:00Z
* *Routes*: RVA-2A, RVA-02, 2026-03-17, 14:00Z, 16:00Z, active
* *RouteSegments*: (RVA-2A, 12022, 2, 1), (RVA-2A, 12221, 2, 2)
* *SegmentCoverage*: (12022, completed, E-002, 2026-03-17T14:25:00Z, manual, 0.7)
* *RouteEvents*: E-001, RVA-2A, 12022, null, active, 2026-03-17T14:10:00Z, null, null, unknown, unknown, manual, "Started segment"

## References

1. *Centerlines | Richmond GeoHub*. https://richmond-geo-hub-cor.hub.arcgis.com/datasets/centerlines/explore
2. *PlowNYC tracker showed streets plowed, but Staten Island ...*. https://www.silive.com/news/2026/02/plownyc-tracker-showed-streets-plowed-but-staten-island-residents-said-otherwise.html
3. *How accurate is the Denver snow plow tracker? | 9news.com*. https://www.9news.com/article/news/local/next/how-accurate-is-denver-snow-plow-tracker/73-45c68d92-958d-4f66-92e1-e710fa63fe29
4. *Snow Plow Routes - Transportation | seattle.gov*. https://www.seattle.gov/transportation/projects-and-programs/safety-first/winter-weather-response/snow-plow-routes
5. *Introducing New Tools to Streamline Snow Operations*. https://www.samsara.com/blog/new-tools-for-public-works-fleets
6. *Council Districts | Open Data Portal | City of Richmond, Virginia*. https://data.richmondgov.com/dataset/Council-Districts/eggb-rb5j
7. *Virginia Road Centerlines (RCL) - VGIN*. https://vgin.vdem.virginia.gov/datasets/cd9bed71346d4476a0a08d3685cb36ae
8. *About RVA 311 | Richmond*. https://www.rva.gov/citizen-service-and-response/about-rva-311
9. *Open Data Portal | City of Richmond, Virginia | Open Data Portal | City of Richmond, Virginia*. https://data.richmondgov.com/
10. *Samsara | Developers*. https://www.samsara.com/support/developers
11. *REST API Overview - Samsara*. https://developers.samsara.com/docs/rest-api-overview
12. *Materials Spreaders – Samsara Help Center*. https://kb.samsara.com/hc/en-us/articles/360059978871-Materials-Spreaders