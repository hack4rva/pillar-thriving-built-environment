# Future-proofing a Fleet Ops Demo at D3=2: Ship Value Now, Avoid Rework Later

## Executive Summary

For a hackathon team tackling the Fleet Operations problem statement, a data readiness score of D3=2 is a critical warning sign: the live GPS feed is not ready for production. In data maturity frameworks, Level 2 indicates that data is managed in an "ad hoc manner" [1], often resembling "hearsay data" that has not yet been made electronically available for analysis [2]. Ignoring this constraint and hardcoding an application to a hypothetical data format guarantees prototype obsolescence when the real data eventually arrives.

To win the hackathon and deliver a sustainable solution, teams must treat the GPS feed as an unreliable input and build for change. The most effective strategy is to implement a schema-first adapter using OpenAPI and JSON Schema, backed by a synthetic data generator. By defining a strict, versioned contract (e.g., `v0alpha`) and aligning synthetic fields with established mobility standards like GTFS-realtime and the Mobility Data Specification (MDS), teams can build a fully functional UI and alerting logic today. When the real data arrives, the team simply swaps the data adapter, leaving the core application untouched. 

## What D3=2 Implies for Fleet Ops Teams

### Level 2 Maturity Means "Ad Hoc" Data Management
In the Advanced Analytics Capability Maturity Model (A2CM2), a Level 2 score signifies that a sub-category has only been addressed in an "ad hoc manner," lacking formal, consistent governance [1]. Operationally, this means a hackathon team cannot rely on stable schemas, guaranteed uptime, or consistent latency from the fleet data source. 

### The "Hearsay Data" Barrier
In Neil Lawrence's Data Readiness Levels, data at this stage often sits at Grade C, which is colloquially termed "Hearsay Data"—someone has heard they have the data, so they say they have it, but its accessibility and validity are unverified [2]. The transition from Grade C to Grade B requires the data to become electronically available via an API or direct loading mechanism [2]. Because a D3=2 score indicates this transition is incomplete, teams must decouple their UI and business logic from the data ingestion layer immediately to avoid being blocked.

## Proven Workarounds When Data Is Unavailable

When building against unavailable data, teams must compress integration risk by simulating the eventual endpoint. The API lifecycle naturally progresses from Examples to Schema (JSON Schema), to OpenAPI definitions, to Mocks, and finally to Synthetic data generation [3]. 

### Comparison of Data Unavailability Workarounds

| Approach | When to Use | Strengths | Risks | Swap-over Effort |
| :--- | :--- | :--- | :--- | :--- |
| **Schema-first Mock API** | Day 1 of hackathon | Auto-generates realistic responses from API schema [4]; unblocks frontend teams immediately. | May lack dynamic state changes needed for fleet tracking. | Low. Just change the base URL. |
| **Static JSON Fixtures** | Prototyping static UI components | Simple to implement; requires no infrastructure. | Cannot demonstrate real-time movement or state transitions. | High. Requires rewriting data fetching logic. |
| **Synthetic Data Generator** | Demonstrating live fleet operations | Mimics properties and patterns of real-world data [5]; enables testing of real-time alerts. | Can oversimplify edge cases (e.g., GPS bounce). | Low. Adapter handles the translation. |
| **Consumer-Driven Contract (CDC) Tests** | CI/CD pipeline integration | Prevents providers from breaking downstream consumers [6]. | Requires setup time; overkill for a 24-hour sprint but vital for 48+ hours. | Zero. Ensures the real API matches the mock. |

## Versioning and Compatibility

### Preventing the "Subset/Superset" Divergence Trap
A major risk of building a prototype on mock data is schema drift—specifically the divergence between OpenAPI and JSON Schema, which can lead to subset/superset compatibility issues [7]. To prevent prototype obsolescence, teams must enforce strict versioning from the start. 

### Implementing Google's AIP-185 Versioning Standards
Google's API Improvement Proposals (AIP-185) mandate that API interfaces provide a major version number encoded at the end of the package and URI path (e.g., `v1`) [8]. For early-stage prototypes, teams should use channel-based versioning:
* **Alpha/Beta Channels**: Append the stability level to the version (e.g., `v1alpha` or `v1beta`) [8].
* **Additive Changes Only**: Ensure backward compatibility by only allowing additive changes. 
* **Deprecation Windows**: Plan for a 180-day deprecation period for functionality removed from beta channels [8]. 

By publishing a `v0alpha` API today and enforcing backward-compatible changes, teams ensure that when the real fleet data arrives, the integration does not break existing application logic. As Stripe notes, code written to integrate with an API has inherent assumptions, making explicit versioning essential for future-proofing [9].

## Minimum Viable Synthetic Dataset for Fleet Status

To build a credible fleet status demo, the synthetic dataset must align with industry standards. GTFS-realtime uses `VehiclePositions` to provide automatically generated location information from onboard GPS devices [10]. The Mobility Data Specification (MDS) requires telemetry feeds to include at least two points per trip (start and end) and allows rounding latitude and longitude to 5-6 decimal places to reflect maximum measurement accuracy [11].

### Core Fleet Telemetry Schema Mapping

| Field Name | Type / Units | Required? | GTFS-rt Equivalent | MDS Equivalent | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `vehicle_id` | String | Yes | `vehicle.id` [10] | `vehicle_id` [12] | Unique identifier for the asset. |
| `timestamp` | ISO-8601 | Yes | `timestamp` | `last_updated` [11] | Time of the GPS ping. |
| `lat` / `lon` | Float | Yes | `position.latitude` / `longitude` | `gps.lat` / `gps.lng` [12] | Round to 5-6 decimal places for realistic precision [11]. |
| `bearing` | Float (0-360) | No | `position.bearing` | N/A | Crucial for UI map markers. |
| `speed_mps` | Float (m/s) | No | `position.speed` | N/A | Triggers idle/moving state changes. |
| `state` | Enum | Yes | `current_status` | `vehicle_state` [11] | e.g., idle, moving, offline. |
| `ttl` | Integer (seconds) | Yes | N/A | `ttl` [11] | Time until the next expected update; drives UI refresh rates [11]. |

## Civic Tech Precedents

### Bridging Mocks to Reality with Twin Endpoints
Successful civic tech projects frequently use synthetic or mock data as a bridge to real data by exposing parallel environments. 
* **Open311 Sandboxes**: SeeClickFix provides two distinct Open311 endpoints: a Production (live) URL and a Test (sandbox) URL [13]. Similarly, the City of Tampere provides a shared test API key for developers to build against before granting production keys [14].
* **GTFS Example Feeds**: MobilityData maintains downloadable, comma-delimited example GTFS feeds (e.g., `stops.txt`, `routes.txt`, `vehicle_positions`) so developers can build routing logic before integrating a specific city's live feed [15] [16].

Hackathon teams should mirror this approach: ship both `/test` and `/prod` API bases with identical OpenAPI contracts. Running the demo on the `/test` endpoint and showing a one-line environment variable switch to `/prod` proves to judges that the application is swap-ready.

## Documentation for Future Compatibility

### Treating Synthetic Data Like Production Data
To maximize compatibility with a future real data source, synthetic data must be documented rigorously. The UK Government's guidelines for AI-ready datasets recommend maintaining data at multiple levels of granularity (grains) using a Lakehouse pattern: Bronze (raw), Silver (cleaned/enriched), and Gold (aggregated) [17]. Synthetic data can supplement or replace real data to accelerate readiness [17].

Furthermore, the ONS synthetic data policy requires that the use of synthetic data be explicitly documented, detailing how it was produced and its limitations [18]. 

Teams should publish a documentation package alongside their prototype that includes:
1. A JSON Schema 2020-12 definition.
2. Example JSON payloads.
3. A data dictionary specifying units (e.g., meters per second) and enums.
4. A limitations note explicitly labeling the data as synthetic.
5. A mapping document showing how the schema aligns with GTFS-rt and MDS.

## Demo Narrative and Risk Disclosure

### Framing the Data Gap as an Engineering Feature
When presenting a prototype, it never hurts to add context and set expectations at the beginning [19]. Teams should not hide the D3=2 data gap; instead, they should frame it as a constraint they successfully de-risked through superior software engineering.

**Recommended 20-Second Demo Script:**
> *"Because the live fleet GPS feed is currently at a D3=2 readiness level—meaning access is ad hoc—we treated it as an untrusted dependency. We are demoing today using standards-aligned synthetic data behind a strictly versioned API. We built a schema-first adapter mapped to GTFS and MDS standards. When the real GPS data arrives, we simply swap the adapter, not the application."*

## Implementation Plan for a 48-Hour Hackathon

### Day 1: Contract and Mocking
* **Morning**: Define the OpenAPI 3.1 and JSON Schema for `/vehicles` and `/telemetry`. 
* **Afternoon**: Auto-generate a mock server using a framework that supports smart mocks [4]. Stub the data adapter.
* **Evening**: Build the map and status UI against the mock endpoints. Seed the synthetic data generator with 25-50 vehicles.

### Day 2: Semantics and Polish
* **Morning**: Implement real-time semantics. Add `last_updated` and `ttl` to the synthetic responses [11] and wire the frontend to refresh based on the `ttl` value.
* **Afternoon**: Add Consumer-Driven Contract (CDC) tests to CI to prevent schema drift [6]. Write the data dictionary and limitations documentation.
* **Evening**: Rehearse the demo, specifically practicing the environment switch from `/test` to `/prod`.

## Risks and Mitigations

| Risk | Evidence / Context | Impact | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **Schema Drift** | OpenAPI and JSON Schema divergence can cause subset/superset compatibility failures [7]. | High. Breaks UI parsing logic. | Implement Consumer-Driven Contract (CDC) testing in CI [6]. Disallow breaking changes. |
| **Latency Assumptions** | Real GPS feeds have jitter and delays; mocks are instantaneous. | Medium. UI may look broken when real data lags. | Include `ttl` and `last_updated` fields [11]. Add artificial jitter to the synthetic generator. |
| **Coordinate Precision** | Real GPS is limited to 5-6 decimal places [11]. | Low. Minor map snapping issues. | Truncate synthetic `lat`/`lon` to 5 decimal places to mimic real-world a-GPS accuracy [11]. |

## Appendices

### Appendix A: Facts
* A Level 2 maturity score indicates a sub-category has been addressed in an "ad hoc manner" [1].
* Grade C data readiness is defined as "hearsay data" that is not yet electronically available [2].
* Google APIs use major version numbers (e.g., `v1`) and append stability levels for pre-release channels (e.g., `v1alpha`) [8].
* MDS telemetry requires at least 2 points per trip and allows rounding coordinates to 5-6 decimal places [11].
* SeeClickFix provides separate Production and Test (sandbox) Open311 endpoints [13].
* The UK Government recommends maintaining datasets at multiple grains (Bronze, Silver, Gold) and using synthetic data to accelerate readiness [17].

### Appendix B: Inferences
* *Inference*: Because D3=2 data is ad hoc and not electronically available, hardcoding a hackathon prototype to a presumed data structure will result in immediate technical debt and prototype obsolescence.
* *Inference*: By adopting fields from GTFS-realtime and MDS, a synthetic dataset is highly likely to be forward-compatible with whatever vendor the city eventually uses for fleet tracking.
* *Inference*: Demonstrating a seamless switch between a `/test` and `/prod` environment during a pitch proves to judges that the team understands enterprise deployment patterns, elevating the project above a standard hackathon mockup.

### Appendix C: Synthetic Data Strategy Recommendation
Adopt a schema-first design using OpenAPI 3.1. Generate a synthetic dataset of 25-50 vehicles emitting telemetry every 10-15 seconds. Ensure the payload includes `vehicle_id`, `lat`, `lon` (rounded to 5 decimals), `speed_mps`, `state`, `last_updated`, and `ttl`. Document the dataset explicitly as synthetic, mapping its fields to GTFS-rt and MDS standards to guarantee future interoperability.

### Appendix D: Demo Language for Explaining the GPS Gap
*"Live GPS is D3=2 (ad hoc). We’re demoing with standards-aligned synthetic data behind a versioned API. When real GPS arrives, we swap the adapter, not the app."*

## References

1. *Advanced Analytics Capability Maturity Model (A2CM2)*. https://www.ssa.gov/data/data_governance_board/ACE_A2CM2_for_DGB.pdf
2. *Data Readiness Levels*. http://inverseprobability.com/talks/notes/data-readiness-levels.html
3. *API Examples, Schema, Mocks, Static, Synthetic, Dynamic, Data, Functions, Frameworks, Gateway, Deployment, Documentation, and Client
    *. https://apievangelist.com/2020/06/24/api-examples-schema-mocks-static-synthetic-dynamic-data-functions-frameworks-gateway-deployment-documentation-and-client/
4. *The Top API Mocking Frameworks of 2025*. https://zuplo.com/learning-center/top-api-mocking-frameworks/
5. *AI Insights: Synthetic Data (HTML) - GOV.UK*. https://www.gov.uk/government/publications/ai-insights/ai-insights-synthetic-data-html
6. *Consumer-Driven Contract Testing — Stop Breaking Your Consumers | by satyam kumar | Medium*. https://medium.com/@subham11/consumer-driven-contract-testing-stop-breaking-your-consumers-376895cf969c
7. *The OpenAPI and JSON Schema Divergence Problem*. https://apisyouwonthate.com/blog/openapi-json-schema-divergence/
8. *AIP-185: API Versioning*. https://google.aip.dev/185
9. *APIs as infrastructure: future-proofing Stripe with versioning*. https://stripe.com/blog/api-versioning
10. *Vehicle Positions - General Transit Feed Specification*. https://gtfs.org/documentation/realtime/feed-entities/vehicle-positions/
11. *mobility-data-specification/provider/README.md at main · openmobilityfoundation/mobility-data-specification · GitHub*. https://github.com/openmobilityfoundation/mobility-data-specification/blob/main/provider/README.md
12. *Understanding the Data in MDS · openmobilityfoundation/mobility-data-specification Wiki · GitHub*. https://github.com/openmobilityfoundation/mobility-data-specification/wiki/Understanding-the-Data-in-MDS
13. *SeeClickFix Open311 - SeeClickFix*. https://seeclickfix.com/open311/v2/docs
14. *GitHub - Tampere/open311 · GitHub*. https://github.com/Tampere/open311
15. *Example GTFS feed - General Transit Feed Specification*. https://gtfs.org/getting-started/example-feed/
16. *Example GTFS Feed  |  Static Transit  |  Google for Developers*. https://developers.google.com/transit/gtfs/examples/gtfs-feed
17. *Guidelines and best practices for making government ...*. https://assets.publishing.service.gov.uk/media/696e43965a37ab534a9e23ac/Building_AI-Ready_Datasets_for_the_UK.pdf
18. *Synthetic data policy*. https://www.ons.gov.uk/aboutus/transparencyandgovernance/datastrategy/datapolicies/syntheticdatapolicy
19. *A practical guide to presenting design prototypes (+ Figma example) | by Brandy Shigemoto | UX Collective*. https://uxdesign.cc/presenting-prototypes-ed3068edb864