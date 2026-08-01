# Executive Summary

The City of Richmond, VA, provides several public-facing dashboards and data portals for infrastructure and civic services, but an in-depth review reveals significant limitations in data accessibility, maintenance, and integration pathways. The Capital Improvement Projects (CIP) Dashboard is stated to be updated quarterly, but lacks a public refresh date, making its currency unverifiable. A key transportation dataset, the 'Richmond Impact Map,' appears to be abandoned despite a stated weekly update schedule. Critically, there are no publicly accessible APIs for key systems, including the ArcGIS REST services for CIP data, the EnerGov portal for construction and right-of-way permits, and the RVA311 system for service requests, which also does not support the Open311 standard. This lack of machine-readable access hinders transparency and third-party development. Additionally, the city's inaugural 'Hack for RVA' civic hackathon, while a positive step in engagement, has no published formal pathway for the city to adopt or incubate the resulting prototypes.

# Cip Dashboard Update Status

## Stated Update Cadence

The City of Richmond states that the Capital Project Dashboard is updated on a quarterly basis.

## Last Known Refresh Date

Not available. No explicit last-refresh timestamp is published on the public dashboard or the associated Capital Improvement Plan page, so a precise last refresh date is not publicly disclosed.

## Dashboard Status

Beta. The dashboard's landing page includes a note stating, 'Please note, you are accessing the Beta Version of our interactive Capital Improvement Projects (CIP) Dashboard.'


# Richmond Impact Map Maintenance Status

## Is Maintained

False

## Last Updated Date

March 31, 2023

## Stated Update Frequency

Weekly

## Data Owner Department

Transportation


# Cip Dashboard Api Accessibility

No, the CIP Dashboard's FeatureLayer cannot be queried via a public ArcGIS REST API. While the dashboard viewer is public, the underlying REST services are hosted behind the City of Richmond's GIS portal (geo.richmondgov.com), which requires a sign-in to access. There is no publicly exposed FeatureLayer endpoint for anonymous queries.

# Cip Dashboard Api Field Schema


# Online Permit Portal Api Availability

## Has Public Api

False

## Portal Url

https://energov.richmondgov.com/energov_prod/selfservice#/home

## Access Method

Access to permit data is facilitated through a manual web interface, the EnerGov Citizen Self Service (CSS) portal. Users can register an account to apply for and pay for permits, request inspections, and check the status of their applications. The system does not offer any programmatic access; all interactions must be performed manually through the website.

## Support Contact Email

CSSHelp@richmondgov.com


# Rva311 Open311 Compliance

## Is Compliant

False

## Compliance Notes

Based on a review of official RVA311 web pages, there is no indication that the system supports the Open311 standard or provides any form of public developer API. The documentation does not mention Open311 GeoReport v2 for either submitting or retrieving service requests. The conclusion is that Open311 is not publicly published or supported by the City of Richmond's 311 system.

## Available Interfaces

Service requests can be submitted to RVA311 through several methods: by telephone, via the online self-serve web portal at RVA311.com, or by using the RVA311 mobile app. The web portal and mobile applications are available 24/7.


# Dpw 311 Request Type Analysis

The City of Richmond does not publicly publish any datasets or performance reports that provide a breakdown of Department of Public Works (DPW) related 311 requests into categories of purely informational versus actionable service requests. A review of the city's Open Data Portal found no official statistics on this matter. Consequently, the percentage of DPW-related calls that are informational versus actionable is not published and cannot be determined from available public data.

# Civic Tech Continuation Pathway Details

## Pathway Exists

False

## Related Event Name

Hack for RVA

## Named Host Department

Not Published

## Summary Of Findings

An investigation into Richmond's civic hackathon, 'Hack for RVA', found no evidence of a specific, formalized post-event continuation pathway for prototypes. The city's official press release and the event's website focus on partners (AI Ready RVA, PlanRVA, VCU School of Business) and the prize structure ($10,000 in prizes). However, neither source outlines a process for project adoption, incubation, or assigns a specific city department or a 'product owner' role to guide the development of promising projects after the hackathon concludes. Therefore, there is no published governance or structure for integrating these civic tech innovations into the city's operations.


# Right Of Way Permitting Process Overview

The process for obtaining a 'Work in Streets' permit for any work performed within the public right-of-way in Richmond, VA, is handled manually. Applicants are required to submit their application digitally via email to the Right of Way Management department at Rightofway@richmondgov.com. To monitor the status of a submitted application, applicants must use the city's Online Permit Portal, which is an EnerGov Citizen Self Service (CSS) system. The portal can be accessed at https://energov.richmondgov.com/energov_prod/selfservice#/home. There is no automated API for status checks; users must manually log in and navigate the web portal to find updates on their permit applications.

# Rva311 System Overview

RVA311 is the City of Richmond's centralized citizen service and response system. It provides residents with multiple channels to submit requests for service. These channels include traditional telephone calls, an online self-serve web portal (RVA311.com), and a dedicated RVA311 mobile application. The web portal and mobile app are available for use 24 hours a day, 7 days a week. While the system facilitates communication between citizens and city departments, it does not publicly support Open311 standards or offer a developer API for third-party integration, according to available documentation.

# Hack For Rva Event Summary

The 'Hack for RVA' event is billed as Richmond's first-ever civic hackathon, scheduled to take place from March 27–29, 2026, at Virginia Commonwealth University (VCU). The event is a collaborative effort sponsored by the City of Richmond in partnership with AI Ready RVA, Plan RVA, and the VCU School of Business. The purpose of the hackathon is to engage the community in developing technological solutions for civic challenges. The event is structured to culminate in the awarding of $10,000 in prizes to winning teams. While the event promotes civic innovation, the available information does not specify a formal process for the city to adopt or further develop the projects created during the hackathon.

# Data Accessibility Summary

The overall accessibility of Richmond's infrastructure and civic data is mixed, favoring web-based public portals over machine-readable open data. While the city provides tools like the Capital Improvement Projects (CIP) Dashboard and an Open Data Portal, deeper analysis reveals significant access barriers. The CIP Dashboard's data layer is not exposed via a public ArcGIS REST API, as services are behind a mandatory sign-in portal. Similarly, the EnerGov-based Online Permit Portal for right-of-way and construction permits does not offer a public API for developers to query permit data. The RVA311 system, while available through web and mobile apps, does not publish or support the Open311 API standard for programmatic submission or retrieval of service requests. Data maintenance is also a concern; for example, the 'Richmond Impact Map' dataset on the open data portal is listed with a weekly update frequency but has not been updated since March 2023, indicating it is stale. Finally, granular performance data, such as a breakdown of informational versus actionable DPW 311 requests, is not published. In conclusion, while information is available through user-facing websites, the lack of public APIs and inconsistent data maintenance limits true data transparency and hinders the potential for automated analysis and civic technology innovation.
