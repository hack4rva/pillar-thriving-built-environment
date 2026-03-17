# Benchmark Scan — Infrastructure Project Transparency & Fleet Visibility Tools

National and regional comparables for the two problem statements. Use these for inspiration and to understand what has been tried. Do not assume these are directly replicable without verifying Richmond-specific data availability.

---

## Transportation Project Visibility — National Comparables

### NYC DOT Capital Projects Dashboard
**What it does:** Shows all NYC Department of Transportation capital projects on an interactive map. Users can filter by borough, project type, and status. Each project has a plain-language description, timeline, and contact.
**Relevant features:** Address proximity search, status labels (design / construction / complete), project type filters.
**What Richmond can learn:** The plain-language description format and status lifecycle labeling are directly applicable. The address search is a strong UX pattern.
**Limitation for comparison:** NYC has a much larger DPW staff and dedicated digital services team. Richmond would need a simpler, maintenance-light version.

### Boston StreetMap / Street Improvements Program
**What it does:** Boston's public map of street improvement projects, resurfacing, and maintenance. Users can search by street name and see project status.
**Relevant features:** Street-name search, status by year, layer toggles.
**What Richmond can learn:** Street-name as a search input is simpler to implement than full geocoding. A "year of work" filter is practical for residents planning around construction.
**Limitation for comparison:** Boston's data pipeline is more mature than Richmond's current ArcGIS setup.

### Chicago City Infrastructure Projects Map
**What it does:** Interactive map of infrastructure projects by ward, contractor, and status. Linked to the Chicago Data Portal for underlying data.
**Relevant features:** Ward-based filtering (analogous to council district), contractor display, data portal integration.
**What Richmond can learn:** Using an existing jurisdiction boundary (council district) as a proxy for neighborhood lookup reduces geocoding complexity.

### VDOT SmartPortal / Projects Tracker
**What it does:** Virginia DOT's project information system showing all VDOT-funded projects statewide, searchable by route number or location.
**Relevant features:** Project status phases, budget information, environmental review stage.
**What Richmond can learn:** VDOT already has project data for state-maintained roads in Richmond. A Richmond tool should either link to VDOT's tracker for state roads or clearly scope to City-maintained roads only.
**Direct relevance:** Some roads in Richmond are VDOT-maintained. Teams should understand this distinction.

### Louisville Metro GIS Infrastructure Viewer
**What it does:** Interactive GIS viewer for Louisville infrastructure projects, utilities, and permits.
**Relevant features:** Layer-based exploration, address search, project details on click.
**What Richmond can learn:** The single-viewer approach (one URL, multiple layers) reduces the fragmentation problem. Richmond GeoHub could serve a similar function if layers are properly labeled and described.

### PBOT Portland Bureau of Transportation Projects
**What it does:** Portland DOT's project tracker with neighborhood-level filtering and opt-in email notifications for project updates.
**Relevant features:** Neighborhood-based filter, opt-in alerts, plain-language project cards.
**What Richmond can learn:** The opt-in notification feature (Concept 4 in recommendations) has been successfully implemented. The neighborhood filter reduces the cognitive load of address lookup.

---

## Fleet Operations Visibility — National Comparables

### Chicago Plow Tracker
**What it does:** Real-time map showing the location and progress of Chicago snow plows during storm events. Data feeds from GPS units on plow vehicles.
**Relevant features:** Live vehicle locations, route completion percentage by ward, public-facing map.
**What Richmond can learn:** The UX concept (show residents their street's plow status) is exactly what the fleet operations MVP targets. The data infrastructure requirement (GPS on all vehicles, live API) is what Richmond does not yet have.
**Critical note:** Richmond cannot replicate this without complete GPS installation. Do not promise this without live data.

### NYC Sanitation Street Cleaning Map
**What it does:** Public-facing map showing NYC sanitation street cleaning routes and alternate side parking rules by street segment.
**Relevant features:** Street segment-level schedule display, alternate side parking integration.
**What Richmond can learn:** The schedule display concept (this block cleans Tuesday/Friday) is achievable with schedule data even without GPS. This is the weekend-viable version of the fleet tool.

### Boston Snow Plowing Tracker (Winter Ready Boston)
**What it does:** During winter storms, shows plow deployment status by city neighborhood. Not full real-time GPS, but zone-based status updates.
**Relevant features:** Zone-level completion status, last updated timestamp, "plow has visited" indicator per neighborhood.
**What Richmond can learn:** Zone-based completion (not vehicle-by-vehicle GPS) is a middle ground that's more achievable. A supervisor can mark a zone complete manually or via a simple input.

### Montgomery County MD SnowWatch
**What it does:** Zone-based snow removal status tracker. Shows priority levels (primary roads first, residential last) and completion status by zone.
**Relevant features:** Priority tier display, zone-based status, public communication during storms.
**What Richmond can learn:** Prioritization tier display (primary/secondary/tertiary roads) adds useful context for residents who wonder why their street hasn't been plowed yet.

### Houston Public Works Service Tracker
**What it does:** Tracks completion of scheduled maintenance services by zone and service type.
**Relevant features:** Service type filters (mowing, pothole repair, street cleaning), zone-based view, last service date.
**What Richmond can learn:** Last service date (even without live tracking) is actionable information for residents.

---

## Key Takeaways for Richmond Teams

1. **Address search + project cards** is the most validated UX pattern for infrastructure visibility. Multiple cities have built this and it works.

2. **Zone-based status** (not vehicle GPS) is the realistic path for fleet visibility this weekend. Boston, Montgomery County, and NYC show this is useful even without real-time tracking.

3. **Plain-language descriptions** are a gap in most city tools. Richmond has an opportunity to do this better by design rather than retrofitting.

4. **VDOT is already doing part of this** for state-maintained roads. A Richmond tool should be clear about scope (City-maintained only, or explicitly linking to VDOT for state roads).

5. **Chicago Plow Tracker is the aspirational end state** for fleet visibility — but it requires complete GPS infrastructure. Do not promise this for the hackathon.
