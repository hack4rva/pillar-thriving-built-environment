# Pain Point Research — Infrastructure Project Visibility

**Pillar:** Thriving and Sustainable Built Environment
**Problem Statement:** Help residents find and understand transportation and infrastructure projects happening in their neighborhoods.
**Applies to:** StreetLights, RideShift RVA
**Research Date:** April 1, 2026

**Evidence sources from existing corpus:**
- `A1_problem_landscape_infrastructure_visibility.md` — Observability market landscape (enterprise-focused; limited direct relevance to civic PS1)
- `A4_problem_landscape_public_works_transparency.md` — National transparency problem, data fragmentation, OC4IDS standards
- `A5_problem_landscape_infrastructure_data_fragmentation.md` — Richmond-specific data silos across GeoHub, Socrata, and program pages
- `B1_users_concerned_resident.md` — Resident persona: motivations, discovery channels, information needs
- `B3_users_dpw_comms.md` — DPW communications staff: call deflection, SLA inaccuracies, storm playbooks
- `B5_users_accessibility.md` — Accessibility-dependent residents: wheelchair users, visually impaired, paratransit riders
- `G1_risks_inaccurate_project_info.md` — Timeline liability: business revenue loss, legal exposure, staleness policies
- `G3_risks_accessibility.md` — Map and SMS accessibility barriers for screen readers, keyboard users, prepaid plan holders
- `G4_risks_data_freshness.md` — GeoHub update cadences, staleness detection, trust erosion
- `C4_services_gaps.md` — DPW public info gaps: stale pages, offline-only documents, no NTMP queue

---

## Pain Points by JTBD

### Job 1 — The Resident Who Sees Construction and Can't Find Answers

**P1.1: Five Systems, Zero Cross-Links**
Richmond's infrastructure project data is fragmented across the ArcGIS GeoHub (paving maps, road centerlines, CIP Dashboard), the Socrata Open Data Portal (Impact Map, street sweeping), CIP budget PDFs, departmental program pages (DPW Construction Projects, Paving, Leaf Collection, Street Cleaning), and the Online Permit Portal — with no shared identifiers connecting them. A resident cannot enter an address and see all active projects, closures, and scheduled maintenance at that location. The systems were designed for internal departmental workflows, not for residents trying to answer "What is happening on my street?" (`A5_problem_landscape_infrastructure_data_fragmentation.md`).

This mirrors a national pattern. New York City's Comptroller reported that weak capital data products are "not useful for project management, financial management, or transparency" because financial and project management systems are not linked and the unique identifier (FMS ID) is used inconsistently. The City of Palo Alto issued an RFP to centralize GIS specifically to prevent "disparate copies of data that inculcate a lack of confidence in data accuracy and completeness" (`A4_problem_landscape_public_works_transparency.md`).

**P1.2: Stale Pages and Ghost Data Erode Trust**
The DPW "Construction Projects & Road Improvements" page contains a "Willingness to Hold a Public Hearing" notice with a response deadline of August 13, 2021, and a "Link to Survey — CLOSED" with no posted results (`C4_services_gaps.md`). The Richmond Impact Map on the Open Data Portal lists a "Weekly" update cadence but was last updated on 2023-03-31 — over three years stale (`D2_data_open_data_portal.md`). The Capital Project Dashboard updates quarterly but provides no published SLA, so residents cannot distinguish between "data is fresh" and "data is abandoned" (`D1_data_arcgis_dpw.md`).

Research shows that 81% of residents say a negative digital experience decreases their trust in government, while 87% say a great experience increases it. When a dashboard contradicts physical reality — showing a project as "Active" months after construction has ended — the tool transforms from helpful resource to frustration source (`G4_risks_data_freshness.md`).

**P1.3: Incomprehensible Data — Jargon Without Context**
DPW project pages use internal project codes (e.g., "UPC 113296; U0000-127-032") and legal boilerplate without plain-language summaries or "last updated" labels (`C4_services_gaps.md`). Residents are not looking for engineering details — they want to know: Can I get in/out? When will the noise stop? Will my water be shut off? (`B1_users_concerned_resident.md`). Boston's Citywide Project Tracker demonstrates the alternative: 120-200 word plain-language descriptions that translate technical project management into public-friendly narratives (`E1_prior_art_project_trackers.md`).

**P1.4: Offline-Only Access to Key Documents**
Project materials on the DPW site require residents to review documents in-person at City Hall (6th floor) or to "call ahead to ensure the availability of appropriate personnel" (`C4_services_gaps.md`). This creates severe barriers for residents with mobility issues, rigid work schedules, or limited transportation. Virginia FOIA presumes records are open upon request, but request-based access is not the same as proactive, digital-first publication (`C4_services_gaps.md`).

**P1.5: Business Revenue at Stake When Timelines Are Wrong**
Businesses near road construction lose up to 40% of revenues during construction. A Minnesota DOT study found that single-location food service businesses experienced a statistically significant number of closures during road closure periods. In Sydney, a class-action lawsuit on behalf of 300 retailers proved that prolonged construction caused "substantial and unreasonable business disruption" (`G1_risks_inaccurate_project_info.md`). Richmond's CIP Dashboard only updates quarterly and does not include delay reasons. A tool that displays an incorrect end date could cause businesses to make staffing or lease decisions based on false precision.

---

### Job 2 — The Neighborhood Leader Who Can't Find a Unified Schedule

**P2.1: No Proactive Geographic Notifications**
Richmond has no mechanism for residents to subscribe to infrastructure updates by location. Chicago's ChiStreetWork allows geo-fenced alert subscriptions; Philadelphia's StreetSmartPHL refreshes hourly; Richmond has neither (`E1_prior_art_project_trackers.md`). Discovery is reactive: residents see orange cones, check social media, ask neighbors, then — maybe — find a City source. By then, the disruption has already occurred (`B1_users_concerned_resident.md`).

**P2.2: Invisible Traffic Calming Pipeline**
DPW receives over 1,000 traffic calming requests per year and identified more than 125 neighborhood streets requiring further investigation in 2021, yet no public queue exists showing screening, design, or funding stages (`C4_services_gaps.md`). Community leaders cannot answer constituents who ask "When will our street get speed bumps?" because the pipeline is invisible. This creates perception gaps: residents assume inaction when, in reality, their request is queued.

**P2.3: No Consolidated Future Calendar**
The paving program runs April through November, but exceptions occur without advance notification — milling and overlay starting in January, road closures in March (`B1_users_concerned_resident.md`). Street sweeping dates change seasonally. Leaf collection begins in October with sector-based vacuum schedules starting in November (`A5_problem_landscape_infrastructure_data_fragmentation.md`). These schedules live in separate PDFs, separate web pages, and separate ArcGIS apps. A neighborhood leader building a community calendar must manually synthesize data from at least five sources.

**P2.4: Social Media Posts Expire, But Projects Don't**
DPW's X (Twitter) account provides fast, timely closure alerts, but posts expire in feeds and are not organized by location or project. A social media post about a Monday closure is invisible by Wednesday, even if the closure lasts two weeks. Local news amplifies selectively (NBC12 Facebook), but coverage is partial. Reddit r/rva threads fill the gap with community curiosity, but contain unvetted information (`B1_users_concerned_resident.md`). No canonical, persistent "Project Card" exists per-project that all other channels can link to.

---

### Job 3 — The City Staffer Drowning in "What's Happening?" Calls

**P3.1: 81% Phone-First, 2% Mobile — Digital Tools Fail Navigation Tests**
Despite available online portals and mobile apps, residents overwhelmingly call 311. In comparable cities, 311 call centers handle 81% of total service request volume. The web portal offers no search feature — users must read multiple pages of categories to find their request type. The mobile app omits top service request categories entirely. Digital adoption stagnates at 1-2% mobile and 17% web because the tools are missing essential features, not because residents are "non-digital" (`B3_users_dpw_comms.md`).

**P3.2: Inaccurate SLAs Create Repeat Calls**
Internal CRM data that drives resident-facing expectations is often wrong. In San Antonio (a comparable mid-size city audited in detail), 39% of Solid Waste SLAs and 61% of Development Services SLAs were incorrect in the CRM. Of 1,501 complaints entered in FY2016, 87% remained open, and closed cases lacked resolution notes (`B3_users_dpw_comms.md`). When a resident is told "5 business days" but the real timeline is 15, they call back — multiplying call volume.

**P3.3: No Bridge Between Field Crews and Communications**
DPW communications staff spend significant time chasing operations colleagues for project status updates. Field crews update internal work order systems, but communications staff lack real-time read access. The result: when a resident calls about the construction on Broad Street, the staffer must make their own internal calls before they can provide an answer. Philadelphia and Boston solved this with live work order feeds and dashboard-based project status views for comms teams (`B3_users_dpw_comms.md`).

**P3.4: Storm Surge Overwhelms Manual Channels**
During severe weather events, call volume spikes massively. St. Paul's text-to-subscribe system ("STPAUL SNOW" to 468311) captured 10,000 new subscriptions in 48 hours during a snow event. Richmond has no comparable SMS alert system for infrastructure disruptions. GRTC CARE paratransit will run in snow, but door-to-door service is suspended if the customer's walkway is uncleared — a timing mismatch that strands the most vulnerable residents (`B3_users_dpw_comms.md`, `B5_users_accessibility.md`).

---

## Cross-Cutting Pain Points (All Jobs)

**PX.1: Accessibility-Dependent Residents Face Compounding Barriers**
For wheelchair users, visually impaired residents, and transit-dependent households, infrastructure disruptions are not inconveniences — they are absolute barriers. Every Work-in-Street Permit requires an ADA-compliant pedestrian routing plan, meaning the City *possesses* planned detour data. But this data is not published digitally. The Virginia Work Area Protection Manual recognizes that pedestrians are "reluctant to retrace their steps" — yet a resident in a wheelchair who arrives at a sidewalk closure has no advance warning to plan an alternative route (`B5_users_accessibility.md`).

GRTC CARE riders exceeding a 15% no-show threshold face escalating service suspensions (up to 14 days). If a rider cannot reach their pickup spot due to an unannounced sidewalk closure, they may be penalized through no fault of their own. Proactive alerts sent >2 hours before a scheduled trip could prevent avoidable suspensions (`B5_users_accessibility.md`).

**PX.2: Map-First Interfaces Exclude Vulnerable Users**
Leaflet's VoiceOver reads individual base-layer tile filenames ("6078.png, link"), overwhelming screen reader users. Leaflet 2.0 interactive markers using `<img>` tags are not keyboard operable. Mapbox GL JS's geocoder submits on Tab instead of moving focus, failing WCAG criteria. The Mapbox GL accessibility plugin was archived in 2022. A map-first UI will actively exclude blind and keyboard-only users unless explicit, custom fixes are applied (`G3_risks_accessibility.md`).

UK public sector guidance exempts maps from strict accessibility requirements only when "essential information is provided in an accessible digital manner." The 48-hour compliance path is: build an accessible address lookup and text-based list view first; treat the map as an optional enhancement (`G3_risks_accessibility.md`).

**PX.3: SMS Alert Systems Have Hidden Equity Gaps**
Carriers eliminated shared short codes in 2022. T-Mobile states that non-T-Mobile short codes are not supported on select plans. Residents with prepaid plans that block short codes or charge per-message will miss critical alerts. The Office of Equitable Transit and Mobility explicitly urges residents without internet to call a phone line for program enrollment — acknowledging that digital-only channels exclude the most vulnerable. Any notification system must offer multi-channel access: SMS, toll-free voice, and an accessible web status page (`G3_risks_accessibility.md`, `B5_users_accessibility.md`).

**PX.4: No Peer Benchmark — Richmond Trails Roanoke**
Roanoke provides a centralized "CIP & Construction" hub with per-project estimated timelines (e.g., "November 2024 - July 2025"), interactive project maps, and portfolio-scale data (215 capital projects totaling >$140M). Richmond has no consistent project index, no per-project timelines on public pages, and no interactive maps consistently linked from project descriptions. Richmond's current approach creates friction, erodes trust, and likely increases the burden of FOIA requests (`C4_services_gaps.md`).

---

## Prioritized Gap Summary

| Priority | Gap | Impact | Source |
|:---|:---|:---|:---|
| 1 | No unified, address-based project lookup | Residents cannot discover if they are affected | `A5`, `C4`, `D1` |
| 2 | Stale data without freshness indicators | Trust erosion; residents view tool as abandoned | `D2`, `G4`, `C4` |
| 3 | No proactive geographic notifications | Disruptions discovered reactively, not proactively | `E1`, `B1` |
| 4 | Construction permits / ROW closures not public | Active work invisible unless you see the cones | `D1`, `D2` |
| 5 | Accessibility barriers in maps and SMS | Wheelchair users, blind users, prepaid users excluded | `G3`, `B5` |
| 6 | Offline-only project documents | In-person City Hall visits required for key materials | `C4` |
| 7 | No published NTMP queue | 1,000+ annual requests invisible to public | `C4` |
| 8 | 311 data not published | Cannot analyze call patterns to identify communication gaps | `D2`, `E3` |
