# Quickstart

## Fastest path for teams
1. Read `00_core/00_pillar_overview.md`
2. Read `01_problem_space/02_targeted_problem_statements.md`
3. Read `02_data/00_index.md`
4. Pick one user and one problem
5. Read `04_build_guides/01_mvp_shapes.md`
6. Create your project brief using `99_templates/project_one_pager_template.md`

## Questions to answer before building
- Who is the user (resident, DPW supervisor, DPW communications staff)?
- What problem are they facing?
- What data or documents are you using?
- What can actually be built in a weekend?
- How will a judge understand the value in under 60–90 seconds?

## High-probability project types
- infrastructure project explorer (map + address search + project status)
- "What's happening on my street?" address lookup tool
- plain-language project description translator
- street service status tool (snow removal or street cleaning, schedule-based)
- transportation project notification system (opt-in alerts by neighborhood)

## Critical constraint to understand first
The Fleet Operations problem statement (snow removal / street cleaning) has a **D3=2 data readiness score**. GPS infrastructure is still being installed as of the hackathon. Any fleet-related MVP must be built against:
- a synthetic or mock GPS data schema, OR
- historical service zone schedules, OR
- a schedule-based status display (not live tracking)

Do not plan to use real-time GPS feed data. It does not exist yet.

## The Transportation Project Visibility problem is the stronger starting point
Score: 25/32. Public data exists on Richmond GeoHub and the Open Data Portal. You can build a useful demo using:
- existing ArcGIS project layers (verify current layer names and public access before building)
- plain-language rewriting of technical project descriptions
- address or neighborhood search

## What not to build
- Real-time GPS vehicle tracking (data not ready)
- Sustainability design standards compliance checker (requires more internal City work)
- Tools that require DPW internal system integration
- Tools that claim to predict project completion dates without official confirmation
