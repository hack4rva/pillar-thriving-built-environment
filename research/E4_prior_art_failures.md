# Stop Building Ghost Dashboards: How to Avoid Civic Infrastructure Transparency Tools That Die After Launch

## Executive Summary
Civic technology is littered with discarded tools that generated initial excitement but quickly devolved into "ghost dashboards"—abandoned, stale, and ultimately eroding public trust. The root cause of these failures is rarely a lack of technical sophistication or user demand; rather, it is the underestimation of data maintenance burdens, the absence of institutional integration, and the fragility of third-party dependencies. 

For the Richmond hackathon, the constraints are severe: GPS integration is not ready, there is no named continuation pathway, and staff capacity for updates is highly limited. Building a comprehensive, automated real-time tracker under these conditions guarantees failure. Instead, success requires ruthless scoping. By focusing on a "thin slice" of 5–10 priority projects, establishing a manual but sustainable monthly update cadence, and avoiding brittle third-party APIs, Richmond can deploy a tool that survives its first year and builds the institutional muscle memory required for future automation.

## Context and Objectives: Why Transparency Tools Die Post-Launch

The history of civic technology is filled with well-intentioned city tools that fail to attract a broad user base over time or create a "theater of civic engagement" without increasing government responsiveness, leading to their quick demise [1]. The Civic Tech Graveyard documents recurring patterns: fundraising success does not translate to project success, and many projects are shut down so operators can focus on other portfolio items [1]. 

### Richmond constraints force ruthless focus
Richmond faces a specific, high-risk profile: GPS data is not ready, there is no explicit continuation pathway post-hackathon, and staff capacity is limited. Without a named host department, a product owner, and budgeted maintenance hours, any tool built during this hackathon is highly likely to be abandoned within months. Success requires shifting the focus from technical feature expansion to sustainable data governance.

## Evidence of Post-Launch Failures: Documented Staleness and Exclusions

High-profile municipal tools frequently go stale or launch with incomplete data pipelines, rendering their "transparency" unusable and actively damaging public trust.

### NYC Capital Projects Dashboard missed updates and excluded major portfolios
New York City's Capital Projects Dashboard, launched on November 1, 2023, was mandated by Local Law 37 to provide public transparency and be updated tri-annually [2]. However, it failed to deliver basic transparency [3]. An April 2024 report by the NYS Comptroller found the dashboard had not been updated since September 2023 [2] [4]. A subsequent audit noted the dashboard went over six months without an update (last updated in May 2025) [2]. 

Furthermore, the data pipeline was woefully incomplete. The dashboard contained only 46.8 percent of Financial Management System (FMS) IDs and just 58.1 percent of planned commitments [3]. It entirely excluded City-funded projects managed by the School Construction Authority (SCA), the Metropolitan Transportation Authority (MTA), and most Housing Preservation and Development (HPD) projects [2] [3] [4]. 

### Success counterexamples inside NYC
Conversely, highly scoped and well-managed dashboards succeed. The NYC Department of Parks and Recreation (DPR) and the New York City Housing Authority (NYCHA) maintain high-quality dashboards [3]. NYCHA's dashboard provides detailed timelines by phase, estimated budgets, funding sources, and bi-weekly project updates [3]. DPR's dashboard includes detailed timelines, recent updates, and explicitly notes the project lead and their email address for user questions [3].

### Business discontinuations despite users
Even tools with strong user adoption fail if they lack a sustainable business or institutional model. EveryBlock, a hyperlocal news and civic data site, was shut down by NBCUniversal in 2013 due to financial losses, relaunched in 2014, and shut down again by Comcast in 2018 because it failed to gain traction outside of its Chicago home base [5].

## Organizational and Political Drivers: Integration and Power Dynamics

Tools fail when they do not fit into existing governance structures or when they provide information without empowering citizen action.

### Lack of institutional integration and funding kills prototypes
Civic tech must be viewed as "sociotechnical infrastructuring" [6]. Many projects start with motivated volunteers and grow visible, but eventually face operational barriers because they cannot be functionally integrated into governmental structures or secure stable public funding [6]. As workloads increase and resources shrink, volunteers burn out, and municipalities often lack the internal processes, resources, or administrative knowledge to maintain the interventions [6].

### Transparency without action pathways erodes trust
Publishing data without a theory of power backfires. As noted by the Harvard Ash Center, prioritizing technical capabilities over user capacities causes the "build it and they shall come" narrative to crumble [7]. High levels of automation make citizens assume "someone" will fix the problem, removing their incentive to act [7]. Furthermore, using technology to expose massive issues (like corruption or severe delays) *without* facilitating actions to tackle the problem makes citizens feel even more powerless [7].

## Underestimated Data Maintenance Burdens: Where Teams Go Wrong

The hidden work of civic tech is not the user interface; it is the maintenance of unique IDs, system linkages, and narrative context.

### The triad: cadence, completeness, and linkage
In NYC, the city's project management and financial systems are not linked, and the unique identifier (FMS ID) is used inconsistently—sometimes representing a discrete project, and other times acting as a "holding code" for an entire agency's plan [3]. Because financial data does not provide information on project schedules or reasons for delays, the resulting dashboard is not useful for project management or public inquiry [3]. Furthermore, the dashboard's tri-annual update schedule conflicted with agency systems that update daily, making it impossible for auditors to trace and match information [2].

## Technology Fragility Patterns: Scraping and Vendor Lock-in Risks

External API shifts, pricing changes, and portal redesigns can break civic tools overnight.

### Vendor/API shutdowns and pricing shifts
Single-vendor dependencies are highly fragile. The Sunlight Foundation, a major provider of civic APIs, shut down its Labs division in 2016 [8] [9]. At the time, its APIs supported 28,570 keys and handled 543,535 average daily calls [10]. While some projects were adopted by ProPublica [11], the shutdown caused massive disruption. 

Similarly, in 2023, Twitter (X) introduced monetized access tiers, reducing free API access from 500,000 to just 1,500 tweets per month, with paid tiers costing $100/month for 10,000 tweets and $5,000/month for 1 million tweets [12]. This effectively priced out and undermined urban research and civic tools relying on the platform [12].

### Scraper breakage and upstream outages
Ad hoc feeds and scrapers are brittle. For example, an outage of the Congress.gov API halted automated access to congressional data, demonstrating the fragility of relying on upstream government endpoints without service level agreements (SLAs) [13].

## Top 3 Failure Modes Most Relevant to Richmond

Given Richmond's constraints, the hackathon project faces three immediate existential threats.

| Failure Mode | Evidence Base | Richmond Triggers | Impact |
| :--- | :--- | :--- | :--- |
| **Data Staleness & Incompleteness** | NYC dashboard missed updates for 6+ months; contained only 46.8% of IDs [2] [3]. | Limited staff capacity; no automated pipeline ready. | Citizens view the tool as abandoned; trust in city transparency decreases. |
| **Orphaned Tool / Governance Vacuum** | ACM notes projects die without institutional integration and stable funding [6]. | No continuation pathway named post-hackathon. | The tool breaks or goes offline within 3-6 months as volunteer/hackathon momentum fades. |
| **Vendor / API Fragility** | Sunlight Foundation API sunset [10]; Twitter API price hikes [12]. | GPS not ready implies reliance on temporary scraping or third-party workarounds. | Upstream changes break the map, requiring emergency developer intervention that the city cannot staff. |

*Takeaway:* Richmond's most likely failure window is within the first quarter post-launch unless explicit ownership and a manual, low-effort update SLA are established immediately.

## Design and Handoff Recommendations

To mitigate these failure modes, the hackathon team must prioritize sustainability over feature completeness.

| Failure Mode | Mitigation Strategy | Owner | Tech Choice | Success Metric |
| :--- | :--- | :--- | :--- | :--- |
| **Data Staleness** | Narrow scope to 5-10 priority projects from a single system-of-record. Require manual CSV uploads monthly rather than building brittle scrapers. | Named City Product Owner | Static site + lightweight database (e.g., Socrata) | Update SLA met rate ≥90% |
| **Orphaned Tool** | Draft a formal governance document detailing scope, a 4-8 hour/month maintenance budget, and a strict deprecation policy if funding lapses. | Host Department Head | N/A (Policy) | Tool remains active and owned at 12 months |
| **Vendor Fragility** | Avoid proprietary APIs. Mirror critical datasets locally. Design graceful degradation UI states (e.g., "Data temporarily unavailable as of [Date]"). | Hackathon Dev Team | Open standards (CSV, Open311) | Zero downtime due to third-party API pricing/sunsets |

*Takeaway:* The handoff must include a documented data dictionary, a step-by-step manual for updating the data, and a clear "kill switch" protocol if the city cannot maintain the tool.

## Richmond-Specific MVP Plan: A Sustainable Thin Slice

Do not attempt to build a comprehensive city-wide dashboard. Ship a maintainable pilot now, and expand only after 3 months of reliable updates.

### Scope and Data
Select one department (e.g., Public Works) and 5–10 high-visibility capital projects that already have clear, unique IDs. The data schema must be minimal: Project ID, Scope, Phase, Budget vs. Actual, Location, Reasons for Delay, and a specific Contact Lead (emulating the successful NYC Parks and NYCHA models) [3]. 

### Tech and Governance
Because GPS is not ready, rely on static location data updated manually via CSV. The technology stack should be a static site generator pulling from a simple, version-controlled flat file. Crucially, pair the map with clear next actions for citizens (e.g., feedback forms, meeting dates) to avoid the trap of "transparency without power" [7].

## Metrics, SLAs, and Review Cadence

Measure the tool's operational health, not just its pageviews.

* **Core SLAs:** Maintain a data completeness rate of ≥90% for the chosen subset. Ensure the median response time to citizen inquiries generated from the tool is ≤10 business days.
* **Quarterly Review:** Do not add new projects or departments to the tool until the core team has successfully executed three consecutive monthly updates without missing the SLA.

## Appendices

### Facts
* The NYC Capital Projects Dashboard, launched Nov 1, 2023, was found in April 2024 to have not been updated since Sept 2023, and later went over six months without an update [2].
* The NYC dashboard contained only 46.8% of FMS IDs and 58.1% of planned commitments, excluding the SCA, MTA, and most HPD projects [3].
* NYC Parks and NYCHA maintain successful dashboards with detailed timelines, funding sources, and frequent updates [3].
* Civic tech projects frequently stall because they cannot be functionally integrated into governmental structures or receive stable funding [6].
* Civic technology that increases transparency without facilitating citizen action makes citizens feel powerless [7].
* The Sunlight Foundation shut down its Labs division in 2016, deprecating APIs that had 28,570 keys and 543,535 average daily calls [10] [8].
* Twitter (X) reduced free API access to 1,500 tweets per month in 2023, with paid tiers ranging from $100 to $5,000 per month, undermining urban research [12].
* EveryBlock was shut down in 2013 by NBCUniversal and again in 2018 by Comcast due to lack of financial viability and national traction [5].

### Inferences
* *Inference:* Richmond’s likely failure window is one quarter without an explicit owner and SLA, given the lack of a continuation pathway.
* *Inference:* Data governance (establishing unique IDs, update cadences, and system linkages) is a significantly higher ROI investment during the hackathon than expanding UI features or map layers.

## References

1. *Graveyard*. https://civictech.guide/graveyard/
2. *
  Audit Report of the Department of Design and Construction’s Mitigation of Delays and Cost Overruns on Capital Construction Projects - Office of the New York City Comptroller
Mark Levine*. https://comptroller.nyc.gov/reports/audit-report-of-the-department-of-design-and-constructions-mitigation-of-delays-and-cost-overruns-on-capital-construction-projects/
3. *
  Flying Blind on Billions: How Weak Capital Data Undermines New York City’s Infrastructure Investments - Office of the New York City Comptroller
Mark Levine*. https://comptroller.nyc.gov/reports/flying-blind-on-billions-how-weak-capital-data-undermines-new-york-citys-infrastructure-investments/
4. *A CAPITAL PROJECT DASHBOARD PLAGUED WITH LIMITATIONS*. https://www.greenebarrett.com/management-update/a-capital-project-dashboard-plagued-with-limitations
5. *Comcast to end hyperlocal site EveryBlock, agrees to send users to rival Nextdoor – Chicago Tribune*. https://www.chicagotribune.com/2018/07/12/comcast-to-end-hyperlocal-site-everyblock-agrees-to-send-users-to-rival-nextdoor/
6. *What Does 'Failure' Mean in Civic Tech?*. https://mags.acm.org/interactions/march_april_2024/MobilePagedArticle.action?articleId=1960571
7. *Transparency is Insufficient: Lessons From Civic Technology for Anticorruption – Ash Center*. https://ash.harvard.edu/articles/transparency-is-insufficient-lessons-from-civic-technology-for-anticorruption/
8. *The Sunlight Foundation: Turning Off Its Light? | Nonprofit Quarterly | Civic News. Empowering Nonprofits. Advancing Justice.*. https://nonprofitquarterly.org/sunlight-foundation-turning-off-light/
9. *Open government advocacy group Sunlight Foundation cuts staff, suspends reporting tools - POLITICO*. https://www.politico.com/blogs/on-media/2016/09/open-government-advocacy-group-sunlight-foundation-cuts-staff-suspends-reporting-tools-228426
10. *  API Gallery : Sunlight Foundation*. https://sunlightfoundation.com/api/usage/
11. *  Sunlight Labs update: Nonprofits step up to preserve tools for transparency : Sunlight Foundation*. https://sunlightfoundation.com/2016/11/01/sunlight-labs-update-nonprofits-step-up-to-preserve-tools-for-transparency/
12. *The Rise and Fall of Twitter Data in Urban Analytics | Published in Findings*. https://findingspress.org/article/133245-the-rise-and-fall-of-twitter-data-in-urban-analytics
13. *Congress.gov's API Has Gone Dark, Impacting Data Access*. https://www.govtech.com/gov-experience/congress-govs-api-has-gone-dark-impacting-data-access