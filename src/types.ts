export type Role = "employee" | "security" | "admin";
export type Severity = "normal" | "watch" | "alert" | "critical";

export type Journey = {
  id: string;
  employee: string;
  route: string;
  pickup: string;
  destination: string;
  riskScore: number;
  severity: Severity;
  progress: number;
  driver: string;
  vehicle: string;
  lastCheckIn: string;
  handoff: {
    pickup: boolean;
    driver: boolean;
    transit: boolean;
    drop: boolean;
    workplace: boolean;
  };
};

export type Incident = {
  id: string;
  journeyId: string;
  employee: string;
  severity: Severity;
  status: "VERIFYING" | "ESCALATED" | "RESOLVED" | "FALSE_ALARM";
  anomaly: string;
  time: string;
  location: string;
};
