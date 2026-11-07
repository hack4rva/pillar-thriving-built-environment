> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# Winning Civic Hackathon Demos: Data-Driven 90-Second Street-Info Solutions for Richmond

## Executive Summary

Winning a civic tech hackathon with a built-environment tool requires a fundamental shift in presentation strategy: judges prioritize the clarity of the user need and the plausibility of adoption over raw engineering complexity. In 2024, Richmond's RVA311 system handled over 83,000 requests [1], which spiked massively to 208,216 requests in 2025 [2]. Despite significant infrastructure improvements—such as Richmond increasing its streets with a "Satisfactory or Good" Paving Condition Index (PCI) from 35% in 2018 to 75% in 2024 [3] —residents still experience immense friction when trying to access this data. 

The most successful 90-second demos exploit this gap by using real Richmond data to prove the problem visually before introducing a frictionless, map-based solution. Teams must start every demo with a visual of the real-world obstacle, load authentic Richmond addresses instead of placeholder text, and position their prototype as a thin-layer UI that plugs into existing Open Data APIs.

## 2. Understanding Judge Psychology

### 2.1 Street-Level Need Beats Abstract Slides

Judges in civic tech competitions are looking for tools that solve real, documented problems. Opening a demo with a screenshot of a confusing, multi-page PDF of the Fiscal Year 2026 Paving Plan [4] immediately establishes the friction residents face. Showing the problem is significantly more convincing than explaining it abstractly. It provides the fastest credibility win and grounds the presentation in reality.

### 2.2 Data Lineage & Licensing

Because built-environment tools rely on data the team did not produce, judges will scrutinize the data layer. Teams must be prepared to answer questions about data origins, update frequencies, and API limitations. Stating clearly that a prototype uses static data from the Richmond Open Data Portal [5] or the Vision Zero Dashboard [6] builds immediate credibility and demonstrates an understanding of civic data infrastructure.

### 2.3 Adoption Plausibility Rubric (2025)

Hackathon judges evaluate how easily a tool could be adopted by the target community or agency. Tools that reduce friction incrementally score much higher than those requiring massive IT overhauls.

| Evaluation Criteria | Low Score Indicator | High Score Indicator | Key Takeaway |
|---------------------|---------------------|----------------------|--------------|
| **Product-Need Fit** | Abstract problem statement | Real 311 volume data cited | Ground the need in actual civic demand (e.g., 208,216 RVA311 calls in 2025) [2]. |
| **Data Quality** | Empty maps, placeholder text | Pre-loaded, real Richmond addresses | Never show an empty map; always use real project names like "Church Hill North" or "Westmoreland Place" [7]. |
| **Technical Execution** | Over-explaining the stack | Seamless user journey | Focus on the user experience; save API details for the Q&A. |
| **Adoption Potential** | Requires massive city IT overhaul | Incremental friction reduction | Position the tool as a lightweight layer over existing open data [5]. |

*Takeaway: Judges reward teams that demonstrate a clear understanding of the user's pain point and offer a realistic, data-backed solution that integrates with existing systems.*

## 3. Richmond Data Assets to Leverage

### 3.1 DPW Paving Program & PCI Scores

Richmond's Department of Public Works (DPW) provides extensive data on street conditions and paving schedules, which are perfect for grounding a demo in reality. The city offers an Interactive PCI Map that tracks pavement conditions [8]. Furthermore, historical data from the FY25 Paving Plan [7] and the upcoming FY26 Paving Plan [4] provide concrete project names and locations. Highlighting that PCI improved from 35% to 75% [3] frames the demo as bridging an awareness gap rather than fixing already-improved pavement.

### 3.2 Vision Zero Crash & High-Injury Network

For safety-focused tools, Richmond's Vision Zero initiative provides compelling, high-stakes data. The Vision Zero Dashboard tracks fatalities and serious injuries [6]. Most critically, the High Injury Street Network map highlights that 62% of fatal and serious injury crashes occur on just 7% of Richmond's road mileage [9]. Using this concentration of incidents as an anchor instantly validates the tool's public-safety relevance.

### 3.3 RVA311 Service Request Volumes

RVA311 handles non-emergency requests, including potholes, damaged trees, and streetlights. The massive volume of these requests—growing from over 83,000 in 2024 [1] to 208,216 in 2025 [2] —proves that infrastructure transparency is a high-demand civic issue. Citing these numbers establishes an undeniable user need.

## 4. Proven Demo Archetypes & Matching Problems

### 4.1 Archetype Matrix

Choosing the right narrative structure is critical for a 90-second pitch. The archetype must mirror the data source and the specific user story being told.

| Archetype | Best Problem Fit | Signature Moment | Risk to Mitigate | 90-s Script Time-split |
|-----------|-----------------|------------------|------------------|-----------------------|
| **Confused Resident (A)** | DPW paving schedules (Info-dense PDFs) | Screenshot of FY26 PDF [4] then instant contrast | Overlong rant | 15s setup, 15s transition, 60s demo |
| **Address Moment (B)** | Vision Zero / Safety tools | Address autocomplete showing High Injury Network [9] | Empty return | 10s setup, 10s input, 70s demo |
| **Before & After (C)** | Click-heavy current flow | Timer overlay | Forgetting metric | 20s before, 10s transition, 60s after |
| **Service Event (D)** | Time-pressure ops (Snow/Sweeping) | Countdown to plow | Mock data honesty | 10s scenario, 20s tension, 60s resolution |

*Takeaway: Match the archetype to the specific dataset. Use Archetype A for paving plans and Archetype B for Vision Zero safety metrics.*

## 5. Script Builder – 90-Second Narrative

### 5.1 Sentence-by-Sentence Time Split

A structured narrative guarantees timing, clarity, and emotional flow. 

1. **The Hook (15s):** "Last year, Richmond residents made over 208,000 calls to 311, many just trying to figure out what's happening on their street." [2]
2. **The Pain (15s):** "Today, finding out if your road is on the FY26 paving plan means digging through this dense PDF." [4]
3. **The Pivot:** "We built a tool that turns that friction into a single search."
4. **The Action:** "Watch what happens when I type in '900 E Broad St'."
5. **The Magic (60s):** "Instantly, we pull the Pavement Condition Index and upcoming project dates directly from Richmond's Open Data Portal." [5]
6. **The Honesty:** "This prototype uses cached GeoHub data, but is designed to plug into the live API."
7. **The Hero Screen (20s):** "One search, plain language, total clarity. Thank you."

## 6. Data Quality & Performance Safeguards

### 6.1 Caching Strategy for ArcGIS

Live APIs can fail during hackathons due to network congestion. Teams that display an empty map lose credibility instantly. Always pre-load at least one GeoJSON layer of Richmond streets and hard-code a default address (e.g., 900 E Broad St) to guarantee a populated map on load. Disable auto-zoom until the draw completes.

### 6.2 Two-Tier Offline Fallback Assets

Never rely solely on live data. Implement a tiered fallback strategy to ensure the demo survives any network condition.

| Fallback Level | Asset Type | When to Use |
|----------------|------------|-------------|
| **Tier 1** | Cached JSON/CSV | API rate limits exceeded or slow Wi-Fi. |
| **Tier 2** | Pre-recorded Video / PNGs | Complete environment failure or browser crash. |

*Takeaway: A broken UI destroys credibility. Always have a visual ready.*

## 7. Risk Ledger – Top 10 Point-Loss Mistakes

| Mistake | Impact on Judges | Mitigation Strategy |
|---------|------------------|---------------------|
| **Empty Map on Load** | Kills credibility instantly | Hardcode a default Richmond address and cache the initial bounding box data. |
| **Placeholder Text** | Signals an unfinished product | Use real project names from the FY26 Paving Plan (e.g., "South Gardens") [4]. |
| **Over-explaining Tech** | Wastes precious demo time | Limit stack explanation to one sentence; focus on user value. |
| **Long Problem Setup** | Bores the audience | Cap the problem description at 15 seconds. Show, don't tell. |
| **Claiming Fake Live Data** | Destroys trust | Be transparent about what is cached vs. live using an "Honesty Slide". |

## 8. Adoption Roadmap Pitch

### 8.1 Partnering & Pilot Design

To score high on adoption plausibility, outline a realistic next step. Suggest a 30-day pilot partnering with local civic groups to beta-test the interface with actual neighborhood associations. Acknowledge that built-environment tools require maintenance, and frame the solution as a low-cost, open-source layer that sits on top of existing infrastructure like the Open Data Portal [5], requiring minimal IT overhead from the city.

## 9. Appendix

### Facts
* RVA311 provided assistance for over 83,000 requests in 2024 [1] and 208,216 requests in 2025 [2].
* Richmond's streets with a Paving Condition Index (PCI) of Satisfactory or Good rose from 35% in 2018 to 75% in 2024 [3].
* The FY26 Paving Plan is distributed as a PDF document [4].
* 62% of all fatal and serious injury crashes in Richmond occur on just 7% of the road mileage (High Injury Street Network) [9].
* The City of Richmond provides an Open Data Portal with no fee or registration requirement [5].

### Inferences
* Because residents still submit high volumes of 311 requests for infrastructure issues despite objective improvements in street quality, there is a significant communication and transparency gap.
* Using real, localized data creates a psychological anchor that makes a prototype feel like a finished, deployable product.

### Unknowns
* The exact latency and rate limits of the live Richmond GeoHub APIs during a high-traffic hackathon event.
* The specific internal IT budget Richmond DPW has available to adopt or maintain third-party open-source tools.

## References

1. *About RVA 311 | Richmond*. https://www.rva.gov/citizen-service-and-response/about-rva-311
2. *Most common RVA 311 requests: What Richmonders ...*. https://www.wric.com/news/local-news/richmond/311-requests-richmond-2025/
3. *Richmond’s big map of paving progress | Richmond*. https://rva.gov/city-stuff-press-releases-and-announcements/news/richmonds-big-map-paving-progress-0
4. *[PDF] Fiscal Year 2026 Paving Plan - RVA.gov*. https://rva.gov/sites/default/files/2025-05/FY26%20Paving%20List.pdf
5. *Open Data Portal | Richmond*. https://www.rva.gov/information-technology/open-data-portal
6. *Vision Zero | Richmond*. https://www.rva.gov/public-works/vision-zero
7. *Fetched web page*. https://rva.gov/sites/default/files/2024-07/FY25%20Paving%20for%20Web.pdf
8. *Paving | Richmond - RVA.gov*. https://www.rva.gov/public-works/paving
9. *Vision Zero Action Plan*. https://www.rva.gov/sites/default/files/2021-05/VisionZero-RichmondActionPlan.pdf