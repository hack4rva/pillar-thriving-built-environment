# JTBD Analysis — StreetLights

**Pillar:** Thriving & Sustainable Built Environment
**Problem Statement (verbatim):** Infrastructure Project Visibility — Help residents find and understand transportation and infrastructure projects happening in their neighborhoods.
**Demo:** StreetLights — plain-English infrastructure project map powered by Richmond GeoHub
**Team:** Team Aurea — Angelica, Trabia, Alekia (J.R. Tuggle High School juniors)

---

## Jobs To Be Done

### Job 1 — The Disrupted Commuter
> "When I (a Richmond resident, especially a renter or hourly worker without flexibility) am about to leave for work or school and my usual route is blocked by construction I didn't know about, I want to find out immediately what is happening, how long it will last, and whether there's an alternate route, so I am not late, caught off guard, or forced to waste time on hold with 311."

**Current workaround:** Drive into the construction and turn around; check Google Maps (which often doesn't show city project status); call 311; ask neighbors.
**Pain:** Construction start and duration are not communicated to residents in advance. The disruption is a surprise. No self-service tool exists for pre-trip planning that includes city project status.

### Job 2 — The Community Advocate at a Neighborhood Meeting
> "When I (a civic leader, neighborhood association rep, or community organizer) am running a meeting about what's changing in my neighborhood, I want to show residents a single, accurate, up-to-date map of all active and planned city projects near us, so we can have an informed conversation about impacts and engage the planning process while there's still time to influence outcomes."

**Current workaround:** Request a PDF map from the planning department; check GeoHub manually (requires technical skill); call the city's project management office.
**Pain:** There is no presentation-ready, plain-language view of active projects at the neighborhood level. GeoHub exists but is designed for professionals, not residents.

### Job 3 — The Resident Who Wants to Report Infrastructure Problems
> "When I (a Richmond resident) notice a pothole, broken streetlight, crumbling sidewalk, or other physical hazard on my block, I want to report it in a way that gets logged, tracked, and actually addressed — and I want to be able to see whether my report made a difference — so I feel like a participant in maintaining my neighborhood rather than someone who shouts into a void."

**Current workaround:** 311 call, 311 app, email to council member, post on Nextdoor.
**Pain:** 311 provides no tracking or confirmation. Residents don't know if their report was received or acted on. There is no community visibility into neighborhood-level issue prioritization.

---

## Open Questions

### Data Questions
1. StreetLights pulls from Richmond GeoHub — which specific GeoHub layers are being used? What is the update cadence of those layers?
2. Does GeoHub include projects in planning and design phases, or only active construction? (The demo shows color codes for all three stages.)
3. Does GeoHub include project manager contact information in the data, or is that added manually by the team?
4. What happens when a GeoHub project record is out of date or incomplete? Does StreetLights display stale data without warning?
5. Does GeoHub include VDOT projects (state roads) as well as City projects, or only City-managed infrastructure?

### User Questions
6. The demo says "enter your address." Has the team tested this with residents who are not technically literate? Does the address lookup work reliably for all Richmond addresses?
7. The SMS notification feature is announced — has it actually been built and tested? What system sends the SMS?
8. The community upvote feature for resident issues — where does that data go? Is there a backend that routes upvoted issues to the City?

### Integration Questions
9. The upvoted issue reports — do they go to 311? To a separate backend? To nowhere yet?
10. The route planning feature (announced as future) — what navigation API would this use? Does it integrate with Google Maps or a city routing layer?

### Equity Questions
11. The site requires address entry — what about residents who don't know their address reliably (e.g., unhoused individuals, people in transitional housing)?
12. Is StreetLights available in Spanish or other languages? Richmond has a significant Spanish-speaking population.
13. Do SMS notifications cost money to the recipient? (Relevant for residents on limited phone plans.)
14. Does the community issue upvote system disadvantage neighborhoods with lower smartphone or internet penetration — meaning wealthier neighborhoods' issues get more upvotes?

### Prior Art Questions
15. SeeClickFix and similar platforms have operated 311-integration civic issue reporting tools for 10+ years. How does StreetLights' community reporting differ from what already exists?
16. Several cities have plain-language project notification tools. What does Richmond's Planning Department currently offer residents, and is there overlap with StreetLights?
