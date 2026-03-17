# Richmond Public Works Alerts: Channels, Gaps, and Build-On Assets

## Executive Summary

The City of Richmond currently operates a fragmented notification landscape that excels at emergency and utility alerting but relies heavily on analog methods and pull-based web updates for routine Public Works (DPW) operations. Richmond uses at least two separate opt-in mass-notification platforms: Richmond Ready Alerts (Everbridge) for citywide emergencies [1] and DPU Utility Alerts (AlertSense) for water, gas, and streetlight impacts [2]. This siloed approach splits resident attention and leaves a significant gap for routine DPW activities like paving, street sweeping, and snow removal.

Street sweeping relies almost entirely on physical 48-hour "No Parking" signage, with vehicles blocking sweepers subject to towing [3]. Winter storm communications are highly detailed, offering granular operational telemetry (e.g., miles of streets treated), but this data is centralized on the city website, requiring residents to actively pull the information [4]. Pre-construction notices are similarly localized, utilizing hand-delivered door hangers for sewer work [5] and PDF traffic reports for road closures [6]. 

For a hackathon prototype, the primary opportunity lies in digitizing the "last mile" of DPW communications. By building a unified, address-based subscription layer that syndicates to existing enterprise systems (Everbridge, AlertSense) and social channels (Nextdoor, X), developers can transform Richmond's rich operational data into proactive, geotargeted push notifications.

## Current Notification Systems

Richmond utilizes a mix of enterprise alert stacks for emergencies and utilities, while DPW relies predominantly on website updates, press releases, and social media for routine operations.

### Everbridge "Richmond Ready Alerts" for Citywide Emergencies
Richmond Ready Alerts is a critical messaging system powered by Everbridge, designed to keep residents informed about hazards, severe weather, and unexpected street closures [1]. Residents opt in by texting RVAREADY to 888-777 or registering online [7]. The system delivers alerts via mobile phone, landline, and email, utilizing the short code 89361 for text communications [1]. For imminent threats, the City first issues life-saving alerts through the federal Wireless Emergency Alert (WEA) system to reach all mobile devices in an impacted area, followed by updates through Richmond Ready Alerts [1].

### AlertSense "City of Richmond Utility Alerts" for DPU Work
The Department of Public Utilities (DPU) operates a separate AlertSense system for emergency and non-emergency utility incidents [2]. Residents provide their address to enable geographical tailoring and can specifically opt into "DPU Utility Work Notifications" to receive updates on street closures, water/gas service interruptions, and streetlight outages via text, email, or voice mail [2].

### City Web, Press, and Social Amplification
For broader amplification, the City and its departments maintain active social media presences. On Nextdoor, the City of Richmond agency page has published 1,493 posts, while the DPU agency page has published 1,364 posts [8]. DPW also maintains an X (formerly Twitter) account (@DPW_RichmondVA) [9]. During severe weather, the City centralizes updates on dedicated web hubs (e.g., go.rva.gov/winter-weather) and pushes residents to follow official social channels [4].

### Comparison: Channels, Reach, and Capabilities

The current landscape reveals that while emergency and utility systems support geotargeted push notifications, DPW operations are predominantly pull-based.

| Channel | Owner | Push Types | Geo-Targeting | Opt-In Path | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Everbridge (Richmond Ready)** | DECPR / City | SMS, email, voice, app | Yes | Text RVAREADY; web form | Covers emergencies, severe weather, and unexpected closures [1]. |
| **AlertSense (Utility Alerts)** | DPU | SMS, email, voice | Yes (by address) | Web signup | "DPU Utility Work Notifications" covers non-emergency impacts [2]. |
| **City Web Hubs** | City / DPW | Web pages | N/A | None | Provides detailed operational telemetry; updated frequently during storms [4]. |
| **Nextdoor Agencies** | City / DPU | App / web posts | Neighborhood-based | Follow agency | High post counts indicate strong amplification potential [8]. |
| **X / Twitter** | DPW | Social posts | N/A | Follow account | Historically referenced in traffic PDFs for alerts [6]. |

*Takeaway: A prototype should bridge the gap between the highly targeted push capabilities of Everbridge/AlertSense and the rich, but pull-dependent, operational data currently trapped on web hubs and PDFs.*

## Pre-Construction and Project Notifications

Notifications for upcoming construction and roadwork are highly localized and analog-first, lacking a systematic, address-based digital push mechanism.

### Door Hangers and Mailers for Utility Work
For localized utility projects, such as sanitary sewer replacements, DPU explicitly relies on hand-delivered "door hanger" style tags to notify residents of upcoming work and proposed detours on an as-needed basis [5]. 

### Capital Projects and Closures
DPW capital projects and road improvements rely heavily on public meeting notices, posted plans, and email contacts [10]. Routine paving and milling updates are often published in weekly "Traffic Alert - Street Closure Report" PDFs, which historically advised drivers to sign up for alerts by emailing AskPublicWorks or following DPW on Twitter [6]. 

### Opportunity: Standardize Address-Based Project Alerts
*(Inference)* There is a clear opportunity to convert project and closure artifacts—such as DPW project pages and DPU door-hanger schedules—into geofenced digital notifications and ICS calendar entries triggered by a resident's address.

## Street Sweeping and Clean Streets

Street sweeping communications represent one of the most significant digital gaps in Richmond's public works notifications, relying entirely on physical signage.

### Current DPW Commitments and Signage
The Department of Public Works sweeps approximately 22,000 lane-miles of streets annually, focusing only on streets with curbs and gutters [3]. The primary notification method is physical: "No Parking" signs are posted at least 48 hours in advance of cleaning, and vehicles blocking the path of the sweepers are towed [3]. DPW temporarily paused street sweeping operations for the remainder of 2025 and is preparing to resume essential maintenance services in 2026 [3] [11].

### Gap: No Official Digital Reminders
*(Inference)* Because there are no official digital reminders by block, residents must physically notice the signs. Missed notices inevitably lead to vehicle towing and poor sweeping compliance.

### Prototype: Block-Level Sweep Reminders
*(Inference)* The 2026 resumption of services provides an ideal window to launch a block-level sweep calendar and SMS/email reminder service keyed to resident addresses, sending 48-hour nudges to reduce towing incidents.

## Storm and Winter Weather Communications

Winter storm communications are centralized on the city website and feature highly detailed operational telemetry, but they require residents to actively seek out the information.

### Operational Telemetry and Progress Tracking
During winter events, the City posts "Winter Weather Updates" that provide granular, shift-level details on snow removal progress. For example, updates highlight specific milestones: 700 miles of Priority 1 streets treated (100%), 200 miles of Priority 2 streets treated (100%), and ~930 miles of Priority 3 streets treated (58%) [4]. 

### Expectations Management via Priority Schema
The City actively manages expectations by publishing its snow removal priority order. Priority 3 routes encompass local neighborhood streets (1,600 lane miles, or 64% of the city), and plows typically reach these neighborhoods within 48 to 72 hours after snowfall ends [12]. The City explicitly states that because crews follow this set priority list, they do not take individual snow removal requests through RVA311 [12].

### Prototype: Auto-Progress Pings by Neighborhood
*(Inference)* A prototype could transform this rich web telemetry into automated neighborhood progress alerts (e.g., "Priority 3 treatment has reached your sector"), preempting duplicate 311 calls and pushing critical updates directly to residents.

## Existing Assets a Prototype Can Connect To

A hackathon prototype does not need to start from scratch; Richmond has ample infrastructure and open data to integrate with, requiring primarily normalization, geofencing, and syndication.

* **Everbridge (Richmond Ready Alerts)**: Supports SMS, email, and voice topics via API or webhook integrations [1].
* **AlertSense (DPU Utility Alerts)**: Features address-based groups, including the existing "DPU Utility Work Notifications" tier [2].
* **City Web Hubs**: Centralized pages like go.rva.gov/winter-weather that can be scraped for operational status [4].
* **DPW Project Pages and PDFs**: Weekly Traffic Closure Reports and capital project pages provide structured, albeit PDF-bound, closure data [10] [6].
* **ArcGIS Maps and Paving Lists**: DPW publishes an interactive Pavement Condition Index (PCI) map and annual paving lists (e.g., FY26 Paving List PDF) [13].
* **Open Data Portal**: The City's portal provides data in open formats with no registration requirements, serving as a canonical landing zone for alert datasets [14] [15].
* **Nextdoor Agency Pages**: High-reach amplification channels for the City and DPU [8].

## Gaps and Failure Cases

Several systemic gaps cause residents to fall through the cracks regarding routine DPW operations.

### Fragmentation of Opt-Ins
Residents must navigate multiple systems to stay informed: Everbridge for emergencies [1], AlertSense for utilities [2], and manual web checks for DPW operations [4]. There is no single "subscribe once" layer.

### Analog Dependency
The reliance on hand-delivered DPU door hangers [5] and 48-hour street sweeping signage [3] creates a high risk of missed communications, resulting in inconvenience and vehicle towing.

### Pull-Based Storm Information
While the City provides excellent telemetry on snow removal progress, it is web-first [4]. Unless a resident is actively checking the site or enrolled in Everbridge for broader emergency alerts, they miss real-time neighborhood updates.

### Accessibility and Language
While the City website utilizes a Google Translate widget and offers professional translation via the 311 customer service center [12], proactive multilingual push notifications are not systematically evident in the routine alert workflows.

## Prototype Concepts with Clear Next Actions

To address these gaps, a hackathon team should focus on unifying subscriptions, geofencing data by address, and syndicating content across all channels.

### Prototype 1: Address-Based Unified Subscriptions
* **What**: A single web form where residents enter their address and select topics (Emergencies, Utility Work, Paving/Sweeping, Winter Ops).
* **How**: The backend routes Emergency selections to Everbridge, Utility Work to AlertSense, and Routine DPW topics to a lightweight SMS service.
* **Action**: Define a topic taxonomy and secure approval to programmatically add subscribers to existing enterprise groups.

### Prototype 2: Street Sweeping Block Reminders
* **What**: Automated 48-hour and morning-of SMS/email alerts for a resident's specific block.
* **How**: Map resident addresses to street segments and cross-reference with DPW's sweeping rotation and signage policy.
* **Action**: Pilot in 2–3 neighborhoods during the 2026 service resumption to measure reductions in towing.

### Prototype 3: Construction & Paving Near Me
* **What**: Geofenced notifications for planned milling, paving, and DPU door-hanger events.
* **How**: Build a parser pipeline to scrape DPW PDFs (Traffic Closure Reports) and project pages, normalizing them into geographic features.
* **Action**: Stand up a simple geo-API and validate accuracy against historical DPW communications.

### Prototype 4: Winter Ops Progress Alerts
* **What**: Translating web-based telemetry into neighborhood status pings.
* **How**: Scrape the "Winter Weather Updates" page to map P1-P3 progress thresholds to specific council districts or neighborhoods.
* **Action**: Publish a status widget and SMS integration to push updates like "Expect plows within 48 hours."

### Prototype 5: Canonical Alerts Feed with Syndication
* **What**: A single JSON/RSS "Public Works Alerts" feed that auto-posts to web banners, Nextdoor, and X.
* **How**: Author content once in a headless CMS, triggering webhooks to social platforms and archiving as press items.
* **Action**: Establish content governance rules and create shortlinks for easy sharing.

## Implementation Roadmap

A phased approach will de-risk the prototype and allow for measurable wins before citywide scaling.

* **Phase 1 (0–4 weeks) - Data Plumbing**: Scrape and normalize paving PDFs, winter updates, and DPW project pages. Publish a developer-friendly JSON alerts feed.
* **Phase 2 (4–8 weeks) - Geofencing & Pilots**: Implement address-to-block mapping. Launch the Street Sweeping Reminders pilot in select neighborhoods to coincide with the 2026 service resumption.
* **Phase 3 (8–12 weeks) - Syndication**: Automate cross-posting to Nextdoor and X. Seek approval to mirror routine operations topics into AlertSense.
* **Phase 4 (12+ weeks) - Scale & Measure**: Expand citywide. Instrument KPIs, such as open rates, reduction in sweep-related tows, and drops in snow-related 311 calls.

## Decision Checklist

Before a prototype can be fully operationalized, city sponsors must approve several key parameters:

* **Access**: Approval to scrape, parse, and publish normalized data from PDFs and web pages, including API keys for ArcGIS maps.
* **Routing**: Agreement with DECPR and DPU on routing unified subscribers into Everbridge and AlertSense.
* **Governance**: Clear policies on who approves push alerts for routine operations, especially after hours.
* **Metrics**: Defined success targets (e.g., a 25% reduction in sweep-related tows in pilot zones).

## References

1. *Richmond Ready Alerts | Richmond*. https://rva.gov/richmondreadyalerts
2. *City of Richmond Utility Alerts - Public Signup*. https://public.alertsense.com/SignUp/?RegionId=2066
3. *Street Cleaning | Richmond*. https://www.rva.gov/public-works/street-cleaning
4. *Winter Weather Updates | Richmond*. https://rva.gov/common/winter-weather-updates
5. *3800 Hermitage Road - Sanitary Sewer Replacement Work*. https://rva.gov/sites/default/files/2023-06/Hermitage%20Road%20Sanitary%20Sewer%20Replacement%20Project%20Newsleter%20-%20Volume%201.pdf
6. *Weekly/Ongoing Street Closure Report - Traffic Alert*. https://www.rva.gov/sites/default/files/2021-05/DPW_Press_Weekly%20Traffic%20Closure%20Report%20May%2011%202021.pdf
7. *City of Richmond Announces Launch of New Emergency Alert System | Richmond*. https://www.rva.gov/emergency-management-press-releases-and-announcements/news/city-richmond-announces-launch-new
8. *Richmond, VA Public agencies | Nextdoor*. https://nextdoor.com/agency-city/va/richmond/
9. *Richmond VA DPW (@DPW_RichmondVA) / Posts ...*. https://x.com/DPW_RichmondVA
10. *Construction Projects & Road Improvements | Richmond*. http://www.rva.gov/public-works/construction-projects-road-improvements
11. *City Announces Temporary Pause in Street Sweeping Services for 2025 | Richmond*. https://rva.gov/press-releases-and-announcements/news/city-announces-temporary-pause-street-sweeping-services-2025
12. *Snow Removal | Richmond*. https://www.rva.gov/public-works/snow-removal
13. *Paving | Richmond*. https://www.rva.gov/public-works/paving
14. *Open Data Portal | City of Richmond, Virginia | Open Data Portal | City of Richmond, Virginia*. https://data.richmondgov.com/
15. *Open Data Portal | Richmond*. https://www.rva.gov/information-technology/open-data-portal