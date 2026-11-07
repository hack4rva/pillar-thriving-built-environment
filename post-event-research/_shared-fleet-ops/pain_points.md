# Pain Point Research — Fleet Operations & Street Service Tracking

**Pillar:** Thriving and Sustainable Built Environment
**Problem Statement:** Improve how DPW supervisors and residents track the progress of services like snow removal and street cleaning in real time.
**Applies to:** Stay Informed (All Your Bass), Road Maintenance Fleet Tracker
**Research Date:** April 1, 2026

**Evidence sources from existing corpus:**
- `A2_problem_landscape_fleet_operations.md` — Snow ops without AVL: manual tracking, radio bottlenecks, and hybrid workflow design
- `A4_problem_landscape_public_works_transparency.md` — National transparency failures and data fragmentation patterns
- `A5_problem_landscape_infrastructure_data_fragmentation.md` — *Not present in research corpus; not referenced below*
- `B1_users_concerned_resident.md` — Richmond resident persona: discovery friction, channel fragmentation, equity barriers
- `B2_users_dpw_supervisor.md` — DPW supervisor persona: workflows, decision gates, and tool requirements
- `B3_users_dpw_comms.md` — DPW communications staff: 311 bottlenecks, SLA inaccuracy, and storm surge playbook
- `B4_users_stakeholders_map.md` — *Off-topic: covers B4 kernel patch management tool, not Richmond DPW stakeholders; not referenced below*
- `G1_risks_inaccurate_project_info.md` — Timeline volatility, legal liability, and disclaimer requirements
- `G2_risks_gps_dependency.md` — GPS schema drift, synthetic data labeling, and migration effort
- `G3_risks_accessibility.md` — Map accessibility failures, SMS equity gaps, and WCAG compliance
- `G5_risks_guardrails.md` — 10-guardrail checklist for prototype de-risking

---

## Pain Points by JTBD

### Job 1 — The Resident Who Can't Tell If Their Street Has Been Plowed

**P1.1: Zero Street-Level Visibility During Service Events**
Richmond provides no public-facing mechanism — map, status page, or lookup — for residents to check whether their specific street has been serviced. DPW's communications during snow events consist of general citywide statements ("crews are deployed") via Twitter/X, press releases, and local news amplification. None of these channels provide street-level or even zone-level granularity. Residents are left to infer service status from looking out their window or asking neighbors (`B1_users_concerned_resident.md`, `A2_problem_landscape_fleet_operations.md`).

This contrasts sharply with peer cities. NYC's PlowNYC publishes "last serviced" data by street segment in time buckets. Chicago's Plow Tracker shows route status with a 30-second GPS refresh. VDOT publishes live vehicle locations statewide with 2-minute updates. Vaughan, Ontario, which previously received 400 calls per hour during winter maintenance, saw complaints drop significantly after launching a public website with plow "cookie trails" (`A2_problem_landscape_fleet_operations.md`).

**P1.2: The Priority System Is Invisible to the People It Affects**
Richmond's snow operations follow a strict hierarchy: Priority 1 routes (arterials, hospital access, emergency routes — 700 lane miles), then P2 (200 miles), then P3 residential (1,600 miles) across four geographic areas. This system is operationally rational but completely opaque to residents. No public map shows which streets are P1 vs. P3. A resident on a residential street has no way to know they are in the lowest-priority tier, that P1 routes in their area may already be complete, or roughly when their zone might be reached (`A2_problem_landscape_fleet_operations.md`).

The result is a perceived fairness gap. Residents on arterials get plowed first and may not understand why their neighbor two blocks away is still buried. Without visibility into the priority system, every unplowed street feels like it's been forgotten.

**P1.3: 311 Cannot Answer the Most Common Storm Question**
When residents call 311 during a snow event, operators have no real-time fleet data, no zone completion status, and no ETA to offer. They work from generic scripts and redirect callers to DPW — adding to the radio/phone congestion that already burdens operations. In San Antonio (a peer-scale city), 311 handled 285,050 calls in a fiscal year, with 81% arriving by phone because digital self-service tools lacked the information residents needed (`B3_users_dpw_comms.md`).

The cycle is self-reinforcing: no data → generic answers → unsatisfied callers → repeat calls → more load on 311 → less capacity for other service requests. Howard County, Maryland, broke this cycle by publishing real-time road condition data online, which decreased call volume and additionally enabled 911 dispatchers to route emergency vehicles on cleared paths (`A2_problem_landscape_fleet_operations.md`).

**P1.4: Discovery Channels Are Fragmented and Unanchored**
Residents piece together fleet service information from DPW project pages, DPW's Twitter/X feed, NBC12 and WTVR Facebook posts, Reddit r/rva threads, and Nextdoor. No single channel provides authoritative, address-specific answers. A Reddit thread asking "Is there a place online that details what is being built where?" captures the core frustration (`B1_users_concerned_resident.md`).

DPW's existing web pages compound this problem. The Construction Projects & Road Improvements page mixes a 2021 hearing deadline (still live) with closed survey links showing no posted results and instructions to visit City Hall's 6th floor to review documents in person. There is no centralized, date-stamped project or service index (`C4_services_gaps.md`).

---

### Job 2 — The DPW Supervisor Managing a Fleet Without Visibility

**P2.1: Radio-Based Tracking Creates a 75-Truck Bottleneck**
With 75 trucks checking in via radio every 30–60 minutes, and each exchange consuming 60–90 seconds of airtime and data entry, a single dispatcher spends roughly 1–1.5 staff-hours per clock hour simply logging vehicle locations. This consumes the dispatcher's entire capacity during peak storm intensity, leaving no bandwidth for exception management — the actual high-value supervisory work like rerouting around breakdowns or responding to 311 complaint clusters (`A2_problem_landscape_fleet_operations.md`).

Pre-GPS Chicago fleet managers "wouldn't have any idea of where a vehicle was deployed, versus where the snow activity was going on." This is Richmond's current state for trucks without active telemetry (`B2_users_dpw_supervisor.md`).

**P2.2: Partial GPS Is Worse Than None**
Richmond's GPS installation is mid-rollout. Some trucks transmit; others are known only by last radio contact. This hybrid state creates a fragmented picture that can actively mislead: a supervisor sees 15 trucks on screen, assumes that's the whole picture, and fails to account for 5 more that are radio-only and have gone silent. The VDOT NOVA pilot found that when the AVL system failed to supply real-time data reliably, field personnel lost confidence and stopped relying on it altogether — reverting to radio and negating the investment (`A2_problem_landscape_fleet_operations.md`).

The D3=2 data readiness score means GPS data is managed "in an ad hoc manner" — schemas are unstable, uptime is unguaranteed, and hardcoding an application to the current data format guarantees rework when the vendor finalizes their integration (`D5_data_quality.md`, `G2_risks_gps_dependency.md`).

**P2.3: No Exception-Based Decision Support**
Modern winter operations management requires exception management capabilities — event cancellation, task prioritization, route transfers — that depend entirely on real-time data. Without it, supervisors default to conservative, slow redeployments: waiting for the next radio check-in before rerouting a truck, sending a vehicle to reload salt without knowing if the closest depot is stocked, or treating a priority corridor a second time because there's no confirmation the first pass was completed (`A2_problem_landscape_fleet_operations.md`, `B2_users_dpw_supervisor.md`).

DSNY in NYC uses 311 Rapid Service Requests to map complaint locations and provide awareness to field personnel during operations — an integration pattern Richmond entirely lacks. Chicago's supervisors can see exact vehicle paths and U-turns in dense city blocks at 30-second granularity, confirming curb-to-curb completion without radio chatter (`B2_users_dpw_supervisor.md`).

**P2.4: In-Cab Complexity Kills Adoption**
The VDOT NOVA pilot found that complex in-cab AVL messaging proved unfeasible for contract drivers, forcing the agency to abandon it and revert to traditional radio. Portable AVL units suffered a 5–10% failure rate per storm from wire breaks, display screen fractures, and disconnected plugs in the harsh winter cab environment. Waukesha, Wisconsin, stopped their AVL test entirely after experiencing server problems and slow polling speeds. These failures demonstrate that any manual-input tool for drivers must be extremely simple — one tap, no typing, no complex navigation (`A2_problem_landscape_fleet_operations.md`).

Union and privacy concerns add friction. Employees worry about being tracked outside work hours. Successful agencies (per Smartrak, Timeero) mitigate this by establishing clear policies: "private use is private," tracking limited to work hours, employees can access their own records (`B2_users_dpw_supervisor.md`).

---

### Job 3 — The 311 Operator With No Data to Give Callers

**P3.1: The Communication Gap Is Structural, Not Incidental**
DPW communications staff act as manual information routers between field operations and the public, but have no real-time data pipeline to draw from. The gap between what DPW operations knows and what 311/comms can tell callers is not a training problem — it's an architecture problem. There is no shared data layer connecting field status to public-facing channels (`B3_users_dpw_comms.md`).

Staff spend significant time "chasing operations staff for project updates due to a lack of real-time information flow." Every resident inquiry during a storm requires a manual relay chain: 311 → comms → operations → comms → 311 → resident. Each link introduces delay and information loss (`B3_users_dpw_comms.md`).

**P3.2: SLA Data in the CRM Is Often Wrong**
Even when 311 operators have access to a CRM, the underlying Service Level Agreements may be inaccurate. In San Antonio, an audit found that 39% of Solid Waste SLAs and 61% of Development Services SLAs in the CRM were incorrect. Of 1,501 complaints entered in FY2016, 87% remained open with no resolution notes. If Richmond's 311 system has similar data quality issues, operators may be giving callers confidently wrong information — which is worse than no information (`B3_users_dpw_comms.md`).

**P3.3: Digital Self-Service Fails, Forcing Everything to Phone**
In San Antonio, the 311 web portal contained 133 service request options and 172 information categories but had no search feature — users had to read multiple pages of categories to find their issue. The mobile app lacked several of the top-10 service request categories. Result: 81% of all service requests came via phone. Richmond's digital self-service for snow/sweeping status is effectively nonexistent, meaning every query becomes a phone call to 311 or a social media post hoping for an answer (`B3_users_dpw_comms.md`).

**P3.4: Storm Surge Communications Are Reactive, Not Proactive**
During snow events, call volume spikes dramatically. Cities with proactive text-to-subscribe alert systems capture massive audiences at exactly the right moment — Caerphilly gained 10,000 new subscriptions in 48 hours during a snow event. St. Paul's "STPAUL SNOW" text-to-subscribe system offers multi-lingual alerts (English, Spanish, Hmong, Somali, Oromo). Richmond has no equivalent proactive, opt-in alert system for fleet service status. Every status inquiry is reactive — a resident initiating contact, rather than the city pushing information when it's most needed (`B3_users_dpw_comms.md`).

---

## Cross-Cutting Pain Points

### GPS Data Dependency and Schema Risk

**P4.1: Building on Unstable Data Guarantees Rework**
The fleet GPS data is at D3=2 readiness — "ad hoc" management with no formal schema, no guaranteed uptime, and no documented API. Building a prototype against an assumed data format creates immediate technical debt. If the eventual vendor schema differs from the mock, rework ranges from <4 hours (standard-to-standard swap) to 1–2 weeks (divergent format requiring new middleware). The mitigation is schema-first design anchored to GTFS-Realtime and MDS standards, so the real feed is a configuration change, not a code rewrite (`D5_data_quality.md`, `G2_risks_gps_dependency.md`).

**P4.2: Real GPS Has Jitter, Gaps, and Latency That Mocks Don't**
Synthetic data is instant and clean. Real GPS feeds have cellular dead zones (requiring store-and-forward caching in vehicles), coordinate precision limited to 5–6 decimal places, and variable latency. If the prototype UI assumes instant, gapless updates, it will look broken when real data arrives. The synthetic generator must include artificial jitter, dropped pings, and `ttl` (time-to-live) fields so the frontend is pre-adapted to real-world conditions (`D5_data_quality.md`, `G2_risks_gps_dependency.md`).

### Data Freshness and Public Trust

**P5.1: Stale Data Is Not Neutral — It Actively Destroys Trust**
87% of residents say a great digital government experience increases their trust; 81% say a negative experience decreases it. A dashboard showing a street as "Active" months after completion, or a snow zone as "In Progress" hours after trucks have moved on, actively erodes credibility. NYC's Capital Projects Dashboard failed to update for 6+ months and contained only 46.8% of project IDs — the result was a Comptroller report declaring it "not useful for project management, financial management, or transparency" (`G4_risks_data_freshness.md`).

For fleet operations, the freshness window is much tighter than for capital projects. During an active storm, data more than 30–60 minutes old is misleading. The tool must show "Last updated" timestamps at the data level (not just a page footer), suppress stale data with visible warnings, and fail gracefully when the source goes offline — serving the last good snapshot with an explicit staleness banner (`G4_risks_data_freshness.md`).

### Accessibility and Equity

**P6.1: Map-First UIs Exclude Screen Reader and Keyboard Users**
Leaflet (the most common hackathon mapping library) has documented accessibility failures: VoiceOver reads individual map tile filenames as links, and interactive markers using `<img>` tags don't respond to keyboard input (WCAG 2.1.1 violation). Mapbox GL JS geocoder has Tab-key focus traps and dropdown items not announced by screen readers. These aren't edge cases — they exclude blind and mobility-impaired residents from civic tools (`G3_risks_accessibility.md`).

The mitigation is to build the accessible path first: a WCAG 2.2 AA-compliant address lookup and text-based list view as the primary interface, with the map as an optional enhancement. UK public sector guidance explicitly exempts maps from strict accessibility requirements "as long as essential information is provided in an accessible digital manner" (`G3_risks_accessibility.md`).

**P6.2: SMS Alerts Have Hidden Equity Gaps**
Carriers eliminated shared short codes in 2022, and T-Mobile states that non-T-Mobile short codes are unsupported on select plans. Residents on prepaid mobile plans may not receive SMS alerts at all. A single-channel notification strategy (SMS only) creates a false sense of universal reach. Multi-channel is mandatory: SMS + toll-free voice line + accessible web status page (`G3_risks_accessibility.md`).

**P6.3: In-Person Document Access Is the Only Option for Some Residents**
Richmond's DPW Construction Projects page instructs residents to "call/email ahead to ensure the availability of appropriate personnel" and visit City Hall (6th floor) to review project documents. This creates severe barriers for residents with mobility issues, rigid work schedules, or no transportation. The Richmond Public Library's laptop lending program and WiFi hotspots provide a partial bridge, but DPW has not integrated these as information distribution points (`B1_users_concerned_resident.md`, `C4_services_gaps.md`).

### Prototype Safety and Guardrails

**P7.1: A Realistic-Looking Prototype Will Be Mistaken for an Official Tool**
Built-environment prototypes that visualize physical infrastructure carry unique misinterpretation risk. A map showing vehicle dots and zone statuses looks "official" — residents and media may assume it reflects live city operations. The 10-guardrail checklist requires: persistent "Prototype" banner on all pages, "Mock data" chips next to coordinates, "Estimated" qualifiers on all dates, scope statement clarifying City-maintained roads only (not VDOT's 59,672 state-maintained miles), AI content labels, no eligibility determinations, privacy protections (block-level aggregation, no PII), data attribution for every layer, and a README disclaimer (`G5_risks_guardrails.md`).

**P7.2: Jurisdictional Confusion Between City and VDOT Roads**
VDOT maintains 59,672 miles of state highways; cities maintain a separate 11,900 miles of urban streets. Richmond residents may not know whether their street is city-maintained or VDOT-maintained. A fleet tracker that shows "no service" on a VDOT road because it only tracks DPW trucks will look like a coverage failure. The tool must clearly define its jurisdictional scope in the legend, header, or onboarding flow — and ideally display VDOT-maintained roads as a distinct, grayed-out layer with a "not covered by this tool" label (`G5_risks_guardrails.md`).

---

## Summary: Ranked Pain Points by Impact

| Rank | Pain Point | Affected JTBD | Severity | Evidence Strength |
|---|---|---|---|---|
| 1 | No public-facing fleet/service status of any kind | Job 1, Job 3 | Critical | Multiple peer cities demonstrate 30%+ call reduction (`A2`) |
| 2 | Radio bottleneck consuming dispatcher capacity during storms | Job 2 | Critical | 1–1.5 staff-hours/clock-hour on location logging (`A2`) |
| 3 | GPS data at D3=2 — unstable schema, partial coverage | Job 2, all | High | VDOT pilot failures, schema drift research (`A2`, `D5`, `G2`) |
| 4 | 311 operators have no real-time data during service events | Job 3 | High | 81% of inquiries hit phone channel; SLA data often wrong (`B3`) |
| 5 | Priority route system invisible to residents | Job 1 | High | P1/P2/P3 hierarchy undisclosed to public (`A2`) |
| 6 | DPW web content stale and fragmented | Job 1 | Medium | 2021 hearing deadlines still live; no project index (`C4`) |
| 7 | Map accessibility failures exclude assistive tech users | Job 1 | Medium | Documented Leaflet/Mapbox WCAG violations (`G3`) |
| 8 | SMS-only alerts miss prepaid plan users | Job 1 | Medium | Shared short codes eliminated 2022; plan restrictions (`G3`) |
| 9 | No proactive text-to-subscribe storm alert system | Job 1, Job 3 | Medium | Caerphilly gained 10K subscribers in 48h (`B3`) |
| 10 | Prototype misinterpretation risk without guardrails | All | Medium | 10-guardrail checklist from G5 research (`G5`) |
