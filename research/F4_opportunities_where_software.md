# Targeted transparency and reliable service: where software truly moves the needle in projects and fleets

## Executive Summary

In both infrastructure transparency and fleet operations, the primary bottlenecks have shifted away from raw data availability toward discoverability, comprehensibility, and organizational coordination. For infrastructure projects, large cities already publish data, but it is fragmented across multiple agency portals and obscured by technical jargon. The highest-value software intervention is a lightweight, cross-agency aggregator that normalizes data and presents it in plain language, rather than complex analytics dashboards. 

In fleet operations, transit agencies largely possess the necessary data (CAD/AVL, GTFS-Realtime), making the primary constraint operational discipline and street-level priority. Software adds the most value when it empowers dispatchers to manage headways and supports the enforcement of dedicated bus lanes, rather than simply providing more data to riders on delayed buses. Across both domains, simple non-software solutions—such as high-contrast physical signage at construction sites and camera-enforced bus lanes—frequently outperform complex digital tools. Artificial Intelligence should be treated as a scalpel to scale plain-language translations and detect data anomalies, not as a replacement for standard data feeds or human-in-the-loop operational control.

## Objectives and Scope

This report pinpoints where software creates outsized value versus where organizational process or physical infrastructure should lead. By analyzing the problem spaces of infrastructure transparency and fleet operations, we identify the minimum viable software interventions that produce maximum resident value, while highlighting areas where technology is an unnecessary or inferior substitute for basic operational changes.

### Decision Questions Answered
* **Infrastructure visibility:** Is the primary problem finding the data or understanding it?
* **Fleet operations:** Is the primary problem data availability, data communication, or organizational coordination?

## Bottleneck Assessment by Domain

The following table outlines the primary bottlenecks across both domains, revealing that while data is generally available, the barriers lie in how it is found, understood, and acted upon.

| Domain | Data Availability | Discoverability | Comprehensibility | Coordination & Communication | Evidence |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Infrastructure Projects** | Medium–High (NYC, Boston, Seattle datasets are live) | Low–Medium (Multi-portal sprawl; varying inclusion thresholds) | Low–Medium (Technical phases; limited plain-language summaries) | Medium (Cross-agency consistency is lacking) | [1] [2] [3] [4] [5] [6] |
| **Fleet Operations** | High (CAD/AVL and GTFS-RT are standard in large agencies) | High for developers; Medium for riders (channels vary) | Medium (Riders need simple, multi-channel access) | Low–Medium (Headway management and street enforcement are major gaps) | [7] [8] [9] [10] [11] |

**Key Takeaway:** Project data exists but is highly fragmented and jargon-heavy. Bus operations have the necessary data but require disciplined control and street-level priority to improve service.

## Infrastructure Project Visibility

For infrastructure projects, the primary problems are discoverability (finding the data across fragmented systems) and comprehensibility (understanding what the data means for daily life). 

### Fragmentation and Cadence
Finding a project is often the first failure point for residents. In New York City, the Capital Projects Dashboard updates schedule data only three times per year and requires users to visit separate portals for Parks, NYCHA, and School Construction Authority projects [2]. Seattle's SDOT dashboard highlights projects over $500,000 and updates monthly [1]. Boston maintains capital project datasets and maps, but users must navigate different systems to get a complete picture [3] [4]. Chicago launched ChiStreetWork to map CDOT permits and special events, highlighting the need for consolidated views [12] [13].

### Comprehensibility and Plain Language
Once data is found, it is often incomprehensible to the general public. Government design guidance stresses that plain language—content that is clear and easy to understand—is critical for public dashboards [14] [15] [16]. However, current trackers often rely on technical phases like "Early Design" or "Closeout" [1]. Research indicates that applying plain language guidelines to data visualizations and dashboards significantly improves comprehensibility for end users [17] [18].

### Minimum Viable Interventions Ranked by Value/Effort

| Intervention | Type | Resident Value | Effort | Rationale & Evidence |
| :--- | :--- | :--- | :--- | :--- |
| **Cross-agency "Project Finder" + API** | Software | High | Medium | Data exists but is fragmented across agencies [1] [2] [3]. Aggregation solves discoverability. |
| **Plain-language summaries** | Org + Light SW | High | Low | Plain language is legally mandated and boosts comprehension [14] [15] [17]. |
| **Update cadence transparency** | Software | Medium | Low | Trust improves when users know when data was last updated and when to expect the next update [1] [2]. |
| **On-site signage with QR/SMS** | Non-software | Medium–High | Low–Medium | Plain-language requirements apply offline; physical context matters [14]. |

**Key Takeaway:** Build a thin aggregator with an API, enforce plain-language summaries, and pair the digital experience with robust physical signage.

### Warnings: Where Software Underperforms
In active work zones, a legible physical sign and a staffed hotline frequently outdo a web map for immediate information. High-contrast, plain-language boards with a short URL or SMS code are highly effective because the user's context is on-street, not online. Software underperforms here because it requires the user to proactively search for a digital twin of the physical disruption they are currently experiencing.

## Fleet Operations

In fleet operations, the primary problem is no longer data availability; it is organizational coordination and street-level communication. 

### Leveraging Existing Data
Agencies with CAD/AVL systems and GTFS-Realtime feeds (such as MTA Bus Time) already have the data required to monitor service [7]. Research demonstrates that GTFS-RT data can be used to extract robust transit performance metrics, including transit delay and travel time uncertainty [8]. The challenge is not acquiring more data, but using it to drive operational decisions.

### Operational and Street-Level Constraints
The binding constraints on bus reliability are operational practices and street design. TransitCenter recommends that control centers intervene early when buses get off track and implement headway-based control for frequent routes to maintain even spacing [9] [10]. Furthermore, designing streets to prioritize buses—through dedicated lanes, bus bulbs, and optimized traffic signals—is critical [9] [10] [11]. London's iBus system demonstrates how real-time data can trigger differential priority at traffic signals, improving regularity [19].

### Minimum Viable Interventions Ranked by Value/Effort

| Intervention | Type | Rider Value | Effort | Rationale & Evidence |
| :--- | :--- | :--- | :--- | :--- |
| **Headway management SOP + dispatcher tools** | Software + Org | High | Medium | Early intervention and headway control prevent bus bunching [9] [10]. |
| **Bus lane enforcement cameras** | Non-software | High | Medium | Dedicated lanes degrade without automated enforcement [10] [11]. |
| **Transit signal priority (TSP)** | Non-software | Medium–High | Medium | Differential priority reduces delays at intersections [19] [11]. |
| **Publish GTFS-RT with QA** | Software | Medium–High | Low–Medium | Real-time data supports accessibility measures and third-party apps [7] [8]. |

**Key Takeaway:** Small, targeted tools for dispatchers and strict enforcement of street priority yield better results than building massive new digital platforms.

### Warnings: Where Software Underperforms
No passenger-facing app can unbunch buses or clear blocked traffic lanes. When frequent routes suffer from bunching, the solution is headway-based dispatch and transit signal priority, not a better app UI [9] [10] [11]. Similarly, if a bus is stuck in mixed traffic, dedicated lanes with camera enforcement are required [10]. Software alone cannot offset physical street friction.

## AI: Where it Helps and Guardrails

Artificial Intelligence offers specific, high-yield applications but introduces unnecessary complexity if misapplied.

### High-Yield AI Uses
* **Plain-Language Translation:** AI can draft plain-language project summaries from dense technical documents. Human editors can then review these drafts to ensure compliance with Plain Language and Content Design standards [14] [15] [16].
* **Anomaly Detection:** Machine learning can detect data drift and anomalies in GTFS-RT feeds (e.g., sudden latency spikes or unmapped trips), protecting rider trust and ensuring data quality for performance metrics [8].

### Low-Yield and Complexity Traps
Replacing standard, well-documented feeds (like GTFS and GTFS-RT) with AI-heavy proprietary systems adds risk without corresponding value [7] [8]. Furthermore, fully automated operational decisions (like bus dispatching) without human oversight risk misprioritization; dispatch should remain human-in-the-loop [9] [10].

## Implementation Roadmap

### 0–90 Days
* **Infrastructure:** Build a minimal cross-agency aggregator and API. Add "last updated" and "next expected update" stamps to existing dashboards [1] [2]. Introduce plain-language summary templates [14].
* **Fleet:** Publish or upgrade GTFS-RT feeds with basic quality assurance checks. Pilot headway monitoring tools on two high-frequency routes [9].

### 90–180 Days
* **Infrastructure:** Roll out standardized physical signage kits featuring QR codes, SMS short codes, and hotline numbers at major construction sites [14] [15].
* **Fleet:** Codify dispatcher standard operating procedures for headway management. Deploy transit signal priority at key intersections and advance bus-lane camera enforcement [10] [11].

### 180–365 Days
* **Infrastructure:** Expand the project aggregator to include county and state partners. Add multilingual content following content design best practices [16].
* **Fleet:** Scale headway management tools to the top 10 routes. Publish monthly reliability scorecards derived from GTFS-RT analytics [8].

## Measurement and Accountability

To prove value, cities must track discoverability, comprehension, and reliability using transparent public metrics.

* **Infrastructure Metrics:** Track time-to-find (search to project page), subscription rates for alerts, 311 inquiry volumes regarding construction, the percentage of projects with plain-language summaries, and update latency [1] [2] [14] [15].
* **Fleet Metrics:** Monitor excess wait time, headway coefficient of variation, dwell times on priority corridors, GTFS-RT latency, and bus lane violation counts [8] [10] [11].
* **Transparency:** Publish monthly scorecards and open the underlying datasets so external researchers and developers can verify performance [5] [6].

## References

1. *Capital Projects Explorer - Seattle.gov*. https://capitalprojects.seattle.gov/
2. *capital-projects-dashboard*. https://www.nyc.gov/site/operations/other-resources/capital-projects-dashboard.page
3. *Capital Projects (FY2023) - Dataset - Analyze Boston*. https://data.boston.gov/dataset/capital-projects-fy2023
4. *Capital Projects*. https://apps.boston.gov/capital-projects/
5. *Capital Projects Dashboard - Citywide Budget and Schedule*. https://data.cityofnewyork.us/City-Government/Capital-Projects-Dashboard-Citywide-Budget-and-Sch/fb86-vt7u
6. *Capital Project App Projects | City of Seattle Open Data portal*. https://data.seattle.gov/Built-Environment/Capital-Project-App-Projects/hbyh-ca2y
7. *GTFS-Realtime Support*. https://bustime.mta.info/wiki/Developers/GTFSRt
8. *GTFS-RT Transit Delay - Mobility Innovation Center*. https://mic.comotion.uw.edu/wp-content/uploads/2022/03/Aemmer-Ranjbari-MacKenzie-GTFS-RT-Transit-Delay.pdf
9. *Turnaround: Fixing New York City's Buses - TransitCenter*. https://transitcenter.org/publication/turnaround-fixing-new-york-citys-buses/
10. *Turnaround: Fixing New York City's Buses - Transit Center*. https://transitcenter.org/wp-content/uploads/2016/07/Turnaround_Fixing-NYCs-Buses-20July2016.pdf
11. *Transit Street Design Guide - NACTO*. https://nacto.org/publication/transit-street-design-guide/
12. *
    City of Chicago :: Mayor Emanuel Announces New Data Transparency Tool that Puts City Road Construction and Special Event Information at the Public’s Fingertips
*. https://www.chicago.gov/city/en/depts/mayor/press_room/press_releases/2019/april/DataToolConstruction.html
13. *Chicago Department of Transportation Announces ...*. https://www.chicago.gov/city/en/depts/cdot/provdrs/future_projects_andconcepts/news/2020/march/chicago-department-of-transportation-announces-chistreetwork-web.html
14. *Plain Language Guide Series - Digital.gov*. https://digital.gov/guides/plain-language
15. *Data visualisation: testing dashboards for design and accessibility – Government Analysis Function*. https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-testing-dashboards-for-design-and-accessibility/
16. *Content design: planning, writing and managing content*. https://www.gov.uk/guidance/content-design
17. *A Guide to Plain Language Data Visualizations: Guidelines for More Understandable Chart Design | Proceedings of the XI Latin American Conference on Human Computer Interaction*. https://dl.acm.org/doi/10.1145/3630970.3630990
18. *Plain Language Policy Dashboard : New Disabled South*. https://plain-language-policy-dashboard.org/
19. *Data management and applications in a world-leading bus fleet - ScienceDirect*. https://www.sciencedirect.com/science/article/pii/S0968090X11001707