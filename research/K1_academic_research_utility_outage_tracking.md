> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# Utility Outage Visibility & Prediction 2026: From Smart-Grid Sensors to AI-Driven Restoration Forecasts

## Executive Summary

The landscape of utility outage tracking in 2026 is defined by a sharp divide between electric power visibility and water/sewer infrastructure monitoring. While major electric utilities have standardized near-real-time public dashboards powered by hybrid data fusion, water and sewer utilities are only beginning to adopt predictive analytics and public-facing maps. 

Key strategic insights include:
* **Hybrid Data Fusion Powers Real-Time Maps:** Major utilities combine SCADA, AMI "last-gasp" alerts, and customer calls to update maps every 15 minutes [1]. Integrating these feeds cuts detection latency significantly.
* **Smart-Meter "Last-Gasp" Signals are Game-Changers:** AMI last-gasp functionality lets utilities know immediately when an outage occurs, pairing with Outage Management Systems (OMS) to drastically reduce detection lag [2].
* **Storm-Driven Prediction Relies on Weather and Asset Data:** Models like the Spatially Generalized Hurricane Outage Prediction Model (SGHOPM) show that wind speed and asset age are top predictors for outage durations [3] [4].
* **Water-Main Prediction Lags in Adoption:** Despite proven machine learning and survival analysis models for predicting water main breaks [5] [6], public dashboards remain limited to progressive municipalities like Austin and Seattle [7] [8].
* **CSO Dashboards Provide Near-Real-Time Alerts:** Cities like Portland, Philadelphia, and NYC offer public trackers for Combined Sewer Overflows (CSOs), updating frequently to warn citizens of discharges [9] [10] [11].

## 1. Landscape of Utility Outage Visibility (2024-2026)

Public outage dashboards are now standard for the electric power sector. Utilities like Dominion Energy, Duke Energy, Con Edison, and PG&E provide interactive maps that display outage locations, affected customer counts, and Estimated Times of Restoration (ETRs) [12] [13] [1] [14]. These systems rely on a mix of automated sensors and customer reports. 

Conversely, water and sewer visibility lags behind. While some cities like Austin (AW Leak & Outage Map) and Seattle provide water outage maps [7] [8], many municipalities still rely on static reporting or lack public-facing dashboards entirely. However, Combined Sewer Overflow (CSO) monitoring has seen a push for transparency, with cities like Philadelphia (CSOCast) and Portland (Big Pipe Tracker) offering near-real-time public notification systems [10] [11].

## 2. Core Data Engines & Sensor Suites

The detection backbone for modern utilities relies on a combination of legacy systems and modern IoT deployments. 

### 2.1 Power-Grid Sensors & Smart-Meter Integration

Electric utilities leverage Outage Management Systems (OMS) that integrate SCADA data, customer calls, and Advanced Metering Infrastructure (AMI) [2] [15]. The critical advancement is the AMI "last gasp" message—a final signal sent by a smart meter when it loses power. This data is fed into fault diagnosis algorithms to pinpoint outages instantly, bypassing the need to wait for customer reports [16] [17]. PG&E, for example, utilizes SmartMeters to quickly identify outages and communicate with the grid [18].

### 2.2 Water & Sewer Monitoring Networks

Water utilities utilize pressure sensors and flow meters to detect main breaks, though public integration is less common. For sewer systems, CSO monitoring relies on real-time gauges and telemetry. The Metropolitan Sewer District of Greater Cincinnati (MSDGC), for instance, provides near real-time conditions updated hourly [19] [20]. Portland's Big Pipe data updates every 15 minutes to track capacity and prevent overflows into the Willamette River [21].

## 3. Predictive Modeling Foundations

Academic research has established robust frameworks for predicting both the occurrence and duration of utility outages.

### 3.1 Weather-Driven Outage Prediction (Power)

Hurricane-induced power outages have been extensively modeled. Nateghi and Guikema (2014) identified key variables for forecasting outage durations, emphasizing the integration of mixture models and cost-sensitive learning [22] [23] [24]. McRoberts (2018) further enhanced the Spatially Generalized Hurricane Outage Prediction Model (SGHOPM), ranking variables to improve predictive accuracy [3] [4]. Recent studies also utilize XGBoost and ensemble learning to predict power outage durations based on equipment failures and extreme weather events [25] [26].

### 3.2 Asset-Condition & Crew-Logistics Models

Accurate Estimated Times of Restoration (ETRs) require more than just weather data; they depend heavily on asset condition and crew availability. Broad ETRs are often populated after initial damage assessments, but these can change as crews patrol areas and identify specific equipment damage [27] [28]. Machine learning models that incorporate event timestamps, location identifiers, failure causes, and equipment types are proving essential for refining these estimates [29].

### 3.3 Water-Main Break & Sewer Overflow Forecasts

Predictive maintenance for water infrastructure relies heavily on survival analysis and machine learning. Kleiner and Rajani (2001) pioneered the use of survival analysis for modeling cast iron pipe breaks [5] [30]. More recently, data-driven methods and machine learning systems have been deployed to assess the risk of water main breaks using historical failure data and pipe descriptors [31] [6].

## 4. Comparative Table – Public-Facing Outage Maps

| Utility / Municipality | Sector | Key Data Sources | Public UI Features | ETR / Update Method |
| :--- | :--- | :--- | :--- | :--- |
| **Dominion Energy** | Power | AMI, SCADA, User Reports | Outage locations, summary stats | Updates approx. every 15 min [1] |
| **PG&E** | Power | SmartMeters (AMI), SCADA | PSPS tracking, affected counts | Dynamic ETR post-assessment [28] [14] |
| **Duke Energy** | Power | OMS, Damage Assessors | Blue circle general outage areas | Broad ETRs post-assessment [27] [12] |
| **Austin Water** | Water | Crew reports, Telemetry | Leak/outage icons, repair estimates | Clickable icons for repair time [7] |
| **Portland BES** | Sewer | CSO Gauges | Big Pipe capacity tracker | Updates every 15 mins (45m lag) [21] |

*Takeaway:* Power utilities have standardized around 15-minute map refreshes and AMI integration, while water/sewer dashboards focus on specific incident tracking (leaks, CSOs) with varying update frequencies.

## 5. Feature-Importance Ranking & Model Blueprint

When building predictive models for outage duration and restoration, certain features consistently outweigh others in academic literature.

| Rank | Feature Category | Impact Description | Primary Sources |
| :--- | :--- | :--- | :--- |
| 1 | **Weather Severity** | Wind speed, hurricane category, and precipitation are the primary drivers of widespread damage. | Guikema, McRoberts [3] [4] |
| 2 | **Asset Age & Material** | Older infrastructure (e.g., cast iron water mains, aging transformers) fails at exponentially higher rates. | Kleiner, Rajani [5] [30] |
| 3 | **Crew Availability** | Travel time, shift schedules, and damage assessment routing dictate actual restoration speed. | Duke Energy protocols [27] |
| 4 | **Historical Failure Data** | Past performance of specific grid segments or pipe networks strongly predicts future vulnerabilities. | KDD 2018 [6] |

*Takeaway:* A robust predictive pipeline must ingest real-time weather forecasts, cross-reference GIS asset databases, and apply ensemble ML models (like XGBoost) while constraining outputs based on actual crew dispatch logistics.

## 6. Technology Landscape & Vendor Map

The Outage Management System (OMS) market is dominated by major industrial conglomerates, though interoperability remains a challenge.

| Vendor | Core Focus | Key Capabilities |
| :--- | :--- | :--- |
| **ABB Ltd.** | Power OMS / ADMS | Grid management, fault location |
| **General Electric Co.** | Power OMS | SCADA integration, predictive analytics |
| **Oracle Corp.** | Utility Software | Customer communication, data management |
| **Schneider Electric** | Grid Edge / OMS | Distribution automation, IoT sensing |
| **Siemens AG** | Smart Grid | Advanced metering, grid control |

*Takeaway:* The market is highly consolidated among legacy providers [32]. Utilities must prioritize API-first architectures to ensure these proprietary systems can ingest modern, unstructured data like crowdsourced reports or advanced IoT telemetry.

## 7. Success Stories & Failure Cases

**Success: PG&E's AMI Integration**
PG&E's deployment of SmartMeters enables two-way communication with the grid, allowing the utility to quickly identify outages without waiting for customer calls [18]. This "last gasp" capability drastically reduces the time to dispatch crews.

**Failure/Challenge: Static ETRs During Complex Events**
During Public Safety Power Shutoffs (PSPS) or severe storms, utilities often struggle with ETR accuracy. PG&E notes that estimated restoration times may not change for hours or may be extended while crews patrol areas to assess equipment damage [28]. Automated ETRs generated during initial outages are often inaccurate until physical damage assessments are completed [33].

## 8. Gaps & Civic-Tech Innovation Opportunities

The current landscape reveals significant gaps ripe for civic-tech intervention:
1. **Cross-Utility Dashboards:** Citizens currently must visit separate sites for power, water, and sewer issues. A unified municipal infrastructure dashboard could aggregate APIs from electric OMS, water leak trackers, and CSO gauges.
2. **Crowdsourced Validation:** While utilities rely on AMI, localized damage (e.g., a specific downed tree) requires visual confirmation. Civic apps that allow users to upload photos and tag infrastructure damage could feed directly into utility damage assessment queues, speeding up ETR calculations.
3. **Open Water Risk APIs:** Translating academic models of water main deterioration [6] into open-source risk maps could help neighborhoods advocate for preventative infrastructure spending before catastrophic breaks occur.

## 9. Action Roadmap for Stakeholders

* **For Electric Utilities:** Mandate the integration of AMI "last gasp" data into legacy OMS platforms to cut detection latency. Transition ETR calculations from static heuristic rules to dynamic ML models that ingest real-time crew locations and weather data.
* **For Water/Sewer Agencies:** Adopt the transparency models of Portland and Austin. Deploy public-facing ArcGIS dashboards for main breaks and CSOs, updating at least hourly.
* **For Civic Technologists:** Build open-source middleware that scrapes and standardizes utility outage maps, creating unified, multi-utility alert systems for local communities.

## 10. Bibliography – Annotated Top Papers

1. **Nateghi, R., et al. (2014). "Forecasting hurricane-induced power outage durations."** *Natural Hazards*. Identifies key variables and proposes mixture models for predicting outage restoration times [22] [23].
2. **McRoberts, D.B., et al. (2018). "Improving Hurricane Power Outage Prediction Models."** Enhances the predictive accuracy of the Spatially Generalized Hurricane Outage Prediction Model (SGHOPM) [3].
3. **Kleiner, Y., & Rajani, B. (2001). "Comprehensive review of structural deterioration of water mains."** *Urban Water*. A foundational paper on modeling the occurrence of breaks in cast iron water mains using survival analysis [5] [30].
4. **Arias, et al. (2018). "Using Machine Learning to Assess the Risk of and Prevent Water Main Breaks."** *KDD*. Demonstrates a machine learning system using historical data and pipe descriptors to assess failure risk [6].
5. **Various Authors (2024). "Machine Learning Model Development to Predict Power Outage Duration."** *Sensors*. Introduces an XGBoost classification model to predict outage durations stemming from equipment failures [26] [29].
6. **(2016). "Smart Metering for Outage Management of Electric Power Distribution."** Highlights the critical importance of "last gasp" messages from smart meters as inputs to OMS fault diagnosis algorithms [16].
7. **(2025). "Predictive Modeling of Power Outages during Extreme Events."** *arXiv*. Presents a novel machine learning approach integrating multiple data streams for predicting outages caused by extreme weather [25].
8. **(2025). "Predicting the restoration pattern from hurricane-induced power outages."** Validates data-driven models for reliably predicting restoration patterns (R2=0.816) [34].
9. **(2023). "Comparative analysis of machine learning techniques for predicting water main failures."** Applies data-driven methods to predict water main failures in Kitchener, comparing six ML models [31].
10. **(2025). "Predicting Estimated Times of Restoration for Electrical Outages."** *arXiv*. Focuses on the necessity of accurate ETRs for customer preparedness and decision-making during extended outages [35].
11. **DOE (2019). "Voices of Experience: Leveraging AMI Networks and Data."** Details how pairing AMI last gasp functionality with OMS data helps utilities pinpoint outages [2].
12. **OSTI. "Integrated Framework of Multisource Data Fusion for Outage Detection."** Reviews methods leveraging smart meter measurements and last gasp signals for outage detection [17].

## References

1. *Dominion Energy's outage map*. https://outagemap.dominionenergy.com/
2. *[PDF] Voices of Experience: Leveraging AMI Networks and Data*. https://www.energy.gov/sites/default/files/2024-02/01-03-2019_doe-voe-leveraging-ami-networks-and-data-report_508_0.pdf
3. *Improving Hurricane Power Outage Prediction Models ...*. https://pubmed.ncbi.nlm.nih.gov/27779791/
4. *Hurricane Power Outage Prediction*. https://smap.jpl.nasa.gov/system/internal_resources/details/original/424_quiringmcroberts.pdf
5. *Comprehensive review of structural deterioration of water mains*. https://www.researchgate.net/publication/222562931_Comprehensive_review_of_structural_deterioration_of_water_mains_Statistical_models
6. *Using Machine Learning to Assess the Risk of and Prevent Water ...*. https://www.kdd.org/kdd2018/accepted-papers/view/using-machine-learning-to-assess-the-risk-of-and-prevent-water-main-breaks
7. *AW Leak & Outage Map - Austin Water*. https://www.arcgis.com/apps/dashboards/8a124bcb3c65411daeb5f3d549ecd6d3
8. *Seattle Public Utilities Water Outage Status*. https://maps.seattle.gov/spu/wateroutage/
9. *Combined Sewer Overflows - DEP*. https://www.nyc.gov/site/dep/water/combined-sewer-overflows.page
10. *See how the Big Pipes prevent combined sewer overflows*. https://www.portland.gov/bes/big-pipe-tracker
11. *CSOcast | water.phila.gov - Philadelphia Water Department*. https://water.phila.gov/maps/csocast/
12. *Duke Energy Power Outage Map: How to Report, Track, and Prepare?*. https://www.bluettipower.com/blogs/emergency/duke-energy-outage-map-tracking%3Fsrsltid%3DAfmBOoqkTeyv1TTRFFLNaCS571cRrMHcq7TT-ZV2ehuMMVhVvXVN_eLU
13. *[PDF] Outage Map - Con Edison*. https://www.coned.com/-/media/files/coned/documents/services-outages/outage-map/guide.pdf
14. *PG&E Outage Center - View Outage Map*. https://pgealerts.alerts.pge.com/outage-tools/outage-map/
15. *Alphabet Soup: A Glossary Of Electric Utility Software ...*. https://www.camus.energy/blog/alphabet-soup-a-glossary-of-electric-utility-software-systems
16. *Smart Metering for Outage Management of Electric Power ...*. https://www.sciencedirect.com/science/article/pii/S187661021631476X/pdf?md5=7167864950368af45720019938bbef4a&pid=1-s2.0-S187661021631476X-main.pdf
17. *[PDF] Integrated Framework of Multisource Data Fusion for Outage ... - OSTI*. https://www.osti.gov/servlets/purl/2549271
18. *SmartMeter™ | PG&E*. https://www.pge.com/en/save-energy-and-money/energy-saving-programs/smartmeter.html
19. *CSO Notification Program*. https://msdgc.org/programs/cso-notification-program/
20. *MSDGC Real-time Gauges*. https://msdgc.vieuxinc.com/
21. *Big Pipe Data - Portland.gov*. https://www.portlandoregon.gov/bes/bigpipe/data.cfm
22. *Forecasting hurricane-induced power outage durations*. https://ideas.repec.org/a/spr/nathaz/v74y2014i3p1795-1811.html
23. *Forecasting hurricane-induced power outage durations*. https://www.researchgate.net/publication/271920161_Forecasting_hurricane-induced_power_outage_durations
24. *Forecasting hurricane-induced power outage durations*. https://www.semanticscholar.org/paper/Forecasting-hurricane-induced-power-outage-Nateghi-Guikema/7333e56d750f7d3f52d850fc7af1928f96f21c50
25. *Predictive Modeling of Power Outages during Extreme ...*. https://arxiv.org/html/2512.22699v1
26. *Machine Learning Model Development to Predict Power Outage ...*. https://www.mdpi.com/1424-8220/24/13/4313
27. *Damage Assessment - Duke Energy*. https://www.duke-energy.com/outages/damage-assessment
28. *The estimated time of restoral keeps changing during the PSPS ...*. https://help.pge.com/s/article/The-estimated-time-of-restoral-keeps-changing-during-the-PSPS-event-why
29. *(PDF) Machine Learning Model Development to Predict Power ...*. https://www.researchgate.net/publication/381939110_Machine_Learning_Model_Development_to_Predict_Power_Outage_Duration_POD_A_Case_Study_for_Electric_Utilities
30. *[PDF] Comprehensive review of structural deterioration of water mains*. https://www.tvsfpe.org/resources/Documents/Historical%20Documents/Other/KleinerRajaniStat.pdf
31. *Comparative analysis of machine learning techniques for predicting ...*. https://www.sciencedirect.com/science/article/pii/S2772991523000191
32. *Outage Management Systems Companies*. https://www.mordorintelligence.com/industry-reports/outage-management-systems-market/companies
33. *How does PG&E estimate power restoration time? - Facebook*. https://www.facebook.com/groups/474867943355896/posts/1224796541696362/
34. *Predicting the restoration pattern from hurricane-induced power ...*. https://www.sciencedirect.com/science/article/pii/S2772741625000559
35. *Predicting Estimated Times of Restoration for Electrical Outages ...*. https://arxiv.org/html/2505.00225v1