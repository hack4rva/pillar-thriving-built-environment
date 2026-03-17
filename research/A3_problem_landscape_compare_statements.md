# Pick the Winner Fast: Transportation Project Visibility beats Fleet Ops on data, demo, and downstream adoption

## Executive Summary

For teams competing in the upcoming Hack for RVA event (March 27–29, 2026) [1], the choice between the two problem statements is clear: **Choose Transportation Project Visibility**. 

While both problems address critical city infrastructure, the Transportation Project Visibility problem (scored 25/32 Strong) offers a significantly higher probability of weekend success than the Fleet Operations Visibility problem (scored 22/32 Needs work). The deciding factor is data accessibility. Richmond's transportation and capital improvement data is already public, structured, and ready for immediate integration via the city's ArcGIS Capital Project Dashboard [2]. Conversely, the "GPS gap" for Fleet Operations is no longer a lack of hardware, but a lack of public data access; the city's fleet telematics are locked behind an active $817,200 vendor contract with Forward Thinking Systems [3]. 

By choosing Transportation, a team can bypass vendor API bottlenecks, build a resident-facing solution that appeals directly to judges, and leverage named city project managers for a credible post-hackathon continuation pathway.

## Side-by-Side Evaluation: Transportation vs. Fleet Operations

The following table breaks down the two problem statements across the six critical evaluation dimensions to highlight why Transportation is the superior choice for a 48-hour hackathon.

| Dimension | Transportation Project Visibility | Fleet Operations Visibility | Verdict |
| :--- | :--- | :--- | :--- |
| **Data readiness** | Public ArcGIS Capital Project Dashboard provides locations, phases, and PM contacts with quarterly updates [2]. | Active GPS telematics contract with Forward Thinking Systems ($817,200; 10/07/2024–10/06/2026) [3]. No public GPS dataset exists. | **Transportation** |
| **GPS gap significance** | N/A | Hardware is likely deployed, but access/permissions are the true gap. Vendor API credentials are required [3]. | **Transportation** (Fleet is gated) |
| **User clarity** | Residents, commuters, and council districts. Features named PMs and active public meetings (e.g., PM Olayinka Bruce) [2] [4]. | Internal focus: DPW Fleet supervisors and mechanics. Limited external storyline. | **Transportation** |
| **48-hour buildability** | High: Teams can immediately read ArcGIS layers to build change-logs, alerts, and mobile UIs [2]. | Low: Requires live GPS/API access and privacy reviews; otherwise, teams must rely on mock data. | **Transportation** |
| **Impact potential** | Citywide visibility for commuters and residents; directly reduces public confusion [2]. | Primarily internal operations; indirect public benefit. | **Transportation** |
| **Continuation pathway** | CIP is owned/maintained by the city; clear PM champions and dashboard administrators are already public [2] [4]. | Requires alignment with the vendor (FTS) and Fleet IT/security [3]. | **Transportation** |
| **Demo quality** | Live, real data; judges can test the solution using their own home or work addresses. | Likely relies on simulated tracks, which judges often perceive as speculative. | **Transportation** |

**Key Takeaway:** Transportation wins all six criteria by offering strong, public datasets and a highly credible champion path that does not rely on third-party vendor approvals.

## Data Readiness Deep Dive: Open CIP vs. Gated Telematics

Data readiness is the single biggest risk factor in a weekend hackathon. Transportation has a ready pipeline, while Fleet requires vendor access that is highly unlikely to be granted and integrated within 48 hours.

**Transportation Datasets and Tools:**
The City of Richmond maintains a Capital Project Dashboard, an interactive data and map tool that explores active capital improvement projects [2]. This ArcGIS-based dashboard is updated quarterly and includes critical metadata: descriptions, locations, project manager contact information, current phases (planning/design, construction), and estimated completion dates [2]. Furthermore, the DPW Construction Projects & Road Improvements page lists active projects, public meeting notices, and named project managers (e.g., Olayinka Bruce, Project Manager Senior) [4]. Teams can also enrich this data using the city's Procurement Transparency Dashboard and City Contracts dataset (updated monthly) to link project funding and supplier details [5] [6].

**Fleet Datasets and Tools:**
The "GPS gap" for Fleet Operations is actually an access gap. According to the City Contracts dataset, Richmond awarded IFB 240008190 to Forward Thinking Systems, LLC for "Fleet / GPS Telematics Tracking" [3]. This is an $817,200 contract effective from October 7, 2024, to October 6, 2026, with two 2-year renewal options [3]. This indicates that the hardware and software are already deployed. However, the data is proprietary and controlled by Fleet Management and the vendor. There is no public API or dataset published on Richmond's open data portals. Without pre-arranged API credentials and governance approvals, teams will be blocked from accessing real data.

## User Clarity and Winning Judge Narratives

Hackathon judges consistently reward solutions that have a clear, relatable end-user and a compelling narrative. A resident-first Transportation story resonates much stronger than an internal operational tool.

**Transportation User and Storyline:**
The primary users are Richmond residents and businesses located near construction projects, with secondary users being councilmembers and DPW Project Managers [2]. The narrative is highly compelling: *"Type your address; instantly see nearby projects, what changed since last quarter, expected disruptions, and subscribe for alerts."* This storyline is bolstered by the fact that the city already lists named PMs and holds public meetings for these projects [4], proving that public engagement is a real, funded priority.

**Fleet User and Storyline:**
The primary users are internal DPW Fleet supervisors and mechanics. While optimizing fleet routes is valuable, the narrative is only compelling to judges if backed by live data (e.g., a real-time snowplow tracker). Because teams will likely lack access to the Forward Thinking Systems API [3], they will be forced to mock the data, severely weakening the pitch.

## 48-Hour Build Plan: Scope Transportation MVP to Additive Value

Because Richmond already has a Capital Project Dashboard [2], teams must avoid simply rebuilding what exists. The goal is to extend the current data into a proactive, additive MVP.

**Transportation MVP (48 hours):**
1. **Change-log Generation:** Pull the ArcGIS Feature Service layers used by the Capital Project Dashboard [2]. Run diffs against historical states to auto-generate "What’s changed since last quarter" summaries per project and per council district.
2. **Address/District Subscriptions:** Build a notification service allowing residents to subscribe via SMS/email for status changes, upcoming milestones, and public meeting notices [2] [4].
3. **Plain-Language Summaries:** Use LLMs to auto-summarize dense project descriptions into resident-friendly blurbs, presented in a mobile-first, multilingual UI.

**Fleet Contingency (High Risk):**
If a team insists on Fleet Ops, they must secure FTS API keys and 2-3 active vehicle streams before Friday night [3]. They must also pre-clear privacy postures (suppressing driver PII). If access is not granted by Saturday noon, the team must pivot fully to Transportation.

## Impact and Staff Burden: Fast Pathways to Measurable Wins

Both problems aim to improve city functions, but Transportation offers faster pathways to measurable wins for both residents and city staff.

**Resident Impact:**
The Transportation solution offers citywide reach. By utilizing the existing council district filters and location data [2], residents gain immediate clarity on how their commutes and neighborhoods will be affected. 

**Staff Burden Reduction:**
Currently, DPW PMs and front-desk staff field repetitive inquiries regarding project timing, scope, and contact information [2] [4]. By implementing automated updates and push alerts, the proposed MVP can directly intercept and reduce these "status-check" calls and emails, providing a highly measurable reduction in staff burden. Fleet's incremental burden relief would likely overlap with functions already covered by the existing $817,200 FTS platform [3].

## Continuation and Champion Strategy

A major risk for both problem statements is the lack of a defined continuation pathway. However, Transportation has much clearer post-weekend champions.

**Transportation:**
The owners of the data are already public: Budget & Strategic Planning (who manage the CIP dashboard) and specific DPW Project Managers (who are named on project pages, such as Olayinka Bruce) [2] [4]. A team can easily pre-brief these contacts, co-design a pilot for two specific corridors, and secure a commitment to test the alert system post-hackathon.

**Fleet:**
Continuing a Fleet project requires alignment with Fleet Management, city IT, security, and the vendor (Forward Thinking Systems) [3]. This introduces high coordination costs, legal hurdles, and potential contract scope-of-work conflicts that cannot be resolved during a hackathon.

## Demo Playbook: Make it Real, Local, and Testable

The Transportation problem allows for a highly interactive, personalized demo that will stand out to judges.

**Transportation 5-Minute Flow:**
1. Have a judge enter their own Richmond home or work address to see nearby projects and phases [2].
2. Highlight the "What changed since last quarter" badge to explain updates in plain language.
3. Demonstrate the one-click "Subscribe" feature for SMS/email alerts, showing a live sample alert on a phone.
4. Display the auto-generated PM contact card and next public meeting info [4].
5. Close the pitch by citing the specific city contacts who can pilot the tool on Monday.

**Fleet Demo Flow:**
Without live API access to the FTS system [3], a Fleet demo will rely on simulated vehicle tracks. Judges heavily discount simulation-heavy demos, viewing them as speculative rather than actionable.

## Risks and Mitigations

**Transportation Risks:**
* *Duplication:* Do not just rebuild the map [2]. Mitigate this by focusing strictly on change-logs, push alerts, and accessibility.
* *Data Freshness:* The dashboard is only updated quarterly [2]. Mitigate this by clearly labeling data with "since last publication" indicators to set proper user expectations.

**Fleet Risks:**
* *Data Access:* The data is locked behind the FTS contract [3]. Mitigate by requiring written API approval prior to the event; if denied, abandon the problem statement.

## References

1. *City of Richmond to Partner in City’s First-Ever Civic Hack-a-thon | Richmond*. https://www.rva.gov/press-releases-and-announcements/news/city-richmond-partner-citys-first-ever-civic-hack-thon
2. *CIP | Richmond*. https://rva.gov/budget-and-strategic-planning/cip
3. *https://data.richmondgov.com/api/views/xqn7-jvv2/r...*. https://data.richmondgov.com/api/views/xqn7-jvv2/rows.csv?accessType=DOWNLOAD&bom=true&format=true
4. *Construction Projects & Road Improvements | Richmond - RVA.gov*. http://www.rva.gov/public-works/construction-projects-road-improvements
5. *Procurement Transparency Dashboard | Richmond - RVA.gov*. https://rva.gov/procurement-services/procurement-transparency-dashboard
6. *City Contracts | Open Data Portal | City of Richmond, Virginia*. https://data.richmondgov.com/Well-Managed-Government/City-Contracts/xqn7-jvv2