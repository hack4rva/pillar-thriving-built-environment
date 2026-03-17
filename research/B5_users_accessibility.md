# Keeping Richmond Moving: Designing Infrastructure Visibility That Works for Residents Who Can't Detour

## Executive Summary

For Richmond residents with disabilities, elderly populations, and transit-dependent households, infrastructure disruptions are not mere inconveniences—they are absolute barriers to daily life. Our research into Richmond's public works policies, transit accessibility, and equity programs reveals a critical gap between legal mandates and practical visibility. While the city requires ADA-compliant detours for construction, this information rarely reaches the vulnerable residents who need it most before they are already stranded. 

**Key Strategic Insights for Hackathon Teams:**
* **Legal Mandate ≠ Practical Visibility:** 100% of Work-in-Street Permits must include an ADA-compliant pedestrian plan under DPW Administrative Directive 10.8 and Ordinance 2019-314 [1] [2]. Hackathon tools should auto-pull permit data daily and flag any location where an approved detour is missing from public maps.
* **Detour Distance Is Destiny:** The Virginia Work Area Protection Manual explicitly recognizes that pedestrians are "reluctant to retrace their steps to a prior intersection... or to add distance or out-of-the-way travel" [3]. Route-planning features must display detour length in feet, not just a line on a map.
* **Snow Clears Buses—but Not Sidewalks:** GRTC CARE paratransit will run in snow, yet door-to-door service is suspended if the customer's walkway is uncleared [4]. Integrating real-time plow status with crowdsourced sidewalk clearing data is essential.
* **Misinformation Triggers Service Suspensions:** CARE riders exceeding a 15% no-show threshold face escalating service suspensions [5]. Pushing trusted alerts when construction or snow reroutes a booked trip can prevent avoidable "no-shows."
* **Digital Divide Is Real:** The Office of Equitable Transit and Mobility (OETM) explicitly urges residents without internet access to call a phone line for program enrollment [6]. Every new visibility tool must offer multi-channel access (IVR, SMS, phone), not just a smartphone app.

## 1. Why Accessibility-Dependent Routes Matter

A stalled sidewalk is a stalled life for tens of thousands of Richmonders. For general residents, a closed sidewalk means crossing the street mid-block. For accessibility-dependent residents, it means a canceled medical appointment, lost wages, or physical danger.

### 1.1 Personas: Wheelchair Users, Visually Impaired, Seniors, and Transit-Dependent

Accessibility-dependent residents face unique, compounding challenges when navigating the public right-of-way. 
* **Inference:** Wheelchair users cannot simply step off a curb to bypass a construction fence; they require continuous, graded paths and accessible curb ramps. 
* **Inference:** Visually impaired residents rely on predictable environmental cues and detectable warnings; unannounced changes to the streetscape remove their ability to navigate safely. 
* **Fact:** Residents aged 80 and older are automatically eligible for GRTC's ADA Paratransit service, highlighting the direct correlation between advanced age and mobility limitations [5].

### 1.2 Quantifying Exposure to Infrastructure Disruptions

The City of Richmond recognizes the diversity of travel demands and the necessity of alternative modes to driving, including transit, walking, and cycling [7]. Through initiatives like the "Path to Equity: Policy Guide for Richmond Connects," the city is actively targeting programs to remove transportation-related barriers for vulnerable populations [6]. However, these populations remain highly exposed to daily disruptions from Work in Street Permits, emergency excavations, and seasonal weather events.

## 2. Construction Impacts & Permit Compliance

Every sidewalk closure in Richmond already has an approved detour—residents just cannot see it in real-time. 

### 2.1 DPW Work-in-Street Permit Pipeline

Any obstruction of a sidewalk requires approval prior to the setup of the work area [1]. Contractors must submit a Maintenance of Traffic (MOT) Plan and a Pedestrian Routing Plan that meets the standards of the Americans with Disabilities Act (ADA), Public Right-of-Way Accessibility Guidelines (PROWAG), and the Virginia Work Area Protection Manual [1]. 

* **Inference:** Because these plans are required for permit issuance, the City of Richmond possesses a rich, untapped dataset of planned accessible detours that hackathon teams can digitize and map.

### 2.2 Detour Design Hierarchy & Typical Failures

The Department of Public Works mandates a strict hierarchy for maintaining safe pedestrian access during construction [2]. 

| Priority Level | Accommodation Type | Design Requirement |
| :--- | :--- | :--- |
| **1 (Highest)** | Protected/safe pathway in or adjacent to active work zone | Must be separated by barrier or covered walkway; designed by a Professional Engineer [2]. |
| **2** | Alternate protected pathway adjacent to the work zone | Must maintain existing accessible routes to the extent possible [2]. |
| **3 (Lowest)** | Well-defined and safe pedestrian detour | Used to avoid the work zone entirely [2]. |

**Key Takeaway:** While the city prefers keeping pedestrians on their original path via protected walkways, complex projects often force Priority 3 detours. If a tool does not communicate these detours in advance, pedestrians with disabilities will arrive at a closure and be forced to retrace their steps—a scenario the Virginia Work Area Protection Manual explicitly warns against [3].

## 3. Seasonal Maintenance Bottlenecks

Timing mismatches between city maintenance and transit operations strand paratransit riders even when buses are running.

### 3.1 Snow Removal and Sidewalk Clearing Conflicts

During inclement weather, GRTC's CARE and CARE On-Demand services continue to operate, though detours may be necessary [4]. However, there is a critical caveat that disproportionately impacts mobility-impaired residents: **door-to-door service will not be performed if the sidewalk and walkway have not been cleared** [4]. 

* **Inference:** A city snowplow clearing a street is insufficient for a wheelchair user if the plow pushes snow onto the curb cut, or if the property owner fails to shovel the connecting sidewalk. Hackathon tools must differentiate between "street cleared for vehicles" and "path cleared for wheelchairs."

## 4. Transit & Paratransit Dependencies

For residents who cannot drive, GRTC's specialized transit services are lifelines. Missed information regarding infrastructure disruptions cascades directly into ride suspensions.

### 4.1 GRTC Specialized Transportation Services

GRTC offers multiple tiers of service for residents whose disabilities prevent them from using fixed-route buses [5].

| Service Tier | Description | Operating Hours (Richmond) |
| :--- | :--- | :--- |
| **CARE Paratransit** | ADA "origin-to-destination" service within 3/4 mile of fixed routes. | 5:00 am to 1:00 am [5]. |
| **CARE Plus** | Non-ADA required service for trips outside the 3/4 mile boundary or during off-hours in Henrico. | 5:00 am to 1:00 am [5]. |
| **CARE On Demand** | Optional same-day, direct, non-stop trips using the UZURV app. | Call center: 5:30 am to 10:00 pm (Mon-Fri) [5]. |

**Key Takeaway:** These services require precise pickup and drop-off locations. If a street is closed for emergency excavation or a sidewalk is blocked by construction, paratransit vehicles cannot safely maneuver, forcing customers to meet vehicles at alternate spots [4].

### 4.2 The Risk of the No-Show Policy

Infrastructure visibility is not just about convenience; it is about maintaining access to essential services. GRTC records a "no-show" if a customer is not available for pickup or cancels less than 2 hours before the scheduled window [5]. 

If a customer exceeds 15% of scheduled trips as no-shows in a calendar month, they face severe penalties [5]:
* 1st Violation: Letter of Warning
* 2nd Violation: 3 Days Suspension of Service
* 3rd Violation: 5 Days Suspension of Service
* 5th Violation: 14 Days Suspension of Service [5].

* **Inference:** If a resident cannot reach their pickup spot due to an unannounced sidewalk closure, they may be penalized with a no-show. Hackathon tools that alert riders to disruptions *before* the 2-hour cancellation window can literally save a resident from losing their transit access for two weeks.

## 5. Digital Access Gaps

Multi-channel delivery is non-negotiable for compliance and equity. The populations most reliant on accessible infrastructure are often the least likely to own the latest smartphones or have high-speed internet.

### 5.1 Designing for Low-Tech and No-Vision Users

The City of Richmond and GRTC actively maintain legacy communication channels because their users require them. 
* To book a CARE ride, users can use an app, but they can also call (804-782-2273), leave a voicemail, send an email, or send a fax (804-474-9993) [5]. 
* The Office of Equitable Transit and Mobility's Free-Rides-to-Work program explicitly states: "Residents who may have trouble accessing the internet can also call 804 646 3513 to speak with the Office... about how to get on the waitlist" [6].

* **Inference:** A hackathon solution that only exists as a web dashboard or iOS app will fail the accessibility-dependent population. Tools must be compatible with screen readers and offer SMS or Interactive Voice Response (IVR) capabilities.

## 6. Existing Programs & Points of Contact

Hackathon teams should leverage, not duplicate, the city's existing enforcement and equity offices. Tools should feature one-tap reporting that routes directly to the correct department.

| Department / Program | Contact Information | Role in Accessibility |
| :--- | :--- | :--- |
| **DPW Right of Way Division** | 804-646-0436 <br> Rightofway@richmondgov.com [1] | Issues Work in Street Permits; enforces pedestrian detour compliance and work zone safety [1] [2]. |
| **GRTC ADA Coordinator** | 804-358-3871 ext. 434 <br> adacoordinator@ridegrtc.com [8] | Manages paratransit eligibility, accessibility complaints, and passenger assistance [5] [8]. |
| **Office of Equitable Transit & Mobility (OETM)** | 804-646-3513 <br> 1500 E Franklin St [6] | Manages Richmond Connects, Free-Rides-to-Work, and addresses transportation network inequities [7] [6]. |
| **DPW General Contact** | 804-646-6430 [9] | Oversees street, sidewalk, and alley maintenance, snow removal, and street cleaning [9]. |

**Key Takeaway:** Integrating these specific email addresses and phone numbers into the tool's "Report an Issue" workflow ensures actionable data reaches the people with the authority to fix it.

## 7. Hackathon Design Requirements

To build an infrastructure visibility tool that genuinely serves accessibility-dependent residents, teams must incorporate the following requirements from the start:

### 7.1 Data Integrations
* **Permit API Parsing:** Ingest DPW Work in Street Permits to automatically map approved ADA detours [1].
* **Transit Overlay:** Overlay GRTC fixed routes and CARE service areas to identify where construction impacts transit access [5].

### 7.2 User-Facing Functions
* **Granular Routing Metrics:** Do not just show a line. Display the detour length in feet and note any grade changes, as mobility-impaired users cannot easily retrace steps [3].
* **Multi-Channel Alerts:** Build SMS and automated voice call (IVR) alert systems for users without smartphones, mirroring the communication methods currently used by OETM and GRTC [5] [6].
* **WCAG 2.2 AA Compliance:** Ensure all web interfaces are fully navigable via keyboard and optimized for screen readers.

### 7.3 Reporting & Escalation Workflows
* **Context-Rich Reporting:** Allow users to report blocked curb cuts or missing temporary ramps with GPS coordinates and photos, auto-routing the data to `Rightofway@richmondgov.com` [1].

## 8. Risk Matrix & Failure Cases

What happens when the tool lies? For a general user, a false positive (saying a street is clear when it isn't) is annoying. For a wheelchair user, it is dangerous.

* **Risk:** The tool shows a permitted ADA detour, but the contractor failed to build it in the field.
* **Impact:** A user travels to the site, gets stuck, and misses a CARE paratransit pickup, risking a service suspension [5].
* **Mitigation:** Implement a crowdsourced "Verification" button where users can confirm if a permitted detour actually exists on the ground.

## 9. Metrics & Success Criteria

To prove the value of the hackathon prototype to city stakeholders, teams should measure success not just by active users, but by negative outcomes prevented:
* **Violations Flagged:** Number of user reports sent to the Right of Way Division regarding non-compliant work zones.
* **Suspensions Prevented:** Number of proactive alerts sent to users >2 hours before a scheduled transit trip, allowing them to adjust plans and avoid GRTC's 15% no-show penalty threshold [5].

## References

1. *Right-of-Way Management | Richmond*. https://www.rva.gov/public-works/right-way-management
2. *Right of Way PARAGRAPH NO.: 10.8 PAGE 1 OF 5 PARA*. https://www.rva.gov/sites/default/files/2020-07/DPW_ROW_10.8WorkZonePolicy.pdf
3. *Virginia Work Area Protection Manual*. https://vastim.vdot.virginia.gov/media/vastim/documents/2011_wapm_rev_2_09_2019.pdf
4. *Snow Routes & Response -GRTC*. https://www.ridegrtc.com/maps-and-schedules/snow-routes/
5. *CARE Paratransit -GRTC*. https://www.ridegrtc.com/grtc-services/care-paratransit/
6. *Free-Rides-to-Work | Richmond*. https://www.rva.gov/public-works/freeridestowork
7. *Transit Equity | Richmond*. https://www.rva.gov/public-works/transit-equity
8. *Accessibility -GRTC*. https://www.ridegrtc.com/rider-guide/accessibility/
9. *About Us | Richmond*. https://www.rva.gov/public-works/about-us