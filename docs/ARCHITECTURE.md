# NIRBHAY Architecture

## 1. Architectural Goal

Build NIRBHAY as a production-structured application with a realistic prototype implementation.

The architecture should separate presentation, domain logic, data access, mock services, and future integrations.

The central rule is:

> UI components render state. Domain services decide state.

Business rules must not be scattered through buttons, modals, and map components.

## 2. Logical Layers

### Presentation Layer

Responsible for:
- screens
- navigation
- responsive layout
- cards
- maps
- dialogs
- bottom sheets
- status indicators
- accessibility

It consumes domain state and invokes application actions.

### Application Layer

Responsible for use cases such as:
- start journey
- evaluate route
- activate safety mode
- process location update
- trigger check-in
- process check-in response
- create SOS
- escalate incident
- verify handoff
- close journey

### Domain Layer

Responsible for safety concepts:
- risk scoring
- anomaly classification
- severity transitions
- check-in policy
- escalation policy
- handoff rules
- privacy decisions

### Service Layer

Adapters for:
- maps
- routing
- location
- notifications
- authentication
- transport verification
- storage
- analytics
- future AI models

### Data Layer

Provides:
- repository interfaces
- demo repositories
- future API implementations
- persistence
- synchronization

## 3. Suggested Module Layout

```text
src/
├─ app/
│  ├─ router/
│  ├─ providers/
│  └─ shell/
├─ components/
│  ├─ ui/
│  ├─ cards/
│  ├─ maps/
│  ├─ timelines/
│  └─ safety/
├─ features/
│  ├─ auth/
│  ├─ dashboard/
│  ├─ route-risk/
│  ├─ journey/
│  ├─ anomaly/
│  ├─ checkin/
│  ├─ sos/
│  ├─ handoff/
│  ├─ incidents/
│  ├─ trusted-circle/
│  ├─ hazards/
│  ├─ privacy/
│  ├─ history/
│  └─ command-center/
├─ domain/
│  ├─ risk/
│  ├─ journey/
│  ├─ anomaly/
│  ├─ escalation/
│  ├─ privacy/
│  └─ handoff/
├─ services/
│  ├─ map/
│  ├─ location/
│  ├─ notification/
│  ├─ storage/
│  ├─ transport/
│  └─ sync/
├─ mock/
│  ├─ data/
│  ├─ repositories/
│  └─ scenarios/
├─ types/
└─ main.tsx
```

## 4. Risk Engine

The risk engine receives a structured journey context.

Conceptual input:

```ts
type JourneyRiskContext = {
  routeRisk: number
  timeRisk: number
  environmentalRisk: number
  verifiedHazardRisk: number
  transportVerification: number
  journeyContextRisk: number
}
```

The output should include:

```ts
type RiskAssessment = {
  score: number
  band: "low" | "moderate" | "elevated" | "high"
  reasons: RiskReason[]
  evaluatedAt: string
}
```

The model or rules can change later without rewriting the UI contract.

## 5. Explainability

Every important risk assessment must return machine-readable reasons.

Example:

```ts
type RiskReason = {
  code: string
  title: string
  description: string
  contribution: "increase" | "decrease" | "neutral"
}
```

The employee UI translates these into readable explanations.

## 6. Anomaly Engine

The anomaly engine consumes journey observations.

Conceptual input:

```ts
type JourneyObservation = {
  timestamp: string
  latitude: number
  longitude: number
  heading?: number
  speed?: number
  routeProgress: number
  expectedProgress: number
  geofenceState: "inside" | "outside"
  stopped: boolean
}
```

Potential output:

```ts
type AnomalyAssessment = {
  detected: boolean
  type?: AnomalyType
  severity: "watch" | "alert" | "critical"
  confidence: number
  reasons: string[]
}
```

Anomaly logic should support temporal context.

Do not immediately escalate because of a single inaccurate location point.

## 7. Severity State Machine

Journey severity:

```text
NORMAL
  |
  v
WATCH
  |
  v
ALERT
  |
  v
CRITICAL
```

Transitions can also recover:

```text
WATCH -> NORMAL
ALERT -> WATCH
ALERT -> NORMAL
CRITICAL -> RESOLVED
```

Recovery should require explicit evidence or policy rather than arbitrary UI actions.

## 8. Check-in Engine

The check-in engine decides whether the employee should receive a contextual prompt.

Inputs:
- journey state
- current anomaly
- previous check-ins
- current risk
- elapsed time
- escalation policy

Outputs:
- no check-in
- check-in required
- escalation pending
- incident generated

## 9. Escalation Engine

The escalation engine owns policy decisions.

Example:

```text
SOS -> Security Center
SOS + critical journey -> high-priority queue

Anomaly -> contextual check-in
Missed check-in -> alert
Repeated missed check-in + anomaly -> critical review
```

The enterprise UI must not manually duplicate these rules.

## 10. Safe Handoff Engine

Handoff state:

```text
PICKUP_PENDING
PICKUP_VERIFIED
DRIVER_VERIFIED
TRANSIT_ACTIVE
DROP_VERIFIED
WORKPLACE_ENTRY_PENDING
WORKPLACE_ENTRY_VERIFIED
COMPLETED
```

A journey should not become COMPLETED only because DROP_VERIFIED is true.

## 11. Privacy Engine

Privacy policy determines location visibility by:
- user settings
- role
- active shift
- active journey
- incident severity
- emergency state

The location-sharing decision should happen in a central policy module rather than in individual screens.

## 12. Offline Architecture

Use a local event queue for safety-critical client events.

Conceptual flow:

**UI event**
→ **local domain state**
→ **local durable queue**
→ **network available?**
→ yes: **sync**
→ no: **retain + retry**

Each queued event needs an idempotency identifier.

The prototype may implement the queue with browser storage while preserving a production-compatible abstraction.

## 13. Notification Architecture

Use a notification interface:

```ts
interface NotificationService {
  notifySecurity(event: SecurityNotification): Promise<void>
  notifyTrustedCircle(event: TrustedNotification): Promise<void>
  notifyEmployee(event: EmployeeNotification): Promise<void>
}
```

The prototype can provide a mock implementation that records and visually simulates notifications.

## 14. Repository Pattern

Keep data access behind interfaces.

Example:

```ts
interface JourneyRepository {
  getJourney(id: string): Promise<Journey | null>
  listActiveJourneys(): Promise<Journey[]>
  updateJourney(id: string, patch: Partial<Journey>): Promise<Journey>
}
```

Demo repositories can use in-memory or local persisted data.

Production adapters can later connect to a backend.

## 15. Map Abstraction

The map feature should accept normalized:
- route
- markers
- risk segments
- safe zones
- hazard points
- live journey positions

This keeps the product independent of one map provider.

## 16. Auth & Authorization

Roles must be enforced at the application boundary and eventually at the backend.

At minimum:
- Employee
- Security Officer
- Security Supervisor/Admin

A frontend role check is not a security boundary. Production authorization must be enforced server-side as well.

## 17. Security Considerations

Sensitive values must not be hardcoded into browser bundles.

Do not place:
- emergency-provider secrets
- database credentials
- private API keys
- privileged service tokens

into client-side source.

Location access should be:
- explicit
- auditable
- role-aware
- policy-driven

Incident actions should be logged.

## 18. Production Evolution

The prototype architecture should make room for:
- real routing APIs
- real geospatial processing
- trained risk models
- real-time transport telemetry
- secure notification channels
- wearable integrations
- durable backend persistence
- audit logs
- organization-level policy configuration

These are integration boundaries, not reasons to inflate the prototype.

## 19. Performance Principles

The employee mobile app should:
- avoid large blocking bundles
- keep emergency actions fast
- render primary safety state before secondary analytics
- use lazy loading for enterprise modules
- reduce unnecessary map redraws
- avoid excessive animation during alert states

## 20. Error Strategy

Design explicit states for:
- offline
- no GPS
- stale location
- permission denied
- failed map load
- failed notification
- unsynced event
- incomplete handoff
- false alarm
- unknown verification state

Do not hide failures behind endless loading spinners.

## 21. Testing Strategy

Core unit tests:
- risk score calculation
- risk explanations
- anomaly classification
- severity transitions
- check-in policy
- escalation policy
- handoff transitions
- privacy visibility decisions

Flow tests:
- safe journey
- unexpected stop
- missed check-in
- silent SOS
- officer verification
- incomplete handoff
- offline journey
- false alarm

## 22. Key Architectural Principle

NIRBHAY should be able to replace its mock data and simulated integrations with production services without replacing the application’s core safety workflows.

That is what “production-structured prototype” means here. It does not mean pretending a browser demo is an emergency-services platform.
