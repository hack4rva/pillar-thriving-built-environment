# Continuation Plan — A Thriving and Sustainable Built Environment

This document outlines what a strong hackathon prototype could become after the event, who should be engaged, and what the realistic path forward looks like. Both targeted problem statements have been flagged with "no continuation pathway" as a quick-kill flag — this plan addresses how to establish one.

---

## Quick-Kill Flag Context

Both targeted statements were flagged: "no continuation pathway" in the rubric. This means:
- No specific City department has committed to continuing or deploying a solution
- No named champion has agreed to maintain or operationalize the tool
- This does not mean the solutions are unimportant — it means the path from prototype to deployed tool requires additional relationship-building

The named champions (Al Wiggins, Daniel Klein) are the right starting point for post-hackathon engagement.

---

## Continuation Path: Transportation Project Visibility Tool

### Most likely continuation scenario
A prototype that aggregates GeoHub data with plain-language descriptions would be valuable to DPW's communications function. The most realistic continuation path is:
1. DPW communications staff adopt the tool informally for internal use (answering resident queries)
2. City IT or GIS evaluates whether to embed the tool in an official DPW web page
3. A civic tech nonprofit (e.g., Code for America brigade) maintains the open-source version

### Who to engage after the hackathon
- DPW communications: demonstrate the tool and show how it reduces inquiry volume
- City GIS team: discuss which ArcGIS layers to officially support and document for this use
- Office of Civic Innovation (if one exists in Richmond): evaluate for broader deployment

### What to preserve from the prototype
- The data pipeline (GeoHub API → geocoded results → project cards)
- The plain-language description library or translation prompt used during demo
- Documentation of which layers were used and how they were queried
- The address lookup UX flow

### 30-day next step
Request a 30-minute meeting with Al Wiggins and/or Daniel Klein to demo the prototype and ask: "Would DPW use this? What would need to change for it to be useful in your workflow?"

### 60-day next step
If DPW expresses interest, identify whether City IT can host a lightweight version. Alternatively, assess whether a civic tech nonprofit can maintain an independent version linked from the DPW website.

### 90-day next step
If the tool is being maintained, work with GIS staff to formalize which ArcGIS layers should be designated as the official data source and document a refresh schedule.

---

## Continuation Path: Fleet Operations Visibility Tool

### Most likely continuation scenario
The fleet operations tool has a harder path because the GPS infrastructure is incomplete. The most realistic continuation sequence:
1. The prototype serves as a reference design: "this is what the tool will look like when GPS data is available"
2. DPW fleet management reviews the mock GPS schema and confirms or adjusts it
3. When GPS installation is complete, the tool is connected to the real data feed
4. A public-facing version is released for snow removal season

### Who to engage after the hackathon
- DPW fleet operations management: share the prototype and the schema design
- DPW IT: understand the GPS system being installed and the data format it will produce
- Al Wiggins (DCAO Operations): champion for operational modernization

### What to preserve from the prototype
- The documented GPS data schema (even if synthetic)
- The route completion dashboard UX
- The zone-based schedule display
- Any supervisor workflow improvements embedded in the design

### 30-day next step
Get confirmation from DPW of the GPS schema they are implementing. Ask: "Here is the schema we built against — does this match what the GPS system will produce?"

### 60-day next step
Once schema is confirmed, refine the prototype to match the real data format. Identify a timeline for GPS installation completion.

### 90-day next step
Pilot the internal supervisor dashboard with one or two supervisors during a street cleaning cycle using manual input (supervisor marks routes complete). This builds familiarity before GPS data is available.

---

## Partner Organizations

### Groundwork RVA (Nathan Burrell)
Focus: environmental justice and community-based infrastructure. Relevant to both problems as a community liaison for residents affected by construction.

### James River Association (Justin Doyle or Shannon Orcutt)
Focus: waterway and watershed health. Relevant if the tool surfaces storm drainage or green infrastructure projects.

### Partnership for Smarter Growth (Richard Hankins)
Focus: land use, transportation, and sustainable communities. Directly aligned with transportation project visibility. Could be a user and advocate for the tool.

---

## Risk: Both Statements Lack Continuation Pathway

The rubric flagged this explicitly. To convert a "Strong" prototype into something that continues:
- You need one named City contact who will advocate internally
- You need a hosting plan (City IT, civic tech org, or team maintenance)
- You need to document data dependencies clearly so another developer can maintain it
- You need to define what "success" looks like one year out (e.g., tool is embedded on rva.gov/public-works)

Without these, the prototype ends at the hackathon. The continuation plan is the most valuable non-code deliverable a team can produce by Sunday.
