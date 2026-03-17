# Connecting Grants to Pavement: Actionable Funding Intelligence for Richmond DPW Projects

## Executive Summary

The City of Richmond successfully stacks multiple federal and state grant programs across its transportation infrastructure, creating a rich, documentable funding trail. Programs including TIGER, RAISE, SS4A, RCP, CMAQ, and TAP are actively funding Richmond Department of Public Works (DPW) projects. However, federal dollars are catalytic and rarely cover total project costs, meaning funding stacks now define the true project story. 

For a hackathon team looking to enrich Richmond's GeoHub data, the most actionable strategy is to use Virginia Department of Transportation (VDOT) Universal Project Codes (UPC) as the primary key to join City project pages, VDOT's Six-Year Improvement Program (SYIP), and spatial data. While GeoHub provides the physical geometries of transportation surfaces, grant data provides the critical "why" and "how much" context. By prioritizing structured, high-signal sources like USDOT award fact sheets and City project pages over deep federal award crawls, teams can rapidly build a "Federal Program Tag" to contextualize project markers (e.g., "Funded by a $18.4M federal RAISE grant").

## Why This Matters Now — Turning Public Grants into Actionable Project Context

Richmond possesses a deep, public trail of federal and state infrastructure funds. Connecting these dollars to specific streets, bridges, and corridors will immediately upgrade the City's GeoHub and stakeholder communications. Currently, Richmond GeoHub provides extensive spatial datasets, such as "Transportation Surfaces," which map parking lots, driveways, sidewalks, medians, and alleys [1]. However, these datasets primarily offer physical geometries and lack the financial and strategic narratives that explain why a project exists [1] [2].

**Inference:** By integrating public grant documentation with existing spatial data, developers and city planners can transform a simple map of paved surfaces into a dynamic dashboard of civic investment. This allows the public to see exactly where their tax dollars are going, highlights equity-focused investments in historically underserved areas, and provides a transparent view of how federal, state, and local funds are stacked to deliver complex multimodal projects.

## Federal Programs Funding Richmond DPW — What's Active, How Much, and Where

At least six distinct federal programs have funded City of Richmond projects with publicly accessible documentation. These streams enable complementary investments across capital builds, safety planning, and traffic operations.

### Active Federal Programs in Richmond

| Federal Program | Project Example | Federal Award Amount | Total Project Cost | Primary Focus |
| :--- | :--- | :--- | :--- | :--- |
| **TIGER** (2014) | Broad Street Bus Rapid Transit (BRT) | $24.9M | ~$50M | Capital construction, transit connectivity [3] |
| **RAISE** (2022) | Arthur Ashe Boulevard Bridge Replacement | $18.4M | $23M - $48M | Multimodal bridge replacement, safety [4] [5] |
| **SS4A** (2026) | Citywide Vision Zero Safety Planning | $762,400 | $953,000 | Safety planning, speed management [6] |
| **RCP** (2022/2023) | Reconnect Jackson Ward | $1.35M | $1.69M | Equity, community reconnection planning [7] [8] |
| **CMAQ** | Richmond Signal System (RSS) Phase IV | $5.488M | N/A | Traffic operations, emissions reduction [9] |
| **TAP** | Canal Walk Improvements Phase II | N/A (Code: TAP5A27) | N/A | Bicycle and pedestrian infrastructure [10] |

*Key Takeaway: Richmond leverages a diverse portfolio of federal grants, meaning any comprehensive data integration must account for multiple USDOT sub-agencies and program types.*

### Evidence Briefs

* **TIGER (Transportation Investment Generating Economic Recovery):** In 2014, Richmond received a $24.9 million TIGER grant for the Greater Richmond Transit Company to construct 7.6 miles of the Broad Street Bus Rapid Transit line [3]. The total project was expected to cost approximately $50 million [3].
* **RAISE (Rebuilding American Infrastructure with Sustainability and Equity):** Richmond was awarded $18.4 million to replace the over 100-year-old Arthur Ashe Boulevard bridge over the CSX Railroad [5] [11]. While USDOT lists the estimated total cost at $23 million [5], the City reports a $48 million total cost after stacking RAISE funds with GO Bonds, CSX contributions, and $13 million from the Central Virginia Transportation Authority (CVTA) [4].
* **SS4A (Safe Streets and Roads for All):** The DPW was awarded a $762,400 grant (matched by $190,600 in city funds for a $953,000 total) to focus on five safety planning initiatives, including managing speed and conducting roadway safety assessments [6].
* **RCP (Reconnecting Communities Pilot):** Richmond received a $1.35 million grant for planning and design to reconnect Jackson Ward, a historic Black community separated by Interstates 95 and 64 in the 1950s [7] [8].
* **CMAQ (Congestion Mitigation and Air Quality):** The Richmond Signal System Phase IV project (UPC 118148) utilizes $5,488,000 in federal CMAQ funds to expand the traffic signal communication network [9]. PlanRVA confirms the region qualifies for CMAQ funds through an Ozone Advance agreement [12].
* **TAP (Transportation Alternatives Program):** TAP funding is present but often hidden in project codes. The Canal Walk Improvements Project Phase II lists a Federal CN number of "TAP5A27 (979)" for bicycle and pedestrian infrastructure [10].

## State/Regional Funding and Project Records — The Integration Anchors

**Inference:** Federal data alone is insufficient because it rarely tracks a project through its entire lifecycle. VDOT project pages, SYIP links, and SMART SCALE portals provide the Universal Project Codes (UPC), schedules, and updated costs needed to unify disparate datasets.

### State and Regional Data Sources

| Source | Key Data Provided | Richmond Example |
| :--- | :--- | :--- |
| **VDOT Projects Search** | Status, estimated completion, estimated cost, category, UPC | I-95/Belvidere Street interchange improvements ($11M cost, completed May 2024) [13] |
| **CTB SYIP Database** | Six-year funding allocations tied to UPCs | RSS Phase IV links directly to SYIP line item 1708718 [9] |
| **SMART SCALE Portal** | Project applications, scores, and recommended funding scenarios | Round 6 recommended 14 applications in the Richmond district for $338.4M [14] |
| **CVTA Announcements** | Supplemental regional funding rounds that complete the "capital stack" | $14M awarded for Shockoe Valley Streets Improvements (total $54M) [4] |

*Key Takeaway: The VDOT UPC is the critical linchpin. It allows developers to cross-reference a City press release with state-level financial tracking.*

## Data Source Usability for a Hackathon — What to Pull First

For a 48-hour hackathon, teams must prioritize fast, structured, high-signal sources and defer deep, exploratory federal award crawls (like USASpending.gov) which have higher query costs and complex data structures.

### Source Triage Strategy

| Priority Level | Data Source | Usability & Extraction Method |
| :--- | :--- | :--- |
| **Pull First** | USDOT Award Fact Sheets (PDFs) | High. Extract RAISE and RCP project descriptions, award amounts, and total costs [8] [5]. |
| **Pull First** | USDOT SS4A Map/CSV | High. Download cumulative awards to capture planning vs. capital grants [15]. |
| **Pull First** | City of Richmond Project Pages | High. Scrape for UPCs, funding program mentions (CMAQ, TAP), and manager contacts [9] [10]. |
| **Pull First** | VDOT Projects Search | High. Filter by "Richmond District" to scrape status, cost, and schedule [13]. |
| **Pull Later** | USASpending.gov | Low/Medium. Use only for a handful of flagship projects to demo federal award IDs if time permits. |
| **Pull Later** | CTB Meeting Minutes | Low. Unstructured PDFs require heavy NLP to extract historical transfers [16] [14]. |

*Key Takeaway: Start with USDOT PDFs and City/VDOT web tables to build the core database, then use APIs for enrichment.*

## Typical Project-Level Fields Available — What You Can Reliably Show

By combining federal, state, and local sources, a hackathon team can reliably populate a comprehensive schema for Richmond infrastructure projects.

### Field Availability by Source

| Field | Primary Source | Example Value |
| :--- | :--- | :--- |
| **Award Amount** | USDOT Program Pages / City Press | $18,400,000 [5] |
| **Funding Program** | USDOT / City Project Pages | RAISE [5] |
| **Total Estimated Cost** | VDOT Search / City Press | $48,000,000 [4] |
| **Project Description** | USDOT Fact Sheets / City Pages | Replace multimodal bridge over CSX [5] |
| **UPC (Identifier)** | VDOT Search / City Pages | 118148 [9] |
| **Status / Schedule** | VDOT Search | In design; Est. Completion Fall 2028 [17] |
| **Co-Funders** | City Press Releases | CVTA, GO Bond, CSX [4] |

*Key Takeaway: No single source provides all fields. A relational database joining City data (co-funders) with VDOT data (schedule) and USDOT data (federal award) is required.*

## Integration Plan with GeoHub — From Geometry to Grant Narrative

GeoHub can be reliably enriched and validated, but not replaced, by grant data. GeoHub provides the spatial polygons and lines (e.g., 167,567 records of transportation surfaces [1]), while grant sources provide the context.

### Step-by-Step Integration Workflow

1. **Seed the Database:** Start with the six flagship projects identified in this report (BRT, Arthur Ashe Bridge, Jackson Ward, SS4A Citywide, RSS Phase IV, I-95/Belvidere).
2. **Normalize Identifiers:** Capture the VDOT UPC from City pages [9]. If no UPC exists, normalize the project name and corridor strings.
3. **Join to State Data:** Use the UPC to query the VDOT SYIP and VDOT Projects Search to pull the latest schedule and estimated costs [13] [9].
4. **Spatial Anchoring:** Cross-reference the corridor or intersection with GeoHub data. If exact geometry is missing, generate a centroid point with an "approximate_geometry" boolean flag set to true.
5. **Build the Funding Stack:** Create an array field for funding that includes the program, amount, year, and co-funders (e.g., CVTA, GO Bonds) [4].
6. **Contextualize:** Generate a front-end callout string: *"This project is funded by a [Amount] federal [Program] grant."*

## Known Richmond Projects with Public Federal Documentation — Ready-to-Tag Pilots

These six high-visibility projects have robust public documentation and should serve as the pilot dataset for any hackathon prototype.

### Pilot Project Seed List

| Project Name | Federal Program | Federal Award | Total Cost | Location / Scope | Source |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GRTC Pulse BRT** | TIGER (2014) | $24.9M | ~$50M | Broad Street corridor | [3] |
| **Arthur Ashe Blvd Bridge** | RAISE (2022) | $18.4M | $48M | Over CSX ACCA Yard | [4] [5] |
| **Reconnect Jackson Ward** | RCP (2022) | $1.35M | $1.69M | I-95/64 divide | [7] [8] |
| **Vision Zero Initiatives** | SS4A (2026) | $762,400 | $953,000 | Citywide safety planning | [6] |
| **Richmond Signal System IV** | CMAQ | $5.488M | N/A | North/East signal network | [9] |
| **Canal Walk Phase II** | TAP | N/A | N/A | Shockoe Bottom to Brown's Island | [10] |

## Risks, Gaps, and Cautionary Examples — How to Avoid Mislabeling

**Inference:** The greatest risk in parsing public grant data is conflating partial phase funding with total project costs, which can lead to public misinformation regarding budget shortfalls or surpluses.

* **Phase vs. Total Cost Confusion:** Federal grants often fund specific phases. For example, the RAISE fact sheet lists the Arthur Ashe Bridge total cost at $23 million [5], while the City shows a $48 million funded stack after adding CVTA and local funds [4]. 
 * *Mitigation:* Implement dual fields for `Award_Amount` and `Total_Estimated_Cost`, and mandate an `as_of_date` metadata tag for all financial figures.
* **Planning vs. Capital Grants:** Programs like SS4A and RCP frequently award planning grants before capital grants. The $1.35M RCP award for Jackson Ward is explicitly for "future planning and design" [7], not construction.
 * *Mitigation:* Create a `Program_Type` tag (Enum: Planning, Capital, Operations, Safety) to set proper public expectations.
* **Hidden Program Codes:** TAP funding is rarely spelled out in press releases. It appears as federal CN codes (e.g., TAP5A27) [10].
 * *Mitigation:* Use regex pattern matching on City project pages to auto-flag TAP funding when explicit labels are absent.

## Action Plan for a 48-Hour Hackathon — Minimum Viable Enrichment

A focused pull-and-join sequence can produce credible, source-linked funding tags across priority projects within a weekend.

### Day 1: Data Ingestion and Normalization
* Ingest USDOT RAISE fact sheets (PDF) and SS4A cumulative awards (CSV) [15] [5].
* Scrape City of Richmond DPW project pages for funding mentions, UPCs, and TAP codes [9] [10].
* Scrape VDOT Projects Search for Richmond-local items to capture baseline status and costs [13].
* Seed the database with the six pilot projects and normalize the schema.

### Day 2: Joining and Visualization
* Execute UPC joins between City data and VDOT SYIP/Projects data.
* Create approximate geometries (lat/long centroids) for projects lacking exact GeoHub polygons.
* Publish the enriched dataset via API/CSV.
* Build a simple map interface demonstrating the one-click context feature (e.g., clicking a bridge shows its $18.4M RAISE grant and $48M total stack).

## Appendices — Evidence and Field Mapping

### Appendix A: Source Index
* **USDOT:** TIGER 2014 Press Release [3]; RAISE 2022 Fact Sheets [5]; SS4A Cumulative Awards [15]; RCP FY22 Fact Sheets [8].
* **City of Richmond:** CVTA Funding Press Release [4]; SS4A Award Press Release [6]; Reconnect Jackson Ward Page [7]; RSS Phase IV Page [9]; Construction Projects Page [10].
* **State/Regional:** VDOT Projects Search [13]; PlanRVA CMAQ Overview [12]; SMART SCALE Round 6 Results [14].

### Appendix B: Proposed JSON Schema
```json
{
 "project_name": "string",
 "upc": "integer",
 "location_description": "string",
 "latitude": "float",
 "longitude": "float",
 "approximate_geometry": "boolean",
 "funding_stack": [
 {
 "program": "enum (RAISE, TIGER, CMAQ, TAP, SS4A, RCP, CVTA)",
 "award_amount_usd": "integer",
 "award_year": "integer",
 "funding_type": "enum (Federal, State, Regional, Local)"
 }
 ],
 "total_project_cost_usd": "integer",
 "status": "string",
 "est_completion": "string",
 "sources": ["url_strings"],
 "as_of_date": "YYYY-MM-DD"
}
```

## References

1. *Transportation Surfaces - Richmond GeoHub - ArcGIS*. https://richmond-geo-hub-cor.hub.arcgis.com/datasets/transportation-surfaces-2
2. *Richmond GeoHub*. https://richmond-geo-hub-cor.hub.arcgis.com/
3. *U.S. Transportation Secretary Foxx Announces $24.9 Million in TIGER Funds for Richmond Bus Rapid Transit | US Department of Transportation*. https://www.transportation.gov/briefing-room/us-transportation-secretary-foxx-announces-249-million-tiger-funds-richmond-bus-rapid
4. *Richmond Advances Infrastructure Improvements with Support from the Central Virginia Transportation Authority | Richmond*. https://www.rva.gov/press-releases-and-announcements-public-works/news/richmond-advances-infrastructure-improvements
5. *Raise Grants Fact Sheets*. https://www.transportation.gov/sites/dot.gov/files/2022-09/RAISE%202022%20Award%20Fact%20Sheets_1.pdf
6. *City Awarded $762,400 Safe Streets and Roads for All Grant | Richmond*. https://www.rva.gov/press-releases-and-announcements-public-works/news/city-awarded-762400-safe-streets-and-roads-all
7. *Reconnect Jackson Ward | Richmond*. https://www.rva.gov/planning-development-review/reconnect-jackson-ward
8. *Reconnecting Communities Pilot Program FY 2022 Award ...*. https://www.transportation.gov/sites/dot.gov/files/2023-02/RCP%20Fact%20Sheets%202022.pdf
9. *Richmond Signal System (RSS) Phase IV | Richmond*. https://www.rva.gov/capital-improvement-projects/richmond-signal-system-rss-phase-iv
10. *Construction Projects & Road Improvements | Richmond*. http://www.rva.gov/public-works/construction-projects-road-improvements
11. *Richmond receives $18.4 million for Arthur Ashe Boulevard bridge replacement project | WRIC ABC 8News*. https://www.wric.com/news/local-news/richmond/richmond-receives-18-4-million-for-arthur-ashe-blvd-bridge-replacement-project
12. *Regional Transportation Funding*. https://planrva.org/transportation/funding/
13. *Search projects | Virginia Department of Transportation*. https://vdot.virginia.gov/projects/projects-search/?projectDistricts=Richmond+District
14. *Agency Update*. https://planrva.org/wp-content/uploads/4-VDOT_Agency_Report_RRTPO_2.6.2025.pdf
15. *All Years' SS4A Grant Awards | US Department of Transportation*. https://www.transportation.gov/grants/ss4a/cumulative-awards
16. *Agency Update*. https://planrva.org/wp-content/uploads/8-VDOT_Agency_Report_RRTPO_TAC_2.17.2026.pdf
17. *Search projects | Virginia Department of Transportation*. https://www.vdot.virginia.gov/projects/projects-search/?courseType=operational&projectDistricts=richmond