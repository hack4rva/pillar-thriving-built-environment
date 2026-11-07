> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# From "What's That Roadwork?" to Answers in Seconds — A Practical Solution Space for Transportation Project Visibility

## Executive Summary
Transportation project visibility is fundamentally a translation problem. Residents want to know how construction impacts their daily lives, while Departments of Public Works (DPWs) need to communicate complex capital plans without drowning in support calls. As seen in Miami-Dade County, which balances the needs of 2.7 million residents and 27 million yearly visitors during large-scale events, enhanced visibility into traffic and transit is paramount for a safe and connected network [1]. 

Our analysis of the "Opportunities F2" solution space reveals that the most effective interventions align with the user's mental model: **searching by address rather than program name**. Furthermore, DPWs do not need to build new data pipelines from scratch; existing geospatial data published via ArcGIS and Socrata is sufficient for a high-impact Minimum Viable Product (MVP). By combining address-first discovery with plain-language translations of technical project descriptions, hackathon teams can deliver outsized value. The recommended approach for a well-rounded team is a combination MVP (Map + Address Search + Plain-Language Cards), explicitly excluding complex real-time data ingestion like the Work Zone Data Exchange (WZDx) from the initial build.

## Problem and Outcome Definition
The core problem in transportation project visibility is a friction of discovery and comprehension. According to the Australian Transport Assessment and Planning Guidelines, a problem is defined as "a cost to be avoided or saved," while an opportunity is "a benefit to be gained" [2]. Currently, the "cost" is the high volume of resident inquiries to 311 or DPW staff asking, "What is happening on my street?" 

Residents need fast, localized answers about disruptions, while DPWs need to reduce their inquiry burden without overhauling their internal project management systems. The desired outcome is a self-serve, highly accessible platform that intercepts resident confusion and converts it into informed awareness, ultimately leading to better traffic management, reduced congestion, and improved safety [1].

## Data Landscape and Feasibility
A successful hackathon project must leverage what cities already publish. Fortunately, municipal open data portals and public feature services contain the necessary geometry, project phases, timelines, and contact information to power an MVP.

### LA County and San Francisco Demonstrate Scale and Granularity
Cities are already publishing robust datasets. Los Angeles County Public Works manages over 130 active capital projects with a construction value exceeding $3.3 billion, exposing this data via their ArcGIS Open Data Hub [3]. Similarly, San Francisco's DataSF hosts an "Active Coordinate Applications" map (updated March 17, 2026) that provides highly granular, segment-level construction details, including project phases, start/end dates, geometry (points and linestrings), and Project Manager contact emails [4]. 

### Seattle and Milwaukee Showcase Public-Facing Dashboards
Seattle's Capital Projects Explorer utilizes an open dataset (hosted on Socrata) that updates monthly, featuring a search bar and mobile-responsive interface to track projects over $500,000 [5]. Milwaukee's DPW Infrastructure Projects dashboard allows users to search by address using a magnifying glass tool, or filter by project type, phase, and Aldermanic district [6]. These examples prove that public mirrors of internal coordination tools (like dotMaps or Coordinate) can be consumed read-only without complex authentication [4] [7].

### Notification Stacks and Standards Add-Ons
For proactive visibility, governments rely heavily on established vendors. The City of Walla Walla uses GovDelivery to send "Public Works News" and "Road Closures" via email and SMS (from the number 833-585-2187) [8]. Nixle allows residents to subscribe to local alerts by simply texting their ZIP code to 888777, and offers embeddable web-form widgets [9]. Granicus platforms have been used by agencies like the Kansas Department of Transportation to launch multilingual engagement hubs that attract hundreds of new users monthly [10]. 

Additionally, the USDOT's Work Zone Data Exchange (WZDx) specification (currently on version 4.2) provides harmonized data on work zone activity [11]. While active feeds exist in over 20 jurisdictions (including Florida, Texas, and Washington) [11], integrating this standard is complex and better suited as a phase-two enhancement rather than a hackathon MVP.

## Solution Directions Deep Dive

The following tables analyze six targeted solution directions, mapping their workflows, data requirements, complexity, and value propositions.

### 1. Address Search → Nearby Projects List (Text-Based)

| Attribute | Analysis |
| :--- | :--- |
| **Exact User Workflow** | User enters their home/work address → System returns a ranked, scannable text list of active projects within a 0.5 to 1-mile radius. |
| **Data Sources Required** | Geocoded project tables (e.g., Socrata CSV/JSON) or ArcGIS FeatureServer endpoints containing project coordinates and status [5] [4]. |
| **Technical Complexity** | 2/5 (Requires basic geocoding API and distance calculation). |
| **Value to Resident** | High. Matches the user's mental model ("What is happening near me?") and delivers answers in under 2 seconds. |
| **Value to DPW Staff** | High. Directly intercepts the most common 311 call type. |
| **Demo Path** | Type a sample address into a clean search bar; instantly display 3-5 nearby projects sorted by proximity. |
| **Post-Hackathon Path** | Integrate with official city geocoders; add filtering by project impact severity. |

*Takeaway:* Starting with an address search is the most direct route to user value, bypassing the need for residents to understand complex municipal program names.

### 2. Map with Project Pins → Project Card Popup

| Attribute | Analysis |
| :--- | :--- |
| **Exact User Workflow** | User pans/zooms a city map → Clicks a pin or highlighted street segment → Views a popup card with phase, dates, and impacts. |
| **Data Sources Required** | GeoJSON or ArcGIS REST APIs providing point/linestring geometries and metadata [4] [12]. |
| **Technical Complexity** | 2/5 (Standard implementation using Mapbox, Leaflet, or ArcGIS JS). |
| **Value to Resident** | Medium-High. Excellent for visual spatial awareness and route planning. |
| **Value to DPW Staff** | Medium. Good for transparency, though slightly higher friction for users than a simple text search. |
| **Demo Path** | Show a populated basemap; click a specific street segment to reveal a styled popup card with start/end dates and PM contact info. |
| **Post-Hackathon Path** | Add layer toggles for different infrastructure types (water, transit, paving); optimize mobile map interactions. |

*Takeaway:* A map interface is a familiar, expected standard for civic tech, but it must be paired with clear, readable popup cards to be effective.

### 3. Neighborhood Filter → Project List

| Attribute | Analysis |
| :--- | :--- |
| **Exact User Workflow** | User selects their neighborhood from a dropdown → Views a list of all planned/active projects in that boundary. |
| **Data Sources Required** | Open data boundary files (Shapefile/GeoJSON) for neighborhoods or council districts [12] [13]. |
| **Technical Complexity** | 2/5 (Point-in-polygon spatial joins or pre-tagged dataset filtering). |
| **Value to Resident** | Medium. Useful for community advocates or neighborhood association leaders tracking broader local investments. |
| **Value to DPW Staff** | Medium. Helps generate reports for specific city council members or community board meetings. |
| **Demo Path** | Select "Downtown" from a dropdown; watch the project list and map automatically filter to that polygon. |
| **Post-Hackathon Path** | Transition from unofficial neighborhood boundaries to authoritative council/ward districts to avoid political friction. |

*Takeaway:* While useful for community-scale planning, "neighborhood" boundaries are often unofficial (as explicitly warned by the City of Boston) [12]. Defaulting to official Aldermanic or Council districts is safer [6].

### 4. Plain-Language Translation of Specific Project Descriptions

| Attribute | Analysis |
| :--- | :--- |
| **Exact User Workflow** | User views a project → Clicks "Explain Simply" → Reads a 6th-grade reading level summary of what is happening, when, and how it impacts them. |
| **Data Sources Required** | Raw project descriptions, facility types, and phase data [4]. |
| **Technical Complexity** | 3/5 (Requires LLM API integration or strict templating logic). |
| **Value to Resident** | High. Removes bureaucratic jargon, building trust and comprehension. |
| **Value to DPW Staff** | High. Reduces follow-up questions caused by confusing engineering terminology. |
| **Demo Path** | Show a dense, jargon-heavy raw description; click a button to instantly transform it into a bulleted "What/Where/When/Impact" summary. |
| **Post-Hackathon Path** | Establish content governance and tone guidelines; implement multilingual translation capabilities [10]. |

*Takeaway:* Translating complexity into plain language has outsized value. It bridges the gap between engineering reality and resident understanding.

### 5. Email/SMS Notification for Project Status Changes Near an Address

| Attribute | Analysis |
| :--- | :--- |
| **Exact User Workflow** | User enters email/phone and address → Opts into alerts → Receives a message when a nearby project shifts from "Design" to "Construction." |
| **Data Sources Required** | Project status fields [4]; integration with GovDelivery, Nixle, or Twilio APIs [8] [9]. |
| **Technical Complexity** | 1/5 (for embedding a signup widget) to 4/5 (for fully automated webhook-driven sends). |
| **Value to Resident** | High. Provides passive, "set-it-and-forget-it" awareness. |
| **Value to DPW Staff** | High. Proactive communication drastically reduces inbound complaints. |
| **Demo Path** | Embed a Nixle/GovDelivery signup form; simulate a backend status change and display a mocked SMS alert on screen. |
| **Post-Hackathon Path** | Formalize vendor API integration; establish double opt-in privacy protocols. |

*Takeaway:* Automated notifications are highly desired but require navigating existing municipal vendor contracts. Mocking the automation while embedding a real signup widget is the best hackathon strategy.

### 6. Combination: Map + Address Search + Plain-Language Description

| Attribute | Analysis |
| :--- | :--- |
| **Exact User Workflow** | User searches address → Sees nearby map pins and list → Clicks a project to read a plain-English summary → Opts into updates. |
| **Data Sources Required** | Integrated ArcGIS/Socrata endpoints, boundary files, and LLM translation [6] [5] [4]. |
| **Technical Complexity** | 3.5/5 (Requires integrating mapping, geocoding, and text processing). |
| **Value to Resident** | Very High. A complete, cohesive journey from discovery to comprehension. |
| **Value to DPW Staff** | Very High. A comprehensive self-serve portal that addresses multiple user personas. |
| **Demo Path** | A seamless flow: Type address → view map/list → read simplified card → click "Subscribe for updates." |
| **Post-Hackathon Path** | Formalize data MOUs; refine UI/UX; deploy as a beta alongside existing DPW sites. |

*Takeaway:* This is the "sweet spot" MVP. It combines the most effective discovery method (address) with the most effective comprehension tool (plain language).

## Comparative Matrix

| Solution Direction | Technical Complexity | Resident Value | DPW Value | Demo Readiness | Post-Hackathon Lift |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1. Address Search | 2/5 | High | High | High | Low |
| 2. Map & Pins | 2/5 | Med-High | Medium | High | Low |
| 3. Neighborhood Filter | 2/5 | Medium | Medium | High | Medium (Boundary disputes) |
| 4. Plain-Language | 3/5 | High | High | High | Medium (Governance) |
| 5. Notifications | 1/5 to 4/5 | High | High | Medium (Requires mocks) | High (Vendor integration) |
| **6. Combination MVP** | **3.5/5** | **Very High** | **Very High** | **High** | **Medium** |

*Takeaway:* The Combination MVP offers the highest overall value. While notifications score high on value, their reliance on vendor pathways makes them harder to fully automate during a hackathon.

## Recommendations by Team Composition

### For a Team of 3–4 with Mixed Skills (Full-Stack, Design, Product)
**Recommended Direction: The Combination MVP (Direction 6)**
With a balanced team, you can divide and conquer. Have one person handle the map and address geocoding (Directions 1 & 2), another handle the LLM prompt engineering for plain-language translation (Direction 4), and the designer focus on the UX flow. Embed a GovDelivery or Nixle widget for notifications [8] [9], and simulate a status-change alert for the demo. Add an authoritative council district filter to show political awareness [6].

### For a Team of 2 with Strong Frontend Skills
**Recommended Direction: Address Search + Map + Plain-Language Cards (Directions 1, 2, & 4)**
Skip backend automation entirely. Consume a public GeoJSON or ArcGIS REST endpoint directly in the browser [4]. Focus your frontend skills on building a lightning-fast address search, a beautiful map interface, and a highly polished project card that utilizes an API to simplify the text. Stub out the notification signup with a simple UI form that doesn't actually connect to a backend database.

## What to Explicitly Exclude from Scope
To ensure you ship a working, high-quality demo, explicitly exclude the following from your hackathon scope:
* **Live WZDx Ingestion:** While the Work Zone Data Exchange is the future of automated vehicle routing [11], parsing v4.2 feeds for temporary lane closures is too complex for a 48-hour build. Mock a WZDx overlay for the demo if desired, but do not build the ETL pipeline.
* **Multi-Agency Data Normalization:** Do not attempt to merge data from the Water Department, Transit Authority, and DPW into a single master schema. Pick one rich dataset (like SF's Active Coordinate Applications [4] or LA County's Public Works data [3]) and build around it.
* **Predictive Traffic Analytics:** Avoid trying to calculate how a project will impact commute times. Stick to communicating *what* the project is.
* **Custom Basemap Infrastructure:** Rely on standard Mapbox, Leaflet, or Esri basemaps. Do not host your own tile servers.
* **Fully Automated Notifications:** Do not build a custom SMS gateway. Use embeddable widgets from Nixle or GovDelivery [8] [9], and simulate the automated triggers.

## Risks and Mitigations
* **Stale Data:** Many capital project datasets update monthly, not daily [5]. *Mitigation:* Stamp every project card with a clear "Data last updated on [Date]" badge to set accurate expectations.
* **Boundary Disputes:** "Neighborhoods" are often subjective and unofficial [12]. *Mitigation:* Default to authoritative City Council or Aldermanic districts [6].
* **Internal System Permissions:** Platforms like dotMaps require authorized logins [7]. *Mitigation:* Only use public open data mirrors or exported GeoJSON files for the MVP [4].

## Demo Storyboard
Judges need to see a crisp, relatable journey. Structure your demo as follows:
1. **The Hook:** Start with the problem. "Residents don't know what 'CIP Phase 3' means, they just want to know why their street is torn up."
2. **Discovery:** Enter a sample address into the search bar. Instantly show 3-5 nearby projects on a map and list.
3. **Comprehension:** Click a map pin. Show the raw, jargon-heavy description, then click "Explain Simply" to reveal a 6th-grade reading level summary highlighting the timeline and local impact.
4. **Action:** Click a "Subscribe for Updates" button (showing an embedded Nixle/GovDelivery form) [9].
5. **The Payoff:** Trigger a simulated backend script that changes the project status, and show a mocked SMS arriving on a phone screen: *"Update: The Folsom Streetscape project near you has moved to Construction."*

## Post-Hackathon Roadmap (Weeks 1–12)
Moving from a hackathon demo to a production civic tool requires focusing on governance and integration:
* **Weeks 1-4 (Data & Governance):** Formalize Data MOUs with the DPW to ensure reliable access to public feature services. Establish content governance guidelines for the plain-language LLM prompts to ensure accuracy.
* **Weeks 5-8 (Vendor Integration):** Work with the city's IT department to integrate the platform with existing communication stacks (GovDelivery/Granicus or Nixle) for automated webhook triggers [8] [14].
* **Weeks 9-12 (Testing & Launch):** Conduct accessibility (WCAG) reviews, implement multilingual templates [10], and set up analytics to track search-to-click times and bounce rates.

## Measurement and Impact
Success should be defined in terms of resident empowerment and DPW operational relief. Key Performance Indicators (KPIs) should include:
* **Resident Adoption:** Percentage of users finding a project within 10 seconds of searching their address.
* **Inquiry Reduction:** A measurable drop in 311 or DPW calls categorized as "construction near me" or "what is this project?"
* **Engagement:** Number of new subscribers opting into project updates per district, and the open/click rates on those alerts.
* **Comprehension:** The average Flesch-Kincaid readability grade level of the translated project cards (targeting 6th-8th grade).

## References

1. *Transportation Visibility Challenge — Miami-Dade Innovation Authority*. https://www.mdia.miami/transportation
2. *F2 Problem identification & assessment*. https://www.atap.gov.au/sites/default/files/documents/f2-problem-identification-and-assessment.pdf
3. *Public Works Open Data Hub | County of Los Angeles Open Data*. https://data.lacounty.gov/pages/963f04a2efda4607a936bab90177f7e0
4. *Active Coordinate Applications projects in construction phase map | DataSF*. https://data.sfgov.org/City-Infrastructure/Active-Coordinate-Applications-projects-in-constru/5hmg-qyif
5. *Capital Projects Explorer*. https://capitalprojects.seattle.gov/
6. *Projects*. https://city.milwaukee.gov/dpw/Infrastructure/Projects
7. *Project and Construction Coordination Map	 - Transportation | seattle.gov*. https://www.seattle.gov/transportation/projects-and-programs/programs/pedestrian-program/construction-coordination-and-mobility-management/project-and-construction-coordination-map
8. *
	
    How to Use the GovDelivery System | City of Walla Walla

*. https://www.wallawallawa.gov/services/news/using-govdelivery
9. *Nixle: How to Subscribe to Nixle Alerts – Nixle*. https://supportcenter.nixle.com/hc/en-us/articles/19077392253211-Nixle-How-to-Subscribe-to-Nixle-Alerts
10. *Enhancing public engagement with transportation projects*. https://granicus.com/blog/enhancing-public-engagement-transportation-projects/
11. *Work Zone Data Exchange (WZDx) | US Department of Transportation*. https://www.transportation.gov/av/data/wzdx
12. *Boston Neighborhood Boundaries - Dataset - Analyze Boston*. https://data.boston.gov/dataset/bpda-neighborhood-boundaries
13. *City Government - 14 - Dataset - Catalog - Data.gov*. https://catalog.data.gov/dataset/?tags=neighborhood&metadata_type=geospatial&organization_type=City+Government
14. *Overcoming transportation project coordination challenges: How Granicus empowers departments to deliver with confidence*. https://granicus.com/blog/overcoming-transportation-project-coordination-challenges-how-granicus-empowers-departments-to-deliver-with-confidence/