> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# Credible-by-Design: 8 Red Flags for Civic Prototypes

## Executive Summary
Trust is the most critical feature of any civic technology prototype. When hackathon teams present solutions for the built environment, ambiguity about data status, scope, and privacy can instantly derail their credibility with judges and residents. This report outlines eight specific "red flags" that undermine prototype integrity—from stale construction timelines and simulated GPS feeds to AI hallucinations and missing legal disclaimers. By implementing explicit labeling, human-in-the-loop verification, and robust offline fallbacks, teams can ensure their prototypes are credible by design.

## Timeline Data That Won't Embarrass You — Labeling "Anticipated," Provenance, and Cadence
**Risk & Manifestation:** Construction timelines are highly variable due to weather, traffic maintenance, and utility coordination [1]. A hackathon tool that displays a hard project end date from GeoHub data risks misleading residents who make plans based on that date. Furthermore, ArcGIS Hub sites often struggle with accurate "Date Updated" metadata, sometimes failing to reflect the true freshness of the underlying data [2] [3]. 

**Mitigation:** Replace single dates with a comprehensive status label that includes caveats and timestamps sourced from authoritative items. Display timelines with a 4-part label on every card or map popup.

| Timeline Field | Definition & Best Practice | Example UI Copy |
| :--- | :--- | :--- |
| **Status** | Indicates the current phase and certainty of the timeline. | "Status: Anticipated" |
| **Target Window** | Uses a month/year or quarter rather than a specific day. | "Target completion: Q4 2026" |
| **Last Verified** | A manually controlled date to bypass automated metadata lags. | "Last verified: 2026-03-10" |
| **Source & Cadence** | Links to the authoritative dataset and notes update frequency. | "Source: GeoHub | Updates: Quarterly" |

*Takeaway:* Never display a naked date. Always contextualize timelines with a "subject to change" disclaimer and a clear indication of when the data was last verified.

## Mock Telemetry, Real Clarity — Exact Phrases and Demo Script for GPS Data
**Risk & Manifestation:** A team builds a fleet tracking tool for snowplows or street sweepers. During the demo, judges ask, "Is this connected to real DPW data?" If the team stumbles, trust evaporates. Commercial telematics vendors routinely use pre-configured, simulated environments to demonstrate capabilities without exposing live client data [4]. Hackathon teams must do the same but be radically transparent about it.

**Mitigation:** Pre-commit to unambiguous phrasing and mirror it in both the UI and the presentation script. 

| Audience | Recommended Phrasing | UI Placement |
| :--- | :--- | :--- |
| **Judges (Script)** | "This demo uses synthetic GPS data for illustration. It is not connected to DPW systems." | Spoken during the demo introduction. |
| **Residents (UI)** | "Simulated Data: No real vehicles are tracked." | Persistent banner or map legend. |
| **Technical Reviewers** | "Map refreshes from a test endpoint; live DPW integration is out-of-scope." | Project README or "About" modal. |

*Takeaway:* Explicitly stating that data is simulated demonstrates maturity and prevents judges from questioning the team's technical honesty.

## Jurisdiction Integrity — Cleanly Separating DPW vs. VDOT
**Risk & Manifestation:** Richmond's road network is split between City-maintained roads (DPW) and state-maintained roads (VDOT). A tool that aggregates all construction might incorrectly attribute a VDOT project to DPW, creating service confusion. VDOT maintains a "Responsibility Master Route" dataset, updated annually (current as of March 2026), which portrays ownership and maintenance responsibility [5].

**Mitigation:** Limit the default view to DPW-maintained roads, with a clear toggle to include state-maintained projects. 

| Jurisdiction State | UI Treatment | Allowed Actions |
| :--- | :--- | :--- |
| **DPW-Only (Default)** | "Maintainer: DPW" chip on project cards. | Full interaction and issue reporting. |
| **VDOT Included** | "Maintainer: VDOT" chip in a distinct color. | View only; link to VDOT portal for reporting. |
| **Mixed View** | Clear visual boundary or filter toggle active. | Filter by agency responsibility. |

*Takeaway:* Respecting jurisdictional boundaries prevents misdirected resident complaints and shows a deep understanding of civic operations.

## AI Summaries Without Hallucinations — Labels, Review Workflow, and Versioning
**Risk & Manifestation:** Teams may use generative AI to translate technical engineering documents into plain language. If the AI omits a key safety element or mischaracterizes the scope, a resident could be misled. Emerging frameworks, such as the NIST AI RMF [6] and the EU AI Act (which mandates transparency for AI-generated content by 2026) [7], emphasize the need for clear labeling. Civic hackathons, like Seattle's Customer Service AI Hackathon, require that AI-generated content be edited and fact-checked by staff [8].

**Mitigation:** Implement a strict "AI-assisted + human-verified" baseline.

| Content Type | Common AI Failure Mode | Required Review Check |
| :--- | :--- | :--- |
| **Project Scope** | Exaggerating or minimizing the actual work. | Verify scope matches technical source exactly. |
| **Safety/Detours** | Omitting critical pedestrian or traffic warnings. | Ensure all safety notes are prominently retained. |
| **Schedules** | Hallucinating exact dates from vague text. | Confirm dates are labeled as "estimated." |

*Takeaway:* Add a visible badge above any generated text (e.g., "AI-assisted summary, human-verified") and always provide a collapsible view of the original technical description.

## Zones That Don't Mislead — Labeling Illustrative Layers and Badge Strategy
**Risk & Manifestation:** Synthetic snow removal or street cleaning zones that do not match actual DPW operational areas can severely mislead residents. DPW handles approximately 22,000 pothole repairs annually [9]; operational accuracy is vital. If a resident believes they are in Zone 4 but are actually in Zone 7, they may move their car on the wrong day.

**Mitigation:** Mark synthetic zones clearly. ArcGIS Online allows administrators to designate items as "Authoritative" or "Deprecated" to signal trust status [10] [11].

| Layer Status | UI Treatment | Export Policy |
| :--- | :--- | :--- |
| **Authoritative** | Verified badge; standard rendering. | Full export allowed. |
| **Non-Authoritative** | "Illustrative Only" watermark/legend. | PDF/Print disabled or heavily watermarked. |
| **Deprecated** | Warning banner: "Outdated Data." | Do not use in prototype. |

*Takeaway:* Title mock layers "Example Zones (Not Official)" and include an always-on legend note stating they do not reflect actual DPW service areas.

## Privacy-by-Design for Location + Infrastructure Mashups
**Risk & Manifestation:** Combining infrastructure data (like construction sites) with resident location data could inadvertently expose patterns of life (the mosaic effect). 

**Mitigation:** Do not collect precise user locations. If location context is needed, aggregate it heavily.

| Data Element | Privacy Risk | Required Control |
| :--- | :--- | :--- |
| **User Location** | Tracking individual movements. | Aggregate to block group; do not store raw coordinates. |
| **Reporting Activity** | Identifying specific residents by complaint frequency. | Apply k-anonymity (suppress data where k < 5). |
| **Timestamps** | Correlating exact times with individuals. | Truncate to day-level resolution for public views. |

*Takeaway:* Publish a brief Privacy Impact Assessment (PIA) note in the prototype explaining that no Personally Identifiable Information (PII) is collected or retained.

## Legal and Branding Disclaimers to Prevent "Official App" Confusion
**Risk & Manifestation:** A polished prototype might be mistaken for an official City communication. The City of Richmond's official GIS portal explicitly disclaims liability for errors, omissions, or inaccuracies [12]. Hackathon projects need even stronger non-affiliation language.

**Mitigation:** Create unmissable visual separation from official city assets.

| Surface | Required Text | Placement |
| :--- | :--- | :--- |
| **Header** | "Prototype for demonstration only." | Fixed top ribbon (distinct color). |
| **Footer** | "Not an official City of Richmond or DPW application." | Persistent footer on all pages. |
| **About Page** | Full liability disclaimer mirroring City GIS language. | Dedicated "Terms & Disclaimers" view. |

*Takeaway:* Ensure users immediately recognize the tool as an experimental prototype, protecting both the team and the City from liability.

## Surviving API Outages — Offline Snapshots and Graceful Degradation
**Risk & Manifestation:** The GeoHub REST API becomes unavailable right as the judges approach the table. Without a fallback, the demo fails completely.

**Mitigation:** Ship the prototype with an offline switch and multiple data modes.

| Mode | Data Source | UI Indicator |
| :--- | :--- | :--- |
| **Live** | Direct fetch from GeoHub REST API. | Green "Live Data" dot. |
| **Snapshot** | Cached JSON/GeoJSON file (e.g., from 2026-03-10). | Yellow "Cached Data" dot with timestamp. |
| **Simulated** | Hardcoded mock data for feature demonstration. | Red "Simulated Data" dot. |

*Takeaway:* Build a 1-second timeout into API calls that automatically falls back to the Snapshot mode, displaying a toast notification: "Live data unavailable; showing cached snapshot."

## Pre-Demo QA and "Trust Gates"
**Risk & Manifestation:** Teams forget to implement these mitigations in the rush to finish coding.

**Mitigation:** Bake credibility checks into the final QA process.

| Check | Owner | Pass/Fail Criteria |
| :--- | :--- | :--- |
| **Disclaimer Presence** | UI Lead | Header/Footer disclaimers are visible on all screens. |
| **AI Verification** | Content Lead | All AI text has a "human-verified" badge and source link. |
| **API Fallback** | Tech Lead | App loads successfully when network is disabled. |

*Takeaway:* Treat credibility as a core functional requirement that must pass before the demo begins.

## Appendix — Copy-Ready Snippets
* **GPS Mock Disclosure:** "This demo uses synthetic GPS data for illustration. It is not connected to DPW systems. No real vehicles are tracked."
* **Timeline Caveat:** "Status: Anticipated | Target completion: [Date] | Last verified: [Date] | Source: GeoHub. Subject to change."
* **Non-Affiliation:** "Prototype for demonstration; not an official City of Richmond or DPW application. Data may be incomplete or inaccurate."
* **AI Badge:** "AI-assisted summary (human-verified on [Date]). Original technical description available below."

## References

1. *FHWA Guide for Construction Contract Time Determination Procedures - Contract Administration - Construction - 
Federal Highway Administration*. https://www.fhwa.dot.gov/construction/contracts/t508015.cfm
2. *
	An option to allow a more accurate "Date Updated" ... - Esri Community
*. https://community.esri.com/t5/arcgis-hub-ideas/an-option-to-allow-a-more-accurate-quot-date/idi-p/1115031
3. *BUG-000146932 for ArcGIS Hub - Technical Support*. https://support.esri.com/en-us/bug/the-data-last-updated-date-in-arcgis-hub-does-not-updat-bug-000146932
4. *Telematics, GPS Tracking & Fleet Management Platform | Navixy*. https://www.navixy.com/blog/making-the-first-impression-count-perfecting-your-telematics-product-demo/
5. *Responsibility Master Route*. https://www.virginiaroads.org/datasets/VDOT::responsibility-master-route/about
6. *Artificial Intelligence Risk Management Framework (AI RMF 1.0)*. https://nvlpubs.nist.gov/nistpubs/ai/nist.ai.100-1.pdf
7. *AI content labelling - House of Commons Library*. https://commonslibrary.parliament.uk/research-briefings/cbp-10467/
8. *Building the Future of Civic Service: Seattle AI Hackathon Recap*. https://innovation-hub.seattle.gov/2025/11/26/seattle-customer-service-ai-hackathon-recap/
9. *Potholes and Street Maintenance | Richmond*. https://www.rva.gov/public-works/potholes-and-street-maintenance
10. *View and use items—ArcGIS Online Help | Documentation*. https://doc.arcgis.com/en/arcgis-online/get-started/item-details.htm
11. *Configure item details and settings—ArcGIS Online Help | Documentation*. https://doc.arcgis.com/en/arcgis-online/manage-data/configure-item-details.htm
12. *GIS/Mapping | Richmond*. https://www.rva.gov/assessor-real-estate/gismapping