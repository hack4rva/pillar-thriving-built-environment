> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# De-Risking Fleet GPS Prototypes: Bridging Synthetic Data to Real-World Feeds

## Executive Summary
Building a fleet operations tool on synthetic GPS data introduces significant schema-drift risks when transitioning to production feeds. If a prototype is built against an arbitrary mock schema, the arrival of real data can force a complete architectural rewrite. However, by anchoring synthetic data to established standards like GTFS-Realtime, NMEA-0183, or the Mobility Data Specification (MDS), teams can minimize rework. Furthermore, transparently labeling mock data during civic hackathons mitigates reputational risks and aligns with industry best practices demonstrated by Open311 and MDS sandbox environments. This report outlines the risk matrix, documentation strategies, and exact demo language required to successfully navigate the prototype-to-production transition.

## 1. Context: The GPS Data Gap
Real-time municipal GPS feeds are often unavailable or restricted during the rapid prototyping phases of civic hackathons. This forces teams to rely on synthetic stand-ins to demonstrate functionality. While mock data enables immediate frontend and backend development, it creates a technical debt time-bomb: the assumption that the eventual production data will perfectly match the synthetic schema. 

## 2. Risk Assessment — Likelihood & Severity Matrix
The risk of schema mismatch is highly likely, but its severity depends entirely on the team's upfront schema design choices. 

### Comparative Table: Open vs. Proprietary Schema Risk Profiles

| Schema Approach | Likelihood of Drift | Severity of Rework | Primary Vulnerability |
| :--- | :--- | :--- | :--- |
| **Ad-Hoc / Proprietary** | High | Critical | Complete data mapping rewrite; potential database schema overhaul. |
| **NMEA-0183 Based** | Moderate | Low | Parsing string-based sentences (e.g., `$GPGGA`) into JSON [1]. |
| **GTFS-Realtime Based** | Low | Minimal | Handling optional fields like `CongestionLevel` or `OccupancyStatus` [2]. |
| **MDS Based** | Low | Minimal | Aligning telemetry and `trip_start` / `trip_end` events [3]. |

*Takeaway:* Adopting an open standard for synthetic data reduces the severity of future rework from a critical architectural failure to a minor configuration adjustment.

## 3. Designing Future-Proof Schemas
To maximize forward compatibility, synthetic schemas should be built as a subset of established transportation data standards. 

### Core Field Convergence Across NMEA, GTFS-RT, and MDS

| Field Concept | GTFS-Realtime (VehiclePositions) | NMEA-0183 | MDS (Telemetry) |
| :--- | :--- | :--- | :--- |
| **Latitude** | `Latitude` (WGS-84) [2] | `Latitude` (ddmm.mmmm) [1] | GPS Coordinate [3] |
| **Longitude** | `Longitude` (WGS-84) [2] | `Longitude` (dddmm.mmmm) [1] | GPS Coordinate [3] |
| **Timestamp** | `timestamp` [2] | `Time` (UTC hhmmss.ss) [1] | Event Timestamp [3] |
| **Heading/Direction**| `Bearing` [2] | `Direction` (N, S, E, W) [1] | Telemetry Heading [3] |
| **Vehicle ID** | `VehicleDescriptor` (ID, Label) [2] | N/A | Device/Vehicle ID [3] |

*Takeaway:* A synthetic schema should strictly implement Latitude, Longitude, Timestamp, Heading, and Vehicle ID. Any additional fields should be treated as optional to prevent strict validation failures when real data arrives.

### Handling Unknown Fields & Optionality Rules
When designing the parser for the synthetic data, ensure it can gracefully ignore unknown fields. For example, the SAE J2735 Basic Safety Message (BSM) utilizes Unaligned Packed Encoding Rules (UPER) and requires strict parsing to reject non-valid inputs for security [4] [5]. However, for general fleet tracking, using extensible JSON schemas allows the system to accept real data that may contain unexpected metadata without crashing.

## 4. Documentation Strategy for Synthetic Data
A well-documented synthetic schema is the contract that allows future developers to map real GPS feeds into the system. 

### Must-Include Artifacts Checklist
* **Schema Definition:** A clear JSON or Protobuf schema defining the mock data structure.
* **Sample Payloads:** Provide exact JSON examples of the synthetic data being generated.
* **Test Endpoints:** Emulate the approach of Open311 implementations, which provide dedicated test/sandbox URLs (e.g., SeeClickFix, Toronto, and Boston Open311 test servers) returning standardized JSON responses [6] [7].

## 5. Ethical & Reputational Considerations
Presenting a fleet tracking demo without clear "mock data" labeling carries significant reputational risk. Stakeholders, judges, and city officials may assume the tool is already integrated with live city infrastructure. If this illusion is broken post-demo, it damages trust and can derail procurement or pilot opportunities.

### Approved Disclosure Language & On-Screen Labels
Prototypes must feature persistent UI elements indicating the use of synthetic data. A simple banner stating "Demo uses synthetic MDS telemetry data" ensures transparency while keeping the focus on the tool's capabilities.

## 6. Demo & Messaging Playbook
When presenting to judges, teams should proactively address the synthetic nature of their data to project engineering maturity.

### Exact Elevator Phrase
*"This demo streams synthetically generated GPS data formatted to the open Mobility Data Specification (MDS) standard. Because we built against this standard schema, swapping to a real city telemetry feed is a configuration change, not a code rewrite."*

## 7. Migration Effort Scenarios
If the eventual real GPS schema differs from the synthetic schema, the rework effort depends on the delta between the two.

### Scenario Table: Migration Rework Estimates

| Scenario | Description | Estimated Rework Effort |
| :--- | :--- | :--- |
| **Standard-to-Standard** | Moving from synthetic MDS to real MDS [3]. | < 4 hours (Updating endpoint URLs and auth tokens). |
| **Superset Mapping** | Real data contains more fields than the synthetic schema. | 1-2 days (Updating parsers to capture new valuable fields). |
| **Divergent Formats** | Moving from a proprietary JSON mock to NMEA-0183 strings [1]. | 1-2 weeks (Writing new middleware to parse strings into the internal JSON format). |

*Takeaway:* Adhering to standards like GTFS-RT or MDS during the hackathon phase drastically reduces the migration timeline.

## 8. Case Studies — From Mock to Production
Successful civic tech tools frequently utilize test environments before moving to production. 

### Success Story: MDS Compliance Mobile App
The Open Mobility Foundation's MDS Compliance Mobile App demonstrates the value of test data. The app allows agencies to create "audit trips" to verify that the telemetry data provided by mobility service providers matches what is actually happening on the street [3]. By standardizing the expected data format (MDS), the app can seamlessly compare test/audit data against real provider feeds [3].

### Success Story: Open311 Sandboxes
The Open311 GeoReport v2 standard explicitly encourages the use of test environments. Jurisdictions like Toronto, Baltimore, and Boston provide dedicated test URLs (e.g., `open311test.baltimorecity.gov`) alongside their production endpoints [7]. This allows developers to build and test applications against synthetic/test data with the guarantee that the production endpoint will use the exact same schema [7].

## 9. Action Roadmap for Hackathon Teams
To maximize compatibility and judge confidence, teams should follow this roadmap:

1. **Adopt a Standard:** Choose GTFS-Realtime [2] or MDS [3] as the basis for your synthetic data.
2. **Generate Compliant Mocks:** Write a script that generates mock data strictly adhering to the chosen standard's core fields.
3. **Label the UI:** Add a persistent "Synthetic Data" watermark to the frontend.
4. **Document the Contract:** Publish the schema and sample payloads in the project repository.
5. **Deliver the Elevator Pitch:** Use the recommended disclosure language during the demo to turn the use of mock data into a demonstration of technical foresight.

## References

1. *NMEA-0183 messages: Common message elements*. https://receiverhelp.trimble.com/alloy-gnss/en-us/NMEA-0183messages_CommonMessageElements.html
2. *Vehicle Positions - General Transit Feed Specification*. https://gtfs.org/documentation/realtime/feed-entities/vehicle-positions/
3. *GitHub - openmobilityfoundation/mds-compliance-mobile: MDS Compliance Testing Mobile App · GitHub*. https://github.com/openmobilityfoundation/mds-compliance-mobile
4. *Vehicle-to-Infrastructure (V2I) Message Lexicon*. https://rosap.ntl.bts.gov/view/dot/32033/dot_32033_DS1.pdf
5. *Development of a Verified Message Parser for V2V ...*. https://www.nhtsa.gov/sites/nhtsa.gov/files/documents/13264-verificationv2vreport_030718_v4a_tag.pdf
6. *SeeClickFix Open311 - SeeClickFix*. https://seeclickfix.com/open311/v2/docs
7. *GeoReport v2 Servers*. https://wiki.open311.org/GeoReport_v2/Servers/