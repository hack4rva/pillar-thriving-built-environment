---
title: "Ship Safe: A 10-Guardrail Checklist to De-risk Built-Environment Prototypes Before Demos"
pillar: thriving-built-environment
section: G
problem_statement: general
tags:
  - guardrails
  - 10-point checklist
  - de-risking
  - jurisdictional boundaries
  - accessibility
  - synthetic data labeling
summary: "Ten-guardrail checklist for de-risking built environment prototypes before demo. Covers jurisdictional boundaries (VDOT vs. city roads), timeline volatility, WCAG accessibility, and synthetic data labeling requirements."
geography: Richmond, VA
source: parallel-ai-pro
status: raw
related_reports:
  - G1_risks_inaccurate_project_info
  - G2_risks_gps_dependency
  - G3_risks_accessibility
  - G4_risks_data_freshness
---

> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# Ship Safe: A 10-Guardrail Checklist to De-risk Built-Environment Prototypes Before Demos

## Executive Summary

Built-environment prototypes carry unique risks because they visualize physical infrastructure, public services, and construction timelines that directly impact residents' daily lives. When a prototype looks "official" or "live," users may make real-world decisions based on synthetic data, shifting schedules, or incomplete jurisdictional maps. 

This report synthesizes the Risk G5 framework into a comprehensive, actionable guardrails checklist for teams building civic prototypes. The core insights driving this framework include:
* **Jurisdictional boundaries are highly complex:** The Virginia Department of Transportation (VDOT) operates 59,672 miles of state-maintained highways, while cities and towns maintain a separate 11,900 miles of urban streets [1]. Prototypes that fail to clarify this scope risk misleading residents about who is responsible for their roads.
* **Construction timelines are inherently volatile:** The Federal Highway Administration (FHWA) notes that schedules fluctuate due to weather, curing times, utility coordination, and material fabrication [2]. Displaying static dates without "estimated" qualifiers and "last updated" timestamps creates false expectations.
* **Accessibility is a strict baseline, especially for maps:** Web Content Accessibility Guidelines (WCAG) mandate that all functionality must be operable via a keyboard interface [3] [4]. Map-heavy prototypes that require a mouse exclude residents with visual or mobility impairments.
* **Global disclaimers are insufficient:** Research from the UK Government Digital Service (GDS) indicates that users often fail to notice global phase banners [5]. Therefore, synthetic data, AI-generated content, and unofficial status must be labeled directly at the point of use.

## High-Change Infrastructure Data and Public Trust Risk Collide

Built-environment prototypes often aggregate maps, schedules, and road ownership status. Because these elements mimic deployed City services, the risk of user harm and reputational damage is outsized if the prototype is misinterpreted as a live, official tool.

The data underlying these prototypes is highly dynamic. For example, the New Jersey Department of Transportation (NJDOT) requires project schedules to be updated monthly to reflect actual progress [6]. Furthermore, road maintenance responsibilities are strictly divided; VDOT does not maintain roads in cities or towns, except for interstates and major primary roads [7]. If a prototype allows a resident to report a pothole or check a paving schedule without explicitly stating that it only covers City-maintained roads, it creates a broken feedback loop and frustrates the user.

Similarly, accessibility cannot be an afterthought in map-based interfaces. WCAG 2.1 and 2.2 require that all functionality be operable through a keyboard interface without requiring specific timings for individual keystrokes (Success Criterion 2.1.1) [3] [4]. Furthermore, non-text content, such as interactive map features, must have text alternatives that serve the equivalent purpose (Success Criterion 1.1.1) [8]. Failing to implement these standards in a prototype not only violates best practices but risks excluding vulnerable populations from civic engagement.

## The Guardrails Checklist: 10 Pass/Fail Criteria for Civic Prototypes

To ensure prototypes are safe for demonstration and user testing, teams must evaluate their builds against the following 10 guardrails. 

| Guardrail | Risk Explained | Pass Criteria | Fail Examples | Verification Method |
| :--- | :--- | :--- | :--- | :--- |
| **1. GPS Data Labeling** | Users may mistake synthetic fleet or vehicle tracking data for live operations, leading to false assumptions about City service locations. | "Mock data" or "Test data" chips are placed directly next to coordinates, vehicle lists, and map tiles. | Map shows moving vehicle pins with no indication that the feed is simulated. | Visually inspect all map layers and data tables for explicit "Mock data" labels. |
| **2. Project Timeline Labeling** | Construction schedules fluctuate due to weather, utilities, and permits [2]. Static dates create false promises. | Every date includes an "Estimated" qualifier, a "Last updated: YYYY-MM-DD" timestamp, and a source link. | A project page states "Completion: October 2026" with no qualifiers. | Check all timeline components for the three required elements (Estimated, Date, Source). |
| **3. Official vs. Unofficial** | Residents may assume the prototype is a deployed City service, leading to misdirected feedback or reliance on test features. | A persistent "Prototype" phase banner is visible on all pages, stating it is not an official City communication [9]. | The tool uses official City branding without any disclaimer of its prototype status. | Verify the presence of a global header banner and inline "Not official" tags on key data views. |
| **4. AI Content Labeling** | Unlabeled AI-generated plain-language summaries may be interpreted as official City policy or human-verified legal guidance. | All AI-generated text is prefixed with "AI-generated summary" and includes a toggle to view the original source data. | A complex zoning document is summarized by AI without any indication of machine generation. | Locate any summarized text and confirm the presence of the AI label and source toggle. |
| **5. Scope Clarity** | Users may not realize the tool excludes VDOT-maintained roads (which total 59,672 miles statewide) [1]. | A clear scope statement (e.g., "Coverage: City-maintained roads only") is visible in the map legend or header. | A map titled "Road Paving Schedule" does not specify that state highways are excluded. | Check the map legend and homepage for an explicit definition of jurisdictional coverage. |
| **6. Accessibility** | Map-heavy interfaces often trap keyboard users or fail to provide text alternatives, violating WCAG SC 2.1.1 and 1.1.1 [3] [8]. | The tool can be navigated entirely with Tab/Enter/Space, focus is visible, and map features have text list alternatives. | A user cannot select a map pin without a mouse, or keyboard focus disappears inside a modal. | Unplug the mouse and attempt to navigate, pan, and select all features using only the keyboard. |
| **7. No Eligibility Determination** | Prototypes lack the live integrations necessary to accurately determine resident eligibility for services, risking false approvals or denials. | The tool explains "How eligibility works" and links to official City resources, rather than stating "You qualify." | A form tells a user "You are eligible for the sidewalk repair program" based on mock logic. | Submit test data into any forms or wizards to ensure no definitive eligibility statements are rendered. |
| **8. Privacy** | Displaying or collecting precise residential addresses in a demo environment exposes Personally Identifiable Information (PII) unnecessarily. | Map data is aggregated to the block level; precise house numbers are redacted or masked; collection fields are disabled. | The prototype displays a map of 311 complaints with exact resident addresses and names visible. | Inspect map tooltips and input forms to confirm no precise PII is exposed or captured. |
| **9. Data Attribution** | Unattributed datasets erode credibility and make it impossible for users to verify the freshness or ownership of the information. | A data layer panel lists the specific name, data owner, and last-updated date for every dataset used in the prototype. | A map displays zoning boundaries without stating where the data came from or when it was pulled. | Open the map legend or data dictionary and verify attribution for every active layer. |
| **10. Continuation Disclaimer** | Stakeholders or media finding the project repository may mistake it for a live, funded City initiative. | The first line of the README states: "Prototype—Not an official City service," detailing scope and demo-only caveats. | The GitHub repository is titled "City Pothole Tracker" with no indication that it is a temporary prototype. | Read the project brief and repository README to confirm the presence of the disclaimer. |

*Table 1: The 10-Guardrail Checklist for Built-Environment Prototypes.*

## Fast Review Playbook: How to Audit Any Prototype in 15 Minutes

To ensure consistent sign-off before demonstrations, reviewers should follow this timed, role-based checklist. This process is designed to catch critical failures quickly.

* **0:00–2:00: Homepage & Scope Scan:** Verify that the global phase/prototype banner is visible at the top of the page [9]. Confirm that the scope statement (e.g., "City-maintained roads only") is immediately apparent to prevent jurisdictional confusion [7].
* **2:00–5:00: Keyboard & Map Accessibility Test:** Disconnect the mouse. Use the `Tab`, `Shift+Tab`, `Arrow`, `Enter`, and `Space` keys to navigate the interface. Ensure that focus is always visible (WCAG SC 2.4.7) and that you can enter and exit all map overlays without getting trapped (WCAG SC 2.1.2) [3]. Verify that a text-based list alternative exists for all spatial map data.
* **5:00–8:00: Timeline & Data Labeling:** Locate any project schedules. Confirm that every date is accompanied by an "Estimated" tag, a "Last updated" date, and a source link. Look for "Mock data" tags on any GPS or vehicle tracking elements.
* **8:00–10:00: AI & Eligibility Checks:** Find any plain-language translations or summaries. Confirm they are labeled as "AI-generated" and include a toggle to view the source text. Test any interactive wizards to ensure they do not output definitive "You qualify" statements.
* **10:00–12:00: Privacy Audit:** Zoom in on the map. Ensure that no precise residential addresses or PII are visible. Confirm that any data capture forms are either disabled or clearly marked as non-functional for the demo.
* **12:00–14:00: Data Attribution:** Open the map layer panel or data dictionary. Verify that every dataset lists its name, the owning department/agency, and the date it was last updated.
* **14:00–15:00: Repository Review:** Open the project README or brief. The very first line must state: "Prototype—Not an official City service."

## Red Flags That Block a Demo

The following issues materially mislead or exclude users and will undermine public trust immediately. If any of these red flags are present, the prototype **must not be demonstrated** until they are fixed:

* **Missing Prototype Banner:** No site-wide banner indicating that the tool is a prototype and not an official City communication.
* **Unqualified Timelines:** Any construction or project timeline shown without "Estimated," "Last updated," and a source citation.
* **Accessibility Failures:** The map or core interface cannot be operated via a keyboard (fails WCAG 2.1.1) or lacks visible focus indicators (fails WCAG 2.4.7) [3] [4].
* **Unlabeled Live-Looking Data:** GPS, vehicle, or map data appears "live" without explicit "Mock data" labeling directly adjacent to the element.
* **Privacy Exposure:** Precise residential addresses or PII are displayed on the map or collected via functional forms in the demo environment.
* **Missing README Disclaimer:** The project repository or brief lacks a clear prototype disclaimer and scope definition.

## Implementation Patterns That Work

Standardized placements reduce the cognitive load on developers and ensure consistency across civic prototypes.

* **Phase Banner:** Place this inside the `<header>` element so it appears on all pages. Use the GOV.UK pattern: a bold tag (e.g., "PROTOTYPE") followed by text stating, "This is not an official City communication. Help us improve it by providing feedback" [9].
* **Timeline Components:** Next to any date, include an inline pill reading "Estimated" and text stating "Last updated: [Date]." Add an info icon with a tooltip explaining that schedules are subject to change due to weather, utilities, or material availability [2].
* **Map Layer Panels:** For every active layer, include a standardized block: `Dataset Name | Owner | Last Updated`. Include a scope chip reading "City-maintained only" to clarify jurisdiction [7].
* **AI Blocks:** Prefix AI-generated text with a distinct visual treatment (e.g., a different background color or icon) and the text: "AI-generated summary (reviewed by staff)." Always include a "Show source document" button.

## Appendix: Standards and References

This guardrails checklist is grounded in established digital service and transportation standards:

* **Accessibility:** Web Content Accessibility Guidelines (WCAG) 2.1 and 2.2. Specifically, Success Criteria 2.1.1 (Keyboard), 2.1.2 (No Keyboard Trap), 2.4.7 (Focus Visible), and 1.1.1 (Non-text Content) [3] [8] [4].
* **Prototype Status:** GOV.UK Design System guidance on Phase Banners, which mandates clear labeling for services that are not yet live [9].
* **Scheduling Volatility:** Federal Highway Administration (FHWA) guidelines on Contract Time Determination, which outline the numerous variables that cause construction schedules to fluctuate [2].
* **Update Cadence:** New Jersey Department of Transportation (NJDOT) Scheduling Manual, which establishes the standard of monthly schedule updates for capital projects [6].
* **Scope of Maintenance:** Virginia Department of Transportation (VDOT) system data, highlighting the strict division between the 59,672 miles of state-maintained highways and the 11,900 miles of city/town-maintained urban streets [7] [1].

## References

1. *Highways | Virginia Department of Transportation*. https://vdot.virginia.gov/about/our-system/highways/
2. *FHWA Guide for Construction Contract Time Determination Procedures - Contract Administration - Construction - 
Federal Highway Administration*. https://www.fhwa.dot.gov/construction/contracts/t508015.cfm
3. *Web Content Accessibility Guidelines (WCAG) 2.2*. https://www.w3.org/TR/WCAG22/
4. *Understanding Success Criterion 2.1.1: Keyboard | WAI | W3C*. https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html
5. *We’ve updated the alpha and beta phase banners – Design in government*. https://designnotes.blog.gov.uk/2016/12/07/weve-updated-the-alpha-and-beta-phase-banners/
6. *Scheduling Manual for Design Projects, Engineering*. https://nj.gov/transportation/eng/documents/scheduling/schedmanual.shtm
7. *Report a Road Problem - Virginia Department of Transportation*. https://my.vdot.virginia.gov/
8. *Understanding Success Criterion 1.1.1: Non-text Content | WAI | W3C*. https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html
9. *Phase banner – GOV.UK Design System*. https://design-system.service.gov.uk/components/phase-banner/