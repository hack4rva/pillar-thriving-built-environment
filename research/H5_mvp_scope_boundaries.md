> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# 48-Hour MVP Guardrails: Winning Scope for Richmond Built-Environment Demos

## Executive Summary

Success in a 48-hour civic tech hackathon hinges entirely on ruthless scope management. For the Richmond built-environment challenges—transportation project visibility and fleet operations—teams must navigate strict technical, legal, and operational boundaries. Public data is the only dependable input this weekend; Richmond’s Capital Improvement Program (CIP) Dashboard exists but is explicitly labeled "Beta" [1]. Furthermore, the Department of Public Works (DPW) relies on internal systems like Cityworks, which is deployed to 25 field crews and inaccessible for weekend integrations [2]. 

Real-time vehicle tracking is a legal dead end for third-party developers; Virginia Code § 18.2-60.5 restricts electronic tracking, with exceptions only for fleet owners, not external hackathon participants [3] [4]. Therefore, winning teams will build narrow, offline-capable Minimum Viable Products (MVPs) that avoid live integrations, user authentication, and real-time feeds. A working, narrowly scoped demo with synthetic or cached data will always defeat a broadly scoped, broken application.

## Objectives and 48-Hour Reality

The primary objective is to win by shipping the smallest useful slice of a solution. The only path to a stable weekend demo is a narrow, offline-capable MVP that avoids complex integrations, authentication layers, and real-time data feeds. 

### What success looks like in judging

A crisp story and a working interaction beat breadth every time. A successful demo includes a 90-second scripted flow that clearly demonstrates the core value proposition, followed by a realistic "what's next" roadmap for post-hackathon development.

## Data Landscape and Constraints

Teams must rely exclusively on publicly available data and avoid attempting to connect to internal municipal systems.

### Richmond CIP Dashboard is "Beta"

The City of Richmond's interactive Capital Improvement Projects (CIP) Dashboard is currently in a "Beta Version" [1]. The city explicitly warns that "the information presented may not be fully up-to-date or complete during this beta phase" [1]. Teams should plan to freeze a data snapshot rather than relying on live joins.

### DPW operations run on Cityworks

Richmond's DPW utilizes the Cityworks CMMS mobile application, which has been deployed to 25 field crews [2]. Because this is an internal system, teams will not have API access over the weekend and must not attempt integration.

### GeoHub availability and gaps

The Richmond GeoHub provides access to various datasets, including city boundaries and parcels [5] [6] [7]. However, unified project feature services across multiple agencies (like VDOT and RRHA) are not guaranteed. Teams should expect to hand-pick or export a small set of data and cache it as JSON to avoid empty states during the demo.

### Legal and privacy boundary for tracking

Virginia Code § 18.2-60.5 makes the unauthorized use of electronic tracking devices a Class 3 misdemeanor [3] [8]. While there is an exception for "The owner of fleet vehicles, when tracking such vehicles," this does not extend to third-party hackathon developers [3] [4]. Consequently, teams must exclude live GPS and driver-level metrics, relying instead on zone or route-level mock status.

## Scope Contracts

To prevent scope creep, teams must lock their build plans up front. The following matrices define exactly what is in scope for the 48-hour build, what is strictly out of scope, and what belongs in a Phase 2 roadmap.

### Transport Visibility Scope Contract

| Feature Category | In-Scope (48 Hours) | Out-of-Scope (Do Not Build) | Phase 2 (Post-Hackathon) |
| :--- | :--- | :--- | :--- |
| **Data Sources** | Cached JSON from Richmond GeoHub/CIP Beta | Live API pulls from multiple agencies | Automated sync with DPW permit systems |
| **User Interface** | Address search returning 3-5 nearby projects | Multi-department project aggregation | Embedding directly into Richmond's official website |
| **Mapping** | Static map or simple list view with distance | Environmental impact overlays | Interactive cross-agency GIS layers |
| **Notifications** | None | Email/SMS alerts, user accounts | Opt-in neighborhood alert system |

*Key Takeaway:* The transport MVP must focus solely on an address-to-nearby-projects list using cached City of Richmond data. Multi-agency aggregation and alerts are strictly Phase 2.

### Fleet Ops Visibility Scope Contract

| Feature Category | In-Scope (48 Hours) | Out-of-Scope (Do Not Build) | Phase 2 (Post-Hackathon) |
| :--- | :--- | :--- | :--- |
| **Tracking** | Mock zones with static status labels | Live GPS vehicle tracking | Integration with DPW dispatch software |
| **Metrics** | High-level zone completion status | Performance dashboards with driver metrics | Cross-department fleet coordination |
| **Interactions** | Pre-staged or manual "mark complete" button | Automatic detection of missed service events | Turn-by-turn route optimization |
| **Enforcement** | None | Automated tow zone enforcement notifications | Legal/liability approved notification workflows |

*Key Takeaway:* The fleet MVP must be a zone-based status board using synthetic data. Live GPS and driver metrics violate legal and technical constraints for a weekend build.

## MVP Definitions

Defining the smallest interactions that judges will find useful is critical for a credible demo.

### Transport MVP: Address search to nearby projects

The smallest useful interaction is an address input that returns nearby projects with plain-language status cards. A list view with distance is sufficient for a first-cut demo; a map is optional. To make the demo feel legitimate, teams should cache 10-20 real projects from the GeoHub. The UI must clearly display a "Data as of [timestamp]" label.

### Fleet MVP: Zone-based status board

The minimum viable demo is a map of Richmond showing 6-8 colored zones with status labels (Scheduled / In Progress / Completed) and 3-4 mock vehicles. The supervisor interaction (manually marking a route complete) can be pre-staged. "Demo-ready" means the UI is functional, the data is clearly labeled with a "Mock Data" banner, and the team can explain exactly what internal systems would activate it in reality.

## UX and Demo Script

A single golden path with visible data labels and instant fallbacks is more persuasive than a multitude of half-built features.

### Fallbacks when GeoHub is empty or slow

If the GeoHub returns no results or is slow, teams must have a fallback. Use a known-good demo address and a pre-cached JSON dataset. The application should toggle to "offline mode" seamlessly to ensure the demo does not crash.

### Plain-language status and distance

Replace municipal jargon and acronyms with readable statuses. Distances should be displayed in plain terms (feet/miles) to ensure the tool is accessible to the general public.

## Risks and Mitigations

The primary risks during the hackathon are live data volatility and scope creep.

| Risk Factor | Impact | Mitigation Strategy |
| :--- | :--- | :--- |
| **Volatile CIP Data** | Demo crashes or shows empty results | Pre-bake JSON data; do not rely on live joins during the pitch. |
| **Scope Creep** | Team fails to finish core MVP | Appoint a "scope cop"; ban new features unless an existing one is cut. |
| **Judge Questions** | Team appears unprepared regarding missing features | Prepare two-sentence roadmap answers explaining technical/legal constraints. |

*Key Takeaway:* Anticipate failure points in live systems and judge expectations by caching data and preparing clear, constraint-based answers.

## Benchmarks and Precedents

Successful civic tech projects do one thing exceptionally well. For example, ClearStreets tracked Chicago's snow plows by scraping data from the city's Plow Tracker to answer a single question: where have the plows been? [9] [10] [11]. By focusing on a single data source and a clear user need, ClearStreets provided immense value without overcomplicating the architecture [12].

## Governance, Legal, and Privacy

Teams must not cross legal and privacy red lines. Virginia Code § 18.2-60.5 strictly regulates electronic tracking devices [3]. While fleet owners can track their vehicles, third-party hackathon teams cannot legally or technically access this data [3] [4]. Furthermore, building performance dashboards with driver-level metrics introduces severe privacy and labor relations concerns that are entirely inappropriate for a weekend project.

## Success/Failure Patterns and Scope-Lock Tactics

Publicly declaring what is out of scope is the best defense against failure.

### Over-scoping red flags

Warning signs that a team has over-scoped include building an admin panel on Saturday morning, adding notification features on Sunday, or trying to pull live data from multiple APIs. If any of these occur, the team must trigger a "stop-build" review and revert to the core MVP.

### Kickoff commitments

At the kickoff, teams should publicly commit to their scope matrix. They must assign a scope owner who enforces the rule that any new feature requires cutting something else. When a judge asks about a missing feature, the team should respond: "We scoped that out deliberately because it requires internal access, and here's how we'd add it in a Phase 2 deployment."

## Post-Hackathon Phase 2

Transitioning from a hackathon MVP to a real deployment requires navigating institutional gates.

### Phase 2 gates

Integration, alerts, and multi-agency aggregation require official partner access, Memorandums of Understanding (MOUs), and service accounts. Future phases would require access to DPW's Cityworks or EnerGov systems, data-sharing agreements with VDOT and RRHA, and the establishment of secure authentication and notification infrastructure.

## Appendices

### Facts
* The City of Richmond's CIP Dashboard is currently in a "Beta Version" and data may not be fully up-to-date (https://experience.arcgis.com/experience/86362b12585448b583b74a3a2ae32745) [1].
* Richmond DPW uses the Cityworks CMMS mobile application, deployed to 25 field crews (https://rva.gov/sites/default/files/2025-07/Richmond%20DPW-%20brochure.pdf) [2].
* Virginia Code § 18.2-60.5 prohibits unauthorized electronic tracking, with an exception for fleet owners tracking their own vehicles (https://law.lis.virginia.gov/vacode/title18.2/chapter4/section18.2-60.5/) [3] [4].
* ClearStreets is an open-source application that tracked Chicago snow plows using city data (https://clearstreets.org/) [12] [10].

### Inferences
* **Data Volatility:** Because the CIP dashboard is in beta, live API endpoints are likely unstable, making cached JSON the only safe approach for a weekend demo.
* **Cross-Agency Complexity:** The lack of unified, easily discoverable datasets combining Richmond DPW, VDOT, and RRHA projects implies that multi-agency aggregation requires manual wrangling or formal MOUs, making it impossible for a 48-hour hackathon.
* **Live GPS Access:** Because DPW systems are internal and VA law restricts tracking, hackathon teams have zero viable pathways to access live vehicle telemetry.

### Unknowns
* The exact uptime and rate limits of the Richmond GeoHub FeatureServers during a weekend period.
* Whether Richmond DPW has any public-facing APIs for permit or status feeds planned for the future.
* The specific internal telematics hardware currently installed in Richmond's municipal fleet.

## References

1. *Capital Improvement Program Dashboard*. https://experience.arcgis.com/experience/86362b12585448b583b74a3a2ae32745
2. *BUILDING A BETTER RICHMOND.*. https://rva.gov/sites/default/files/2025-07/Richmond%20DPW-%20brochure.pdf
3. *§ 18.2-60.5. Unauthorized use of electronic tracking device; penalty*. https://law.lis.virginia.gov/vacode/title18.2/chapter4/section18.2-60.5/
4. *Privacy Rights of Employees in Virginia - Pierce Jewett*. https://www.vaemploymentlawyers.com/privacy-rights-of-employees-in-virginia/
5. *Richmond GeoHub*. https://richmond-geo-hub-cor.hub.arcgis.com/
6. *City Boundary | Richmond GeoHub - ArcGIS Online*. https://richmond-geo-hub-cor.hub.arcgis.com/datasets/cor::city-boundary-8/about
7. *Richmond Parcel Map*. https://richmond-geo-hub-cor.hub.arcgis.com/search?tags=parcel
8. *Electronic Tracking Devices in Virginia - Winslow, McCurry & MacCormac, PLLC*. https://wmmlegal.com/electronic-tracking-devices-in-virginia
9. *GitHub - datamade/clearstreets-web: Website that tracks where Chicago plows have been during a snowstorm. · GitHub*. https://github.com/datamade/clearstreets-web
10. *ClearStreets | DataMade*. https://datamade.us/our-work/clearstreets/
11. *clearstreets-web/README.md at master · datamade/clearstreets-web · GitHub*. https://github.com/datamade/clearstreets-web/blob/master/README.md
12. *ClearStreets - Chicago Plow Tracker*. https://clearstreets.org/