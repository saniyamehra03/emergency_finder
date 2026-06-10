import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import EmergencyAnalyzer from "./pages/EmergencyAnalyzer";
import MapPage from "./pages/MapPage";
import NearbyServices from "./pages/NearbyServices";
import Contacts from "./pages/Contacts";
import Profile from "./pages/Profile";
import Login from "./components/Login";
import AppLayout from "./components/AppLayout";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />

        <Route element={<AppLayout user={user} onLogout={handleLogout} />}>
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/analyzer" element={<AnalyzerRoute />} />
          <Route path="/nearby" element={<NearbyServices />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/profile" element={<Profile user={user} onLogout={handleLogout} />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

// Standalone analyzer route — the analyzer can also be embedded in the map flow,
// but here it works as its own page with local navigation handling.
const AnalyzerRoute = () => {
  return <EmergencyAnalyzer standalone />;
};

export default App;
