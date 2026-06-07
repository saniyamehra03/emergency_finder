import React from 'react';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard-grid">
<div className="card" 
onClick={() => navigate("/map")}>
    🚑 Ambulance Services
</div>

<div className="card"
onClick={() => navigate("/map")}>
    🚓 Police Stations
</div>

<div className="card" 
onClick ={() => navigate("/map")}>
    🔥 Fire Stations
</div>

<div className="card" 
onClick={()=> navigate ("/map")}>
    🤖 AI Analyzer
</div>

 <div className="card"
 onClick ={() => navigate ("/map")}>
    📍 Nearby Services
  </div>

  <div className="card"
  onClick={() => navigate ("/map")}>
    🗺️ Live Map
  </div>
  
</div>
);
};
export default Dashboard;
