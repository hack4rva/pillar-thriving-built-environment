# Connecting Residents, Data, and Streets: Transparent Transportation & Fleet Visibility for Richmond's Built-Environment Hackathon

## Executive Summary

The City of Richmond faces a dual challenge in its built environment: residents struggle to discover and understand local infrastructure projects, and there is a critical lack of real-time visibility into fleet operations like street sweeping and snow removal. As of March 2026, project data is heavily fragmented across multiple city and state portals, often obscured by technical jargon that limits public engagement. Simultaneously, the Department of Public Works (DPW) is in the process of upgrading its fleet with GPS tracking, but the infrastructure remains incomplete. This research document provides the foundational context, data sources, and strategic inferences necessary for hackathon participants to build synthetic, citizen-centric prototypes that bridge these communication gaps and foster a thriving, sustainable Richmond.

## Problem Landscape

### Transportation Project Visibility & Discoverability
Currently, residents seeking information about neighborhood infrastructure improvements must navigate a disjointed digital landscape. Information is scattered across the Richmond GeoHub, the Open Data Portal, DPW program pages, and the Virginia Department of Transportation (VDOT) project tracker. Furthermore, the language used on these platforms is often highly technical. For example, the City of Richmond's DPW utilizes Pavement Condition Index (PCI) Ratings to prioritize and track its paving program [1]. While an interactive map is available, the engineering terminology makes it difficult for the average resident to understand how and when their specific street will be impacted. 

### Fleet Operations Visibility & Public Communication
DPW supervisors and Richmond residents currently lack real-time visibility into the completion of critical street services. Snow removal operations follow a strict priority order to ensure major transportation routes remain clear for emergency vehicles, but residents have no live map to track plow progress [2]. Similarly, street sweeping schedules are subject to sudden changes. On December 12, 2025, DPW announced a temporary pause in street sweeping services due to severe winter weather, with operations officially resuming on January 5, 2026 [3] [4]. The comprehensive 2026 bike lane maintenance program was scheduled to launch on March 10, 2026 [4]. Without real-time updates, residents are often left guessing when services will occur or why they were delayed, leading to frustration and potential parking violations.

## Key Data Sources

Hackathon participants should utilize the following public data sources to build their prototypes. *(Note: Do not scrape internal systems; rely only on these public-facing portals).*

* **Richmond GeoHub**: Serves as a central repository for exploring and downloading Richmond GIS datasets, including road geometries [5].
* **Richmond Open Data Portal**: Provides access to civic datasets, including the Street Sweeping Areas dataset managed by the DPW Division of Environmental Maintenance [6] [7].
* **DPW Program Pages**: Static and semi-dynamic pages detailing specific services. The Paving page includes the PCI Rating interactive map [1], while the Street Cleaning page lists residential sweeping schedules and towing information [4].
* **Capital Improvement Program (CIP) Dashboard**: An interactive data and map tool (currently in Beta) that allows users to explore active capital improvement projects throughout the city [8].
* **VDOT Richmond District Project Tracker**: Details major state-maintained projects within the district. *Timeline Claim:* For example, the Route 33 (Nine Mile Road) over I-64 bridge replacement in Henrico is estimated to start in Spring 2028 and complete in Fall 2030 [9]. *(Note: Project timelines may not match official city records and are subject to change).*

## Key Constraints

Solutions developed during the hackathon must strictly adhere to the following constraints:
* **No Live GPS Data**: GPS fleet data is not yet available. Any fleet visibility tool must utilize synthetic or mock data to simulate truck movements.
* **Scope Limitations**: Sustainability Design Standards are explicitly out of scope for this hackathon pillar.
* **No Internal Integrations**: Prototypes must not attempt to integrate with DPW's internal project management systems.
* **Timeline Discrepancies**: Project timelines found in public data may not match official internal records; all timeline claims in user interfaces must be clearly labeled as estimates or subject to change.

## Stakeholders

Successful prototypes must address the needs and operational realities of several key stakeholders:

| Stakeholder | Role & Relevance |
| :--- | :--- |
| **Al Wiggins** | Deputy Chief Administrative Officer (DCAO) for Operations. He joined the City of Richmond on August 28, 2025. His background includes directing emergency responses, launching AI-driven leak detection programs, and overseeing massive capital portfolios [10]. |
| **Daniel Klein** | Sustainability Coordinator for the City of Richmond, operating within the Office of Sustainability to implement RVAgreen 2050 [11]. |
| **Groundwork RVA** | A nonprofit partner whose programs engage youth in hands-on roles to enhance green spaces and create climate-resilient communities in Richmond [12]. |
| **James River Association** | A nonprofit partner focused on watershed restoration, river advocacy, and community conservation to protect the James River [13]. |
| **Partnership for Smarter Growth** | A nonprofit partner advocating for sustainable urban development, smart growth in zoning, and equitable transportation across the Richmond region [14]. |

## Inferences

* **Inference 1: Technical Jargon Creates an Equity Barrier.** The reliance on metrics like the Pavement Condition Index (PCI) on public-facing maps [1] likely alienates residents without engineering backgrounds. Translating these metrics into plain-language statuses (e.g., "Poor Condition - Scheduled for Repaving") would drastically improve discoverability and resident trust.
* **Inference 2: Weather-Driven Pauses Require Proactive Push Notifications.** The temporary halt of street sweeping in December 2025 [3] highlights a vulnerability in public communication. Because residents rely on static schedules [4], sudden operational shifts create confusion. A synthetic fleet dashboard that includes SMS or push-notification capabilities for service pauses would solve a major resident pain point.
* **Inference 3: Leadership is Open to Advanced Data Solutions.** DCAO Al Wiggins has a documented history of implementing AI-driven programs and priority-based budgeting in previous municipal roles [10]. This suggests that city leadership will be highly receptive to hackathon prototypes that use data fusion (e.g., combining 311 complaints with synthetic fleet routes) to optimize operations.

## Risks or Caveats Specific to Richmond

* **Jurisdictional Overlap:** Richmond's infrastructure is a mix of city-maintained roads and state-maintained highways. VDOT manages significant projects that intersect with city limits [9]. Prototypes that fail to distinguish between DPW and VDOT jurisdictions risk confusing residents about who is responsible for specific delays or closures.
* **Data Staleness:** The CIP Dashboard is currently in a Beta version [8], and static schedule pages are updated manually (e.g., the street cleaning schedule was updated January 2, 2026 [4]). Applications relying on these sources must account for potential data staleness and clearly communicate the "last updated" timestamp to users.

## Unknowns

1. **Exact GPS Fleet Implementation Timeline:** While it is known that GPS devices are being installed on the DPW fleet, the exact completion date and the future technical specifications of the live API feed cannot be verified publicly.
2. **Resident Communication Preferences:** There is no publicly available, comprehensive data indicating whether Richmond residents prefer to receive infrastructure updates via SMS, email, a dedicated mobile app, or social media channels.

## References

1. *Paving | Richmond*. https://www.rva.gov/public-works/paving
2. *Snow Removal | Richmond - RVA.gov*. https://www.rva.gov/public-works/snow-removal
3. *City Announces Temporary Pause in Street Sweeping ...*. https://rva.gov/press-releases-and-announcements/news/city-announces-temporary-pause-street-sweeping-services-2025
4. *Street Cleaning | Richmond*. https://www.rva.gov/public-works/street-cleaning
5. *Richmond GeoHub*. https://richmond-geo-hub-cor.hub.arcgis.com/
6. *Richmond Open Data Portal*. https://data.richmondgov.com/
7. *Street Sweeping | Open Data Portal | City of Richmond, Virginia*. https://data.richmondgov.com/d/2dh8-bzzs
8. *Capital Improvement Program Dashboard*. https://experience.arcgis.com/experience/86362b12585448b583b74a3a2ae32745
9. *Richmond District projects | Virginia Department of Transportation*. https://vdot.virginia.gov/projects/richmond-district/
10. *City of Richmond Welcomes Al Wiggins as DCAO for Operations | Richmond*. https://rva.gov/press-releases-and-announcements/news/city-richmond-welcomes-al-wiggins-dcao-operations
11. *Meet the Office of Sustainability*. https://www.rvagreen2050.com/meet-the-oos
12. *Groundwork RVA: Home*. https://groundworkrva.org/
13. *James River Association Programs*. https://thejamesriver.org/programs/
14. *Partnership for Smarter Growth - Richmond's Smart Growth ...*. https://www.psgrichmond.org/