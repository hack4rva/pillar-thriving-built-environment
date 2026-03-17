# Zero-Friction Street Data: Crafting 90-Second Civic Infrastructure Demos That Win Hackathons

## Executive Summary
Winning a civic tech hackathon with a built-environment tool requires a fundamental shift in presentation strategy: judges prioritize the clarity of the user need and the plausibility of adoption over raw engineering complexity [1] [2]. In 2024, Richmond's RVA311 system handled over 83,000 requests, with infrastructure and street concerns dominating the volume [3]. Despite significant improvements—such as Richmond increasing its streets with a "Satisfactory or Good" Paving Condition Index (PCI) from 35% in 2018 to 75% in 2024 [4] —residents still experience friction when trying to access this data. The most successful 90-second demos exploit this gap by using real Richmond data (like DPW paving schedules and Vision Zero crash dashboards) to prove the problem visually before introducing a frictionless, map-based solution. 

## 1. Judge Psychology—What Really Scores Points

### Street-Level Need Beats Abstract Slides
Judges in civic tech competitions are looking for tools that solve real, documented problems [1]. Opening a demo with a screenshot of a confusing, multi-page PDF of the Fiscal Year 2026 Paving Plan [5] immediately establishes the friction residents face. Showing the problem is significantly more convincing than explaining it abstractly. 

### Data Lineage & Licensing Questions You'll Actually Get
Because built-environment tools rely on data the team did not produce, judges will scrutinize the data layer. Teams must be prepared to answer questions about data origins, update frequencies, and API limitations. Stating clearly that a prototype uses static data from the Richmond Open Data Portal [6] or the Vision Zero Dashboard [7] builds credibility.

### Adoption Plausibility Rubric Used at Civic Hacks 2025
Hackathon judges evaluate how easily a tool could be adopted by the target community or agency [2] [8].

| Evaluation Criteria | Low Score Indicator | High Score Indicator | Key Takeaway |
|---------------------|---------------------|----------------------|--------------|
| **Product-Need Fit** | Abstract problem statement | Real 311 volume data cited | Ground the need in actual civic demand (e.g., 83,000 RVA311 calls) [3]. |
| **Data Quality** | Empty maps, "Lorem Ipsum" | Pre-loaded, real Richmond addresses | Never show an empty map; always have a known-good address ready. |
| **Technical Execution** | Over-explaining the stack | Seamless user journey | Focus on the user experience; save API details for the Q&A. |
| **Adoption Potential** | Requires massive city IT overhaul | Incremental friction reduction | Position the tool as a lightweight layer over existing open data. |

*Takeaway: Judges reward teams that demonstrate a clear understanding of the user's pain point and offer a realistic, data-backed solution.*

## 2. Richmond Data Assets You Must Leverage

### DPW Paving Program Layers & PCI Scores
Richmond's Department of Public Works (DPW) provides extensive data on street conditions and paving schedules, which are perfect for grounding a demo in reality.

| Dataset / Resource | Description | Source |
|--------------------|-------------|--------|
| **Interactive PCI Map** | Pavement Condition Index Ratings for every street. | [9] |
| **FY26 Paving Plan** | PDF list of upcoming paving projects (e.g., Church Hill North, Westlake Hills). | [5] |
| **FY25 Paving Plan** | Historical paving data for comparison. | [10] |
| **Paving Progress** | Data showing PCI improvement from 35% (2018) to 75% (2024). | [4] |

*Takeaway: Use the interactive PCI map and paving PDFs to contrast the current user experience with your streamlined tool.*

### Vision Zero High-Injury Network & Crash Dashboard
For safety-focused tools, Richmond's Vision Zero initiative provides compelling, high-stakes data. The Vision Zero Dashboard tracks fatalities and serious injuries [7], and the High Injury Street Network map highlights that 62% of fatal and serious injury crashes occur on just 7% of Richmond's road mileage [11].

### RVA311 Service Request Volumes & Top Categories
RVA311 handles non-emergency requests, including potholes, damaged trees, and streetlights [3]. Citing the massive volume of these requests proves that infrastructure transparency is a high-demand civic issue.

## 3. Proven Demo Archetypes & When to Use Them

| Archetype | Best Problem Fit | Signature Moment | Risk to Mitigate | 90-s Script Time-split |
|-----------|-----------------|------------------|------------------|-----------------------|
| **Confused Resident (A)** | Info-dense PDF pages | Screenshot then instant contrast | Overlong rant | 15s setup, 15s transition, 60s demo |
| **Address Moment (B)** | Geolocated layers | Address autocomplete | Empty return | 10s setup, 10s input, 70s demo |
| **Before & After (C)** | Click-heavy current flow | Timer overlay | Forgetting metric | 20s before, 10s transition, 60s after |
| **Service Event (D)** | Time-pressure ops | Countdown to plow | Mock data honesty | 10s scenario, 20s tension, 60s resolution |

### Matching Archetype to DPW vs Vision Zero vs Snow Ops
- **Archetype A (Confused Resident):** Best for DPW paving schedules. Show the FY26 Paving PDF [5], then show your map-based alternative.
- **Archetype B (Address Moment):** Best for Vision Zero or zoning tools. Type a real address and instantly show the High Injury Network status [11].
- **Archetype D (Service Event):** Best for fleet operations (e.g., snow clearing or street sweeping) where time pressure makes the value tangible.

## 4. Script Builder—From Cold Open to Hero Screen

### 7-Sentence Narrative Template
1. **The Hook:** "Last year, Richmond residents made over 83,000 calls to 311, many just trying to figure out what's happening on their street." [3]
2. **The Pain:** "Today, finding out if your road is on the FY26 paving plan means digging through this 10-page PDF." [5]
3. **The Pivot:** "We built a tool that turns that friction into a single search."
4. **The Action:** "Watch what happens when I type in '900 E Broad St'."
5. **The Magic:** "Instantly, we pull the Pavement Condition Index and upcoming project dates directly from Richmond's Open Data Portal." [6] [9]
6. **The Honesty:** "This prototype uses cached GeoHub data, but is designed to plug into the live API."
7. **The Hero Screen:** "One search, plain language, total clarity. Thank you."

### Visual Rhythm: Static-Live-Static Pattern
Start with a static screenshot of the problem (e.g., a complex DPW page). Move to the live demo for the interaction (typing the address). End on a static, clear "Hero Screen" showing the resolved user need. Judges remember the last thing they see.

### Voiceover Checklist to Stay Under 150 w Spoken
- Keep the problem setup under 15 seconds.
- Do not explain the tech stack (e.g., "We used React and Node...").
- Speak in the voice of the user, not the developer.

## 5. Data Quality & Performance Safeguards

### Caching Strategy for ArcGIS Layers
Live APIs can fail during hackathons. Always pre-load at least one GeoJSON layer and disable auto-zoom until the draw completes to avoid showing an empty map.

### Two-Tier Offline Fallback Assets

| Fallback Level | Asset Type | When to Use |
|----------------|------------|-------------|
| **Tier 1** | Cached JSON/CSV | API rate limits exceeded or slow Wi-Fi. |
| **Tier 2** | Pre-recorded Video / PNGs | Complete environment failure or browser crash. |

*Takeaway: Never rely solely on live data. A broken UI destroys credibility instantly.*

### "Honesty Slide" Boilerplate to Disclose Mock Elements
If you are simulating live GPS or real-time updates, state it clearly: *"To demonstrate the user experience today, we are using a static snapshot of the Vision Zero High Injury Network [11]. In a production environment, this would poll the ArcGIS REST endpoint daily."*

## 6. Risk Ledger—Top 10 Ways Teams Lose Points

| Mistake | Impact on Judges | Mitigation Strategy |
|---------|------------------|---------------------|
| **Empty Map on Load** | Kills credibility instantly | Hardcode a default Richmond address and cache the initial bounding box data. |
| **"Lorem Ipsum" Text** | Signals an unfinished product | Use real project names from the FY26 Paving Plan [5]. |
| **Over-explaining Tech** | Wastes precious demo time | Limit stack explanation to one sentence; focus on user value. |
| **Long Problem Setup** | Bores the audience | Cap the problem description at 15 seconds. Show, don't tell. |
| **Claiming Fake Live Data** | Destroys trust | Be transparent about what is cached vs. live [2]. |

## 7. Adoption Roadmap Pitch

### Partnering with DPW & Civic Innovators
To score high on adoption plausibility, outline a realistic next step. Suggest a 30-day pilot partnering with local civic groups (like Code for America brigades [1]) to beta-test the interface with actual neighborhood associations.

### Budget & Maintenance Talking Points
Acknowledge that built-environment tools require maintenance. Frame your solution as a low-cost, open-source layer that sits on top of existing infrastructure (like the Socrata Open Data Portal [6]), requiring minimal IT overhead from the city.

## 8. Appendix

### Facts
* RVA311 provided assistance for over 83,000 requests in 2024 [3].
* Richmond's streets with a Paving Condition Index (PCI) of Satisfactory or Good rose from 35% in 2018 to 75% in 2024 [4].
* The FY26 Paving Plan is distributed as a PDF document [5].
* 62% of all fatal and serious injury crashes in Richmond occur on just 7% of the road mileage (High Injury Street Network) [11].
* The City of Richmond provides an Open Data Portal with no fee or registration requirement [6] [12].

### Inferences
* Because residents still submit high volumes of 311 requests for infrastructure issues despite objective improvements in street quality, there is a significant communication and transparency gap.
* Judges penalize teams that spend too much time explaining their technical architecture because it detracts from demonstrating the tool's actual utility to the community.
* Using real, localized data (like specific Richmond addresses and actual DPW project names) creates a psychological anchor that makes a prototype feel like a finished, deployable product.

### Unknowns
* The exact latency and rate limits of the live Richmond GeoHub APIs during a high-traffic hackathon event.
* The specific internal IT budget Richmond DPW has available to adopt or maintain third-party open-source tools.

### Recommended Demo Archetypes by Problem Statement
* **Problem:** Residents cannot understand complex DPW paving schedules.
 * **Archetype:** Archetype A (The Confused Resident) or Archetype C (Before and After).
 * **Visual Moment:** The side-by-side contrast of a dense PDF [5] versus a clean, color-coded map.
* **Problem:** Residents want to know if their specific street is dangerous or slated for safety upgrades.
 * **Archetype:** Archetype B (The Address Moment).
 * **Visual Moment:** Typing a real address and instantly seeing it highlighted on the Vision Zero High Injury Network [11].

## References

1. *CIVIC TECH INITIATIVES:*. http://ncoc.org/wp-content/uploads/2016/09/KidsCountToolkit_FINAL.pdf
2. *Civic Tech Hackathon 2025: Where technology can create an equitable future through the hands of students. - Devpost*. https://civic-hacks.devpost.com/
3. *About RVA 311 | Richmond*. https://www.rva.gov/citizen-service-and-response/about-rva-311
4. *Richmond's big map of paving progress*. https://rva.gov/city-stuff-press-releases-and-announcements/news/richmonds-big-map-paving-progress-0
5. *Fiscal Year 2026 Paving Plan*. https://rva.gov/sites/default/files/2025-05/FY26%20Paving%20List.pdf
6. *Open Data Portal | City of Richmond, Virginia | Open Data Portal | City of Richmond, Virginia*. https://data.richmondgov.com/
7. *Vision Zero | Richmond*. https://www.rva.gov/public-works/vision-zero
8. *Understanding hackathon submission and judging criteria*. https://info.devpost.com/blog/understanding-hackathon-submission-and-judging-criteria
9. *Paving | Richmond*. https://www.rva.gov/public-works/paving
10. *Fiscal Year 2025 Paving Plan*. https://rva.gov/sites/default/files/2024-07/FY25%20Paving%20for%20Web.pdf
11. *Vision Zero Action Plan*. https://www.rva.gov/sites/default/files/2021-05/VisionZero-RichmondActionPlan.pdf
12. *Open Data Portal | Richmond*. https://www.rva.gov/information-technology/open-data-portal