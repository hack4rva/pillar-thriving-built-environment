# Executive Summary

This report addresses key questions regarding equity, accessibility, and data practices for infrastructure projects in Richmond, Virginia. 

1. **Equity for Limited English Proficiency (LEP) Residents:** While the city has not published a precise figure, it has the necessary data to quantify the percentage of the LEP population living near active infrastructure projects. By spatially intersecting data from its Capital Improvement Projects (CIP) Dashboard with LEP population maps from PlanRVA or its own RVAgreen 2050 Climate Equity Index, this analysis can be performed. LEP populations are known to be concentrated in south Richmond. Regarding communication, the city's main CIP portal includes a Spanish language access notice and refers to a broader Language Access Plan, but project-specific communications in Spanish are not consistently available on project pages.

2. **Accessibility Information:** Residents with disabilities or accessibility needs primarily learn about sidewalk closures and ADA-compliant detours through on-site physical signage and channelization, as required by VDOT's Virginia Work Area Protection Manual. The Department of Public Works (DPW) announces some closures on individual project pages, and residents can opt into citywide alerts via Richmond Ready. However, there is no evidence of a centralized, digitally accessible map that consolidates all active sidewalk closures and their corresponding ADA detour routes.

3. **Digital Equity and Smartphone-Only Households:** A specific percentage of smartphone-only households for Richmond is not published by the city, but the data to calculate it is available through the U.S. Census Bureau's American Community Survey (ACS table S2801). This demographic is significant because map-first digital interfaces can be problematic on smartphones due to performance issues and difficult navigation (e.g., pinch-zoom on complex maps). The best practice to serve these residents is to provide lightweight, mobile-first web pages, list-based views of projects, and descriptive text alternatives.

4. **VDOT SMART SCALE Data Integration:** Programmatic access to VDOT SMART SCALE data is available, particularly for transit and rail projects via ArcGIS-based open data dashboards provided by the DRPT. These datasets, along with road project data, often use VDOT UPC numbers as identifiers. This allows the data to be joined to Richmond's CIP Dashboard, provided the city includes these UPCs in its own project records. The city's ArcGIS-based dashboard inherently supports programmatic access to its underlying data, facilitating such integration.

5. **Governance Models from Other Cities:** Mid-size U.S. cities like Madison, WI, and Durham, NC, have successfully maintained capital project dashboards for multiple years. Key success factors for this sustained effort include establishing clear departmental ownership (e.g., an engineering division or a Project Management Office acting as data steward), integrating a regular update cadence (e.g., quarterly) into official budget and performance management cycles, and utilizing standard enterprise platforms like ArcGIS or Power BI.

6. **Lessons from NYC's Capital Projects Dashboard:** New York City's dashboard faced significant challenges, with a Comptroller's report finding it represented only 46.8% of project financial IDs and suffered from inconsistent identifiers and poor linkages between financial and project management systems. The key lessons for Richmond are the critical importance of mandating complete and standardized project identifiers across all systems, ensuring the dashboard covers all capital projects, publishing the raw underlying data for transparency, and enforcing a strict, regular cadence for agency data updates.

7. **Feasibility of a Static GeoJSON Architecture:** It is technically feasible for Richmond to adopt a nightly ETL (Extract, Transform, Load) process to export data from its ArcGIS-based CIP system into static, versioned GeoJSON files. This architecture would decouple resident-facing tools from the complexities and potential instability of the upstream data source, resulting in more reliable, faster-loading, and cacheable applications that perform better for all users, especially those on smartphones.

# Lep Population Analysis

## Data Source

PlanRVA 2045 Long Range Growth Forecast Analysis (using ACS 2013–2017 B16005 data)

## Geographic Distribution Summary

LEP concentrations are found in south Richmond and adjacent areas of Henrico and Chesterfield counties.

## Regional Lep Percentage

2.1


# Project Communication Language Access

## Has Spanish Translation Feature

True

## Translation Method

Google Translate™

## Formal Language Access Plan Contact

To request a translation, call 804-646-7000 or 3-1-1.


# Accessibility Communication Channels

## Primary Alert System

Richmond Ready

## System Provider

Everbridge

## Subscription Methods

Residents can subscribe to alerts by downloading the 'Public Safety by Everbridge' app and selecting Richmond, VA. The system is described as providing 'opt-in notifications'.

## Relevant Notification Types

The system is used for citywide alerts. While not explicitly listing 'sidewalk closures,' it is a primary method for disseminating public information, which would include announcements for intermittent sidewalk closures and other construction-related disruptions mentioned in the context.


# Smartphone Only Household Statistics

## Percentage Of Households

0.0

## Data Source

American Community Survey (ACS) Table S2801

## Geographic Area

Richmond city, Virginia


# Implications For Map First Interfaces

The prevalence of smartphone-only households significantly impacts the equity and accessibility of map-first digital interfaces for capital projects. According to the analysis, residents in these households often encounter substantial usability problems, including difficulties with 'pinch-zoom' navigation and slow performance on data-heavy web maps. These issues can create barriers to accessing crucial information about infrastructure projects. To mitigate these effects and ensure more equitable access, the recommended best practice is to avoid relying solely on a map-based interface. Instead, a mobile-first design approach should be adopted, featuring lightweight web pages, providing information in alternative formats like list views, and incorporating descriptive alt text for all visual elements to support accessibility.

# Vdot Smart Scale Data Accessibility

## Portal Name

SMART Portal

## Programmatic Access Available

True

## Bulk Download Formats

JSON/GeoJSON (via ArcGIS dashboards/open data)

## Data Management Body

DRPT (Department of Rail and Public Transportation) for transit and rail projects.


# Data Integration Feasibility Analysis

## Is Technically Feasible

True

## Common Project Identifier

UPC (Universal Project Code) / SMART SCALE identifiers

## Identified Challenges

The primary challenge is data consistency, specifically whether Richmond's CIP records consistently include and populate the UPC/SMART SCALE identifiers for the corresponding projects to enable a reliable join.


# Successful Municipal Dashboards

## City Name

Madison, WI

## Dashboard Status

Active and maintained for multiple years

## Key Governance Factors

The city's success is attributed to clear departmental ownership, with the engineering division acting as the data steward, and a commitment to open data governance, ensuring the data is publicly accessible and maintained over the long term.

## City Name

Durham, NC

## Dashboard Status

Active and regularly updated

## Key Governance Factors

Durham's success relies on a structured update process, including a transit/capital tracking Hub and the production of quarterly CIP (Capital Improvement Plan) Stoplight Reports. This regular, predictable reporting cadence is integrated into their budget and performance management processes.


# Governance Models For Successful Dashboards

Successful governance models for sustaining municipal capital project dashboards rely on a combination of clear ownership, integrated processes, and appropriate technology management. A primary success factor is assigning a specific departmental entity, such as a Project Management Office (PMO) or the engineering division, to act as the official data steward. This ensures accountability for data quality and maintenance. Another critical component is baking a regular update cadence, often quarterly, directly into the city's core budget and performance management cycles, transforming the dashboard from a standalone initiative into an integral part of city operations. Finally, successful models often involve empowering the owning department with the necessary technical rights and tools, such as ArcGIS or Power BI, to publish updates independently, reducing bureaucratic friction and ensuring timely information dissemination.

# Nyc Capital Projects Dashboard Analysis

## Report Source

NYC Comptroller's Office report 'Flying Blind on Billions: How Weak Capital Data Undermines New York City’s Infrastructure Investments'

## Project Id Coverage Percentage

46.8

## Last Known Status

The dashboard officially operates on a triannual update cadence tied to Office of Management and Budget (OMB) plans. However, a Comptroller's report found it to be critically flawed and incomplete, and the user's query noted a specific instance where it had gone six months without an update, highlighting issues with its timeliness and reliability.

## Identified Weaknesses

The primary weaknesses identified were severe data incompleteness and fragmentation. The dashboard represented only 46.8% of project IDs from the Financial Management System (FMS) and only 58.1% of planned commitments. Furthermore, it suffered from the use of inconsistent project identifiers and weak linkages between the financial data in FMS and the separate project management systems, which severely limited its utility for oversight and public transparency.


# Lessons For Richmond From Nyc

The challenges faced by New York City's Capital Projects Dashboard offer several critical lessons for Richmond as it develops its own infrastructure tracking tools. First, it is essential to mandate complete and standardized project identifiers across all municipal systems, particularly between financial (like Richmond's CIP) and project management platforms, to ensure seamless data linkage and a comprehensive view. Second, Richmond should aim to expand data coverage to all capital projects, avoiding the pitfalls of a partial or curated list which undermines transparency. Third, publishing the raw, underlying data in an open format is crucial for accountability and allows the public to conduct its own analysis. Finally, Richmond should establish and enforce a non-negotiable, regular update cadence for all agencies to submit schedule and status data, ensuring the dashboard remains timely, accurate, and reliable.

# Static Geojson Architecture Evaluation

An evaluation of a nightly ETL (Extract, Transform, Load) to a static GeoJSON architecture for the City of Richmond's infrastructure project data concludes that this approach is highly feasible and offers significant benefits for resident-facing digital tools. Richmond's current CIP Dashboard is powered by ArcGIS, which means the underlying project data is available via a queryable feature service API. This makes it an ideal source for an automated data pipeline.

**Feasibility:**
The implementation is straightforward. A scheduled script (e.g., a Python script running on a server or as a cloud function) could be executed nightly. This script would query the public-facing ArcGIS service for the CIP data, transform the response into the GeoJSON standard format, and save the output as a versioned static file (e.g., `cip-projects-2026-04-01.geojson`) on a web server or in a cloud storage bucket. This process is a common and robust data engineering pattern.

**Benefits:**
1.  **Decoupling and Reliability:** This architecture decouples the resident-facing application from the live ArcGIS backend. If the city's internal data schema changes or the ArcGIS service is down for maintenance, the public tool, which reads from the last successful static file, remains operational and unaffected. This dramatically increases the reliability of public information.
2.  **Performance and Scalability:** Static GeoJSON files are simple text files that can be served with high speed and efficiency. They are easily cached by web browsers and Content Delivery Networks (CDNs), leading to near-instant load times for users. This is a marked improvement over applications that must make live API calls to a complex backend, which can be slow.
3.  **Improved Digital Accessibility:** The high performance is particularly beneficial for residents on lower-speed internet connections or using mobile devices, including the 'smartphone-only' households. Fast-loading, lightweight tools are more accessible and provide a better user experience than heavy, map-centric applications that can be sluggish and difficult to navigate on a small screen.
4.  **Versioning and Transparency:** By saving a new file each night, the city creates an automatic, versioned archive of its project data. This history can be made public, allowing for greater transparency and longitudinal analysis of project timelines and changes.

In conclusion, adopting a nightly ETL to a static GeoJSON architecture is a recommended, low-risk, high-reward strategy for Richmond to enhance the performance, reliability, and accessibility of its public-facing infrastructure project information tools.

# Richmond Cip Dashboard Overview

## Dashboard Name

City of Richmond's CIP Dashboard

## Current Status

Beta Version

## Technology Platform

ArcGIS Experience Builder / ArcGIS Dashboard

## Stated Update Frequency

Quarterly


# Pedestrian Detour And Ada Standards

## Governing Document Name

Virginia Work Area Protection Manual (WAPM)

## Issuing Authority

VDOT (Virginia Department of Transportation)

## Relevance

This manual provides the official standards and requirements for work zones in Virginia. It mandates the implementation of pedestrian detours and ensures they are ADA-compliant, which includes appropriate on-site signage and channelization to guide all pedestrians, including those with accessibility needs, safely around construction sites.

