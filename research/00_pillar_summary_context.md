# From Patchwork to Clarity: Richmond Project & Fleet Visibility

## Executive Summary

Richmond residents currently face a fragmented landscape when trying to understand how public works and infrastructure projects impact their daily lives. While a single "source of truth" exists in the form of the City's Capital Project Dashboard [1], the information is highly technical and disconnected from neighborhood-level realities. Residents want to know "when and how it affects me," not just "what it is." 

Simultaneously, fleet operations for street cleaning and snow removal lack real-time public visibility. While GPS devices are being installed on the fleet, the infrastructure remains incomplete as of March 2026. However, robust schedule and priority data already exist. For example, the Department of Public Works (DPW) has clearly defined snow removal priorities covering 100% of the city's lane miles [2], and street sweeping polygons are available through the Open Data Portal [3]. 

The strategic path forward for the Richmond Civic Hackathon is to build a resident-centric "front door" that recombines existing public assets—the City dashboard, DPW pages, Open Data, and VDOT summaries—into plain-language, address-specific alerts. By utilizing mock fleet views with strict labeling and focusing on schedule communication rather than live tracking, we can deliver immediate clarity to residents without requiring complex internal system integrations.

## Mission and Constraints — Deliver resident clarity now without new integrations

We can ship a resident-facing "front door" using existing public data, with mock fleet views and strict labeling. No DPW system integrations are required to achieve a massive leap in public transparency.

### What We Will and Won't Do

**Do:**
* Aggregate the City Capital Project Dashboard, DPW pages, Open Data, and VDOT updates into a single interface.
* Generate plain-language summaries of technical project descriptions.
* Implement an address-to-project lookup feature.
* Launch notification pilots based on published schedules and priority tiers.

**Don't:**
* Integrate with DPW internal project management systems (strictly out of scope).
* Claim live fleet locations (GPS data is unavailable; synthetic data must be used).
* Set official timelines (all timelines must be clearly labeled as estimates or sourced directly from official records).
* Introduce Sustainability Design Standards (out of scope for this hackathon).

## Data Foundations — What's reliable now vs. where to mock

Project data is strong and reliable, while operations data supports schedules and priorities but not real-time completion. The solution must be designed to accommodate these realities.

### Data Source Fitness and Gaps

| Source Title | What it Covers | Update Cadence | Format/Access | Strengths | Known Gaps |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **City Capital Project Dashboard** | Funded, active, and completed city projects | Quarterly | ArcGIS Dashboard | Single centralized source across all city departments [1] | Not real-time; specific details live on separate DPW pages [1] |
| **Paving (PCI map, FY lists)** | Pavement Condition Index, paving windows | Annual cycle; map updates post-completion | ArcGIS + PDFs | Clear seasonality (April-Nov); map for status tracking [4] | Technical jargon; limited resident "impact" translation [4] |
| **StreetSweeping Dataset** | 15 sweeping areas | Metadata updated April 2024 | Socrata (GeoJSON/OData) | Area-level schedule fields [3] | Coarse granularity; original data from 2014; no completion tracking [3] |
| **Snow Removal Page/PDF** | Priority tiers, rules, responsibilities | Seasonal as needed | Web page + PDF | Clear priorities and ETAs [2] | No live progress; no 311 requests accepted [2] |
| **VDOT 2025 Update** | Regional mega-projects, performance metrics | Annual | PDF summary | Credible, comprehensive delivery metrics [5] | Not Richmond-only; project specifics are dispersed [5] |

**Takeaways:** The Capital Project Dashboard and VDOT updates provide a solid foundation for project visibility, but require translation for the average resident. Fleet operations data (sweeping and snow) is sufficient for setting expectations but cannot support live tracking without AVL integration.

## Resident Project Discoverability — Make "what's happening on my block?" effortless

The current project discovery process is hampered by jargon and page sprawl. We must use the Capital Project Dashboard as a spine, enriching it with DPW and VDOT context using plain language.

### Address-to-Project Lookup Actions
* **City Projects:** Return active projects within a 0.5–1.0 mile radius of the user's address, pulling directly from the Capital Project Dashboard [1].
* **VDOT Projects:** Highlight state-managed projects overlapping likely travel corridors, utilizing data from the 2025 VDOT Richmond District Transportation Update [5].
* **Neighborhood Services:** Display the next paving/sweeping window and the specific snow priority tier for the address [2] [3].

### Project Card Enhancements
* Translate technical scopes into a "What's happening, in 2 sentences" summary.
* Include a "Why it matters here" section, highlighting detour and impact information.
* Add a "Who maintains this facility?" badge to clearly delineate City versus VDOT responsibilities.
* Timestamp every claim with a "last updated" marker and link directly to official pages.

## Paving & PCI — Convert ratings into resident-ready expectations

The City of Richmond's DPW implements its paving program annually from April through November, utilizing a Pavement Condition Index (PCI) Rating to prioritize work [4]. While the interactive map is useful, it must be translated into understandable, scheduled impacts per block.

### Paving Communication Actions
* Map the PCI ratings and Fiscal Year 2025/2026 paving lists to street segments adjacent to the user's address [4].
* Display the expected monthly window for paving, prominently labeled as "subject to change."
* Provide a day-of checklist for residents: parking restrictions, noise expectations, access considerations, contact info, and alternative parking tips.

## Street Cleaning & Sweeping — Schedule-first now; completion later

The Open Data Portal contains a StreetSweeping dataset with 15 defined areas [3]. While the metadata was updated in April 2024, the original data dates back to October 2014 [3]. This dataset supports schedule notifications but lacks completion data.

### Sweeping Notification Actions
* Implement an area-level schedule lookup by address, triggering push notifications 48 hours prior to scheduled sweeping.
* Build a resident confirmation flow: "Did your street get swept? Yes/No," allowing photo uploads to crowd-validate performance until AVL is live.
* Integrate cancellation logic reflecting DPW policy (e.g., rain and snow cancellations) with automated reschedule notices.

## Winter Operations — Priority-based expectation manager

Snow removal in Richmond follows a strict priority order to keep critical thoroughfares open. The City does not take individual snow removal requests through 311 [2]. We must communicate these priorities and likely windows to manage expectations.

### Snow Priority Communication Actions
* Show a neighborhood's priority tier and "typical window" based on DPW guidelines [2]:
 * **Priority 1 (700 lane miles, 28% of city):** Major arterials and bridges; goal is bare pavement as soon as possible [2].
 * **Priority 2 (200 lane miles, 8% of city):** Connector streets; goal is bare pavement within 24 hours post-event [2].
 * **Priority 3 (1,600 lane miles, 64% of city):** Local neighborhoods; typically reached 48 to 72 hours after snowfall ends [2].
* Publish an "Expectations & Safety" panel explaining why plowing is ineffective for less than 2 inches of snow, why salt requires temperatures above 20 degrees, and reminding residents that sidewalks must be cleared within 6 hours of snow stopping (or by 11 a.m. the next day) [2].
* Link to the emergency route list and towing instructions (Siebert's Towing) [2].

## Cross-Jurisdiction Impacts — Integrate VDOT mega-projects

Big disruptions often stem from VDOT projects, not just City initiatives. It is essential to contextualize their timelines for City residents to reduce confusion regarding responsibility and detours.

### VDOT Integration Actions
* Auto-include major VDOT projects within common commute radii. Key projects from the 2025 update include:
 * **I-64 Gap Widening:** A $750 million project widening 29 miles from four to six lanes, with segments completing between 2027 and 2029 [5].
 * **Fall Line Trail:** The northern 5-mile segment was completed in September 2025 ($11.1 million), while the southern 10-mile design-build segment in Chesterfield County is estimated for Fall 2028 completion ($63.2 million) [5].
 * **Mayo Bridge Replacement:** A $190 million project currently in design to replace the historic 1913 structures connecting Mayo Island to the north and south banks of the James River [5].
 * **Commerce Road Widening:** A $27.4 million locally administered project estimated for Fall 2025 completion [5].
* Provide a "Local impact summary" for each project detailing detours, peak-time slowdowns, bike/pedestrian changes, and estimated completion windows.

## Mock-to-Real Data Plan — Design for AVL now, swap later

To demonstrate capabilities without violating constraints, we must use synthetic data while keeping the architecture ready for future GPS feeds.

### Synthetic Data Actions
* Show route completion "thermometers" for sweeping and snow based on schedule and priority logic, avoiding the use of live vehicle icons.
* Develop an "AVL-ready" data adapter spec including fields for `vehicle_id`, `route_id`, `position`, `timestamp`, and `completion_flag`.
* Implement a synthetic data toggle with explicit labels and a timestamped "Demo mode" indicator.

## Governance & Partnerships — Fast path to adoption and trust

Leveraging named champions and nonprofit partners is critical for co-designing language, reaching underserved areas, and validating the tool.

### Partnership Actions
* Convene champions Al Wiggins (DCAO Operations) and Daniel Klein, alongside nonprofit partners Nathan Burrell (Groundwork RVA), Justin Doyle/Shannon Orcutt (James River Association), and Richard Hankins (Partnership for Smarter Growth) for monthly reviews.
* Establish a public changelog and a plain-language glossary.
* Conduct resident testing in three distinct neighborhoods to ensure accessibility and comprehension.

## Risk, Compliance, and Labeling — Preserve credibility

Every timeline, map, and statistic must be sourced, dated, and scope-labeled to maintain public trust and avoid setting false expectations.

### Labeling Actions
* Ensure visible "Data source" and "Last updated" tags on all project cards.
* Utilize "Official vs. Estimated" badges for all timelines.
* Display prominent disclaimers stating that there is no DPW PM integration, sustainability standards are out of scope, and GPS feeds are not yet available.
* Mirror high-level VDOT performance indicators to build trust, such as their reported 92% on-time award rate (47 of 51 projects) and 84% on-time construction rate (59 of 70 projects) for FY25 [5].

## Success Metrics & 30-60-90 Day Roadmap

We will measure success by faster resident answers and fewer duplicate 311 calls, iterating by neighborhood.

### Key Metrics
* Search-to-answer time (target: <30 seconds median).
* Percentage of addresses with at least one relevant project showing.
* Opt-in rates for push notifications.
* Reduction in duplicate 311 inquiries for snow, sweeping, and paving.

### Roadmap
* **30 days:** Launch MVP "front door" with address lookup; populate project cards from the City dashboard [1]; publish snow priority explainer [2]; implement sweeping schedule lookup [3]; deploy mock progress meters with explicit data source labels.
* **60 days:** Roll out paving window notifications [4]; integrate VDOT impact cards [5]; launch crowdsourced sweeping confirmations; provide Spanish/English templates.
* **90 days:** Finalize AVL adapter spec; execute partner-led outreach in 3 corridors; publish dashboard KPIs; build backlog for future AVL integration.

## Resident Use Cases vs. Data Plan

Map top resident questions to available data and identify stop-gaps until full integration is possible.

| Use Case | Data Needed | Available Now | Mock/Stop-Gap | Next Step |
| :--- | :--- | :--- | :--- | :--- |
| **"What's being built near me?"** | City project metadata, map | Capital Project Dashboard [1] | Plain-language summarizer | Auto-sync quarterly; add DPW links |
| **"When is my street swept?"** | Route schedule, calendar | StreetSweeping dataset [3] | Area-level alerts; cancellation logic | Add confirmation loop; prep AVL |
| **"Will my street be paved?"** | PCI + annual plan | Paving page + map [4] | Monthly window + checklist | Pull FY lists into segments |
| **"When will plows reach me?"** | Priority tier, ETA | Snow page/PDF [2] | Priority window + explainer | Add storm-severity scenarios |

## References

1. *CIP | Richmond*. https://rva.gov/budget-and-strategic-planning/cip
2. *Snow Removal | Richmond - RVA.gov*. https://www.rva.gov/public-works/snow-removal
3. *StreetSweeping | Open Data Portal | City of Richmond, Virginia*. https://data.richmondgov.com/Sustainability-and-Natural-Environment/StreetSweeping/km2h-uk82
4. *Paving | Richmond - RVA.gov*. https://www.rva.gov/public-works/paving
5. *2025 VDOT Richmond District Transportation Update*. https://www.vdot.virginia.gov/media/vdotvirginiagov/about/districts/richmond/2025-richmond-district-transportation-update_acc.pdf