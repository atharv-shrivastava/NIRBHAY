# NIRBHAY

## Proactive Women’s Safety Intelligence Platform

NIRBHAY is a proactive, privacy-first safety platform for women working late-night shifts, using corporate transport, working in gig-economy roles, or performing field assignments.

> **NIRBHAY does not wait for an emergency. It continuously evaluates journey risk, detects anomalies, gives the user control, verifies incidents through human security personnel, and ensures safe handoff from transport to workplace.**

NIRBHAY is intentionally designed as a focused safety product rather than a collection of loosely connected safety utilities. The prototype prioritizes a small number of end-to-end flows that can actually be demonstrated.

## Positioning

**NIRBHAY is not another SOS button.**

It is a proactive safety intelligence layer around the entire work journey.

### One-line positioning

> **A proactive, privacy-first safety platform that predicts journey risk, detects anomalies, verifies emergencies, and ensures safe handoff from transport to workplace.**

## Core promise

NIRBHAY helps organizations and employees move from:

**reactive emergency response**

to:

**risk intelligence → anomaly detection → contextual check-in → human verification → intervention → safe handoff**

The system does not claim to guarantee safety or predict crimes. It identifies risk patterns, detects journey anomalies, supports human verification, and assists response.

## Final Feature Set

### 1. AI Predictive Safety Score

A real-time journey risk score based on factors such as:

- route characteristics
- time of day
- historical incident patterns
- traffic/context signals
- verified hazards
- journey context
- transport verification

The score is explainable. Users can inspect why the score changed rather than being handed an opaque AI number.

### 2. Automated Route Anomaly Detection

Detects contextual journey anomalies including:

- unexpected route deviations
- unscheduled stops
- excessive stop duration
- wrong-direction movement
- excessive travel time
- geofence violations
- destination mismatch
- unusual journey termination

A single noisy GPS point must not immediately become an emergency. The anomaly system evaluates events in context.

### 3. Silent Multi-Modal SOS

Supports discreet emergency activation through:

- phone gesture/button patterns
- voice trigger
- wearable gesture
- configurable gesture concepts

Emergency activation should provide discreet confirmation and avoid a large public SOS interface.

### 4. Adaptive Safety Check-ins

Safety check-ins are context-aware instead of being based only on fixed timers.

Example:

**Unexpected stop detected**
→ **Everything okay?**
→ **I’m Safe / Need Help / Can’t Respond**

A missed response can increase journey severity and notify the security center according to policy.

### 5. Safe Handoff Verification

NIRBHAY verifies the full journey:

**pickup → driver/vehicle → transit → drop → workplace entry**

A cab reaching a destination does not automatically mean the employee is safely handed off.

### 6. Human-in-the-Loop Emergency Escalation

AI detects and prioritizes incidents.

Authorized security personnel verify the situation and decide whether to:

- contact the employee
- contact the driver
- dispatch security
- notify the trusted circle
- escalate to emergency services
- resolve as a false alarm

Every major action is recorded in the incident timeline.

### 7. Enterprise Safety Command Center

Provides enterprise security teams with:

- live journey status
- risk levels
- active alerts
- driver/vehicle information
- last check-in
- incident timelines
- response actions
- journey monitoring

### 8. Transport & Employer Accountability

Tracks operational safety performance such as:

- route compliance
- driver incidents
- response times
- repeated unsafe locations
- transport-provider performance

### 9. Safety Squad / Trusted Circle

Employees can configure trusted people who may receive selected safety notifications.

Normal journeys should not become unrestricted live-location sharing.

### 10. Verified Hazard & Safe-Zone Network

Users and security teams can report safety concerns.

Verified reports become safety intelligence.

The network also supports verified safe nodes such as:

- workplace security checkpoints
- partner locations
- hospitals
- police stations
- designated security points

### 11. Privacy-First Location Control

Employees control:

- who may access location
- when location may be shared
- emergency sharing rules
- selected journey/shift conditions

Outside authorized incident conditions, employers should primarily receive aggregated operational information rather than continuous employee tracking.

### 12. Offline & Cellular-Fallback Safety Mode

During poor connectivity, the system should:

- retain encrypted local journey data
- queue important events
- continue local workflow state
- attempt available fallback communication
- synchronize when connectivity returns

The UI must clearly communicate when real-time network functionality is limited.

## Six Demo Stars

The prototype must prominently demonstrate:

1. **AI Safety Score**
2. **Route Anomaly Detection**
3. **Adaptive Check-in**
4. **Silent SOS**
5. **Human Verification**
6. **Safe Handoff**

The remaining features support the surrounding product ecosystem and can be demonstrated through the command center, history, analytics, and settings screens.

## Roles

### Employee

Manages journeys, route risk, safety mode, check-ins, SOS configuration, trusted circle, privacy settings, hazards, and safety history.

### Security Officer

Monitors active journeys, investigates anomalies, verifies incidents, communicates with participants, escalates incidents, and closes cases.

### Security Supervisor / Admin

Reviews organization-wide safety analytics, escalation policies, security operations, transport performance, recurring incident patterns, and verified safety zones.

## Design Direction

NIRBHAY is **mobile-first**.

The employee experience is designed for smartphone-sized screens first, then progressively enhanced for tablet and desktop.

The enterprise security command center is desktop/tablet optimized while remaining responsive.

### Brand colors

**Vanilla Custard**
- primary page background
- light surfaces
- soft map background
- calm visual states

**Flamingo Pink**
- primary CTA
- active navigation
- safety actions
- high-attention highlights

**Brandy Brown**
- text
- headings
- navigation
- borders
- serious interface elements

Avoid generic blue cybersecurity styling.

Avoid excessive:

- neon
- cyberpunk visuals
- glassmorphism
- large permanent SOS buttons
- decorative animations
- stock-photo-heavy layouts

The desired feeling is:

**warm + trustworthy + discreet + premium + human**

## Prototype Boundary

This repository is for a production-structured prototype.

It should use realistic demo interactions and clearly labeled demo data.

The prototype may mock:

- map data
- historical safety intelligence
- incident events
- driver records
- organizations
- emergency workflows
- notification delivery
- cellular fallback
- wearable triggers

Mock data must never be represented as real-world crime statistics.

Use a visible **DEMO DATA** label where appropriate.

## Core End-to-End Journey

**Shift Selected**
↓
**Route Evaluated**
↓
**Safety Confidence Score**
↓
**Route Chosen**
↓
**Driver + Vehicle Verified**
↓
**Safety Mode Started**
↓
**Journey Monitored**
↓
**Anomaly Detected**
↓
**Adaptive Check-in**
↓
**User Response**
↓
If concern/no response:
**Security Verification**
↓
**Response / Escalation**
↓
**Drop Verified**
↓
**Workplace Entry Verified**
↓
**Journey Closed**
↓
**Safety History Updated**

## Suggested Project Structure

```text
NIRBHAY/
├─ docs/
│  ├─ PRODUCT_SPEC.md
│  ├─ ARCHITECTURE.md
│  ├─ DATA_MODEL.md
│  ├─ DEMO_FLOW.md
│  └─ IMPLEMENTATION_PLAN.md
├─ src/
│  ├─ app/
│  ├─ components/
│  ├─ features/
│  │  ├─ risk/
│  │  ├─ journey/
│  │  ├─ anomaly/
│  │  ├─ checkin/
│  │  ├─ sos/
│  │  ├─ handoff/
│  │  ├─ incidents/
│  │  ├─ privacy/
│  │  └─ command-center/
│  ├─ domain/
│  ├─ services/
│  ├─ mock/
│  ├─ types/
│  └─ main.tsx
├─ public/
├─ package.json
└─ README.md
```

The UI should not contain domain logic directly. Keep risk calculation, anomaly classification, escalation rules, data access, and notification behavior in separable modules.

## Walkthrough

For a step-by-step guide to the employee journey, realtime anomaly/SOS demo, security verification flow, safe handoff, and production prototype boundaries, see [`docs/WALKTHROUGH.md`](./docs/WALKTHROUGH.md).

**Live prototype:** https://nirbhay-six.vercel.app

## Technology Direction

Recommended baseline:

- React
- TypeScript
- Vite or Next.js
- Tailwind CSS or equivalent maintainable CSS system
- responsive component primitives
- modular map abstraction
- mock service layer
- typed domain models

The architecture should keep the data layer and services replaceable so production APIs can later be connected without rewriting the entire interface.

## Safety & Trust Principles

### Proactive, not reactive

Detect unusual conditions before they become emergencies.

### Human-in-the-loop

AI assists; authorized humans make critical intervention decisions.

### User autonomy

Safety controls should not unnecessarily remove employee choice.

### Privacy-first

Safety should not become unrestricted workplace surveillance.

### Explainable AI

Important AI-derived risk values must have understandable reasons.

### Safe handoff

Transport arrival is not equivalent to employee safety.

### Accountability

Employers and transport providers are measurable participants in the safety system.

### Graceful failure

The system must behave sensibly when GPS, network, or other signals are degraded.

## Non-Goals

The prototype must not:

- claim to predict specific crimes with certainty
- claim guaranteed safety
- silently expose unrestricted employee live location to normal managers
- treat one GPS fluctuation as an emergency
- use fabricated incident statistics as real data
- make emergency escalation entirely autonomous when human verification is required
- turn into a generic social network or citizen reporting app

## Status

NIRBHAY starts as a focused end-to-end prototype. The goal is not twelve half-built features. The goal is a credible safety workflow in which the most important interactions actually work.
