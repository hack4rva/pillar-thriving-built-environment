# Trust on a Timer: Preventing Stale GeoHub Data in Project Dashboards

## Executive Summary

Data freshness is not merely a technical metric for civic infrastructure tools; it is a foundational pillar of resident trust. When a public dashboard displays a street project as "Active" months after the traffic cones have been removed, it actively erodes the credibility of the tool and the government that provides it. Research indicates that 81% of residents say a negative digital experience decreases their trust in government, while 87% say a great experience increases it [1]. 

Our research into municipal ArcGIS Hubs and open data portals reveals that update cadences vary by an order of magnitude across different cities and datasets. For example, Los Angeles County Public Works refreshes its infrastructure project data daily [2], while New York City's Capital Projects Dashboard updates its schedule and budget data only three times per year [3]. This heterogeneity means a one-size-fits-all freshness policy will fail. 

To mitigate the risk of stale data undermining your visibility tool, you must design per-dataset freshness Service Level Agreements (SLAs). By leveraging ArcGIS metadata fields (like `item.modified` and feature-level `lastEditDate`), you can automate freshness checks, trigger internal alerts when data breaks its expected update pattern, and display contextual staleness warnings to users. For a weekend-built prototype, implementing a 12-to-24-hour pull cache with explicit "As of" timestamps and a 90-day "tombstone" strategy for removed projects will provide a safe, transparent baseline that protects resident trust.

## Why Freshness Risk Matters — Stale data turns visibility tools into credibility risks

Data recency isn't a nice-to-have feature; for civic projects, it directly affects resident trust, call volumes to city departments, and policy decisions. 

### The "Active" vs. Reality Disconnect
When residents encounter a dashboard that contradicts their physical reality—such as a tool showing a project as "active" when it has actually been completed for months—the tool transforms from a helpful resource into a source of frustration. Outdated information quietly creates friction that wastes staff time and chips away at public trust [1]. If a public organization cannot deliver a proper level of public services, including accurate digital information, it leads to mistrust in the government [4].

### Evidence Base for Trust Sensitivity
Academic and industry research heavily links data quality and timeliness to public trust. Incorrect or inaccurate data visualized using dashboards can directly reduce citizens' trust in government [4]. Furthermore, timeliness is considered one of the primary principles of open data; a lack of readily available, reliable information can disrupt users' trust in the data and their desire to use the portal entirely [5]. The emotional element of digital service delivery is profound: 87% of respondents report that a great digital government customer experience increases their trust, whereas 81% state that a negative experience decreases it [1].

## Real-World Update Cadences — GeoHub layers range from daily to triannual

Expect heterogeneous cadences across different municipal data sources and design your application to handle dynamic thresholds.

### Daily vs Batch: Concrete City Examples

| Municipality / Dataset | Stated Update Frequency | Last Updated Example | Strategic Implication |
| :--- | :--- | :--- | :--- |
| **LA County Public Works Infrastructure Projects** | Refreshed once a business day, Mon-Fri [2]. | N/A | High-frequency data requires daily syncing to maintain parity with the source. |
| **NYC Capital Projects Dashboard** | Budget and schedule data updated three times per year [3]. | December 26, 2025 [6] | Triannual updates mean data will naturally age up to 4 months; UI must explain this cadence. |
| **Seattle SPU Capital Improvement Projects** | Batch updates [7]. | October 14, 2025 [7] | Periodic batch updates require anomaly detection to flag if a expected batch is missed. |
| **LA Scheduled Proposed Street Resurfacing** | Infrequent/Ad-hoc [8]. | Data Updated: Aug 27, 2020 (Published 2015) [8] | Highly stagnant datasets require permanent "historical" or "archived" labeling to prevent misleading users. |

*Takeaway: You cannot enforce a universal "stale at 30 days" rule. A 4-month-old NYC capital project record is "on time," while a 4-day-old LA County project record might be "late."*

### What This Means for DPW-to-GeoHub Lag
The lag between an internal Department of Public Works (DPW) system and a public GeoHub layer is governed by the city's ETL (Extract, Transform, Load) schedule, not by technological limits. Based on the data, this lag ranges from less than 24 hours (daily ETLs) to 1-4 months (triannual batch processes) [3] [2]. The highest risk pockets are project statuses that change frequently in reality (e.g., active construction phases) but are tied to slow, batch-publishing cadences.

## From Source to Screen — Measuring and monitoring freshness with ArcGIS

ArcGIS gives you the hooks to automate freshness checks, but you must actively extract and utilize them to protect your users.

### What to Read from ArcGIS Metadata
To accurately measure data age, you must pull timestamps from both the dataset level and the feature level. ArcGIS Hub item pages display "Data Updated" and "Info Updated" timestamps (e.g., the LA Resurfacing dataset shows "Info Updated" and "Data Updated" as August 27, 2020) [8]. Additionally, ArcGIS Feature Services expose last edit timestamps (such as `lastEditDate` via the REST API). By storing both the `item.modified` date and the per-feature `lastEditDate`, you can compute the exact data age in hours or days and drive UI warnings directly from those fields.

### Detecting Breaks in Expected Patterns
The most robust freshness monitoring relies on pattern recognition—learning the normal rhythm of your data updates and flagging when that pattern breaks [9]. By analyzing historical metadata, you can establish expected update patterns for key tables and set dynamic thresholds that adapt to these patterns [9]. If a dataset normally updates weekly, a 14-day gap is an anomaly. Automated data quality tools can continuously monitor these timestamps and provide real-time reporting on freshness metrics, triggering alerts when thresholds are breached [10].

## Communicating Freshness — UX patterns that maintain trust

Communicating freshness effectively is a critical UX pattern. You must make recency visible, contextual, and actionable.

### Pattern Library for Data Recency
* **"Last Updated" Timestamps:** Always display a visible "Last updated" timestamp near the project title or on the dataset card. 
* **Staleness Chips:** Use color-coded staleness chips (e.g., Green for "On time", Yellow for "Late", Red for "Stale") accompanied by tooltips that explain the expected cadence.
* **Dataset Banners:** Implement prominent warning banners at the top of the screen when a dataset breaches its hard staleness threshold.
* **Feedback Affordances:** Provide an easy "Report outdated info" button. This converts user distrust into actionable corrections and routes feedback to data owners.
* **Transparency in Metadata:** Distinguish between "Data Updated" (when the actual records changed) and "Info Updated" (when the metadata or description changed) to avoid false precision [8].

### Failure-Proofing Language
Avoid false precision and use language that contextualizes the data's age. Instead of simply stating "Active," use copy that explains the cadence, such as: *"This dataset updates weekly; this view is 18 days old."* If the exact update schedule is unknown, prefer ranges or explicit "As of [Date]" framing.

## Trust Impact & Failure Cases — What goes wrong and how to catch it

Specific anti-patterns predict trust loss. You must design detection mechanisms and mitigations for these scenarios.

### Anti-Patterns to Detect
1. **The "Zombie" Active Project:** A project marked as "Active" with no feature-level edits in 30 or more days.
2. **Disappearing Projects:** Projects that vanish from the source data because publishers prune completed records. For example, LA County Public Works only shows the past three years of completed Water Resources and Transportation projects [2].
3. **Mismatched Timestamps:** The dataset's `item.modified` date updates, but no individual features show recent `lastEditDate` changes, indicating an empty sync.

### Mitigations
To handle these failures, implement auto-flags and review queues for "Zombie" projects. For disappearing projects, if your tool mirrors deletions without context, residents lose the thread. Implement a "tombstoning" strategy: retain the cached geometry and attributes for 90 days, mark the project as "Completed/Archived," and provide a link to the source for verification.

## Design Targets & Thresholds — Practical SLAs and warnings for GeoHub data

Adopt per-dataset SLAs with dynamic thresholds. Default to weekly expectations for active construction projects unless the source explicitly states otherwise.

### Recommended SLAs by Use Case

| Project Phase / Data Type | Expected Cadence | Soft Warning Threshold (2x) | Hard Warning Threshold (3x+) |
| :--- | :--- | :--- | :--- |
| **Active Construction / Phasing** | Weekly | ≥ 14 days | ≥ 30 days |
| **Planning / Long-Range** | Monthly | ≥ 45 days | ≥ 60 days |
| **Budget / Financial Data** | Triannual | ≥ 6 months | ≥ 8 months |

*Takeaway: The acceptable freshness window varies dramatically depending on the use case [9]. Align your budget data expectations to local OMB cycles (like NYC's triannual updates) [3], but hold active construction to a much tighter weekly standard.*

### Threshold Logic
Apply a "2x late" rule to drive soft warnings (e.g., yellow UI chips) and internal escalations to data owners. Apply a "3x late" rule for hard warnings (e.g., red banners stating "Data may be outdated"). Feature-level staleness (via `lastEditDate`) should always override dataset-level staleness where available.

## Removed vs Not Updated — Handling absent and stagnant records

You must separate projects that are "no longer in source" from those with "no recent edits," preserving resident context in both cases.

### Removal Handling
When a project disappears from the source feed (often due to publisher retention policies, like LA's 3-year window [2]), do not immediately delete it from your tool. Ghost or tombstone the record for 90 days with a clear label: *"Completed/Archived (source removed on YYYY-MM-DD)."* Explain the publisher's retention policy in a tooltip and link to the original source.

### No-Update Handling
For projects that remain in the feed but haven't been updated, keep them visible but attach a staleness badge. If the project status is "Active" but breaches the soft threshold, prompt the data owner. At the 30-day mark (or hard threshold), auto-flag the project for editorial review and annotate the UI with *"Under review for freshness"* rather than showing a stale "Active" status.

## Prototype Cache Strategy (Weekend-Build) — Fast path to safer freshness

For a weekend prototype, you likely cannot change city publishing cadences, but you can cache smartly, show recency, and fail transparently.

### Architecture in a Day
Implement a local store (SQLite or Postgres) to cache source items and features alongside their `lastEditDate`. Schedule a sync job every 12 to 24 hours. To optimize performance, use delta queries where `lastEditDate > last_seen`, and respect `item.modified` and ETag headers. Assign a Time-To-Live (TTL) to each layer based on its expected cadence.

### UX + Fallback
Never show undated data. Always display explicit "As of" times on the frontend. If the source goes offline or the sync fails, the fallback should serve the last good snapshot with a clear banner noting the staleness and the exact date of the snapshot. Implement minimal observability by logging the `freshness_age` per layer and alerting your team on breaches.

## Monitoring & Governance — Keep it fresh without heroics

Establishing clear data governance policies and assigning data ownership roles is crucial for maintaining data freshness [10]. 

### Mini Data Contracts
Create a lightweight "data contract" for each layer ingested by your tool. This should document the data owner's email, the expected update cadence, the agreed-upon SLA, and the escalation path if the data goes stale. Clearly defining ownership and update frequency maintains confidence in dashboard accuracy [11].

### Alerting Workflow
Set up automated checks to flag delays [12]. When a soft breach occurs, automatically send an email or Slack message to the data owner and your product team. If a hard breach occurs, trigger the public-facing UI banner and escalate the issue internally so it can be fixed before more users are misinformed.

## Open Questions & Validation Plan — Close the unknowns quickly

To move from prototype to production, validate real lag and cadence empirically within the first two weeks.

### What We Don't Yet Know
* The exact DPW-to-GeoHub lag for specific agencies (beyond the stated metadata).
* Which specific city layers carry reliable, feature-level `lastEditDate` timestamps versus those that only update at the dataset level.

### How We'll Learn
* **14-Day Event Sampling:** Track edit deltas versus `item.modified` dates over a two-week period to observe the actual publishing rhythm.
* **Owner Interviews:** Speak with city GIS owners to confirm their actual cadences and retention policies (verifying rules like LA's 3-year retention).
* **Adjust Thresholds:** Use the observed historical metadata to adjust your dynamic thresholds, moving from assumed SLAs to empirically backed anomaly detection [9].

## Appendix: Source Facts and Evidence

### Facts
* **LA County Public Works Infrastructure Projects:** "Data is refreshed once a business day, Mon-Fri." [2]
* **NYC Capital Projects Dashboard:** "The budget data in the dashboard is updated three times per year... The schedule data is collected directly from City agencies on that same cadence." [3]
* **LA GeoHub Dataset Example:** Scheduled Proposed Street Resurfacing Projects shows "Data Updated: August 27, 2020" and "Published Date: November 14, 2015." [8]
* **Seattle SPU Capital Improvement Projects:** Shows a "Last Update" of "2025-10-14T03:21:19.000Z." [7]
* **Trust and Data Quality:** "Incorrect or inaccurate data and information visualized using dashboards can reduce citizens' trust in government." [4]
* **Digital Experience and Trust:** 87% of respondents said a great digital government customer experience would increase their trust, while 81% said a negative experience would decrease it [1].
* **Freshness Frameworks:** Data freshness depends on the use case; measuring it involves checking timestamps, expected change rates, and anomaly detection [9] [12]. Establishing data governance and ownership is crucial [10].

### Inferences (Clearly Labeled)
* **Inference:** Lag is approximately equal to the stated/observed update cadence; expect <24h lag for daily ETL pipelines and 1-4 months of lag for triannual batch updates.
* **Inference:** A weekly status update is "fresh enough" for active construction projects; data that is 30+ days old is highly likely to mislead typical residents.
* **Inference:** Tombstoning (retaining records temporarily) prevents "vanishing project" confusion when municipal publishers prune their history to meet retention policies.

### Data Freshness UX Recommendations
* Show "Last updated" near the title.
* Use card-level staleness chips with color coding and tooltips explaining the expected cadence and actual age.
* Deploy dataset-level banners on soft/hard threshold breaches.
* Never show status claims without an "as of" date/time.
* Use feature-level freshness where possible; default to dataset-level if not available.
* Provide a "Report outdated info" button to capture user feedback.
* Distinguish "Data Updated" vs "Info Updated" for transparency.

### Recommended Cache Strategy for a Weekend-Built Prototype
* Store per-layer `item.modified` ("Data Updated") and per-feature `lastEditDate`; compute `freshness_age` on ingest.
* Run a sync job every 12 hours with delta queries (where `lastEditDate > last_seen`); respect ETag/If-Modified-Since headers.
* Set per-layer TTL = expected cadence; soft warn at 2x TTL; hard warn at 3x TTL.
* For offline fallback, serve the last good snapshot with an explicit "As of" timestamp and a banner noting staleness.
* Implement minimal observability: write freshness metrics to logs and send alerts on breaches.

## References

1. *Modern Forms Rebuild Confidence in Local Government - CivicPlus*. https://www.civicplus.com/blog/do/from-pdfs-to-digital-trust-how-modern-forms-rebuild-confidence-in-local-government/
2. *LA County Public Works Infrastructure Projects - GeoHub*. https://geohub.lacity.org/datasets/lacounty::la-county-public-works-infrastructure-projects
3. *NYC Capital Projects Dashboard*. https://www.nyc.gov/site/capitalprojects/index.page
4. *Data science empowering the public: Data-driven dashboards for transparent and accountable decision-making in smart cities - ScienceDirect*. https://www.sciencedirect.com/science/article/pii/S0740624X18300303
5. *(PDF) Timeliness of Open Data in Open Government Data Portals Through Pandemic-related Data: a long data way from the publisher to the user*. https://www.researchgate.net/publication/347261137_Timeliness_of_Open_Data_in_Open_Government_Data_Portals_Through_Pandemic-related_Data_a_long_data_way_from_the_publisher_to_the_user
6. *Capital Projects Dashboard - Citywide Schedule History and Variance | NYC Open Data*. https://data.cityofnewyork.us/City-Government/Capital-Projects-Dashboard-Citywide-Schedule-Histo/95tx-snak
7. *SPU Capital Improvement Projects | City of Seattle Open Data portal*. https://data.seattle.gov/dataset/SPU-Capital-Improvement-Projects/ktbb-8i44
8. *Scheduled Proposed Street Resurfacing Projects | City of Los Angeles Geohub*. https://geohub.lacity.org/datasets/scheduled-proposed-street-resurfacing-projects
9. *What is data freshness? Definition, examples, and best practices | Metaplane*. https://www.metaplane.dev/blog/data-freshness-definition-examples
10. *Defining Data Freshness: Measuring and Monitoring ...*. https://www.anomalo.com/blog/defining-data-freshness-measuring-and-monitoring-data-timeliness/
11. *Government Dashboards: Transparency, Trust & Public Accountability*. https://www.spiderstrategies.com/blog/government-dashboards/
12. *Data Freshness: Best Practices & Key Metrics to Measure | Elementary Data*. https://www.elementary-data.com/post/data-freshness-best-practices-and-key-metrics-to-measure-success