# JTBD Analysis — RideShift RVA

**Pillar:** Thriving & Sustainable Built Environment (also Thriving Economy)
**Problem Statement (verbatim):** Infrastructure Project Visibility — Help residents find and understand transportation and infrastructure projects happening in their neighborhoods.
**Demo:** RideShift RVA — multimodal commute incentive platform with local business rewards
**Team:** The Supply and Command Line
**Website:** rideshiftrva.com
**Note on problem statement alignment:** RideShift addresses the Built Environment pillar primarily through the lens of the RVA Green 2050 sustainability plan and multimodal transportation. It surfaces Richmond Connects project data as a secondary feature. Its core mechanic (behavior change through rewards) is only tangentially related to the "help residents find and understand projects" framing of the problem statement.

---

## Jobs To Be Done

### Job 1 — The Car-Dependent Richmond Commuter Who Wants to Change
> "When I (a Richmond resident who drives to work alone every day) want to try taking the bus, biking, or carpooling but don't know where to start or feel like it's not worth the inconvenience, I want a simple way to set a realistic goal, try something different, and get a reward for my progress — even partial progress — so I feel motivated to keep experimenting rather than defaulting back to driving."

**Current workaround:** Nothing structured. GRTC has a trip planner. Bike infrastructure info is scattered. No reward mechanism exists.
**Pain:** No single entry point for multimodal experimentation. The effort to change habits is high, the immediate reward is low, and there's no community of people doing the same thing.

### Job 2 — The Local Richmond Business That Wants Foot Traffic
> "When I (a local, small, or minority-owned Richmond business owner) want to attract customers who are actively trying new things in the city, I want a low-cost way to offer deals to people who are already moving around the city in new ways, so I get qualified foot traffic without spending money on untargeted advertising."

**Current workaround:** Groupon, social media ads, word of mouth.
**Pain:** No low-cost channel to reach residents who are actively engaging with Richmond's multimodal ecosystem.

### Job 3 — The City Planner Who Needs to Understand Transportation Barriers
> "When I (a Richmond transportation planner or sustainability office staff member) am trying to understand why residents aren't using GRTC or bike infrastructure more, I want structured, voluntary data about which specific barriers residents actually face — not just 311 complaints — so I can use that information to prioritize infrastructure investments and advocacy."

**Current workaround:** Surveys, focus groups, 311 data, ridership numbers.
**Pain:** Barrier data is expensive to collect and disconnected from individual commuter experience. The City doesn't know which specific friction points prevent mode shift.

---

## Open Questions

### Data Questions
1. What is the data source for the Richmond Connects project map shown on RideShift? Is this pulling live from a Richmond city API, or is it a static embed?
2. The barrier reporting feature collects data from users — where does this data go? Who at the City receives it? In what format?
3. How are individual commute mode claims verified? Can a user claim they biked to work every day without any evidence?

### User Questions
4. The demo mentions "I like to bike — I'll add a scooter day" as an example goal. Has the team interviewed Richmond residents about whether this goal-setting model resonates with the populations most likely to shift modes (lower-income, non-car-owning residents)?
5. The reward model assumes residents are motivated by local business discounts. Is this validated? Has any resident been interviewed?
6. Who is the intended primary user — a progressive, tech-savvy Richmonder who already bikes sometimes, or a car-dependent resident who has never tried alternatives?

### Integration Questions
7. The five business partners (Common House, Tito's Taqueria, etc.) signed on in 36 hours. What is the onboarding process for a business to offer a reward? Is this self-service?
8. How does reward redemption work? Is there a digital coupon system? What prevents fraud?
9. The magic link email sign-in requires a working email address. What happens for users without reliable email access?

### Equity Questions
10. The reward structure favors people who can afford to try alternatives (i.e., who have the option to not drive). What about residents who have no transit option other than their car — does this product help them?
11. The local business partners are in relatively central/affluent parts of Richmond. Do rewards apply equally to residents in outer neighborhoods?
12. Is the site available in Spanish? A significant portion of Richmond residents whose commutes might benefit from multimodal options are Spanish-speaking.

### Prior Art Questions
13. Commute incentive and mode shift reward programs have been tried in multiple US cities (Commute Seattle, Bike+, etc.). What distinguishes RideShift from these? What has failed in comparable programs?
14. How does RideShift's Infrastructure Project Visibility feature (the Richmond Connects embed) add value beyond simply linking to Richmond Connects directly?
