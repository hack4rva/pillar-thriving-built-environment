> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# Ship in 48 hours: Richmond Project Finder with Leaflet + OpenCage

## Executive Summary

Building a functional Transportation Project Visibility tool in 48 hours requires ruthlessly scoping down to the most reliable, lowest-friction technologies. You do not need deep ArcGIS expertise to succeed. By leveraging a single public FeatureServer layer from the Richmond GeoHub, you can execute simple REST proximity queries to fetch GeoJSON data directly. 

To minimize integration risk, the MVP should use **Leaflet** for map rendering (zero API keys required) and **OpenCage** for geocoding (generous 2,500 requests/day free tier). Because live demos are inherently risky, the architecture must include a robust fallback strategy using cached GeoJSON and client-side spatial filtering via **Turf.js**. This ensures that even if external APIs fail or rate-limit you during the presentation, the application remains fully functional.

## Goal and Constraints

The objective is to deliver a credible, working MVP in 48 hours without requiring deep ArcGIS fluency. 
* **Key takeaway:** Limit the scope to one public FeatureServer layer, one proximity query, and a thin Leaflet front-end to de-risk delivery. Avoid complex ArcGIS SDKs and rely on standard web technologies (REST, GeoJSON, JavaScript).

## Data Source and Minimum Fetch

The minimum viable data fetch relies on a single, publicly accessible layer that already contains all the necessary fields for a useful user interface.

### Richmond Transportation Projects Layer
The Richmond GeoHub exposes a "Transportation Projects" FeatureServer layer (ID: 0) with polygon geometry [1]. It supports standard formats including JSON, geoJSON, and PBF, and has a `MaxRecordCount` of 2000 [1]. 

To power clear, informative project cards while minimizing payload size, request only the essential `outFields`:
* `PROJECT_NAME`
* `PROJECT_TYPE`
* `STATUS`
* `YEAR`
* `PROJECT_NUMBER`
* `CONTACT_INFORMATION`
* `COMMENTS` [1]

Ensure you include `returnGeometry=true` to allow for polygon highlighting on the map and client-side distance calculations if needed.

## Spatial Query Design

ArcGIS REST APIs natively support proximity searches, allowing you to filter projects server-side before they reach the client.

### Server-Side Distance Filtering
You can query the FeatureServer using a point geometry and a distance buffer. The required parameters for a 0.5-mile search are:
* `geometry`: The longitude and latitude (e.g., `-77.4360,37.5407`) [2]
* `geometryType`: `esriGeometryPoint` [3] [4]
* `inSR`: `4326` (WGS84 spatial reference for standard lat/lon) [2]
* `spatialRel`: `esriSpatialRelIntersects` [3] [4]
* `distance`: `0.5` [3] [4]
* `units`: `esriSRUnit_StatuteMile` [3] [4]
* `f`: `geojson` (to return standard GeoJSON instead of Esri JSON) [2]

If the layer does not support `supportsQueryWithDistance`, the fallback is to fetch a broader set of features and filter them client-side.

## Geocoding Strategy

For a hackathon, you need a geocoder that is free, reliable, and easy to implement without unexpected billing surprises.

### Geocoding Provider Comparison

| Provider | Free/Trial Allowance | Rate Limit | Auth Required | Notable Risks |
| :--- | :--- | :--- | :--- | :--- |
| **OpenCage** | 2,500 requests/day [5] [6] | 1 request/sec [5] [6] | API Key | Hard limits; returns `402` or `429` errors if exceeded [6] |
| **Nominatim (OSM)** | Unknown/Varies | Strict Fair Use | None | High risk of being blocked during a demo if policies aren't strictly followed. |
| **Esri World Geocoding** | Unknown | Unknown | Token | Requires Esri developer account and credit management. |

**Action Plan:** Use OpenCage. The 2,500 requests/day limit is more than enough for a 48-hour build and demo [5] [6]. However, because of the strict 1 request/second limit [5] [6], you must implement a throttle. Pre-geocode 5–10 demo addresses to eliminate live-call risk during the actual presentation.

## Map Rendering Choice

The choice of map library dictates how much time you spend managing API keys versus building features.

### Web Map Libraries Comparison

| Library | API Key Required | Free Tier | Vector/3D Support | Bundle Size | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Leaflet** | No [7] | N/A | No | ~42KB [8] | Uses OSM tiles; requires proper attribution [7]. |
| **Mapbox GL JS** | Yes [8] | 50,000 map loads/mo [9] [8] | Yes [8] | ~300KB [8] | Requires account setup and token management. |
| **MapLibre GL JS** | No (for renderer) [8] | N/A | Yes [8] | ~290KB [8] | Requires a third-party tile provider [8]. |

**Action Plan:** Use Leaflet. It requires zero tokens, initializes instantly, and works with OpenStreetMap tiles out of the box [7]. This is the fastest path to a working MVP. Ensure you include the obligatory OSM copyright attribution [7].

## Plain-language Descriptions

Given the 48-hour constraint and the risk of live AI-generation failures, **pre-written descriptions are the safest approach**. 

Draft plain-language blurbs for 5–10 specific sample projects using the `PROJECT_NAME`, `PROJECT_TYPE`, `STATUS`, and `COMMENTS` fields [1]. Keep them under 60 words and strip out bureaucratic acronyms. If you want to demonstrate future capabilities, you can add an "AI-Generated Summary" UI badge to these pre-written blurbs to show stakeholders the intended product vision without taking on the technical risk of live LLM API calls during the hackathon.

## Technical Architecture

The pipeline from user input to rendered map should be linear and observable.

### Address-to-Nearby-Projects Pipeline
1. **Frontend:** A simple HTML/JS or React/Vite app with a search input, a Leaflet map container, and a results list.
2. **Geocoding:** User submits an address -> OpenCage API converts it to Lat/Lon (throttled to 1 rps) [5] [6].
3. **Proximity Query:** Construct the ArcGIS REST URL using the Lat/Lon, `distance=0.5`, and `units=esriSRUnit_StatuteMile` [3] [4].
4. **Sorting:** If the API returns unsorted results, use Turf.js `turf.distance()` to sort the GeoJSON features by proximity to the user's point [10].
5. **Rendering:** Pass the GeoJSON to Leaflet to draw polygons, and map the properties to the UI project cards.

## Fallback Strategy

APIs fail, especially during live demos. You must have a fallback if the GeoHub REST API returns errors or if OpenCage rate-limits you.

### Cached GeoJSON and Client-Side Filtering
1. **Local Cache:** Download a static GeoJSON export of the Transportation Projects layer (capped at the 2000 `MaxRecordCount` [1]) and bundle it with your app (`projects-cache.geojson`).
2. **Client-Side Logic:** If the live fetch fails, load the local GeoJSON. Use Turf.js to create a buffer around the user's point (`turf.buffer(point, 0.5, {units: 'miles'})`) [11], and filter the cached polygons that intersect this buffer.
3. **Graceful UI:** Display an "Offline Mode" or "Cached Data" badge so the audience knows the app gracefully degraded rather than crashing.

## MVP UX Decisions

The user experience must handle edge cases smoothly to maintain trust.

### Handling Zero Results
If there are no projects within 0.5 miles, **do not show an empty screen**. 
* **Action:** Auto-expand the search radius to 2 miles (either via a second API call or client-side Turf.js filtering [10]) to find the nearest 3 projects. 
* **Messaging:** Display a clear banner: *"No projects found within 0.5 miles. Showing the nearest projects in your area."*

### Project Card Display
Based on the available schema [1], cards should display:
* **Title:** `PROJECT_NAME`
* **Category:** `PROJECT_TYPE`
* **Status & Year:** `STATUS` (e.g., Under Construction) | `YEAR`
* **Details:** `COMMENTS` (or the pre-written plain language description)
* **Contact:** `CONTACT_INFORMATION`

## Demo-Ready Threshold and "Definition of Done"

For a 48-hour hackathon, "demo-ready" means the application can survive a live presentation without crashing.

**Definition of Done:**
1. **Working UI:** Leaflet map renders with OSM tiles and proper attribution [7].
2. **Offline Reliability:** The app successfully runs a proximity search from a pre-geocoded address list using the cached GeoJSON and Turf.js.
3. **Live Mode (Optional):** A toggle exists to switch to live API calls, proving the OpenCage and GeoHub integrations work.
4. **Data Threshold:** The UI successfully displays at least 3 real projects with populated data fields [1].
5. **Error Handling:** The UI explicitly handles 0-result scenarios and displays rate-limit warnings (e.g., OpenCage `402` or `429` errors [6]).

## Appendix: Sample Requests and Snippets

### Core Data Pipeline Sketch

```javascript
// 1. Geocode Address (OpenCage)
async function getCoordinates(address) {
 // Implement 1 rps throttle here
 const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=YOUR_KEY`);
 const data = await response.json();
 return data.results[0].geometry; // {lat, lng}
}

// 2. Fetch Nearby Projects (ArcGIS REST)
async function getNearbyProjects(lat, lng, distance = 0.5) {
 const baseUrl = "https://services2.arcgis.com/Q6Lq3evZUGfPrN7o/arcgis/rest/services/Capital%20Projects/FeatureServer/0/query";
 const params = new URLSearchParams({
 where: "1=1",
 geometry: `${lng},${lat}`,
 geometryType: "esriGeometryPoint",
 inSR: "4326",
 spatialRel: "esriSpatialRelIntersects",
 distance: distance,
 units: "esriSRUnit_StatuteMile",
 outFields: "PROJECT_NAME,PROJECT_TYPE,STATUS,YEAR,COMMENTS,CONTACT_INFORMATION",
 returnGeometry: "true",
 f: "geojson"
 });
 
 try {
 const response = await fetch(`${baseUrl}?${params.toString()}`);
 return await response.json();
 } catch (error) {
 console.warn("Live API failed, falling back to local cache");
 return getProjectsFromCache(lat, lng, distance);
 }
}
```

## References

1. *Layer: Transportation Projects (ID:0)*. https://services2.arcgis.com/Q6Lq3evZUGfPrN7o/arcgis/rest/services/Capital%20Projects/FeatureServer/0
2. *Querying ArcGIS REST API using Lat Long - Geographic Information Systems Stack Exchange*. https://gis.stackexchange.com/questions/457607/querying-arcgis-rest-api-using-lat-long
3. *Query (Feature Service/Layer) | ArcGIS REST APIs | Esri Developer*. https://developers.arcgis.com/rest/services-reference/enterprise/query-feature-service-layer/
4. *Query (Map Service/Layer) | ArcGIS REST APIs | Esri Developer*. https://developers.arcgis.com/rest/services-reference/enterprise/query-map-service-layer/
5. *OpenCage Pricing - Geocoding API and Geosearch
*. https://opencagedata.com/pricing
6. *OpenCage Geocoding API Documentation
*. https://opencagedata.com/api
7. *Quick Start Guide - Leaflet - a JavaScript library for interactive maps*. https://leafletjs.com/examples/quick-start/
8. *Mapbox GL JS vs Leaflet vs MapLibre — PkgPulse Blog*. https://www.pkgpulse.com/blog/mapbox-vs-leaflet-vs-maplibre-interactive-maps-2026
9. *Pricing | Mapbox*. https://www.mapbox.com/pricing
10. *distance | Turf.js*. https://turfjs.org/docs/api/distance
11. *buffer | Turf.js*. https://turfjs.org/docs/api/buffer