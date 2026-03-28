> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# Closing the Blind Spot: Making Snow Ops Visible Before AVL Is Fully Deployed

## Executive Summary

For mid-size city Department of Public Works (DPW) agencies, managing snow removal without comprehensive Automatic Vehicle Location (AVL) technology creates significant operational blind spots. Cities traditionally rely on manual tracking—radio check-ins, paper route logs, and status boards—to monitor storm response. However, this manual reporting quietly taxes capacity, consuming dispatcher time and delaying supervisor decision-making. 

In Richmond, Virginia, where GPS installation is currently in progress but not complete, the DPW faces the challenge of managing 75 trucks across 1,800 lane miles during 12-hour shifts. Without real-time visibility, exception management—such as redeploying trucks for breakdowns or prioritizing emergency routes—becomes sluggish and ad hoc. Furthermore, the disconnect between operations and communications leads to resident frustration, as public updates lack granular, street-level accuracy. 

This report outlines how Richmond can bridge the gap between manual operations and full AVL deployment. By implementing a hybrid tracking workflow, establishing a minimum viable data specification focused on "last serviced" timeframes rather than vehicle dots, and learning from the failure patterns of other municipalities, Richmond can improve storm agility, reduce resident call volumes, and build public trust while the GPS rollout completes.

## Why This Matters Now — Partial AVL Leaves Supervisors Flying Semi-Blind

Richmond’s GPS rollout is mid-flight, meaning supervisors are currently operating with fragmented visibility. A lightweight manual-plus-hybrid approach can deliver actionable visibility and better public updates this season.

### Richmond’s Current Constraints: 75 Trucks, 1,800 Lane-Miles, P1/P2 Priorities

**Fact (Why Richmond says it's taking longer to clear snow and ice off city streets):** The City of Richmond utilizes approximately 240 employees and 75 trucks to treat and plow roughly 1,800 lane miles of roadway, operating in 12-hour shifts day and night [1]. 
**Fact (Why Richmond says it's taking longer to clear snow and ice off city streets):** Richmond prioritizes clearing Priority 1 (P1) and Priority 2 (P2) routes across specific geographic areas (Northside, Southside, Downtown/Fan/Museum District, East End) before moving into residential neighborhoods [1].

The sheer volume of this storm workload and the strict route hierarchy demand fast redeployments that manual-only methods struggle to support. When a truck breaks down or a specific P1 corridor requires additional passes due to heavy accumulation, supervisors need immediate visibility to shift resources.

### The Window of Opportunity: Prove Value, De-Risk AVL, Cut Calls

**Inference:** Because Richmond is currently in a transitional phase with its fleet technology, establishing a minimum viable visibility layer now will reduce supervisor guesswork and resident friction while hardware installations complete. By standardizing how route completion is recorded—even manually—the city can seamlessly transition these data feeds to automated AVL inputs as trucks come online.

## How Cities Track Without GPS — The Real Manual Playbook

Standard practice in the absence of GPS blends radio or phone check-ins, physical route cards, and whiteboards or spreadsheets to mark the "last pass" of a plow. 

### Documented Practices: Logs, Shift-End Tickets, Supervisor Boards

**Fact (Standard Operating Procedures for Winter Road Maintenance):** The Alaska Department of Transportation requires operators to accurately record material use at the end of their shift using daily salt/sand use tickets and mandates documenting and charting to measure operational effectiveness [2].
**Fact (SNOW OPERATION PLAN (SOP)...):** The Town of Coventry, Rhode Island, requires operators to keep individual and equipment time sheets up to date and immediately report any accidents to supervisors via radio or phone [3].
**Fact (FINAL REPORT LESSONS LEARNED FROM A PILOT...):** During a Virginia Department of Transportation (VDOT) pilot in the Northern Virginia (NOVA) District, complex in-cab AVL messaging proved unfeasible for contract drivers, leading the agency to abandon it and revert to traditional radio communications [4].

### What "Good Manual" Looks Like Under Pressure

**Inference:** Under the pressure of a severe winter event, a 30-to-60 minute communication "heartbeat," combined with physical route cards and a single-source-of-truth status board, is the minimum requirement to drive effective deployment decisions. Relying solely on end-of-shift paper tickets leaves supervisors blind during the critical active phases of the storm.

### Failure Watch-Outs From Others

Complexity kills adoption in the cab. **Fact (FINAL REPORT LESSONS LEARNED FROM A PILOT...):** The harsh winter environment and repetitive install/remove operations for portable AVL units in the VDOT pilot resulted in a 5% to 10% failure rate per storm due to wire breaks, display screen fractures, and disconnected plugs [4]. **Inference:** Richmond must keep manual inputs minimal and ensure any interim or permanent hardware is robustly hard-mounted.

## The Cost of Manual Reporting — Hidden Drag on Storm Throughput

Manual reporting quietly taxes operational capacity. Post-AVL agencies report significant reductions in routine paperwork time, allowing Richmond to baseline its current burden and harvest quick wins.

### Evidence-Backed Savings and ROI Ranges

**Fact (Expanded Use of AVL/GPS Technology):** A Clear Roads study found that AVL implementation yields a moderate estimate of 15% time savings in routine paperwork, resulting in $67,908 to $101,862 in savings per year, alongside 5% to 20% savings from more efficient fleet management [5].
**Fact (Vehicle-Based Technologies for Winter Maintenance):** The City of Aurora, Colorado, estimated that tracking capabilities from their AVL system reduced treatment costs by 15%, improved sweeper productivity by 12%, and allowed them to cut chemical application rates in half, saving over $200,000 in a single winter [6].
**Fact (Vehicle-Based Technologies for Winter Maintenance):** Vaughan, Ontario, found that AVL implementation resulted in a reduction in paper timesheets and progress reports, alongside a significant decrease in resident complaints [6].

### Richmond-Sized Estimate: Scenarios and Staffing

**Inference:** If each of Richmond's 75 active trucks checks in via radio every 45 minutes, and each exchange consumes 60 to 90 seconds of airtime and data entry, a dispatcher spends roughly 1 to 1.5 staff-hours per clock hour simply logging locations. This creates a severe bottleneck during peak storm intensity. To offload this, Richmond should pilot scripted check-ins and assign a dedicated dispatcher "scribe" to maintain the status board.

### AVL OPEX Context

**Fact (Weather-Savvy Roads Benefits and Costs):** The Michigan DOT reported that communications costs for their winter vehicles averaged $110 per month per vehicle, including cellular charges [7]. 
**Inference:** For Richmond’s 75 trucks, the operational expenditure for full AVL communications would be approximately $8,250 per month. This cost is highly likely to be offset by the labor savings from reduced manual paperwork and the material savings from optimized routing.

## Decision-Making Without Visibility — What Supervisors Miss

Lack of route completion data forces conservative, slower redeployments. Reliable "last pass" timestamps are the minimum fix required to optimize fleet movement.

### Lessons From VDOT and Exception-Led Ops

**Fact (FINAL REPORT LESSONS LEARNED FROM A PILOT...):** During the VDOT NOVA pilot, the failure of the AVL system to supply real-time location and activity information on a regular basis undermined the confidence of field personnel, resulting in little reliance on the system for management decision-making [4].
**Fact (Optimizing Winter Maintenance Operations with Stacked...):** Modern winter operation management requires exception management capabilities—such as event cancellation, prioritizing tasks, and transferring routes to other drivers—which rely entirely on real-time data collection and management portals [8].

### Interim Fix: Age-Bucketed Coverage by Zone/Priority

**Inference:** Even if fed by manual radio updates, creating age buckets for route coverage (e.g., serviced <1 hour ago, 1–3 hours ago, >3 hours ago) per P1/P2 corridor enables targeted redeployments. This prevents supervisors from over-treating recently plowed roads while neglecting areas that have been buried under new snowfall.

## From Ops to Public Trust — What to Show, What to Hide

Showing "last serviced" timeframes by street or route reduces 311 calls and resident anxiety far better than displaying raw vehicle locations.

### Comparison of Public Trackers

Street and route status beats vehicle dots for clarity. Vehicle dots often have coverage gaps that invite resident confusion.

| Jurisdiction | Primary Public Data | Update Behavior | Noted Caveats | Strategic Implication |
| :--- | :--- | :--- | :--- | :--- |
| **NYC PlowNYC** | Last plowed by street (time windows) | User refresh; backend updates ~30 min | Focuses on service delivery, not vehicle tracking [9] | Sets clear expectations by showing service age rather than truck locations. |
| **Chicago** | Route status | Near real-time | Avoids exposing specific vehicle IDs [10] | Provides simple, route-centric clarity for residents. |
| **VDOT Plows** | Vehicle dots and trails | ~2 minutes | Warns that not all plows may show up due to tech/cell coverage [11] | Dots invite "why is my street not on the map?" confusion when hardware drops offline. |

**Inference:** For Richmond's minimum viable product (MVP), the city should publish street or route "last serviced" statuses rather than vehicle dots. This masks the fact that not all 75 trucks have active GPS yet, while still providing the exact information residents actually want: when their road was cleared.

### Howard County’s Call Reduction and Emergency Support

**Fact (Vehicle-Based Technologies for Winter Maintenance):** In Howard County, Maryland, making real-time road condition information available to the public via a website decreased call volume to the Bureau of Highways and allowed 911 dispatchers to route emergency vehicles based on cleared paths [6].
**Fact (Vehicle-Based Technologies for Winter Maintenance):** Vaughan, Ontario, previously received about 400 calls per hour during winter maintenance; providing a public website with a "cookie trail" of plow locations significantly decreased these complaints [6].

## Minimum Viable Data Spec — What Richmond Needs to Publish and Operate Now

A lean schema centered on route/segment last-pass timestamps, status, and zone rollups is sufficient to run operations and inform the public.

### Data Entities and Fields

To build a useful fleet status tool without full AVL, Richmond should adopt the following minimum viable data specification:

* **Segment:** `segment_id`, `geometry` (polyline), `route_id`, `priority_level` (P1/P2), `zone_id` (e.g., Northside, Southside).
* **Pass (Service Event):** `segment_id`, `last_pass_time` (ISO 8601 timestamp), `action_type` (plow, salt, sand), `source` (AVL, radio, mobile form), `confidence_score` (High/Med/Low).
* **Zone Summary:** `zone_id`, `pct_segments_passed_<1hr`, `pct_segments_passed_1-3hr`, `last_updated`.
* **Event:** `event_id`, `declared_start`, `declared_end`, `active_policy` (e.g., "P1 Only").

### Update Cadence and Roles

**Inference:** The public-facing map should refresh hourly to manage expectations and server load. Internally, the dispatcher-scribe should update the status board every 30 to 60 minutes based on radio check-ins, while AVL-equipped trucks will auto-update the database seamlessly.

### Privacy and Reliability Guardrails

**Inference:** The public data feed must strip out all `operator_id` and specific vehicle locations. The UI should include a clear disclaimer (similar to NYC's PlowNYC) stating that data represents approximate service windows and that severe weather may cause reporting delays.

## Richmond Implementation — Hybrid Workflow for Partial AVL

Richmond must blend automated AVL feeds with structured manual inputs into a single dashboard, aligned to their existing P1/P2 routes and five city geographies.

### Immediate 30-Day Playbook

1. **Stand up a Storm Board:** Create a centralized digital spreadsheet or lightweight mapping dashboard tracking the P1/P2 routes across Richmond's defined zones (Northside, Southside, Downtown/Fan, East End).
2. **Deploy Mobile Route-Complete Forms:** For trucks without AVL, provide operators (or their supervisors) with a simple, one-click mobile form to submit a timestamp when a specific route segment is completed.
3. **Define the Scribe Role:** Assign a dedicated "system monitor" per shift whose sole job is to ingest radio calls and mobile form submissions into the Storm Board.
4. **Publish Age Buckets:** Launch a basic public page showing P1/P2 routes color-coded by "last serviced" age buckets.

### 60–120 Day Enhancements

**Inference:** Richmond should front-load AVL installations on the top 20% of trucks that cover 80% of the Priority 1 mileage. Connecting spreader controllers to the AVL units first will capture immediate material accountability and chemical savings, mirroring the success seen in Aurora, CO. Once data matures, the map can be integrated directly into `rva.gov` with street-segment granularity.

### Staffing, Training, and Equipment

**Fact (FINAL REPORT LESSONS LEARNED FROM A PILOT...):** Effective use of the AVL system in the VDOT pilot required full-time attention during active snow removal, dictating that the system monitor be a dedicated position without other administrative duties [4].
**Inference:** Richmond must assign a dedicated system monitor per shift. Furthermore, hardware must be hard-mounted to avoid the 5-10% failure rates seen with portable units, and operators should receive 2-4 hours of pre-season training on the hybrid reporting workflow.

## Risks, Failure Cases, and Mitigations

Avoid complexity in the cab, expect sensor dropouts, and take ownership of system monitoring.

### Known Pitfalls and Countermeasures

**Fact (PILOT TEST OF AUTOMATIC VEHICLE LOCATION ON...):** Waukesha, Wisconsin, stopped their AVL test project and removed the equipment after experiencing server problems and slow polling speeds [12].
**Fact (FINAL REPORT LESSONS LEARNED FROM A PILOT...):** VDOT's system slowed down and became unusable after an hour of data collection because plotting data at two-second intervals accumulated too much volume [4].
**Inference:** Richmond must mitigate these risks by setting reasonable polling intervals (e.g., 1 to 5 minutes, not seconds) and avoiding complex two-way messaging interfaces that distract drivers.

### Communications Gaps Plan

**Fact (PILOT TEST OF AUTOMATIC VEHICLE LOCATION ON...):** Agencies using cellular AVL systems ensure that data is stored locally in the truck's electronics if the system loses communication with headquarters; when the signal is restored, the stored data is transmitted [12].
**Inference:** Richmond's procurement must require in-vehicle units with store-and-forward caching capabilities to handle cellular dead zones. Manual updates should be flagged with a "low confidence" indicator if they are delayed by more than an hour.

## Metrics, Unknowns, and Validation Plan

To ensure the hybrid rollout is successful, Richmond must instrument the deployment and measure specific operational metrics.

### Unknowns to Resolve

To finalize the transition strategy, Richmond DPW must resolve the following **Unknowns**:
* The exact current radio/phone time-load per dispatcher during a Level 1 snow event.
* The specific timeline and vendor schedule for outfitting the remaining non-GPS trucks.
* The operator acceptance rate of mobile form submissions versus traditional radio calls.
* The specific cellular coverage dead zones within Richmond's city limits that will force AVL units into store-and-forward mode.

### 2-Storm Validation Protocol

**Inference:** Richmond should conduct an A/B test during the first two winter weather events. Zone A (e.g., Northside) should operate using the new hybrid Storm Board and dedicated scribe, while Zone B (e.g., Southside) operates under the legacy manual status quo. DPW leadership should then measure P1 time-to-coverage, 311 complaint rates, and supervisor time-on-radio to validate the ROI of the new visibility tools.

## References

1. *Why Richmond says it's taking longer to clear snow and ice off city streets*. https://www.wtvr.com/news/local-news/richmond-snow-plow-update-jan-26-2026
2. *Standard Operating Procedures for Winter Road ...*. https://dot.alaska.gov/stwdmno/documents/MnO_CR_Winter_Maintenance_Manual.pdf
3. *SNOW OPERATION PLAN (SOP) ...*. https://coventryri.gov/sites/coventryri.gov/files/attachments/SNOW%20OPERATION%20PLAN%202017.pdf
4. *FINAL REPORT LESSONS LEARNED FROM A PILOT ...*. https://rosap.ntl.bts.gov/view/dot/19546/dot_19546_DS1.pdf
5. *Expanded Use of AVL/GPS Technology*. https://rosap.ntl.bts.gov/view/dot/67416/dot_67416_DS1.pdf
6. *Vehicle-Based Technologies for Winter Maintenance*. https://transportation.org/winter-weather-management/wp-content/uploads/sites/50/2023/03/NCHRP-20-7200_Vehicle-Based_Winter_Technologies_2006-1.pdf
7. *Weather-Savvy Roads Benefits and Costs*. https://ops.fhwa.dot.gov/publications/fhwahop18032/index.htm
8. *Optimizing Winter Maintenance Operations with Stacked ...*. https://quetica.com/wp-content/uploads/2022/03/IP0265-Xie-E-Full-v1.1.pdf
9. *PlowNYC Mapping Application*. http://maps.nyc.gov/doitt/webmap-conf/docs/PlowNYC_UserGuide2.pdf
10. *Route Status | Plow Tracker*. https://plow-tracker-chicago.hub.arcgis.com/maps/chicago::route-status/about
11. *How to track VDOT snow plows*. https://www.wtvr.com/news/local-news/track-vdot-snow-plows-jan-26-2026
12. *PILOT TEST OF AUTOMATIC VEHICLE LOCATION ON ...*. https://westerntransportationinstitute.org/wp-content/uploads/2016/08/4W0390_Tech_Memo.pdf