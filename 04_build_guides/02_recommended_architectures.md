# Recommended Architectures — A Thriving and Sustainable Built Environment

Lightweight, weekend-buildable architectures for each MVP shape. Prefer simplicity over scale.

---

## Architecture A — Static Map App (Explorer Map or Address Lookup)

**Best for:** Teams that want a map-based experience without a backend.

```
[Browser app — Vanilla JS, React, or Vue]
    |
    |-- [Leaflet.js or Mapbox GL] (map rendering)
    |-- [Fetch GeoJSON from GeoHub REST API] (live or cached)
    |-- [Nominatim geocoding] (address → coordinates)
    |-- [Point-in-polygon or spatial query] (find nearby projects)
    |-- [Project card component] (display results)
```

**Stack:** HTML/CSS/JS, Leaflet.js, GeoHub REST API, Nominatim
**Hosting:** GitHub Pages, Vercel, or Netlify (free, zero ops)
**Demo risk:** Low if GeoHub layers are verified in advance

---

## Architecture B — Next.js Frontend + API Route (Address Lookup with Backend)

**Best for:** Teams that want server-side geocoding and caching.

```
[Next.js app]
    |
    |-- [/api/projects] — fetches and caches GeoHub data
    |-- [/api/geocode] — proxies Nominatim or ESRI geocoding
    |-- [Project results component] — renders project cards
    |-- [Map component] — optional Leaflet embed
```

**Stack:** Next.js, Tailwind CSS, GeoHub REST API
**Hosting:** Vercel (free tier)
**Demo risk:** Medium — requires API routes to function; test before demo

---

## Architecture C — Static JSON + Map (Fully Offline Demo)

**Best for:** Teams worried about live API reliability during the demo.

```
[Preloaded project data as GeoJSON file (fetched before demo)]
    |
    [Leaflet.js map — loads data from local file]
    |
    [Address lookup — uses preloaded street network for matching]
```

**Stack:** HTML/JS, Leaflet.js, pre-downloaded GeoHub data
**Hosting:** Any static host or local
**Demo risk:** Very low — no external API calls during demo; data may be slightly stale but reliable

**Note:** Always have this as a fallback if live API calls fail during the demo.

---

## Architecture D — Schedule Display App (Fleet Operations)

**Best for:** Teams building the Street Service Status Tracker.

```
[JSON schedule data file (synthetic)]
    |
    [Zone GeoJSON file (synthetic)]
    |
    [Browser app]
        |-- [Leaflet map with zone polygons]
        |-- [Point-in-polygon check for address input]
        |-- [Schedule lookup by zone_id]
        |-- [Status display component]
    |
    [Optional: admin form to update zone status]
```

**Stack:** HTML/JS or React, Leaflet.js, local JSON files
**Hosting:** GitHub Pages (free)
**Demo risk:** Low — no external API dependencies; fully synthetic

---

## Architecture E — Plain-Language Translator

**Best for:** Teams building the AI translation component.

```
[Static list of technical descriptions (JSON file)]
    |
    [Browser app]
        |-- [Description selector dropdown]
        |-- [Display: technical | plain-language (pre-generated or API)]
        |-- [Optional: Q&A component using AI API]
```

**Stack:** React or Vue, OpenAI or Anthropic API for live translation, or pre-generated pairs
**Hosting:** Vercel or Netlify
**Demo risk:** Medium if using live AI API (rate limits, latency); low if using pre-generated pairs

**Recommendation:** Pre-generate 10 translation pairs before demo. Use live API only as a supplementary "try your own" feature.

---

## General Guidance

1. **Test your data source before building.** Verify GeoHub layer names and REST endpoints work before committing to them.
2. **Download a fallback dataset.** Before demo day, download a GeoJSON snapshot of your target layer. If the API fails, serve the snapshot.
3. **Keep the demo path linear.** One address input → one result screen → one click for details. Do not add tabs or complexity that could fail under pressure.
4. **Label everything.** Data source, last updated, "this is a prototype," "not official DPW information" — all labels should be visible, not hidden.
5. **Use council districts as a fallback for neighborhoods.** If neighborhood boundary data is unclear, council district boundaries are a readily available and understandable geographic unit.
