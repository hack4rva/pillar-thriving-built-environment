# Data Index — A Thriving and Sustainable Built Environment

This index describes known public data sources relevant to hackathon projects in this pillar. Entries are labeled by verification status.

**Verification labels:**
- **Verified:** confirmed accessible and described accurately
- **Likely:** expected to exist based on known City infrastructure, but specific layer names/URLs not confirmed
- **Unknown:** referenced in problem statements but details not yet confirmed

---

## CIP Dashboard Project Export (CSV)

**Source:** `research/COR_CIP_Dashboard_projects.csv`
**Owner:** City of Richmond DPW GIS Team — provided by Chad Phillips (Asset Manager, 804-646-6565)
**Access:** File in this repository
**Status:** Verified — 125 projects as of March 2026

### Fields
`OBJECTID, Shape__Area, Shape__Length, Name, Category, Cost, Description, Location, Manager, Email, Phase, Status, Contact, Completion`

### Project categories
| Category | Count |
|---|---|
| Road Improvements | 59 |
| Pedestrian and Bike | 29 |
| Parks & Recreation | 12 |
| Public Art | 7 |
| Bridge Repair | 6 |
| New Facility Construction | 5 |
| Stormwater | 2 |
| Water / Sewer / Facility Maintenance | 3 |

### Phase values observed
Planning/Design, Pre-Construction, Construction, Completed, TBD

### Notes
- Location field is descriptive text (street ranges, intersections), not geocoded points — teams building a map will need to geocode or pull geometry from the ArcGIS layer
- Project manager emails are included; do not expose individual contacts in a public-facing UI without confirming that is appropriate
- Data is from the live CIP Dashboard, updated quarterly
- Project manager contact info is in the dataset for team use in prototyping/validation only

---

## CIP Dashboard (Live — ArcGIS REST FeatureService)

**Source:** https://experience.arcgis.com/experience/86362b12585448b583b74a3a2ae32745
**Owner:** City of Richmond DPW (`michael.nixon-garrison_cor`)
**Access:** Public — confirmed live March 2026
**Status:** Verified — REST endpoint tested and responding

### ArcGIS webmap ID
`270285e87d684a95bd1ebd9a078aa6df`

### Direct FeatureService REST endpoint (confirmed live)
```
https://services1.arcgis.com/k3vhq11XkBNeeOfM/arcgis/rest/services/FY23_CIP_Polygon_Layers/FeatureServer/0
```

### Query all projects as GeoJSON (copy-paste ready)
```
https://services1.arcgis.com/k3vhq11XkBNeeOfM/arcgis/rest/services/FY23_CIP_Polygon_Layers/FeatureServer/0/query?where=1%3D1&outFields=*&f=geojson
```

### Geometry type
**Polygon** — projects have actual spatial geometry, not just text descriptions. Teams do NOT need to geocode the CSV location field; pull from the FeatureService to get shapes on a map.

### Capabilities confirmed
- `supportsAdvancedQueries: true` — filter by category, phase, location, etc.
- `supportsStatistics: true`
- GeoJSON output supported
- `maxRecordCount: 2000` — all 125 projects returnable in a single request
- Data last edited: March 2026 (matches the CSV export)

### Council Districts layer (also confirmed live)
```
https://services1.arcgis.com/k3vhq11XkBNeeOfM/arcgis/rest/services/CouncilDistrictTIGER/FeatureServer/0
```

### Notes
- Updated quarterly by DPW GIS Team
- The CSV in this repo is a snapshot of attributes only; use the FeatureService to get polygon geometry for mapping
- `supportsAdvancedQueries` means teams can do spatial queries (e.g., projects within a bounding box or intersecting a point)

---

## Richmond 300 Master Plan

**Source:** https://www.rva.gov/planning-development-review/master-plan
**Owner:** City of Richmond Department of Planning and Development Review
**Access:** Public
**Status:** Verified (site confirmed live)

### Notes
- Richmond's long-range comprehensive plan
- Many CIP projects implement goals from Richmond 300 — teams can surface this policy alignment to give residents context for *why* projects are happening
- Goal categories include mobility, housing, green infrastructure, economic vitality, and neighborhood character
- Manual mapping of CIP projects to Richmond 300 goals would be a high-value contribution but is not yet done

---

## Richmond GeoHub / ArcGIS

**Source:** https://richmond-geo-hub-cor.hub.arcgis.com/
**Owner:** City of Richmond GIS
**Access:** Public web browser; REST API available for most layers
**Status:** Verified (hub exists); specific DPW project layers — Verified via CIP webmap

### Verified layers
- Capital Projects Feature Service (5 layers) — backs the CIP Dashboard
- CIP Points Feature Service — `services5.arcgis.com/i75zh9vlhYUpqwjr/...`
- Council Districts
- Road centerlines (VGIN/City)

### Notes
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

## Winter Maintenance Plan 2025-2026 (WMP)

**Source:** `research/WMP 2025-2026.pdf`
**Owner:** City of Richmond DPW — provided by Daniel Wagner (City Transportation Planner) and Chad Phillips (DPW GIS Team)
**Access:** File in this repository
**Status:** Verified

### Snow route priority classification (begins pg. 67)
- **Priority 1:** Primary arterials and emergency access routes — plowed and treated first
- **Priority 2:** Secondary arterials and collector roads — addressed after P1 is complete
- **Priority 3:** All remaining streets (neighborhood/residential roads) — not listed individually; defined as any street not on P1 or P2 lists

Only P1 and P2 routes are named in the document. P3 is the implicit residual.

### Notes
- Teams can extract P1/P2 street names from pg. 67 onward and build a lookup tool against them
- Route geometries (GIS lines) are not included in the PDF — teams needing spatial data may need to request a shapefile from DPW or manually geocode street names
- P3 streets do not need to be listed — any address not matched to a P1/P2 route is P3 by definition

---

## Street Cleaning Schedule (Public Page)

**Source:** https://www.rva.gov/public-works/street-cleaning
**Owner:** City of Richmond DPW
**Access:** Public
**Status:** Verified (URL confirmed by DPW contact)

### Notes
- Contains public-facing schedule information for street cleaning operations by area
- Teams building a fleet MVP should reference this page for zone/schedule structure
- Zone boundary data as GIS files is not yet available in this repository

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
- Use WMP priority route classification as the schedule backbone
- Design against a synthetic schema (lat/lng, timestamp, route_id, completion_pct, service_type)
- Build a mock dashboard that shows what the supervisor interface would look like with real data
- Document the schema clearly so the tool is ready to connect when data is available

### What teams cannot do
- Display real-time vehicle locations
- Show actual route completion percentages
- Claim the tool works with live data
