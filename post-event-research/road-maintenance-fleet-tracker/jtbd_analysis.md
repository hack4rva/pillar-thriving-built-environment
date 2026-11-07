# JTBD Analysis — Road Maintenance Fleet Tracker

**Pillar:** Thriving & Sustainable Built Environment
**Problem Statement (verbatim):** Fleet Operations & Street Service Tracking — Improve how DPW supervisors and residents track the progress of services like snow removal and street cleaning in real time.
**Demo:** Road Maintenance Fleet Tracker — public + staff dual-portal (no live site URL on record)

---

## Jobs To Be Done

These are identical to the All Your Bass review because both demos address the same problem statement. They are restated here for completeness.

### Job 1 — The Stranded Resident
> "When a winter storm hits and my street hasn't been cleared by morning, I (a Richmond resident, especially in an outer or lower-income neighborhood) want to know whether my street is scheduled to be plowed today and roughly when, so I can decide whether it's safe to drive, ask for accommodation, or arrange childcare — without spending 45 minutes on hold with 311."

**Current workaround:** Call 311, check social media, ask neighbors, assume worst and stay home.
**Pain:** No reliable self-service source of truth for street service status.

### Job 2 — The DPW Supervisor Mid-Storm
> "When I (a DPW supervisor) am managing a snow emergency shift, I want to see — on one screen — which routes are complete, which trucks are behind schedule, and where gaps exist, so I can redeploy equipment and report status accurately to leadership without calling every driver."

**Current workaround:** Radio, whiteboard, phone calls, spreadsheet.
**Pain:** No real-time picture. Reporting requires manual aggregation. Decisions are reactive.

### Job 3 — The Accountability-Seeking Resident in an Underserved Neighborhood
> "When I notice my block was missed during snow removal or street cleaning — again — I want to file a report that creates a trackable record and triggers a response, so I have evidence of the service gap and can hold DPW accountable."

**Current workaround:** 311 call, social media post, council member complaint.
**Pain:** No confirmation, no tracking, no feedback loop. Historically underserved neighborhoods face this most frequently.

---

## Open Questions

### Data Questions
1. Does the team have any evidence of what fleet management or GPS software Richmond DPW currently uses?
2. Has anyone verified whether DPW's plow trucks have any form of GPS or telematics device installed?
3. What format do DPW route assignments actually take — are routes mapped in a GIS system, a spreadsheet, or by driver knowledge alone?
4. Is the street cleaning schedule published anywhere by DPW, and if so in what format?
5. Where does the BMP (Best Management Practices) data the analytics section references actually come from?

### User Questions
6. Has any member of this team spoken with a DPW supervisor, dispatcher, or field operator?
7. Has any member spoken with a Richmond resident who experienced a missed plow or cleaning event?
8. What does a DPW supervisor actually do at the start of a snow shift? Walk through that workflow step by step.

### Integration Questions
9. The staff portal shows "vehicle unique identifiers" — where would these IDs come from in a real deployment? Who assigns them?
10. What city procurement process would be required to deploy this to DPW staff devices?

### Equity Questions
11. The notification system requires an email address. What percentage of Richmond residents in the highest-need neighborhoods have reliable email access vs. cell phone text access?
12. Is the product available in any language other than English?

### Prior Art Questions
13. Pittsburgh's "Plow Burgh" and Chicago's "Plow Tracker" have operated for years. Why didn't this team use one of these as a starting point or reference architecture?
14. What specific reason does Richmond not already have this tool, given it's a solved problem in comparable cities?
