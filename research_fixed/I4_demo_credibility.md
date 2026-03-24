
# Make It Real: A Credibility Playbook for Richmond Infrastructure Demos

## Executive Summary
Hackathon judges—comprising City officials, Department of Public Works (DPW) staff, community advocates, and technologists—reward teams that build specifically for Richmond, rather than those who build generic tools and point them at local data. Credibility in this context hinges on three dimensions: demonstrating a deep understanding of the real problem, utilizing authentic Richmond data sources, and ensuring the tool functions honestly without making unsupportable claims. 

The most successful demos will open with immediate proof of local engagement, such as screenshots of Richmond's actual DPW capital projects page or the Capital Project Dashboard. They will use real addresses (e.g., 1500 E Main St), acknowledge real constraints (like incomplete GPS fleet data), and design fallbacks based on actual city policies, such as Richmond's Snow Removal priority routes. Conversely, teams that use placeholder addresses ("123 Main St"), invent data schemas, or accidentally pull data from other cities will immediately lose trust. This playbook outlines the exact sources, technical signals, and community framing required to build a highly credible demo.

## Why Credibility Wins in Richmond Demos
Judges evaluate prototypes based on proof, not promises. A credible demo does not require a flawless, production-ready product; rather, it requires evidence that the team deeply understood the problem and built toward a realistic solution. When a team points to specific Richmond constraints, names local neighborhoods, and shows their tool behaving responsibly under real-world data conditions (including missing or stale data), they signal that their solution is viable for actual civic deployment.

## The Richmond Data Landscape You Must Cite
To establish immediate technical and civic literacy, teams must anchor their demos to the City's official DPW pages, CIP dashboards, GeoHub datasets, and service policies. 

| Source | What it Proves | How to Show in Demo | URL |
| :--- | :--- | :--- | :--- |
| **DPW Construction Projects Page** | Engagement with current state and named projects | Screenshot + callouts (e.g., Arthur Ashe Blvd Bridge) | http://rva.gov/public-works/construction-projects-road-improvements [1] |
| **Capital Project Dashboard** | Access to active projects with real attributes | Live filter by a Council District | https://cor.maps.arcgis.com/apps/dashboards/b77c76ba1e1a47a09734b7eb8d5a508b [2] |
| **Richmond GeoHub** | Dataset literacy and schema grounding | Open any layer and show "View API resources" | https://richmond-geo-hub-cor.hub.arcgis.com/ [3] |
| **Zoning Districts Dataset** | Comfort with GeoHub item pages and REST endpoints | Show "API resources" panel | https://richmond-geo-hub-cor.hub.arcgis.com/datasets/zoning-districts-1/about [4] |
| **City of Richmond ArcGIS Org** | Verification that you are in the correct organization | Show org banner + "Council Lookup App" | https://cor.maps.arcgis.com/ [5] |
| **Snow Removal Policy** | Understanding of real operational priorities | Cite lane-mile shares for Priority 1 and 2 routes | http://rva.gov/public-works/snow-removal [6] |
| **Open Data Portal** | Access to RVA 311 categories and volumes | Show dataset search and fields | https://data.richmondgov.com/ [7] |
| **RVA 311 Program Page** | Knowledge of existing service request categories | Show categories (potholes, sidewalks) in your UI | https://www.rva.gov/citizen-service-and-response/about-rva-311 [8] |

*Takeaway: Referencing these specific URLs and platform names proves your team did the foundational research required to integrate with Richmond's actual infrastructure.*

## Transportation Project Visibility
To convince judges that your tool solves the transportation project visibility problem, you must use named Richmond projects, real addresses, and raw attributes to translate opaque data into resident answers.

**Facts to Leverage:**
* The City of Richmond is responsible for maintaining **832 center lane miles of street, 836 miles of sidewalk, and 83 bridges** [1].
* Active projects listed publicly include the "Biotech Phase III – Leigh St Streetscape" and the "Arthur Ashe Blvd Bridge Replacement" [1].
* Public meetings are tied to real addresses, such as Main Street Station at 1500 E Main St, Richmond, VA 23219 [1].

**Demo Actions:**
Show the current state by displaying a screenshot of the DPW page with 2–3 project names. Pull a Council District view from the CIP dashboard, select a real address (e.g., 1500 E Main St), and demonstrate a 0.5-mile search radius. Your strongest value demonstration is a "Raw vs. Readable" split-screen: on the left, show the actual attribute panel from the CIP dashboard (phase, manager, estimated completion); on the right, show your plain-language summary (e.g., "Water main work on Jahnke Rd—night work expected; ETA June 2026").

## Fleet Operations Under Constraint
The problem statement notes that GPS fleet data infrastructure is incomplete. Designing honestly around this constraint is a massive credibility signal.

**Facts to Leverage:**
* Richmond's Snow Removal policy prioritizes **Priority 1 Snow Routes (700 lane miles, or 28% of the city)** and **Priority 2 Snow Routes (200 lane miles, or 8% of the city)** [6].
* Neighborhood streets (Priority 3) typically see plows 48 to 72 hours after snowfall ends [6].
* Residential trash is collected once per week, Monday through Thursday [9].

**Demo Actions:**
Explicitly state that GPS device coverage is incomplete. Use real Council District boundaries and Snow Priority 1/2 routes as your display scaffold. **Inference:** If you build a fallback logic that displays a "stale" badge when a zone hasn't been updated in 24 hours, and instead shows the policy-based ETA tied to Priority routes, judges will infer that your team understands civic operational realities better than teams showing fake, real-time dots moving on a map.

## Technical Credibility Signals
Schema fidelity, real addresses, and resilient behavior matter significantly more than a flashy user interface. 

| Practice | What to Show | Source Check | Risk if Missed |
| :--- | :--- | :--- | :--- |
| **Use Richmond org/GeoHub items** | Item page + "API resources" | cor.maps.arcgis.com / GeoHub | Presenting wrong-city data destroys credibility instantly. |
| **Use real addresses** | 2–3 Richmond addresses on map | DPW/Council references | Using "123 Main St" signals a generic, ungrounded prototype. |
| **Use real schema** | Match GeoJSON fields to ArcGIS attributes | GeoHub item fields | Implies your tool would require costly rework to actually integrate. |
| **Raw vs. readable side-by-side** | CIP attributes + plain language | CIP dashboard URL on slide | Fails to demonstrate the actual translation value of the tool. |
| **Handle edge cases** | "No projects" and "stale status" flows | Snow policy fallback | Results in a demo crash or an empty map during the presentation. |

*Takeaway: Avoid common traps. For example, do not use the "Leaf_Collection_Areas_Arc" FeatureServer; it contains names like "Wissahickon" and "Krewstown," revealing it is actually Philadelphia data [10]. Similarly, avoid the Socrata demo "Richmond Capital Projects" dataset, as it is an internal test environment, not official city data [11].*

## Community Credibility Signals
Community-focused judges want to see that you understand the human impact of infrastructure communication. 

Name specific, underserved Richmond neighborhoods (e.g., Church Hill, Gilpin Court, Swansboro, Southside) and show how your tool answers "when, where, and how long" for residents in those specific areas. Reference public meeting contexts where residents express frustration—such as City Council public comments or neighborhood association minutes—without fabricating quotes. 

**Inference:** Language matters. Framing your tool by saying, "This helps a resident on East Broad know when the water main work will be done," rather than, "This is an ArcGIS-powered project discovery platform," signals that you view the technology as a resident service rather than just a software product.

## Edge-Case UX and Trust Patterns
Transparent fallbacks build trust when data is missing or stale. If there are no projects within 0.5 miles of a searched address, the UI should gracefully display a friendly explanation, show the nearest two projects, and offer a way to subscribe for updates. If a zone status has not been updated, display the last update time, a "stale" badge, and policy-based expectations. Finally, if you are using the City's Beta CIP Experience app [12], label it "Beta" on-screen to show you are paying attention to data provenance.

## Unknowns to Close Before Rehearsal
While much data is publicly available, some elements require live validation or workarounds. Based on recent research, the following gaps have been resolved:
* **311 Volume Counts:** A direct 311 dataset search on data.richmondgov.com currently yields no dedicated volume count tables. *Action:* Show the portal search page, acknowledge the data gap, and commit to backfilling the data via the RVA311 API.
* **Official Council Districts Layer URL:** The exact REST endpoint for Council Districts is located at `https://services6.arcgis.com/il6vO1TutlF580Ku/arcgis/rest/services/Council_District/FeatureServer` [14]. *Action:* Use this FeatureServer URL to accurately map the 2021 adopted districts.
* **Street Cleaning Routes:** The official Street Sweeping dataset is available on the Open Data Portal (ID: 2dh8-bzzs), updated April 24, 2024 [15]. *Action:* Use this dataset alongside the official Route 11 PDF map to demonstrate accurate service area geometry.

## Pre-Demo Credibility Checklist
Incorporate these 10 signals into your demo and pitch before Sunday morning rehearsal:

**Technical Signals:**
1. Cite the DPW page and CIP dashboard by their exact URLs and item names.
2. Use 2–3 real Richmond addresses (e.g., 1500 E Main St, an East Broad address, a Southside address).
3. Base your geography on real Richmond Council Districts and show the source app/layer.
4. Match your mock API's GeoJSON field names to the real ArcGIS schema; show the "API resources" panel from a GeoHub item.
5. Demo edge cases live: show the "no projects within 0.5 mi" flow and the "status stale" flow with timestamps and fallback rules.

**Community-Facing Signals:**
6. Name at least two underserved neighborhoods (e.g., Church Hill, Swansboro) and show tailored views for them.
7. Frame outcomes as resident answers ("When will water be back on for East Broad?"), not product features.
8. Reference a City Council or public meeting context for one real project pulled from the DPW page.
9. Use the DPW Snow Removal priorities (Priority 1 vs. Priority 2) to explain service expectations during storms.
10. Add a 15-second "How to get help" slide pointing residents to RVA 311 with the official URL.

## References

1. *Construction Projects & Road Improvements | Richmond*. http://www.rva.gov/public-works/construction-projects-road-improvements
2. *CIP | Richmond*. https://rva.gov/budget-and-strategic-planning/cip
3. *Richmond GeoHub*. https://richmond-geo-hub-cor.hub.arcgis.com/
4. *Zoning Districts | Richmond GeoHub - ArcGIS Online*. https://richmond-geo-hub-cor.hub.arcgis.com/datasets/zoning-districts-1/about
5. *Richmond, VA - ArcGIS Online*. https://cor.maps.arcgis.com/
6. *Snow Removal | Richmond*. https://www.rva.gov/public-works/snow-removal
7. *Open Data Portal | City of Richmond, Virginia | Open Data Portal | City of Richmond, Virginia*. https://data.richmondgov.com/
8. *About RVA 311 | Richmond*. https://www.rva.gov/citizen-service-and-response/about-rva-311
9. *Trash Collection | Richmond*. https://www.rva.gov/public-works/trash-collection
10. *Query: Leaf_Collection_Areas_Arc (ID: 0)*. https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/Leaf_Collection_Areas_Arc/FeatureServer/0/query?outFields=*&where=1%3D1
11. *Richmond Capital Projects | Tyler Data & Insights*. https://transparencyapps.demo.socrata.com/dataset/Richmond-Capital-Projects/adke-8wvb
12. *Capital Improvement Program Dashboard*. https://experience.arcgis.com/experience/86362b12585448b583b74a3a2ae32745
13. *Trash Collection Schedule*. https://www.arcgis.com/apps/instant/basic/index.html?appid=2a02c94e64024bd691808803fea29d64
14. *Council_District (FeatureServer) - ArcGIS*. https://services6.arcgis.com/il6vO1TutlF580Ku/arcgis/rest/services/Council_District/FeatureServer
15. *Street Sweeping | Open Data Portal | City of Richmond, Virginia*. https://data.richmondgov.com/d/2dh8-bzzs