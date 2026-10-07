# NIRBHAY Walkthrough

NIRBHAY is a proactive, privacy-first women’s safety intelligence platform built around the complete work-journey lifecycle:

**route risk → safety monitoring → anomaly detection → adaptive check-in → human verification → intervention → safe handoff**

> Important: this repository contains a working prototype/demo environment. Synthetic journeys and incidents are intentionally labeled as demo data. NIRBHAY does not guarantee safety or claim to predict specific crimes.

## 1. Open NIRBHAY

Production URL: https://nirbhay-six.vercel.app

The landing screen presents the product positioning: **Move Forward. Without Fear.**

Choose Employee, Security, or Admin from the role switcher.

## 2. Employee Home

Select **Employee → Enter Safety Mode**.

You will see the current safety state, Safety Confidence score, shift context, pickup information, expected travel time, transport verification, Route Risk, Start Safety Mode, Trusted Circle, and Safety History.

The purpose is to make safety a continuous layer around a work journey rather than a feature that only appears after an emergency.

## 3. AI Safety Score

Open **Risk Map**.

The prototype shows a synthetic route and an explainable Safety Confidence score. The explanation includes route risk, time-of-day context, environmental safety, verified hazards, transport verification, and journey context.

Example route tradeoffs:

| Route | Travel Time | Confidence |
|---|---:|---:|
| Recommended | 31 min | 88 |
| Safer Alternative | 35 min | 94 |
| Fastest | 29 min | 71 |

These values are demonstration data.

## 4. Journey Monitoring

Return to **Home → Start Safety Mode**.

The Journey screen shows route progress, driver, vehicle, last check-in, anomaly monitoring, Silent SOS, and the safe-handoff sequence:

**Pickup → Driver → Vehicle → Transit → Drop → Workplace Entry**

A vehicle reaching the destination does not automatically close the journey.

## 5. Route Anomaly Detection

Inside the journey screen select **Simulate anomaly**.

The prototype changes the journey state and records an event representing an unexpected stop plus route deviation.

Important product rule: an anomaly is evidence that the journey needs attention, not proof that a crime is occurring.

## 6. Adaptive Check-in

The intended workflow is:

**Anomaly detected → Everything okay? → I’m Safe / Need Help / Can’t Respond → Security verification if unresolved**

Selecting **I’m Safe** returns the journey toward normal monitoring and records the check-in event.

## 7. Silent SOS

Inside **Journey → Silent SOS**, select **Trigger Silent SOS**.

The prototype moves the incident to **CRITICAL / VERIFYING**.

The product concept supports phone gestures, a voice phrase, and wearable gestures. These are integration boundaries in the browser prototype rather than fake claims of access to physical device hardware.

## 8. Security Command Center

Switch to **Security**.

The command center contains Active Journeys, Normal, Watch, Alert, Critical, a live journey map, a priority incident, the incident timeline, and the journey table.

The security view is intended for authorized security personnel, not ordinary managers with unrestricted employee tracking.

## 9. Real-Time Sync

Open NIRBHAY in two browser windows.

Window A: choose Employee and trigger an anomaly or Silent SOS.

Window B: choose Security and watch the command center.

The employee action is written to Supabase PostgreSQL. Supabase Realtime broadcasts the database change, and the security client updates without a manual refresh.

The connection indicator shows **Realtime live**, **Supabase syncing**, or **Offline**.

## 10. Human Verification

From the security command center, inspect the priority incident.

Available actions include **Call Employee**, **Contact Driver**, **Dispatch Security**, and **Resolve**.

The core governance rule is:

**AI prioritizes. Human security personnel verify and decide.**

## 11. Escalation

Select **Dispatch Security**.

The incident becomes **CRITICAL / ESCALATED** and the change is persisted in Supabase and propagated through Realtime.

## 12. Resolution

Select **Resolve** after the event is handled.

The incident becomes **RESOLVED**. The updated state is persisted and visible to connected clients.

## 13. Safe Handoff

Return to the employee journey.

Verify the handoff sequence:

1. Pickup verified
2. Driver verified
3. Vehicle verified
4. Transit verified
5. Drop verified
6. Workplace entry verified

Use **Confirm Workplace Entry** to complete the final stage.

This is one of NIRBHAY’s core product decisions: transport arrival is not equivalent to safe workplace handoff.

## 14. Trusted Circle and Privacy

Open **Safety**.

The prototype demonstrates a Trusted Circle and configurable emergency-sharing scopes.

Normal journeys are intended for authorized journey monitoring. Emergency states can share information with security and selected trusted contacts. Outside authorized conditions, continuous employer live location is not intended to be exposed.

## 15. Safety History

Open **Safety History**.

The page shows synthetic previous journeys, their Safety Confidence scores, and example outcomes such as Completed Safely or Security Review.

These are demo records, not real incident statistics.

## 16. Admin

Switch to **Admin**.

The admin side represents organization-level oversight such as safety analytics, transport performance, recurring risk patterns, escalation policies, verified safety zones, and configuration.

Normal managers should not receive unrestricted continuous employee location.

## 17. What Is Real

Real in this prototype:

- React and TypeScript application
- Vercel production deployment
- Supabase PostgreSQL backend
- Supabase Realtime subscriptions
- persisted demo journey changes
- persisted demo incidents
- persisted event log
- responsive employee experience
- responsive enterprise command center
- route visualization
- incident state transitions
- safe-handoff state transitions

## 18. What Is Simulated

Demo-only boundaries include:

- historical safety intelligence
- AI model inference
- real driver/provider verification
- real emergency dispatch
- SMS/cellular fallback
- physical phone gestures
- wearable signals
- real-world crime feeds
- production identity and role authorization
- production GPS tracking
- production notification delivery

The boundary is intentional. The prototype demonstrates the safety workflow without pretending a browser has direct access to emergency infrastructure.

## 19. Recommended Live Demo

1. Open NIRBHAY in two browser windows.
2. Window A: Employee → Journey → Simulate anomaly.
3. Window B: Security → observe the updated incident.
4. Window A: Trigger Silent SOS.
5. Window B: Dispatch Security.
6. Resolve the incident.
7. Return to Employee and complete Workplace Entry.

This demonstrates the full loop:

**Predict → Detect → Check → Verify → Respond → Handoff**

## 20. Development

Use pnpm for local development:

pnpm install
pnpm dev
pnpm build

Environment variables:

VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key

Only the Supabase publishable client key belongs in browser code. Never expose a service-role key in frontend code.

## 21. Core Product Story

NIRBHAY starts before an emergency.

It evaluates a journey, explains the risk, monitors the route, detects unusual conditions, checks whether the employee is okay, brings in authorized human security when needed, and verifies safe handoff into the workplace.

**NIRBHAY is not another SOS button. It is a proactive safety intelligence layer around the entire work journey.**