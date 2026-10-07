# NIRBHAY Data Model

## 1. Design Goals

The data model should represent a complete work journey, incident history, privacy policy, and safety intelligence.

Models should remain normalized enough for a real backend but simple enough for the prototype.

## 2. User

```text
User
- id
- name
- role
- organizationId
- phoneMasked
- status
- createdAt
- updatedAt
```

Roles:
- EMPLOYEE
- SECURITY_OFFICER
- SECURITY_ADMIN

Sensitive information should be minimized.

## 3. Organization

```text
Organization
- id
- name
- status
- safetyPolicyId
- createdAt
```

## 4. Shift

```text
Shift
- id
- employeeId
- organizationId
- date
- startTime
- endTime
- pickupLocation
- destinationLocation
- transportProviderId
- createdAt
```

## 5. Transport Provider

```text
TransportProvider
- id
- name
- status
- routeComplianceScore
- responseScore
- incidentCount
```

Provider metrics in demo data must be labeled as demo.

## 6. Driver

```text
Driver
- id
- name
- verificationStatus
- providerId
- vehicleId
- incidentCount
```

## 7. Vehicle

```text
Vehicle
- id
- registrationMasked
- type
- verificationStatus
```

## 8. Journey

```text
Journey
- id
- shiftId
- employeeId
- status
- riskScore
- riskBand
- startedAt
- endedAt
- currentLatitude
- currentLongitude
- currentRouteProgress
- currentSeverity
- createdAt
- updatedAt
```

Journey status examples:
- PLANNED
- ACTIVE
- WATCH
- ALERT
- CRITICAL
- COMPLETED
- CANCELLED

## 9. Route

```text
Route
- id
- journeyId
- pickup
- destination
- expectedDuration
- actualDuration
- selectedAlternative
```

## 10. Route Segment

```text
RouteSegment
- id
- routeId
- sequence
- geometry
- riskBand
- riskScore
- reasons[]
```

## 11. Risk Assessment

```text
RiskAssessment
- id
- journeyId
- score
- band
- routeContribution
- timeContribution
- environmentalContribution
- hazardContribution
- transportContribution
- contextContribution
- reasons[]
- createdAt
```

## 12. Journey Observation

```text
JourneyObservation
- id
- journeyId
- timestamp
- latitude
- longitude
- heading
- speed
- expectedProgress
- actualProgress
- routeDeviation
- geofenceState
- stopState
```

Use retention and access controls appropriate for location data in production.

## 13. Anomaly Event

```text
AnomalyEvent
- id
- journeyId
- type
- severity
- confidence
- status
- detectedAt
- resolvedAt
- reasons[]
```

Types:
- ROUTE_DEVIATION
- UNEXPECTED_STOP
- EXCESSIVE_STOP
- WRONG_DIRECTION
- EXCESSIVE_DURATION
- GEOFENCE_VIOLATION
- DESTINATION_MISMATCH
- UNEXPECTED_TERMINATION
- REPEATED_DEVIATION

## 14. Check-in

```text
CheckIn
- id
- journeyId
- triggerType
- status
- sentAt
- respondedAt
- response
- escalationTriggered
```

Responses:
- SAFE
- NEED_HELP
- CANNOT_RESPOND
- NO_RESPONSE

## 15. SOS Event

```text
SosEvent
- id
- journeyId
- triggerType
- activatedAt
- status
- securityNotifiedAt
- trustedCircleNotifiedAt
- resolvedAt
```

Trigger types:
- BUTTON_PATTERN
- GESTURE
- VOICE
- WEARABLE

## 16. Incident

```text
Incident
- id
- journeyId
- source
- type
- severity
- status
- openedAt
- verifiedAt
- resolvedAt
- location
- summary
```

Statuses:
- OPEN
- VERIFYING
- ESCALATED
- RESOLVED
- FALSE_ALARM

## 17. Escalation Event

```text
EscalationEvent
- id
- incidentId
- actorId
- action
- target
- timestamp
- note
```

Every security-sensitive action should be auditable.

## 18. Handoff

```text
Handoff
- id
- journeyId
- pickupStatus
- driverStatus
- transitStatus
- dropStatus
- workplaceEntryStatus
- completedAt
```

Statuses may include:
- PENDING
- VERIFIED
- FAILED
- NOT_REQUIRED

## 19. Trusted Contact

```text
TrustedContact
- id
- employeeId
- name
- relationship
- contactMasked
- notificationPolicy
- enabled
```

## 20. Privacy Settings

```text
PrivacySettings
- id
- employeeId
- locationVisibilityMode
- locationSharingSchedule
- emergencyLocationPolicy
- retentionPreference
- updatedAt
```

Example visibility modes:
- PRIVATE
- SECURITY_SHIFT
- TRUSTED_EMERGENCY
- SECURITY_AND_TRUSTED_EMERGENCY

## 21. Hazard Report

```text
HazardReport
- id
- reporterId
- category
- description
- location
- createdAt
- verificationStatus
- verifiedBy
- verifiedAt
- resolvedAt
```

## 22. Safe Zone

```text
SafeZone
- id
- name
- category
- location
- verificationStatus
- availabilityNote
- verifiedAt
```

## 23. Notification

```text
Notification
- id
- recipientId
- category
- severity
- title
- body
- createdAt
- deliveredAt
- readAt
```

## 24. Sync Event

```text
SyncEvent
- id
- localEventId
- entityType
- entityId
- operation
- payload
- createdAt
- syncedAt
- retryCount
- syncStatus
```

Sync status:
- QUEUED
- SYNCING
- SYNCED
- FAILED

## 25. Relationships

Conceptually:

```text
Organization
   |
   +-- Users
   |
   +-- Shifts
          |
          +-- Journey
                 |
                 +-- Route
                 +-- Risk Assessments
                 +-- Observations
                 +-- Anomalies
                 +-- Check-ins
                 +-- SOS Events
                 +-- Incident
                 |      |
                 |      +-- Escalation Events
                 |
                 +-- Handoff
                 +-- Notifications

Employee
   |
   +-- Privacy Settings
   +-- Trusted Contacts
   +-- Hazard Reports

Route
   |
   +-- Route Segments
   +-- Risk Context

Transport Provider
   |
   +-- Drivers
   +-- Vehicles
   +-- Accountability Metrics
```

## 26. Access Principles

Employee:
- own journeys
- own privacy
- own trusted circle
- own history
- authorized emergency information

Security Officer:
- authorized active journeys
- relevant incident location
- driver/vehicle information
- incident history required for response

Security Admin:
- organization analytics
- incident and transport performance
- policy configuration

Normal managers:
- aggregated operational information by default
- no unrestricted live location

## 27. Demo Data Requirements

Every synthetic incident and safety statistic should carry a demo context.

A demo record may include:

```text
dataSource = "DEMO"
```

This prevents accidental presentation of fabricated metrics as real-world intelligence.
