import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiIcon,
  AmbulanceIcon,
  PoliceIcon,
  FireIcon,
  AlertIcon,
  RouteIcon,
} from "../components/Icons";
import "./EmergencyAnalyzer.css";

const examples = [
  "Someone is bleeding after a road accident",
  "There is smoke and fire in the building",
  "A robbery just happened nearby",
  "A person collapsed and is unconscious",
];

const EmergencyAnalyzer = () => {
  const navigate = useNavigate();
  const [incident, setIncident] = useState("");
  const [aiResult, setAiResult] = useState(null);

  const analyzeEmergency = (textInput) => {
    const text = (textInput ?? incident).toLowerCase();
    if (!text.trim()) return;

    if (
      text.includes("bleeding") ||
      text.includes("accident") ||
      text.includes("injury") ||
      text.includes("unconscious") ||
      text.includes("collapse")
    ) {
      setAiResult({
        type: "Medical Emergency",
        severity: "HIGH",
        tone: "red",
        Icon: AmbulanceIcon,
        action:
          "Call an ambulance immediately, provide first aid if trained, and keep the person safe and still.",
        route: "/map?type=hospital",
        cta: "Find nearest hospital",
        call: "102",
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
        tone: "amber",
        Icon: FireIcon,
        action:
          "Call the fire department immediately, evacuate the area, and stay low to avoid smoke inhalation.",
        route: "/map?type=fire",
        cta: "Find nearest fire station",
        call: "101",
      });
    } else if (
      text.includes("theft") ||
      text.includes("assault") ||
      text.includes("robbery") ||
      text.includes("fight") ||
      text.includes("attack")
    ) {
      setAiResult({
        type: "Police Emergency",
        severity: "MEDIUM",
        tone: "blue",
        Icon: PoliceIcon,
        action:
          "Call the police immediately, move to a safe location, and provide clear incident details.",
        route: "/map?type=police",
        cta: "Find nearest police station",
        call: "100",
      });
    } else {
      setAiResult({
        type: "General Emergency",
        severity: "UNKNOWN",
        tone: "green",
        Icon: AlertIcon,
        action:
          "Contact emergency services on 112 and explain the situation clearly so they can dispatch the right help.",
        route: "/nearby",
        cta: "View nearby services",
        call: "112",
      });
    }
  };

  return (
    <div className="analyzer">
      <section className="analyzer-intro glass">
        <span className="analyzer-badge">
          <AiIcon size={18} />
          AI Powered
        </span>
        <h2>Describe the emergency</h2>
        <p>
          Our analyzer reads your description, classifies the emergency type and
          severity, and guides you to the right help instantly.
        </p>
      </section>

      <section className="analyzer-grid">
        <div className="analyzer-input-panel">
          <label htmlFor="incident">Incident description</label>
          <textarea
            id="incident"
            value={incident}
            onChange={(e) => setIncident(e.target.value)}
            placeholder="e.g. A car accident with an injured person who is bleeding..."
            rows={6}
          />

          <div className="analyzer-examples">
            <span>Try an example:</span>
            <div>
              {examples.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => {
                    setIncident(ex);
                    analyzeEmergency(ex);
                  }}
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>

          <button
            className="analyze-btn"
            onClick={() => analyzeEmergency()}
            disabled={!incident.trim()}
          >
            <AiIcon size={18} />
            Analyze Emergency
          </button>
        </div>

        <div className="analyzer-result-panel">
          {!aiResult ? (
            <div className="result-empty">
              <AiIcon size={40} />
              <h3>Awaiting analysis</h3>
              <p>Describe an incident to receive instant guidance.</p>
            </div>
          ) : (
            <div className={`result-card result-card--${aiResult.tone}`}>
              <div className="result-top">
                <span className="result-icon">
                  <aiResult.Icon size={24} />
                </span>
                <div>
                  <h3>{aiResult.type}</h3>
                  <span className={`sev sev--${aiResult.tone}`}>
                    Severity: {aiResult.severity}
                  </span>
                </div>
              </div>

              <div className="result-action">
                <h4>Recommended Action</h4>
                <p>{aiResult.action}</p>
              </div>

              <div className="result-buttons">
                <a className="result-call-btn" href={`tel:${aiResult.call}`}>
                  Call {aiResult.call}
                </a>
                <button
                  className="result-nav-btn"
                  onClick={() => navigate(aiResult.route)}
                >
                  <RouteIcon size={16} />
                  {aiResult.cta}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default EmergencyAnalyzer;
