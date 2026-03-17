# Bridging the Last-Mile: Making Infrastructure Visibility Tools Accessible Beyond Maps and SMS

## Executive Summary
Civic infrastructure tools are designed to democratize information, yet their default delivery mechanisms—interactive maps and SMS alerts—often exclude the very residents who need them most. Research into map-based interfaces (Leaflet, Mapbox) and SMS notification systems reveals systemic accessibility barriers. Screen readers struggle with map tiles and focus orders, while SMS short codes face carrier filtering and cost barriers for prepaid users. 

To build an equitable prototype in 48 hours, the strategy must shift from "making the map fully accessible" to "providing an accessible alternative first." By leading with a WCAG 2.2 AA-compliant address lookup and text-based list view, and treating the map as an optional enhancement, developers can meet public sector accessibility standards. Furthermore, diversifying communication channels beyond SMS to include toll-free numbers and web status pages ensures critical infrastructure updates reach low-income and disabled residents.

## The Equity Stakes in Civic Tech
Infrastructure visibility tools are critical for keeping residents informed about outages, maintenance, and emergencies. However, relying exclusively on map-first UIs and SMS-only alerts creates a digital divide. While specific American Community Survey (ACS) S2801 data for Richmond's broadband and smartphone-only reliance requires further localized extraction, the overarching risk remains: tools built for the "average" user often fail those relying on assistive technologies or prepaid mobile plans. 

## Map Interfaces Fail Screen Readers by Default
While mapping libraries often claim to be accessible by default, real-world audits reveal severe limitations for users relying on screen readers or keyboard navigation. 

### Leaflet's Hidden Keyboard and Screen Reader Traps
Leaflet's documentation states that the map container and markers are keyboard operable by default [1]. However, community audits expose critical flaws. When using VoiceOver on an iPad, the screen reader announces the filename of every single base layer image (e.g., "6078.png, link"), overwhelming the user [2]. Furthermore, Leaflet 2.0 interactive markers, which utilize `<img>` tags, are not operable with a keyboard (Return or Space), violating WCAG 2.1.1 Keyboard criteria [3]. Focus order is also a documented issue, as map controls are often presented after author-provided content, confusing non-visual users [4].

### Mapbox Accessibility Remains an Add-On
Mapbox faces similar challenges. The Mapbox GL JS geocoder exhibits unexpected keyboard behavior: hitting the Tab key submits the form instead of moving focus to the next interactive element, and the down arrow fails to move focus to the menu, meaning screen readers do not announce the options [5]. This fails WCAG criteria 3.2.2 (On Input), 2.4.7 (Focus Visible), and 1.3.1 (Info and Relationships) [5]. Additionally, the official Mapbox GL accessibility plugin was archived in 2022, indicating that web accessibility requires significant custom implementation [6]. While Mapbox provides VoiceOver examples for its iOS SDK, this requires native app development rather than a web-based approach [7].

| Mapping Library | Documented Accessibility Failure | Violated WCAG Criteria | Required Mitigation |
| :--- | :--- | :--- | :--- |
| **Leaflet** | Base map tiles read aloud as individual links by VoiceOver [2]. | 1.1.1 Non-text Content | Hide base tiles from assistive technologies using `inert` [1]. |
| **Leaflet** | Interactive markers (`<img>`) do not respond to Enter/Space keys [3]. | 2.1.1 Keyboard | Replace `<img>` with `<button>` or `<input type="image">` [3]. |
| **Mapbox GL JS** | Geocoder Tab key submits search instead of moving focus [5]. | 3.2.2 On Input | Implement custom WAI-ARIA combobox pattern. |
| **Mapbox GL JS** | Geocoder dropdown items not announced by screen readers [5]. | 1.3.1 Info and Relationships | Ensure focus follows selection in dropdown menus [5]. |

*Takeaway: Do not rely on mapping library defaults. Both Leaflet and Mapbox require explicit, custom interventions to prevent keyboard traps and screen reader overload.*

## Public Sector Guidance Mandates Accessible Alternatives
Attempting to retrofit a canvas-based map for full screen reader compatibility within a 48-hour hackathon is a high-risk strategy. Fortunately, public sector guidelines offer a pragmatic compliance path.

### The "Alternative Path" Exemption
The UK's Public Sector Bodies Accessibility Regulations state that online maps are exempt from strict accessibility requirements "as long as essential information is provided in an accessible digital manner for maps intended for navigational use" [8]. GOV.UK requires digital services to meet WCAG 2.2 AA as a minimum [9]. The Government Digital Service (GDS) warns that maps can be overstimulating and rely too heavily on color, excluding neurodiverse users and those with visual impairments [10]. 

Therefore, the most effective strategy is to build a robust, text-based alternative (like a data table or list) and treat the map as a secondary, optional view.

## SMS Limitations Exclude Vulnerable Populations
SMS is frequently viewed as the ultimate equitable communication channel, but carrier policies and billing structures create hidden barriers for low-income residents.

### The End of Shared Short Codes and Carrier Filtering
In 2022, cellular carriers eliminated the use of shared short codes, forcing vendors to purchase expensive dedicated short codes [11]. While short codes are the only way to provide "Free-to-End-User" messaging in the US [12], they come with strict limitations. T-Mobile notes that short codes are country-specific, will not be received while overseas, and are not supported on select plans [13]. 

Relying solely on SMS means residents with prepaid plans that block short codes, or those who cannot afford per-message charges, will miss critical infrastructure alerts.

| Communication Channel | Equity Limitations | Strategic Mitigation |
| :--- | :--- | :--- |
| **Dedicated SMS Short Code** | High cost to implement; may be blocked by certain prepaid carrier plans [13]. | Use only if Free-to-End-User billing is secured [12]. |
| **Shared SMS Short Code** | Eliminated by carriers in 2022; messages often filtered or ignored [11]. | Abandon this approach entirely. |
| **Toll-Free Numbers (SMS/Voice)** | Requires user to initiate or opt-in; lacks the immediacy of push alerts. | Use as a reliable backup with high throughput and no keyword filtering [11]. |

*Takeaway: A multi-channel approach is mandatory. Pair SMS with toll-free voice lines and accessible web dashboards to ensure comprehensive coverage.*

## Prototype Playbook: 48-Hour Implementation
To deliver an equitable prototype over a weekend, de-scope the map and focus on a rock-solid, accessible core.

### Minimum Accessibility Checklist for Prototypes
Implement the following checklist to ensure the tool meets baseline equity standards without requiring a massive engineering lift.

| Requirement | Implementation for 48-Hour Prototype | WCAG Alignment |
| :--- | :--- | :--- |
| **Accessible Address Lookup** | Use native HTML `<input>` with a WAI-ARIA combobox pattern. Do not auto-submit on Tab [5]. | 3.2.2 On Input |
| **Text-Based Results** | Display infrastructure status in a semantic HTML list or table. | 1.3.1 Info and Relationships |
| **No Color-Only Status** | Pair every red/green status indicator with text (e.g., "Red - Outage", "Green - Clear") [10]. | 1.4.1 Use of Color |
| **Skip Map Link** | Provide a "Skip to results" link before the map container to aid keyboard users [4]. | 2.4.1 Bypass Blocks |
| **Inert Decorative Maps** | If the map cannot be made fully accessible in time, use the HTML `inert` attribute to hide it from screen readers [1]. | 1.1.1 Non-text Content |

### What to Avoid
* **Do not** rely on color alone to convey infrastructure status [10].
* **Do not** leave map base tiles exposed to screen readers [2].
* **Do not** use `<img>` tags for interactive map markers; use `<button>` [3].

## Evidence Library and Inferences

### Facts
* **Leaflet Defaults:** Leaflet maps and markers are keyboard operable by default, but require testing with screen readers like VoiceOver, NVDA, or TalkBack [1].
* **Leaflet Screen Reader Failures:** VoiceOver reads individual map tile filenames (e.g., "6078.png") as links, confusing users [2].
* **Leaflet Keyboard Failures:** Interactive markers using `<img>` tags do not respond to Return or Space keys [3].
* **Mapbox Geocoder Failures:** The Mapbox GL JS geocoder fails WCAG criteria because the Tab key submits the search rather than moving focus, and dropdown items are not announced [5].
* **Mapbox Accessibility Support:** The Mapbox GL accessibility plugin was archived in 2022 [6].
* **Government Map Exemptions:** UK Accessibility Regulations exempt online maps provided that essential information is available in an accessible digital format [8].
* **SMS Short Code Changes:** Carriers eliminated shared short codes in 2022 [11].
* **SMS Plan Restrictions:** T-Mobile states that non-T-Mobile short codes are not supported on select plans [13].

### Inferences
* *Inference:* Low-income residents on prepaid mobile plans may avoid opting into SMS alerts if they fear per-message charges, making Free-to-End-User short codes or toll-free alternatives essential for equity.
* *Inference:* A map-first UI will actively exclude blind users and keyboard-only users unless explicit, custom fixes are applied to the underlying library (Leaflet/Mapbox).
* *Inference:* Because Richmond's specific digital divide data (ACS S2801) is pending, the prototype must assume a high baseline of smartphone-only and low-bandwidth users, necessitating a lightweight, non-map fallback.

## Demo Equity Framing
When presenting the prototype to judges, use the following language to acknowledge current limitations and frame the tool's equity strategy:

* *"We built the address-first list view to meet WCAG 2.2 AA today; the map is an optional enhancement."*
* *"By providing a text-based alternative, we ensure essential info is accessible without the map, aligning with UK public sector guidance on mapping accessibility."*
* *"We recognize that SMS is just one channel and can exclude prepaid users. Our roadmap includes a verified toll-free number and voice line to reach residents without reliable smartphone access."*
* *"Once we integrate Richmond's ACS S2801 digital divide figures, we will use that data to set our inclusion targets and guide physical neighborhood outreach."*

## References

1. *A guide to basic Leaflet accessibility - Leaflet - a JavaScript library for interactive maps*. https://leafletjs.com/examples/accessibility/
2. *Accessibility improvements · Issue #3210 · Leaflet/Leaflet · GitHub*. https://github.com/Leaflet/Leaflet/issues/3210
3. *Interactive markers are not operable with a keyboard [2.0] [Accessibility] - with PR · Issue #9898 · Leaflet/Leaflet · GitHub*. https://github.com/leaflet/leaflet/issues/9898
4. *Improve the default navigation flow for keyboard and screen reader users · Issue #7479 · Leaflet/Leaflet · GitHub*. https://github.com/Leaflet/Leaflet/issues/7479
5. *Accessibility: search suggestions menu is not accessible to screen readers and has unexpected keyboard behavior (fails WCAG criteria) · Issue #12973 · mapbox/mapbox-gl-js · GitHub*. https://github.com/mapbox/mapbox-gl-js/issues/12973
6. *GitHub - mapbox/mapbox-gl-accessibility: An accessibility control for Mapbox GL JS · GitHub*. https://github.com/mapbox/mapbox-gl-accessibility
7. *Access map features using VoiceOver | Maps SDK | iOS | Mapbox*. https://docs.mapbox.com/ios/maps/examples/voice-over-accessibility/
8. *Building accessible maps - Design System*. https://designsystem.gov.scot/guidance/maps/building-accessible-maps
9. *Making your service accessible: an introduction*. https://www.gov.uk/service-manual/helping-people-to-use-your-service/making-your-service-accessible-an-introduction
10. *Why you need to make your maps accessible – Services in government*. https://services.blog.gov.uk/2023/02/22/why-you-need-to-make-your-maps-accessible/
11. *Emergency Text Alert System and Shared Short Codes*. https://www.singlewire.com/blog/emergency-text-alert-system-short-codes
12. *United States: Short Code Guidelines | Twilio*. https://www.twilio.com/en-us/guidelines/us/short-code
13. *  Self-service & short codes
 | T-Mobile Support*. https://www.t-mobile.com/support/plans-features/self-service-short-codes