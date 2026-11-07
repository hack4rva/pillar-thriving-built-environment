> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# Cutting Through the Noise: A no-new-systems path to unify city project data for residents

## Executive Summary

Municipal infrastructure data fragmentation is a structural problem, not an accidental one. Years of program-by-program tooling have created parallel "sources of truth" across city departments that do not communicate with one another. This fragmentation is the core technical cause of poor project visibility for residents and city leadership. 

Our research reveals that format and cadence mismatches are the primary technical blockers to aggregation. Different APIs, schemas, and update schedules break naive integration attempts. Furthermore, access controls and rate limits can quietly kill uptime if a system attempts to aggregate live data from multiple sources. However, successful cities have avoided purchasing expensive new platforms by building "thin front ends" on top of existing open data. 

The simplest, most durable architecture for a resident-facing lookup tool is an "ETL to static" approach: normalize data nightly and serve it from a Content Delivery Network (CDN) to decouple the user interface from upstream source churn. For Richmond specifically, the City already exposes the right building blocks across its ArcGIS GeoHub, Socrata Open Data Portal, and Department of Public Works (DPW) program pages. By connecting these existing feeds into a unified static map, Richmond can deliver immediate resident value without requiring new enterprise systems.

## Problem Landscape — Siloed systems create blind spots for residents and City leadership

Project data lives across a heterogeneous mix of geographic information systems (GIS), open data portals, static PDFs, and departmental web pages, making a single source of truth elusive without deliberate aggregation.

### Where municipal project data lives today: ArcGIS, Socrata, PDFs, portals

Infrastructure data is scattered across platforms designed for different primary functions. Spatial data and active project maps are typically hosted on Esri's ArcGIS platform, such as Richmond's Paving interactive map [1]. Tabular data, budgets, and historical records often reside in Socrata open data portals, such as Chicago's Building Permits dataset [2] or NYC's Capital Projects dataset [3]. Meanwhile, operational schedules for residents are frequently published directly on departmental program pages, such as Richmond's Leaf Collection [4] and Street Cleaning schedules [5]. 

### Why fragmentation persists: incentives and tools

Data becomes siloed when it is stored in a system that does not integrate with other systems, is controlled by a team that does not share it, or is formatted in a way that is incompatible with other datasets [6]. In many cities, departments operate in isolation, with little data sharing between them or with central planning teams, resulting in fragmented decision-making [7]. 

This fragmentation is often a byproduct of legacy workflows and the sheer volume of unstructured data. For example, a Minnesota city implementing an asset management system discovered that its data was located in 450 separate Excel spreadsheets, requiring an inordinate amount of time to transfer [8]. Without robust smart city data governance, much of the urban data potential remains underexploited, as cities lack standardized data formats, clear data access guidelines, and cross-departmental collaboration mechanisms [9].

## Root Causes and Barriers — Format, cadence, access, and ownership block aggregation

The barriers to aggregating municipal data are predictable and consistent across local governments. Addressing them requires schema contracts, caching strategies, and clear data stewardship.

### Technical barriers: Schema drift and format differences

Heterogeneous schemas and unpredictable changes to data structures (schema drift) frequently break automated aggregation tools. 
* **Schema Drift**: Upstream data owners often change fields without notifying downstream consumers. For example, the City of Chicago added a new `PERMIT_CONDITION` column to its Building Permits dataset on October 15, 2025 [2]. 
* **Heterogeneous Schemas**: Datasets tracking similar concepts vary wildly in complexity. NYC's Capital Projects dataset contains 16 columns [3], while Chicago's Building Permits dataset contains 116 columns [2].
* **API Modalities**: Cities must navigate different API standards, such as ArcGIS REST services for spatial data versus Socrata's OData endpoints for tabular data [2] [3].

### Operational barriers: Cadence and ownership

Data organization is a common challenge at the enterprise level, as years of data development leave information fragmented in multiple locations and silos built by multiple staff and departments [8]. Different programs update their data at different cadences—a live ArcGIS feature service may update daily, while a street sweeping schedule on a program page may only update annually. This creates synchronization issues when attempting to present a unified view to residents.

### Access and throughput constraints

Live aggregation of municipal APIs is highly vulnerable to rate limits and access restrictions. ArcGIS Online subscriptions enforce an organization-wide query maximum request rate, which ranges from a shared 10,000 requests per minute for standard organizations up to 96,000 requests per minute for premium data stores [10]. Additionally, administrators can limit usage of secure services by designating specific referrer URLs or IPs that are allowed to access the data [11]. If a public-facing dashboard queries these services live, a spike in resident traffic can easily trigger rate limits, causing the tool to crash.

## Benchmarking City Solutions — Existing portals show "thin front end" works

Cities like Seattle, Los Angeles, and Philadelphia have successfully aggregated public project data without purchasing new centralized backend systems. Instead, they use existing open data infrastructure to power lightweight, resident-facing applications.

### Comparison: How 4 cities aggregate public project data

| City | Data Backbone | Public Tool | Data Exposure | Notable Practice |
| :--- | :--- | :--- | :--- | :--- |
| **Seattle** | Socrata | Capital Projects Explorer | Open dataset (hbyh-ca2y) | The dashboard is directly populated by data available on the open data repository, ensuring transparency [12]. |
| **New York City** | Socrata | Capital Projects Dataset | OData API | Exposes 3,320 active projects over $25M with clear budget and schedule fields via OData [3]. |
| **Los Angeles** | ArcGIS GeoHub | GeoHub CIP Datasets | FeatureLayers | Uses the City's public platform to allow departments to publish Capital Improvement Project polygons directly [13] [14] [15]. |
| **Philadelphia** | Mixed Feeds | StreetSmartPHL | Interactive mapping app | Aggregates street closures, sweeping, and snow plowing into a single resident-centric tool [16] [17]. |

**Key Takeaway**: The most successful municipal dashboards do not rely on a monolithic new database. Instead, they use a "thin front end" that reads from existing, decoupled open data portals (like Socrata or ArcGIS Hub).

## Richmond Data Footprint — DPW data is split across GeoHub, Socrata, and program pages

Richmond already possesses the necessary building blocks to create a unified resident lookup tool. The data is currently distributed across several platforms, but a version 1 (v1) integration can unify paving, leaf collection, and street cleaning immediately.

### Facts: Confirmed sources and content

* **Paving**: DPW publishes an interactive ArcGIS Web App (id=30c7084e3a2242a9beb47f75dd18c4db) that is updated as paving projects are completed, alongside static PDF maps for FY25 and FY26 [1]. This program is highly visible; the percentage of streets with a "Satisfactory" or "Good" Paving Condition Index (PCI) rose from 35% in 2018 to 75% in 2024 [18].
* **Street Cleaning**: DPW publishes residential street sweeping schedules with specific dates (e.g., Route 1 Fulton/35th Street from 4/6/26 – 4/17/26) and links to individual route maps [5].
* **Leaf Collection**: The annual program begins October 6, 2025, with vacuum leaf components starting November 3, 2025. The city uses sector collection dates and maps to coordinate unlimited bag collection [4].
* **Sidewalks**: Sidewalk maintenance is split by scale. Repairs under 150ft are handled by City masons, while repairs over 150ft are classified as Capital Improvement Projects (CIP) and completed by external contractors [19].
* **Data Portals**: Richmond actively maintains an Open Data Portal (data.richmondgov.com) [20] [21] and a Richmond GeoHub (ArcGIS Hub) for exploring and downloading GIS datasets [22]. The city also uses interactive mapping tools for land use projects [23].

### Inferences

* *Inference*: Because Richmond uses ArcGIS for its Paving map [1] and maintains a GeoHub [22], the underlying paving data is almost certainly accessible via an ArcGIS REST Feature Service API, which can be queried programmatically.
* *Inference*: The split in sidewalk maintenance (under 150ft vs over 150ft CIP) [19] suggests that sidewalk data is likely siloed in two different tracking systems—one for routine maintenance work orders and another for capital project management.

### Unknowns

* **Capital Projects Dataset**: It is unknown if a dedicated, comprehensive DPW Capital Improvement Projects (CIP) dataset exists on Socrata or GeoHub, similar to LA or NYC.
* **Procurement and Grants**: It is unknown which specific procurement portals or grant reporting systems Richmond uses, and whether those systems offer open APIs for integration.
* **Project Phase Fields**: It is unknown if the existing ArcGIS feature layers consistently track project status/phase fields required for a resident-facing timeline.

## Minimal Architecture for a Resident Lookup — "ETL to static feed" with zero new City systems

To avoid the maintenance risks of live API aggregation, Richmond should adopt an "ETL to static" architecture. This approach normalizes data nightly and serves it from a CDN, decoupling the user interface from source churn and rate limits.

### Proposed low-maintenance architecture

1. **Sources**: Pull data from the ArcGIS FeatureServer (e.g., the Paving app), Socrata OData endpoints, and curated CSVs/Google Sheets for static schedules (e.g., Street Cleaning, Leaf Collection).
2. **ETL (Extract, Transform, Load)**: Use a lightweight automation tool (like GitHub Actions, Azure Data Factory, or FME) to run a nightly script. This script extracts the disparate data, transforms it into a unified schema, and runs contract tests to catch schema drift.
3. **Output**: The script generates a static `rva-projects.json` (GeoJSON) file and hosts it on a highly available static host (GitHub Pages, Azure Blob, or AWS S3).
4. **User Interface**: A static Single Page Application (SPA) using MapLibre GL or ArcGIS Experience Builder points directly to the static GeoJSON URL. 

### Data model and IDs

To successfully stitch silos together, the architecture must build a framework that allows a unique location-based GIS ID to serve as a common attribute integrated into other systems [24]. 
* **Fields**: `project_uid`, `name`, `type`, `status/phase`, `geometry`, `address`, `schedule_start`, `schedule_finish`, `budget`, `source_system`, `source_url`, `last_updated`.
* **IDs**: Generate a stable `project_uid` and a normalized `location_id` (e.g., a parcel ID or centroid geohash) to allow cross-system joins without manual data manipulation [24].

### Update cadence and controls

The ETL process should run nightly to ensure data is fresh for the next day, with an on-demand rebuild trigger for urgent updates. By pulling data once per day, the system respects ArcGIS organization rate limits [10] and avoids overwhelming city servers. If an upstream source fails or changes its schema, the ETL script should fail safely and continue serving the last-known-good snapshot to residents.

## Maintenance Risk Register — Likely failures and how to mitigate them

A tool that depends on multiple data sources carries inherent maintenance risks. Designing for "safe failure" is critical.

| Risk | Evidence | Impact | Mitigation |
| :--- | :--- | :--- | :--- |
| **Schema Drift** | Chicago added `PERMIT_CONDITION` column [2]. | ETL pipeline breaks when expected fields change or disappear. | Implement contract tests in the ETL script; use schema versioning and transform adapters. |
| **API Rate Limits** | ArcGIS org query limits (10K-96K/min) [10]. | Live dashboards timeout or crash during high resident traffic. | Use the "ETL to static" architecture; throttle nightly pulls; implement exponential backoff. |
| **Access Changes** | ArcGIS secure service restrictions by referrer/IP [11]. | 403 Forbidden errors block data extraction. | Negotiate referrer allowlists with data owners; use dedicated service accounts. |
| **Format Heterogeneity** | NYC uses 16 columns [3]; Chicago uses 116 [2]. | Merge errors when combining datasets. | Enforce a minimal canonical schema; build specific mappers for each source. |
| **Ownership Turnover** | MnDOT noted data silos built by multiple staff over years [8]. | Knowledge loss when key personnel leave. | Maintain a steward registry and runbooks; document field meanings. |

## Implementation Plan — 90 days to launch v1 with DPW priorities

Richmond can ship a useful resident lookup tool in 12 weeks while laying the governance rails for future expansion.

* **Weeks 1–2 (Discovery)**: Inventory sources across DPW and IT. Confirm data stewards for Paving, Street Cleaning, and Leaf Collection. Finalize the canonical schema.
* **Weeks 3–5 (Data Engineering)**: Build the ETL adapters for ArcGIS and Socrata. Set up the nightly CI/CD pipeline (e.g., GitHub Actions). Publish the first test static feed.
* **Weeks 6–8 (Front-End)**: Build the lightweight map UI. Integrate analytics. Conduct content review with DPW stakeholders.
* **Weeks 9–10 (Testing)**: Run a beta with resident testers. Fix bugs and ensure accessibility compliance.
* **Weeks 11–12 (Launch)**: Launch the tool publicly. Publish the underlying unified dataset on the Open Data Portal. Publish the data dictionary.

**Success Metrics**: 95%+ adapter success rate nightly; <1 second load time for the static feed from the CDN; zero high-severity outages in the first 30 days.

## Governance and Sustainability — Lightweight contracts keep it working

Minimal governance prevents entropy. The City should establish lightweight data contracts per source, outlining a clear change notification path so data owners alert the dashboard team before altering schemas. Maintain a living data dictionary with documented field meanings, and establish a single communication channel (e.g., Teams/Slack) between DPW and IT GIS staff for quarterly reviews.

## Future Extensions — Add procurement and grants when ready

Once the v1 public works dashboard is stable, the architecture can be extended to include deeper financial and operational data. Future iterations should scrape or connect to procurement portal APIs to add contracting milestones. Grant IDs from reporting systems can be linked to project UIDs to show funding sources. Finally, overlaying utility and building permits (similar to Chicago's permit data [2]) will provide a comprehensive, coordinated view of all infrastructure activity in a given neighborhood.

## References

1. *Paving | Richmond*. https://www.rva.gov/public-works/paving
2. *Building Permits | City of Chicago | Data Portal*. https://data.cityofchicago.org/Buildings/Building-Permits/ydr8-5enu
3. *Capital Projects | NYC Open Data*. https://data.cityofnewyork.us/City-Government/Capital-Projects/n7gv-k5yt
4. *Leaf Collection | Richmond*. https://www.rva.gov/public-works/leaf-collection
5. *Street Cleaning | Richmond*. https://www.rva.gov/public-works/street-cleaning
6. *Data Silos: The Definitive Guide to Breaking Them Down in ...*. https://improvado.io/blog/data-silos
7. *How Cities Can Overcome Data Silos and Improve Efficiency - Open Cities Lab*. https://www.opencitieslab.org/how-cities-can-overcome-data-silos-and-improve-efficiency/
8. *GIS Tools and Apps—Integration with Asset Management*. https://mdl.mndot.gov/_flysystem/fedora/2023-02/2020ric15.pdf
9. *Assessing data governance models for smart cities: Benchmarking data governance models on the basis of European urban requirements - ScienceDirect*. https://www.sciencedirect.com/science/article/pii/S2210670725004032
10. *
	Solved: Map performance and org query maximum request rate... - Esri Community
*. https://community.esri.com/t5/arcgis-online-questions/map-performance-and-org-query-maximum-request-rate/td-p/1266328
11. *Limit usage of secure services—ArcGIS Online Help | Documentation*. https://doc.arcgis.com/en/arcgis-online/manage-data/limit-usage-of-secure-services.htm
12. *Capital Projects Explorer - Seattle.gov*. https://capitalprojects.seattle.gov/
13. *Archived BOE Capital Improvement Projects Polygons - GeoHub*. https://geohub.lacity.org/datasets/71d56c95af4e4a0a95e36b53d256df35_15/about
14. *City of Los Angeles Geohub*. https://geohub.lacity.org/
15. *City of Los Angeles Geohub*. https://geohub.lacity.org/search?bbox=-118.667989499%2C33.7045940713%2C-118.142804109%2C34.3546248901&collection=Dataset
16. *StreetSmartPHL | phila.gov - City of Philadelphia*. https://streetsmartphl.phila.gov/
17. *StreetSmartPHL - Dataset - Catalog - Data.gov*. https://catalog.data.gov/dataset/streetsmartphl
18. *Richmond’s big map of paving progress | Richmond*. https://rva.gov/city-stuff-press-releases-and-announcements/news/richmonds-big-map-paving-progress-0
19. *Sidewalk Maintenance | Richmond*. https://www.rva.gov/public-works/sidewalk-maintenance
20. *Open Data Portal | City of Richmond, Virginia | Open Data Portal | City of Richmond, Virginia*. https://data.richmondgov.com/
21. *Open Data Portal | Richmond*. https://www.rva.gov/information-technology/open-data-portal
22. *Dataset - Richmond GeoHub - ArcGIS*. https://richmond-geo-hub-cor.hub.arcgis.com/search
23. *Interactive Mapping Tools | Richmond*. https://www.rva.gov/planning-development-review/interactive-mapping-tools
24. *Leveraging GIS to Eliminate Data Silos in Governmental ...*. https://proceedings.esri.com/library/userconf/proc18/papers/136_21.pdf