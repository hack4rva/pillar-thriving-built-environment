> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.


# From "What's going on?" to "Got it" in 10 seconds — A winning demo narrative for Richmond's DPW project finder

## Executive Summary
To win over judges with the transportation project visibility tool, the demo must bridge the gap between the City's technical data and the everyday resident's experience. The most effective narrative leads with a universal "commute disruption" scenario, followed by a hyper-local "community meeting" lookup that highlights equity and transparency. By utilizing cached, real Richmond DPW data translated into plain language, the demo establishes immediate credibility. Furthermore, framing the tool as a "reading layer" rather than a replacement for DPW's website perfectly neutralizes the most common judge objection. 

## 1) Who we're convincing and what they must feel
Judges must feel the everyday pain of confusing construction information, then experience a crisp, 10-second resolution that feels inevitable. 
* **Audience:** Civic-minded judges familiar with Richmond neighborhoods; time-constrained; skeptical of "yet another website."
* **Emotional arc:** Frustration ("What is this construction?") → Relief ("Oh, that's the Hull St bridge replacement, done winter 2025; here's the PM.") → Confidence ("This would help my neighborhood now.")

## 2) Choose the winning scenario and structure the demo arc
Lead with Commute Disruption for universality; deliver a 10-second Community Meeting lookup to land the equity story; keep Property Owner as a backup.

### Scenario comparison — relatability and "aha" power

| Scenario | Universal relatability | Fast "aha" | Emotional equity angle | Demo risk | Recommendation |
| --- | --- | --- | --- | --- | --- |
| Commute disruption | Very high (nearly everyone drives/uses roads) | Instant (map pin + timeline) | Moderate | Needs a real closure/timeline | Open with this |
| Community meeting | High in Richmond's civic culture | Very fast (10-sec address lookup) | Strong (uneven investment; trust) | Requires known neighborhood example | Second beat |
| Property owner notice | Medium (subset of homeowners) | Moderate | Practical but narrow | Might demand utility data beyond DPW | Backup/Q&A reference |

*Key Takeaway:* The commute disruption scenario instantly connects with the entire judging panel, while the community meeting scenario proves the tool's value in fostering civic trust and transparency [1] [2].

## 3) Design the plain-language project card — with Richmond examples
The card must answer: what's happening, where, when done, how it affects me, and who to call. DPW project pages are currently fragmented and highly technical [3].

### Card anatomy
* **Name (plain):** "Hull Street bridge over Manchester Canal — replacing aging span"
* **What's happening:** 1–2 lines; ditch acronyms; translate "PCE/NEPA/UPC" into "state/federal approvals."
* **Where:** Affected blocks/intersections; show on map.
* **Timeline:** Estimated start/end; phase if known.
* **Who to call:** Name, email, phone.
* **Provenance:** "Sourced from Richmond DPW/GeoHub; last updated March 24, 2026"

### Plain-language rewrites (from real DPW pages)
* **Hull St over Manchester Canal Bridge Replacement:** 
 * *Plain:* "We're replacing the small bridge on Hull Street near the canal in Manchester. Expect periodic lane shifts during construction. Public design review happened in March 2025. Questions? Project Manager: Thomas Westbrook — Thomas.Westbrook@rva.gov." [3]
* **Maury Street Streetscape — Phase 2 (Blackwell/Manchester):** 
 * *Plain:* "From Commerce Rd to 5th St, we're adding a new sidewalk with a grass buffer, safer crossings, street trees, benches, bike racks, and resurfacing. Construction is planned Spring 2028–Spring 2030. Contact: Olayinka Bruce — Olayinka.Bruce@rva.gov, 804‑646‑2312." [3]
* **Paving/Resurfacing (citywide):** 
 * *Plain:* "Each April–Nov, DPW resurfaces prioritized streets based on pavement condition. See the interactive map for your block's rating and status." [4]

## 4) Data strategy — real vs mock vs cached
Use real Richmond projects, cached locally, labeled with source and timestamp; fall back automatically if live feeds fail.

### Approach comparison

| Option | Credibility | Demo reliability | Effort | Risks | Use in demo |
| --- | --- | --- | --- | --- | --- |
| Live GeoHub/API only | Medium–High | Medium | Low | Outage/latency, schema drift | Don't rely solely |
| Fully mock | Low | High | Medium | Judge trust gap | Avoid |
| Curated cache of real projects (hybrid) | High | High | Medium | Must timestamp, maintain | Recommended |

*Key Takeaway:* Caching 5-10 real projects from recognizable neighborhoods (Church Hill, Manchester, Scott's Addition) provides the perfect balance of high credibility and bulletproof reliability during a live pitch.

## 5) Preempt the "Why doesn't DPW just fix the website?" objection
This is a reading layer over City data; no City process change required. The city manages 832 center lane miles of street, 836 miles of sidewalk, and 83 bridges [3]. 

**Answer script:** "We're not asking DPW to change workflows. We're taking the data they already publish and making it findable on a map, readable in plain language, and actionable with a contact. If DPW improves their site, great — our tool can embed or link to official pages and still provide search, translation, and alerts."

## 6) Success metrics and failure handling
Define and display "time-to-clarity" and graceful fallbacks.
* **Metrics to call out live:** 1 search, <3 clicks, 10 seconds to answer, named contact shown.
* **Failure cases to demo-proof:**
 * API empty/slow → Demo Mode auto-on with banner ("Showing cached data").
 * No project found → Return nearest 3 projects within 0.5 miles with distances.

## 7) Appendix — Facts, Inferences, Unknowns

**Facts (with URLs)**
* DPW Construction Projects & Road Improvements page lists multiple active/ongoing projects, with hearings, scopes, and contacts (e.g., Hull St over Manchester Canal bridge, Lombardy over CSX, Boulevard Trail, US‑60 Gateway, Semmes & 34th, Maury Streetscape) [3].
* Paving program runs April–November; interactive PCI map; city PCI improved from 35% (2018) to 75% (2024) [4] [5].
* City Open Data Portal states "open format with no fee, legal encumbrance, or registration requirement" [6].
* City infrastructure scale: 832 center lane miles of street, 836 miles of sidewalk, 83 bridges [3].
* Community meeting transparency concerns reported by WWBT (3/6/26) [2].

**Inferences (clearly labeled)**
* *Inference:* There is no single, resident-friendly, citywide map that aggregates all active DPW capital projects with plain-language summaries; users must navigate multiple pages/PDFs. Demo value is a unified, readable layer.
* *Inference:* Cached real data avoids a credibility gap common with fully mocked demos; "Sourced from DPW/GeoHub" with timestamp is sufficient for legitimacy in a pitch context.
* *Inference:* A side-by-side "Original vs Plain Language" toggle visibly demonstrates value without requiring DPW process change.

**Unknowns (what cannot be verified publicly)**
* Exact license terms for specific GeoHub feature services used for projects (beyond general Open Data Portal language).
* Live update frequency and SLA/uptime for Richmond's GeoHub/ArcGIS services during the demo window.

## 8) Complete 90-second demo script with stage directions

* **0–10s — Cold open: failure first**
 * *Screen:* DPW Construction Projects page in a browser; multiple links, dense text.
 * *Presenter:* "It's 8am. My usual route is closed. I Google, I click, I scan PDFs. No map, no plain language, no quick answer."
* **10–25s — Open the tool; 1 search to clarity**
 * *Screen:* Our tool's map centered on Richmond; search bar says "Enter address or intersection…"
 * *Presenter types:* "Hull St & 5th St" (Manchester).
 * *Action:* Hit Enter. A single project card slides up in 1 second.
 * *Card shows:* "Hull Street bridge over Manchester Canal — replacing aging span. What's happening, Where, Timeline, Disruption, Who to call (Thomas.Westbrook@rva.gov). Source: DPW. Last updated: Mar 15, 2026."
 * *Presenter:* "In 10 seconds, I know it's a bridge replacement and when it wraps."
* **25–45s — The 10-second community meeting moment**
 * *Screen:* Clear the search. Type: "1500 E Main St — Kanawha Plaza."
 * *Card:* "US‑60 Downtown Expressway Gateway Pedestrian Improvements — safer sidewalks and crossings around Kanawha Plaza; new signal at S 7th & E Byrd; contact listed."
 * *Presenter:* "At a neighborhood meeting, someone asks 'What's this work by Kanawha?' Ten seconds. Answer, map, contact."
* **45–60s — Plain-language proof**
 * *Screen:* Toggle "Original" to show the DPW text with acronyms (e.g., 'reconstruction of intersection geometry,' 'installation of pedestrian signals'). Toggle back to "Plain Language."
 * *Presenter:* "We translate technical copy to what residents actually need to know."
* **60–75s — Breadth and credibility**
 * *Screen:* Pins in Church Hill, Manchester/Blackwell, Scott's Addition, East Riverfront. Hover shows cards for Maury Streetscape Phase 2 (dates), Lombardy over CSX, Boulevard Trail. Footer shows: "Source: Richmond DPW/GeoHub. Last updated: Mar 15, 2026."
 * *Presenter:* "Real Richmond projects. Recognizable places. Cached for reliability; live when available."
* **75–90s — Close and objection pre-buttal**
 * *Presenter:* "Why not just fix the DPW site? Because DPW already publishes the data. We're a reading layer: findable on a map, readable in plain English, actionable with a human contact. No department workflow changes required. And in under 10 seconds, your community has answers."

## References

1. *I am extremely concerned about the rezoning as proposed...*. https://rva.gov/sites/default/files/2025-11/Module1_AllEmails_2025.pdf
2. *Richmond zoning overhaul faces community resistance at public meeting*. https://www.12onyourside.com/2026/03/06/richmond-zoning-overhaul-faces-community-resistance-public-meeting/
3. *Construction Projects & Road Improvements | Richmond*. https://www.rva.gov/public-works/construction-projects-road-improvements
4. *Paving | Richmond*. https://www.rva.gov/public-works/paving
5. *Richmond's big map of paving progress*. https://rva.gov/city-stuff-press-releases-and-announcements/news/richmonds-big-map-paving-progress-0
6. *Open Data Portal | Richmond*. https://www.rva.gov/information-technology/open-data-portal