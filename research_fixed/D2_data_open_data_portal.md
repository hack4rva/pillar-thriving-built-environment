
# Richmond DPW Data Playbook: What's Ready, What's Missing, What to Build

## Executive Summary

For teams preparing to build civic tech solutions using Richmond's Department of Public Works (DPW) and transportation data, the landscape is highly fragmented. Only one DPW transportation dataset on Socrata is clearly actionable today: The Richmond Impact Map [1]. Other critical datasets, such as road maintenance and paving data, live off-portal in ArcGIS applications and static PDFs [2]. 

Platform fragmentation is the central integration risk and the key design constraint for the upcoming hackathon. Construction permits sit in the Online Permit Portal (OPP) [3] [4], traffic incidents are routed to a custom web application [5], and 311 service requests are gated behind a closed customer service system [6]. To succeed, teams must limit their scope to programmatically reliable sources (Socrata OData and ArcGIS REST) while treating other systems as stretch goals. Furthermore, "Weekly" update cadences listed on the portal do not always reflect reality, requiring teams to implement freshness guardrails to handle stale data [1].

## Portal Coverage Snapshot

The following table outlines the current availability of the requested DPW and transportation dataset categories on the Richmond Open Data Portal and adjacent city systems.

| Category | Status | Dataset Name / Link | Listed Update Cadence | Access Method | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Right-of-way closures / work zones | Verified on Socrata | Richmond Impact Map (aq4i-4gpd) [1] | Weekly [1] | Socrata OData / CSV | Last updated 2023-03-31; 1,559 views, 0 downloads [1]. |
| Road maintenance / resurfacing | Verified off-portal | DPW Paving ArcGIS App / FY Paving Lists [2] | Annual / Seasonal | ArcGIS REST / PDFs | Includes PCI map and FY25/FY26 paving lists [2]. |
| Traffic incidents near construction | Verified off-portal | Traffic Info App [5] | Real-time | Potential JSON / None | Listed alongside Open Data; requires API investigation [5]. |
| Permit activity for construction | Inferred not on portal | Online Permit Portal (OPP) [3] [4] | Variable | Portal / API (if available) | Used for commercial/residential building permits [3]. |
| 311 service requests (DPW-related) | Inferred not on portal | RVA 311 Helpful Links [6] | Internal only | Internal CSR | Requires direct export request from the CSR team [6]. |
| Capital improvement projects | Verified off-portal | Capital Project Dashboard [10] | Quarterly [10] | ArcGIS Dashboard | Interactive map detailing active capital projects [10]. |
| Street cleaning (sweeping) | Verified on Socrata | Street Sweeping (2dh8-bzzs) [9] | Updated 2024-04-24 [9] | Socrata OData / CSV | Represents Street Sweeping Areas [9]. |

## Data Access Plan

To minimize friction during the hackathon, development should center around stable APIs, specifically Socrata OData and ArcGIS REST.

### Socrata (Impact Map aq4i-4gpd & Street Sweeping 2dh8-bzzs)
The Richmond Impact Map provides a map of City of Richmond projects which may impact travel or parking within the city [1]. It is accessible via OData v2 and v4 endpoints, which provide a direct connection to the data that can be refreshed on-demand within connected applications like Excel or Tableau [1]. Teams should confirm fields via OData metadata and capture geometry, dates, and closure types. Additionally, the Street Sweeping dataset provides polygon data for environmental maintenance routes [9].

### ArcGIS (PCI + Street/Segment layers)
The City of Richmond uses Pavement Condition Index (PCI) Ratings to prioritize and track its paving program, with scores ranging from 0 to 100 (failed to good) [7]. This data is available via an interactive ArcGIS map [2]. Teams should extract service URLs from the ArcGIS Web App to access layer IDs and key fields. Additionally, the city publishes Fiscal Year 2025 and 2026 Paving Lists as PDFs [2], which will require conversion to CSV with field normalization.

### Optional Feeds
For traffic incidents, teams should investigate the "Traffic Info" application for a JSON feed [5]. If unavailable, pivoting to the VDOT 511 API is recommended. For permits and 311 data, teams must request one-time CSV exports from the respective portal owners [6] [4].

## Category Deep-Dives

### Right-of-Way Closures (Verified: Impact Map)
The Richmond Impact Map is provided by the Department of Public Works and is tagged with "impact", "traffic", "right of way", and "closure" [1]. While it lists a "Weekly" update frequency, the dataset was last updated on 2023-03-31 [1]. The primary quality risk is stale updates. Teams should contact the dataset owner, Chad Costello, to request a refresh before the event [1].

### Road Maintenance and Resurfacing (Verified off-portal)
DPW implements its paving program annually from April through November [2]. The data is split between an interactive ArcGIS map showing PCI ratings and static PDFs detailing the FY25 and FY26 paving plans [2]. Quality risks include PDF extraction errors and inconsistent street naming. Teams should identify a centerline layer, such as the Richmond GeoHub Roads layer [8], for consistent spatial joins.

### Capital Improvement Projects (Verified off-portal)
The City of Richmond Capital Project Dashboard is an interactive data and map tool that allows users to explore active capital improvement projects [10]. It is updated on a quarterly basis and includes project phases and estimated completion dates [10]. Teams can use this dashboard to extract active project data and map it against road closures.

### 311 Service Requests (Inferred not on portal)
RVA311 data is not discoverable as a Socrata dataset. City pages route users to "RVA 311 Helpful Links" and internal portals [6]. Teams should prioritize securing a one-time CSV export filtered to DPW categories (e.g., potholes, ROW obstructions) that includes geocoded, non-PII data.

### Street Cleaning and Sweeping (Verified on Socrata)
A dataset representing Street Sweeping Areas is available on the Open Data Portal (2dh8-bzzs) [9]. It was last updated on 2024-04-24 and has over 3,100 views [9]. Teams can use this data to identify potential conflicts between scheduled sweeps and right-of-way closures.

### Traffic Incidents Adjacent to Construction (Derived integration)
The city lists a "Traffic Info" application for real-time traffic incidents [5]. Teams can derive valuable safety insights by buffer-joining these incidents within 50–200 feet of the closures listed in the Impact Map [1]. If the Traffic Info app does not expose an API, teams should use the VDOT 511 fallback.

## Data Quality and Freshness Controls

The most significant risk to the hackathon projects is silently stale data. For example, the Impact Map indicates weekly updates but has not been refreshed since 2023-03-31 [1]. Teams must embed "last updated" checks and schema validations into their pipelines. Tracking the `last_updated` metadata from Socrata and ArcGIS will prevent applications from displaying outdated closure or paving information as current.

## Unknowns to Verify Before Building

| Item | Evidence Gap | Verification Step | Target Owner |
| :--- | :--- | :--- | :--- |
| Impact Map freshness | Last update 2023-03-31 vs. Weekly [1] | Email dataset owner to trigger refresh or share export. | DPW (Chad Costello) [1] |
| ArcGIS layer URLs | Only app ID known [2] | Extract Feature Service endpoints and test queries. | DPW GIS/IT |
| Traffic Info API | App exists, API unknown [5] | Inspect network calls / request endpoint documentation. | City IT |
| 311 export | No open dataset [6] | Request CSV export of DPW categories. | CSR team |
| OPP permits | No open dataset [3] | Confirm export/API for active ROW-related permits. | PDR/OPP admin |

## Recommended Hackathon Datasets and Why

| Dataset / Source | Why it matters | Access Method | Key Fields | Caveats |
| :--- | :--- | :--- | :--- | :--- |
| Richmond Impact Map (aq4i-4gpd) [1] | Verified closures/work zones | Socrata OData / CSV | Geometry, closure type, dates | Stale—needs refresh [1]. |
| ArcGIS PCI + Street centerlines [2] [8] | Targeting maintenance and detour impacts | ArcGIS REST | segment_id, pci_score | Need layer URLs; naming normalization required. |
| Traffic Incidents [5] | Safety near work zones | JSON / API | Incident type, time, location | API availability varies; may need VDOT 511. |
| FY Paving Lists [2] | Program transparency | CSV (derived from PDF) | Street, limits, FY, treatment | Requires manual conversion and QA [2]. |
| Capital Project Dashboard [10] | Active construction context | ArcGIS Dashboard | Project phase, completion date | Requires manual export or API extraction [10]. |

## Risks, Constraints, and Mitigations

Building civic tech on fragmented infrastructure carries inherent risks, primarily API changes, stale data, and Terms of Service violations from scraping. Relying on PDF-to-CSV conversions for the FY Paving Lists [2] is error-prone and unrepeatable. To mitigate these risks, teams must stay within sanctioned APIs (Socrata OData and ArcGIS REST), design applications to gracefully handle stale data by displaying freshness flags, and document all manual conversion steps. Screen-scraping the Online Permit Portal [4] or Traffic Info app [5] should be avoided without written permission.

## Implementation Roadmap

To successfully deliver an MVP, teams should divide their efforts into two sprints:
* **Sprint 1 (Verification):** Confirm endpoints, schemas, and freshness for the Impact Map [1], Street Sweeping [9], and ArcGIS PCI layers [2]. Secure CSV exports for 311 and permit data if possible.
* **Sprint 2 (Build):** Ingest Socrata and ArcGIS data, normalize street names, and deliver the adjacency analysis (incidents near closures). Bake in freshness flags to highlight data staleness.

## References

1. *Richmond Impact Map | Open Data Portal | City of Richmond, Virginia*. https://data.richmondgov.com/Transportation/Richmond-Impact-Map/aq4i-4gpd
2. *Paving | Richmond*. https://www.rva.gov/public-works/paving
3. *Permits and Inspections | Richmond*. https://www.rva.gov/planning-development-review/permits-and-inspections
4. *Online Permit Portal | Richmond*. https://www.rva.gov/planning-development-review/online-permit-portal
5. *Open Data Portal | Richmond*. https://www.rva.gov/information-technology/open-data-portal
6. *RVA 311 Helpful Links | Richmond*. https://www.rva.gov/citizen-service-and-response/rva-311-helpful-links
7. *City Releases Pavement Condition Scores through Interactive Mapping Application | Richmond*. https://www.rva.gov/press-releases-and-announcements/news/city-releases-pavement-condition-scores-through-interactive
8. *Roads | Richmond GeoHub - ArcGIS Online*. https://richmond-geo-hub-cor.hub.arcgis.com/datasets/cor::roads-3/about
9. *Street Sweeping | Open Data Portal | City of Richmond, Virginia*. https://data.richmondgov.com/d/2dh8-bzzs
10. *CIP | Richmond*. https://www.rva.gov/budget-and-strategic-planning/cip