# NIRBHAY Implementation Plan

## Phase 0: Foundation

Build the application shell first.

Deliver:
- React + TypeScript
- responsive CSS system
- brand tokens
- routing
- employee shell
- enterprise shell
- typed domain models
- mock repository layer

Do not start with a decorative dashboard.

## Phase 1: Employee Core

Implement:

1. Home
2. Journey
3. Risk Map
4. Safety
5. Profile

Core state:
- no active journey
- planned journey
- active journey
- watch
- alert
- critical
- completed

## Phase 2: Route Risk

Implement the first major demo path:

**Select shift → evaluate route → show risk → compare alternatives → choose route**

Build:
- route mock service
- route segments
- risk bands
- explainable risk assessment
- safety confidence score

The route map may be mocked initially.

## Phase 3: Journey Monitoring

Implement deterministic simulated location updates.

Build:
- journey observation model
- expected route progress
- route deviation detection
- unexpected stop
- duration threshold
- geofence state
- anomaly state machine

Keep the demo deterministic.

## Phase 4: Adaptive Check-in

Build:
- contextual trigger rules
- check-in bottom sheet
- SAFE
- NEED_HELP
- CANNOT_RESPOND
- NO_RESPONSE
- escalation transition

Make the check-in interaction fast and discreet.

## Phase 5: Silent SOS

Build:
- configurable trigger settings UI
- simulated button/gesture trigger
- simulated voice trigger
- simulated wearable trigger
- discreet confirmation
- incident creation

Physical hardware integrations remain adapters/future integrations.

## Phase 6: Security Command Center

Build:
- overview
- active journey table
- live map abstraction
- alert queue
- incident detail panel
- incident timeline
- officer actions

Make the command center useful without overwhelming the screen.

## Phase 7: Human Verification

Connect the incident flow:

**Detection → Security → Contact → Verify → Dispatch/Escalate → Resolve**

Every action creates an audit-style timeline entry.

## Phase 8: Safe Handoff

Build the complete journey chain:

**Pickup → Driver/Vehicle → Transit → Drop → Workplace Entry**

Add incomplete-handoff states.

This is a required demo feature, not a nice-to-have.

## Phase 9: Privacy

Build:
- location visibility
- emergency sharing policy
- time-based sharing
- retention explanation
- employee control UI

The architecture must centralize these decisions.

## Phase 10: Supporting Ecosystem

Implement:
- Trusted Circle
- Hazard Reporting
- Safe Zones
- Safety History
- Transport Accountability
- Organization Analytics

These should use the same domain events and journey data rather than becoming independent mini-apps.

## Phase 11: Offline Mode

Implement:
- local journey cache
- event queue
- retry status
- sync indicator
- low-connectivity state

Do not simulate capabilities that are not actually implemented.

## Phase 12: Hardening

Test:
- mobile layouts
- accessibility
- state transitions
- error states
- permission states
- offline state
- false alarms
- incomplete handoff
- command center responsiveness

Run a complete demo from start to finish.

## Priority Order

### P0 — Must work

- route evaluation
- risk score
- anomaly detection
- check-in
- silent SOS simulation
- command center
- human verification
- safe handoff

### P1 — Must be polished

- privacy controls
- safety history
- driver verification
- trusted circle
- risk explanations

### P2 — Supporting ecosystem

- hazard reporting
- safe zones
- transport accountability
- organization analytics
- offline sync visualization

## What Not To Build Yet

Avoid spending prototype time on:
- custom ML training
- real emergency-service integrations
- full wearable SDK support
- full telecom fallback infrastructure
- large-scale crime databases
- organization billing
- generic social features
- unrelated wellness utilities

Those can be future production integrations.

## Completion Gate

A build is demo-ready when the following can be shown without manual database edits:

**Route evaluated**
→ **risk score explained**
→ **journey started**
→ **anomaly generated**
→ **check-in shown**
→ **missed response escalated**
→ **security officer verifies**
→ **response recorded**
→ **drop verified**
→ **workplace entry verified**
→ **journey completed**
→ **history updated**

If that chain works cleanly, the prototype has a credible core.

If it does not, adding another dashboard card will not save it.