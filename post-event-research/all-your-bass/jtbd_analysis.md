# JTBD Analysis — Stay Informed (All Your Bass Are Belong to Us)

**Pillar:** Thriving & Sustainable Built Environment
**Problem Statement (verbatim):** Fleet Operations & Street Service Tracking — Improve how DPW supervisors and residents track the progress of services like snow removal and street cleaning in real time.
**Demo:** Stay Informed — dual public/staff portal for DPW fleet tracking

---

## Jobs To Be Done

### Job 1 — The Stranded Resident
> "When a winter storm hits and my street hasn't been cleared by morning, I (a Richmond resident, especially in an outer or lower-income neighborhood) want to know whether my street is scheduled to be plowed today and roughly when, so I can decide whether it's safe to drive to work, ask my employer for accommodation, or arrange childcare — without spending 45 minutes on hold with 311."

**Current workaround:** Call 311, refresh Twitter/X for DPW updates, ask neighbors, assume the worst and stay home.
**Pain:** No reliable, accessible source of truth for when a specific street will be serviced. The cost of uncertainty falls hardest on hourly workers and people without flexibility.

### Job 2 — The DPW Supervisor Mid-Storm
> "When I (a DPW supervisor) am managing a 12-hour snow emergency shift, I want to see — on one screen — which routes have been completed, which trucks are behind schedule, and where I have an unreported breakdown or gap, so I can redeploy equipment and give an accurate status update to the director without calling every driver individually."

**Current workaround:** Radio contact with drivers, whiteboard in dispatch office, spreadsheet tracking, phone calls.
**Pain:** No real-time operational picture. Decisions are reactive, not proactive. Reporting up the chain requires manual aggregation.

### Job 3 — The Accountability-Seeking Resident in an Underserved Neighborhood
> "When I (a resident of a historically underserved Richmond neighborhood) notice that my block was missed during snow removal or street cleaning — again — I want to report this in a way that creates a documented, trackable record and triggers a response, so that I have proof of the service gap and can hold DPW accountable at the next city council meeting."

**Current workaround:** 311 call (often dropped or not logged correctly), social media complaint, contact council member.
**Pain:** No feedback loop. Residents don't know if their report was received, acted on, or if their neighborhood is systematically deprioritized.

---

## Open Questions

### Data Questions
1. Does Richmond's DPW currently have GPS tracking devices on its plow trucks and street sweepers? If so, what system are they using and does it export data?
2. What format does DPW use to assign and track routes? (Spreadsheet, dispatch software, GPS platform, paper?)
3. Is Richmond's 311 data available via an open API? What service request categories exist for street cleaning and snow removal?
4. What is the update cadence on DPW route completion data — is anything logged in real time, or only at shift end?
5. Does Richmond have a snow emergency route classification system, and is that data published anywhere?

### User Questions
6. Has any team member spoken with a DPW supervisor or field operator about what their current dispatch workflow looks like?
7. Has any resident from a neighborhood that has historically experienced delayed snow removal been interviewed about how they currently find out about service status?
8. What does a resident in a non-English-speaking household do today when they need snow removal status information?

### Integration Questions
9. What city system (if any) currently tracks fleet location data? What would it take to export a real-time feed from that system?
10. Who at the City of Richmond would own and maintain this platform after the hackathon? What department? What budget line?

### Equity Questions
11. Which Richmond neighborhoods are statistically last to be plowed during snow emergencies? Is this data available?
12. Does the notification system work for residents without smartphones or email addresses?

### Prior Art Questions
13. Has any comparable US city built a resident-facing plow tracker that uses real DPW GPS data? How did they solve the data integration problem?
14. Why did Richmond not already have this tool, given that Baltimore, Pittsburgh, and Chicago have had plow trackers for years?
