# Data Index — A Thriving and Sustainable Built Environment

This index describes known public data sources relevant to hackathon projects in this pillar. Entries are labeled by verification status.

**Verification labels:**
- **Verified:** confirmed accessible and described accurately
- **Likely:** expected to exist based on known City infrastructure, but specific layer names/URLs not confirmed
- **Unknown:** referenced in problem statements but details not yet confirmed

---

## Richmond GeoHub / ArcGIS

**Source:** https://richmond-geo-hub-cor.hub.arcgis.com/
**Owner:** City of Richmond GIS
**Access:** Public web browser; REST API available for most layers
**Status:** Verified (hub exists); specific DPW project layers — Likely

### Likely relevant layers (verify names before building)
- Transportation projects layer (safety improvements, streetscape)
- Road network / centerline layer
- Neighborhood boundaries
- Zoning districts
- Construction permit activity (may overlap with DPW projects)

### Notes
- Layer names and public availability change; verify on the hub before committing to a specific layer in your build
- REST API endpoints are generally available for public layers; check the layer's service page for URL
- ArcGIS Feature Service responses can be queried by bounding box or attribute filter

---

## Richmond Open Data Portal (Socrata)

**Source:** https://data.richmondgov.com/
**Owner:** City of Richmond
**Access:** Public; Socrata API available
**Status:** Verified (portal exists); DPW-specific datasets — Likely

### Likely relevant datasets
- Capital improvement project data
- Road maintenance request data (311-adjacent)
- Street cleaning schedules (may exist as zone data)
- Historical permit data

### Notes
- Datasets update on varying schedules; some are updated infrequently
- Socrata API supports filtering and GeoJSON export

---

## DPW Program Pages

**Source:** https://www.rva.gov/public-works (verify current URL)
**Owner:** City of Richmond Department of Public Works
**Access:** Public HTML
**Status:** Likely (DPW pages exist; specific project listing URLs not confirmed)

### Likely relevant content
- Active transportation project listings by program
- Grant-funded project descriptions
- Streetscape and safety improvement program descriptions
- Contact information for project inquiries

### Notes
- Information is scattered across multiple program pages
- Descriptions are written in technical language intended for professional audiences
- Pages may not reflect current project status in real time

---

## VDOT Project Data

**Source:** https://www.virginiadot.org/projects/
**Owner:** Virginia Department of Transportation
**Access:** Public
**Status:** Likely relevant for state-maintained roads within Richmond city limits

### Notes
- Some roads in Richmond are state-maintained (VDOT) not City-maintained (DPW)
- VDOT has its own project tracker with status information
- Teams should understand which road type applies before asserting project responsibility

---

## GRTC Routes and Service Areas

**Source:** https://ridegrtc.com/
**Owner:** GRTC Transit System
**Access:** Public; GTFS feed available
**Status:** Verified (GRTC data exists); relevance depends on project scope

### Notes
- Relevant if team is examining infrastructure impacts on transit service
- GTFS data includes stop locations and routes
- Infrastructure projects that affect bus stops or routes are a connection point

---

## GPS Fleet Data (Future — Not Yet Available)

**Source:** DPW fleet management system (GPS being installed)
**Owner:** City of Richmond DPW
**Access:** Not publicly available; internal system
**Status:** Unknown / Not ready (D3=2)

### What will exist when GPS is fully installed
- Vehicle location pings (lat/lng, timestamp)
- Route assignment metadata (vehicle_id, route_id, service_type)
- Route completion status

### What teams can do now
- Design against a synthetic schema (see `03_artifacts/dpw_data_landscape.md`)
- Build a mock dashboard that shows what the interface would look like with real data
- Document the schema clearly so the tool is ready to connect when data is available

### What teams cannot do
- Display real-time vehicle locations
- Show actual route completion percentages
- Claim the tool works with live data

---

## Federal Infrastructure Grant Data

**Source:** USASpending.gov, RAISE/TIGER grant databases
**Owner:** Federal agencies (USDOT, FTA, etc.)
**Access:** Public
**Status:** Likely relevant for context; project-level grant data for Richmond is verifiable

### Notes
- Some Richmond transportation projects are federally funded and appear in federal databases
- Useful for adding grant context to project descriptions (e.g., "This project is funded by a federal RAISE grant")
- Not a primary data source for address-level project lookup

---

## Snow Removal and Street Cleaning Zone Data

**Source:** DPW (currently manual/internal)
**Owner:** City of Richmond DPW
**Access:** Unknown — zone boundaries may or may not be publicly available
**Status:** Unknown

### Notes
- This is a key gap for fleet operations MVP
- Even approximate zone data (e.g., by council district or street classification) would enable a schedule-based status display
- Teams may need to create synthetic zone data or request zone information from DPW contacts
