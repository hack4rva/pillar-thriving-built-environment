# Fast-tracking Richmond's Street Transparency in 48 Hours

## Executive Summary

The core barrier to infrastructure transparency in Richmond is a fragmented resident experience. Project information currently lives across a quarterly Capital Project Dashboard, static Department of Public Works (DPW) project pages, and PDF lists, rather than a single, address-based view. For the upcoming Richmond Civic Hackathon, the most impactful action is to build a unified "What's happening on my block?" lookup tool that federates existing ArcGIS layers and DPW data. 

Simultaneously, the city faces a constraint regarding fleet operations: GPS devices are being installed but are not yet complete. This precludes building a live-tracking tool like Chicago's Plow Tracker. Instead, teams should focus on a "status without dots on a map" pattern, delivering a route-centric status board where supervisors can manually mark street segments as complete. By leveraging Richmond's existing ArcGIS Online infrastructure, a hackathon team can ship credible, demonstrable solutions in 48 hours that provide immediate value to residents and establish a foundation for future automated data feeds.

## Context and Objectives

We can ship a credible, unified "What's happening on my block?" experience and an operations status board without GPS by leaning on Richmond's ArcGIS assets and clear scoping. The objective for the 48-hour hackathon is to turn scattered municipal assets into immediate resident value. 

### Hackathon mandate aligned to seasonality and data reality

The hackathon (March 27–29, 2026) perfectly aligns with the start of DPW's paving program, which runs from April through November [1]. Teams should build a resident-facing project lookup and a route-status prototype that do not depend on live GPS, capitalizing on this seasonal relevance to demonstrate immediate utility.

## The Transparency Problem in Mid-Sized Cities

The chief barriers to infrastructure transparency are dispersed sources, PDF-heavy workflows, and non-real-time updates that fail to answer the address-level questions residents actually ask. 

In Richmond, capital projects are displayed on a dashboard that is updated on a quarterly basis [2]. Meanwhile, paving information is distributed via a Fiscal Year Paving List PDF and an interactive map that is only updated as projects are completed [1]. Furthermore, DPW project pages are highly meeting-centric, focusing on public hearings and project manager contacts rather than machine-readable timelines [3]. Consequently, residents lack a single, geocoded status view. To solve this, teams must federate these existing sources, normalize them to a standard Project schema, and expose an address-first search interface.

## Richmond Data Landscape

ArcGIS-hosted assets provide immediate building blocks for a transparency tool. By normalizing and combining these datasets, teams can create a unified lookup experience.

### Key Richmond transportation and project data assets you can use today

Four primary ArcGIS-backed assets can power the MVP right now.

| Asset | What it contains | Update cadence / Last update | Records / Notes | Access |
| :--- | :--- | :--- | :--- | :--- |
| Capital Project Dashboard | Active capital projects; phase; PM contact; location; est. completion | Updated quarterly | N/A (ArcGIS dashboard) | ArcGIS dashboard link [2] |
| Paving PCI Interactive Map | Pavement Condition Index; seasonal program April–Nov | As projects are completed | FY26 Paving List as PDF + interactive app | ArcGIS WebApp link [1] |
| Roads | Road polygons (citywide basemap) | Data updated Dec 8, 2023 | 3,462 records | GeoHub FeatureServer [4] |
| Bicycle Infrastructure, Completed | Completed bike lanes, paths, shared spaces | Data updated May 6, 2025 | 129 records | GeoHub FeatureServer [5] |

These datasets provide the necessary geospatial and metadata foundation for a unified project lookup tool, though they require normalization to be queried together effectively.

### Other context and basemaps

The Open Data Portal offers broad categories like "Transportation" and "Well-Managed Government" [6], while the Richmond GeoHub allows users to search for specific tags like "basemap" and "infrastructure" to find underlying GIS layers [7] [8].

### Gaps to note up front

No confirmed public snow or street sweeping route datasets were found in the provided data. Additionally, the underlying feature layer for the Capital Project Dashboard is not explicitly published outside the dashboard view, and the Roads geometry consists of polygons rather than centerlines [4].

## How DPW Communicates Today

DPW provides valuable project manager contacts, hearing schedules, and brochure links, but lacks machine-readable timelines and standardized status feeds. For example, the Hull Street over Manchester Canal Bridge Replacement Project page lists specific public hearing dates, locations, and the project manager's email and phone number [3]. The Capital Project Dashboard allows users to filter by Council District and view project phases [2]. Hackathon teams should scrape and standardize these PM and timeline fields, embed district filters, and link back to the source pages for authoritative documentation.

## Fleet Operations Visibility

Residents respond to route and status transparency even without live vehicle dots. The goal is to start with segment completion and timestamps.

### Prior art: Chicago's Plow Tracker sets expectations for "live"

Chicago's Plow Tracker provides "real-time locations of city plows and salt spreaders" during snow storms [9]. Because Richmond does not yet have complete GPS installation, teams should not attempt to mimic this live-tracking functionality, as doing so without actual Automatic Vehicle Location (AVL) data would erode public trust.

### No-GPS design patterns you can ship this weekend

Three patterns deliver value now and can adapt to GPS later.

| Pattern | What residents see | How supervisors update | Pros | Cons |
| :--- | :--- | :--- | :--- | :--- |
| Segment completion board | Percent route complete; last serviced by segment | Mobile form toggles segment done; auto timestamp | Simple; auditable; upgradeable to GPS | Manual burden; potential lag |
| Scheduled window + confirmation | "Your block scheduled Tue 8–12; completed 10:37" | Supervisor marks block done; optional photo | Sets expectations; impact-focused | Requires schedule data; photo storage |
| Exception map | Only missed/blocked segments shown | Supervisor flags issues vs. completion | Reduces noise; focuses fixes | Less comprehensive picture |

The segment completion board is the most viable option for a 48-hour build, providing immediate operational visibility.

## GPS Constraint and Data Architecture

Choose an architecture that consumes ArcGIS FeatureServices now and can ingest AVL when devices go live. Teams should normalize ArcGIS feature layers into a unified Project index and derive a simple street-segment layer from the Roads polygons [4]. For status tracking, create an `OperationsStatus` feature layer containing segment IDs, status, timestamps, and user IDs. The UI should feature an address geocoder that joins to these segments and projects, presenting a combined view with clear "last updated" stamps. In the future, an AVL ingestor can be added to map GPS pings directly to these segments.

## Weekend-Buildable Solutions

Two complementary, shippable tools maximize impact: a resident project lookup and an operations status board.

### Prototype A — "What's happening on my block?"

This prototype features an address search that returns a list and map of nearby capital projects and FY26 paving segments. It should include the project phase, PM contact, estimated completion, and PCI context, with a council district filter [2] [1]. The data relies on the Capital Project Dashboard, the Paving PCI map, and the Bicycle Infrastructure layer [5]. Success is defined by returning relevant projects quickly, clearly showing the source and last-updated date, and enabling users to email the PM directly from the project card.

### Prototype B — "Street status without GPS"

This tool allows users to select a sweeping, snow, or paving route to see the percent complete and last-serviced timestamps. Supervisors use a mobile check-in form to update status. Because it relies on manual updates, it must include a resident-facing disclaimer. Success is measured by a supervisor's ability to mark 25–50 segments complete in under 10 minutes, with the resident view updating instantly.

### Implementation stack and roles

Teams should use the ArcGIS JS API or a lightweight React/Vue frontend hitting FeatureServer endpoints. Data operations can rely on ArcGIS Online feature layers and simple ETL scripts for PDF parsing. Administration should utilize ArcGIS groups for PMs and supervisors, leveraging feature editing history for audit logs.

## Risks, Failure Cases, and Mitigations

To protect trust while moving fast, teams must be explicit about data freshness and geometry limits. 
* **Stale data:** Because the dashboard is updated quarterly [2] and the paving map as-completed [1], the UI must surface timestamps, link to sources, and include a feedback loop.
* **Geometry mismatch:** The Roads dataset uses polygons [4]. Use these for context only, and anchor status tracking on derived segments.
* **Manual update errors:** Require user IDs and auto-timestamps for supervisor check-ins, and provide an "undo" function.
* **Overpromising:** Clearly label the fleet tool as "manual status; no live GPS" to manage expectations.

## Governance and Handoff

To sustain the project beyond the hackathon, teams must document data sources and ArcGIS item IDs. Provide a README with links to the Capital Project Dashboard (item b77c76ba1e1a47a09734b7eb8d5a508b) [2] and GeoHub layers. Propose a monthly refresh cadence for the Project index, offer training materials for DPW staff on supervisor check-ins, and outline a plan for adding the new `OperationsStatus` layer to the City's official ArcGIS organization.

## Appendix

* **Confirmed facts (with source titles):**
 * Capital Project Dashboard exists, is updated quarterly, and includes project phase, PM contact, estimated completion, and district filters (CIP | Richmond) [2].
 * The DPW paving program runs from April through November; the PCI interactive map is updated as projects are completed, and the FY26 Paving List is available as a PDF (Paving | Richmond) [1].
 * The Roads dataset contains 3,462 road polygons, with data last updated Dec 8, 2023 (Roads - Richmond GeoHub) [4].
 * The Bicycle Infrastructure, Completed layer contains 129 records, with data updated May 6, 2025 (Bicycle Infrastructure, Completed | Richmond GeoHub) [5].
 * The City of Richmond is responsible for 832 center lane miles of street, 836 miles of sidewalk, and 83 bridges (Construction Projects & Road Improvements | Richmond) [3].
 * Chicago's Plow Tracker shows "real-time locations of city plows and salt spreaders" (City of Chicago :: Supporting Info Rollup) [9].

* **Inferences (labeled):**
 * *Inference:* The underlying Capital Project feature layer is likely hosted in ArcGIS Online and can be queried or mirrored to a standardized Project schema.
 * *Inference:* GeoHub is closer to the transportation source-of-truth than the general Open Data Portal for this specific use case.
 * *Inference:* Without a published centerline dataset, deriving segments from polygons or hand-curating a pilot set is an acceptable workaround for a weekend demo.

* **Unknowns (what cannot be verified):**
 * Availability of public snow removal or street sweeping route datasets for Richmond on GeoHub or the Open Data Portal.
 * Public accessibility of the raw feature layer behind the Capital Project Dashboard (as opposed to the dashboard app itself).
 * The specific near-term AVL/GPS go-live date for DPW fleets.

* **Recommended starting points for a hackathon team:**
 1. Stand up the "block lookup" by querying the Capital Project Dashboard and PCI map, showing phase/PM/ETA with timestamps.
 2. Normalize a Project schema and backfill from the dashboard, scraping PM details from key DPW project pages.
 3. Build a pilot segment layer (25–50 segments) for a high-priority corridor; ship a supervisor check-in mobile form; compute percent complete.
 4. Instrument transparency: display source names, last-updated dates, and add a resident feedback link on every card.

## References

1. *Paving | Richmond*. https://www.rva.gov/public-works/paving
2. *CIP | Richmond*. https://rva.gov/budget-and-strategic-planning/cip
3. *Construction Projects & Road Improvements | Richmond*. http://www.rva.gov/public-works/construction-projects-road-improvements
4. *Roads - Richmond GeoHub*. https://richmond-geo-hub-cor.hub.arcgis.com/datasets/6a557c9144e240db97273a0732de238e_0/explore
5. *Bicycle Infrastructure, Completed | Richmond GeoHub*. https://richmond-geo-hub-cor.hub.arcgis.com/datasets/bicycle-infrastructure-completed/about
6. *Open Data Portal | City of Richmond, Virginia | Open Data Portal | City of Richmond, Virginia*. https://data.richmondgov.com/
7. *City of Richmond, VA*. https://richmond-geo-hub-cor.hub.arcgis.com/search?collection=Dataset&tags=basemap
8. *Richmond GeoHub*. https://richmond-geo-hub-cor.hub.arcgis.com/search?collection=Dataset&tags=infrastructure
9. *
    City of Chicago :: Supporting Info Rollup
*. https://www.chicago.gov/city/en/depts/streets/provdrs/street/supp_info.html