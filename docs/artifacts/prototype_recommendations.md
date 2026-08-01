> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# Prototype Recommendations — A Thriving and Sustainable Built Environment

Six prototype concepts across both problem statements, ranked by weekend feasibility.

---

## Concept 1: "What's Happening Here?" Address Lookup Tool

**Problem addressed:** Transportation Project Visibility
**Feasibility:** High
**Recommended for:** Teams with web development skills and familiarity with map APIs

### Description
A simple web tool where a resident types their address and sees all active and planned transportation/infrastructure projects within a defined radius (e.g., 0.5 miles). Each project displays:
- project name (plain language version)
- status (planned / active / complete)
- estimated timeframe (if available)
- link to official source

### Why it works
- Clear user, clear problem, clear demo
- Geocoding is straightforward with public APIs
- Project data can be sourced from Richmond GeoHub ArcGIS layers
- Plain-language translation can be done with AI assistance or pre-written summaries
- Demo: type in a Richmond address, see what's happening nearby

### Key constraints
- Must verify which GeoHub layers are public and contain project data before building
- Translation of technical descriptions requires manual curation or AI summarization (label AI outputs clearly)
- Cannot claim to show all projects — only what's in the data source

### Data sources
- Richmond GeoHub transportation project layers (S001)
- DPW program pages for context (S003)

---

## Concept 2: Infrastructure Project Explorer Map

**Problem addressed:** Transportation Project Visibility
**Feasibility:** High
**Recommended for:** Teams with GIS/mapping experience

### Description
An interactive map overlaying all publicly available DPW and transportation projects on a Richmond basemap. Features:
- color-coded project status (planned / active / complete)
- clickable project cards with plain-language descriptions
- neighborhood filter
- project type filter (safety, streetscape, drainage, mobility)

### Why it works
- Map format is intuitive for spatial queries
- ArcGIS data is the natural source
- No authentication or integration required
- Demo: click on a project pin, see what it is in plain language

### Key constraints
- Layer availability and field names must be verified
- Project boundaries may not be precise (some projects are point data, some are line or polygon)
- Map must load quickly; don't add too many layers

### Data sources
- Richmond GeoHub (S001)
- Neighborhood boundary data for filters

---

## Concept 3: Plain-Language Project Description Translator

**Problem addressed:** Transportation Project Visibility
**Feasibility:** High
**Recommended for:** Teams with AI/NLP interest or content design skills

### Description
A focused tool that takes technical DPW project descriptions and converts them to plain-language summaries a resident can understand. Can be a standalone interface or a component of Concept 1 or 2. Demo flow:
- Input: "Type III Barricade installation along Corridor A per VDOT IIM-LD-249, including ADA-compliant curb ramp retrofit at 4 intersections per PROWAG standards"
- Output: "We're installing temporary traffic barriers and upgrading sidewalk curb cuts to meet accessibility standards at four intersections on this street."

### Why it works
- AI translation is the core capability — narrow and demonstrable
- Can be built without a data pipeline (use example inputs for the demo)
- Immediately useful as a component of a larger tool

### Key constraints
- AI-generated translations must be labeled as AI-generated
- Do not claim translations are officially reviewed
- Accuracy check: show original alongside translation

### Data sources
- Sample DPW project descriptions (harvest from GeoHub or program pages for demo)

---

## Concept 4: Transportation Project Notification System (Opt-In Alerts)

**Problem addressed:** Transportation Project Visibility
**Feasibility:** Medium (higher complexity)
**Recommended for:** Teams with backend/notification experience

### Description
A resident opt-in service for notifications when infrastructure projects near their registered address are created, updated, or completed. MVP version: email or SMS notification when a project layer updates for a neighborhood. Proof-of-concept: simulate a notification being triggered by a project status change.

### Why it works
- Addresses the "status update" gap clearly
- Opt-in model respects privacy
- Proof-of-concept is demonstrable even without a live notification pipeline

### Key constraints
- Cannot claim to send real-time notifications without a functioning backend
- Requires a data update trigger (ArcGIS webhook or scheduled polling)
- Full implementation is beyond weekend scope — demo the concept with a simulated trigger

### Data sources
- Richmond GeoHub (S001) for project data
- Email/SMS API (Twilio, SendGrid) for notification layer

---

## Concept 5: Street Service Status Tracker (Schedule-Based)

**Problem addressed:** Fleet Operations Visibility
**Feasibility:** Medium (data gap is the constraint, not the engineering)
**Recommended for:** Teams comfortable with mock/synthetic data

### Description
A resident-facing display showing when each street cleaning zone is scheduled and whether it has been marked complete for the current cycle. Built against synthetic or publicly sourced zone data (e.g., by council district or street classification). Demo flow:
- Resident enters address → sees "Zone 4 — Street cleaning scheduled: Wednesday, March 25 — Status: Scheduled"
- After cleaning runs: "Status: Completed at 2:00 PM"

### Why it works
- Addresses a specific resident pain point (parking tickets, schedule confusion)
- Schedule-based display does not require GPS
- Zone/schedule data can be mocked with clearly labeled synthetic data

### Key constraints
- Must label clearly: "This tool uses estimated schedules, not real-time tracking"
- Zone boundaries must be clearly synthetic or sourced and disclosed
- Do not imply tool is connected to live DPW systems

### Data sources
- Synthetic zone data (document schema in `dpw_data_landscape.md`)
- Historical street cleaning schedules if obtainable from DPW contacts

---

## Concept 6: Fleet Route Completion Dashboard (Mock GPS Schema)

**Problem addressed:** Fleet Operations Visibility
**Feasibility:** Medium (internal user tool)
**Recommended for:** Teams with dashboard/data visualization experience

### Description
A supervisor-facing dashboard showing snow plow or street cleaning route assignments and completion status. Built against a well-documented synthetic GPS schema. Demo: supervisor logs in, sees 12 of 15 routes marked complete, can drill into any route for details.

### Why it works
- Addresses the supervisor coordination pain point directly
- Does not require live GPS data — uses documented mock schema
- Dashboard is visually compelling and easy to explain to judges

### Key constraints
- Must be clearly labeled as a prototype using mock data
- Do not claim connection to real DPW fleet data
- Schema should be documented so the tool can connect to real data when available

### Data sources
- Synthetic GPS schema (see `dpw_data_landscape.md`)
- Mock route completion records

---

## Recommendation

**Primary recommendation:** Concept 1 (Address Lookup) or Concept 2 (Explorer Map) for most teams — strongest data foundation, clearest user, most demonstrable in 48 hours.

**For teams with AI/NLP focus:** Concept 3 (Plain-Language Translator) as a standalone or integrated component.

**For fleet-oriented teams:** Concept 5 (Schedule Tracker) is safer than Concept 6 because it has a resident-facing user story and does not require GPS schema design. Both require commitment to clearly labeling synthetic data.

**Avoid:** Combining Concepts 4 + 6 (too much backend complexity for 48 hours).
