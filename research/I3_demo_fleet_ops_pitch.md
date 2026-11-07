> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# Build Now, Calm the Snow-Day Chaos: Richmond's Fleet Visibility Demo That Works Without GPS

## Executive Summary
The most powerful asset for the fleet operations visibility tool is the visceral emotional reality of a Richmond winter: the anxiety of not knowing when a street will be plowed or if a car needs to be moved. While the lack of complete GPS data presents a technical constraint, it is not a barrier to delivering immediate value. By leading with a "snow day" scenario that relies on scheduled and manually updated data, teams can instantly demonstrate public value. 

The strategic approach is to frame the GPS gap as a design choice rather than a shortcoming. By building a data adapter layer, the tool can function today using manual inputs—similar to proven models like Boston's Snow Removal Dashboard—and automatically upgrade to real-time tracking when Richmond's GPS rollout is complete. Disclosing the use of mock data early, confidently, and with clear visual signals builds trust with judges while keeping the focus on the tool's immediate operational and public benefits.

## Problem Context: Residents Need Certainty Now; Ops Scale Strains Coordination
When winter weather hits Richmond, the Department of Public Works (DPW) prioritizes major transportation routes, meaning Priority 3 neighborhood streets (which make up 64% of the city) typically are not reached until 48 to 72 hours after snowfall ends [1]. This delay leaves residents struggling to navigate hazardous, ice-covered streets and wondering when relief will arrive [2]. 

The scale of these operations is massive and strains internal coordination. During recent winter storms, Richmond's DPW deployed 240 field personnel and 60 city-operated trucks to cover approximately 7,400 lane miles [3]. The combination of resident anxiety and high operational overhead creates a dual-sided problem. A clear, conservative status signal—even if manually updated—provides far more value than absent or misleading "real-time" data.

## Demo Narrative Strategy: Lead with "Snow Day," Then Show Supervisor Updates
The demo must immediately hook the audience with the most universal resident moment, then pivot to the operational workflow that keeps the system truthful. 

1. **The "Snow Day" Opener**: Open with a resident waking up to 4 inches of snow, needing to know if they can make an 8 a.m. school drop-off. They enter their address and see: "Scheduled 6 a.m.–10 a.m. Last manual update: Driver 3 completed 60% of zone at 7:42 a.m." This instantly proves the tool's value.
2. **The Supervisor Pivot**: Transition to a DPW supervisor marking a route complete in their interface. The public card updates instantly. This answers the critical question of *how* the data stays fresh without GPS.
3. **The Parking Enforcement Bonus**: If time allows, show a quick street-cleaning check to prove the tool's year-round utility.

### Scenario Prioritization: Emotional Reach vs. Ops Credibility

| Scenario | Emotional Impact (Residents) | Ops Credibility (DPW) | Data Feasibility w/o GPS | Demo Fit (90s) | Recommendation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Snow day (plows) | Very high | Medium | High (schedule + manual) | Excellent | Lead |
| Supervisor management | Medium | Very high | High (manual complete) | Strong | Second |
| Parking enforcement | Medium | Medium | High (schedule/status) | Good | If time |

*Takeaway: Lead with the snow day scenario to capture the judges' empathy, then immediately validate the technical approach with the supervisor management workflow.*

## Data Strategy: "Build Now, Wire GPS Later" with an Adapter Layer
The strongest framing for the demo is proactive: the architecture normalizes schedule and manual inputs today, and swaps in GPS/AVL via configuration tomorrow. 

The system should be designed with an adapter pattern. Currently, data sources include schedules, snow plan routes, and manual supervisor updates. The normalization model translates these into a standard format: `zone -> route -> completion % -> last_update_at -> source`. When judges ask about GPS integration, the team can confidently state that the adapter layer is built to ingest AVL/GPS feeds via configuration; when DPW publishes the feed, the adapter simply points to the new endpoint without requiring a rebuild.

## Mock Data Disclosure: Confident Framing and Clear Visual Tags
Transparent, confident mock-data disclosure builds trust, while apologetic tones erode it. Government design systems, such as GOV.UK, mandate the use of phase banners to show users when a service is still being worked on [4]. However, research indicates that jargon like "beta" can confuse users if not clearly explained [5]. 

Disclose the data strategy in the first 10 seconds of the demo: *"Richmond's GPS rollout is still underway, so this demo uses scheduled and manually updated data—the same inputs we can use today."* 

### Visual Signaling Options

| Option | Clarity | Risk of Alarm | Pros | Cons | Recommendation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Small "DEMO DATA" header tag | High | Low | Always visible; low visual weight | Can be overlooked if too subtle | Use |
| Different status color (non-green) | Medium | Low | Immediate visual cue | Needs legend to avoid confusion | Use |
| Explicit "Data source: Manual" per card | High | Medium | Sets expectations; educates users | More text; small cognitive load | Use on card |
| Full-page "beta" banner | Medium | Medium | Standard gov convention | Jargon; may distract | Avoid in demo |

*Takeaway: Combine a persistent header badge with explicit data source labels on the status cards to balance transparency with a clean user experience.*

## Credibility by Analogy: Position as "Richmond's Snow Stats, Manual-First"
Anchor the judges' mental models in successful tools from other cities, then highlight the intentional, manual-first slice being shipped for Richmond.

| City/Tool | What it shows today | Analogy to Richmond need | Out-of-scope for 48h build | How to reference in demo |
| :--- | :--- | :--- | :--- | :--- |
| Boston Snow Stats | Percentage of streets plowed and miles plowed by neighborhood [6] | Zone/area progress view residents grok | Live AVL ingestion, historical analytics | "Richmond version of Snow Stats, starting manual-first." |
| Chicago Plow Tracker | Real-time locations of city plows and salt spreaders [7] | GPS-powered map is the future state | Live vehicle map + telemetry | "GPS rollout plugs into our adapter, enabling this later." |
| NYC SweepNYC | Tracks the progress of DSNY mechanical brooms [8] | Street cleaning status pattern is proven | Citywide integration + enforcement feeds | "We mirror DSNY's clarity for cleaning days." |

*Takeaway: Reference these established tools to transfer trust, but clearly define the boundaries of the 48-hour build to maintain credibility.*

## UX Scope for a 48-hour Build: Ship the Status Board That Matters
Prioritize the smallest surface area that relieves resident anxiety and reduces supervisor coordination calls. 
* **Features**: Address/zone lookup; a status card showing the time window, last update time, and data source; a supervisor update panel; and an audit trail.
* **Non-goals**: Live GPS maps, predictive ETAs, and multi-lingual support (beyond English) are out of scope for a 48-hour build.
* **Copy Library**: Use conservative, clear statuses like "Scheduled," "In progress," "Completed," and "Paused: icing conditions." Avoid countdowns or exact ETAs.

## Risks and Mitigations: Don't Overpromise; Timestamp Everything
The primary risks are stale manual updates and shifting weather conditions. Claiming "real-time" data with manual inputs will backfire. 
* **Mitigations**: Implement Time-To-Live (TTL) flags that mark a status as "Possibly out of date" if not updated recently. Use explicit timestamps (e.g., "Last manual update 7:42 a.m.") rather than predictive ETAs. 

## Judge Q&A Prep: Pre-Baked Answers
* **"Is this real data?"** -> "Richmond's GPS rollout is still underway, so this demo uses scheduled and manually updated data—the same inputs that would feed the tool today."
* **"What about GPS?"** -> "We built a data adapter layer that ingests AVL/GPS feeds via configuration; when DPW publishes the feed, we point the adapter to the endpoint—no rebuild."
* **"How do drivers update safely?"** -> "Updates are handled via the supervisor console, end-of-block check-ins, or voice/dispatcher input."
* **"How will you keep it current?"** -> "Through shift check-ins, completion gates, and TTL flags that warn users if data is aging."

## Metrics and Impact Hypothesis: Day-One Signals That Matter
Tie the user value to measurable operational impact. For example, Boston's digital snow removal dashboard reduced staff inspection time from 30 hours to 6 hours per storm [9]. 
* **Target KPIs**: 
 1. Percentage of zones with status updates by 8 a.m.
 2. Reduction in supervisor/dispatcher "are you done?" call volume.

## Implementation Plan: 48-Hour Build
* **Day 1**: Define the data model, seed schedules, build the public status card with the address lookup, implement the header badge, and set up logging.
* **Day 2**: Build the supervisor UI, implement the audit history, polish the mobile layout, rehearse the demo script, and finalize the adapter diagram slide.

---

## 90-Second Demo Script

**[0:00 - 0:15] The Hook & Disclosure**
*Presenter*: "It’s 7:00 a.m. after a major Richmond snowstorm. As a resident, I need to know if I can safely drive my kids to school, but Priority 3 neighborhood streets can take 48 to 72 hours to clear. Richmond’s GPS fleet rollout is still underway, so today we are demoing a solution using scheduled and manually updated data—the exact inputs DPW can use tomorrow morning."
*Screen*: Shows a clean, mobile-first landing page with an address search bar. A subtle "DEMO DATA" badge sits in the header.

**[0:15 - 0:40] The Resident Experience**
*Presenter*: "I type in my address. Instead of a blank map or a false ETA, I get immediate, conservative clarity."
*Screen*: User enters an address. A status card appears: *Zone 4 - Scheduled 6:00 a.m. – 10:00 a.m.* Below it, a distinct blue chip reads: *Last manual update: Driver 3 completed 60% of zone at 7:42 a.m.*
*Presenter*: "I now know plows are in my zone, and I can plan my morning. This is Richmond's version of Boston's Snow Stats, built for the reality of manual operations."

**[0:40 - 1:10] The Supervisor Workflow**
*Presenter*: "But how does that data stay fresh without GPS? Let's look at the DPW Supervisor view."
*Screen*: Splits to show a mobile supervisor dashboard. The supervisor taps "Mark Route 4B Complete."
*Presenter*: "A supervisor marks a route complete. Instantly, the public-facing card updates. We've replaced dozens of radio calls asking 'are you done yet?' with a single tap that informs the whole city."
*Screen*: The public card updates to *80% complete* with a new timestamp.

**[1:10 - 1:30] The GPS Future & Close**
*Presenter*: "Because we built this with a data adapter layer, this tool doesn't get thrown away when GPS arrives. It's a simple configuration change to swap manual inputs for live AVL feeds. We are delivering certainty for residents and time-savings for DPW today, with the architecture ready for tomorrow. Thank you."
*Screen*: Shows a simple architecture diagram: *Manual Inputs / Future GPS -> Adapter Layer -> Public Status Board*.

---

## Facts, Inferences, and Unknowns

**Facts:**
* Richmond's Priority 3 neighborhood streets (64% of the city) are typically plowed 48 to 72 hours after snowfall ends [1].
* During recent winter storms, Richmond DPW utilized 240 field personnel and 60 city-operated trucks to cover 7,400 lane miles [3].
* Boston's Snow Stats tool allows residents to enter their address to see the percentage of streets plowed and miles plowed in their neighborhood [6].
* Boston's digital Snow Removal Dashboard for parks reduced staff inspection time from 30 hours to 6 hours per storm [9].
* Chicago's Plow Tracker provides a map showing the real-time locations of city plows and salt spreaders [7].
* NYC's SweepNYC tool allows New Yorkers to track the progress of DSNY mechanical brooms [8].
* GOV.UK design guidelines mandate the use of phase banners (Alpha/Beta) to show users when a service is still being worked on [4].

**Inferences:**
* The anxiety caused by uncertain plow schedules is a significant pain point for Richmond residents, making the "snow day" scenario highly resonant for a demo.
* A manual-update system can effectively bridge the gap and provide public value before a full GPS/AVL fleet tracking system is deployed.
* Using clear, non-apologetic language to disclose mock data builds credibility with technical judges.

**Unknowns:**
* The exact timeline and technical specifications for Richmond DPW's future GPS fleet rollout.
* The specific internal software currently used by Richmond DPW dispatchers to track manual route completions.

## References

1. *Snow Removal | Richmond*. https://www.rva.gov/public-works/snow-removal
2. *Richmond residents waiting: When will the plows come to your street?*. https://www.12onyourside.com/2026/01/26/richmond-residents-waiting-when-will-plows-come-your-street/
3. *After-Action Report*. https://rva.gov/sites/default/files/2026-03/2026.03.09-CAO-WinterWeatherAfterActionReport.pdf
4. *Phase banner – GOV.UK Design System*. https://design-system.service.gov.uk/components/phase-banner/
5. *Why and how we’re explaining ‘beta’ to users – Design in government*. https://designnotes.blog.gov.uk/2014/01/20/why-and-how-were-explaining-beta-to-users/
6. *With Boston 'Snow Stats' Tool, Track Snow Removal In Your Neighborhood In Real Time | WBUR News*. https://www.wbur.org/news/2015/02/02/boston-snow-stats
7. *
    City of Chicago :: Supporting Info Rollup
*. https://www.chicago.gov/city/en/depts/streets/provdrs/street/supp_info.html
8. *SweepNYC*. https://sweepnyc.nyc.gov/
9. *Snow Removal Dashboard | Boston.gov*. https://www.boston.gov/departments/analytics-team/snow-removal-dashboard