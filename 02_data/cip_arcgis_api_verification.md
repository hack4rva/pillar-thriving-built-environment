# CIP Dashboard — ArcGIS REST API Verification

This document records what was verified, how to replicate each check, and the confirmed capabilities of the live service.

**Verified:** March 27, 2026  
**Verified by:** HTTP requests to public ArcGIS endpoints (no auth required, no special tools)

---

## Endpoint Under Verification

```
https://services1.arcgis.com/k3vhq11XkBNeeOfM/arcgis/rest/services/FY23_CIP_Polygon_Layers/FeatureServer/0
```

---

## Replication Steps

All steps use only a browser or `curl`. No API keys, no login, no special software.

---

### Step 1 — Confirm the webmap item exists and is public

**Request:**
```
GET https://www.arcgis.com/sharing/rest/content/items/270285e87d684a95bd1ebd9a078aa6df?f=json
```

**What to look for in the response:**
- `"access": "public"` — confirms no authentication required
- `"title": "City of Richmond CIP Dashboard"` — confirms this is the right item
- `"owner": "michael.nixon-garrison_cor"` — City of Richmond account
- `"type": "Web Map"` — this is an ArcGIS webmap

**curl:**
```bash
curl "https://www.arcgis.com/sharing/rest/content/items/270285e87d684a95bd1ebd9a078aa6df?f=json"
```

---

### Step 2 — Extract the backing FeatureService URL from the webmap

**Request:**
```
GET https://www.arcgis.com/sharing/rest/content/items/270285e87d684a95bd1ebd9a078aa6df/data?f=json
```

**What to look for in the response:**  
Inside `operationalLayers[0]`, find:
```json
"url": "https://services1.arcgis.com/k3vhq11XkBNeeOfM/arcgis/rest/services/FY23_CIP_Polygon_Layers/FeatureServer/0"
```

This is the actual FeatureService powering the dashboard. It is not documented anywhere publicly — you get it by inspecting the webmap definition.

**curl:**
```bash
curl "https://www.arcgis.com/sharing/rest/content/items/270285e87d684a95bd1ebd9a078aa6df/data?f=json"
```

---

### Step 3 — Confirm the FeatureService is live and inspect its schema

**Request:**
```
GET https://services1.arcgis.com/k3vhq11XkBNeeOfM/arcgis/rest/services/FY23_CIP_Polygon_Layers/FeatureServer/0?f=json
```

**What to look for in the response:**

| Property | Expected value | Meaning |
|---|---|---|
| `geometryType` | `esriGeometryPolygon` | Projects have real polygon shapes |
| `supportsAdvancedQueries` | `true` | WHERE, ORDER BY, spatial filters work |
| `supportsPagination` | `true` | Can page through results |
| `supportsStatistics` | `true` | Aggregate queries work |
| `supportsQueryWithDistance` | `true` | Proximity queries work |
| `maxRecordCount` | `2000` | All 125 projects returned in one call |
| `supportedQueryFormats` | `JSON, geoJSON, PBF` | GeoJSON output available |

**Fields confirmed present** (matching the CSV export):

| Field | Type |
|---|---|
| OBJECTID | OID |
| Name | String(256) |
| Category | String(256) |
| Cost | String(256) |
| Description | String(1000) |
| Location | String(256) |
| Manager | String(256) |
| Email | String(256) |
| Phase | String(256) |
| Status | String(256) |
| Contact | String(256) |
| Completion | String(256) |
| Shape__Area | Double |
| Shape__Length | Double |

**curl:**
```bash
curl "https://services1.arcgis.com/k3vhq11XkBNeeOfM/arcgis/rest/services/FY23_CIP_Polygon_Layers/FeatureServer/0?f=json"
```

---

### Step 4 — Pull all projects as GeoJSON (end-to-end data check)

**Request:**
```
GET https://services1.arcgis.com/k3vhq11XkBNeeOfM/arcgis/rest/services/FY23_CIP_Polygon_Layers/FeatureServer/0/query?where=1%3D1&outFields=*&f=geojson
```

**What to look for:**
- Response is valid GeoJSON (`"type": "FeatureCollection"`)
- Each feature has a `geometry` object with polygon coordinates
- `features` array contains 125 items
- Attribute fields match the schema above

**Paste directly in a browser** — no curl needed.

**curl:**
```bash
curl "https://services1.arcgis.com/k3vhq11XkBNeeOfM/arcgis/rest/services/FY23_CIP_Polygon_Layers/FeatureServer/0/query?where=1%3D1&outFields=*&f=geojson"
```

---

### Step 5 (bonus) — Confirm Council Districts layer is also live

**Request:**
```
GET https://services1.arcgis.com/k3vhq11XkBNeeOfM/arcgis/rest/services/CouncilDistrictTIGER/FeatureServer/0?f=json
```

Found in the same webmap definition as the CIP layer. Useful for spatial joins (e.g., "which council district does this project fall in?").

---

## What Was Not Verified

- The `/query` endpoint was not called in the original verification pass — only the service metadata (Step 3). Step 4 above is the completion of that check.
- No spatial query (point-in-polygon, proximity) was tested — the service descriptor confirms support but a live spatial query was not run.
- Data freshness beyond the `lastEditDate` timestamp (`1773424645661` → March 2026) was not independently confirmed.

---

## Key Finding for Hackathon Teams

Projects have **polygon geometry** in the live service. The CSV in this repo contains attributes only. Teams building a map should query the FeatureService directly — the geometry is already there, no geocoding required.
