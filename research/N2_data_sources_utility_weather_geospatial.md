> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# Building the Next-Gen Public-Service Tracker: Free-Tier Data-Source Playbook for 2026

## Executive Summary

Building a real-time public service tracking system requires navigating a fragmented landscape of utility, weather, and geospatial data sources. While some providers offer robust, documented APIs, much of the critical infrastructure data remains locked behind proprietary maps or restrictive rate limits. 

The most viable path for a 2026 prototype relies heavily on open-source and government data. The National Weather Service (NWS) provides comprehensive, free access to critical forecasts and alerts [1]. For geospatial foundations, OpenStreetMap's Overpass API and the US Census TIGERweb REST services offer extensive, free-of-charge mapping capabilities [2] [3]. However, utility outage data remains highly decentralized. While PG&E offers a public API [4], most utilities require scraping or reliance on aggregators like PowerOutage.us [5]. By strategically combining these free-tier and open-data resources, civic developers can build highly capable tracking systems without incurring enterprise licensing costs.

## Utility Outage Landscape

### Fragmented Electric Utility Feeds
The availability of real-time electric utility outage data varies drastically by provider. PG&E stands out by providing outage data, including affected customers and causes, through a public API and alerts system [4]. In contrast, utilities like Dominion Energy and Con Edison primarily offer customer-facing outage maps. Dominion Energy updates its map information approximately every 15 minutes [6], while Con Edison provides automatic updates to customers who have reported an outage [7]. Because many of these maps do not expose documented public APIs, developers often rely on scraping tools to extract outage IDs and locations [4].

### Aggregators and Historical Data
To bypass the complexity of integrating dozens of individual utility feeds, aggregators provide a unified approach. PowerOutage.us operates a comprehensive power outage intelligence platform offering real-time APIs and historical analytics [5]. For historical analysis and validation, the Department of Energy (DOE) provides the OE-417 dataset. The Electric Emergency Incident and Disturbance Report (Form DOE-417) collects mandatory information on electric incidents and emergencies from utility companies [8] [9]. This data is available in downloadable data tables and annual summaries [10], providing essential metrics to quantify outages associated with major disturbances [11].

### The Scarcity of Water Outage Data
Water utility outage data is significantly less accessible than electric data. There is no centralized API for water outages. Instead, data is typically found scattered across municipal ArcGIS FeatureServers. For example, some jurisdictions publish specific layers such as "BoilWaterAdvisoryArea" or general "Water_Network" maps that organize water, sewer, and stormwater data [12] [13].

## Weather Data Landscape

### Government vs. Commercial Weather APIs
The National Weather Service (NWS) API is a cornerstone for public service tracking, allowing developers access to critical forecasts, alerts, and observations [1]. Commercial alternatives offer varying free tiers and specialized data layers. Tomorrow.io provides an AI-powered weather API with over 60 data layers and a free plan ideal for testing and small-scale use cases [14] [15]. OpenWeatherMap offers global weather data APIs covering current conditions, forecasts, and historical archives [16]. Weatherbit also provides current, forecast, and historical data, specifically noting its network of sub-hourly reporting weather stations [17] [18].

### Personal Weather Station Networks
For hyper-local data, Personal Weather Station (PWS) networks can be leveraged. Users of Weather Underground can access the weather data their PWS reports by generating an API key through their member settings [19].

## Geospatial Foundations

### Open-Source Mapping and Geocoding
OpenStreetMap (OSM) provides robust, free-of-charge infrastructure data. The Overpass API acts as a database engine to query OSM data, operating under the GNU AGPL v3 license [2]. For geocoding, OSM's Nominatim service is available, though it enforces a strict usage policy of an absolute maximum of 1 request per second and prohibits heavy uses or systematic queries like auto-complete search [20]. 

### Government and Commercial Geospatial Layers
The US Census Bureau offers the TIGERweb GeoServices REST API, providing a standardized way for web clients to communicate with their geographic information system servers [3]. The USGS National Map offers vector data downloads in bulk by special request [21]. 

Commercial providers offer scalable but metered solutions. Mapbox provides a free tier for up to 50,000 monthly map loads for its GL JS library and 100,000 monthly requests for its Temporary Geocoding API [22]. Google Maps Platform operates on a pay-as-you-go model with subscription plans starting at $100/month for 50,000 monthly calls for foundational capabilities like Dynamic Maps and Geocoding [23]. Esri's ArcGIS Living Atlas provides extensive content, though managing API access and privileges is required for enterprise administration [24] [25].

## Real-Time Traffic & Routing

### Traffic APIs and Routing Engines
Integrating real-time traffic is crucial for calculating accurate ETAs for service vehicles. TomTom offers a highly accessible free tier, providing up to 2,500 free daily requests for their traffic API, which includes real-time information about speed limits and incidents [26] [27] [28]. INRIX provides programmatic access to rich traffic and parking-related data sets in real time, though it requires starting a free trial [29] [30]. Waze for Cities partners directly with municipalities to provide real-time traffic data to improve road safety and reduce congestion, utilizing specific data feed structures [31] [32].

## API Catalog (Key Sources)

| API Name | Provider | Primary Use Case | Access / Free Tier Limits |
|---|---|---|---|
| NWS API | National Weather Service | Forecasts, alerts, observations | Free, public access [1] |
| Tomorrow.io API | Tomorrow.io | Hyperlocal weather, 60+ layers | Free plan available for testing [14] [15] |
| OpenWeatherMap API | OpenWeather | Current, forecast, historical weather | Free tier available [16] |
| Weatherbit API | Weatherbit | Sub-hourly current conditions | Free tier available [17] [18] |
| PG&E Outage API | PG&E | Electric outage locations and causes | Public API [4] |
| PowerOutage.us API | PowerOutage.us | Aggregated national outage data | Commercial, enterprise platform [5] |
| Overpass API | OpenStreetMap | Infrastructure and road network queries | Free, GNU AGPL v3 [2] |
| Nominatim | OpenStreetMap | Geocoding | Free, max 1 request/second [20] |
| TIGERweb REST API | US Census | Administrative boundaries, roads | Free, public access [3] |
| Mapbox APIs | Mapbox | Vector tiles, routing, geocoding | 50k map loads / 100k geocodes free [22] |
| TomTom Traffic API | TomTom | Real-time traffic and speed limits | 2,500 free daily requests [26] [27] |
| INRIX Traffic API | INRIX | Traffic and parking analytics | Free trial available [29] [30] |

*Takeaway: The ecosystem provides enough free-tier allowances to build a comprehensive prototype, provided developers carefully manage rate limits, particularly with geocoding and traffic APIs.*

## Comparative Tables

### Weather API Comparison

| Provider | Coverage | Key Endpoints | Historical Data | Cost / Free Tier |
|---|---|---|---|---|
| National Weather Service | US | Alerts, forecasts, observations | Limited | Free [1] |
| Tomorrow.io | Global | 60+ data layers | Yes | Free plan for testing [14] [15] |
| OpenWeatherMap | Global | Current, forecasts, air quality | Yes | Free tier available [16] |
| Weatherbit | Global | Current, forecast | Yes | Free tier available [17] |

*Takeaway: NWS is the most cost-effective for US-based alerts, while Tomorrow.io and OpenWeatherMap offer better global coverage and specialized data layers for advanced prototyping.*

### Geospatial Data Source Comparison

| Source | Primary Data Type | Access Method | Licensing / Usage Limits |
|---|---|---|---|
| OSM Overpass | Road networks, infrastructure | API Endpoint | GNU AGPL v3, free of charge [2] |
| OSM Nominatim | Geocoding | API Endpoint | Max 1 request/second, no bulk scraping [20] |
| Census TIGERweb | Boundaries, centerlines | REST API | Public domain [3] |
| Mapbox | Vector tiles, geocoding | API / SDK | 50k free map loads/month [22] |
| Google Maps | Dynamic maps, routing | API / SDK | $100/mo for 50k calls (Starter) [23] |

*Takeaway: OpenStreetMap and Census data provide the most unrestricted foundational layers, while Mapbox offers a generous free tier for polished, interactive map rendering.*

## Hackathon Prototype Stack (Free-Tier Only)

For a rapid, zero-cost prototype, the following stack is recommended:
1. **Weather & Alerts:** NWS API for unlimited, authoritative US weather alerts and forecasts [1].
2. **Base Maps & Infrastructure:** Mapbox GL JS (staying under the 50,000 load limit) [22] combined with OSM Overpass API for querying specific infrastructure features [2].
3. **Geocoding:** Mapbox Temporary Geocoding API (up to 100,000 free requests) [22] to avoid Nominatim's strict 1 request/second limit [20].
4. **Traffic & Routing:** TomTom Traffic API, utilizing the 2,500 free daily requests for real-time incident data [26].
5. **Outage Data:** PG&E's public API for regional electric data [4], supplemented by historical DOE-417 CSVs for baseline modeling [10].

## Risks & Mitigations

* **Rate Limit Bottlenecks:** Relying on Nominatim for geocoding risks immediate blocking if requests exceed 1 per second or involve systematic queries [20]. *Mitigation:* Implement aggressive client-side caching and utilize Mapbox's free tier for bulk geocoding needs [22].
* **Data Fragmentation:** Water outage data is highly localized and lacks standardization, often requiring manual discovery of specific ArcGIS FeatureServers [12]. *Mitigation:* Design the system to accept manual CSV uploads or generic GeoJSON feeds to accommodate non-standardized municipal data.
* **Scraper Fragility:** Relying on scraped data from utilities that only provide HTML maps (like Dominion Energy) [6] introduces high maintenance overhead. *Mitigation:* Abstract the data ingestion layer so failing scrapers do not crash the main application, and gracefully degrade to historical averages or weather-correlated outage predictions.

## References

1. *API Web Service - National Weather Service*. https://www.weather.gov/documentation/services-web-api
2. *Overpass API - OpenStreetMap Wiki*. https://wiki.openstreetmap.org/wiki/Overpass_API
3. *Census TIGERweb GeoServices REST API*. https://www.census.gov/data/developers/data-sets/TIGERweb-map-service.html
4. *Utility Power Outage Scrapers - Internet Telemetry API*. https://ods-docs.pages.dev/data-sources/utilities/
5. *PowerOutage.us Products - Enterprise Power Intelligence Platform*. https://poweroutage.us/use-our-data
6. *Dominion Energy's outage map*. https://outagemap.dominionenergy.com/
7. *Check Your Outage Status*. https://www.coned.com/en/services-and-outages/report-track-service-issue/check-outage-status
8. *DOE-417 Form*. https://doe417.pnnl.gov/
9. *OE-417 Electric Disturbance Events Database*. https://securethegrid.com/oe-417-database/
10. *DOE OE-417 Annual Summaries — OpenEnergyDataPortal*. https://openenergyhub.ornl.gov/explore/dataset/oe-417-annual-summaries/
11. *Event-correlated Outage Dataset in America*. https://data.openei.org/submissions/6458
12. *Layer: BoilWaterAdvisoryArea (ID:0)*. https://services1.arcgis.com/ozl4lz64w2yMSy2X/arcgis/rest/services/Boil_Water_Advisory_Area_Map/FeatureServer/0
13. *Water_Network (FeatureServer) - ArcGIS Online*. https://sampleserver6.arcgisonline.com/arcgis/rest/services/Water_Network/FeatureServer
14. *Free Weather API - 60+ Data Layers, 99.9% Uptime | Tomorrow.io*. https://www.tomorrow.io/weather-api/
15. *Tomorrow.io Pricing Overview*. https://support.tomorrow.io/hc/en-us/articles/23554984091156-Tomorrow-io-Pricing-Overview
16. *Weather API*. https://openweathermap.org/api
17. *API Documentation - Weatherbit*. https://www.weatherbit.io/api
18. *Current Weather API Documentation - Weatherbit*. https://www.weatherbit.io/api/weather-current
19. *To download the weather data your PWS reports ...*. https://support.weather.com/s/article/How-to-Get-a-Copy-of-Your-Personal-Weather-Station-PWS-Data
20. *Nominatim Usage Policy (aka Geocoding Policy)*. https://operations.osmfoundation.org/policies/nominatim/
21. *Is there an API for accessing The National Map data? - USGS.gov*. https://www.usgs.gov/faqs/there-api-accessing-national-map-data
22. *Pricing | Mapbox*. https://www.mapbox.com/pricing
23. *Subscriptions and Pay as you go - Google Maps Platform Pricing*. https://mapsplatform.google.com/pricing/
24. *ArcGIS Living Atlas content life cycles and updates - GeoPlatform.gov*. https://imagery.geoplatform.gov/iipp/help/en/11.5/create/living-atlas-content-life-cycles.htm
25. *Manage API access | ArcGIS REST APIs - Esri Developer*. https://developers.arcgis.com/rest/enterprise-administration/portal/privileges-for-portal-admin-api/
26. *TomTom has 2500 free daily requests for their maps/traffic ...*. https://www.reddit.com/r/selfhosted/comments/1bzkmzg/psa_tomtom_has_2500_free_daily_requests_for_their/
27. *Intermediate Traffic API - Introduction*. https://developer.tomtom.com/intermediate-traffic-service/documentation/product-information/introduction?source_app=b2b&source_product=traffic-apis
28. *Traffic APIs*. https://www.tomtom.com/products/traffic-apis/
29. *INRIX for Developers*. https://inrix.com/developers/
30. *Getting Started | INRIX documentation*. https://docs.inrix.com/
31. *Waze for Cities: Real-Time Traffic Data for Smarter Urban ...*. https://www.waze.com/wazeforcities/
32. *Waze Data Feed specifications*. https://support.google.com/waze/partners/answer/13458165?hl=en