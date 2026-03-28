> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# Demo Advice — A Thriving and Sustainable Built Environment

How to present your project credibly in 3–5 minutes.

---

## The Core Demo Formula

> **Problem → User → What you built → One live action → Impact claim → What's next**

Keep each section to 30–45 seconds. The live action (the demo itself) should be under 90 seconds.

---

## Framing the Problem (30 seconds)

Start with a human moment, not a statistic.

**Good:**
> "Three weeks ago, Keisha noticed orange cones on her block. She called 311, checked the City website, searched Google — and still couldn't find out what the project was or when it would end. That's a fixable problem."

**Avoid:**
> "Richmond has significant challenges with public works transparency across multiple information systems and stakeholder groups."

The human moment creates immediate judge alignment. The abstract version creates distance.

---

## Introducing the User (15 seconds)

Name the user. Be specific.

- "Our user is a Richmond resident who wants to know what's happening on their block."
- "Our user is a DPW supervisor coordinating 15 plow drivers during a storm."
- "Our user is a DPW communications staff member getting calls about street cleaning schedules."

Do not say "our users are residents, staff, and City officials." Pick one.

---

## The Live Demo (60–90 seconds)

### For Address Lookup / Explorer Map
1. Have a Richmond address pre-typed in the search box (e.g., 100 N 5th St, Richmond VA)
2. Hit enter — results appear
3. Click one project — plain-language description card opens
4. Say: "In under 10 seconds, Keisha knows there's a drainage improvement project on her block, it's in the active phase, and it's expected to wrap up in May."

**Fallback:** If API fails, have a screenshot or static demo mode ready. Say "I'm going to show you our static demo version — the live version is also working but I want to make sure you can see the interface clearly."

### For Schedule Tracker / Fleet Dashboard
1. Have an address or zone pre-selected
2. Show zone assignment
3. Show schedule display: "Zone 4 — cleaning scheduled Wednesday"
4. Click "Mark Complete" (simulated) — status updates
5. Say: "This is built against a synthetic data schema. When DPW's GPS installation is complete, this tool is ready to connect to real data."

**Critical:** Always say "synthetic/mock data" unprompted. Judges will ask if you don't.

---

## The Impact Claim (30 seconds)

Be specific and modest. Do not say "this will transform how Richmond residents interact with City government."

**Good:**
> "If DPW embedded a tool like this on their website, residents asking 'what's that construction on my street?' would get an instant answer instead of a phone call. Based on the volume of repetitive inquiries DPW receives, even 20% deflection would save meaningful staff time."

**Avoid:**
> "This will revolutionize civic transparency in Richmond and could be adopted by cities across Virginia."

If you don't have data on call volume, say "we don't have exact numbers — this is an assumption we'd want to verify with DPW."

---

## Answering the Hard Questions

### "Is this connected to real DPW data?"
**If Transportation tool:** "Yes — we're pulling from Richmond GeoHub's public ArcGIS layers. This is the same data DPW uses publicly. We've verified [X] layers are accessible."

**If Fleet tool:** "No — the GPS infrastructure isn't complete yet. We built against a documented synthetic schema so the tool is ready to connect when the data is available. That's an intentional design choice, not a gap."

### "What happens if the data is outdated?"
"Great question. We display a 'last updated' timestamp for each layer we pull from. We also display a link back to the official DPW page for each project so residents always have a path to authoritative information."

### "What would it take to deploy this?"
"Two things: a City IT or GIS contact to verify and maintain the data layer connections, and a hosting arrangement. The code is open source and the hosting cost is near zero on GitHub Pages or Vercel. The main investment is the data relationship with DPW."

---

## What Not to Say in the Demo

- "This is production-ready." (It's a prototype.)
- "DPW has committed to using this." (Unless they have.)
- "We're showing you real-time GPS tracking." (The infrastructure doesn't exist.)
- "This covers all of Richmond's infrastructure projects." (You're pulling from specific layers.)
- "Our AI descriptions are accurate." (Label them as AI-generated and show the original.)

---

## Rubric Alignment

Judges will likely score on:
- **Clarity of problem:** Did you explain the problem in terms a non-technical judge understands?
- **Data credibility:** Is your data source real, public, and properly cited?
- **Demo quality:** Does the tool actually work for the demo flow?
- **Feasibility of continuation:** Is there a realistic path beyond the hackathon?
- **Appropriate scope:** Did you avoid building something that requires City system integration?

Prepare one sentence for each: "The problem is [X]. Our data is from [Y], which is publicly available. The tool works by [Z]. Post-hackathon, the path is [A]. We deliberately excluded [B] because [reason]."
