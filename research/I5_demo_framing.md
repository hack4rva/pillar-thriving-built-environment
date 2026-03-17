# Win the Room: Framing Built-Environment Civic Demos that Judges Trust

## Executive Summary
In civic tech hackathons, the framing of a prototype is just as critical as the code itself. Framing acts as the interpretive layer that tells judges—often government officials or civic technologists—what to pay attention to, why the tool matters, and how to evaluate its success. Weak framing can cause technically brilliant demos to be dismissed as naive, while strong framing can make a limited weekend prototype feel like a credible, deployable step forward. 

This report synthesizes best practices for pitching built-environment tools (specifically transportation project visibility and fleet operations). The data reveals four strategic pillars for winning pitches:
1. **Precision beats abstraction:** Openings must name a specific user, moment, harm, and gap. 
2. **Layer, not replacement:** Positioning the tool as a "translation layer" over existing City systems disarms defensiveness from agency judges.
3. **Verifiable metrics over hype:** Impact claims must focus on demonstrable user gains (e.g., task completion time) rather than speculative systemic outcomes (e.g., reducing 311 calls).
4. **Resilient data flows:** Sustainability answers must anchor to authoritative, auto-updating City data feeds rather than volunteer maintenance.

## Why Framing Determines Judging Outcomes

Judges evaluate civic tech not just on technical elegance, but on its understanding of government realities and community needs. When teams fail to frame their work within these realities, the results are stark. For example, the District of Columbia's "Apps for Democracy" event produced 47 applications valued at an estimated $2,300,000, yet the city did not adopt a single application after the event concluded [1]. 

To avoid this fate, teams must adopt a "build with, not for" mentality [2]. This ethos recognizes that solutions are most effective when designed in partnership with the communities they serve, shifting the focus from purely technological products to empathy and understanding [3]. Furthermore, using plain language—communication that is clear and easy to understand for the target audience—builds trust and demonstrates a focus on the resident experience [4]. Framing your demo through these lenses proves to judges that your team understands the civic context, making the prototype instantly more credible.

## Openings That Win: Specific User, Moment, Harm, Gap

An opening sentence that names the user, the moment, the harm, and the gap, paired with a live-verifiable task, vastly outperforms general problem statements. Abstractions like "residents have trouble finding information" fail to create emotional stakes or define a measurable baseline.

### Evidence-Backed Principles from GOV.UK and USDS
The UK Government's Service Manual mandates that user stories follow a strict format: "As a... [who is the user?], I need/want/expect to... [what does the user want to do?], So that... [why does the user want to do this?]" [5]. This forces teams to briefly explain the actor, the narrative, and the goal [5]. 

Similarly, the U.S. Digital Services (USDS) Playbook emphasizes developing metrics that measure how well a service meets user needs at each step, asking teams to identify specific pain points in the current way users accomplish tasks [6]. By adopting this rigorous structure in your opening sentence, you immediately signal to judges that your tool is grounded in actual user needs.

### Templates for Built-Environment Problem Statements
* **Transportation project visibility:** "A Richmond resident searching for information about the construction on their block today faces a 7-step process across three City websites and still may not find an answer in plain language."
* **Fleet operations visibility:** "After a Richmond snowstorm, there is currently no way for a resident to know whether their street has been plowed — they can only call 311 or wait."

### Demo Measurement to Include in the Opener
Task completion time (Time-on-task) is a fundamental UX metric that measures how long it takes a user to complete a given task [7]. By stating in your opening that your tool reduces a specific task from an unknown duration to under 30 seconds, you set a verifiable benchmark for the rest of the demo.

## Positioning that Calms DPW Concerns

When presenting to Department of Public Works (DPW) or agency-adjacent judges, teams often fall into the trap of implying that existing government systems are broken and the hackathon tool is the "cure." This creates instant defensiveness. Instead, teams must frame their tool as a discovery, translation, or communication layer that sits *on top* of existing infrastructure.

### Proof from LA GeoHub and EuclidHL
Los Angeles' GeoHub successfully models this "layer" approach. It acts as a location-as-a-service platform that weaves together over 500 datasets, allowing users to access live, continuously updated data directly from the city [8] [9]. It powers public-facing apps like "Street Wize," which translates complex permit data so residents can track construction activity and avoid delays [8]. 

Similarly, Esri partner Houseal Lavigne created EuclidHL, an AI assistant that simplifies complex city planning and zoning documents by answering user questions in clear, concise language while interfacing directly with existing ArcGIS technology [10]. Both examples prove that the most successful civic tools translate existing data rather than attempting to replace the underlying systems.

### Phrasebook: What to Say and What to Avoid

| Positioning Term (Use) | Value Proposition | When to Use | Risks Mitigated |
| :--- | :--- | :--- | :--- |
| **Translation layer** | Converts ArcGIS/DPW data to resident-readable answers | Non-GIS public audiences | Avoids "we replace ArcGIS" |
| **Discovery layer** | One-stop findability across multiple City pages | Fragmented websites/data portals | Avoids implying broken systems |
| **Communication bridge** | Supervisor-updated public status feed | Fleet ops / snow / trash | Avoids ops-efficiency claims |
| **Reading interface** | Auto-updates from authoritative layers | GeoHub/ArcGIS-backed data | Avoids content maintenance burden |

| Avoid (Don't Use) | Why it Backfires | Better Alternative |
| :--- | :--- | :--- |
| **Replaces** | Signals disrespect for City systems | "Works alongside; makes data findable" |
| **Disrupts** | Triggers defensiveness in agency judges | "Aligns with existing workflows" |
| **Automates (ops)** | Overpromises beyond demo scope | "Publishes status residents can trust" |
| **Fixes government** | Political framing; alienates | "Translates authoritative data" |

*Takeaway: Use language that positions your tool as a bridge between the government's authoritative data and the resident's need for plain-language answers.*

## Impact Without Overclaiming

Overclaiming is a fatal flaw in hackathon pitches. Claiming a weekend prototype will "reduce 311 calls by 20%" or "improve DPW operational efficiency" invites immediate skepticism because these outcomes cannot be verified in a demo. Instead, teams must focus on metrics that track actual value being delivered on a repeatable timeframe, rather than vanity metrics [11].

### Evidence and Safe Metrics
The USDS Playbook advises teams to use data to drive decisions, specifically tracking metrics like the percentage of transactions started versus completed, and average response times broken down by percentiles (e.g., requests taking more than 1s, 2s, 4s, and 8s) [6]. Measuring task time is a standard way to take a "best guess" at usability from a sample of users [12].

### Metrics You Can Claim Now vs. Later

| Claim Now (Demo-Verifiable) | Example Phrasing | Evidence to Show |
| :--- | :--- | :--- |
| **Time-on-task** | "Finds project info <30s vs. 7-step process" | Live stopwatch; screen path |
| **Steps reduced** | "Single address search replaces GIS + 3 pages" | Before/after flow diagram |
| **Shared status view** | "Public readout doesn't exist today" | Side-by-side of current vs. prototype |
| **Performance P95** | "Map loads in <2s" | Network panel screenshot |

| Claim Later (Pilot-Required) | Why Defer | How to Answer Now |
| :--- | :--- | :--- |
| **311 call reduction** | Needs months of data | "We'll A/B test 311 categories in a pilot" |
| **DPW efficiency gains** | Out of scope for public layer | "Supervisor updates are ≤2 minutes; ops unchanged" |
| **Safety/compliance shifts** | Multi-factor causality | "We'll track completion + comprehension in pilot" |

*Takeaway: Anchor your pitch to the immediate, verifiable user experience improvements shown on screen, and explicitly defer systemic impact claims to a future pilot phase.*

## Sustainability and "What Happens After?"

The sustainability question ("who maintains this after the hackathon?") is asked of nearly every civic tech prototype. Teams that lack a credible answer lose the room. The strongest defense is a resilience framing: proving that the tool reads from public City data that DPW already maintains, meaning the tool itself requires no content work.

### Data Resilience via Existing City Pipelines
Judges look for tools that plug into established workflows. For example, Seattle's Department of Transportation (SDOT) requires utility agencies to provide data regarding planned capital improvement projects for the following five years, and any work planned at least six months in advance must be entered into their Coordinate application [13]. This data automatically feeds a public Project and Construction Coordination Map [14] [13]. By tapping into similar existing mandates (like a city's GeoHub), your tool inherits the city's data resilience.

### Ownership and Hosting Models that Work

| Model | Who Owns | Pros | Cons | Example Pattern |
| :--- | :--- | :--- | :--- | :--- |
| **City adoption after pilot** | Dept./IT | Authority; data proximity | Procurement/timeline | City plow tracker evolution |
| **Nonprofit hosting** | Local NGO | Neutral; grant-eligible | Funding continuity | Open data portals support |
| **University partnership** | Lab/center | Talent; R&D | Calendar churn | Studio-to-city handoffs |
| **Brigade open-source** | CfA brigade | Volunteer energy | Volunteer attrition | ClearStreets archive lessons |

*Takeaway: Volunteer-run projects eventually succumb to maintenance fatigue. ClearStreets, a volunteer-run Chicago plow tracker, operated successfully for 8 winters (2012-2019) but ultimately shut down due to the high maintenance needed to collect data and changes to the City's own tracker [15]. Always propose a transition path to an institutional owner.*

## Case Comparables Judges Recognize

Referencing well-known civic tech precedents legitimizes your approach and proves your architecture is grounded in reality.

### LA GeoHub
Los Angeles launched GeoHub to combine geographic data into a location-as-a-service platform, allowing users to access live data rather than static downloads [8]. It powers transparency apps like "Road to 2400," which showed the 2,400 lane miles of streets the city paved on a 2,200-lane budget [8]. Cite this to prove that "reading interfaces" are a proven municipal standard.

### Seattle Coordinate/dotMaps
Seattle uses the Coordinate (formerly dotMaps) application to compile public transportation and infrastructure projects, feeding an interactive public map [14] [13]. Cite this to show that aggregating right-of-way impacts into a single public view is a solved problem your tool is simply replicating locally.

### Chicago Plow Tracker & ClearStreets
When Chicago released its Plow Tracker in 2012, civic technologists built "ClearStreets" to show where plows had *been*, rather than just where they were [16] [15]. Eventually, the City of Chicago updated its own tracker to allow residents to search by address and get a log of plow visits, absorbing the volunteer tool's functionality [15]. Cite this to show how public communication layers naturally evolve into official city systems.

## Sunday-Rehearsal Assets: Framing Language Cheat Sheet

Use these fill-in-the-blank templates during pitch rehearsals to ensure tight, credible framing.

### Opening Sentence Templates
* **Transportation:** "A [Richmond renter/homeowner] looking up [construction on their block] at [time/day] must navigate [3] sites and [7] steps and still can't see [plain-language status], causing [missed work/unexpected closures]."
* **Fleet Operations:** "After [a snowstorm], a [Richmond resident] has no way to know if [their street was plowed]—they can only [call 311 or wait], creating [anxiety and inequity for shift workers]."

### Positioning Statement Templates
* **DPW-Adjacent (Data):** "This does not replace Richmond's ArcGIS or DPW pages—it makes them findable and readable for residents who are not GIS professionals."
* **Fleet Operations (Manual):** "This works alongside DPW dispatch—it's a public communication layer supervisors can update and residents can read."

### Impact Claim Templates
* **Transportation:** "Replaces a GIS/7-step journey with a single address search; task completes in under 30 seconds."
* **Fleet Operations:** "Creates a shared public status view that does not exist today; supervisors post a 2-minute update post-event."

### Sustainability Answer Templates
* **Data-Reading Tool:** "This reads public GeoHub/ArcGIS layers; as DPW updates them, the site updates automatically—there is no content maintenance burden."
* **Manual Status Tool:** "A 2-minute supervisor update mirrors current internal practice, now with a public output."
* **Ownership:** "We propose a 60-day City pilot, followed by [nonprofit/university hosting], with an open-source repo for brigade support."

## Common Judge Questions and Ready Answers

Anticipate skepticism by pre-answering common questions with modest, verifiable responses.

* **Judge:** *"Will this actually reduce 311 calls?"*
 * **Answer:** "We can't quantify post-deployment impact from a 48-hour prototype. However, we can measure findability and time-on-task today, and we propose a 90-day pilot to observe actual 311 call volume shifts."
* **Judge:** *"Doesn't the City already have a map for this?"*
 * **Answer:** "Yes, and our tool doesn't replace it. We act as a translation layer that takes the City's authoritative ArcGIS data and presents it in plain language for residents who aren't GIS experts."
* **Judge:** *"Who is going to keep this running when you all go back to your day jobs?"*
 * **Answer:** "Because this tool reads directly from the City's existing open data portal, there is zero content maintenance required. For hosting, we are looking to hand this off to [Local University/Nonprofit] for long-term stewardship."

## Demo Metrics and Proof Points Slide

When transitioning from the pitch to the live demo, display a slide that visually anchors your claims. 
* **The Stopwatch:** Show a live timer proving the address search takes <30 seconds.
* **The Journey:** A simple "Before (7 steps) vs. After (1 step)" flow diagram.
* **The Source:** Explicitly name the data layer and URL you are pulling from (e.g., "Live read from Richmond GeoHub Capital Projects API").
* **The Performance:** Note the P95 response time (e.g., "Map loads in <2s").

---

## Appendix: Output Requirements

### Facts
* The District of Columbia's "Apps for Democracy" produced 47 applications, but the city did not adopt any of them after the event concluded [1].
* Task completion time (Time-on-task) is a UX metric measuring how long it takes a user to complete a task [7].
* The USDS Playbook recommends tracking the percentage of transactions started vs. completed, and response times at 1s, 2s, 4s, and 8s intervals [6].
* GOV.UK user stories follow the format: "As a... I need to... So that..." [5].
* Los Angeles GeoHub weaves together over 500 datasets into a centralized system [9].
* ClearStreets was a volunteer-run project that tracked Chicago snow plows for 8 winters (2012-2019) before shutting down due to maintenance burdens and improvements to the City's own tracker [15].
* Seattle requires utility agencies to provide data regarding planned capital improvement projects for the following 5 years, and work planned at least 6 months in advance must be entered into their Coordinate system [13].

### Inferences
* *Inference:* Hackathon judges are highly sensitive to tools that imply government incompetence; using terms like "disrupt" or "replace" will actively harm a team's score.
* *Inference:* Volunteer-maintained civic tech tools have a high mortality rate (e.g., ClearStreets); therefore, tools that auto-update from official APIs are viewed as vastly more viable.
* *Inference:* Claiming systemic impacts (like 311 call reduction) during a weekend hackathon damages credibility because judges know these metrics require longitudinal data to verify.

### Unknowns (What cannot be verified publicly)
* The exact post-deployment impact on 311 call volumes or DPW operational efficiency for the specific Richmond prototypes being built.
* Whether the specific Richmond DPW dispatch systems currently have the API capabilities to support automated fleet tracking without manual supervisor updates.
* Which specific local nonprofit or university in Richmond has the capacity and willingness to adopt the prototype post-hackathon.

## References

1. *Civic Hackathons as Deliberative Democracy - CDN*. https://bpb-us-w2.wpmucdn.com/sites.udel.edu/dist/4/10696/files/2019/04/Turkel_Hackathon-2j9uu8g.pdf
2. *What Does It Mean To Build With, Not For? — Code for America*. https://codeforamerica.org/news/what-does-it-mean-to-build-with-not-for/
3. *Designing For, With, or By? Building Equity Across the Social Sector — Code for America*. https://codeforamerica.org/news/designing-for-with-or-by-building-equity-across-the-social-sector/
4. *An introduction to plain language - Digital.gov*. https://digital.gov/resources/an-introduction-to-plain-language
5. *Writing user stories - Service Manual - GOV.UK*. https://www.gov.uk/service-manual/agile-delivery/writing-user-stories
6. *The Digital Services Playbook — from the U.S. DOGE Service*. https://playbook.usds.gov/
7. *Time-on-task as a UX metric — the key to a better user experience | Medium*. https://medium.com/@ux.rurik/time-on-task-as-a-ux-metric-the-key-to-a-better-user-experience-and-more-efficient-digital-fecce9968dd4
8. *Los Angeles Launched GeoHub | ArcNews | Spring 2016*. https://www.esri.com/about/newsroom/arcnews/los-angeles-launched-geohub
9. *Los Angeles, California - Case Study*. https://www.esri.cl/es-cl/comunidades-inteligentes/los-angeles-case-study
10. *GIS-Based Large Language Model Answers City Planning Questions | Spring 2025 | ArcNews*. https://www.esri.com/about/newsroom/arcnews/gis-based-large-language-model-answers-city-planning-questions
11. *6 Things You Must Know About Buying Digital Services*. https://www.managementconcepts.com/resource/6-things-you-must-know-about-buying-digital-services-and-will-learn-at-ditap/
12. *Average Task Times in Usability Tests: What to Report? – MeasuringU*. https://measuringu.com/average-times/
13. *Construction Hub Coordination - Transportation | seattle.gov*. https://www.seattle.gov/transportation/projects-and-programs/programs/pedestrian-program/construction-coordination-and-mobility-management/construction-hub-coordination
14. *Project and Construction Coordination Map	 - Transportation | seattle.gov*. https://www.seattle.gov/transportation/projects-and-programs/programs/pedestrian-program/construction-coordination-and-mobility-management/project-and-construction-coordination-map
15. *ClearStreets - Chicago Plow Tracker*. https://clearstreets.org/
16. *ClearStreets | DataMade*. https://datamade.us/our-work/clearstreets/