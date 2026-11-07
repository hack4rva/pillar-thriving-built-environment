# Solution Ideas — Fleet Operations & Street Service Tracking

**Pillar:** Thriving & Sustainable Built Environment
**Problem Statement (verbatim):** Improve how DPW supervisors and residents track the progress of services like snow removal and street cleaning in real time.
**Date:** March 31, 2026
**Basis:** Prior art research (Chicago Plow Tracker, Pittsburgh plow tracker, Toronto PlowTO analysis, Boston 311 data, 311 equity research, Richmond data sources)

All ideas below are grounded in documented prior art. Every idea names the real data source it requires. No synthetic data.

---

## Idea 1 — ADOPT: Fork Chicago's Plow Tracker for Richmond
**Prior art:** Chicago Plow Tracker (live since 2012), built on ArcGIS Hub (same platform as Richmond GeoHub)
**JTBD addressed:** Job 1 (Stranded Resident), Job 2 (DPW Supervisor)
**Real data required:** DPW fleet GPS telemetry API (requires DPW partnership); zone boundary data from GeoHub
**Equity dimension:** Chicago's tracker is address-searchable — all residents with an address can use it. Extend with SMS fallback for non-smartphone users.
**Why this first:** The technology is solved and open. The effort required is a DPW data-sharing agreement, not a build. If DPW's GPS vendor has an API, this could be deployed in weeks.
**What doesn't exist yet:** The DPW data pipeline. The UI is Chicago's to borrow.

---

## Idea 2 — ADOPT: Extend Richmond's CivicReady to Include DPW Fleet Status
**Prior art:** CivicReady is already live in Richmond, operated by Public Utilities, with geographic subscriptions and text/email/voice delivery
**JTBD addressed:** Job 1 (Stranded Resident)
**Real data required:** DPW snow emergency active/inactive status (currently communicated via press release — could be structured); DPW zone completion status
**Equity dimension:** CivicReady supports text and voice — not just email. This is the most accessible notification channel Richmond already has.
**Why this:** Richmond doesn't need to build a notification system. It already has one. The gap is extending it from utilities to DPW services — a policy decision, not a technical one.
**What doesn't exist yet:** DPW structured status data to feed into CivicReady.

---

## Idea 3 — BUILD: 311 Heatmap for Systematic Service Gaps
**Prior art:** Boston Globe 311 data analysis (2026) showing neighborhood service disparities; University of Iowa 311 equity research (2024)
**JTBD addressed:** Job 3 (Accountability-Seeking Resident)
**Real data required:** Richmond 311 service request data, categorized by DPW service type (snow removal, street cleaning), accessible via Richmond Open Data Portal (data.richmondgov.com Socrata API)
**Equity dimension:** This directly surfaces which neighborhoods are systematically missed. It doesn't require GPS or fleet data — it uses complaint volume as the signal.
**How it works:** A public map showing 311 DPW service complaints by neighborhood, updated daily. Patterns over time reveal which areas are consistently underserved. This creates accountability without requiring DPW to expose internal fleet data.
**Constraint:** Requires 311 category data to be structured enough to filter for DPW-specific complaints. Requires confirmation that Richmond's 311 data is available via API and includes neighborhood-level fields.

---

## Idea 4 — BUILD: Pre-Storm "Your Street" SMS Alert
**Prior art:** Pittsburgh's plow tracker (multilingual, address-based); Chicago's plow tracker; CivicReady text delivery model
**JTBD addressed:** Job 1 (Stranded Resident) — specifically the decision window before a storm
**Real data required:** DPW snow emergency declaration (structured, not just press release); Richmond street zone boundaries from GeoHub; resident phone number (opt-in)
**Equity dimension:** SMS reaches residents without smartphones or apps. Must be available in Spanish and English.
**How it works:** Residents opt-in by texting their address to a number. When DPW declares a snow emergency, they receive a text: "Snow emergency declared. Your street (Brookland Park Blvd, Zone 3) is scheduled for clearing on [date]. We'll text you when it's done."
**Constraint:** Requires DPW to commit to structured zone assignments before or at storm declaration. A minimum viable version could work even with 4-hour-old zone data.

---

## Idea 5 — BUILD: DPW Supervisor Mobile Dashboard (Staff-Only)
**Prior art:** The staff portal concept from both All Your Bass and Road Maintenance demos is the right model. The gap is real data.
**JTBD addressed:** Job 2 (DPW Supervisor)
**Real data required:** DPW fleet telematics API (same as Idea 1); route assignment data from DPW dispatch system
**How it works:** A simple mobile-first dashboard showing: (1) which routes are complete, in progress, or not started; (2) each truck's last known location and elapsed time on route; (3) an alert when a truck has been stationary for >30 minutes. Supervisor can tap a truck to radio the driver.
**Why distinct from Idea 1:** The resident-facing tracker and the supervisor dashboard are different products with different data needs. The resident view should never show vehicle locations. The supervisor view needs them. Build them separately.
**Constraint:** Requires both GPS data access AND an interview with a real DPW supervisor to understand their actual workflow. Don't build the supervisor dashboard without talking to a supervisor first.

---

## Idea 6 — BUILD: "Missed My Block" — Resident-to-311 Service Gap Report with Tracking
**Prior art:** SeeClickFix (deployed in 60+ cities for issue reporting with 311 integration); StreetLights' community issue feature (built but no backend); Open311 standard
**JTBD addressed:** Job 3 (Accountability-Seeking Resident)
**Real data required:** 311 API for report submission (requires City partnership); GeoHub street segment data for address validation
**Equity dimension:** Report confirmation by text (not just email) and in Spanish. No account creation required.
**How it works:** Resident taps their block on a map and reports "this block wasn't plowed/cleaned." They receive a text confirmation with a case number. The report goes to 311 (via API) or directly to DPW's dispatch queue. The resident can text the case number to get a status update.
**Why this matters:** The current 311 void is a trust problem. One confirmed, acted-on report does more for adoption than any marketing campaign.
**Constraint:** Requires 311 API access and a City commitment to act on reports. Without both, this is just another void.

---

## Idea 7 — IMPROVE: Add Language Access to Any Fleet Tracker
**Prior art:** Pittsburgh's plow tracker supports 10+ languages. Florence's "Pedala" bike incentive program supports multiple languages. CivicReady supports multilingual delivery.
**JTBD addressed:** Job 1 (Stranded Resident) — specifically Spanish-speaking residents
**Real data required:** Same as whatever tracker it's added to; translation layer (Google Translate API or equivalent)
**Equity dimension:** This is the equity idea. Richmond has a significant Spanish-speaking population. Any fleet tracker that's English-only is not solving the problem for a meaningful portion of the population that most needs it.
**Implementation:** Add a language toggle. Auto-translate UI strings and notifications. Pittsburgh has already shown this is achievable.
**Constraint:** Translation quality for plain-English status updates is generally good with machine translation. Human review recommended for alert content.

---

## Idea 8 — BUILD: GeoHub-Powered DPW Service Status Layer
**Prior art:** Richmond GeoHub is already the authoritative source for city project data (confirmed by StreetLights demo). DPW's own speed data is published via a GeoHub-connected dashboard (July 2025).
**JTBD addressed:** Job 1 (Stranded Resident), Job 2 (DPW Supervisor)
**Real data required:** A new DPW service status layer in GeoHub (requires DPW commitment to update it); zone boundary data (already in GeoHub or accessible)
**How it works:** DPW publishes service status directly into GeoHub as a layer — updated each shift. Any app (StreetLights, Stay Informed, a future tool) can query this layer via the ArcGIS REST API. One authoritative source, multiple front-ends.
**Why this is strategically superior to the current approach:** Both hackathon demos built their own data formats. If DPW published status to GeoHub, all current and future tools get the data for free. This is the civic data infrastructure play.
**Constraint:** Requires DPW commitment to maintain the layer. A "set it and forget it" layer that goes stale is worse than nothing.

---

## Idea 9 — ADOPT+BUILD: Crowdsourced Plow Sightings as a Real-Time Signal
**Prior art:** Snowmarket (2025 launch) — crowdsourcing sidewalk snow removal via bounties. Waze-style crowdsourced reporting. Toronto residents used social media to report plow sightings when official trackers showed stale data.
**JTBD addressed:** Job 1 (Stranded Resident), with a secondary benefit to Job 2
**Real data required:** Resident submissions (GPS coordinates + timestamp); street segment data from GeoHub for mapping
**Equity dimension:** Crowdsourcing favors neighborhoods with higher participation. Must be designed to handle sparse data in low-participation areas without showing false "no service" results.
**How it works:** Residents opt-in to submit a plow sighting ("I see a plow on my block right now") via SMS or a minimal web form. Sightings are aggregated on a map. This supplements — not replaces — official GPS data, and provides something useful even before DPW has an API.
**Why this is valuable:** It requires no DPW data partnership to start. It's a real-data bridge until official GPS is available.
**Constraint:** Without GPS ground truth, sightings can be wrong. Must show confidence level and timestamp prominently.

---

## Idea 10 — IMPROVE: BMP Analytics Dashboard for DPW Planning (Staff-Only)
**Prior art:** Road Maintenance Fleet Tracker demo's analytics section; Chicago's post-storm analysis capabilities; Toronto's plowing efficiency analysis after 2025 storms
**JTBD addressed:** Job 2 (DPW Supervisor) — specifically the planning dimension beyond just storm tracking
**Real data required:** Historical fleet GPS data (requires DPW access); 311 complaint data by street/zone (Richmond Open Data Portal); street segment data from GeoHub
**How it works:** A staff-facing annual planning tool (not a real-time dashboard) that answers: "Which routes historically take the longest? Which streets generate the most complaints? Where should we pre-position equipment for the next storm?" This is the BMP analytics concept from the Road Maintenance demo, operationalized with real data.
**Why this is distinct:** The real-time dashboard (Idea 5) is about the storm. This is about improving future storms. They serve different moments and different users.
**Constraint:** Requires historical GPS data — at least one full snow season. Cannot be built from scratch without DPW data history. A minimum viable version could use 311 complaint data alone as a proxy for service performance.

---

## Summary Table

| # | Type | JTBD | Key Data Required | Equity Dimension | Feasibility |
|---|------|------|------------------|-----------------|-------------|
| 1 | Adopt | J1, J2 | DPW fleet GPS API | Address-searchable | High — if GPS exists |
| 2 | Adopt | J1 | DPW structured status | Text + voice delivery | High — CivicReady exists |
| 3 | Build | J3 | 311 data via API | Surfaces inequity directly | Medium — needs 311 API |
| 4 | Build | J1 | DPW zone data + GPS status | SMS, Spanish | High — if zone data available |
| 5 | Build | J2 | DPW fleet GPS API | N/A (staff tool) | Medium — needs GPS + supervisor interview |
| 6 | Build | J3 | 311 API | SMS, Spanish, no account | Medium — needs 311 partnership |
| 7 | Improve | J1 | Same as host tool | Spanish + other languages | High — add to any tracker |
| 8 | Build | J1, J2 | DPW GeoHub layer commitment | All front-ends benefit | High — if DPW commits |
| 9 | Adopt+Build | J1 | Resident submissions | Sparse area warnings | High — no DPW data needed |
| 10 | Improve | J2 | Historical GPS + 311 data | N/A (staff tool) | Low — needs 1+ year data |
