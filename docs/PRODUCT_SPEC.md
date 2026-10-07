# NIRBHAY Product Specification

## 1. Product Definition

NIRBHAY is a proactive, privacy-first safety intelligence platform for women working late-night shifts, using employer-arranged transport, performing gig or field work, or otherwise travelling as part of a work journey.

The system surrounds a journey with contextual intelligence instead of waiting for a manually triggered SOS.

The core operating model is:

**Predict risk → monitor context → detect anomalies → check in → verify through humans → respond → verify handoff**

## 2. Primary Personas

### Employee

Primary mobile user.

Needs:
- confidence before starting a trip
- discreet access to help
- minimal interaction during normal travel
- control over location sharing
- clear explanations when risk changes

### Security Officer

Primary incident-response user.

Needs:
- quickly understandable risk
- evidence behind an alert
- journey context
- driver and vehicle verification
- fast contact/escalation actions
- complete incident history

### Security Supervisor / Admin

Needs:
- operational overview
- response performance
- route compliance
- transport-provider accountability
- recurring risk patterns
- policy configuration

## 3. Employee Information Architecture

Bottom navigation:

**Home | Journey | Risk Map | Safety | Profile**

### Home

Shows:
- current safety state
- current journey state if active
- upcoming shift
- assigned transport
- quick actions
- latest safety event

### Journey

Shows:
- current journey state
- route progress
- driver/vehicle
- anomaly timeline
- check-in state
- handoff state

### Risk Map

Shows:
- proposed route
- route-segment risk
- alternative routes
- historical route profile
- safe zones
- verified hazards

### Safety

Shows:
- Silent SOS methods
- Trusted Circle
- emergency behavior
- safety controls
- recent alerts

### Profile

Shows:
- account
- privacy controls
- notification preferences
- data-retention information
- accessibility preferences

## 4. Enterprise Information Architecture

Desktop/tablet navigation:

**Overview | Live Journeys | Alerts | Risk Map | Incidents | Transport | Analytics | Settings**

## 5. Route Risk Intelligence

Before a journey starts, NIRBHAY evaluates:

- pickup
- destination
- planned start time
- route geometry
- route history
- historical incidents
- verified hazards
- safe-zone availability
- transport verification
- current journey context

### Route segment classification

Each route segment can be labeled:

- Low Risk
- Moderate Risk
- Elevated Risk
- High Risk

Severity must be communicated with:

- status text
- icon
- color
- contextual explanation

Color must never be the only indicator.

### Risk explanation

Example:

**Why did risk increase?**

- route entered an elevated-risk segment
- journey is occurring during a higher-risk period
- a verified hazard is nearby
- vehicle deviated from the expected route

## 6. Safety Confidence Score

The UI should use one understandable number for the journey while keeping the underlying calculation explainable.

Example:

**Safety Confidence: 89 / 100**

Example contribution categories:

- Historical route risk: 25%
- Time-of-day context: 20%
- Environmental safety: 20%
- Verified hazards: 15%
- Transport verification: 10%
- Current journey context: 10%

These percentages are a product-design example, not a claim that they are optimal real-world model weights.

The system should support future recalibration without changing the UI contract.

## 7. Route Alternatives

Offer a user choice among options.

Example:

**Recommended Route**
31 min · Safety Confidence 88

**Safer Alternative**
35 min · Safety Confidence 94

**Fastest Alternative**
29 min · Safety Confidence 71

Explain tradeoffs rather than coercing the user.

Example:

> Route A adds 4 minutes but avoids two elevated-risk segments.

## 8. Anomaly Detection

The anomaly engine evaluates journey events over time.

Potential signals:

- route deviation
- unexpected stop
- stop duration
- wrong direction
- geofence exit
- excessive journey duration
- destination mismatch
- unexpected termination
- repeated deviation

### Journey severity state machine

**NORMAL**
- expected route and timing

↓

**WATCH**
- low-confidence anomaly or isolated abnormal condition

↓

**ALERT**
- meaningful anomaly, missed check-in, or accumulated evidence

↓

**CRITICAL**
- high-confidence risk pattern or emergency activation

The system must evaluate combinations and persistence where appropriate.

### Example progression

Normal:
Vehicle follows expected route.

Watch:
Unexpected stop detected.

Alert:
Unexpected stop + route deviation.

Critical:
Route deviation + prolonged stop + missed safety check-in.

This is illustrative behavior for the prototype.

## 9. Adaptive Check-ins

Check-ins are triggered by context.

A trigger may occur because:

- a suspicious stop begins
- route deviation persists
- journey takes substantially longer than expected
- another policy-defined risk threshold is crossed

### Check-in actions

**I’m Safe**
- record response
- temporarily reduce escalation pressure
- continue monitoring

**Need Help**
- send incident into security workflow
- move journey to Alert/Critical depending on context

**Can’t Respond**
- treat as an explicit safety concern
- alert security

No response:
- wait according to policy
- escalate based on journey severity and context

## 10. Silent SOS

Emergency activation is intentionally discreet.

### Trigger types

- button/volume pattern
- gesture
- configured phrase
- wearable gesture

### Post-trigger behavior

The user receives discreet feedback.

The system:
1. creates emergency event
2. attaches current journey context
3. notifies security operations
4. applies escalation policy
5. optionally notifies trusted circle
6. records the event

A visible public SOS wall should not dominate the employee UI.

## 11. Human Verification

Critical workflow:

**Detection**
→ **Classification**
→ **User check-in**
→ **Security notification**
→ **Officer verification**
→ **Response**
→ **Escalation or resolution**

### Officer actions

- Call Employee
- Contact Driver
- Verify Vehicle
- Dispatch Security
- Notify Trusted Circle
- Escalate
- Mark False Alarm
- Resolve

The incident timeline records actor, action, time, and resulting state.

## 12. Safe Handoff

Handoff status consists of:

### Pickup

Was pickup verified?

### Driver and vehicle

Was the assigned driver and vehicle verified?

### Transit

Did the journey follow the expected transport path?

### Drop

Was the destination arrival verified?

### Workplace entry

Did the employee confirm safe entry into the workplace?

### Close

The journey is only fully completed when configured handoff conditions are satisfied.

### Incomplete handoff example

Vehicle arrives.

Three minutes later:

**Workplace handoff pending**

Employee actions:

**I’m inside**
or
**I need assistance**

If the handoff does not complete within policy, an anomaly is generated.

## 13. Driver / Vehicle Verification

Employee-facing data:
- driver name
- driver avatar/photo placeholder
- vehicle number
- vehicle type
- trip ID
- provider
- verification status

Security-facing data may be more detailed, but access must remain role-authorized.

## 14. Trusted Circle

Employee chooses contacts or peers.

Notification preferences can include:
- check-in alerts
- active journey alerts
- emergency alerts
- emergency location

Normal journeys should not automatically expose continuous real-time location.

## 15. Hazard Reporting

Report categories:

- poor lighting
- unsafe exit
- suspicious activity
- harassment concern
- dangerous road section
- transport issue
- recurring driver issue
- isolated area
- other

Report lifecycle:

**Reported → Under Review → Verified / Rejected → Resolved**

Only verified hazards should be treated as high-confidence safety intelligence.

## 16. Safe Zones

Safe nodes may include:
- workplace security points
- partner businesses
- hospitals
- police stations
- designated corporate security locations

The UI should show:
- distance
- category
- expected availability when known
- navigation action

In elevated-risk contexts, the product can suggest an appropriate nearby node.

## 17. Command Center

Top-level counters:

- Active Journeys
- Normal
- Watch
- Alert
- Critical

Main panels:
- live journey map
- journey table
- active alerts
- response queue
- selected journey detail

Journey table fields:

Employee | Status | Risk | Driver | Vehicle | Last Check-in | Route | Updated

## 18. Incident Detail

Example:

**Journey ID:** NIR-10482
**Current Risk:** 87 / 100
**Status:** ALERT
**Anomaly:** Unexpected stop + route deviation
**Driver:** Verified
**Vehicle:** Verified
**Last Check-in:** 10:43 PM

Timeline:

10:39 PM — Journey started
10:42 PM — Route deviation detected
10:43 PM — Unexpected stop detected
10:44 PM — Check-in sent
10:45 PM — No response
10:46 PM — Security alert generated

Actions:
- Call Employee
- Contact Driver
- Dispatch Security
- Notify Trusted Circle
- Escalate
- Resolve

## 19. Accountability

Track:
- route compliance
- driver safety incidents
- incident response times
- repeated unsafe locations
- provider performance

Example operational metrics:

Provider A — Route compliance 96%
Provider B — Route compliance 89%

These are demo metrics only unless connected to validated production data.

## 20. Privacy Controls

Settings should include:

### Location access

- Only me
- Security during active shift
- Trusted Circle during emergency
- Security + Trusted Circle during emergency

### Location sharing timing

- active shift
- active journey
- alert only
- custom schedule

### Data retention

Explain the retention policy in plain language.

The interface should distinguish:
- operational journey data
- incident data
- emergency location access
- aggregated analytics

## 21. Offline State

When connectivity is weak:

**Low Connectivity**
Safety monitoring continues with limited network functionality.

The application should maintain:
- local encrypted journey state
- queued events
- last known state
- retry/sync status

It must not present false live-tracking claims while offline.

## 22. False Alarm

A false alarm can be marked with:

- accidental trigger
- GPS inaccuracy
- planned route change
- safe unexpected stop
- other

False alarms should be handled operationally and must not permanently punish the employee.

## 23. Notifications

### Informational

Journey started.

### Watch

An unusual journey event was detected.

### Alert

We could not confirm your safety.

### Critical

Security escalation is in progress.

Notification content should avoid unnecessarily revealing sensitive details on lock screens.

## 24. Accessibility

Support:
- readable typography
- accessible contrast
- large touch targets
- icon + text
- keyboard navigation
- screen-reader labels
- optional voice interaction
- haptic interaction concepts
- regional language architecture

## 25. Demo Data Policy

Use synthetic demo entities:
- Demo City
- Demo Office
- Demo Routes
- Demo Employees
- Demo Drivers
- Demo Incidents

Clearly label synthetic safety data.

Never fabricate a real city's crime rate for demonstration.

## 26. Product Constraints

NIRBHAY does not:
- guarantee personal safety
- predict a specific crime with certainty
- replace human emergency response
- give ordinary employers unrestricted live location
- treat isolated sensor noise as proof of danger
- hide the distinction between demo data and validated operational data
