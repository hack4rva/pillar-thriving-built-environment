# MVP Shapes — A Thriving and Sustainable Built Environment

---

## Shape A — Infrastructure Project Explorer Map

### Best for
Teams with GIS/mapping experience and frontend skills.

### Problem addressed
Transportation Project Visibility

### Inputs
- Richmond GeoHub ArcGIS project layers (public REST API)
- Neighborhood or council district boundary data
- Manually curated plain-language descriptions for demo projects (5–10 sample projects)

### Core user flow
1. Resident opens map
2. Map shows Richmond with project pins/shapes color-coded by status
3. Resident clicks a project or their neighborhood
4. Project card appears: name (plain language), status, estimated timeframe, source link
5. Resident can filter by project type or status

### Demo
Pan to a Richmond neighborhood → click a project pin → see a plain-language explanation of what the project is and when it will end.

### Architecture (text)
```
[GeoHub ArcGIS REST API]
        |
    [Python/JS data fetch + transform]
        |
    [GeoJSON project features]
        |
    [Leaflet.js or Mapbox GL map]
        |
    [Project card component (name, status, description, link)]
```

### Key constraints
- Verify which GeoHub layers are public before building
- Plain-language descriptions cannot be auto-generated without a quality review step
- Map must load in under 3 seconds for a credible demo

---

## Shape B — "What's Happening Here?" Address Lookup

### Best for
Teams with web development skills; strongest user story for residents.

### Problem addressed
Transportation Project Visibility

### Inputs
- Richmond GeoHub project layers
- Geocoding service (OpenStreetMap Nominatim or ESRI geocoding)
- Optional: DPW program page links as reference for "learn more"

### Core user flow
1. Resident types an address into a search box
2. Tool geocodes the address to coordinates
3. Tool queries nearby projects (e.g., within 0.5 miles) from GeoHub
4. Tool returns a list of projects: name (plain language), status, distance, link

### Demo
Type "100 N 5th St, Richmond, VA" → see "2 projects within 0.5 miles: [Project A — Safety improvement, active] [Project B — Streetscape upgrade, planned]"

### Architecture (text)
```
[User input: address]
        |
[Geocoding API (Nominatim / ESRI)]
        |
[Coordinates → GeoHub spatial query]
        |
[Project feature list → sort by distance]
        |
[Results list with project cards]
```

### Key constraints
- Geocoding quality varies for Richmond addresses; test with 5–10 sample addresses before the demo
- GeoHub query requires a bounding box or buffer geometry; use a 0.5-mile radius buffer
- Clearly label data source and "last updated" date

---

## Shape C — Project Update Notification System (Opt-In)

### Best for
Teams with backend and notification experience; good demo concept even as a proof-of-concept.

### Problem addressed
Transportation Project Visibility

### Inputs
- Richmond GeoHub project layers
- Email or SMS API (Twilio, SendGrid)
- Neighborhood or address registration form

### Core user flow
1. Resident registers with their address and email/phone
2. System periodically checks GeoHub for project status changes near that address
3. When a project updates, resident receives an email or SMS notification
4. Notification includes: project name (plain language), new status, link

### Demo
Simulate a project status change → show the notification that would be sent → show the resident-facing interface for managing subscriptions.

### Architecture (text)
```
[Address registration → store in DB]
        |
[Scheduled job: poll GeoHub for changes]
        |
[Diff against last known state]
        |
[Trigger notification via email/SMS API]
        |
[Resident receives alert]
```

### Key constraints
- Full implementation is beyond 48 hours; demonstrate the concept with a triggered simulation
- Privacy: do not collect or store addresses beyond demo purposes
- Clearly scope to a notification about status change, not a real-time location broadcast

---

## Shape D — Street Service Status Tracker

### Best for
Teams comfortable with mock/synthetic data; direct resident value proposition.

### Problem addressed
Fleet Operations Visibility

### Inputs
- Synthetic zone data (GeoJSON, by council district or custom zones)
- Static or editable schedule table
- Optional: manual "mark complete" interface for supervisor simulation

### Core user flow
1. Resident enters address or clicks on map
2. Tool identifies their service zone
3. Tool shows: "Zone 4 — Street cleaning scheduled: Wednesday, March 25 — Status: Scheduled"
4. After cleaning: "Status: Completed at 2:00 PM (updated manually)"

### Demo
Enter an address → see zone assignment → see this week's cleaning schedule → see simulated "completed" status.

### Architecture (text)
```
[Zone boundary GeoJSON (synthetic)]
        |
[Address → zone lookup (point-in-polygon)]
        |
[Schedule table (zone, date, status)]
        |
[Status display: scheduled / in progress / completed]
        |
[Optional: supervisor input to update status]
```

### Key constraints
- Must label clearly: "Schedule based on planned routes — not real-time tracking"
- Zone data must be clearly marked as illustrative/synthetic
- Do not imply tool is connected to live DPW systems

---

## Shape E — Plain-Language Project Description Translator

### Best for
Teams with AI/NLP interest; strong standalone or component tool.

### Problem addressed
Transportation Project Visibility

### Inputs
- Real technical project descriptions from GeoHub or DPW program pages (5–15 examples)
- AI translation (GPT/Claude API) or manually written translations

### Core user flow
1. Technical DPW description is input (or selected from a list)
2. Tool generates or displays a plain-language version
3. Original description is shown alongside for transparency
4. Optional: resident can ask follow-up questions about the project

### Demo
Display a real technical description ("Type III Barricade...") alongside a plain-language version ("We're installing traffic barriers and upgrading accessibility curb cuts"). Toggle between views.

### Architecture (text)
```
[Project description input (real or selected)]
        |
[AI translation layer (or pre-written translations)]
        |
[Side-by-side display: original | plain language]
        |
[Optional: Q&A component for follow-up questions]
```

### Key constraints
- Label all AI-generated content as AI-generated
- Show the original text alongside the translation — never replace it
- Do not claim translations are officially reviewed by DPW
- Accuracy: validate sample translations against actual project scope before demo
