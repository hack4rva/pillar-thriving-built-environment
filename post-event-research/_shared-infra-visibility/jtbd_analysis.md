# JTBD Analysis — Infrastructure Project Visibility

**Pillar:** Thriving and Sustainable Built Environment
**Problem Statement (verbatim):** Infrastructure Project Visibility — Help residents find and understand transportation and infrastructure projects happening in their neighborhoods.
**Applies to:** StreetLights, RideShift RVA
**Research Date:** April 1, 2026
**Method:** Synthesis of existing pillar research corpus (`pillar-repos/pillar-thriving-built-environment/research/`)

---

## Jobs To Be Done

### Job 1 — The Resident Who Sees Construction and Can't Find Answers
> "When I (a Richmond resident) see road construction, utility work, or lane closures on my daily commute but have no idea what the project is, who's doing it, when it started, or when it will end, I want to look up what's happening at a specific location and get a plain-English explanation, so I can plan my route and understand when the disruption will be over."

**Current workaround:** Search the DPW "Construction Projects & Road Improvements" page and encounter a mix of current projects, a 2021 public hearing notice, and closed surveys with no posted results (`C4_services_gaps.md`). Try the Capital Project Dashboard, which only updates quarterly and only includes funded projects (`D1_data_arcgis_dpw.md`). Check the Richmond Impact Map on the Open Data Portal, which lists a "Weekly" update cadence but was last updated 2023-03-31 (`D2_data_open_data_portal.md`). Search Reddit r/rva and ask "Is there a place online that details what is being built where?" (`B1_users_concerned_resident.md`). Call DPW at 804-646-6430 and hope someone can look up the specific project in whichever internal system it lives in.

**Pain:** Richmond's infrastructure data is fragmented across the ArcGIS GeoHub (paving maps, road centerlines), the Socrata Open Data Portal (Impact Map, street sweeping), CIP PDFs, departmental program pages, and the Online Permit Portal — with no cross-referencing by address (`A5_problem_landscape_infrastructure_data_fragmentation.md`). The Capital Project Dashboard only includes funded projects and updates quarterly, so residents asking about a construction crew outside their window today get an answer that may be four months old (`D1_data_arcgis_dpw.md`, `G4_risks_data_freshness.md`). Construction permits and right-of-way closures are not discoverable as public GIS layers (`D1_data_arcgis_dpw.md`). Residents are triggered to seek information by immediate impacts — parking, access, noise, utility shutoffs — but the City's pages are organized by program, not by location or impact (`B1_users_concerned_resident.md`). Businesses near road construction lose up to 40% of revenues, making accurate timeline information economically critical (`G1_risks_inaccurate_project_info.md`).

### Job 2 — The Neighborhood Leader Who Needs to Inform Neighbors
> "When I (a neighborhood association president or community organizer) need to inform neighbors about upcoming infrastructure work — road resurfacing, water main replacement, sidewalk construction — but can't find a unified schedule, I want a notification system or map I can share that shows what's planned, active, and completed in my area, so I can keep my community informed without having to manually check five different City systems."

**Current workaround:** Monitor DPW's X (Twitter) account @DPW_RichmondVA for day-of closure announcements and repost to neighborhood channels (`B1_users_concerned_resident.md`). Attend civic association meetings and hope a DPW representative presents. Check the DPW News page at rva.gov/public-works/news for official updates, which are citywide rather than hyper-local (`B1_users_concerned_resident.md`). Manually cross-reference the annual paving list PDFs (FY25 and FY26) with neighborhood boundaries to identify which streets are scheduled (`D2_data_open_data_portal.md`). File RVA311 requests and wait for responses to individual questions about specific streets.

**Pain:** No single channel reaches all residents, and no system allows proactive geographic subscription. DPW social media posts expire in feeds and are not hyper-local by block (`B1_users_concerned_resident.md`). The paving program runs April through November each year, but exceptions occur — milling and overlay projects in January, road closures in March — with no consolidated future-facing calendar (`B1_users_concerned_resident.md`). Chicago's ChiStreetWork allows residents to draw a custom boundary and receive daily, weekly, or monthly alerts; Richmond has nothing comparable (`E1_prior_art_project_trackers.md`). DPW receives over 1,000 traffic calming requests per year but publishes no public queue showing screening, design, or funding stages (`C4_services_gaps.md`). Neighborhood leaders currently act as unpaid information brokers, manually stitching together fragments from multiple City systems to assemble a neighborhood-level picture.

### Job 3 — The City Staffer Who Fields "What's Happening on My Street?"
> "When I (a City communications or DPW staffer) field calls from residents asking 'what's happening on my street?' and currently check multiple internal systems — GeoHub, Legistar, capital project databases, VDOT SMART Scale — I want a public-facing tool that reduces the call volume by giving residents self-serve answers, so I can spend my time on operational coordination instead of manual information routing."

**Current workaround:** Answer individual phone calls and emails by querying internal systems that do not share identifiers or present a unified view. Check the CIP Dashboard for funded projects, the Online Permit Portal for construction permits, and DPW program pages for paving and sweeping schedules — none of which are linked (`A5_problem_landscape_infrastructure_data_fragmentation.md`). Relay VDOT project information from separate state systems that the City does not control. Spend significant time chasing operations staff for project updates due to a lack of real-time information flow between field crews and communications staff (`B3_users_dpw_comms.md`).

**Pain:** 81% of residents still call 311 rather than using digital channels, and self-service tools lack basic features like search that would make them usable (`B3_users_dpw_comms.md`). Communications staff are acting as manual information routers for high-volume, low-complexity queries that should be automated (`B3_users_dpw_comms.md`). Internal CRM data is often inaccurate — audit data from comparable cities shows 39% incorrect SLAs in Solid Waste and 61% in Development Services (`B3_users_dpw_comms.md`). RVA311 data is not published as an open dataset, so there is no way to analyze call patterns geographically to identify communication hot spots (`D2_data_open_data_portal.md`, `E3_prior_art_311_integration.md`). Philadelphia's StreetSmartPHL reduced informational 311 calls by unifying closures, paving, and service disruptions into a single portal with hourly refresh and inline 311 reporting (`E1_prior_art_project_trackers.md`). Richmond's DPW manages 832 center-lane miles of streets, 836 miles of sidewalk, and 83 bridges — the scale demands self-serve tooling, not phone-based triage (`B1_users_concerned_resident.md`).

---

## Open Questions

### Data Questions
1. What is the actual update cadence of the Capital Project Dashboard — the City says "quarterly" but provides no published SLA. When was it last refreshed?
2. Is the Richmond Impact Map (Socrata dataset `aq4i-4gpd`) being actively maintained, or has it been effectively abandoned since its last update on 2023-03-31 (`D2_data_open_data_portal.md`)?
3. Can the FeatureLayer(s) underlying the CIP Dashboard webmap (ID: `270285e87d684a95bd1ebd9a078aa6df`) be queried directly via ArcGIS REST, and what are the exact field schemas — particularly phase domain values, estimated completion date formats, and geometry types (`D1_data_arcgis_dpw.md`)?
4. Does Richmond's Online Permit Portal expose an API for active right-of-way and construction permits, or is it a closed portal requiring login (`D2_data_open_data_portal.md`)?
5. What is the VDOT Full_Crash FeatureServer update cadence, and what license/attribution requirements apply to displaying crash data in a third-party tool (`D1_data_arcgis_dpw.md`)?

### User Questions
6. What percentage of DPW-related RVA311 calls are purely informational ("What's happening on my street?") versus actionable service requests (potholes, missed pickups)?
7. Do residents in historically underinvested neighborhoods (East End, Southside) experience higher rates of unannounced infrastructure disruptions than citywide averages?
8. How do Richmond business owners currently learn about construction timelines that will affect their storefronts — is there a direct notification channel from DPW?
9. What share of Richmond households are smartphone-only (no desktop/broadband), and how does this affect the viability of a map-first interface (`B5_users_accessibility.md`)?

### Integration Questions
10. Does the City's project management system assign unique, stable project IDs that persist across budget cycles — or do IDs fragment annually like Norfolk's CIP datasets (`E1_prior_art_project_trackers.md`, `E4_prior_art_failures.md`)?
11. Can VDOT SMART Scale project data for Richmond-area transportation projects be accessed programmatically, and can it be joined to the CIP Dashboard by location?
12. Does RVA311 support Open311 standards, and could a tool submit or retrieve service requests via API (`E3_prior_art_311_integration.md`)?

### Equity Questions
13. What percentage of Richmond's Limited English Proficiency population lives in areas with active or planned infrastructure projects — and is any project communication available in Spanish (`B5_users_accessibility.md`, `B1_users_concerned_resident.md`)?
14. How do accessibility-dependent residents (wheelchair users, visually impaired) currently learn about sidewalk closures and ADA detour routes during construction — and does DPW publish its permitted pedestrian routing plans digitally (`B5_users_accessibility.md`)?
15. If GRTC CARE paratransit riders cannot reach pickup points due to unannounced construction, are "no-show" penalties waived — and could proactive alerts prevent avoidable service suspensions (`B5_users_accessibility.md`)?

### Prior Art & Sustainability Questions
16. What specific post-hackathon continuation pathway exists for a prototype — is there a named host department, product owner, or budgeted maintenance hours (`E4_prior_art_failures.md`)?
17. Given that NYC's Capital Projects Dashboard went six months without an update and contained only 46.8% of project IDs, what governance commitments would Richmond need to make to avoid the same fate (`E4_prior_art_failures.md`)?
18. Could Richmond adopt the "ETL to static" architecture pattern (nightly normalization, CDN-hosted GeoJSON) to decouple the resident-facing tool from upstream source churn and rate limits (`A5_problem_landscape_infrastructure_data_fragmentation.md`)?

---

## Answered Questions (Parallel AI Research, April 2026)

Synthesis from `archive/reviews/thriving-built-environment/_research-answers/iv_q1_data.md` and `iv_q2_equity.md`. Tags reflect how fully the research brief resolved each open question (not a guarantee of future City policy).

### Data Questions

1. **[Partial]** The City states the Capital Project Dashboard is updated **quarterly** and labels the experience **Beta**; no **published last-refresh timestamp** was found on the public dashboard or CIP page, so “when was it last refreshed” remains unverifiable from public sources alone.

2. **[Confirmed]** The Richmond Impact Map is **not maintained** in practice: research found **last updated March 31, 2023** despite a **weekly** stated cadence; Transportation is identified as the data owner department.

3. **[Partial]** The CIP Dashboard’s underlying FeatureLayer **cannot be queried anonymously** via public ArcGIS REST — services sit behind the City GIS portal (**sign-in required**). The research file did **not** enumerate field schemas (phase domains, date formats, geometry types).

4. **[Confirmed]** Richmond’s Online Permit Portal (**EnerGov Citizen Self Service**) has **no public API**; access is manual through the web UI. Portal: `https://energov.richmondgov.com/energov_prod/selfservice#/home`. Support: `CSSHelp@richmondgov.com`.

5. **[Still Unknown]** VDOT **Full_Crash** FeatureServer update cadence and **license/attribution** requirements for third-party display were **not addressed** in the Parallel briefs.

### User Questions

6. **[Still Unknown]** The City **does not publish** a breakdown of DPW-related 311 requests into informational vs. actionable; no official statistic was found on the Open Data Portal or in public reports.

7. **[Still Unknown]** Comparative **rates of unannounced disruptions** in East End, Southside, or other corridors vs. citywide averages were **not researched** in these files.

8. **[Still Unknown]** **Direct DPW-to-business** notification channels for construction timelines were **not covered** in the Parallel answers.

9. **[Partial]** The City does not publish a dedicated “smartphone-only households” figure; research points to **ACS Table S2801** (Richmond city, Virginia) as the calculation source and discusses **map-first UX risks** and mitigations (list views, mobile-first pages, alt text). Treat any single extracted percentage as **verify against Census** if used in product decisions.

### Integration Questions

10. **[Still Unknown]** Whether Richmond’s project management assigns **stable IDs across budget cycles** (vs. annual fragmentation like Norfolk) was **not directly investigated** in these briefs.

11. **[Partial]** **VDOT SMART Scale–related data** has **programmatic access** in the ecosystem researched (e.g., **SMART Portal**, **JSON/GeoJSON** via ArcGIS-style open data; **DRPT** noted for transit/rail). **Joining to Richmond CIP** is **technically feasible** if Richmond records include consistent **UPC / SMART SCALE identifiers**; the main risk called out is **identifier completeness and consistency** in City records.

12. **[Confirmed]** **RVA311 does not support Open311** in publicly documented form; no public developer API for submit/retrieve was identified. Channels: phone, **RVA311.com**, mobile app (24/7).

### Equity Questions

13. **[Partial]** **LEP share near active/planned projects** can be estimated by **spatial intersection** of CIP (or similar) with **PlanRVA / RVAgreen 2050 Climate Equity Index**-style LEP layers; regional context notes **south Richmond** LEP concentration. **Spanish**: CIP portal includes **Google Translate™** and references a broader **Language Access Plan**; **project-level Spanish** is **not consistently** available on project pages. Translation requests: **804-646-7000** or **311**.

14. **[Partial]** **Sidewalk closures / ADA detours**: **VDOT Virginia Work Area Protection Manual (WAPM)** drives **on-site signage and channelization**; DPW may post some closure info on **project pages**; **Richmond Ready** (Everbridge, opt-in app) is a **primary alert** channel for citywide disruption-class alerts. Research found **no centralized digital map** consolidating **all** active sidewalk closures and paired ADA detour routes.

15. **[Still Unknown]** **GRTC CARE paratransit** no-show policies during construction and whether **proactive alerts** could reduce penalties were **not addressed** in these briefs.

### Prior Art & Sustainability Questions

16. **[Confirmed]** For **Hack for RVA** (March 27–29, 2026), research found **no published formal post-event adoption/incubation pathway** — no named **host department**, **product owner**, or governance process in official materials reviewed; event framing emphasizes partners and **$10k** in prizes.

17. **[Confirmed]** NYC **Comptroller** report (*Flying Blind on Billions…*) cited **46.8%** FMS project ID coverage, **58.1%** planned commitments, **inconsistent IDs**, weak FMS↔project-system linkages, and **triannual** OMB-tied cadence with **reliability concerns**. **Lessons for Richmond**: mandate **standardized IDs** across systems, **full capital coverage**, **publish raw/open underlying data**, and enforce a **strict recurring agency update cadence**.

18. **[Confirmed]** **Nightly ETL to versioned static GeoJSON** (e.g., CDN-hosted) is assessed as **highly feasible** for resident-facing tools: decouples uptime from live ArcGIS, improves **performance/caching**, aids **low-bandwidth/mobile** users, and enables **versioned transparency**. (Research notes ArcGIS as the current CIP stack — public anonymous Feature Service access conflicts with `iv_q1` sign-in finding; any ETL may require **authenticated or internal** extract paths — **operational detail for City IT**.)

**Summary:** 6 Confirmed / 6 Partial / 6 Still Unknown out of 18 questions.
