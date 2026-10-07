import type { Incident, Journey } from "./types";

export const demoJourney: Journey = {
  id: "NIR-10482",
  employee: "Ananya Sharma",
  route: "Demo Residential Pickup → Demo Corporate Workplace",
  pickup: "8:58 PM",
  destination: "Demo Corporate Workplace",
  riskScore: 89,
  severity: "normal",
  progress: 42,
  driver: "Rohan Mehta",
  vehicle: "MH 12 •• 4821",
  lastCheckIn: "10:42 PM",
  handoff: { pickup: true, driver: true, transit: true, drop: false, workplace: false }
};

export const demoJourneys: Journey[] = [
  demoJourney,
  {
    id: "NIR-10471", employee: "Priya Nair", route: "Demo North → Demo Corporate Workplace", pickup: "9:04 PM",
    destination: "Demo Corporate Workplace", riskScore: 93, severity: "normal", progress: 71,
    driver: "Aman Verma", vehicle: "MP 04 •• 2810", lastCheckIn: "10:48 PM",
    handoff: { pickup: true, driver: true, transit: true, drop: false, workplace: false }
  },
  {
    id: "NIR-10467", employee: "Meera Joshi", route: "Demo East → Demo Corporate Workplace", pickup: "8:51 PM",
    destination: "Demo Corporate Workplace", riskScore: 74, severity: "watch", progress: 58,
    driver: "Kunal Shah", vehicle: "MP 09 •• 9902", lastCheckIn: "10:39 PM",
    handoff: { pickup: true, driver: true, transit: true, drop: false, workplace: false }
  },
  {
    id: "NIR-10455", employee: "Ishita Rao", route: "Demo West → Demo Corporate Workplace", pickup: "8:42 PM",
    destination: "Demo Corporate Workplace", riskScore: 96, severity: "critical", progress: 33,
    driver: "Arjun Patel", vehicle: "MP 04 •• 7712", lastCheckIn: "10:41 PM",
    handoff: { pickup: true, driver: true, transit: true, drop: false, workplace: false }
  }
];

export const demoIncident: Incident = {
  id: "INC-2081",
  journeyId: "NIR-10482",
  employee: "Ananya Sharma",
  severity: "alert",
  status: "VERIFYING",
  anomaly: "Unexpected stop + route deviation",
  time: "10:46 PM",
  location: "Demo Elevated-Risk Corridor"
};

export function mutateJourney(j: Journey, action: "start" | "anomaly" | "checkin" | "sos" | "handoff"): Journey {
  const next = structuredClone(j);
  if (action === "start") { next.severity = "normal"; next.progress = Math.max(next.progress, 8); }
  if (action === "anomaly") { next.severity = next.severity === "normal" ? "watch" : "alert"; next.riskScore = Math.min(99, next.riskScore + 8); }
  if (action === "checkin") { next.severity = "normal"; next.riskScore = Math.max(70, next.riskScore - 7); next.lastCheckIn = "Just now"; }
  if (action === "sos") { next.severity = "critical"; next.riskScore = 97; }
  if (action === "handoff") { next.handoff.drop = true; next.handoff.workplace = true; next.severity = "normal"; next.progress = 100; }
  return next;
}
