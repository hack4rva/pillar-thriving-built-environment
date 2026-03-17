# From Questions to Clarity: Designing Tools for DPW Communications That Cut Repetitive Inquiries and Speed Storm Updates

## Executive Summary

Public Works communications staff are currently operating as manual information routers, constrained by siloed systems, outdated knowledge bases, and a heavy reliance on phone-based resident inquiries. Analysis of 311 call center data and internal public works audits reveals that solid waste and basic infrastructure issues dominate resident inquiries, yet poor digital self-service experiences force the majority of these interactions onto phone channels [1] [2]. 

To alleviate this bottleneck, DPW communications require a bifurcated tool strategy: a resident-facing self-service portal optimized for high-volume transactional queries (like missed trash pickups), and an internal lookup console that aggregates real-time field data, GIS, and work order statuses. Furthermore, proactive storm communications can be drastically improved by leveraging text-to-subscribe alert systems, which have proven to capture thousands of subscribers in hours during weather events [3] [4].

## Persona and Problem Context: DPW Communicators

The success of DPW communications staff hinges on fast access to accurate, operationally-sourced data across solid waste, streets, and storm response. 

### Persona Sketch: The DPW Communications Specialist
* **Role & Responsibilities:** Acts as the primary liaison between the Department of Public Works and the public. Responsible for answering resident queries, updating the website, managing social media, and issuing emergency alerts.
* **Daily Workflow:** Fields high volumes of repetitive questions (trash schedules, pothole status). Spends significant time chasing operations staff for project updates. Spikes in workload occur during storm events or service disruptions.
* **Pain Points:** Dependency on operations for updates, tool sprawl, and inaccurate internal knowledge bases. In a review of the Village of Roselle, internal communications were rated 6.6 out of 10, with staff noting a lack of information flow between departments and a desire for GIS access in the field [5].

## What Residents Ask Most: Solid Waste Drives Volume

A handful of tasks generate a majority of contacts; optimizing these yields outsized impact. Solid waste and recycling inquiries consistently rank at the top of service requests [1].

### Top Categories by Volume
In San Antonio, solid waste and basic infrastructure issues dominated the top citizen service requests in FY2016 [2].

| Rank | Service Request Category | Number of Requests | Department |
| :--- | :--- | :--- | :--- |
| 1 | Overgrown Yard/Trash | 39,571 | DSD |
| 2 | No Trash Pickup | 37,179 | Solid Waste |
| 3 | Dead Animal - Dog/Cat | 21,244 | Solid Waste |
| 4 | Damaged Cart | 19,422 | Solid Waste |
| 5 | Aggressive Animal (Non-Critical) | 16,469 | Animal Care Services |
| 6 | Stray Animal | 13,835 | Animal Care Services |
| 7 | Alley-Way Maintenance | 12,784 | DSD |
| 8 | Pothole Repair | 12,196 | TCI (Public Works) |
| 9 | Front Or Side Yard Parking | 12,029 | DSD |
| 10 | Bandit Signs | 11,810 | DSD |

*Takeaway:* "No Trash Pickup," "Dead Animal," and "Damaged Cart" requests far outnumber pothole repairs. Self-service tools must prioritize these specific solid waste workflows.

## Channel Mix and Workload: Phone Dominates

Poor findability and digital coverage shift demand to the phone, consuming communications capacity.

### Intake Channel Share and UX Gaps
Despite the availability of online portals and mobile apps, residents overwhelmingly prefer calling. In San Antonio, the mobile app lacked several top ten service request categories, and the web portal lacked a search feature, making it difficult to navigate [2].

| Source | FY15 Volume | FY15 Share | FY16 Volume | FY16 Share |
| :--- | :--- | :--- | :--- | :--- |
| 311 Call Center | 280,566 | 82% | 285,050 | 81% |
| Online Portal | 59,321 | 17% | 59,735 | 17% |
| Mobile Application | 3,982 | 1% | 7,440 | 2% |

*Takeaway:* Digital adoption remains stagnant at 18-19% because the tools are not user-friendly. Improving the UX of digital channels is critical to reducing call center load.

## Current Tooling Landscape

CRMs, Work Order Management Systems (WOMS), GIS, and alert systems exist but are often siloed. Communications staff need aggregation, not just access.

### Tool-to-Task Matrix

| Tool Category | Primary Comms Use Case | Current Limitations |
| :--- | :--- | :--- |
| CRM / Knowledge Base | Answering resident FAQs and logging requests | Often contains outdated SLAs and contact info [2]. |
| Work Order Management | Checking status of repairs (e.g., potholes) | Comms often lack real-time access, though mobile-first tools allow field staff to update statuses instantly [6]. |
| GIS / Mapping | Viewing road closures and project zones | Often inaccessible to frontline comms or field staff [5]. |
| GovDelivery / SMS | Sending storm and service disruption alerts | Requires proactive audience building [4]. |

## Information Gaps and Chasing Behavior

Stale Service Level Agreements (SLAs) and weak closure notes force manual chasing and callbacks. 

### Evidence of Gaps
In San Antonio, an audit revealed that information used by representatives was not always accurate. Deliverables identified in department SLAs were frequently incorrect in the CRM [2]. Furthermore, of 1,501 complaints entered in FY2016, 87% remained open, and closed cases lacked resolution notes [2].

| City Department | Total SLAs in CRM | Incorrect SLAs in CRM | % Incorrect |
| :--- | :--- | :--- | :--- |
| Animal Care Services | 51 | 0 | 0% |
| Solid Waste | 66 | 26 | 39% |
| Parks & Recreation | 150 | 6 | 4% |
| Development Services | 262 | 160 | 61% |
| TCI (Public Works) | 315 | 7 | 2% |

*Takeaway:* High inaccuracy rates in Solid Waste and Development Services SLAs directly undermine the communications team's ability to set accurate expectations with residents.

## Requirements: Resident Self-Service Tool

Make the easiest questions answer themselves via clear search, address logic, and proactive alerts.

### Design Implications for Public Tools
* **Address-Based Logic:** Residents need to easily look up their specific collection schedules and project impacts.
* **Top Tasks Prominence:** The UI must feature the highest-volume requests (missed pickup, cart replacement, dead animal) front and center.
* **Search Functionality:** The lack of a search feature in web portals severely limits usability [2].
* **Parity Across Channels:** The mobile app must contain the exact same request categories as the call center CRM [2].

## Requirements: Internal Lookup Tool

Give communications staff authoritative, real-time answers to prevent them from having to chase down operations colleagues.

### Design Implications for Internal Tools
* **Live Work Order Feeds:** Integration with mobile-first field apps so comms staff can see real-time status updates and photos from crews [6].
* **Project Tracking:** A centralized dashboard to monitor the status of projects and contracts, preventing the need for ad-hoc status checks [7].
* **Strict Access Governance:** San Antonio's CRM had 805 active users, but 659 had no activity, including 101 former employees [2]. Internal tools need strict role-based access and periodic reviews.

## Storm/Disruption Communications Playbook

Build the audience before the storm hits. Pre-baked subscriptions and SMS keywords enable surge outreach at a low marginal cost.

### Channels and Tactics
Organizations must provide multiple ways for the public to sign up for alerts, including email and SMS [8] [4]. Text-to-subscribe is highly effective; for example, St. Paul allows residents to text "STPAUL SNOW" to 468311 to receive snow emergency parking updates [4]. 

| Channel | Speed | Reach | Example Use Case |
| :--- | :--- | :--- | :--- |
| SMS / Text-to-Subscribe | Instant | High (90%+ mobile ownership) | "STPAUL SNOW" for parking bans [4]. |
| Email (GovDelivery) | Fast | Medium | General winter weather alerts; Caerphilly gained 10k subs in 48 hours [3]. |
| Website Banners | Passive | Low (requires visit) | Cross-promoting alert sign-ups on press releases [3]. |

## Staffing and Workload Management

Shift design and deflection together reduce wait times and abandonment.

### Call Center Performance Realities
In San Antonio, the 311 call center struggled with peak volumes. In FY2016, they answered only 50% of calls within 45 seconds, had an average wait time of over two minutes, and saw an 18% call abandonment rate [2]. 

*Inference:* Without deflecting repetitive informational calls to digital channels, communications staff will continuously fail to meet service level targets during peak hours.

## Facts and Inferences Summary

### Verified Facts
* **Fact:** In San Antonio, "No Trash Pickup" generated 37,179 requests in FY2016, making it the top Public Works-related inquiry [2].
* **Fact:** 81-82% of San Antonio service requests were made via phone, compared to just 1-2% via mobile app [2].
* **Fact:** 39% of Solid Waste SLAs in San Antonio's CRM were incorrect [2].
* **Fact:** The City of St. Paul uses a text-to-subscribe feature where residents text "STPAUL SNOW" to receive snow emergency alerts [4].

### Strategic Inferences
* **Inference:** The low adoption of mobile and web portals is directly tied to poor user experience (lack of search, missing categories), not a lack of resident digital literacy.
* **Inference:** Internal communication breakdowns between DPW management and frontline staff directly degrade the quality of information provided to the public.
* **Inference:** Implementing mobile work order updates for field crews will drastically reduce the time communications staff spend chasing project statuses.

## References

1. *Building a 311 System: A Case Study of the City of Minneapolis*. https://portal.cops.usdoj.gov/resourcecenter/content.ashx/cops-w0488-pub.pdf
2. *Audit of 311 Customer Service - Call Center*. https://www.sanantonio.gov/Portals/0/Files/CityAuditor/Reports/FY2017/AU17-009.pdf
3. *Capturing new subscribers during severe weather*. https://granicus.com/blog/capturing-new-subscribers-severe-weather/
4. *Text to Subscribe | Granicus Support*. https://support.granicus.com/s/article/Text-to-Subscribe
5. *Public Works and Inspection Services Staffing and ...*. https://www.roselle.il.us/DocumentCenter/View/1465
6. *Work Order Management Software: Automate Public Works Requests and Save Time*. https://www.govpilot.com/blog/work-order-management-software-automate-public-works
7. *
	
    Department of Public Works Contracts, Change Orders, and Supplements | Hawaii County, HI

*. https://www.hawaiicounty.gov/our-county/legislative/office-of-the-county-auditor/department-of-public-works-contracts-change-orders-and-supplements
8. *
	
    How to Use the GovDelivery System | City of Walla Walla

*. https://www.wallawallawa.gov/services/news/using-govdelivery