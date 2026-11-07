# Executive Summary

Durable municipal snow plow tracking systems, such as those in New York City, Virginia (VDOT), and Chicago, are distinguished by a common governance pattern: they are owned and operated by the core service agency (e.g., Department of Sanitation), deeply integrated with the agency's existing Automatic Vehicle Location (AVL) and GIS enterprise platforms (like Esri), and embedded into official incident command and public communications workflows. This ensures sustained funding and operational relevance, preventing the common failure of standalone civic tech projects that lack clear ownership. The success of Syracuse's tracker, which evolved from a hackathon prototype to a production system, was critically dependent on the city's Chief Data Officer, who provided stewardship, secured vendor partnerships, and ensured its integration as an official city tool. Technologically, municipalities like Howard County, MD, leverage commercial platforms such as Geotab's Citizen Insights to provide public-facing maps of plow activity, though evidence of a direct reduction in 311 call volume is not publicly available. From an equity perspective, several challenges exist for a city like Richmond, VA. The city's formal Language Access Plan and federal Title VI guidance create an obligation to provide meaningful access to real-time operational updates for Limited English Proficiency (LEP) residents. Furthermore, while specific data for Richmond is unavailable, a portion of residents likely use prepaid mobile plans that can block SMS short code alerts, creating a potential communication gap. Cellular coverage is not uniform across Richmond, which can affect both the reliability of GPS telemetry from plows and residents' ability to access online maps in areas with weaker signals. Finally, the acceptance of in-cab digital tools by field operators and potential union resistance is a critical factor, though no specific documentation on this was found for comparable snow operations, marking it as a research gap.

# Sustainable Tracker Governance Patterns

## Key Pattern

The most common successful pattern is the transition of a civic technology project into an official government tool, or its creation as such from the outset. This involves a government champion, like a Chief Data Officer, stewarding the project, securing resources, and ensuring it is rebuilt or integrated into the city's official technology stack. The Syracuse plow tracker exemplifies this, where the CDO reviewed a community prototype, learned from it, and then rebuilt it as an official, supported city map in partnership with Esri.

## Ownership Model

Successful trackers have clear ownership by the core service agency responsible for the work, such as a Department of Sanitation (e.g., NYC DSNY's PlowNYC) or a Department of Streets and Sanitation (e.g., Chicago's Plow Tracker). This model ensures the tool is not a peripheral project but a core part of the agency's operational and public information mandate, which also secures its maintenance and longevity.

## Funding Source

Funding is secured through the owning agency's operational budget. By being an integrated part of the agency's service delivery and incident command systems, the tracker's maintenance and development costs are treated as a necessary operational expense rather than a discretionary project, which protects it from the budget uncertainties that plague volunteer-run or grant-funded civic tech initiatives.

## Operational Integration

The tool is deeply integrated into daily operations and existing city systems. This includes using the agency's own Automatic Vehicle Location (AVL)/telemetry data from the plows and leveraging the existing enterprise GIS stack (e.g., Esri ArcGIS). Furthermore, it's integrated into public communications, with officials directing residents to the tracker as the primary source of truth during snow events. In some cases, like Howard County, it's also integrated with the 311 system by instructing residents to check the tracker before placing a call, managing public expectations and service requests.


# Civic Tech Project Failure Modes

Many civic tech projects, particularly those born from hackathons, fail to achieve long-term sustainability due to a predictable set of challenges. A primary failure mode is the lack of a clear governance structure, specifically the absence of a designated owning agency within the government. This leads to ambiguity in ownership and responsibility for maintenance. Without an official owner, projects struggle to secure a dedicated budget, relying instead on volunteer effort which is prone to burnout. Another major hurdle is the failure to integrate with the government's enterprise systems, such as existing vehicle telemetry (AVL) and GIS platforms. This leaves the project as a standalone, peripheral application that isn't embedded in the core operational playbooks for events like snowstorms, ultimately leading to its abandonment when initial enthusiasm wanes or key volunteers depart.

# Syracuse Plow Tracker Case Study

## Project Origin

The Syracuse plow tracker originated as a community-developed prototype, likely from a hackathon or similar civic tech initiative. It was an unofficial project before being adopted by the city.

## Key Figure

The key figure responsible for championing the project was Sam Edelstein, the City of Syracuse's Chief Data Officer (CDO).

## Cdo Contribution

The Chief Data Officer, Sam Edelstein, played a pivotal role in the project's success. He reviewed the initial community prototype, identified its strengths and weaknesses, and then used those lessons to rebuild and expand it into an official city map. His office provided the necessary product ownership and stewardship to transition it from a volunteer effort to a government-supported service. He also facilitated a partnership with Esri to further evolve the map into a more comprehensive winter weather operations tool, integrating updated sensors and expanding its capabilities.

## Success Factors

The project successfully transitioned from a prototype to a production system primarily due to the stewardship of the Chief Data Officer. This provided clear product ownership and a designated home within the city government, which are often lacking in civic tech projects. The CDO's office not only rebuilt the tool but also secured a strategic partnership with a major vendor (Esri) to ensure its long-term development, maintenance, and integration into broader city operations. This moved the project from a standalone app to an embedded, sustainable operational tool.


# Howard County Tracker Analysis

## Technology Stack

Howard County's Snow Plow Tracker is powered by Geotab's Citizen Insights platform. This technology leverages the county's existing vehicle telematics and Automatic Vehicle Location (AVL) data, making it accessible to the public through a web-based map interface.

## Functionality

The tracker provides residents with a public-facing map that shows the real-time and recent activity of the county's snow plows and salt trucks. Users can see which road segments have been recently serviced, allowing them to track the progress of snow removal operations throughout the county.

## Impact On 311 Calls

While the county actively encourages residents to use the tracker to get information, there is no publicly available data or evaluation that quantifies a reduction in 311 call volume. The county's strategy is to proactively provide information via the tracker and instruct residents to wait 24 hours after a storm ends before calling 311, implying an intent to reduce calls, but the actual impact has not been published.

## Public Communication Method

During snow events, Howard County's government uses official storm updates and social media channels, such as Facebook, to direct residents to the Snow Plow Tracker website. These communications position the tracker as the primary source for information on road clearing progress and are paired with instructions for residents to check the map and wait a significant period (24 hours post-precipitation) before contacting 311 for service requests.


# Richmond Prepaid Mobile Analysis

## Estimated Resident Percentage

No Richmond-city-specific statistic on the percentage of residents using prepaid mobile plans could be located in public sources. While national data from sources like CTIA and Pew Research Center document broad trends in mobile adoption and plan types, recent, city-level data for Richmond is not published.

## Short Code Blocking Risk

True

## Implication For Emergency Alerts

The blocking of SMS short codes by some prepaid mobile plans poses a significant risk to public safety communications. Since many emergency alert systems and municipal notifications rely on short codes to deliver real-time information, residents with these plans may not receive critical alerts about weather emergencies, public safety threats, or operational updates like snow removal schedules. This can create an equity gap, where a portion of the population is inadvertently excluded from vital, time-sensitive information.


# Richmond Lep Communication Strategy

## Current Plan Document

The city's official plan is the 'City of Richmond Language Access Plan (LAP),' with the final version dated April 2020.

## Governing Policy

The plan is governed by Title VI of the Civil Rights Act of 1964, which prohibits recipients of federal financial assistance, such as the City of Richmond, from discriminating on the basis of race, color, or national origin. This includes ensuring meaningful access for persons with limited English proficiency (LEP).

## Available Resources

The City of Richmond has a formal Language Access Plan and a corresponding Human Resources policy (Rule 5.24 Language Access Policy) that establish the official obligation and framework to provide language access for city communications and services to ensure LEP residents have meaningful access.

## Real Time Communication Gap

While Richmond's Language Access Plan establishes a broad requirement to provide meaningful access to city programs and communications, a specific, publicly posted protocol for communicating real-time operational updates, such as snow removal status, to LEP residents was not identified. The general obligation exists under the plan, but its specific application to dynamic, real-time information services appears to be an area that is not explicitly detailed, representing a potential gap in the city's communication strategy.


# Title Vi And Real Time Updates

## Core Principle

The core principle of Title VI of the Civil Rights Act of 1964, as it relates to Limited English Proficiency (LEP) individuals, is the requirement to provide 'meaningful access' to all programs and activities that receive federal financial assistance.

## Applicability To Digital Alerts

True

## Guidance Source

The primary government body that provides guidance on Title VI compliance and access for LEP persons is the U.S. Department of Justice (DOJ), specifically through its Civil Rights Division. Guidance is also shaped by Executive Order 13166.


# Richmond Cellular Coverage Gaps

## Affected Neighborhoods Identified

The provided research did not identify specific Richmond neighborhoods by name due to the lack of an authoritative city-segmented report. However, it confirms that public coverage mapping shows intra-city variability in 4G/5G service. Stakeholders are advised to consult the interactive nPerf map for Richmond to pinpoint specific zones with weaker coverage.

## Data Sources Reviewed

The primary data source reviewed for cellular coverage in Richmond was the public, interactive coverage map provided by nPerf, which displays 2G, 3G, 4G, and 5G mobile network signal strength.

## Impact On Gps Telemetry

Weak cellular coverage in certain zones directly affects the reliability of real-time GPS telemetry from city vehicles. The research suggests that this impact can be managed through technical mitigations such as implementing buffered reporting or store-and-forward capabilities in the vehicle hardware, which would collect data in low-signal areas and transmit it once a stable connection is re-established.

## Impact On Resident Access

Weaker 4G/5G cellular zones negatively impact residents' ability to access mobile websites and receive real-time alerts. Residents in these areas may experience slow loading times, failed connections, or an inability to use data-dependent services like a real-time plow tracking map during a storm.


# Dpw Operator Technology Adoption

## Documented Resistance Found

False

## Source Of Potential Resistance

Although no specific documentation was found, the research notes that, in general, acceptance issues with new in-cab technology like GPS/telematics or tablets can arise if the tools are introduced without proper collective bargaining or the establishment of clear work rules governing their use.

## Research Gap Identified

True


# Successful Plow Tracker Profiles

## City Or State

New York City

## Tracker Name

PlowNYC

## Governing Body

New York City Department of Sanitation (DSNY)

## Technology Stack

PlowNYC is an official government website featuring a live, interactive, color-coded map. It is built upon the DSNY's existing Automatic Vehicle Location (AVL)/telemetry data and integrated with the agency's Geographic Information System (GIS) stack.

## History And Sustainability Notes

PlowNYC's durability is attributed to its deep integration within the core service agency, the DSNY. It is not a standalone civic app but an official, real-time operations tool used in incident command. This governance model ensures it has a dedicated budget, is operationally embedded, and is consistently maintained as a critical piece of public information infrastructure during winter storms.

## City Or State

Virginia

## Tracker Name

VDOT Plows

## Governing Body

Virginia Department of Transportation (VDOT)

## Technology Stack

The VDOT plow tracker is part of the department's statewide ArcGIS and 511 portfolio. It utilizes Esri technology, including ArcGIS Online, Operations Dashboards, and feature services. The underlying data is also made available to the public via Virginia's official open data portal (data.virginia.gov).

## History And Sustainability Notes

This tracker is sustained by being part of VDOT's larger, enterprise-level technology ecosystem for traffic and transportation information (511 Virginia). By using a stable, enterprise platform (Esri ArcGIS) and integrating the plow data into its standard operational and public-facing data pipelines, VDOT ensures the tool's maintenance, reliability, and long-term availability.

## City Or State

Chicago

## Tracker Name

Plow Tracker

## Governing Body

Chicago Department of Streets and Sanitation (DSS)

## Technology Stack

The official City of Chicago Plow Tracker uses the city's own snow plow telemetry data (AVL). It is integrated with the agency's existing GIS and operational data systems, similar to the model used in New York City.

## History And Sustainability Notes

Chicago's Plow Tracker succeeded by being launched and operated as an official tool by the responsible city department, the Department of Streets and Sanitation. This pattern of agency ownership ensures that the tracker is treated as a core service delivery tool rather than a peripheral project. Its integration with the department's operational playbook and use of official city data are key to its sustainability.


# Common Plow Tracker Technologies

Modern snow plow trackers are powered by a combination of technologies designed to collect, process, and visualize real-time vehicle location data. A foundational component is the Automatic Vehicle Location (AVL) or vehicle telematics system installed in the plows, which provides the raw GPS data. This data is then fed into a Geographic Information System (GIS) platform, with Esri's suite of tools—such as ArcGIS Online, Operations Dashboards, and feature services—being a very common choice, as seen with VDOT and Syracuse. Alternatively, some municipalities use specialized fleet management platforms with public-facing modules, such as Geotab's Citizen Insights, which powers Howard County's tracker. The final piece is a public-facing web application or dashboard, often a live map, that visualizes the plow activity for residents. In some cases, the underlying data is also published to open data portals, as VDOT does, allowing for further use and analysis by the public.

# Recommendations For Richmond Va

## Recommendation Area

Governance and Technology

## Specific Action

Adopt a proven governance model by assigning clear ownership of the snow plow tracker to the Department of Public Works (DPW). The system should be integrated with the city's existing enterprise systems, such as AVL/telemetry and the primary GIS platform (e.g., Esri), rather than being developed as a standalone application.

## Justification

Research on durable trackers in NYC, Chicago, and Virginia shows that success is tied to agency ownership and deep integration with core operations. This model ensures sustained funding, maintenance, and use in incident command, avoiding the 'civic tech project death' cycle where projects fail due to ambiguous ownership and lack of an operational home. The case of Syracuse further highlights how stewardship by a city officer, integrating a tool with enterprise platforms, leads to sustainability.

