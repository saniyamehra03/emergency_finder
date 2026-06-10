import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  AlertTriangle,
  Ambulance,
  Shield,
  Flame,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

const severityStyles = {
  HIGH: "bg-primary-soft text-primary",
  MEDIUM: "bg-fire/10 text-fire",
  UNKNOWN: "bg-surface-muted text-muted",
};

const EmergencyAnalyzer = ({
  getLocation,
  setType,
  setEmergencyMode,
  standalone = false,
}) => {
  const navigate = useNavigate();
  const [incident, setIncident] = useState("");
  const [aiResult, setAiResult] = useState(null);

  const routeTo = (type) => {
    if (standalone) {
      navigate(`/map?type=${type}`);
      return;
    }
    setType?.(type);
    getLocation?.();
    setEmergencyMode?.(true);
  };

  const analyzeEmergency = () => {
    const text = incident.toLowerCase();

    if (
      text.includes("bleeding") ||
      text.includes("accident") ||
      text.includes("injury") ||
      text.includes("unconscious")
    ) {
      setAiResult({
        type: "Medical Emergency",
        severity: "HIGH",
        navType: "hospital",
        Icon: Ambulance,
        action:
          "Call an ambulance immediately, provide first aid if trained, and keep the person safe.",
      });
    } else if (
      text.includes("fire") ||
      text.includes("smoke") ||
      text.includes("burn") ||
      text.includes("explosion")
    ) {
      setAiResult({
        type: "Fire Emergency",
        severity: "HIGH",
        navType: "fire",
        Icon: Flame,
        action: "Call the fire department immediately and evacuate the area.",
      });
    } else if (
      text.includes("theft") ||
      text.includes("assault") ||
      text.includes("robbery") ||
      text.includes("fight")
    ) {
      setAiResult({
        type: "Police Emergency",
        severity: "MEDIUM",
        navType: "police",
        Icon: Shield,
        action: "Call the police immediately and provide incident details.",
      });
    } else {
      setAiResult({
        type: "General Emergency",
        severity: "UNKNOWN",
        navType: null,
        Icon: HelpCircle,
        action: "Contact emergency services and explain the situation clearly.",
      });
    }
  };

  const examples = [
    "Someone is bleeding after an accident",
    "I can see smoke and fire in the building",
    "There was a robbery on my street",
  ];

  const content = (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft">
            <Sparkles className="h-5 w-5 text-primary" />
          </span>
          <h1 className="text-2xl font-bold text-foreground">AI Emergency Analyzer</h1>
        </div>
        <p className="text-sm text-muted">
          Describe what's happening and get instant guidance on the right service to contact.
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-surface p-6">
        <label htmlFor="incident" className="mb-2 block text-sm font-medium text-foreground">
          What's the emergency?
        </label>
        <textarea
          id="incident"
          value={incident}
          onChange={(e) => setIncident(e.target.value)}
          placeholder="Describe the emergency in your own words..."
          rows="4"
          className="w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary"
        />

        <div className="mt-3 flex flex-wrap gap-2">
          {examples.map((ex) => (
            <button
              key={ex}
              onClick={() => setIncident(ex)}
              className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {ex}
            </button>
          ))}
        </div>

        <button
          onClick={analyzeEmergency}
          disabled={!incident.trim()}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Sparkles className="h-4 w-4" />
          Analyze emergency
        </button>
      </div>

      {aiResult && (
        <div className="rounded-3xl border border-border bg-surface p-6">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-soft">
              <aiResult.Icon className="h-6 w-6 text-primary" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold text-foreground">{aiResult.type}</h2>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${severityStyles[aiResult.severity]}`}
                >
                  <AlertTriangle className="h-3 w-3" />
                  {aiResult.severity}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{aiResult.action}</p>

              {aiResult.navType && (
                <button
                  onClick={() => routeTo(aiResult.navType)}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
                >
                  Find nearest help
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return content;
};

export default EmergencyAnalyzer;
