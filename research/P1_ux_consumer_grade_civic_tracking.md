> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# From Potholes to Power Outages: Building a Domino's-Style Citizen Service Tracker

## Executive Summary

Translating raw municipal infrastructure data into a consumer-grade tracking experience requires balancing the psychological need for transparency with the operational realities of multi-agency service delivery. While consumer apps like Domino's and Uber have set high expectations for real-time tracking, their models rely on closed ecosystems and sometimes artificial progress indicators that fail in the public sector. 

**Key Strategic Insights:**
* **Optimal stage count balances transparency and cognitive load:** Complex services (outages, potholes) require 5-7 stages, while routine tasks (street cleaning) need only 4. Too few stages feel vague; too many cause abandonment.
* **"Stuck" stages erode trust faster than delays:** A job stuck in "Dispatched" for hours destroys credibility. Implementing automatic "Stalled" flags with timeout rules is critical.
* **Range-based ETAs outperform point estimates under uncertainty:** Using confidence intervals (e.g., "2-4 hours") rather than fixed times prevents trust erosion when unpredictable physical world variables interfere.
* **Occupied-time framing cuts perceived wait times:** Providing live updates or showing work-in-progress reduces subjective wait time, leveraging the psychology of waiting lines and the "IKEA effect."
* **Push notification opt-ins drive engagement:** Users opted into push notifications are four times more engaged and retained at double the rate of opt-out users.

## 1. Service-Status Stage Framework

A reusable, service-specific stage library caps complexity while preserving necessary detail. The goal is to collapse low-value backend steps (e.g., "Crew En Route") into a single user-facing "In-Progress" badge for simpler services, while maintaining granularity where it provides psychological relief to the citizen.

### 1.1. Stage-Template Tables for Flagship Services

| Service | Recommended Stages | # Stages | "Stalled" Timeout | Example Icon Set |
|---------|--------------------|----------|-------------------|------------------|
| **Pothole** | Reported ► Assessed ► **In-Progress** (crew dispatched + repair) ► Completed ► Verified | **5** | 4 hrs (high-urgency) | 📍 → 🛠️ → ✅ |
| **Power Outage** | Outage Detected ► Cause Identified ► **In-Progress** (crew assigned + en route) ► Restored ► Confirmed | **5** | 3 hrs | ⚡ → 🔍 → 🔧 → 💡 |
| **Snow Removal** | Storm Declared ► Routes Prioritized ► **Priority 1 In Progress** ► **Priority 1 Complete** ► **Priority 2 In Progress** ► **All Clear** | **6** | 6 hrs (per priority) | ❄️ → 📍 → 🚜 → ✅ |
| **Street Cleaning** | Scheduled ► **Starting Soon** ► **Zone Active** ► **Zone Complete** | **4** | 2 hrs (post-schedule) | 📅 → 🚧 → 🧹 → ✅ |

*Takeaway: Standardize each service to 4–6 stages. Merge granular operational steps (like "Crew Assigned" and "En Route") into a unified "In-Progress" state to prevent users from obsessing over micro-delays.*

### 1.2. Cross-Service Stage Harmonization Guidelines
To avoid user confusion across different departments, align wording, icons, and colors. A "Closed" ticket in a 311 system often frustrates users if the physical issue isn't resolved. Replace ambiguous bureaucratic terms like "Closed" with specific outcomes like "Completed," "Verified," or "Referred to State Agency."

## 2. ETA Communication Strategy

Estimating arrival times in the physical world is notoriously difficult. Uber's DeepETA model utilizes a hybrid approach: a physical routing engine calculates the base time, and a machine learning model predicts the residual difference based on real-world observed outcomes [1]. City services must adopt a similarly nuanced approach to communication.

### 2.1. Confidence-Based ETA Decision Tree

| Data Confidence | ETA Format | UI Wording | When to Use |
|-----------------|------------|------------|-------------|
| **≥ 85%** (robust sensor, crew GPS) | **Point** (e.g., "by 3 pm") | "Our crew is on-track to finish by 3 pm." | Fixed-schedule services (street cleaning). |
| **55–84%** (partial GPS, historic averages) | **Range** (e.g., "≈ 2-4 hrs") | "We expect completion in 2-4 hrs." | Pothole & outage repairs. |
| **< 55%** (no real-time feed) | **Queue Position** | "Your request is 15th; we'll update when we have a better estimate." | Low-priority snow routes, seasonal spikes. |
| **Stalled flag active** | **Uncertain** | "Our crew is delayed; we'll let you know as soon as we have an ETA." | After timeout rules are triggered. |

*Takeaway: Never provide a point estimate ("3:00 PM") unless data confidence is exceptionally high. Range-based ETAs protect agency credibility during unpredictable field operations.*

### 2.2. The Psychology of Wait Times and Delays
Research by David Maister on the psychology of waiting lines demonstrates that unexplained waits seem longer than explained waits, and unoccupied time feels longer than occupied time [2] [3]. Furthermore, the "IKEA effect" suggests that when people see the labor involved in a process, they value the outcome more highly [4] [5]. 

By showing a progress bar or a moving truck icon, the tracker "occupies" the user's time and visualizes the city's labor, making citizens more patient and appreciative of the service.

## 3. Map-Based Visualization & Accessibility

Maps are powerful but can quickly become overwhelming. When incident density is too high, maps confuse rather than clarify.

### 3.1. Map-Use Criteria and Visual Specs
* **Density Handling:** Cluster icons and use heat-maps when incident density exceeds 15 items in a view. Provide a "list-only" toggle for dense urban environments.
* **Touch Targets:** Mobile-first map UX requires that any clickable element (like an incident pin) has a minimum touch target size of 48x48dp (approximately 9mm physical size) to ensure reliable interaction [6] [7] [8].
* **Color Coding:** Avoid relying solely on red/green color coding, which fails for color-blind users. Use a triadic palette (red-orange-green) combined with pattern overlays (e.g., diagonal hatch for "delayed", solid fill for "on-track").

### 3.2. Screen Reader and Keyboard Accessibility
Digital maps must comply with WCAG 2.1 standards. 
* **Keyboard Navigation:** Ensure the map is fully navigable using the Tab key, with Enter to activate and Spacebar for menus [9] [10].
* **ARIA Labels:** Use ARIA (Accessible Rich Internet Applications) live regions (`aria-live="polite"`) to announce dynamic content changes, such as a status shifting from "Assessed" to "In-Progress" [11] [9].
* **Semantic Structure:** Use semantic HTML (`<main>`, `<nav>`, `<h1>`) to build an Accessibility Tree in the Document Object Model (DOM) so screen readers can interpret the map's framework [9].

## 4. Notification Architecture

Notifications are the engine of a proactive service tracker. Text messages and push notifications are integral tools for keeping citizens informed about their status [12].

### 4.1. Channel Selection and Opt-In Rates
Push notifications from mobile apps boast a 90% open rate, significantly higher than the 20-30% open rate typically seen with SMS [13]. Furthermore, industry benchmarks show that users who opt-in to push notifications are four times more engaged and are retained at double the rate of opt-out users [14].

### 4.2. Trigger Matrix and Frequency Caps

| Trigger Event | Primary Channel | Timing / Frequency Cap |
|---------------|-----------------|------------------------|
| **Status Change** (e.g., Dispatched) | Push Notification | Immediate (Max 3/day per ticket) |
| **Major ETA Shift** (> 1 hour delay) | SMS / Push | Immediate |
| **Service Complete** | Push + Email | Immediate |
| **Nearby Incident** (e.g., Street Sweeping) | In-app banner / Email | 24 hours prior |

*Takeaway: Prompt for push notification opt-in contextually—exactly at the moment the user submits a service request—to maximize opt-in rates.*

## 5. Trust & Credibility Blueprint

Public sector trackers must prioritize honesty over the illusion of speed. 

### 5.1. Data Provenance and Graceful Degradation
Always display the data source and freshness. For example, Con Edison explicitly warns users that reported outages can take up to 30 minutes to appear on the outage map [15]. Similarly, NYC's SweepNYC tool includes a disclaimer that data may contain inaccurate or incomplete information due to changing circumstances [16]. 

* **Synthetic Data Labeling:** Prefix estimated times with "≈" and provide tooltips explaining that the time is an estimate based on historical averages.
* **Error Handling:** If an API fails or a multi-agency handoff drops a status update, use graceful degradation: *"We may be missing recent data from the field. Please check back in 15 minutes."*

## 6. Comparative UX Analysis: Domino's vs. City Services

The "Domino's Pizza Tracker" is the gold standard for consumer tracking, but its model cannot be copy-pasted to municipal government.

### 6.1. What Transfers Directly
* **Real-time progress bars:** Visualizing the journey from start to finish.
* **Push alerts:** Proactive updates at key stage transitions.
* **Occupied time:** Giving the user something to watch to reduce perceived wait times.

### 6.2. What Fails (The Differences)
* **Preset Timers:** The Domino's tracker relies heavily on preset timings (e.g., a pizza sits in the "bake" stage for exactly 6 minutes and 40 seconds) and vague stages like "Quality Check" where no actual steps are taken [17] [18] [19]. City services deal with unpredictable physical environments; fake timers will destroy civic trust.
* **Pipeline Control:** Domino's controls the entire pipeline under one roof. City services aggregate data across multiple agencies (e.g., DPW + utility company + private contractor). This requires a "Joint-Status" layer that shows "Coordinating" during agency hand-offs.

## 7. UX Pattern Catalog

| # | Pattern | Description | Ideal Service | Expected Impact |
|---|---------|-------------|---------------|-----------------|
| 1 | **Live-Progress Bar** | Horizontal bar fills as each stage completes. | All | Increases perceived transparency. |
| 2 | **Crew-Icon Animation** | Small map pin moves along route line. | Outage, Pothole | Reduces perceived wait time. |
| 3 | **Range-Based ETA** | Display "≈ X-Y hrs" with confidence icon. | Pothole, Outage | Protects trust during delays. |
| 4 | **Clustered Heat-Map** | Density shading when > 15 incidents in view. | Snow, Sweeping | Reduces map-related confusion. |
| 5 | **Contextual Opt-In** | Prompt for push alerts immediately after ticket submission. | All | 4x higher engagement. |
| 6 | **Source-Badge Footer** | "Data: City 311, refreshed 5 min ago". | All | Reduces user error-reporting. |
| 7 | **Stalled-State Alert** | Auto-badge "Checking – update soon" after timeout. | All | Improves satisfaction for delayed jobs. |
| 8 | **ARIA Live Region** | Screen reader announces "status changed to In-Progress". | All | WCAG 2.1 AA compliance. |
| 9 | **Queue-Position** | "You're #13 in line". | Snow (high demand) | Increases user patience. |
| 10| **Digest Notification** | End-of-day summary of all tracked jobs. | Multi-service | Prevents notification fatigue. |

*Takeaway: Implement these 10 patterns to bridge the gap between consumer expectations and municipal realities.*

## 8. Anti-Patterns to Avoid

| # | Consumer-Tracker Trick | Why it Fails for Civic Services | Mitigation |
|---|------------------------|---------------------------------|------------|
| 1 | **Fixed stage timers** | Creates illusion of speed, but city crews cannot guarantee granularity. | Use data-driven timestamps; disclose uncertainty. |
| 2 | **Aggressive upsells** | Public sector cannot charge for basic status info. | Keep tracking free; offer optional SMS alerts. |
| 3 | **Single-source pipeline** | Multi-agency reality leads to data gaps. | Build aggregator layer with "Joint-Status" flags. |
| 4 | **Over-personalization** | Privacy concerns for municipal workers ("Your driver is John"). | Use neutral identifiers ("Crew A"). |
| 5 | **Red/Green status only** | Excludes color-blind users. | Adopt triadic palette + pattern overlays. |

## 9. MVP Hackathon Blueprint

To build the simplest credible experience for a hackathon demo, focus on a narrow scope that proves the concept without requiring perfect backend data.

### 9.1. Core Feature Set & Wireframe Descriptions
* **List View (Default):** A clean feed of the user's submitted requests. Each card shows the service type icon, a 4-stage mini progress bar, and a range-based ETA.
* **Detail View:** Expands the selected request. Features a large, vertical timeline (the "Domino's" tracker), a "Source & Freshness" footer, and a prominent "Get Push Updates" toggle.
* **Map View (Toggle):** A simple Mapbox integration showing the user's location and a clustered heat-map of nearby similar incidents. Touch targets are strictly 48x48dp.
* **Notification:** A simulated push alert: *"Update: Your pothole repair on 5th Ave is now In-Progress. ETA: ≈ 2-4 hrs."*

### 9.2. Technical Stack Recommendations
* **Frontend:** React Native (for easy mobile deployment and native push support) + Mapbox GL for accessible mapping.
* **Backend/Data:** Firebase Cloud Messaging (for push notifications) + Open311 API wrappers to simulate pulling raw municipal data.

## 10. Implementation Roadmap

* **Phase 1 (Pilot - 2 Months):** Select one high-volume, low-complexity service (e.g., Potholes) in a single mid-size district. Deploy the linear progress bar and range-based ETAs. Measure baseline NPS and push opt-in rates.
* **Phase 2 (Scale - 4 Months):** Introduce complex, multi-agency services (Power Outages, Snow Removal). Roll out the map view with clustering thresholds and ARIA accessibility features.
* **Phase 3 (Optimization - Ongoing):** Implement machine-learning models (similar to Uber's DeepETA) to refine range-based ETAs based on historical crew performance. Establish formal data-sharing contracts between agencies to eliminate "status-gap" dead zones.

## References

1. *DeepETA: How Uber Predicts Arrival Times Using Deep Learning*. https://www.uber.com/blog/deepeta-how-uber-predicts-arrival-times/
2. *The Psychology of Waiting Lines*. http://www.columbia.edu/~ww2040/4615S13/Psychology_of_Waiting_Lines.pdf
3. *(PDF) The Psychology of waiting lines*. https://www.researchgate.net/publication/200085847_The_Psychology_of_waiting_lines
4. *[PDF] The “IKEA Effect”: When Labor Leads to Love Working Paper*. https://www.hbs.edu/ris/Publication%20Files/11-091.pdf
5. *[PDF] The IKEA effect: When labor leads to love - Harvard DASH*. https://dash.harvard.edu/bitstreams/7312037d-2473-6bd4-e053-0100007fdf3b/download
6. *Touch target size - Android Accessibility Help*. https://support.google.com/accessibility/android/answer/7101858%3Fhl%3Den
7. *Touch Target - Material Design*. https://m2.material.io/develop/web/supporting/touch-target
8. *Touch target size - Android Accessibility Help*. https://support.google.com/accessibility/android/answer/7101858?hl=en
9. *Making Maps Accessible to Screen Readers - MN.gov*. https://mn.gov/mnit/media/blog/?id=38-645700
10. *Keyboard Navigation: Complete Web Accessibility Guide*. https://www.levelaccess.com/blog/keyboard-navigation-complete-web-accessibility-guide/
11. *ARIA Techniques for WCAG 2.0 - W3C*. https://www.w3.org/TR/WCAG20-TECHS/aria
12. *The Five Basics of Texting for a Human-Centered Safety Net*. https://codeforamerica.org/news/five-basics-of-texting-for-a-human-centered-safety-net/
13. *15 Statistics That Prove Local Governments Must ...*. https://www.gogovapps.com/blog/15-statistics-that-prove-local-governments-must-implement-mobile-apps
14. *Push Notification Opt-In Rates*. https://grow.urbanairship.com/rs/313-QPJ-195/images/WP_Push_Notification_Opt_In_Rates.pdf
15. *Check Your Outage Status - Con Edison*. https://www.coned.com/en/services-and-outages/report-track-service-issue/check-outage-status
16. *SweepNYC*. https://sweepnyc.nyc.gov/
17. *What moves the tracker along? : r/Dominos - Reddit*. https://www.reddit.com/r/Dominos/comments/1cz3bic/what_moves_the_tracker_along/
18. *Is the Domino's Pizza tracker accurate and real, or just set to ... - Quora*. https://www.quora.com/Is-the-Dominos-Pizza-tracker-accurate-and-real-or-just-set-to-the-same-timing-each-order
19. *Domino's "Pizza Tracker" doesn't actually track your pizza | Jimmy Kim*. https://www.linkedin.com/posts/yojimmykim_dominos-pizza-tracker-doesnt-actually-activity-7419025834105151488-PIVN