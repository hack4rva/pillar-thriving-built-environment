> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# User Journey Maps — A Thriving and Sustainable Built Environment

Note: Journeys include inferences based on the working session notes and general public works patterns. Each friction point should reference an `evidence_log.md` id when verified.

---

## Journey 1 — Resident encounters construction with no explanation

**User:** Richmond resident (homeowner or renter, any neighborhood)
**Goal:** Understand what the construction cones outside their house are for, who is responsible, and when it will end.

### Steps taken
1. Notices orange construction cones on their block for the first time on Monday morning
2. Checks the City website hoping to find a project announcement or description
3. Searches "Richmond road construction [street name]" — finds a generic DPW page
4. Tries the Richmond GeoHub, navigates to a transportation layer, cannot interpret the technical description
5. Calls 311 — gets placed in a queue; eventually told to call DPW directly
6. Calls DPW — is transferred twice; eventually reaches a project manager who explains the project is a drainage improvement
7. Three weeks later, wonders if the project is delayed; cannot find any status update online

### Friction points
- No single place to search for projects by address or neighborhood
- GeoHub layer descriptions use engineering terminology (e.g., "Type III Barricade corridor with VDOT coordination")
- 311 is not a reliable path for project information lookups
- No status update mechanism exists for residents to track a project once found
- Construction end dates are not publicly visible even when known internally

### User questions at each step
- "What is this project?" / "Who approved it?"
- "How long is it going to last?"
- "Is this a City project or a utility company project?"
- "Has the timeline changed?"
- "Where can I call to complain or ask questions?"

### Prototype opportunities
- Address-based project lookup that surfaces nearby active and planned projects
- Plain-language description layer that translates technical project notes
- Status indicator (planned / active / paused / complete)
- Contact or inquiry link per project

---

## Journey 2 — DPW supervisor managing snow removal routes

**User:** DPW operations supervisor managing 15–20 plow drivers during a snowstorm
**Goal:** Know whether all priority routes have been completed without having to call each driver individually.

### Steps taken (current state)
1. Receives weather alert: 4–6 inches expected overnight; activates snow removal protocol
2. Assigns routes to drivers verbally or via radio at the start of the shift
3. Checks in with drivers by radio every 2 hours to get status updates
4. Manually logs completed routes on a whiteboard or shared spreadsheet
5. Receives calls from residents and City officials asking about specific streets
6. Has to radio individual drivers to get current location/status
7. After the storm, assembles a completion report manually from driver logs

### Friction points
- No digital route completion tracking: all status is verbal or manual
- Supervisors have no real-time or near-real-time view without calling drivers
- Phone and radio coordination takes time away from other incident management
- Completion reports are assembled after the fact from paper logs
- GPS is being installed but not yet available or integrated

### User questions at each step
- "Is Route 7 done? What's left?"
- "Which driver is closest to [intersection] that just got called in?"
- "Can I show the Mayor that Main Street is clear?"
- "What's our overall completion rate right now?"

### Prototype opportunities (with mock data)
- Route progress dashboard (synthetic GPS schema): shows each route's status
- Simple completion tracker: supervisor marks routes complete manually (low-tech but useful)
- Mock alert system: when a route transitions to "complete," a public-facing map updates
- Supervisor workboard: digital whiteboard view showing route assignments and status

---

## Journey 3 — DPW communications staff answering resident calls

**User:** DPW public communications staff member fielding calls and emails during street cleaning week
**Goal:** Quickly answer resident questions about when their street will be cleaned and whether their car needs to move.

### Steps taken (current state)
1. Resident calls or emails asking about street cleaning schedule for their block
2. Staff member looks up a PDF or printed schedule that may be out of date
3. Staff member is not sure if that block's schedule changed due to a holiday or maintenance issue
4. Staff member tells resident "it should be this week" but cannot confirm
5. Resident parks on the street; car is ticketed because the cleaning ran on a different day
6. Resident calls back frustrated; staff member escalates to operations for explanation

### Friction points
- Schedule information is not in a queryable format staff can search by address
- Holiday adjustments and route modifications are not systematically communicated
- No feedback loop between operations (route completion) and communications (public info)
- Staff rely on static documents rather than live or updated status

### User questions
- "I have the schedule but it doesn't match what happened — what's the real schedule?"
- "Is the cleaning for my block still on for Thursday?"
- "Why did I get a ticket if I followed the posted schedule?"

### Prototype opportunities
- Address-queryable schedule lookup for communications staff
- Operations-to-communications status feed (even manual update log)
- Public-facing cleaning schedule by street segment (simpler version of same tool)
