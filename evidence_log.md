> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](docs/methodology.md) for details.

# Evidence Log — A Thriving and Sustainable Built Environment

Track every factual claim here. Assign an ID, record the source, and mark verification status.

Status labels:
- **Confirmed:** verified from official source with URL and date
- **Likely:** expected based on context; not directly verified
- **Unverified:** mentioned in problem statement or working session; not confirmed
- **Missing:** needed but not found

---

## Confirmed

| ID | Claim | Source | URL | Date verified |
|----|-------|--------|-----|---------------|
| E-001 | Richmond GeoHub exists as a public ArcGIS hub | City of Richmond GIS | https://richmond-geo-hub-cor.hub.arcgis.com/ | — |
| E-002 | Richmond Open Data Portal exists on Socrata | City of Richmond | https://data.richmondgov.com/ | — |
| E-003 | Richmond Civic Hackathon is March 27–29, 2026 at VCU Snead Hall | Hack RVA | — | — |
| E-004 | GPS devices are being installed across the DPW fleet (not yet complete) | Working session notes (Feb 26, 2026) | — | — |

---

## Likely (unverified)

| ID | Claim | Basis | Verify via |
|----|-------|-------|-----------|
| E-010 | GeoHub contains public layers for DPW transportation projects | Known City GIS practice | Browse richmond-geo-hub-cor.hub.arcgis.com and search for DPW or transportation layers |
| E-011 | Richmond Open Data Portal contains capital improvement or 311 datasets | Common Socrata pattern | Browse data.richmondgov.com and filter by Infrastructure/Transportation |
| E-012 | DPW program pages describe active projects including streetscape and safety programs | Known DPW structure | Check rva.gov/public-works and linked program pages |
| E-013 | DPW communications staff receive repetitive resident inquiries about project status | Working session notes inference | Confirm with DPW contacts |
| E-014 | Zone-level street cleaning schedules exist internally at DPW | Standard operational practice | Request from DPW operations contacts |

---

## Unverified

| ID | Claim | Source of claim | Risk if wrong |
|----|-------|----------------|---------------|
| E-020 | Snow removal routes are assigned by geographic zone | Working session inference | Fleet MVP scope affected |
| E-021 | GPS data schema will include route_id, completion_pct, and timestamp fields | Synthetic schema design assumption | Fleet tool schema mismatch |
| E-022 | Project descriptions in GeoHub contain enough fields to build a useful project card | Assumed from other city examples | Address lookup quality affected |
| E-023 | VDOT maintains a separate project tracker for state-maintained roads in Richmond | Known VDOT practice | Tool scope and disclaimer affected |

---

## Missing (critical gaps)

| ID | What is missing | Impact | How to get it |
|----|----------------|--------|---------------|
| E-030 | Specific GeoHub layer names and REST endpoint URLs for DPW transportation projects | Blocks Shape A and B build | Browse GeoHub; use "Explore Data" on each candidate layer |
| E-031 | Current GPS system vendor and data schema being installed | Blocks Fleet MVP schema accuracy | Request from DPW IT or Al Wiggins |
| E-032 | Zone boundary data for snow removal and street cleaning | Blocks Shape D build | Request from DPW; or use council districts as proxy |
| E-033 | Historical street cleaning schedules by zone or district | Blocks schedule-based display | Request from DPW; may exist as PDF |
| E-034 | Sample or anonymized 311 request data related to construction or road issues | Affects opportunity mapping | Check Open Data Portal |

---

## Useful Datasets

| ID | Dataset | Source | URL | Notes |
|----|---------|--------|-----|-------|
| D-001 | Richmond GeoHub transportation layers | City GIS | https://richmond-geo-hub-cor.hub.arcgis.com/ | Verify layer names before building |
| D-002 | Richmond Open Data Portal | City of Richmond | https://data.richmondgov.com/ | Browse for DPW-adjacent datasets |
| D-003 | VDOT project tracker | Virginia DOT | https://www.virginiadot.org/projects/ | State-maintained roads only |
| D-004 | GRTC GTFS | GRTC | https://ridegrtc.com/ | Transit stops and routes |

---

## Risks

| ID | Risk | Severity | Mitigation |
|----|------|----------|-----------|
| R-001 | GeoHub layers are not public or field names differ from assumed | High | Verify before building; have static fallback |
| R-002 | Fleet tool implies live GPS when none exists | High | Label synthetic data clearly everywhere; address in demo |
| R-003 | Project timeline claims are inaccurate | Medium | Show "last updated" timestamp; link to official source |
| R-004 | Plain-language AI translations contain errors | Medium | Show original alongside; label as AI-generated; review sample translations |
