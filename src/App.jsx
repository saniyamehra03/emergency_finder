import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import EmergencyAnalyzer from "./pages/EmergencyAnalyzer";
import MapPage from "./pages/MapPage";
import NearbyServices from "./pages/NearbyServices";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Contacts from "./pages/Contacts";
import Profile from "./pages/Profile";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <Layout
              title="Dashboard"
              subtitle="Emergency Command Center overview"
            >
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/nearby"
          element={
            <Layout
              title="Nearby Services"
              subtitle="Emergency services within 5 km"
            >
              <NearbyServices />
            </Layout>
          }
        />
        <Route
          path="/map"
          element={
            <Layout
              title="Live Map"
              subtitle="Real-time location and routing"
            >
              <MapPage />
            </Layout>
          }
        />
        <Route
          path="/analyzer"
          element={
            <Layout
              title="AI Emergency Analyzer"
              subtitle="Smart incident classification"
            >
              <EmergencyAnalyzer />
            </Layout>
          }
        />
        <Route 
        path="/contacts"
        element={
          <Layout
          title="Contacts">
            <Contacts/>
          </Layout>
        }
        />
        <Route
        path="/profile"
        element={
      <Layout title="Profile">
        <Profile />
       </Layout>
      }
      />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
