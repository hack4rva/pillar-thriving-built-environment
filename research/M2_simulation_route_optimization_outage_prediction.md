> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# Optimizing Municipal Fleet Routes & Predicting Outage Durations: A Simulation Blueprint for Public-Service Tracking

## Executive Summary

Municipal service operations face immense logistical and financial challenges, particularly during adverse weather events. State departments of transportation spend more than $2 billion annually on snow and ice control, and over $5 billion per year on infrastructure repairs due to snow, ice operations, chemical use, and wear [1]. Optimizing these operations requires a sophisticated simulation layer that couples dynamic route optimization with predictive modeling for service disruptions. 

This report provides a comprehensive blueprint for building Simulation Layer M2, focusing on:
* **Route Optimization**: Transitioning from static plans to Adaptive Route Optimization (ARO) using Capacitated Arc Routing Problem (CARP) models for snow plowing [2] [1] and Capacitated Vehicle Routing Problem (CVRP) models for waste collection [3].
* **Outage Prediction**: Leveraging Generalized Accelerated Failure Time (AFT) models and survival analysis to predict power outage restoration times, specifically accounting for interval-censored data [4] [5].
* **Open-Source Tooling**: Utilizing high-performance engines like VROOM for millisecond-level routing [6], OR-Tools for complex time-window constraints [7], and OSRM for underlying routing profiles [8].
* **Progress Tracking**: Implementing hybrid estimation models that bridge the gap between schedule-based assumptions and Automatic Vehicle Location (AVL) data [9] [10].

## 1. Introduction & Scope

The financial and operational burden of municipal fleet management is staggering. For example, during a single winter season, the city of Pittsburgh spent $4.3 million on consumable resources (salt, deicing chemicals), $3.3 million on personnel, and $800,000 on equipment [2]. Given these costs, even minor improvements to routing can produce significant savings through reduced staff time, material use, and waste [1]. 

This report outlines the architecture for a public service tracking system that simulates realistic service operations. It details the algorithmic foundations for routing various municipal fleets, specifies the machine learning models required for predicting outage durations, and provides a practical framework for tracking route completion when GPS data is unavailable or unreliable.

## 2. Municipal Route-Optimization Foundations

Different municipal services require distinct algorithmic approaches based on their operational constraints and objectives. 

### 2.1 Vehicle Routing Problem (VRP) Variants Across Services

The foundational models for municipal routing depend heavily on whether the service targets specific points (nodes) or continuous street segments (arcs).

| Service Type | Core Routing Model | Key Constraints & Characteristics | Primary Objective |
| :--- | :--- | :--- | :--- |
| **Snow Plowing & Gritting** | Capacitated Arc Routing Problem (CARP) | Fuel and salt capacity, road-truck dependency (e.g., left-wing vs. right-wing plows), service continuity, and deadhead minimization [2] [1]. | Minimize schedule makespan (duration of the longest route) to clear all streets [2]. |
| **Waste Collection** | Capacitated Vehicle Routing Problem (CVRP) | Vehicle load capacity, intermediate facilities (IFs) for disposal, and site dependencies [3] [11]. | Minimize total travel distance and operational costs [3]. |
| **Street Sweeping** | VRP with Time Windows (VRPTW) | Strict parking restrictions that define hard service windows, business hours, and driver breaks [11]. | Maximize coverage within legal enforcement windows. |

**Key Takeaways:** Snow plowing is fundamentally an arc routing problem because the demand is distributed along the street segments rather than at discrete households [12] [1]. Conversely, commercial waste collection and street sweeping are typically modeled as node-routing problems with strict time windows [11].

### 2.2 Open-Source Routing Implementations

Building a simulation layer requires robust, fast, and scalable routing engines. The landscape of open-source tools offers specialized capabilities for different VRP variants.

| Tool | Primary Strengths | Supported Problem Types | Implementation Details |
| :--- | :--- | :--- | :--- |
| **VROOM** | High-speed execution; delivers optimized routes in milliseconds even with complex variables [6]. | TSP, CVRP, VRPTW, MDHVRPTW (Multi-depot heterogeneous vehicle VRPTW), PDPTW [6]. | Written in C++20; ideal for real-time adaptive route optimization [6]. |
| **Google OR-Tools** | Deep constraint management; highly customizable for complex operational rules [7]. | VRPTW, resource constraints (space/personnel) [7] [13]. | Uses a time matrix and cumul variables to set ranges for time windows at each location [7]. |
| **Project OSRM** | High-performance routing backend for calculating travel times and distances [14] [8]. | Shortest-path, distance matrices. | Uses static Lua profiles (e.g., `car.lua`) to determine transportation modes and routing behavior [8] [15]. |

**Key Takeaways:** For a responsive simulation system, VROOM is the optimal choice for rapid route generation and dynamic re-routing [6], while OSRM provides the foundational distance and time matrices based on specific vehicle profiles [8]. OR-Tools serves as a powerful fallback for highly constrained, scheduled scenarios [7].

## 3. Outage-Duration Prediction Framework

Predicting how long a service disruption (such as a power outage or blocked road) will last is critical for reallocating municipal fleets dynamically.

### 3.1 Feature Engineering and Model Selection

Predicting restoration time requires models that can handle complex, interacting variables. Recent studies highlight the effectiveness of specific statistical and machine learning approaches:

* **Generalized Accelerated Failure Time (AFT) Models**: These models are highly effective for investigating factors associated with longer restoration times after severe weather events, such as hurricanes [5].
* **Survival Models**: Survival analysis is used to obtain estimates of the time to a particular event of interest (e.g., outage resolution). These models can successfully combine remotely sensed imagery with traditional tabular data to assess outage risk [16].
* **Graph Neural Networks (GNNs)**: Multilayer GNN frameworks are emerging as powerful tools for predictive maintenance and clustering, helping to better predict and manage the economic costs of unplanned power outages [17].

### 3.2 Handling Censored Data in Training

A major challenge in training outage prediction models is "censored data"—specifically, ongoing outages where the final restoration time is not yet known at the time of analysis. 

Standard regression models fail when trained on censored data because they treat the current duration as the final duration, systematically underestimating restoration times. To handle this, systems must utilize reliability and survival methods designed for interval-censored data, where the time intervals specified in the data table cover the entire time period of the test [4]. This ensures that ongoing events contribute to the model's understanding of baseline hazard rates without skewing the predicted point estimates.

## 4. Simulating Realistic Service Operations

A robust simulation must account for the cascading effects of weather and dynamic events on planned operations. Adaptive Route Optimization (ARO) is the method of dynamically routing vehicles to meet maintenance goals based on changing conditions [1].

### 4.1 Scenario Walkthrough: Winter Storm Operations

1. **Morning (Planned Operations)**: The day begins with static route plans generated via CVRP for waste collection and VRPTW for street sweeping. Vehicles are dispatched from multiple depots based on historical resource management data [1].
2. **Midday (Storm Event & Cascade)**: A winter storm hits. The system ingests predictive weather and traffic information [1]. The storm causes power outages and road blockages. The outage prediction model (AFT/Survival) immediately generates estimated restoration times [5] [16].
3. **Afternoon (Dynamic Re-routing)**: The system triggers an ARO protocol. Street sweeping is suspended. Snow plows are dynamically routed to maximize the benefit of plowing (calculated by the travel time savings with and without plowing) while minimizing deadhead (traveling without plowing) [1]. Routes are adjusted to account for road-truck dependencies, ensuring multilane roads receive appropriate equipment [1].
4. **Evening (Resource Replenishment)**: As vehicles deplete fuel and salt, the CARP model routes them to the nearest available resource depots, ensuring service continuity [2] [1].

## 5. Route Completion Tracking Without GPS

While Automatic Vehicle Location (AVL) systems provide real-time vehicle tracking and arrival predictions [18], GPS signals can fail during severe storms or in urban canyons. The simulation must model alternative tracking methods.

### 5.1 Estimation Methods Comparison

| Tracking Method | Mechanism | Accuracy & Reliability Profile |
| :--- | :--- | :--- |
| **GPS / CAD-AVL** | Real-time location tracking via hardware [18]. | High accuracy; provides live ETAs and measures exact deviance from schedule [18] [10]. |
| **Schedule-Based** | Estimates progress based on historical time matrices and planned start times. | Moderate accuracy under normal conditions; degrades rapidly during weather events or traffic incidents. |
| **Manual Check-in** | Technicians use field service apps to log segment completion [19]. | High accuracy for completed work, but relies entirely on human compliance and introduces latency. |
| **Hybrid System** | Combines schedule adherence information with periodic manual check-ins or sparse AVL pings [9]. | Best alternative to pure GPS; uses known data points to correct schedule-based drift. |

**Key Takeaways:** Transit agencies successfully use schedule adherence information derived from AVL to improve on-time performance [9]. When GPS drops, the system should default to a hybrid model: projecting forward using the OSRM time matrix [7] [8] and correcting the projection whenever a manual check-in is registered via field operations software [19].

## 6. Recommended Simulation Approach for a Hackathon MVP

For a rapid prototype or hackathon MVP, the architecture should prioritize speed and integration over exhaustive constraint modeling.

1. **Routing Engine**: Deploy **VROOM** via Docker. It requires minimal setup and solves complex VRPs (including time windows and multi-depot scenarios) in milliseconds [6].
2. **Distance Matrix**: Use **OSRM** with a standard `car.lua` profile to feed travel times into VROOM [8].
3. **Outage Prediction**: Implement a lightweight Survival Analysis model (e.g., using Python's `lifelines` library) to handle right-censored historical outage data, outputting a point estimate and confidence interval [4] [16].
4. **Tracking Simulation**: Build a simple state machine that advances vehicle positions based on the VROOM schedule. Expose an API endpoint to accept "manual check-ins" that recalculate the remaining route time.

## 7. Conclusion & Immediate Next Steps

Implementing Simulation Layer M2 requires a synthesis of advanced operations research and machine learning. By modeling snow plowing as a Capacitated Arc Routing Problem [2] [12] and utilizing high-speed solvers like VROOM [6], municipalities can dynamically adapt to weather events, minimizing deadhead and resource waste [1]. Concurrently, deploying Accelerated Failure Time models ensures that dispatchers have accurate, statistically sound predictions for outage durations, even when training data is censored [4] [5]. 

**Next Steps:**
1. Initialize the OSRM backend with local municipal street data to generate accurate time and distance matrices [8].
2. Configure VROOM to ingest these matrices and test baseline CVRP solves for existing waste collection routes [3] [6].
3. Compile historical outage data, ensuring ongoing outages are properly flagged for interval-censored survival training [4].

## References

1. *Adaptive Route Optimization for Operations: Concept of ...*. https://ops.fhwa.dot.gov/publications/fhwahop24055/fhwahop24055.pdf
2. *Optimization Models for a Real-World Snow Plow Routing ...*. https://www.andrew.cmu.edu/user/vanhoeve/papers/CPAIOR16_Snowplow.pdf
3. *Capacitated vehicle-routing problem model for scheduled ...*. https://www.sciencedirect.com/science/article/abs/pii/S0956053X17307675
4. *Reliability and Survival Methods*. https://www.jmp.com/content/dam/jmp/documents/en/support/jmp17/reliability-and-survival-methods.pdf
5. *A Generalized Accelerated Failure Time Model to Predict ...*. https://link.springer.com/article/10.1007/s13753-023-00529-3
6. *VROOM-Project/vroom: Vehicle Routing Open-source ...*. https://github.com/vroom-project/vroom
7. *Vehicle Routing Problem with Time Windows | OR-Tools*. https://developers.google.com/optimization/routing/vrptw
8. *OSRM API Documentation*. https://project-osrm.org/docs/v5.5.1/api/
9. *Using AVL Data to Improve Transit On-Time Performance*. https://www.sciencedirect.com/science/article/pii/S1077291X22002028
10. *[PDF] Measurement and Prediction of Transit System Performance Using ...*. https://dot.ca.gov/-/media/dot-media/programs/research-innovation-system-information/documents/final-reports/ca24-3514-v2-a11y.pdf
11. *Waste collection routing: a survey on problems and methods*. https://link.springer.com/article/10.1007/s10100-023-00892-y
12. *Arc Routing: Problems, Methods, and Applications*. https://epubs.siam.org/doi/book/10.1137/1.9781611973679
13. *Vehicle Routing | OR-Tools*. https://developers.google.com/optimization/routing
14. *osrm-backend/profiles/car.lua at master*. https://github.com/project-osrm/osrm-backend/blob/master/profiles/car.lua
15. *osrm-backend - docs - profiles.md*. https://rs-loy-gitlab.concordia.ca/s_nejads/osrm-backend/-/blob/862ba15b00e6cb8af161f852ffb86467ad746d81/docs/profiles.md
16. *Combining Remotely Sensed Imagery With Survival ...*. https://openaccess.thecvf.com/content/CVPR2021W/EarthVision/papers/Jain_Combining_Remotely_Sensed_Imagery_With_Survival_Models_for_Outage_Risk_CVPRW_2021_paper.pdf
17. *Multilayer GNN for predictive maintenance and clustering ...*. https://www.sciencedirect.com/science/article/pii/S2589004225017511
18. *Enhancing Real-Time Accuracy with TransLoc's CAD/AVL System*. https://transloc.com/blog/cad-avl-system/
19. *Field Operations - Work Intelligence Software*. https://www.workstatus.io/industry/field-operations