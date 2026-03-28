> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# From Maps to Momentum: The Best Public Project Trackers Cities Use—and How Richmond Can Win

## Executive Summary

To build a successful public-facing infrastructure tracker, Richmond must address two distinct user needs: immediate operational disruptions and long-term capital investments. An analysis of leading municipal trackers reveals that the most effective approach is a two-track model. Philadelphia’s StreetSmartPHL excels at near-term impacts by refreshing hourly to show permits, closures, and paving [1] [2]. Conversely, Alexandria’s Capital Infrastructure Map provides multi-year transparency by displaying project phases, budgets, and monthly progress updates [3]. 

The most powerful feature for driving resident engagement is proactive notification. Chicago’s ChiStreetWork allows users to draw a custom boundary and receive daily, weekly, or monthly alerts about upcoming roadwork and special events [4]. Furthermore, successful cities rely on plain-language descriptions to build trust. Boston’s Citywide Project Tracker categorizes 213 projects with clear phase tags and friendly, narrative summaries [5]. However, cities must clearly define the scope of their maps to prevent public confusion; Boston explicitly notes that its transportation map excludes routine resurfacing and curb ramp upgrades [6]. By combining Alexandria's capital tracking, Philadelphia's operational portal, and Chicago's notification system, Richmond can deploy a best-in-class transparency tool.

## Purpose, Audience, and Decision Frame: Designing for Two Distinct User Jobs

Richmond needs a two-speed tracker that serves both daily disruptions and long-horizon capital transparency. Residents and business owners typically approach city project maps with two entirely different mindsets. The first is operational: *"What is happening on my block this week, and how will it affect my commute or business?"* The second is strategic and trust-based: *"How is the City investing my tax dollars over the next one to five years?"*

Attempting to force both of these use cases into a single, undifferentiated map often results in cluttered interfaces and frustrated users. The most successful cities separate these functions while keeping them accessible from a unified portal. Operational trackers require high-frequency data updates (hourly or daily) and focus on right-of-way permits, street closures, and immediate paving schedules. Capital Improvement Plan (CIP) trackers require deep integration with project management systems to show funding status, multi-year timelines, and phase changes. Richmond's strategy should be to build a dual-layer system: a real-time operations view for immediate impacts and a comprehensive CIP view for long-term accountability.

## National Landscape Snapshot: What Leading Cities Actually Ship

Cities converge on ArcGIS for capital maps and custom applications for live operations. Success hinges on scope clarity, refresh cadence, and proactive notifications. While ArcGIS Dashboards dominate the CIP space due to their robust data visualization capabilities, custom front-ends leveraging Google Maps or open data APIs are preferred for high-frequency operational layers.

### Seven Exemplars at a Glance

The right building blocks for Richmond are visible across Boston, Chicago, Philadelphia, Louisville, Arlington, Alexandria, and Norfolk. The following table compares the key features, data sources, and relevance of each city's approach.

| City | Tool Name | Scope & Project Types | Data Source | Key UX Features | Plain Language | Strengths | Limitations | Relevance to Richmond |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Boston** | Citywide Project Tracker / Transportation Map | Streets, parks, municipal buildings; 213 projects [5] | CMS + ArcGIS [5] [7] | Map/List toggle; neighborhood and phase filters [5] | Yes | Friendly summaries; broad coverage [5] | Excludes resurfacing and curb ramps [6] | Strong model for plain language and intuitive filters. |
| **Chicago** | ChiStreetWork | Right-of-way permits, events, 5-year repaving history [4] | Custom (Google Maps) [4] | Address/Ward search; daily/weekly/monthly alerts [4] | N/A | Geo-fenced alerts; past/future windows [4] | Risk of information overload with many layers. | Best-in-class notifications and future-impact view. |
| **Philadelphia** | StreetSmartPHL | Closures, paving, snow, trash (PermitPHL, PavePHL, etc.) [2] | Custom + ArcGIS Hub [1] | Address search; hourly refresh; 311 reporting [1] [2] | Yes | Single portal for all street operations [2] | Not designed for long-term CIP status tracking. | Ideal blueprint for Richmond’s operational layer. |
| **Louisville** | Transportation Capital Projects Dashboard | Funded and unfunded candidate transportation projects [8] | ArcGIS Dashboards [8] | Address lookup; map view [8] | Limited | Clear funding transparency [8] | Stale data risk (last updated 9/25/2023) [8] | Good funding-status pattern, but highlights the need for update SLAs. |
| **Arlington** | CIP Interactive Map / Projects By Status | Countywide CIP; curated transportation status pages [9] [10] | ArcGIS + Web CMS [9] [10] | Project list + map; status categorization [9] [10] | Yes | Clear categorization; county-level scope [9] | Broad scope can dilute specific transportation focus. | Useful for status taxonomy and web integration. |
| **Alexandria** | Capital Infrastructure Map | Cross-department capital projects [3] | ArcGIS Dashboards [11] [3] | Phase/name filters; monthly updates; budget display [3] | Yes | Strong per-project data; PM-system integrated [3] | Requires disciplined, continuous updates. | Best model for Richmond’s CIP layer. |
| **Norfolk** | CIP Open Data / Power BI Dashboard | Citywide CIP (mapped and non-mapped projects) [12] [13] | Socrata + Power BI [12] [13] | Multi-page dashboard; financial totals [13] | Limited | High budget transparency [13] | Creates new dataset each FY; fragmentation risk [12] | Cautionary tale for data continuity and integration. |

*Takeaway: No single city provides a perfect out-of-the-box solution. Richmond should adopt Alexandria's rigorous CIP data structure, Philadelphia's unified operational portal, and Chicago's proactive notification system.*

## Deep Dives: What Each Model Teaches Richmond

Borrow deliberately: Alexandria for CIP structure, StreetSmartPHL for operations, ChiStreetWork for alerts, and Boston for plain language.

### Boston Citywide Project Tracker: 213 Projects with Phase Tags and Friendly Descriptions
Boston’s Citywide Project Tracker successfully translates technical project management into public-friendly narratives. The tracker displays 213 projects categorized by clear phase tags: Pending, Completed, Construction, Design, and Planning [5]. It uses highly accessible language, such as "We're investing in a capital reconstruction to revitalize Blossom Street. We envision a safer, more accessible street..." [5]. However, Boston's Transportation Projects map explicitly notes that resurfacing projects, sidewalk reconstruction, and curb ramp upgrades are excluded [6]. Richmond should adopt Boston's narrative style and phase taxonomy, while avoiding scope confusion by stating exclusions prominently on the map interface.

### Chicago ChiStreetWork: Permit-Driven Transparency with Geo-Fenced Alerts
Chicago’s ChiStreetWork is a web-based tool leveraging a Google Maps interface to track right-of-way permits and special events [4]. Its standout feature is a subscription service that allows residents to draw a specific boundary on the map and receive daily, weekly, or monthly alerts about upcoming impacts [4]. The map populates data from one month in the past to up to one year in the future, and includes a 5-year history of repaved streets [4]. This coordination effort has led to an estimated $183 million in savings since 2012 by reducing instances of newly repaved streets being cut into for underground work [4]. Richmond must make geo-fenced alerts and a 12-month lookahead core to its operations portal.

### Philadelphia StreetSmartPHL: One Portal, Hourly Refresh, and 311 Integration
Philadelphia consolidates its street-level operations into a single platform called StreetSmartPHL, which houses four components: PavePHL, PermitPHL, PlowPHL, and PickupPHL [14] [2]. The portal refreshes data every hour, providing near real-time information on street closures, paving conditions (good, fair, poor), and trash collection [1] [2]. Crucially, PermitPHL includes a direct line of communication to 311, allowing users to report issues related to hazardous conditions or non-permitted closures directly from the map [2]. Richmond should unify its closures, paving, and service disruptions into a similarly integrated operational entry point.

### Louisville Transportation Dashboard: Funding Status Clarity with Update-Cadence Risk
Louisville’s Transportation Capital Projects Dashboard provides excellent transparency regarding project pipelines by explicitly distinguishing between projects that have received funding and are moving toward construction, versus projects that are unfunded but are "serious contenders" for future funding [8]. However, the dashboard carries a significant warning: it notes that it was last updated on 9/25/2023 [8]. Richmond should expose funded versus candidate projects to manage public expectations, but must establish and publish a strict Service Level Agreement (SLA) for data updates to avoid presenting stale information.

### Arlington County CIP: Pairing ArcGIS with Curated Web Content
Arlington County utilizes a dual approach, offering a Capital Improvement Plan (CIP) Interactive Map built on ArcGIS alongside curated web pages that list "Transportation Projects By Status" (e.g., Planned, In Design) [9] [10]. This allows users to literally see where projects are located while also providing structured lists for users who prefer text-based navigation [9] [10]. Richmond should mirror this approach, using a dashboard for spatial visualization and standard web pages for status storytelling.

### Alexandria Capital Infrastructure: Budgets and Schedules from the PM System
The City of Alexandria's Infrastructure Map displays capital projects actively managed in the City’s cross-departmental project management system [3]. When a user clicks a project icon, a pop-up reveals the project name, phase, planned budget, schedule dates, a monthly progress update, and a link to the dedicated project webpage [3]. Projects can be filtered by name and phase [3]. Richmond should integrate its project management system directly into its CIP layer to auto-populate status, budgets, and milestones in this exact format.

### Norfolk CIP: Power BI Scale and Fragmentation Risk
Norfolk utilizes a Microsoft Power BI dashboard to display its CIP, showing $285,272,220 in FY 2025 adopted amounts and $1,442,696,039 for the FY 2025 - FY 2029 period [13]. While this provides excellent financial transparency, Norfolk's open data portal notes that a new dataset is created each fiscal year, and the previous dataset is not updated [12]. Furthermore, the dashboard splits "Mapped CIP Projects" from "Other CIP Projects" (citywide/multiple locations) across different pages [13]. If Richmond uses finance dashboards, it must ensure stable project IDs across fiscal years to maintain link continuity and avoid fragmenting the user experience.

## Top Models for Richmond: The 2-3 to Emulate Now

To deliver maximum public value within 6 to 9 months, Richmond should combine the strengths of three specific models:

* **Model 1: Alexandria-style CIP Dashboard.** Implement an ArcGIS dashboard integrated with Richmond's project management system to display long-term capital projects. Pop-ups must include the project phase, budget, schedule, and monthly progress updates [3].
* **Model 2: StreetSmartPHL-style Operations Portal.** Deploy a unified portal for near-term impacts (closures, paving, maintenance) that refreshes hourly and includes inline 311 reporting capabilities [1] [2].
* **Enhancement: ChiStreetWork-style Alerts.** Layer Chicago's notification system onto the operations portal, allowing residents to draw custom boundaries and receive daily, weekly, or monthly alerts about upcoming disruptions [4].

## UX Patterns to Adopt: Proven Elements That Reduce Friction

Adopting established UX patterns will significantly reduce user friction and improve public comprehension.

* **Address/Intersection Search:** Allow users to immediately jump to their neighborhood, as seen in Chicago and Philadelphia [4] [2].
* **Phase and Status Filters:** Enable filtering by project phase (Planning, Design, Construction) and neighborhood, mirroring Boston and Alexandria [5] [3].
* **Map/List Toggle:** Provide fast defaults that let users switch between spatial and text-based views, similar to Boston's interface [5].
* **Plain-Language Summaries:** Require 120–200 word plain-language descriptions and "what’s next" context on per-project pages [5].
* **Geo-Fenced Subscriptions:** Implement user-defined boundaries for email/SMS alerts with customizable frequencies [4].
* **Inline 311 Reporting:** Allow users to report hazardous conditions or unpermitted closures directly from the map pop-ups [2].
* **"Included/Excluded" Banners:** Prominently display what the map does *not* show (e.g., routine pothole fills) and include a "Last Updated" timestamp to manage expectations [6] [8].

## Mistakes to Avoid: Real Failure Modes from Peers

Do not ship a tracker without scope clarity, a defined refresh cadence, and data continuity.

* **Scope Confusion:** Boston’s transportation map excludes resurfacing and curb ramps, which can confuse users looking for roadwork [6]. Richmond must state exclusions prominently.
* **Stale Dashboards:** Louisville’s dashboard displays a last updated date of 9/25/2023 [8]. Richmond must publish and strictly adhere to data update SLAs.
* **Dataset Fragmentation:** Norfolk creates new datasets yearly and splits mapped versus non-mapped projects [12] [13]. Richmond must maintain stable project IDs across fiscal years to prevent broken links.
* **Overloading Layers:** Chicago's ChiStreetWork includes bus routes, bike lanes, cameras, and traffic conditions [4]. Richmond should default to minimal layers (projects + closures) and allow users to toggle additional context to preserve mobile performance.

## Data Architecture & Sources: Wiring Richmond’s Stack

To support the two-track model, Richmond requires a bifurcated data architecture.

* **CIP Layer:** Utilize ArcGIS Dashboards pulling directly from the City's Project Management system. This feed should update monthly to reflect changes in project phase, budget, schedule, and milestone dates [3].
* **Operations Layer:** Build a custom, lightweight front-end over right-of-way permit APIs, paving schedules, and service disruptions. This data must refresh hourly [1].
* **Open Data:** Publish quarterly snapshots with stable project IDs and clear metadata stating the refresh cadence.
* **Notifications Service:** Implement a backend service to store user-drawn geofences, preferred event types, and alert frequencies (daily/weekly/monthly), executing via email or SMS [4].
* **Accessibility:** Ensure the platform meets WCAG AA standards, supports keyboard navigation, and utilizes mobile-first tiles and pop-ups.

## Phased Roadmap: 0-12 Months

Deliver value quickly with an operations map and alerts, then deepen the platform with CIP integration and storytelling.

* **Phase 1 (0–3 months):** Launch the Operations MVP. Focus on street closures and paving schedules. Include address search, basic filters, an "Included/Excluded" banner, and a "Last Updated" timestamp.
* **Phase 2 (3–6 months):** Introduce geo-fenced alerts and 311 integration. Allow users to subscribe to their neighborhoods and report issues directly from the map. Add snow or solid waste layers if applicable.
* **Phase 3 (6–12 months):** Roll out the Alexandria-style CIP dashboard. Integrate with the PM system to show funding tags, budgets, and schedules. Launch per-project pages with plain-language narratives.

## Success Metrics & Governance: Proving Value

Track specific KPIs to ensure the platform is meeting resident needs and reducing operational friction.

* **Operations:** Measure the percentage of searches that return a result, ensure average time-to-information is under 10 seconds, and track alert opt-ins and open/click rates.
* **CIP:** Track the percentage of projects that receive their monthly updates on time, and audit detail completeness (phase, budget, next milestone).
* **Reliability:** Monitor data refresh SLA compliance, overall uptime, and mobile performance (Largest Contentful Paint < 2.5s).
* **Impact:** Target a 15–25% reduction in 311 calls related to "what’s happening on my street" within the first 6 months of launch.

## Gaps to Close Before Final Recommendations

To finalize the strategy, Richmond should validate the remaining peer cities requested in the initial research scope.

* **NYC DOT:** Confirm the specific tool name, data sources, filter capabilities, and the depth of plain-language descriptions used for their capital and street improvement trackers.
* **Portland (PBOT):** Determine whether PBOT relies on ArcGIS or a custom application, evaluate their search and phase filters, and confirm their update cadence.
* **Boston Open Data:** Re-evaluate the `apps.boston.gov/capital-projects` data feed to understand the specific mechanics of their open data integration [15] [16].

## References

1. *StreetSmartPHL - Open Data PHLmaps*. https://data-phl.opendata.arcgis.com/datasets/streetsmartphl-2
2. *Technology under William Penn*. https://www.tesc.psu.edu/assets/docs/tech-under-william-penn.pdf
3. *Projects & Plans | City of Alexandria, VA*. https://www.alexandriava.gov/Projects
4. *
    City of Chicago :: Chicago Department of Transportation Announces ChiStreetWork Website Upgrade
*. https://www.chicago.gov/city/en/depts/cdot/provdrs/future_projects_andconcepts/news/2020/march/chicago-department-of-transportation-announces-chistreetwork-web.html
5. *Citywide Project Tracker | Boston.gov*. https://www.boston.gov/departments/boston-digital-service/project-search
6. *Transportation Projects Across Boston | Boston.gov*. https://www.boston.gov/departments/transportation/transportation-projects-across-boston
7. *Boston Transportation Project Map 2021 - Overview*. https://boston.maps.arcgis.com/home/item.html?id=8d6dd73acbd444b28b633119168c7d31
8. *Transportation Capital Projects | LouisvilleKY. ...*. https://louisvilleky.gov/government/public-works/transportation-capital-projects
9. *Capital Improvement Plan (CIP) – Official Website of Arlington County Virginia Government*. https://www.arlingtonva.us/Government/Programs/Budget-Finance/CIP
10. *Transportation Projects By Status – Official Website of Arlington County Virginia Government*. https://www.arlingtonva.us/Government/Projects/Transportation-Projects-By-Status
11. *City of Alexandria Infrastructure Projects Map*. https://www.arcgis.com/apps/dashboards/2a448a4307284eb5b0de9b304b5634ee
12. *Capital Improvement Plan (CIP) Projects - FY24 | Open Data Portal - City of Norfolk, VA Open Data*. https://data.norfolk.gov/Government/Capital-Improvement-Plan-CIP-Projects-FY24/jbfz-2t3g
13. *Microsoft Power BI*. https://app.powerbigov.us/view?r=eyJrIjoiNjkwMTQ3ZGEtYzIzNy00NWI2LTk1NzQtMmVlZjdmMzEwY2FiIiwidCI6IjUzODZkMzU1LTJmYWUtNGZlOC05MTc0LWI4OWU0MDhiYTk5MSJ9
14. *Streets Paving Program and List*. https://www.phila.gov/media/20210924130120/Streets-paving-program-and-list-2021.pdf
15. *Capital Projects*. https://apps.boston.gov/capital-projects/
16. *Capital Projects*. https://apps.boston.gov/capital-projects/about