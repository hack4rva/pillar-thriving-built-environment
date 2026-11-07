> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.


# From Radios to Real-Time: What DPW Supervisors Need to Run Snow and Street Cleaning at City Scale

## Executive Summary
The role of the Department of Public Works (DPW) Operations Supervisor has fundamentally shifted from radio-dependent dispatching to data-driven fleet orchestration. In major municipalities like New York City and Chicago, GPS and Automated Vehicle Location (AVL) technologies are now the baseline for managing snow and ice control operations [1] [2]. Supervisors must manage 12-hour shifts, coordinate hundreds of routes, and report real-time progress to Emergency Operations Centers (EOCs) and public-facing dashboards [1] [3]. 

Key insights for building digital tools for this persona include:
* **GPS-first operations are the new baseline:** NYC's Department of Sanitation (DSNY) equips all spreading and plowing equipment with GPS, tracked via their BladeRunner 2.0 system across 59 garages [1]. Chicago tracks over 280 snow routes across 9,400 lane-miles using GPS [2].
* **Radio is essential but bandwidth-limited:** DSNY utilizes separate radio channels per borough to expand transmission abilities during events [1]. Pre-GPS, Chicago fleet managers struggled to know where vehicles were deployed versus where snow activity was occurring [4].
* **Public transparency changes the job:** Public dashboards like Chicago's Plow Tracker and NYC's PlowNYC set resident expectations [1] [3]. However, providing good information to the public is often more difficult than simply collecting vehicle data [5].
* **Adoption hinges on transparency and utility:** Privacy concerns from unions and staff can be mitigated by clearly stating that private use remains private, and by allowing employees to access their own tracking records [6] [7].

## Persona and Context — The DPW Ops Supervisor

### Role Snapshot: Snow and Street Cleaning Supervisor
The DPW Operations Supervisor is a shift manager orchestrating people, routes, and equipment under intense time, safety, and public scrutiny constraints. They oversee dozens of operators across complex route networks, balancing the clearance of arterial roads with neighborhood streets, managing equipment readiness, and handling inter-agency requests. In a city like Chicago, this means managing a portion of a 510-vehicle fleet across more than 9,400 lane-miles [2] [4].

### Environment: Command Centers and Garages
Supervisors operate between high-tech command centers, borough or district garages, and in-vehicle check-ins. They rely on systems like DSNY's BladeRunner 2.0, which provides Google map integration, real-time brine progress data, and enhanced GPS tracking [1].

## Day-in-the-Life Workflows

### Snow Event Timeline with Decision Gates
During a snow event, supervisors work 12-hour shifts (e.g., 7 A.M. to 7 P.M.) [1]. The workflow progresses through distinct phases:
1. **Forecast and Preparation:** Monitoring weather, issuing Snow Alerts, and preparing equipment (loading salt, attaching plows) [1].
2. **Salting and Plowing:** Dispatching salt spreaders at the first trace of precipitation, followed by plowing when accumulation exceeds two inches [1].
3. **Situational Awareness:** Monitoring operations via GPS and radio, and coordinating with the EOC [1].
4. **Piling and Hauling:** Transitioning to snow removal and melting operations as accumulations reach 6 to 8 inches [1].

### Street Cleaning Cycle Post-Storm
After roadways are serviced and temperatures rise, the focus shifts to clearing snow from street cleaning routes. Alternate side parking regulations are reinstated, and supervisors deploy front-end loaders, plows, and sweepers to clear curbs [1].

| Phase | Objective | Top Signals | Key Risks |
| :--- | :--- | :--- | :--- |
| **Prepare** | Ready fleet and staff | Weather forecasts, inventory levels | Equipment failure, understaffing |
| **Deploy** | Treat arterials first | GPS breadcrumbs, radio check-ins | Traffic bottlenecks, accidents |
| **Monitor** | Ensure route completion | AVL dashboards, 311 complaints | Missed streets, radio congestion |
| **Clearbacks** | Haul snow, clear curbs | Melter capacity, skid-steer status | Blocked catch basins, public complaints |

*Takeaway: Supervisors need phase-specific dashboard views that transition from deployment metrics to completion and exception tracking.*

## Urgent Information Needs and Current Channels

### What They Need in 90 Seconds
Supervisors urgently need to know: which routes are overdue, where equipment is broken down, the status of salt/brine stockpiles, and where 311 complaints are clustering. DSNY uses 311 Rapid Service Requests to map locations of concern during operations to provide awareness to field personnel [1].

### How They Get It Today
Supervisors rely on a mix of AVL dashboards, two-way radios, and phone calls. Chicago utilizes a 30-second GPS refresh rate to accurately track vehicle paths through dense city blocks, ensuring plows aren't just sitting idle [4].

## Pain Points of Manual and Radio-Based Tracking

### Evidence of Failure Modes
Manual and radio-based tracking fail at scale. Before implementing high-speed wireless GPS, Chicago fleet managers "wouldn't have any idea of where a vehicle was deployed, versus where the snow activity was going on" [4]. Furthermore, radio channels become congested, forcing agencies like DSNY to separate channels by borough [1].

### Actionable Fixes
Transitioning to AVL systems allows for automated proof-of-service. By tracking breadcrumb density and plow blade/spreader status, supervisors can verify curb-to-curb completion without relying on radio chatter [5].

## Status Reporting to Leadership, EOC, and PIO

### EOC/WebEOC Alignment
During winter weather events, agencies assign personnel to the city's Emergency Operations Center (EOC) for the duration of the activation to coordinate interagency needs [1]. 

### Public Dashboards and 311 Expectations
Public-facing tools like Chicago's Plow Tracker and NYC's PlowNYC (which updates every 15 minutes) shape resident expectations [1] [3]. Supervisors must ensure the data feeding these maps is accurate to prevent public misunderstanding.

## What Supervisors Would Use vs. Ignore

### Must-Haves
Supervisors will use tools that accelerate triage: route exception lists, last-pass heatmaps, equipment down alerts, and one-tap situation reports. They need to see exactly what route a vehicle followed to confirm snow was removed [4].

### Nice-to-Haves that Become Noise
Supervisors will ignore overly complex filters, raw high-frequency telemetry without aggregated rollups, and non-actionable public layers.

| Feature | Decision Accelerated | Build Priority |
| :--- | :--- | :--- |
| **Last-Pass Heatmap** | Identifying missed street segments | High |
| **Equipment Down Alerts** | Reassigning routes to active trucks | High |
| **Material Burn Rate** | Directing trucks to reload salt | Medium |
| **Raw GPS Ping Log** | None (too much noise) | Low |

*Takeaway: Focus on exception-based reporting rather than raw data visualization.*

## Technical Literacy and Usability Constraints

### Training and Concurrency at Scale
Digital tools must support high concurrency and be easy to learn. DSNY trained thousands of Superintendents to use their cloud-based BladeRunner 2.0 system, ensuring it was available across all 59 garages [1].

### UX Constraints
*(Inference)* Field supervisors operate in harsh conditions. Interfaces must feature large hit targets for gloved hands, minimal typing requirements, and offline tolerance for areas with poor cellular connectivity.

## Adoption Barriers and Change Management

### Known Challenges
Adoption barriers include user acceptance, perceived accuracy of the technology, and privacy concerns regarding GPS tracking [5] [7]. Employees often worry about being tracked outside of work hours [7].

### Mitigations
To overcome resistance, agencies must establish clear policies. Smartrak notes that stating "private use is private" and limiting tracking to work hours helps alleviate concerns [7]. Timeero highlights that allowing employees to view their own records (work hours, routes, mileage) fosters transparency and makes GPS feel like a shared system rather than surveillance [6].

## Design Implications for a Supervisor Dashboard

### Information Architecture
The dashboard should feature a mode switcher (Salting, Plowing, Hauling, Sweeping), a district selector, an exception queue (e.g., missed streets), and a map displaying last-pass timestamps.

### Decision Widgets
Include widgets for overdue segments, equipment out-of-service, material stock vs. burn rate, and an overlay of 311 hotspot complaints.

## KPIs, Data, and Integration Requirements

### Core KPIs
Key performance indicators include percentage of route coverage, lane-miles serviced, and material applied. AVL/GPS systems can be integrated with spreader controllers and plow blades to provide reports on plow usage and material applied [5].

| Data Element | Source | Use in Decisions |
| :--- | :--- | :--- |
| **Vehicle Location** | GPS/AVL | Route coverage verification |
| **Blade/Spreader Status** | Truck Controllers | Confirming active snow removal/salting |
| **Public Complaints** | 311 System | Identifying missed areas or ice patches |

*Takeaway: Integrating controller data with GPS provides the complete picture of operational effectiveness.*

## Case Studies: Successes and Cautions

### Chicago GPS Rollout
Chicago successfully deployed a wireless GPS solution to track its 510 snow removal vehicles. By customizing the system for a 30-second refresh rate, fleet managers could see exact paths and U-turns in dense city blocks, improving route planning and vehicle utilization [4].

### Clear Roads Lesson
A Clear Roads study noted that while collecting data from vehicles is relatively easy, providing good, understandable information to the general public remains a significant challenge [5].

## Implementation Roadmap and Pilot Plan

### 90-Day Pilot
Start with a pilot of 10-20 vehicles across different route types. Integrate spreader controllers, define core KPIs, and measure ROI through optimized material application and improved route times.

### Scale and Governance
Develop a labor-inclusive data policy that addresses privacy concerns, create a comprehensive training plan, and establish standard operating procedures for EOC reporting.

## Risks and Mitigations

| Risk | Mitigation | Owner |
| :--- | :--- | :--- |
| **Union Resistance to GPS** | Allow employee access to own data; restrict to work hours | HR / Operations |
| **Public Misinterpretation of Maps** | Use clear legends (e.g., "Last Serviced" vs "Clear") | PIO / Comms |
| **System Overload during Storms** | Utilize cloud-based infrastructure for high concurrency | IT Department |

*Takeaway: Proactive policy and communication are as important as the technology itself.*

## Appendices: Facts and Sources

### Facts (with source titles)
* **NYC DSNY Scale:** DSNY manages over 19,000 lane-miles and approximately 1,500 snow-plowing routes. They utilize BladeRunner 2.0 for GPS tracking and PlowNYC for public updates every 15 minutes. (*The City of New York Department of Sanitation 2024 Snow Plan*) [1].
* **Chicago Scale:** Chicago maintains over 9,400 lane-miles and over 280 snow routes. They track 510 snow removal vehicles using a 30-second GPS refresh rate. (*City of Chicago :: Winter Snow Clearing*; *Chicago Uses GPS to Track Snow Removal | Government Fleet*) [2] [4].
* **Data Integration:** AVL/GPS systems can integrate with spreader controllers and plow blades to report on material applied and plow usage. (*Utilization of AVL/GPS Technology: Case Studies*) [5].
* **Privacy Mitigation:** Allowing employees to access their own GPS records increases transparency and acceptance. (*Do Privacy Concerns Actually Kill GPS Adoption? Data Says No.*) [6].

### Inferences (clearly labeled)
* *(Inference)* **UX Constraints:** Because supervisors operate in field conditions and garages, digital tools must be designed with large buttons for gloved hands and must tolerate intermittent offline states.
* *(Inference)* **Street Sweeping Generalization:** While snow operations are heavily documented, street sweeping operations follow similar spatial and routing constraints, meaning AVL tools designed for snow can be toggled for sweeping cycles once alternate-side parking resumes.

## References

1. *Borough Snow Plan*. https://www.nyc.gov/assets/dsny/downloads/what-we-do/snow-response/snow-planning/2024-25/snow-plan-manhattan-2024-2025.pdf
2. *City of Chicago :: Winter Snow Clearing*. https://www.chicago.gov/city/en/depts/streets/provdrs/street/svcs/snow_clearing.html
3. *City of Chicago :: Supporting Info Rollup*. https://www.chicago.gov/city/en/depts/streets/provdrs/street/supp_info.html
4. *Chicago Uses GPS to Track Snow Removal | Government Fleet*. https://www.government-fleet.com/articles/chicago-uses-gps-to-track-snow-removal
5. *Utilization of AVL/GPS Technology: Case Studies*. https://rosap.ntl.bts.gov/view/dot/66923/dot_66923_DS1.pdf
6. *Do Privacy Concerns Actually Kill GPS Adoption? Data Says No.*. https://timeero.com/post/employee-privacy-and-gps-tracking
7. *Navigating Privacy Concerns when Implementing Telematics*. https://smartrak.com/fleet-telematics-privacy-concerns/