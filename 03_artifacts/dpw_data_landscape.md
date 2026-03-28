> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# DPW Data Landscape — What Is Actually Accessible

This document analyzes what DPW-related data is publicly accessible, what requires integration, and what to use when building against the two targeted problem statements.

---

## What Is Publicly Accessible

### Richmond GeoHub ArcGIS Layers

The Richmond GeoHub (https://richmond-geo-hub-cor.hub.arcgis.com/) hosts public ArcGIS feature layers maintained by the City's GIS team. Key points:

- **Layer availability:** Varies. Some transportation-related layers are public; others require City credentials. Verify each layer before building.
- **Query method:** ArcGIS REST API (`/FeatureServer/0/query`). Most public layers support spatial query (by bounding box or geometry) and attribute query.
- **Common fields:** Layers typically include `OBJECTID`, `Shape`, `project_name` (or similar), `status`, `description`, `start_date`, `end_date`, `project_type`.
- **Coordinate system:** Usually Virginia State Plane or WGS84. Verify and reproject if needed for geocoding.
- **Update frequency:** Varies. Some layers are updated weekly; others less frequently.

**How to explore:** On Richmond GeoHub, each layer has a "View" button. Click "Open in ArcGIS Map Viewer" or "Explore Data" to see fields before building.

**REST API example:**
```
GET https://services.arcgis.com/{service_id}/arcgis/rest/services/{layer_name}/FeatureServer/0/query
  ?where=1%3D1
  &geometry={bounding_box}
  &geometryType=esriGeometryEnvelope
  &spatialRel=esriSpatialRelIntersects
  &outFields=*
  &f=geojson
```

### Richmond Open Data Portal (Socrata)

The Open Data Portal (https://data.richmondgov.com/) hosts CSV and API-accessible datasets. Relevant types:
- Capital improvement project lists (if published)
- 311 service requests (which may include construction-adjacent complaints)
- Road closure notices (if a dataset exists)

**How to explore:** Browse by category (Infrastructure, Transportation). Use the Socrata API (`/resource/{dataset_id}.json`) for programmatic access.

### DPW Program Pages (HTML)

DPW maintains program pages on rva.gov describing active programs. These pages contain:
- Program names and descriptions
- Lists of active projects (sometimes)
- Contact information
- Grant program context

**Limitation:** These pages are written for professional audiences, not residents. Descriptions use engineering and procurement terminology. They are not structured data — any use requires parsing HTML or copying content manually.

**What teams can do:** Use these pages as the source for a plain-language translation exercise. Copy a technical project description, translate it, and use the pair as a demo example.

---

## What Requires Integration (Do Not Build Against)

### DPW Internal Project Management System

DPW uses internal project tracking tools that are not publicly accessible. These may include:
- Project schedules and milestone dates
- Contractor information
- Budget and cost data
- Internal status notes

**Why it matters:** Some project details that would be most useful to residents (exact construction dates, delay notifications) live only in internal systems. A weekend tool cannot access this data.

**Workaround:** Use GeoHub data for what is available publicly; acknowledge the gap in demo.

### DPW Fleet GPS System (Under Installation)

GPS devices are being installed on DPW fleet vehicles. As of March 2026, this infrastructure is incomplete. The eventual GPS data will include:
- Vehicle location pings
- Route assignment metadata
- Speed and heading

**Why it matters:** Any fleet visibility tool cannot use live GPS data. The tool must be built against a synthetic schema.

**Synthetic GPS Schema (for Fleet Operations MVP):**
```
{
  "vehicle_id": "DPW-PLOW-042",
  "route_id": "SNOW-NORTH-07",
  "service_type": "snow_removal",
  "timestamp": "2026-02-14T03:42:00Z",
  "lat": 37.5407,
  "lng": -77.4360,
  "speed_mph": 12,
  "heading_deg": 270,
  "route_completion_pct": 63,
  "segment_id": "N7-SEG-12",
  "status": "in_progress"
}
```

Teams should document this schema and build their mock dashboard against it so the tool can be connected to real data when GPS installation is complete.

---

## What Can Be Extracted vs. What Requires Integration

| Data need | Source | Accessible? | Method |
|-----------|--------|-------------|--------|
| Project locations (map coordinates) | GeoHub | Likely | ArcGIS REST API |
| Project names | GeoHub | Likely | ArcGIS REST API |
| Project status (planned/active/complete) | GeoHub | Likely | ArcGIS REST API field |
| Plain-language descriptions | None public | No | Must be written/generated |
| Project timeline (start/end dates) | GeoHub (if included) | Maybe | Verify field availability |
| Contact info per project | DPW program pages | Partial | Manual extraction |
| Street cleaning schedules by zone | Internal | No | Must be mocked or requested |
| Snow removal route assignments | Internal | No | Must be mocked |
| GPS vehicle locations | Fleet system | No (incomplete) | Must be mocked |
| 311 request data | Open Data Portal | Likely | Socrata API |
| Road network (for geocoding) | GeoHub / OSM | Yes | ArcGIS or OpenStreetMap |

---

## Recommended Data Strategy by MVP Shape

### Address Lookup Tool (Concept 1)
- Use GeoHub project layer for project data
- Use a geocoding service (Nominatim/OSM or ESRI geocoding) for address → coordinates
- Use spatial query to find projects near the input coordinates
- Display GeoHub field data; supplement with manually written plain-language descriptions for demo

### Explorer Map (Concept 2)
- Load GeoHub project layer directly as a GeoJSON or tile layer
- Use Leaflet.js or Mapbox GL for rendering
- Add popups with project card content from GeoHub fields
- No additional data sources required for demo

### Plain-Language Translator (Concept 3)
- Source a set of real technical project descriptions from GeoHub or DPW pages
- Use AI (with clear labeling) or manually written translations
- No live data pipeline required; static example pairs work for demo

### Schedule-Based Service Tracker (Concept 5)
- Create synthetic zone data (GeoJSON polygons, e.g., by council district)
- Create a static or editable schedule table (zone, service_type, scheduled_date, status)
- Do not use GPS or claim live data
- Document that zone boundaries are illustrative

### Fleet Dashboard (Concept 6)
- Use the synthetic GPS schema above
- Generate a set of mock records (15–20 vehicles, 10–15 routes, varying completion percentages)
- Build dashboard against this static mock data
- Label clearly: "Demo mode — using synthetic GPS data"
