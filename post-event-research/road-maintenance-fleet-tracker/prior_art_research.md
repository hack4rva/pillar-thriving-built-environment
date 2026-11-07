# Prior Art Research — Fleet Operations & Street Service Tracking

**Pillar:** Thriving & Sustainable Built Environment
**Problem Statement:** Improve how DPW supervisors and residents track the progress of services like snow removal and street cleaning in real time.
**Applies to:** All Your Bass (Stay Informed) AND Road Maintenance Fleet Tracker
**Research Date:** March 31, 2026
**Method:** Web search (Parallel AI deep research pending — see queries at end of file)

---

## Query 1: Regional Implementations

### What Has Been Built in Comparable US Cities

**Chicago — Plow Tracker (live since 2012)**
- URL: https://plow-tracker-chicago.hub.arcgis.com/
- Real-time map showing locations of city plows and salt spreaders during snow storms
- Residents can enter their address to find plows nearby
- Built on ArcGIS Hub (same platform Richmond GeoHub uses)
- Key lesson: Chicago has been doing this for 13 years. The technology is solved.

**Pittsburgh — Snow Plow Tracker (live)**
- URL: https://pittsburghpa.gov/Resident-Services/Snow-Removal/Snow-Plow-Tracker
- City website with real-time plow tracking
- Available in 10+ languages — a rare and important equity feature
- Key lesson: Language access is not a nice-to-have; Pittsburgh built it in from the start.

**Baltimore, Louisville, Raleigh**
- No confirmed plow tracker implementations found in search. Baltimore has had ADA-related snow removal issues (settlement costs for inaccessible sidewalks).

**Snowmarket (2025 — new approach)**
- Platform that lets cities post bounties on uncleared sidewalk blocks for residents to complete
- In conversations with Minneapolis, Chicago, Somerville (MA), Boston, New York City
- Different model: crowdsourcing removal rather than tracking municipal fleet
- Key lesson: When municipal budgets fail, alternative models emerge. Richmond should be aware this approach is being explored.

### Why Richmond Doesn't Have This Yet
Richmond's DPW released a Public Speed Data Dashboard in July 2025 (collecting GPS data via cell phones and vehicle GPS), indicating fleet GPS capability exists. The gap appears to be political/organizational will to expose the data publicly, not technical capability.

---

## Query 2: Real Data Sources in Richmond

### Confirmed Real Data Sources

| Dataset | Owner | Access URL | Cadence | Notes |
|---------|-------|------------|---------|-------|
| Richmond GeoHub — all layers | City of Richmond | richmond-geo-hub-cor.hub.arcgis.com | Variable by layer | ArcGIS REST API available |
| Richmond Open Data Portal | City of Richmond | data.richmondgov.com | Variable | Socrata API; Transportation category exists |
| DPW Speed Data Dashboard | Richmond DPW | rva.gov/visionzero | Two months rolling | Cell phone + vehicle GPS — confirms fleet GPS exists |
| CivicReady notification system | Richmond Public Utilities | rva.gov | Event-triggered | Text/email/voice; geography-customizable — but for utilities, not DPW fleet |
| 311 service request data | City of Richmond | data.richmondgov.com (check Transportation/311 datasets) | Near-real-time | Socrata API available; category breakdown unknown |

### Critical Data Gap
The fleet GPS data that DPW uses for the Speed Data Dashboard is the same technology needed for a plow tracker. Whether DPW's fleet trucks (not just speed-monitored vehicles) have GPS is unknown — this is the #1 question for the SME outreach.

**No confirmed Richmond DPW fleet telemetry API exists in any public documentation.**

### Data Gap Requiring SME
- DPW fleet GPS system: What vendor? What format? Is there an API? What is the data sharing process?
- Street cleaning schedule: Is it published anywhere? What format? What cadence?
- Snow emergency zone boundaries: Are these in GeoHub? Updated before or after each storm?

---

## Query 3: Known Failure Modes and Equity Gaps

### Documented Research Findings

**The 311 Participation Gap (University of Iowa, 2024)**
- Lower-income and minority communities underutilize 311 systems at lower rates than wealthier populations despite having greater documented service needs
- This directly means that complaint-driven service allocation systematically under-serves the highest-need neighborhoods
- When low-income residents do use 311, their service outcomes improve to parity with affluent areas — showing participation is the unlock, not structural unfairness in service delivery itself

**Unequal Snow Service Distribution**
- Boston 311 data: Dorchester, South Boston, South End residents filed disproportionately high snow removal complaints
- Affluent areas like Seaport received demonstrably faster service
- Residents in some areas report walking on highways because sidewalks stayed blocked for days

**Civic Tech Failure: Misaligned Categories**
- Syracuse's Cityline system lacked a visible "snow plowing" request type — residents filed under wrong categories, obscuring real service failure volume
- Toronto's PlowTO showed route completion data while sidewalks were physically uncleared — the data dashboard was wrong, not just delayed
- Key lesson: A working UI does not mean accurate data. The data must be verified.

**Communication Failures**
- Toronto: inconsistent 311 and PlowTO communications during winter response
- Residents had no authoritative source; social media filled the gap with misinformation

### Equity Implications for Richmond Demos
Both All Your Bass and Road Maintenance Fleet Tracker:
- Require email for notifications (excludes residents without reliable email)
- Show no Spanish language support
- Don't address the fact that historically underserved neighborhoods in Richmond are most likely to be last-plowed
- Don't include any resident reporting mechanism for missed service

---

## Synthesis

### What Richmond Could Adopt or Adapt
1. **Chicago Plow Tracker** — built on ArcGIS (same as GeoHub), open source components available, 13 years operational. Richmond could fork this if DPW GPS data were made available.
2. **Pittsburgh's multilingual plow tracker** — model for language access; 10+ languages shows this is achievable in a city of Richmond's size.
3. **CivicReady** — Richmond already has a notification infrastructure through Public Utilities. The question is whether DPW can use or extend it for fleet status notifications.

### What Has Failed and Why
- Systems that show route completion without confirming actual service (Toronto) — creates false confidence, worse than no system
- Reward/incentive programs with distribution failures (Oakland) — 70% of distributed cards never activated because of mail pickup failures
- Generic civic apps with no feedback loop — residents lose trust quickly when reports disappear into voids

### Biggest Gap / Genuine Opportunity
The genuine opportunity is not building another UI — it's solving the data pipeline from DPW's existing GPS infrastructure to a public-facing display. Chicago solved this in 2012. Pittsburgh has it. The technology is not the barrier. The barrier is a DPW data-sharing decision and likely some organizational hesitancy about public accountability for fleet coverage. The hackathon demos built the right UI. What's missing is the conversation with DPW leadership about opening the data feed.

---

## Parallel AI Research Queries (Pending Authentication)

To run these when `PARALLEL_API_KEY` is configured:

```bash
# Query 1 — Regional implementations
parallel-cli research run "What civic technology projects have been implemented in US mid-sized cities for real-time DPW fleet tracking and resident-facing street service communication? Focus on Richmond VA, Baltimore, Pittsburgh, Louisville, Norfolk, Raleigh, Durham, Chattanooga, and New Orleans. Include open-source tools, vendor solutions, city-built platforms, and failed attempts. Note which are live vs. sunset." --processor pro-fast --no-wait --json

# Query 2 — Real data sources
parallel-cli research run "What public data sources exist in Richmond Virginia relevant to DPW fleet operations and street service tracking? Include Richmond Open Data Portal (data.richmondgov.com), Richmond GeoHub (richmond-geo-hub-cor.hub.arcgis.com), 311 service request data, DPW fleet GPS, snow emergency zone data, and street cleaning schedules. For each: name the dataset, its update cadence, and its API or download access method." --processor pro-fast --no-wait --json

# Query 3 — Failure modes and equity
parallel-cli research run "What are the documented failure modes, adoption barriers, and equity gaps for civic technology solutions tracking snow removal and street cleaning in US cities? Include research on 311 participation inequity, digital divide impacts, which neighborhoods tend to receive delayed service, and what notification approaches work for residents without smartphones or reliable internet." --processor pro-fast --no-wait --json
```

Save results to this directory as:
- `prior_art_parallel_q1.md`
- `prior_art_parallel_q2.md`
- `prior_art_parallel_q3.md`
