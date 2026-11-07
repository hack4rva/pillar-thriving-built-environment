# Pain Points — Infrastructure Project Visibility

**Applies to:** StreetLights AND RideShift RVA
**Source:** Web research, Richmond.gov press releases, CivicReady documentation, 311 equity research

---

## Job 1: The Disrupted Commuter — Pain Points

**Pain 1.1 — Construction surprise**
Residents discover construction on their route the morning it starts, with no advance notice. There is no tool that notifies a Richmond resident "a project starts on your block in 2 weeks." The current system is notification-after-the-fact at best (signage appears when equipment does).
*Evidence: StreetLights demo explicitly starts with this scenario. The RVA.gov pattern shows press releases for major projects days before, but nothing for smaller projects.*

**Pain 1.2 — Plain language gap**
GeoHub exists and is live, but it is designed for professionals. Project descriptions use engineering and planning jargon. A resident who navigates to GeoHub cannot easily understand what a project is, why it's happening, or when it will end. StreetLights correctly identified this and solved it.
*Evidence: Comparison of GeoHub project descriptions with StreetLights plain-English versions.*

**Pain 1.3 — Single-project vs. neighborhood view**
Even residents who know about CivicReady or Richmond Connects receive project-by-project notifications. There is no "show me everything happening in my neighborhood this month" view. This makes it impossible to plan around multiple overlapping projects.
*Evidence: Richmond's CivicReady is subscription-based and geography-customizable but not aggregated into a neighborhood view.*

**Pain 1.4 — State road blindspot**
VDOT manages major Richmond roads (I-95, I-64, Route 1, Midlothian Turnpike). These projects do not appear in Richmond GeoHub. A resident commuting on a state road has no equivalent tool and no single source of truth.
*Evidence: VDOT project data is in separate portals (SmartScale, VDOT.org), not integrated with Richmond city data.*

---

## Job 2: The Community Advocate at a Neighborhood Meeting — Pain Points

**Pain 2.1 — No neighborhood-level aggregate view**
A community advocate cannot easily get a list of all projects within a defined neighborhood boundary. GeoHub has the layers but requires GIS skills to filter by neighborhood. There is no presentation-ready, one-click neighborhood project view.
*Evidence: GeoHub UX analysis; StreetLights partially addresses this with radius-based search.*

**Pain 2.2 — Too late for input**
By the time a project appears in GeoHub as "active," the community input phase is typically closed. The planning and design phases (where community input matters) are less visible. Richmond's Legistar records contain this information but are not surfaced in any resident-facing tool.
*Evidence: Richmond Planning Commission notification requirements are project-specific; no standing "all projects in your neighborhood" notification system exists for planning-phase projects.*

**Pain 2.3 — No connection to the comment process**
Even where residents learn about a project, there is no direct path from "I see this project" to "here's where I give input." StreetLights shows project information but doesn't link to public comment portals, Planning Commission agendas, or community meeting schedules.
*Evidence: StreetLights demo shows project details but no engagement pathway.*

---

## Job 3: The Resident Who Wants to Report Infrastructure Problems — Pain Points

**Pain 3.1 — The void problem**
311 reports for infrastructure problems (potholes, broken sidewalks, missing streetlights) provide no confirmation, no tracking number, and no status update. Residents don't know if their report was received or acted on. Trust in reporting systems is low.
*Evidence: Consistent with documented 311 experience; structural analysis.*

**Pain 3.2 — Category mismatch**
311 systems often lack the right category for a resident's actual problem (as documented in Syracuse's Cityline). Issues get filed under wrong categories, obscuring the real volume of problems and preventing accurate prioritization.
*Evidence: University of Iowa 311 equity research; Syracuse Cityline analysis, 2025.*

**Pain 3.3 — Upvote systems favor connected neighborhoods**
StreetLights' community upvote feature is a good idea in principle, but neighborhoods with higher smartphone and internet penetration will generate more upvotes for their issues. The neighborhoods with the most deferred maintenance and the fewest active upvoters are exactly the ones that need the most attention.
*Evidence: University of Iowa 311 equity research on participation gaps, 2024.*

**Pain 3.4 — Language and access barriers**
A resident who primarily speaks Spanish cannot easily navigate English-only infrastructure tools. CivicReady supports multilingual notifications, but most project information on GeoHub, Legistar, and StreetLights is English-only.
*Evidence: Demographic data on Richmond Spanish-speaking population; comparison with Pittsburgh's 10-language plow tracker.*

---

## Cross-Cutting Pain Points

**Trust gap with city communications:** Richmond residents — particularly in communities of color and lower-income neighborhoods — have a documented distrust of city communications based on years of unresponsive 311, late project notifications, and construction that arrives without warning. A new tool must rebuild trust, not just add a feature.

**GeoHub data quality:** The entire information ecosystem (StreetLights, Richmond Connects, any future tool) depends on project managers updating GeoHub records. This is a governance and workflow problem that no amount of front-end work can solve. If GeoHub is stale, StreetLights is wrong.
