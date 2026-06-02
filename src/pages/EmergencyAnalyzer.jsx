import React from 'react'
import { useState } from 'react';
const EmergencyAnalyzer = ({
    getLocation,
    setType,
    setEmergencyMode
}) => {
    const [incident, setIncident] = useState("");
    const [aiResult, setAiResult] = useState(null);
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
          severity: "HIGH 🔴",
          action:
            "Call ambulance immediately, provide first aid if trained, and keep the person safe."
        });
      if (
      window.confirm(
        "🚑 Medical Emergency Detected! Navigate to nearest hospital?"
      )
    ) {
      setType("hospital");
      getLocation();
      setEmergencyMode(true);
    }
    }
    
      else if (
        text.includes("fire") ||
        text.includes("smoke") ||
        text.includes("burn") ||
        text.includes("explosion")
      ) {
        setAiResult({
          type: "Fire Emergency",
          severity: "HIGH 🔴",
          action:
            "Call fire department immediately and evacuate the area."
        });
       if (
      window.confirm(
        "🔥 Fire Emergency Detected! Navigate to nearest fire station?"
      )
    ) {
      setType("fire");
      getLocation();
      setEmergencyMode(true);
    }
      }
    
      else if (
        text.includes("theft") ||
        text.includes("assault") ||
        text.includes("robbery") ||
        text.includes("fight")
      ) {
        setAiResult({
          type: "Police Emergency",
          severity: "MEDIUM 🟠",
          action:
            "Call police immediately and provide incident details."
        });
       if (
      window.confirm(
        "🚓 Police Emergency Detected! Navigate to nearest police station?"
      )
    ) {
      setType("police");
      getLocation();
      setEmergencyMode(true);
    }
      }
    
      else {
        setAiResult({
          type: "General Emergency",
          severity: "UNKNOWN ⚪",
          action:
            "Contact emergency services and explain the situation clearly."
        });
      }
    };
  return (
   
      <div className="ai-card">
      <h3>🤖 AI Emergency Analyzer</h3>

<textarea
  value={incident}
  onChange={(e) => setIncident(e.target.value)}
  placeholder="Describe emergency..."
  rows="4"
  style={{
    width: "100%",
    padding: "10px",
    marginTop: "10px"
  }}
/>

<button className="analyze-btn"
  onClick={analyzeEmergency}
  style={{
    marginTop: "10px",
    padding: "10px 20px"
  }}
>
  Analyze Emergency
</button>

{aiResult && (
  <div className="result-card"
    style={{
      border: "1px solid gray",
      padding: "10px",
      marginTop: "10px"
    }}
  >
    <p><b>Type:</b> {aiResult.type}</p>
    <p><b>Severity:</b> {aiResult.severity}</p>
    <p><b>Action:</b> {aiResult.action}</p>
  </div>
)}
</div>
  );};

export default EmergencyAnalyzer;

  