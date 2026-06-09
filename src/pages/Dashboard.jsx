import React from 'react';
import "./Dashboard.css";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">

      {/* Top Section */}
      <div className="top-section">

        <div className="dashboard-header">
          <h1>Welcome Back 👋</h1>
          <p>Always ready anytime & anywhere!</p>
        </div>

        <input
          className="search-bar"
          placeholder="Search for emergency services..."
        />

      </div>

      {/* Service Cards */}
      <div className="dashboard-grid">

        <div
          className="service-card"
          onClick={() => navigate("/map")}
        >
          <div className="service-icon">🚑</div>
          <h3>Ambulance</h3>
          <p>Nearby Hospitals</p>
        </div>

        <div
          className="service-card"
          onClick={() => navigate("/map")}
        >
          <div className="service-icon">👮</div>
          <h3>Police</h3>
          <p>Police Stations</p>
        </div>

        <div
          className="service-card"
          onClick={() => navigate("/map")}
        >
          <div className="service-icon">🔥</div>
          <h3>Fire</h3>
          <p>Fire Stations</p>
        </div>

        <div
          className="service-card ai-card"
          onClick={() => navigate("/analyzer")}
        >
          <div className="service-icon">🤖</div>
          <h3>AI Analyzer</h3>
          <p>Analyze Emergencies</p>
        </div>

        <div
          className="service-card"
          onClick={() => navigate("/nearby")}
        >
          <div className="service-icon">📍</div>
          <h3>Nearby</h3>
          <p>Nearby Services</p>
        </div>

        <div
          className="service-card"
          onClick={() => navigate("/map")}
        >
          <div className="service-icon">🗺️</div>
          <h3>Live Map</h3>
          <p>Track Location</p>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;