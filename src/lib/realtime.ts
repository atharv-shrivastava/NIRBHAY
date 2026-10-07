import type { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import type { Incident, Journey, Severity } from "../types";

type JourneyRow = {
  id: string;
  employee_name: string;
  route_label: string;
  pickup_time: string;
  destination: string;
  risk_score: number;
  current_severity: Severity;
  route_progress: number;
  driver_name: string;
  vehicle_label: string;
  last_check_in_label: string | null;
  handoff: Journey["handoff"];
  is_demo: boolean;
  updated_at: string;
};

type IncidentRow = {
  id: string;
  journey_id: string | null;
  employee_name: string;
  severity: Severity;
  status: Incident["status"];
  anomaly: string;
  detected_at: string;
  location_label: string | null;
  is_demo: boolean;
};

function mapJourney(row: JourneyRow): Journey {
  return {
    id: row.id,
    employee: row.employee_name,
    route: row.route_label,
    pickup: row.pickup_time,
    destination: row.destination,
    riskScore: row.risk_score,
    severity: row.current_severity,
    progress: row.route_progress,
    driver: row.driver_name,
    vehicle: row.vehicle_label,
    lastCheckIn: row.last_check_in_label ?? "No check-in yet",
    handoff: row.handoff,
  };
}

function mapIncident(row: IncidentRow): Incident {
  return {
    id: row.id,
    journeyId: row.journey_id ?? "",
    employee: row.employee_name,
    severity: row.severity,
    status: row.status,
    anomaly: row.anomaly,
    time: new Date(row.detected_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    location: row.location_label ?? "Restricted to authorized security",
  };
}

export async function loadLiveData(): Promise<{ journeys: Journey[]; incident: Incident | null }> {
  if (!supabase) return { journeys: [], incident: null };

  const [{ data: journeyRows, error: journeyError }, { data: incidentRows, error: incidentError }] = await Promise.all([
    supabase.from("journeys").select("*").eq("is_demo", true).order("updated_at", { ascending: false }),
    supabase.from("incidents").select("*").eq("is_demo", true).order("detected_at", { ascending: false }).limit(1),
  ]);

  if (journeyError) throw journeyError;
  if (incidentError) throw incidentError;

  return {
    journeys: (journeyRows as JourneyRow[]).map(mapJourney),
    incident: incidentRows?.[0] ? mapIncident(incidentRows[0] as IncidentRow) : null,
  };
}

export async function saveJourney(journey: Journey) {
  if (!supabase) return;
  const { error } = await supabase.from("journeys").update({
    risk_score: journey.riskScore,
    current_severity: journey.severity,
    route_progress: journey.progress,
    last_check_in_label: journey.lastCheckIn,
    handoff: journey.handoff,
  }).eq("id", journey.id).eq("is_demo", true);
  if (error) throw error;
}

export async function saveIncident(incident: Incident) {
  if (!supabase) return;
  const { error } = await supabase.from("incidents").upsert({
    id: incident.id,
    journey_id: incident.journeyId,
    employee_name: incident.employee,
    severity: incident.severity,
    status: incident.status,
    anomaly: incident.anomaly,
    detected_at: new Date().toISOString(),
    location_label: incident.location,
    is_demo: true,
  });
  if (error) throw error;
}

export async function recordEvent(eventType: string, payload: Record<string, unknown>) {
  if (!supabase) return;
  const { error } = await supabase.from("event_log").insert({
    event_type: eventType,
    payload: { ...payload, is_demo: true },
    actor_id: null,
  });
  if (error) throw error;
}

export function subscribeToLiveData(
  onJourney: (journey: Journey, eventType: "INSERT" | "UPDATE" | "DELETE") => void,
  onIncident: (incident: Incident, eventType: "INSERT" | "UPDATE" | "DELETE") => void,
  onEvent: () => void,
): RealtimeChannel | null {
  if (!supabase) return null;

  const channel = supabase
    .channel("nirbhay-live-ops")
    .on("postgres_changes", { event: "*", schema: "public", table: "journeys", filter: "is_demo=eq.true" }, payload => {
      if (payload.eventType === "DELETE") {
        onJourney(mapJourney(payload.old as JourneyRow), "DELETE");
      } else {
        onJourney(mapJourney(payload.new as JourneyRow), payload.eventType as "INSERT" | "UPDATE");
      }
    })
    .on("postgres_changes", { event: "*", schema: "public", table: "incidents", filter: "is_demo=eq.true" }, payload => {
      if (payload.eventType === "DELETE") {
        onIncident(mapIncident(payload.old as IncidentRow), "DELETE");
      } else {
        onIncident(mapIncident(payload.new as IncidentRow), payload.eventType as "INSERT" | "UPDATE");
      }
    })
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "event_log", filter: "payload->>is_demo=eq.true" }, () => {
      onEvent();
    })
    .subscribe();

  return channel;
}

export async function unsubscribe(channel: RealtimeChannel | null) {
  if (channel && supabase) await supabase.removeChannel(channel);
}
