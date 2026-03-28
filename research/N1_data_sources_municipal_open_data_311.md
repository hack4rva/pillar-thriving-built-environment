> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# Building the City-Service Tracker: A Cross-City Playbook of Open-Data Assets & APIs (2026)

## Executive Summary

The foundation of a robust public service tracking prototype relies on the successful ingestion, normalization, and analysis of municipal open data. An analysis of open data portals across seven major US cities—Chicago, Los Angeles, New York City, Boston, Philadelphia, Washington DC, and Richmond—reveals a rich but highly fragmented ecosystem of 311 service requests, building permits, and infrastructure projects. 

While 311 data is universally available, the delivery mechanisms vary drastically, ranging from Socrata OData endpoints in Chicago [1] to Carto SQL APIs in Philadelphia [2] and CKAN platforms in Boston [3]. Update frequencies are generally excellent, with most major 311 and permit datasets refreshing daily or even multiple times per day [4] [1] [3] [2]. However, developers must navigate significant structural shifts, such as Boston's ongoing transition to a new 311 backend system that splits data across legacy and new schemas [3]. By combining these municipal feeds with federal overlays like the Highway Performance Monitoring System (HPMS) [5] and TIGER/Line shapefiles [6], we can build a highly contextualized service tracker. This playbook outlines the critical datasets, access patterns, and a recommended 5-dataset "starter kit" to accelerate prototype development.

## Municipal Open-Data Landscape

### City-by-City Infrastructure and Service Datasets

Municipalities publish a wealth of infrastructure and service data, but the scale and platform choices differ significantly. Socrata is the dominant platform for tabular data, while ArcGIS Hubs are frequently used for spatial and project-based data.

| City | Key Dataset | Platform | Record Count | Update Frequency | Key Fields |
|---|---|---|---|---|---|
| **Chicago** | 311 Service Requests | Socrata | 13.5M | Multiple times per day | SR_NUMBER, SR_TYPE, STATUS, CREATED_DATE [1] |
| **Chicago** | Building Permits | Socrata | 830K | Daily | PERMIT#, PERMIT_TYPE, ISSUE_DATE [4] |
| **Los Angeles** | MyLA311 Service Requests (2025) | Socrata | 423K | Daily | SRNumber, RequestType, ActionTaken, Status [7] |
| **Los Angeles** | Scheduled Proposed Street Resurfacing | ArcGIS GeoHub | 388 | N/A (Published 2015, Info Updated 2020) | N/A [8] |
| **Boston** | Approved Building Permits | CKAN | N/A | Daily | issued_date, status (Issued, Open, Closed, Stop work) [9] |
| **Philadelphia** | L&I Building and Zoning Permits | Carto | N/A | Daily | lat, lng, the_geom [10] |
| **Washington DC** | Construction Permits (via DDOT TOPs) | Open Data DC (ArcGIS) | N/A | Updated 3/25/2026 | N/A [11] |

*Takeaway: Chicago and Los Angeles provide the most transparent row counts and schema definitions directly on their portal front-ends, making them ideal primary targets for initial ingestion.*

### Common Categories and Structural Gaps

Across the surveyed cities, the most commonly available datasets fall into three categories: 311 service requests [12] [1] [3] [2], building and construction permits [4] [9] [10] [11], and capital/infrastructure projects [13] [8]. 

However, data freshness can be a risk factor for infrastructure projects. While 311 and permit data are typically updated daily [4] [3] [2], specific project layers like Los Angeles' Scheduled Proposed Street Resurfacing Projects show a publication date of 2015 with an info update in 2020 [8]. This indicates that while reactive data (complaints and permits) is highly automated, proactive planning data (capital projects) may require manual updates and is prone to staleness.

## 311 Service-Request Ecosystem

### Volume and Schema Variations Across Municipalities

311 datasets represent the core of any public service tracker, capturing constituent complaints ranging from potholes to graffiti. The volume of this data is massive: Chicago's portal hosts 13.5 million 311 records dating back to December 2018 (including some legacy records) [1], while Los Angeles' dedicated 2025 dataset alone contains 423,000 rows [7]. Philadelphia's dataset encompasses all requests since December 8, 2014 [2].

| City | Dataset Name | Total Columns | Example Status Values | Geographic Identifiers |
|---|---|---|---|---|
| **Chicago** | 311 Service Requests | 39 | N/A | STREET_ADDRESS, CITY, STATE, ZIP_CODE [1] |
| **Los Angeles** | MyLA311 Service Request Data 2025 | 34 | Open, Pending, Forward, Closed, Canceled, Referred Out | AddressVerified (Y/N) [7] |
| **Boston** | 311 Service Requests | N/A | N/A | Location (Boston all) [3] |

*Takeaway: While the core concept of a 311 ticket is universal, the schemas are highly localized. A successful prototype must implement a normalization layer to map fields like Chicago's `SR_NUMBER` [1] and LA's `SRNumber` [7] to a unified internal ID.*

### Quality Issues and System Migrations

Data quality and structural consistency are ongoing challenges. Boston provides a prime example of system migration risks: starting in October 2025, Boston began transitioning its 311 service requests to a new backend system [3]. During this transition, cases are split between a legacy dataset ("311 Service Requests - 2025") and a new dataset ("311 Service Requests - NEW SYSTEM"), depending on the service type [3]. The city anticipates the transition will last until mid-2026, requiring developers to use a Data Transition Guide to merge the two differently structured datasets [3]. 

## Federal & National Complementary Datasets

To elevate the prototype from a simple complaint viewer to a strategic analytical tool, municipal data must be joined with federal datasets that provide geographic boundaries and infrastructure health context.

| Federal Agency | Dataset | Description | Value to Prototype |
|---|---|---|---|
| **Census Bureau** | TIGER/Line Shapefiles | Geographic entity codes and boundaries (available for all 50 states, DC, and Puerto Rico) [6] [14]. | Essential for mapping 311 coordinates to standardized census tracts and neighborhoods. |
| **FHWA (DOT)** | Highway Performance Monitoring System (HPMS) | National level highway information system including data on extent, condition, performance, and use [5]. | Allows correlation of local street complaints with federal highway condition metrics. |
| **FHWA (DOT)** | National Bridge Inventory (NBI) | Database of bridge conditions, currently transitioning to a new data standard and web application [15]. | Enables cross-referencing of 311 structural complaints with official federal bridge inspection statuses. |

*Takeaway: Federal datasets provide the necessary macro-level context, but developers must account for ongoing federal system upgrades, such as the NBI's transition to new data standards [15].*

## Access Methods & Technical Stack

### API Protocols and Bulk Export Capabilities

Municipalities utilize a variety of platforms to serve their data, each with distinct API protocols and export limitations. 

| Platform | Primary API Protocol | Bulk Export Formats | Example City Usage |
|---|---|---|---|
| **Socrata** | OData (V2/V4) / SODA | CSV, GeoJSON (via Carto integration) | Chicago [4] [1], Los Angeles [7] |
| **Carto** | SQL API | CSV, SHP, GeoJSON | Philadelphia [2] [10] |
| **CKAN** | Action API (datastore_search) | CSV | Boston [3] [9] |
| **ArcGIS** | FeatureServer REST API | CSV, KML, Shapefile | Washington DC [11], Los Angeles GeoHub [8] |

*Takeaway: The prototype's ingestion engine must support at least three distinct API paradigms (OData, Carto SQL, and CKAN Action API) to achieve cross-city compatibility.*

### Handling Large-Scale Data Retrieval

Directly downloading massive datasets via browser is often impractical. For instance, Philadelphia explicitly warns that its 311 dataset is "very large" and recommends using the Carto SQL API rather than direct downloads unless users are comfortable with APIs [2]. Similarly, Chicago's building permits dataset contains over 830,000 rows and cannot be viewed in full in Microsoft Excel; the city advises downloading it as a CSV and opening it in an ASCII text editor like Wordpad [16]. To handle this, the prototype must utilize API pagination and incremental daily updates rather than full historical bulk downloads.

## Data-Quality Assessment Framework

To ensure the prototype delivers reliable insights, each data source must be evaluated on timeliness, completeness, and structural stability.

* **Timeliness (High)**: Chicago's 311 data is updated multiple times per day [1]. Philadelphia's 311 and Permit datasets are updated daily [2] [10]. Boston's 311 and Permit datasets are updated daily [3] [9].
* **Completeness (Medium)**: While row counts are high, geographic completeness varies. Los Angeles includes an `AddressVerified` field to indicate if the address was within city boundaries and validated with GIS data [7], which is a best practice other cities lack.
* **Structural Stability (Low to Medium)**: Boston's mid-flight transition between 311 backend systems [3] and the FHWA's transition to a new NBI data standard [15] introduce significant schema instability that requires active maintenance.

## Starter-Kit Recommendation

To build the initial service tracker prototype, we recommend starting with the following five datasets. This combination balances high-volume reactive data (311) with proactive infrastructure data (permits), spanning multiple API architectures to thoroughly test the ingestion pipeline.

1. **Chicago 311 Service Requests**: With 13.5 million rows and intra-day updates [1], this is the ultimate stress test for volume and OData ingestion.
2. **Los Angeles MyLA311 (2025)**: Provides a clean, single-year slice (423K rows) with excellent status tracking (Open, Pending, Forward, Closed) and address verification flags [7].
3. **Philadelphia 311 Requests**: Essential for testing the Carto SQL API integration, providing a massive historical dataset dating back to 2014 [2].
4. **Boston Approved Building Permits**: Tests the CKAN API architecture and provides clear status milestones (Issued, Open, Closed, Stop work) [9].
5. **Census TIGER/Line Shapefiles**: The mandatory federal geographic baseline required to map the municipal data points into standardized tracts [6].

## Top API Reference & Code Snippets

The following code snippets demonstrate how to programmatically access the top recommended APIs using standard HTTP requests.

### 1. Chicago 311 Service Requests (Socrata OData)
Chicago utilizes Socrata, which supports OData endpoints [1].
```bash
# Fetch the first 1000 records using Socrata's standard JSON endpoint
curl "https://data.cityofchicago.org/resource/v6vf-nfxy.json?\$limit=1000"
```

### 2. Philadelphia 311 Requests (Carto SQL API)
Philadelphia relies on Carto's SQL API, allowing standard SQL queries directly in the URL [2].
```bash
# Fetch 2025 requests using the Carto SQL API
curl -g "https://phl.carto.com/api/v2/sql" \
 --data-urlencode "q=SELECT * FROM public_cases_fc WHERE requested_datetime >= '2025-01-01' LIMIT 1000"
```

### 3. Boston 311 Service Requests (CKAN API)
Boston uses CKAN, which requires interacting with the `datastore_search` action API [3].
```bash
# Query the Boston CKAN datastore (requires the specific resource_id)
curl -g "https://data.boston.gov/api/3/action/datastore_search" \
 --data-urlencode "resource_id=1a0b420d-99f1-4887-9851-990b2a5a6e17" \
 --data-urlencode "limit=1000"
```

## Recommendations & Next Steps

To move from research to a functional prototype, the engineering team should execute the following roadmap:

1. **Build a Unified Ingestion Wrapper**: Develop a middleware service capable of translating Socrata OData [1], Carto SQL [2], and CKAN Action APIs [3] into a single, normalized JSON schema.
2. **Implement Incremental Updates**: Because datasets like Chicago's 311 contain 13.5 million rows [1], the system must rely on `CREATED_DATE` or `LAST_MODIFIED_DATE` fields to fetch only new records daily, rather than attempting full historical pulls.
3. **Develop a Schema-Mapping Dictionary**: Create a configuration file that maps disparate status codes (e.g., Boston's "Stop work" [9] vs. LA's "Canceled" [7]) to a standardized internal taxonomy.
4. **Monitor Boston's Transition**: Assign a developer to track Boston's 311 system migration (scheduled to complete mid-2026) to ensure the prototype seamlessly merges the legacy and new datasets using the city's Data Transition Guide [3].

## Appendices

### Appendix A: Master Dataset Catalog

| City | Dataset Name | Source URL / Portal | Format / API | Update Freq | Record Count |
|---|---|---|---|---|---|
| Chicago | 311 Service Requests | data.cityofchicago.org | Socrata / OData | Multiple/Day | 13.5M [1] |
| Chicago | Building Permits | data.cityofchicago.org | Socrata / OData | Daily | 830K [4] |
| Los Angeles | MyLA311 Data 2025 | data.lacity.org | Socrata / OData | Daily | 423K [7] |
| Los Angeles | Scheduled Resurfacing | geohub.lacity.org | ArcGIS | Static (2020) | 388 [8] |
| Boston | 311 Service Requests | data.boston.gov | CKAN | Daily | N/A [3] |
| Boston | Approved Building Permits | data.boston.gov | CKAN | Daily | N/A [9] |
| Philadelphia | 311 Service Requests | opendataphilly.org | Carto SQL | Daily | N/A [2] |
| Philadelphia | L&I Building Permits | opendataphilly.org | Carto SQL | Daily | N/A [10] |
| Washington DC | Construction Permits | opendata.dc.gov | ArcGIS | Periodic | N/A [11] |
| Washington DC | 311 Service Requests | opendata.dc.gov | ArcGIS | N/A | N/A [17] |
| New York City | 311 Service Requests | data.cityofnewyork.us | Socrata | N/A | N/A [12] |
| New York City | Capital Projects | data.cityofnewyork.us | Socrata | N/A | N/A [13] |
| Richmond | Open Data Portal | data.richmondgov.com | N/A | N/A | N/A [18] |
| Federal | TIGER/Line Shapefiles | census.gov | Shapefile | Annual | N/A [6] |
| Federal | HPMS | fhwa.dot.gov | Geospatial/Tables | N/A | N/A [5] [19] |
| Federal | NBI | fhwa.dot.gov | Web Application | N/A | N/A [15] |

## References

1. *311 Service Requests | City of Chicago | Data Portal*. https://data.cityofchicago.org/Service-Requests/311-Service-Requests/v6vf-nfxy
2. *311 Service and Information Requests - Philadelphia*. https://opendataphilly.org/datasets/311-service-and-information-requests/
3. *311 Service Requests - Dataset - Analyze Boston*. https://data.boston.gov/dataset/311-service-requests
4. *Building Permits | City of Chicago | Data Portal*. https://data.cityofchicago.org/Buildings/Building-Permits/ydr8-5enu
5. *Highway Performance Monitoring System (HPMS)*. https://www.fhwa.dot.gov/policyinformation/hpms.cfm
6. *TIGER/Line Shapefiles - Census Bureau*. https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html
7. *MyLA311 Service Request Data 2025 | Los Angeles*. https://data.lacity.org/City-Infrastructure-Service-Requests/MyLA311-Service-Request-Data-2025/h73f-gn57
8. *Scheduled Proposed Street Resurfacing Projects*. https://geohub.lacity.org/datasets/scheduled-proposed-street-resurfacing-projects
9. *Approved Building Permits - Dataset - Analyze Boston*. https://data.boston.gov/dataset/approved-building-permits
10. *Licenses and Inspections Building and Zoning Permits*. https://opendataphilly.org/datasets/licenses-and-inspections-building-and-zoning-permits/
11. *Dataset - Open Data DC - DC.gov*. https://opendata.dc.gov/datasets
12. *311 Service Requests from 2020 to Present | NYC Open Data*. https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2020-to-Present/erm2-nwe9
13. *Capital Projects | NYC Open Data*. https://data.cityofnewyork.us/City-Government/Capital-Projects/n7gv-k5yt
14. *2020 TIGER/Line Shapefiles - Census Bureau*. https://www.census.gov/geographies/mapping-files/2020/geo/tiger-line-file.html
15. *National Bridge Inventory (NBI) - Federal Highway Administration*. https://www.fhwa.dot.gov/bridge/nbi.cfm
16. *Building Permits*. https://www.chicago.gov/city/en/depts/bldgs/dataset/building_permits.html
17. *311 City Service Requests in 2026 - Open Data DC*. https://opendata.dc.gov/search?q=311
18. *Richmond Open Data Portal*. https://data.richmondgov.com/
19. *Data Access for Highway Performance Monitoring System (HPMS)*. https://data.transportation.gov/stories/s/Data-Access-for-Highway-Performance-Monitoring-Sys/3uu4-47sa/