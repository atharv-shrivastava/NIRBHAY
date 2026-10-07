# NIRBHAY Demo Flow

## Purpose

The prototype should be demonstrable end-to-end in a short, understandable sequence.

The six primary stars are:

**AI Safety Score → Route Anomaly → Adaptive Check-in → Silent SOS → Human Verification → Safe Handoff**

The best demo is a coherent journey rather than a tour of unrelated screens.

## Scenario

Demo employee:

**Ananya Sharma**

Role:
Late-night shift employee

Shift:
10:00 PM – 6:00 AM

Pickup:
Demo Residential Pickup

Destination:
Demo Corporate Workplace

Transport:
Demo Secure Transit Provider

Trip:
NIR-10482

All displayed entities are synthetic.

## Scene 1: Home

Show:

**Night Shift**
10:00 PM – 6:00 AM

Pickup:
8:58 PM

Destination:
Demo Corporate Workplace

Transport:
Verified

Primary action:

**Check Route**

## Scene 2: Route Risk

Show the proposed route with segmented risk.

Example:

Recommended Route:
31 min

Safety Confidence:
**89 / 100**

Reasons:
- route mostly low risk
- verified transport
- favorable route history
- one elevated-risk segment

Offer:

**Safer Alternative**
35 min · 94 / 100

The employee chooses the recommended route or safer alternative.

The system explains the tradeoff.

## Scene 3: Transport Verification

Show:

Driver:
**Verified**

Vehicle:
**Verified**

Trip:
**Assigned**

Show vehicle number and trip ID in a privacy-conscious format.

Primary action:

**Start Safety Mode**

## Scene 4: Journey Monitoring

Show:

**Journey Under Monitoring**

Risk:
Low / Normal

Route progress moves through predefined demo positions.

No emergency behavior should occur while the trip is normal.

## Scene 5: Trigger Anomaly

At a scripted demo point:

**Unexpected stop detected**

Then:

**Route deviation detected**

Journey state changes:

**NORMAL → WATCH**

If the anomaly persists:

**WATCH → ALERT**

The UI should explain:

> An unexpected stop and route deviation were detected.

Do not claim that this event proves criminal activity.

## Scene 6: Adaptive Check-in

Show a discreet bottom sheet:

**Everything okay?**

Actions:

**I’m Safe**
**Need Help**
**Can’t Respond**

For the main demo path, do not press “I’m Safe” immediately. Let the security workflow begin.

## Scene 7: Missed Check-in

Simulate no response.

Timeline:

10:43 PM — Unexpected stop detected
10:44 PM — Safety check-in sent
10:45 PM — No response

Journey becomes:

**ALERT**

Security Center notification appears.

## Scene 8: Security Command Center

Switch to the enterprise dashboard.

Show:

Active Journeys: 37
Normal: 32
Watch: 3
Alert: 1
Critical: 1

Open:

**NIR-10482**

Display:
- risk score
- anomaly
- employee identifier
- driver
- vehicle
- last check-in
- journey timeline

Officer actions:
- Call Employee
- Contact Driver
- Verify Vehicle
- Dispatch Security
- Notify Trusted Circle
- Escalate
- Resolve

## Scene 9: Silent SOS

For a second demonstration path, reset the journey or use a separate scripted scenario.

Trigger:

**Silent SOS — Voice / Gesture**

The employee view should not show a giant red emergency screen.

Show subtle in-app/haptic confirmation concept:

**Safety alert sent**

Security receives a high-priority incident.

This demonstrates that SOS is one input into a larger verification workflow.

## Scene 10: Human Verification

Security officer opens incident.

Show:

**Incident status: VERIFYING**

Officer:
**Call Employee**

Then:

**Employee response unavailable**

Officer:
**Contact Driver**

Driver:
**Verified**

Officer:
**Dispatch Security**

Incident:
**ESCALATED**

Every action appears in the timeline.

## Scene 11: Safe Handoff

Continue or reset to a normal completion scenario.

Show:

✓ Pickup verified
✓ Driver verified
✓ Vehicle verified
✓ Transit completed
✓ Drop verified
⚠ Workplace entry pending

The vehicle has arrived.

Do not close the journey.

Show:

> Vehicle arrived 3 minutes ago. Workplace handoff has not been confirmed.

Employee action:

**I’m inside**

Now:

✓ Workplace entry verified

Journey:

**COMPLETED**

## Scene 12: Safety History

Open the employee history.

Show:

**NIR-10482**

Safety Confidence:
89

Final state:
Completed Safely

Timeline includes:
- route evaluation
- anomaly
- check-in
- incident resolution
- handoff completion

## Optional Supporting Screens

Use these only after the main story:

- Trusted Circle
- Hazard Reports
- Safe Zones
- Privacy Settings
- Transport Accountability
- Organization Analytics
- Offline State

The prototype should never spend most of its demo time on secondary screens while the six primary flows remain superficial.

## Demo Rules

### Rule 1: Use synthetic data

Label demo statistics as:

**DEMO DATA**

### Rule 2: Make the progression obvious

The audience should understand:

**Normal → Watch → Alert → Human Verification → Resolution**

### Rule 3: Keep AI explainable

Never present:
“AI detected danger.”

Present:
“Risk increased because route deviation + unexpected stop + missed check-in were detected.”

### Rule 4: Show user control

The employee should not be presented as a passive tracked object.

She should:
- choose the route
- choose sharing settings
- configure trusted contacts
- respond to check-ins
- control emergency methods

### Rule 5: Show organizational accountability

Security should be able to see:
- transport performance
- route compliance
- response time
- recurring locations
- incident outcomes

### Rule 6: Show safe handoff

The final punchline of the demo is:

> Reaching the destination is not the same thing as reaching safety.

## Demo Reset

Provide a developer/demo control that can reset the scripted state:

```text
RESET DEMO JOURNEY
RESET INCIDENT
RESET HANDOFF
RESET COMMAND CENTER
```

This should be hidden from normal employee-facing navigation.

## Suggested Demo Clock

The journey does not need to run in real time.

Use a deterministic simulated clock so the entire flow can be shown quickly.

Example:

10:42 PM — deviation
10:43 PM — stop
10:44 PM — check-in
10:45 PM — missed response
10:46 PM — security alert

This makes demos reproducible rather than dependent on actual GPS or network timing.
