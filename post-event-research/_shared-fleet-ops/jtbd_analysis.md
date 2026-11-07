# JTBD Analysis — Fleet Operations & Street Service Tracking

**Pillar:** Thriving and Sustainable Built Environment
**Problem Statement (verbatim):** Fleet Operations & Street Service Tracking — Improve how DPW supervisors and residents track the progress of services like snow removal and street cleaning in real time.
**Applies to:** Stay Informed (All Your Bass), Road Maintenance Fleet Tracker
**Research Date:** April 1, 2026

---

## Jobs To Be Done

### Job 1 — The Resident Who Can't Tell If Their Street Has Been Plowed
> "When I (a Richmond resident) am stuck at home during a snow event, looking out my window at an unplowed street with no idea if a plow is coming in an hour or tomorrow morning — and my street isn't one of the big arterials that always gets done first — I want to check a map or status page that shows real-time plow progress so I can decide whether to attempt driving to work, keep my kids home from school, or just wait it out."

**Current workaround:** Call 311 and get no specific answer. Check the DPW Twitter/X account (@DPW_RichmondVA) for general "crews are out" statements that don't name specific streets. Ask neighbors on Nextdoor or Reddit r/rva whether they've seen a plow. Drive to the nearest arterial to see if it's been treated and extrapolate. Watch local TV news (WTVR, NBC12) for general citywide updates.

**Pain:** Richmond manages 1,800 lane miles with 75 trucks operating in 12-hour shifts, prioritizing P1 and P2 routes across four geographic areas (Northside, Southside, Downtown/Fan/Museum District, East End) before reaching residential streets (`A2_problem_landscape_fleet_operations.md`). Residents have no way to see where their street falls in this priority hierarchy, whether their zone has been started, or how long it will be before their neighborhood is reached. DPW's public communications provide citywide status ("crews deployed") without street-level granularity (`B1_users_concerned_resident.md`). The absence of any "last serviced" timestamp means callers to 311 get the same non-answer regardless of whether their street was plowed two hours ago or hasn't been touched. Cities that have deployed public plow trackers (NYC PlowNYC, VDOT Plows) report significant reductions in 311 call volume — Vaughan, Ontario dropped from 400 calls per hour to a fraction after launching a public plow map (`A2_problem_landscape_fleet_operations.md`).

### Job 2 — The DPW Supervisor Managing a Fleet Without Visibility
> "When I (a DPW operations supervisor) am running a snow shift with 20+ trucks across my zone and I need to know which routes are complete, which trucks are behind schedule, and whether a breakdown on Broad Street means I need to reroute a truck from the Southside — and all I have is radio check-ins every 45 minutes and a whiteboard — I want a dashboard showing where each truck is, which routes are complete, and which are falling behind, so I can reallocate resources in real time instead of waiting for the next radio call."

**Current workaround:** Rely on two-way radio check-ins every 30–60 minutes, with each exchange consuming 60–90 seconds of airtime. Maintain a physical whiteboard or spreadsheet tracking route completion manually. Call individual drivers on their cell phones when radio channels are congested. Make redeployment decisions based on incomplete information — often not knowing a truck broke down until the next check-in cycle. At end of shift, reconcile paper route cards and time sheets (`A2_problem_landscape_fleet_operations.md`).

**Pain:** Radio-based tracking creates a severe bottleneck during peak storm intensity. With 75 trucks checking in every 45 minutes, a single dispatcher spends roughly 1–1.5 staff-hours per clock hour just logging locations — time that cannot be spent on exception management (`A2_problem_landscape_fleet_operations.md`). Before GPS implementation, Chicago fleet managers "wouldn't have any idea of where a vehicle was deployed, versus where the snow activity was going on" (`B2_users_dpw_supervisor.md`). The VDOT NOVA pilot found that complex in-cab AVL messaging proved unfeasible for contract drivers, forcing reversion to traditional radio, and portable AVL units suffered a 5–10% failure rate per storm from wire breaks and display fractures in harsh winter conditions (`A2_problem_landscape_fleet_operations.md`). Richmond's GPS installation is mid-rollout — not all 75 trucks have active telemetry — meaning supervisors operate with fragmented visibility: some trucks visible on a screen, others known only by last radio contact. This hybrid state is arguably worse than fully manual, because the partial picture can mislead (`D5_data_quality.md`).

### Job 3 — The 311 Operator With No Data to Give Callers
> "When I (a Richmond 311 operator) take a call from a frustrated resident asking 'When will my street be plowed?' or 'Has the street sweeper come through Carytown yet?' and I have no real-time fleet data, no zone completion status, and no ETA to offer — I want access to the same real-time fleet status that operations has so I can give callers an honest, specific answer like 'Your zone was last serviced 2 hours ago' or 'Priority 1 routes in your area are complete, residential streets are expected by 6 PM' instead of 'We'll get to it.'"

**Current workaround:** Read from a generic script with no street-level information. Transfer the caller to DPW operations, adding to radio/phone congestion during peak events. Check the DPW Twitter/X feed for any recent posts. Tell the caller "crews are deployed" and suggest they check back later. Log a 311 service request that may not be actionable during an active storm event.

**Pain:** 311 operators are the primary interface between DPW operations and the public during service events, yet they have no access to operational data. In San Antonio, 311 handled 285,050 calls in a single fiscal year — 81% of all service request volume — because digital self-service tools lacked the information residents needed (`B3_users_dpw_comms.md`). When 311 operators cannot provide accurate answers, they generate repeat calls (the same resident calling back for updates), further loading the system. Howard County, Maryland found that making real-time road condition information available to the public via a website decreased call volume and also allowed 911 dispatchers to route emergency vehicles based on cleared paths — a safety benefit beyond call deflection (`A2_problem_landscape_fleet_operations.md`). The communication gap between field operations and public-facing staff is structural: DPW communications staff spend significant time "chasing operations staff for project updates due to a lack of real-time information flow" (`B3_users_dpw_comms.md`). Without a shared data layer, every resident inquiry requires a manual relay chain from 311 → comms → operations → comms → 311 → resident.

---

## Open Questions

### Data Questions
1. What is the current status of Richmond DPW's GPS/AVL installation across the 75-truck fleet — how many trucks have active, transmitting units today, and what is the timeline for completing the remaining installations?
2. Does Richmond's fleet telematics vendor (if selected) expose a standard API endpoint, and is it compatible with Esri ArcGIS Velocity or similar ingestion pipelines?
3. What polling interval does the current GPS hardware support — does it transmit every 30 seconds (like Chicago's system) or at longer intervals that would limit real-time tracking?
4. Does Richmond maintain machine-readable shapefiles or GeoJSON for its P1/P2/P3 snow priority routes and its street sweeping zone polygons, and are they published on the City's open data portal or GeoHub?
5. What is the schema and update frequency of Richmond's existing 311/RVA311 system for snow-related and street-cleaning complaints — can service request data be cross-referenced with fleet zones?

### User Questions
6. How do DPW supervisors currently track route completion during a snow event — whiteboard, spreadsheet, paper route cards, or some combination? What is the actual radio check-in cadence under storm conditions?
7. What information do 311 operators currently have access to during snow events — do they receive any briefings from DPW operations, or are they working from static scripts only?
8. How do Richmond residents currently learn about snow operations progress — DPW social media, local news, word of mouth? Is there any survey data on preferred channels?
9. Would DPW field operators accept a simple mobile form for route-complete submissions, or does union policy or operational culture create resistance to in-cab digital tools?

### Integration Questions
10. Can Richmond's 311/RVA311 system be programmatically queried to overlay complaint clusters on a fleet status map in real time?
11. Does the existing ArcGIS infrastructure at Richmond GeoHub support publishing a live or near-live feature service that could serve both an internal supervisor dashboard and a public-facing status map?
12. Is there an existing data-sharing pathway between DPW operations systems and the City's communications/PIO team, or would a new tool need to create this bridge?

### Equity Questions
13. What percentage of Richmond residents rely on prepaid mobile plans that may block SMS short codes — and does the City's existing alert infrastructure (text-to-subscribe) reach these users?
14. How does Richmond currently communicate snow operations status to residents with Limited English Proficiency (LEP)? Does DPW's Title VI compliance extend to real-time service updates, or only to static project pages?
15. Which Richmond neighborhoods have the weakest cellular coverage, potentially affecting both GPS telemetry from trucks and residents' ability to access a mobile status tool?
16. Are there existing community touchpoints (libraries, community centers, churches) that could serve as information hubs during snow events for residents without internet access?

### Prior Art Questions
17. Has Richmond DPW previously attempted or been pitched a public-facing fleet tracker — and if so, what happened?
18. What distinguishes the snow plow trackers that survive beyond a single season (PlowNYC, VDOT Plows) from the civic tech projects that die after one winter — and which pattern does Richmond's current capacity support?
19. Syracuse's hackathon-to-production plow tracker succeeded because the city's Chief Data Officer was embedded from day one — does Richmond have an equivalent champion within DPW or the CTO's office?

---

## Answered Questions (Parallel AI Research, April 2026)

Synthesis from `archive/reviews/thriving-built-environment/_research-answers/fo_q1_data.md` and `fo_q2_equity.md`. Tags reflect how fully the research brief resolved each open question.

### Data Questions

1. **[Partial]** **Fleet scale** is corroborated in public materials: ~**240** employees, **75** snow trucks, **12-hour** shifts, **~2,500** lane miles. **How many trucks have active GPS/AVL** and **rollout completion/timeline** are **not disclosed** in public documentation reviewed (including storm reporting).

2. **[Partial]** A **specific telematics vendor** was **not identified** in public sources (contracts view may list “Telematics Tracking” without supplier). **ArcGIS-compatible public API** for fleet telemetry: **not confirmed** (`Has Arcgis Compatible Api: False` in brief).

3. **[Still Unknown]** **GPS polling interval** (e.g., 30s vs. longer) for Richmond hardware was **not documented** in these research files.

4. **[Partial]** **Snow priority routes**: available via **ArcGIS Instant App** and **PDF** — research did **not** find a direct **shapefile/GeoJSON** download on the open portal. **Street sweeping zones**: **yes** — Open Data Portal dataset **`2dh8-bzzs`** with **API** (`https://data.richmondgov.com/d/2dh8-bzzs`).

5. **[Partial]** **RVA311** for snow: **no individual snow removal requests**; operators work from **static P1/P2/P3 policy scripts**, not **real-time operational feeds** (`Has Realtime Dpw Data Access: False`). **Full schema/update frequency** for snow/street-cleaning request types was **not exhaustively documented** in the brief.

### User Questions

6. **[Partial]** Official snow page states **route supervisors assess removal in real time** and adjust routes/tools; the **specific tools** (whiteboard, spreadsheet, radio vs. digital AVL dashboard) are **not specified** in public docs.

7. **[Confirmed]** **311 operators** use **static policy/plan information** (priority system), not live fleet data — aligned with **no per-street snow requests** through 311.

8. **[Confirmed]** Residents are directed to **RVA.gov snow removal** pages, **social media**, and **local news** for progress; **VDOT plow tracker** is referenced for **state-maintained** roads (`https://plows.vdot.virginia.gov/`).

9. **[Still Unknown]** **In-cab digital tools / mobile forms** and **union or cultural resistance** in **Richmond DPW snow ops**: research found **no Richmond-specific documentation**; general labor/telematics acceptance risks noted as **industry context** with **research gap flagged**.

### Integration Questions

10. **[Still Unknown]** Whether **RVA311 can be programmatically queried** for overlay with fleet maps (APIs, bulk export, real-time feeds) was **not established** in these briefs (complements infra finding: **no Open311** publicly).

11. **[Still Unknown]** Whether **Richmond GeoHub / ArcGIS** can publish a **live or near-live** shared feature service for **internal + public** maps was **not validated** in the Parallel answers.

12. **[Still Unknown]** Existing **DPW ↔ communications/PIO** data-sharing pathways were **not mapped** in these files.

### Equity Questions

13. **[Partial]** **City-level prepaid mobile share** for Richmond was **not found** in public sources reviewed. **Short-code blocking risk** on some prepaid plans is **affirmed** as an **equity risk** for SMS-based alerts.

14. **[Partial]** Richmond has a formal **Language Access Plan (LAP, April 2020)** and **Title VI** framing for **meaningful LEP access**; **DOJ / EO 13166** guidance applies. A **published, snow-specific real-time LEP protocol** was **not identified** — characterized as a **potential gap** vs. static obligations.

15. **[Partial]** **Neighborhood-by-neighborhood** weak-coverage maps were **not named** in an official city report; research points to **public coverage tools** (e.g., **nPerf**) for **intra-city variability**, and notes impacts on **vehicle telemetry** (buffered/store-and-forward mitigations) and **resident map access**.

16. **[Still Unknown]** **Libraries, community centers, churches** as **snow-event information hubs** was **not researched** in these briefs.

### Prior Art Questions

17. **[Confirmed]** No evidence found that **Richmond DPW** has **attempted, been pitched, or operates** a **public city plow tracker**; communications point residents to **VDOT** for state roads.

18. **[Confirmed]** Durable trackers (**PlowNYC**, **VDOT Plows**, **Chicago**, **Howard County/Geotab Citizen Insights**, **Syracuse/Esri**) share patterns: **owning agency** (sanitation/streets/DPW-class), **budget as operations**, **AVL + enterprise GIS integration**, **embedded in comms/incident workflows**. **Civic tech failure modes**: unclear owner, **no enterprise integration**, **volunteer maintenance**.

19. **[Still Unknown]** **Syracuse** success attributed to **CDO (Sam Edelstein)** stewardship and **Esri** partnership; whether **Richmond** has a **named equivalent champion** in **DPW or central IT** was **not answered** by these briefs.

**Summary:** 4 Confirmed / 8 Partial / 7 Still Unknown out of 19 questions.
