import { useEffect, useMemo, useState } from "react";
import MapView from "./MapView";
import { demoIncident, demoJourney, demoJourneys, mutateJourney } from "./mock";
import { supabaseConfigured } from "./lib/supabase";
import { loadLiveData, recordEvent, saveIncident, saveJourney, subscribeToLiveData, unsubscribe } from "./lib/realtime";
import type { Incident, Journey, Role, Severity } from "./types";

const employeePages = ["home", "journey", "risk", "safety", "profile", "history"];
const enterprisePages = ["overview", "live", "alerts", "risk-admin", "incidents", "transport", "analytics", "settings"];

function StatusChip({ severity }: { severity: Severity }) {
  return <span className={"status-chip status-" + severity}>{severity.toUpperCase()}</span>;
}

function RiskGauge({ score }: { score: number }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.max(0, Math.min(100, score)) / 100) * circumference;
  return (
    <div className="risk-gauge">
      <svg viewBox="0 0 110 110" aria-label={"Safety Confidence " + score + " out of 100"}>
        <circle cx="55" cy="55" r={radius} className="gauge-track" />
        <circle cx="55" cy="55" r={radius} className="gauge-value" strokeDasharray={circumference} strokeDashoffset={offset} />
      </svg>
      <div className="gauge-copy"><strong>{score}</strong><span>/ 100</span><small>Safety Confidence</small></div>
    </div>
  );
}

function BottomNav({ active, onNavigate }: { active: string; onNavigate: (page: string) => void }) {
  const items = [["home", "Home", "⌂"], ["journey", "Journey", "↗"], ["risk", "Risk Map", "⌖"], ["safety", "Safety", "♡"], ["profile", "Profile", "◌"]];
  return <nav className="bottom-nav" aria-label="Employee navigation">{items.map(([id, label, icon]) => (
    <button key={id} className={active === id ? "nav-item active" : "nav-item"} onClick={() => onNavigate(id)}>
      <span className="nav-icon">{icon}</span><span>{label}</span>
    </button>
  ))}</nav>;
}

function SideNav({ active, onNavigate }: { active: string; onNavigate: (page: string) => void }) {
  const items = [["overview", "Overview"], ["live", "Live Journeys"], ["alerts", "Alerts"], ["risk-admin", "Risk Map"], ["incidents", "Incidents"], ["transport", "Transport"], ["analytics", "Analytics"], ["settings", "Settings"]];
  return <aside className="side-nav">
    <div><div className="brand-word">NIRBHAY</div><div className="brand-sub">Safety Intelligence</div></div>
    <div className="side-links">{items.map(([id, label]) => <button key={id} onClick={() => onNavigate(id)} className={active === id ? "side-link active" : "side-link"}><span className="side-dot" />{label}</button>)}</div>
    <div className="side-footer"><span className="demo-pill">DEMO ENVIRONMENT</span><small>AI prioritizes. Human security personnel verify.</small></div>
  </aside>;
}

function PageTitle({ kicker, title, text }: { kicker: string; title: string; text: string }) {
  return <section className="page-title"><span className="eyebrow">{kicker}</span><h1>{title}</h1><p>{text}</p></section>;
}

function EmployeeHome({ journey, onNavigate, onStart }: { journey: Journey; onNavigate: (page: string) => void; onStart: () => void }) {
  const message = journey.severity === "normal" ? "Your journey is inside expected conditions." : "NIRBHAY found an unusual journey pattern. Security support is available.";
  return <div className="page-stack">
    <section className="hero-surface">
      <div><span className="eyebrow">NIGHT SHIFT · 10:00 PM – 6:00 AM</span><h1>{journey.severity === "normal" ? "You’re Safe" : "Safety Attention Required"}</h1><p>{message}</p><StatusChip severity={journey.severity} /></div>
      <RiskGauge score={journey.riskScore} />
    </section>
    <section className="card">
      <div className="section-heading"><div><span className="eyebrow">UPCOMING SHIFT</span><h2>Demo Corporate Workplace</h2></div><span className="date-tag">Tonight</span></div>
      <div className="detail-grid"><div><span>Pickup</span><strong>{journey.pickup}</strong></div><div><span>Expected travel</span><strong>31 min</strong></div><div><span>Transport</span><strong>Verified · Secure Transit</strong></div></div>
    </section>
    <section className="quick-grid">
      <button className="action-card primary" onClick={() => onNavigate("risk")}><span>⌖</span><strong>Check Route</strong><small>Historical & environmental risk</small></button>
      <button className="action-card" onClick={onStart}><span>↗</span><strong>Start Safety Mode</strong><small>Begin contextual monitoring</small></button>
      <button className="action-card" onClick={() => onNavigate("safety")}><span>♡</span><strong>Trusted Circle</strong><small>Control emergency sharing</small></button>
      <button className="action-card" onClick={() => onNavigate("history")}><span>◷</span><strong>Safety History</strong><small>Review previous journeys</small></button>
    </section>
    <div className="principle-strip"><span>PROACTIVE</span><span>PRIVACY-FIRST</span><span>HUMAN-VERIFIED</span><span>SAFE HANDOFF</span></div>
    <p className="microcopy">Demo product. NIRBHAY does not guarantee safety or predict specific crimes.</p>
  </div>;
}

function RouteRisk({ onBack, onChoose }: { onBack: () => void; onChoose: () => void }) {
  return <div className="page-stack">
    <div className="topbar-mobile"><button className="text-button" onClick={onBack}>← Back</button><span className="eyebrow">ROUTE RISK INTELLIGENCE</span></div>
    <div className="two-col">
      <section className="card map-card"><div className="section-heading"><div><span className="eyebrow">DEMO ROUTE</span><h2>Residential Pickup → Workplace</h2></div><span className="demo-pill">DEMO DATA</span></div><MapView /><div className="map-legend"><span><i className="legend-dot low" />Low</span><span><i className="legend-dot moderate" />Moderate</span><span><i className="legend-dot elevated" />Elevated</span></div></section>
      <div className="page-stack">
        <section className="card score-card"><div><span className="eyebrow">SAFETY CONFIDENCE</span><h2>89 / 100</h2><p>Historical and environmental signals produce a high-confidence demo assessment.</p></div><RiskGauge score={89} /></section>
        <section className="card"><div className="section-heading"><div><span className="eyebrow">EXPLAINABILITY</span><h3>Why is this score 89?</h3></div><span className="mini-link">View factors</span></div><div className="factor-list">{[["Historical route risk","25%"],["Time-of-day context","20%"],["Environmental safety","20%"],["Verified hazards","15%"],["Transport verification","10%"],["Journey context","10%"]].map(([name,value]) => <div key={name}><span>{name}</span><strong>{value}</strong></div>)}</div></section>
        <section className="card"><span className="eyebrow">ZONE DETAIL</span><h3>Elevated Risk Zone</h3><p>Historical & Environmental Route Risk Intelligence</p><div className="zone-facts"><span><strong>14</strong> demo incidents</span><span><strong>2</strong> verified reports</span><span><strong>10 PM–1 AM</strong> frequent period</span><span><strong>0.6 km</strong> nearest safe node</span></div></section>
      </div>
    </div>
    <section className="card"><div className="section-heading"><div><span className="eyebrow">SAFE ROUTE ALTERNATIVES</span><h2>Choose your tradeoff</h2></div><button className="button" onClick={onChoose}>Choose Safer Route</button></div><div className="route-options">
      <article className="route-option selected"><strong>Recommended</strong><span>31 min</span><b>88 confidence</b><small>Balanced route</small></article>
      <article className="route-option"><strong>Safer Alternative</strong><span>35 min</span><b>94 confidence</b><small>Adds 4 minutes, avoids two elevated-risk segments</small></article>
      <article className="route-option"><strong>Fastest</strong><span>29 min</span><b>71 confidence</b><small>Shorter, less predictable corridor</small></article>
    </div></section>
  </div>;
}

function Journey({ journey, onAction }: { journey: Journey; onAction: (action: "anomaly" | "checkin" | "sos" | "handoff") => void }) {
  const stages: [string, boolean][] = [["Pickup verified",journey.handoff.pickup],["Driver verified",journey.handoff.driver],["Vehicle verified",journey.handoff.driver],["Transit verified",journey.handoff.transit],["Drop verified",journey.handoff.drop],["Workplace entry verified",journey.handoff.workplace]];
  return <div className="page-stack">
    <section className="journey-header"><div><span className="eyebrow">JOURNEY {journey.id}</span><h1>Journey Under Monitoring</h1><p>{journey.route}</p></div><StatusChip severity={journey.severity} /></section>
    <section className="card progress-card"><div className="progress-head"><span>Route progress</span><strong>{journey.progress}%</strong></div><div className="progress-track"><span style={{width: journey.progress + "%"}} /></div><div className="journey-meta"><span>Driver <strong>{journey.driver}</strong></span><span>Vehicle <strong>{journey.vehicle}</strong></span><span>Last check-in <strong>{journey.lastCheckIn}</strong></span></div></section>
    <div className="two-col">
      <section className="card"><div className="section-heading"><div><span className="eyebrow">SAFE HANDOFF</span><h2>Journey completion</h2></div><span className="demo-pill">DEMO FLOW</span></div><div className="handoff-list">{stages.map(([label,done]) => <div key={label} className={done ? "handoff-row done" : "handoff-row pending"}><span>{done ? "✓" : "•"}</span><strong>{label}</strong><small>{done ? "Verified" : "Pending"}</small></div>)}</div>{journey.handoff.drop && !journey.handoff.workplace && <div className="notice pink">Vehicle arrived. Workplace entry is still pending.</div>}<button className="button full" onClick={() => onAction("handoff")}>{journey.handoff.workplace ? "Journey Completed" : "Confirm Workplace Entry"}</button></section>
      <div className="page-stack">
        <section className="card anomaly-card"><span className="eyebrow">ANOMALY MONITORING</span><h2>{journey.severity === "normal" ? "Normal travel pattern" : journey.severity === "watch" ? "Watch: unusual event" : "Alert: verification required"}</h2><p>{journey.severity === "normal" ? "Route progress matches the planned trip." : "An unexpected event has changed the journey state. NIRBHAY does not interpret this as proof of criminal activity."}</p><div className="button-row"><button className="button secondary" onClick={() => onAction("anomaly")}>Simulate anomaly</button><button className="button" onClick={() => onAction("checkin")}>I’m Safe</button></div></section>
        <section className="card sos-card"><div><span className="eyebrow">DISCREET EMERGENCY</span><h3>Silent SOS</h3><p>Simulate a discreet gesture, voice, or wearable activation.</p></div><button className="button outline" onClick={() => onAction("sos")}>Trigger Silent SOS</button></section>
      </div>
    </div>
    <section className="timeline-card"><span className="eyebrow">LIVE TIMELINE</span><div className="timeline"><div><strong>10:39 PM</strong><span>Journey active</span></div><div><strong>10:42 PM</strong><span>Last safety check-in</span></div>{journey.severity !== "normal" && <><div><strong>10:43 PM</strong><span>Unexpected stop detected</span></div><div><strong>10:44 PM</strong><span>Adaptive safety check-in sent</span></div></>}{(journey.severity === "alert" || journey.severity === "critical") && <div><strong>10:46 PM</strong><span>Security verification in progress</span></div>}</div></section>
  </div>;
}

function Safety() {
  const [sent, setSent] = useState(false);
  return <div className="page-stack">
    <section className="hero-surface compact"><div><span className="eyebrow">SAFETY CONTROL</span><h1>Discreet support, on your terms.</h1><p>Choose how check-ins, emergency triggers, and trusted contacts behave.</p></div><button className="button" onClick={() => setSent(true)}>Test Silent SOS</button></section>
    {sent && <div className="notice pink" role="status">Safety alert simulated. Security verification queue updated.</div>}
    <div className="three-grid"><section className="card"><span className="eyebrow">PHONE GESTURE</span><h3>Volume-button pattern</h3><p>Three discreet presses.</p><span className="toggle on">Enabled</span></section><section className="card"><span className="eyebrow">VOICE TRIGGER</span><h3>“I don't feel well.”</h3><p>Configurable phrase, recognized only during safety mode in a production implementation.</p><span className="toggle on">Enabled</span></section><section className="card"><span className="eyebrow">WEARABLE</span><h3>Triple squeeze</h3><p>Prepared integration boundary for future wearable hardware.</p><span className="toggle">Prototype adapter</span></section></div>
    <section className="card"><div className="section-heading"><div><span className="eyebrow">TRUSTED CIRCLE</span><h2>Emergency contacts</h2></div><span className="demo-pill">PRIVATE</span></div><div className="contact-list"><div><strong>Mom</strong><span>Emergency alerts + emergency location</span></div><div><strong>Riya</strong><span>Emergency alerts only</span></div><div><strong>Night Shift Buddy</strong><span>Check-in alerts</span></div></div></section>
    <section className="card"><span className="eyebrow">PRIVACY-FIRST LOCATION</span><h2>Location sharing rules</h2><div className="privacy-rows"><div><span>Normal journey</span><strong>Security during active journey</strong></div><div><span>Emergency state</span><strong>Security + Trusted Circle</strong></div><div><span>Outside authorized conditions</span><strong>Not continuously shared</strong></div></div></section>
  </div>;
}

function History() {
  const journeys = [["12 Oct","Office → Home","92","Completed Safely"],["10 Oct","Office → Home","73","Security Review"],["08 Oct","Home → Office","95","Completed Safely"]];
  return <div className="page-stack"><PageTitle kicker="SAFETY HISTORY" title="Journey history" text="Past journeys, risk events, check-ins and handoff outcomes." /><div className="history-list">{journeys.map(j => <article className="card history-item" key={j[0]}><div><span>{j[0]}</span><strong>{j[1]}</strong></div><div><span>Safety score</span><strong>{j[2]}/100</strong></div><span className={j[3] === "Completed Safely" ? "result good" : "result review"}>{j[3]}</span><span>View timeline →</span></article>)}</div><div className="card"><span className="demo-pill">DEMO DATA</span><p>These records are synthetic and exist to demonstrate the workflow.</p></div></div>;
}

function Profile() {
  return <div className="page-stack"><PageTitle kicker="PROFILE" title="Safety preferences" text="Control location sharing, notifications and accessibility." /><section className="card profile-head"><div className="avatar">AS</div><div><h2>Ananya Sharma</h2><span>Night shift employee · Demo Organization</span></div></section><section className="card"><span className="eyebrow">LOCATION</span><h2>Location sharing</h2><div className="settings-list"><label><span>Live location during active journey</span><input type="checkbox" defaultChecked /></label><label><span>Emergency location to Trusted Circle</span><input type="checkbox" defaultChecked /></label><label><span>Continuous employer location outside safety conditions</span><input type="checkbox" /></label></div></section><section className="card"><span className="eyebrow">ACCESSIBILITY</span><h2>Interface</h2><div className="settings-list"><label><span>Large touch targets</span><input type="checkbox" defaultChecked /></label><label><span>Reduced motion</span><input type="checkbox" /></label><label><span>Discreet notification content</span><input type="checkbox" defaultChecked /></label></div></section></div>;
}

function CommandCenter({ journeys, incident, onIncident }: { journeys: Journey[]; incident: Incident; onIncident: (action: "verify" | "dispatch" | "resolve") => void }) {
  const counts = {normal:journeys.filter(j=>j.severity==="normal").length,watch:journeys.filter(j=>j.severity==="watch").length,alert:journeys.filter(j=>j.severity==="alert").length,critical:journeys.filter(j=>j.severity==="critical").length};
  return <div className="enterprise-page"><PageTitle kicker="SECURITY COMMAND CENTER" title="Active safety operations" text="AI prioritizes incidents. Authorized security personnel verify and decide." /><div className="stats-grid"><div className="stat-card"><span>Active Journeys</span><strong>37</strong></div><div className="stat-card"><span>Normal</span><strong>{32+counts.normal}</strong></div><div className="stat-card"><span>Watch</span><strong>{3+counts.watch}</strong></div><div className="stat-card accent"><span>Alert</span><strong>{1+counts.alert}</strong></div><div className="stat-card critical"><span>Critical</span><strong>{1+counts.critical}</strong></div></div>
    <div className="command-grid"><section className="card command-map"><div className="section-heading"><h2>Live Journey Map</h2><span className="demo-pill">DEMO DATA</span></div><MapView /></section><section className="card incident-panel"><div className="section-heading"><div><span className="eyebrow">PRIORITY INCIDENT</span><h2>{incident.id}</h2></div><StatusChip severity={incident.severity} /></div><dl className="incident-facts"><div><dt>Journey</dt><dd>{incident.journeyId}</dd></div><div><dt>Employee</dt><dd>{incident.employee}</dd></div><div><dt>Anomaly</dt><dd>{incident.anomaly}</dd></div><div><dt>Location</dt><dd>Restricted to authorized security</dd></div></dl><div className="timeline compact-timeline"><div><strong>10:42 PM</strong><span>Journey started</span></div><div><strong>10:43 PM</strong><span>Route deviation detected</span></div><div><strong>10:44 PM</strong><span>Check-in sent</span></div><div><strong>10:45 PM</strong><span>No response</span></div><div><strong>10:46 PM</strong><span>Security alert generated</span></div></div><div className="button-grid"><button className="button secondary" onClick={()=>onIncident("verify")}>Call Employee</button><button className="button secondary" onClick={()=>onIncident("verify")}>Contact Driver</button><button className="button" onClick={()=>onIncident("dispatch")}>Dispatch Security</button><button className="button outline" onClick={()=>onIncident("resolve")}>Resolve</button></div></section></div>
    <section className="card"><div className="section-heading"><div><span className="eyebrow">LIVE STATUS</span><h2>Journey table</h2></div><span className="demo-pill">ROLE: SECURITY</span></div><div className="table-wrap"><table><thead><tr><th>Employee</th><th>Status</th><th>Risk</th><th>Driver</th><th>Vehicle</th><th>Last Check-in</th><th>Updated</th></tr></thead><tbody>{journeys.map(j=><tr key={j.id}><td><strong>{j.employee}</strong><span>{j.id}</span></td><td><StatusChip severity={j.severity}/></td><td><strong>{j.riskScore}</strong></td><td>{j.driver}</td><td>{j.vehicle}</td><td>{j.lastCheckIn}</td><td>Just now</td></tr>)}</tbody></table></div></section>
  </div>;
}

function Supporting({ title }: { title: string }) {
  const items: Record<string,string[]> = {
    "Live Journeys":["Journey NIR-10482 · ALERT","Journey NIR-10467 · NORMAL","Journey NIR-10455 · CRITICAL"],
    Alerts:["NIR-10482 · Awaiting human verification","NIR-10455 · Critical response"],
    "Risk Map":["Demo Elevated-Risk Corridor","2 verified hazards","1 nearby safe node"],
    Incidents:["INC-2081 · VERIFYING","INC-2069 · RESOLVED"],
    Transport:["Secure Transit · 96% route compliance","Metro Mobility · 89% route compliance"],
    Analytics:["Response time trend · improving","Repeated unsafe locations · 4","Route anomaly rate · 2.8%"],
    Settings:["Adaptive check-in policy","Escalation policy","Location retention policy"]
  };
  return <div className="page-stack"><PageTitle kicker="ENTERPRISE" title={title} text="Supporting NIRBHAY operations using shared journey, risk and incident data." /><div className="three-grid">{(items[title] ?? []).map((item,i)=><section className="card" key={item}><span className="eyebrow">{i===0 ? "VIEW" : "DEMO METRIC"}</span><h3>{item}</h3>{i>0 && <span className="demo-pill">DEMO DATA</span>}</section>)}</div></div>;
}

export default function App() {
  const [role, setRole] = useState<Role>("employee");
  const [page, setPage] = useState("home");
  const [journey, setJourney] = useState<Journey>(demoJourney);
  const [journeys, setJourneys] = useState<Journey[]>(demoJourneys);
  const [incident, setIncident] = useState<Incident>(demoIncident);
  const [intro, setIntro] = useState(true);
  const [toast, setToast] = useState("");
  const [online, setOnline] = useState(navigator.onLine);
  const [realtimeOnline, setRealtimeOnline] = useState(false);

  useEffect(() => {
    const onlineHandler = () => setOnline(true);
    const offlineHandler = () => setOnline(false);
    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);
    return () => { window.removeEventListener("online", onlineHandler); window.removeEventListener("offline", offlineHandler); };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    if (!supabaseConfigured) return;
    let mounted = true;
    void loadLiveData()
      .then(({ journeys: liveJourneys, incident: liveIncident }) => {
        if (!mounted) return;
        if (liveJourneys.length) {
          setJourneys(liveJourneys);
          const current = liveJourneys.find(item => item.id === demoJourney.id) ?? liveJourneys[0];
          setJourney(current);
        }
        if (liveIncident) setIncident(liveIncident);
      })
      .catch(() => {
        if (mounted) setToast("Live database unavailable. Showing local demo data.");
      });

    const channel = subscribeToLiveData(
      (next, eventType) => {
        if (!mounted || eventType === "DELETE") return;
        setJourneys(prev => {
          const exists = prev.some(item => item.id === next.id);
          return exists ? prev.map(item => item.id === next.id ? next : item) : [next, ...prev];
        });
        if (next.id === demoJourney.id) setJourney(next);
      },
      (next, eventType) => {
        if (!mounted || eventType === "DELETE") return;
        setIncident(next);
      },
      () => { if (mounted) setToast("Live safety data synchronized."); },
      status => {
        if (!mounted) return;
        setRealtimeOnline(status === "SUBSCRIBED");
      },
    );

    return () => {
      mounted = false;
      void unsubscribe(channel);
    };
  }, []);

  const updateJourney = (action: "anomaly" | "checkin" | "sos" | "handoff") => {
    const updated = mutateJourney(journey, action);
    setJourney(updated);
    setJourneys(prev => prev.map(j => j.id === updated.id ? updated : j));
    void saveJourney(updated).catch(() => setToast("Could not sync journey state. Local state retained."));

    if (action === "anomaly") {
      setIncident({ ...incident, status: "VERIFYING", severity: "alert", anomaly: "Unexpected stop + route deviation", time: "10:46 PM" });
      setToast("Anomaly detected. Adaptive check-in initiated.");
      const nextIncident = { ...incident, journeyId: journey.id, status: "VERIFYING" as const, severity: "alert" as const, anomaly: "Unexpected stop + route deviation", time: "Now" };
      setIncident(nextIncident);
      void saveIncident(nextIncident).catch(() => setToast("Incident created locally, but sync failed."));
      void recordEvent("journey.anomaly", { journey_id: journey.id, anomaly: "unexpected_stop_route_deviation" }).catch(() => undefined);
    }
    if (action === "checkin") {
      setToast("Safety confirmed. Monitoring continues.");
      void recordEvent("journey.checkin", { journey_id: journey.id, response: "safe" }).catch(() => undefined);
    }
    if (action === "sos") {
      setIncident({ ...incident, status: "VERIFYING", severity: "critical", anomaly: "Silent SOS activation", time: "10:47 PM" });
      setToast("Silent SOS sent to security.");
      const nextIncident = { ...incident, journeyId: journey.id, status: "VERIFYING" as const, severity: "critical" as const, anomaly: "Silent SOS activation", time: "Now" };
      setIncident(nextIncident);
      void saveIncident(nextIncident).catch(() => setToast("SOS is visible locally, but incident sync failed."));
      void recordEvent("journey.sos", { journey_id: journey.id, trigger: "demo_silent_sos" }).catch(() => undefined);
    }
    if (action === "handoff") {
      setToast(updated.handoff.workplace ? "Workplace entry verified. Journey completed." : "Drop verified. Workplace entry remains pending.");
      void recordEvent("journey.handoff", { journey_id: journey.id, workplace_entry: updated.handoff.workplace }).catch(() => undefined);
    }
  };

  const switchRole = (r: Role) => { setRole(r); setPage(r === "employee" ? "home" : "overview"); setIntro(false); };
  const go = (target: string) => { setPage(target); setIntro(false); };

  const content = useMemo(() => {
    if (role === "employee") {
      if (page === "home") return <EmployeeHome journey={journey} onNavigate={go} onStart={() => { updateJourney("anomaly"); go("journey"); }} />;
      if (page === "journey") return <Journey journey={journey} onAction={updateJourney} />;
      if (page === "risk") return <RouteRisk onBack={() => go("home")} onChoose={() => { updateJourney("checkin"); go("journey"); }} />;
      if (page === "safety") return <Safety />;
      if (page === "history") return <History />;
      return <Profile />;
    }
    if (page === "overview") return <CommandCenter journeys={journeys} incident={incident} onIncident={(action) => {
      if (action === "verify") {
        const next = { ...incident, status: "VERIFYING" as const };
        setIncident(next); setToast("Human verification started. Officer actions are recorded.");
        void saveIncident(next).catch(() => setToast("Verification is local only. Sync failed."));
        void recordEvent("incident.verify", { incident_id: incident.id }).catch(() => undefined);
      }
      if (action === "dispatch") {
        const next = { ...incident, status: "ESCALATED" as const, severity: "critical" as const };
        setIncident(next); setToast("Security dispatched. Escalation recorded.");
        void saveIncident(next).catch(() => setToast("Dispatch is local only. Sync failed."));
        void recordEvent("incident.dispatch", { incident_id: incident.id }).catch(() => undefined);
      }
      if (action === "resolve") {
        const next = { ...incident, status: "RESOLVED" as const, severity: "normal" as const };
        setIncident(next); setToast("Incident resolved and timeline updated.");
        void saveIncident(next).catch(() => setToast("Resolution is local only. Sync failed."));
        void recordEvent("incident.resolve", { incident_id: incident.id }).catch(() => undefined);
      }
    }} />;
    const titles: Record<string,string> = {live:"Live Journeys", alerts:"Alerts", "risk-admin":"Risk Map", incidents:"Incidents", transport:"Transport", analytics:"Analytics", settings:"Settings"};
    return <Supporting title={titles[page] ?? "Overview"} />;
  }, [role, page, journey, journeys, incident]);

  if (intro) return <div className="intro-screen">
    <div className="intro-copy"><span className="eyebrow">NIRBHAY · PROACTIVE WOMEN’S SAFETY INTELLIGENCE PLATFORM</span><h1>Move Forward.<br/><em>Without Fear.</em></h1><p>NIRBHAY transforms late-night work travel from reactive emergency response into proactive safety intelligence.</p><div className="intro-actions"><button className="button" onClick={()=>{setIntro(false);setPage("home")}}>Enter Safety Mode</button><button className="button secondary" onClick={()=>{setIntro(false);setPage("risk")}}>Explore Platform</button></div><div className="intro-flow"><span>Route Intelligence</span><b>+</b><span>AI Monitoring</span><b>+</b><span>Human Response</span><b>+</b><span>Safe Handoff</span></div><div className="demo-switch"><span>Demo role</span>{(["employee","security","admin"] as Role[]).map(r=><button key={r} onClick={()=>switchRole(r)} className={role===r?"selected":""}>{r}</button>)}</div><p className="small-note"><span className="demo-pill">DEMO DATA</span> Synthetic journeys and incidents are used in this prototype.</p></div>
    <div className="intro-art"><div className="orbit one"/><div className="orbit two"/><div className="orbit three"/><div className="intro-core"><span>N</span><small>Safety<br/>Layer</small></div></div>
  </div>;

  const employee = role === "employee";
  return <div className={employee ? "app-shell employee-shell" : "app-shell enterprise-shell"}>
    {employee ? <div className="mobile-brand"><div><strong>NIRBHAY</strong><span>Safety Intelligence</span></div><span className="live-dot">{realtimeOnline ? "● Live" : online ? "● Syncing" : "● Offline"}</span></div> : <SideNav active={page} onNavigate={go}/>}
    <main className="main-content">
      <header className="topbar"><div className="role-switcher"><span>Viewing as</span>{(["employee","security","admin"] as Role[]).map(r=><button key={r} onClick={()=>switchRole(r)} className={role===r?"active":""}>{r}</button>)}</div><div className="connection"><span className={(supabaseConfigured && realtimeOnline) ? "conn-dot on" : "conn-dot"}/>{supabaseConfigured ? (realtimeOnline ? "Realtime live" : "Supabase syncing") : "Demo mode"} · {online ? "Online" : "Offline"}</div></header>
      {!online && <div className="offline-banner"><strong>Low Connectivity</strong><span>Local journey state and demo workflows remain available. Real-time network actions are limited.</span></div>}
      {content}
    </main>
    {employee && <BottomNav active={page} onNavigate={go}/>}
    {toast && <div className="toast" role="status">{toast}</div>}
  </div>;
}
