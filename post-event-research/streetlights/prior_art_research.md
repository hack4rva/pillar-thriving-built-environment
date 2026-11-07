# Prior Art Research — Infrastructure Project Visibility

**Pillar:** Thriving & Sustainable Built Environment
**Problem Statement:** Help residents find and understand transportation and infrastructure projects happening in their neighborhoods.
**Applies to:** StreetLights AND RideShift RVA (partial)
**Research Date:** March 31, 2026
**Method:** Web search (Parallel AI deep research pending — see queries at end of file)

---

## Query 1: Regional Implementations

### What Has Been Built in Comparable US Cities

**Richmond — CivicReady (live)**
- The City of Richmond's Department of Public Utilities already operates CivicReady, a notification system that sends text/email/voice alerts about utility work, street closures, water/gas interruptions, and other project-related information
- Residents can customize by geographic area
- Key lesson: Richmond already has a notification infrastructure. The gap is that it's limited to utilities — DPW and Planning projects are not included. StreetLights effectively duplicates some of what CivicReady does, without knowing CivicReady exists.

**Richmond — GeoHub (live)**
- GeoHub at richmond-geo-hub-cor.hub.arcgis.com already contains active, planning, and design-phase infrastructure projects
- StreetLights correctly identified this and built on top of it — this is the right approach
- Key lesson: The data exists. The gap is a plain-language, resident-friendly presentation layer — exactly what StreetLights provides.

**Richmond — Press Releases and Signage**
- Richmond uses roadside message boards and notification signage for individual projects
- RVA.gov publishes press releases for major infrastructure projects (e.g., Arthur Ashe Blvd Bridge $38M, Jahnke Road $42M, East Main/Williamsburg Ave $4M)
- Key lesson: Current communication is project-by-project, push-only, and professional-language. There is no aggregate "what's near me" tool.

**SeeClickFix / Open311**
- SeeClickFix has been deployed in dozens of US cities for resident issue reporting and 311 integration
- StreetLights' community issue reporting feature duplicates SeeClickFix functionality without 311 integration
- Key lesson: The issue reporting problem is solved. Richmond could integrate with SeeClickFix or connect to 311 rather than building a new reporting backend.

**Councilmatic / Legislative Legistar Tools**
- Several cities (Chicago, NYC, Boston) have open-source Councilmatic deployments that make planning/legislative records resident-accessible
- Richmond uses Legistar for Planning Commission records — these records may contain project information not in GeoHub
- Key lesson: GeoHub and Legistar together cover more of the project lifecycle than either alone.

### RideShift's Richmond Connects Integration
- RideShift embeds the Richmond Connects project map (city's existing transportation project portal)
- This is a link, not an integration — it doesn't add new data or presentation
- Key lesson: Richmond Connects already exists. Neither RideShift nor StreetLights needed to create this; they needed to make it more accessible.

---

## Query 2: Real Data Sources in Richmond

### Confirmed Real Data Sources

| Dataset | Owner | Access URL | Cadence | Notes |
|---------|-------|------------|---------|-------|
| GeoHub — Active Infrastructure Projects | City of Richmond | richmond-geo-hub-cor.hub.arcgis.com | Variable by project manager | ArcGIS REST API; StreetLights already uses this |
| GeoHub — Land Use / Planning | City of Richmond | richmond-geo-hub-cor.hub.arcgis.com | Variable | Zoning, permit, development layers |
| Legistar — Planning Commission records | City of Richmond | Richmond's Legistar instance | Updated with each meeting | API available via Granicus Web API |
| Richmond Open Data Portal — Permits | City of Richmond | data.richmondgov.com | Variable | Building permits dataset; check last-updated date |
| CivicReady notifications | City of Richmond — Public Utilities | rva.gov alerts system | Event-triggered | Already operational for utility work |
| VDOT project data | Virginia DOT | virginiadot.org / SmartScale portal | Quarterly | State road projects not in Richmond GeoHub |
| RVA.gov press releases | City of Richmond | rva.gov | On demand | Unstructured but comprehensive for major projects |

### Critical Data Gaps
- **GeoHub data freshness:** Project records in GeoHub depend on individual project managers updating their entries. No enforced update cadence. StreetLights' reliability depends entirely on this governance question.
- **VDOT projects:** State-managed roads (I-95, I-64, Route 1, etc.) are not in Richmond GeoHub. A major highway project can affect Richmond residents without appearing in StreetLights.
- **Project start dates:** GeoHub may record project existence before construction starts. Whether pre-construction notice (2+ weeks ahead) is in the data is unverified.

---

## Query 3: Failure Modes and Equity Gaps

### Documented Findings

**Data Staleness is the Trust Killer**
- Toronto's PlowTO showed route "completed" status while streets were physically uncleared — residents who trusted the app were misled
- For StreetLights: If a GeoHub record says a project ends in March 2026 and it's still running in June, StreetLights shows wrong information. Data quality is the product's Achilles heel.

**311 Participation Inequity (applies to issue reporting)**
- Lower-income and minority communities underutilize civic reporting tools despite having greater need
- An upvote system for community issues advantages neighborhoods with higher smartphone penetration and civic participation
- The neighborhoods most burdened by infrastructure problems (deferred maintenance, older streets) are the least likely to have residents who will upvote issues

**Language Access**
- Richmond has a significant Spanish-speaking population (est. 7-10% of city)
- StreetLights appears English-only in the demo
- CivicReady offers multilingual notification delivery — suggesting the City already has precedent for this

**Digital Access**
- Not all Richmond residents have reliable internet access or smartphone capability
- A tool that requires web access excludes residents who may benefit most from knowing about infrastructure disruptions

### What StreetLights Got Right
Unlike the fleet demos, StreetLights uses real data from GeoHub. This puts it in a fundamentally different category: the core product works. The equity and feedback loop gaps are real but secondary to the primary problem statement.

---

## Synthesis

### What Richmond Could Adopt or Adapt
1. **CivicReady extension** — Richmond already has a notification system. The simplest path to resident project notifications is extending CivicReady to include DPW and Planning projects, not building a new notification system.
2. **SeeClickFix integration** — for the issue reporting feature, integrating with an existing platform (SeeClickFix or Open311) is faster and more credible than building a new backend.
3. **Chicago's infrastructure project portal** — several cities have built GeoHub-based project notification tools; StreetLights is already on this path.

### What Has Failed and Why
- Tools that show stale data without flagging it (trust destruction)
- Issue reporting with no city backend (residents file reports that go nowhere — the void problem)
- Notification-only tools with no plain language (StreetLights correctly addresses this)

### Biggest Gap / Genuine Opportunity
The GeoHub data layer exists and is live. The plain-language presentation exists in StreetLights. The missing piece is:
1. A governance commitment from the City to keep GeoHub project records current (a people/process problem, not a tech problem)
2. The feedback loop from resident issue reports to city response (311 integration or city-side partner)
3. VDOT project data integration (state roads are missing from the current data scope)

StreetLights is closer to a complete solution than any other demo in this pillar. The path from prototype to city deployment is shorter here than for the fleet demos.

---

## Parallel AI Research Queries (Pending Authentication)

```bash
# Query 1 — Regional implementations
parallel-cli research run "What civic technology platforms have been implemented in US mid-sized cities to help residents find and understand transportation and infrastructure projects near them? Focus on Richmond VA, Baltimore, Pittsburgh, Louisville, Norfolk, Raleigh, Durham, Chattanooga, and New Orleans. Include open-source tools, vendor solutions, city notification systems, and plain-language project map tools. Note which are live vs. sunset." --processor pro-fast --no-wait --json

# Query 2 — Real data sources
parallel-cli research run "What public data sources exist in Richmond Virginia for infrastructure project visibility? Include Richmond GeoHub (richmond-geo-hub-cor.hub.arcgis.com), Richmond Open Data Portal (data.richmondgov.com), Legistar Planning Commission records, VDOT project data, Richmond Connects, CivicReady, and RVA.gov press releases. For each: name the dataset, its update cadence, and whether pre-construction notice information is available." --processor pro-fast --no-wait --json

# Query 3 — Failure modes and equity
parallel-cli research run "What are the documented failure modes and equity gaps for civic technology tools that help residents track infrastructure and construction projects near them? Include research on data staleness, language access barriers, digital divide, which communities are most impacted by construction disruptions, and examples of cities where resident-facing project notification tools have succeeded or failed." --processor pro-fast --no-wait --json
```

Save results as:
- `prior_art_parallel_q1.md`
- `prior_art_parallel_q2.md`
- `prior_art_parallel_q3.md`
