# Solution Ideas — Infrastructure Project Visibility

**Pillar:** Thriving & Sustainable Built Environment
**Problem Statement (verbatim):** Help residents find and understand transportation and infrastructure projects happening in their neighborhoods.
**Date:** March 31, 2026
**Basis:** Prior art research (CivicReady, GeoHub, Richmond Connects, SeeClickFix, Legistar, VDOT data, 311 equity research)

All ideas below are grounded in documented prior art. Every idea names the real data source it requires.

---

## Idea 1 — ADOPT+BUILD: Complete StreetLights — Add 311 Backend to Issue Reporting
**Prior art:** SeeClickFix (deployed in 60+ US cities); Open311 standard; StreetLights prototype already built
**JTBD addressed:** Job 3 (Resident Who Wants to Report Infrastructure Problems)
**Real data required:** 311 API (Richmond — data.richmondgov.com or direct City partnership); GeoHub street segment data (already in StreetLights)
**Equity dimension:** Confirmation by text (not just email); no account required; Spanish-language form
**How it works:** Wire StreetLights' existing issue reporting UI to a real backend — either Richmond's 311 API or a direct DPW queue. Resident submits report; gets a text confirmation with a case number; can check status by texting the number.
**Why first:** StreetLights is already built and uses real data. The only missing piece is the backend. This is the shortest path to a complete solution.
**Constraint:** Requires Richmond 311 API access and a City commitment to route reports to the right department.

---

## Idea 2 — ADOPT: Extend CivicReady to Include Planning and DPW Projects
**Prior art:** CivicReady is already live in Richmond (Public Utilities) with geographic subscriptions and text/email/voice delivery
**JTBD addressed:** Job 1 (Disrupted Commuter) — specifically proactive notification before disruption
**Real data required:** GeoHub project records with planned start dates; DPW project data (same challenge as fleet tracking)
**Equity dimension:** CivicReady supports text and voice — most accessible notification channel Richmond already has
**How it works:** Extend CivicReady's geography-based subscription to include Planning Department and DPW projects from GeoHub. Residents who subscribe to "Northside" get a text when a new project is added to GeoHub within their area.
**Why this is strategically important:** Richmond already has the notification infrastructure. Extending it to cover more project types is a governance/policy decision, not a technical one. This is faster than building a new notification system.
**Constraint:** Requires GeoHub project records to include planned start dates (currently unverified). Requires coordination between Public Utilities, Planning, and DPW.

---

## Idea 3 — BUILD: Neighborhood Project Digest (Weekly Email/Text)
**Prior art:** NYC's Capital Projects Tracker (weekly digest model); neighborhood-level GeoHub queries; Richmond's existing press release pattern
**JTBD addressed:** Job 2 (Community Advocate at Neighborhood Meeting)
**Real data required:** GeoHub all layers (already accessible via ArcGIS REST API); Richmond neighborhood boundary data (available in GeoHub)
**Equity dimension:** Available in Spanish; delivered by text or email
**How it works:** Residents subscribe to a neighborhood (e.g., "Northside," "Southside," "Church Hill"). Each Monday, they receive a brief text or email: "3 projects active in your neighborhood this week: [list with plain-English descriptions and estimated end dates]." No app required.
**Why distinct from StreetLights:** This is a push model (you get information without asking) vs. StreetLights' pull model (you visit the site and search). Both are needed. The digest is better for residents who won't proactively check.
**Constraint:** Depends on GeoHub data being current. If project records are stale, the digest spreads wrong information.

---

## Idea 4 — BUILD: "Will This Affect Me?" Pre-Project Notification
**Prior art:** Richmond's CivicReady (already does this for utility work); Boston's construction notification requirement (30-day advance notice for major projects)
**JTBD addressed:** Job 1 (Disrupted Commuter) — the decision window before disruption
**Real data required:** GeoHub project records with planned start dates (unverified availability); resident address subscription
**Equity dimension:** 2-week advance notice benefits hourly workers and people with rigid schedules most
**How it works:** Residents enter their address and receive a notification when a project is planned within a user-defined radius. Notification arrives at least 2 weeks before the project starts. Includes: what the project is (plain English), how long it lasts, who to contact with concerns.
**Constraint:** Requires GeoHub project records to be entered before construction starts — currently unverified. The City would need to commit to pre-populating GeoHub at least 2 weeks ahead of project start.

---

## Idea 5 — BUILD: Legistar Planning Phase Tracker
**Prior art:** Chicago's Councilmatic; NYC's Zola; Richmond's own Legistar instance (already exists, professional-facing)
**JTBD addressed:** Job 2 (Community Advocate at Neighborhood Meeting) — specifically the engagement timing problem
**Real data required:** Richmond Legistar API (Granicus Web API — Richmond has a Legistar instance); Planning Commission agendas and case records
**Equity dimension:** Plain-English case summaries; Spanish translation; community meeting schedule links
**How it works:** A resident-facing view of Legistar planning cases, geocoded and mapped. Residents can see what proposals are in planning, design, or approval phases — not just what's already under construction. They can subscribe to a neighborhood and receive alerts when new cases are filed.
**Why this matters:** By the time a project appears in GeoHub as "active construction," community input is often closed. Legistar has the planning-phase records. Making Legistar accessible to residents is the gap.
**Constraint:** Requires Legistar API access and address/geocoding for case records (not all cases have geocodable addresses).

---

## Idea 6 — BUILD: VDOT + City Project Unified Map
**Prior art:** StreetLights (City projects only); RideShift's Richmond Connects embed (City projects only); VDOT SmartScale portal (state projects only — professional-facing)
**JTBD addressed:** Job 1 (Disrupted Commuter), Job 2 (Community Advocate)
**Real data required:** Richmond GeoHub (City projects); VDOT open data portal (state projects); VDOT SmartScale project data (quarterly update)
**Equity dimension:** State roads often run through lower-income neighborhoods; these residents are currently excluded from any project notification
**How it works:** Extend StreetLights (or build a new view) that merges City GeoHub project data with VDOT project data for Richmond region roads. A resident near a VDOT-managed road (e.g., Midlothian Turnpike) gets the same plain-English visibility as a resident near a City-managed road.
**Constraint:** VDOT data is on a quarterly update cadence, not real-time. This is better for planning than for real-time status. Two separate data pipelines to maintain.

---

## Idea 7 — IMPROVE: GeoHub Data Quality Scorecard for City Project Managers
**Prior art:** Data quality governance models from open data programs in Chicago, NYC; Toronto's post-storm analysis revealing that "completed" status was often wrong
**JTBD addressed:** Indirectly enables all three jobs by making the underlying data trustworthy
**Real data required:** GeoHub project records (metadata: last updated date, completeness fields); no new external data needed
**Equity dimension:** Accurate data serves all users equally; stale data is equally misleading to all
**How it works:** A staff-facing data quality dashboard that shows: (1) which project records haven't been updated in >30 days; (2) which records are missing key fields (end date, project manager, description); (3) an automated email to project managers with stale records. Not resident-facing — this is the governance tool that makes all resident-facing tools trustworthy.
**Why this matters:** StreetLights works as long as GeoHub is current. This ensures GeoHub stays current.
**Constraint:** Requires a City commitment to data quality standards and someone with authority to enforce them.

---

## Idea 8 — BUILD: Construction Impact Commute Planner
**Prior art:** Google Maps integrates some construction data; Waze has user-reported construction; RideShift's planned "route planning with construction awareness" feature
**JTBD addressed:** Job 1 (Disrupted Commuter)
**Real data required:** GeoHub project data with street closure or lane restriction flags; Google Maps Roads API or similar routing API; resident's home address and common destinations
**Equity dimension:** Particularly valuable for transit-dependent residents — construction that closes a bus stop has outsized impact
**How it works:** Resident enters their home address and a destination (work, school, childcare). The app shows their usual route, any active construction along it, estimated delay, and suggested alternatives. Integrates GRTC route data for transit alternatives.
**Constraint:** Requires GeoHub project records to include structured street closure or lane restriction data (currently unverified). Google Maps API has cost at scale. The GRTC integration adds significant scope.

---

## Idea 9 — BUILD: "What's Coming to My Block" — Equity-First Notification for Under-Notified Neighborhoods
**Prior art:** University of Iowa 311 equity research showing participation gaps in lower-income neighborhoods; CivicReady's geography-based model; Pittsburgh's multilingual plow tracker
**JTBD addressed:** All three jobs — with an explicit focus on neighborhoods historically excluded from city communication
**Real data required:** GeoHub project data; Richmond neighborhood census data (for identifying under-notified areas); opt-in resident list
**Equity dimension:** This is the equity idea — explicitly designed for neighborhoods that historically receive last-minute notice (or no notice) about construction. Spanish-first, not Spanish-as-an-afterthought.
**How it works:** Partner with trusted neighborhood organizations and community leaders in historically underserved neighborhoods to distribute sign-up instructions (not just post a web link). Offer plain-language summaries in Spanish and English, delivered via text. Design the notification content for residents with low government trust — honest about what the City knows and doesn't know.
**Constraint:** Requires community partnership for distribution, not just a web sign-up form. Technology is the easy part; trust-building is the hard part.

---

## Idea 10 — ADOPT: Richmond Connects Enhancement — Plain Language Project Pages
**Prior art:** Richmond Connects already exists; StreetLights proves that GeoHub data can be presented in plain language; NYC's Capital Projects Tracker shows plain-language project pages
**JTBD addressed:** Job 1 (Disrupted Commuter), Job 2 (Community Advocate)
**Real data required:** GeoHub project data (already feeds Richmond Connects); project manager input for plain-language summaries
**Equity dimension:** Plain language benefits all residents; Spanish translation extends reach
**How it works:** The City enhances Richmond Connects (rather than replacing it) with: (1) plain-language project summaries written by project managers at project initiation; (2) Spanish translations; (3) address-search functionality so residents can find what's near them without navigating a map. StreetLights proved this approach works — the question is whether the City wants to own the front-end or let civic tools like StreetLights do it.
**Why adoption is the right frame:** Richmond Connects has the data and City credibility. StreetLights has the better UX. The ideal outcome is either the City improves Richmond Connects to match StreetLights' quality, or the City officially endorses and maintains StreetLights as the public-facing layer.
**Constraint:** Requires City commitment to plain language in project records — a workflow change for project managers who currently write for technical audiences.

---

## Summary Table

| # | Type | JTBD | Key Data Required | Equity Dimension | Feasibility |
|---|------|------|------------------|-----------------|-------------|
| 1 | Adopt+Build | J3 | 311 API | Text, Spanish, no account | High — StreetLights exists |
| 2 | Adopt | J1 | GeoHub + DPW project starts | Text + voice delivery | High — CivicReady exists |
| 3 | Build | J2 | GeoHub by neighborhood | Text, Spanish, no app | High — data accessible |
| 4 | Build | J1 | GeoHub with start dates | 2-week advance for flex workers | Medium — needs start date data |
| 5 | Build | J2 | Legistar API | Plain English, Spanish | Medium — needs Legistar API |
| 6 | Build | J1, J2 | GeoHub + VDOT data | Covers state-road neighborhoods | Medium — two data pipelines |
| 7 | Improve | All (enabler) | GeoHub metadata only | Makes data trustworthy for all | High — staff tool, no external data |
| 8 | Build | J1 | GeoHub + routing API + GRTC | Transit-dependent residents | Low — complex, many deps |
| 9 | Build | All | GeoHub + neighborhood data | Equity-first, Spanish-first | Medium — community partnership needed |
| 10 | Adopt | J1, J2 | GeoHub (already used) | Spanish, plain language | High — City decision needed |
