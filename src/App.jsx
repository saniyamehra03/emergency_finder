import "./App.css";
import { BrowserRouter ,Routes,Route } from "react-router-dom";
import React,{useState,useEffect} from 'react';
import Home from"./pages/Home";
import Dashboard from "./pages/Dashboard";
import EmergencyAnalyzer from "./pages/EmergencyAnalyzer";
import MapPage from "./pages/MapPage";
import NearbyServices from "./pages/NearbyServices";
import Contacts from "./pages/Contacts";
import Profile from "./pages/Profile";
import EmergencyCard from "./components/EmergencyCard";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import { Polyline } from "react-leaflet";
import { useMap } from "react-leaflet";
import Heading from './components/Heading';
import Login from "./components/Login";
import Header from "./components/Header";
const App = () => {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/analyzer" element={<EmergencyAnalyzer />} />
        <Route path="/nearby" element={<NearbyServices />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;   