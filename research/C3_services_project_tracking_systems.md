> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# Bridging Richmond DPW's Project Data Silos to Real-Time Public Maps

## Executive Summary

Richmond's Department of Public Works (DPW) project data is currently fragmented across multiple platforms, reflecting a common challenge among mid-size municipalities. The city operates a dual-permitting environment with both an EnerGov Online Permit Portal and an Accela Citizen Access portal, alongside an active ArcGIS Online organization and separate financial and grant tracking systems. This fragmented architecture implies that there is no single "system of record" for project tracking. 

However, industry stack convergence around GIS-centric work management enables near-real-time public updates. If Richmond DPW utilizes a GIS-centric Enterprise Asset Management (EAM) system like Cityworks or Cartegraph, real-time or near-real-time public project maps are highly feasible. When EAM-to-GIS integration is missing, public data usually lags by weeks. The biggest blockers to "live" public project data are governance, privacy, and licensing—not technology. For a hackathon team, the most viable strategy is to bypass internal network constraints by aggregating existing public ArcGIS layers, portal APIs, and scraped program pages into a unified, lightweight "project registry" hosted on ArcGIS Online.

## The Mid-Size DPW Systems Landscape

Most mid-size city DPW departments do not rely on a single software solution. Instead, they combine permitting software, Enterprise Asset Management (EAM) or Computerized Maintenance Management Systems (CMMS), construction project management tools, and Geographic Information Systems (GIS) to manage their workflows. 

### Common DPW Stack with Integration Hooks

The table below outlines the typical systems used by mid-size municipalities and how they surface data to public maps. GIS-centric EAMs offer direct or indirect feeds to ArcGIS, whereas construction project management tools are less map-friendly without custom ETL (Extract, Transform, Load) processes.

| Category | Typical Systems (Examples) | GIS/Public Map Integration Path |
| :--- | :--- | :--- |
| **Permitting & Planning** | Accela, Tyler EnerGov | Public portals; APIs or exports to GIS [1] [2]. |
| **EAM / Work Management** | Cityworks (Trimble), Cartegraph, Infor EAM | Cityworks eURL or database views to ArcGIS services and Dashboards [3] [4] [5] [6]. |
| **Construction PM** | e-Builder, Oracle Primavera P6, MS Project | Limited native GIS; requires ETL to ArcGIS [7]. |
| **Alternative CMMS** | eWorkOrders, PubWorks, iWorQ, Brightly Asset Essentials | Varies; some include built-in GIS modules or map-based interfaces [8] [5]. |
| **GIS** | Esri ArcGIS Online / Enterprise | Native Dashboards, Hub, and Open Data portals [9]. |

**Key Takeaway:** Systems like Cityworks and Cartegraph are explicitly designed to integrate with Esri's ArcGIS, making them the most efficient conduits for pushing internal work orders and asset data to public-facing maps.

## Evidence for Richmond's Current State

Based on publicly available information, Richmond's current data architecture relies on several distinct platforms handling different aspects of public works and development.

### EnerGov OPP with ESRI Map Integration is Live
The City of Richmond uses the EnerGov Online Permit Portal (OPP) for a wide variety of plan types, including building, electrical, mechanical, and site plans [1]. The OPP integrates directly with ESRI map functionality, allowing users to perform powerful searches, view EnerGov data, and utilize map layers and filters [10]. 

### Accela Citizen Access Portal is Active
In addition to EnerGov, Richmond operates an Accela Citizen Access portal [2]. This portal allows citizens to search building applications, planning cases, enforcement records, and licenses [2]. The presence of both EnerGov and Accela indicates a dual-system environment for permitting and code enforcement.

### ArcGIS Online Org and GeoHub Exposure
Richmond maintains a robust public GIS presence through its ArcGIS Online page (cor.maps.arcgis.com) [9]. The city hosts a Richmond GeoHub for exploring and downloading GIS datasets, alongside specific applications like the Richmond Parcel Map, Zoning Map, and FEMA Floodplain App [9]. 

### Grants and Financial Documentation are Separate
Financial and grant tracking appear disconnected from operational GIS maps. The city's Permits and Inspections page notes that the Finance Business Unit uses MUNIS to verify business licenses [11]. Furthermore, grant coordination relies on standard federal forms and a specific "City of Richmond Grant Tracking Form," indicating a separate administrative workflow for funding [12].

## How Internal Data Reaches Public ArcGIS Layers

Cities typically use one of three patterns to push internal project status changes to public ArcGIS layers. The choice of pattern dictates the lag time and reliability of the public data.

### Pattern A: Manual/Batch Updates
Data is exported from internal systems (often as CSV files) and manually uploaded to ArcGIS. This is a low-cost approach but results in high lag times and is highly fragile, as it is susceptible to schema drift (e.g., someone changing a column name in Excel) and staff turnover.

### Pattern B: Scheduled ETL
Cities use tools like Python (ArcGIS API for Python) or FME to pull data from internal databases and push it to ArcGIS on a scheduled basis (e.g., nightly or weekly). This provides a consistent update cadence and allows for automated Quality Assurance (QA) checks before data goes live.

### Pattern C: Live Feeds via eURL or ArcGIS Services
In environments using systems like Cityworks, organizations can use the Enterprise URL (eURL) feature to create a saved search that automatically generates a feature service hosted by the application [13] [6]. This service can be directly consumed by ArcGIS Dashboards [13]. If eURL is not licensed, cities often publish a series of spatial and tabular database views as map services using ArcGIS Server to accomplish the same near-real-time functionality [13].

## Data Freshness: Typical Lags and What "Real-Time" Looks Like

Without automated feeds, the typical lag between an internal project status change and a public ArcGIS layer update is 1 to 4 weeks, as updates are batched manually. However, when automated integrations are deployed, the results are transformative. 

For example, the Solid Waste Authority of Palm Beach County integrated their workflows with ArcGIS Dashboards, allowing management to monitor data in real time [14]. This modernization had a significant impact: what used to take 10 days is now completed in a single day [14]. 

**Actionable Implication:** For Richmond's public layers, expect a multi-week lag unless an automated feed is confirmed. Any public-facing dashboard must prominently display a "Last Updated" timestamp and the expected update cadence to manage citizen expectations.

## Barriers to Real-Time Transparency

The barriers to making internal project data publicly available in real time are rarely technical; they are primarily rooted in governance, privacy, and licensing.

### Privacy and Misinterpretation Risks
Protecting privacy is a complicated issue that extends beyond simply redacting personally identifiable information (PII) [15]. Cities must ensure that combinations of datasets do not inadvertently identify individuals or expose sensitive locations [15]. Furthermore, city staff often fear that releasing raw data or performance analytics will lead to negative feedback or public misinterpretation [15]. To mitigate this, cities like those in the What Works Cities initiative use "Sensitive and Secure data worksheets" to review datasets before publication and randomize sensitive location data to the block level [15].

### Organizational and QA Capacity
The structure of city government and internal capacity often hinder open data initiatives. Implementing open data requires strong leadership, quality control policies, and staff training [16]. Many cities struggle with the administrative burden of reviewing data for quality and security before release [16].

### Licensing and Integration Constraints
Even when the technology exists, licensing can be a barrier. For instance, a city using Cityworks might not have the eURL option licensed [13]. In such cases, IT departments must expend additional effort to create and publish spatial views directly from the GIS database to feed Operations Dashboards [13].

## Success Patterns and Cautionary Tales

### Palm Beach SWA: Real-Time Dashboards Compress Cycles
The Solid Waste Authority of Palm Beach County successfully bridged internal tracking and GIS by using Cityworks as its work order and asset management system [14]. By integrating workflows with ArcGIS Dashboards, they visualized preventative maintenance tasks and methane levels in real time, eliminating delays between upper management and field workers, and reducing a 10-day process to one day [14].

### St. Johns County: Cityworks + ArcGIS Improves Fleet Outcomes
St. Johns County, FL Public Works integrated ArcGIS Enterprise with Cityworks to create a GIS-powered fleet management system [17]. The use of dashboards and automation improved preventive maintenance compliance, reduced downtime, and saved costs [17].

### Caution: Plan for Licensing Gaps
When relying on vendor-specific integrations like Cityworks eURL, verify licensing first. As noted in an Esri user conference paper, if eURL is not licensed, the technical approach must shift to publishing spatial and non-spatial database views, which is more complex and time-consuming [13].

## Richmond Architecture Hypothesis

*(Note: The following are inferences based on the public artifacts cited above).*

Richmond's reference to "multiple platforms — ArcGIS maps, program pages, grant documentation, and internal tracking tools" implies a hub-and-spoke data architecture lacking a centralized project system of record. 
* **ROW and Construction Impacts:** Likely managed across the dual EnerGov and Accela environments.
* **Work Orders/Assets:** Likely managed in an EAM (potentially Cityworks or Cartegraph) or via internal spreadsheets.
* **Funding:** Managed separately in MUNIS and tracked via static grant documents.
* **Presentation:** ArcGIS Online serves as the presentation layer, but it is likely fed manually or semi-manually from these disparate spokes.

### Proposed Minimal Schema for a Unified Registry
To bridge these silos, Richmond needs a lightweight "project registry" schema that can reconcile data across systems. The core fields should include:
* Project ID (with source system prefix, e.g., ENG-1234)
* Project Title & Description
* Location Geometry (Point/Line/Polygon)
* Phase (Planning, Design, Construction, Complete)
* Status Date & Last Updated Timestamp
* Funding Source(s)
* Department Owner
* Source System (EnerGov, Accela, EAM, etc.)

## Hackathon Data Strategy

For a hackathon team operating with a 48-hour window and no internal network access, the strategy must focus on aggregating existing public data and layering in automation.

### Step-by-Step Execution Plan
1. **Inventory Public Endpoints:** Start with Richmond's ArcGIS Online organization (cor.maps.arcgis.com) and the Open Data/GeoHub [9]. Identify existing capital project or infrastructure layers.
2. **Scrape and Enrich:** Scrape public DPW program pages for project lists. Capture the source URLs as provenance metadata.
3. **Normalize Data:** Map the disparate data sources to the proposed minimal schema (Project ID, Title, Phase, Geometry, etc.).
4. **Build the ETL:** Write a Python script (using the ArcGIS API for Python) to pull from these public endpoints, normalize the data, and push it to a new, unified Hosted Feature Layer in ArcGIS Online. 
5. **Publish the Dashboard:** Create an ArcGIS Dashboard pointing to this unified layer. Include filters for project phase, funding source, and district. 
6. **Ensure Transparency:** Prominently display a "Last Updated" metric on the dashboard and document the field whitelist and privacy rules used to generate the data.

### Risks and Mitigations
* **Schema Drift:** Manual CSV uploads or scraped pages will change formats. *Mitigation:* Lock the schema in the Python ETL and build validation tests that flag errors rather than breaking the dashboard.
* **Token Expiration:** If accessing secured APIs, tokens will expire. *Mitigation:* Use service principals for authentication and monitor token health.

### Decision Points to Validate with DPW/IT (Post-Hackathon)
To scale this prototype into a production system, the team must validate the following with Richmond IT/DPW:
1. Which system (EnerGov or Accela) is the ultimate authority for Right-of-Way (ROW) and street cut permits?
2. Is a GIS-centric EAM (like Cityworks or Cartegraph) currently in use, and is the eURL/API feature licensed?
3. Who will act as the data steward to maintain the project registry schema?

## References

1. *Online Permit Portal | Richmond*. https://www.rva.gov/planning-development-review/online-permit-portal
2. *
	
        Accela Citizen Access
    
*. https://aca-prod.accela.com/richmond/Default.aspx
3. *Accela vs Trimble (Cityworks) 2026 | Gartner Peer Insights*. https://www.gartner.com/reviews/market/enterprise-asset-management-software/compare/accela-vs-cityworks
4. *Asset and Work Management for Public Sector | Data Sheet | Infor*. https://www.infor.com/resources/asset-and-work-management-for-public-sector
5. *Best Public Works Software for Mid Size Business of 2026 - Reviews & Comparison*. https://sourceforge.net/software/public-works/for-mid-size-business/
6. *How to Visualize Data with ArcGIS Dashboards and Cityworks eURL | Trimble Resource Center*. https://assetlifecycle.trimble.com/blog/en-US/article/how-to-visualize-data-with-arcgis-dashboards-and-cityworks-eurl
7. *Oracle Primavera vs. e-Builder Enterprise Comparison*. https://sourceforge.net/software/compare/Oracle-Primavera-vs-e-Builder-Enterprise/
8. *Top 10 CMMS for Public Works with GIS & Mapping Needs*. https://eworkorders.com/cmms-for-public-works/
9. *Richmond, VA - ArcGIS Online*. https://cor.maps.arcgis.com/
10. *City Of Richmond Online Permit Portal User Guide*. https://www.rva.gov/sites/default/files/2019-12/OPP%20User%20Guide.pdf
11. *Permits and Inspections | Richmond*. https://www.rva.gov/planning-development-review/permits-and-inspections
12. *Grants | Richmond*. https://www.rva.gov/budget-and-strategic-planning/grants
13. *Building Momentum with Operations Dashboard for ArcGIS*. https://proceedings.esri.com/library/userconf/proc18/papers/348_94.pdf
14. *SWA of Palm Beach County Manages Waste with ArcGIS | Case Study*. https://www.esri.com/en-us/lg/industry/public-works/stories/palm-beach-swa-manages-waste-with-arcgis-case-study
15. *  Open data by default: Challenging but worth it : Sunlight Foundation*. https://sunlightfoundation.com/2017/05/16/open-data-by-default-challenging-but-worth-it/
16. *City Open Data Policies*. https://www.nlc.org/wp-content/uploads/2016/12/CSAR-Open-Data-Report-FINAL.pdf
17. *St. Johns County Digitally Transforms Fleet Manage...*. https://community.esri.com/t5/esri-public-works-blog/st-johns-county-digitally-transforms-fleet/ba-p/1686296