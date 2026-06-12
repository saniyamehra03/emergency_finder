import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import {
  AmbulanceIcon,
  PoliceIcon,
  FireIcon,
  PinIcon,
  MapIcon,
  AiIcon,
  SearchIcon,
  AlertIcon,
  ActivityIcon,
  HeartIcon,
  SignalIcon,
  PhoneIcon,
} from "../components/Icons";

const quickAccess = [
  {
    key: "ambulance",
    title: "Ambulance",
    desc: "Nearby hospitals",
    icon: AmbulanceIcon,
    tone: "red",
    route: "/map?type=hospital",
  },
  {
    key: "police",
    title: "Police",
    desc: "Police stations",
    icon: PoliceIcon,
    tone: "blue",
    route: "/map?type=police",
  },
  {
    key: "fire",
    title: "Fire Station",
    desc: "Fire services",
    icon: FireIcon,
    tone: "amber",
    route: "/map?type=fire",
  },
  {
    key: "nearby",
    title: "Nearby Services",
    desc: "Search around you",
    icon: PinIcon,
    tone: "green",
    route: "/nearby",
  },
  {
    key: "map",
    title: "Live Map",
    desc: "Track your location",
    icon: MapIcon,
    tone: "blue",
    route: "/map",
  },
  {
    key: "ai",
    title: "AI Analyzer",
    desc: "Analyze emergencies",
    icon: AiIcon,
    tone: "indigo",
    route: "/analyzer",
  },
];

const emergencyContacts = [
  { label: "Ambulance", number: "102", tone: "red" },
  { label: "Police", number: "100", tone: "blue" },
  { label: "Fire", number: "101", tone: "amber" },
  { label: "Emergency", number: "112", tone: "green" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);
  const [locationOn, setLocationOn] = useState(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("user"));
      if (stored) setUser(stored);
    } catch {
      /* ignore */
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setLocationOn(true),
        () => setLocationOn(false),
        { timeout: 8000 }
      );
    } else {
      setLocationOn(false);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.toLowerCase();
    if (q.includes("hospital") || q.includes("ambulance"))
      navigate("/map?type=hospital");
    else if (q.includes("police")) navigate("/map?type=police");
    else if (q.includes("fire")) navigate("/map?type=fire");
    else navigate("/nearby");
  };

  const stats = [
    {
      label: "Active Emergencies",
      value: "0",
      hint: "All clear in your area",
      icon: ActivityIcon,
      tone: "green",
    },
    {
      label: "Emergency Alerts",
      value: "2",
      hint: "Weather advisory active",
      icon: AlertIcon,
      tone: "amber",
    },
    {
      label: "Response Readiness",
      value: "98%",
      hint: "Services operational",
      icon: HeartIcon,
      tone: "red",
    },
  ];

  const nearbyCounts = [
    { label: "Hospitals", value: "12", icon: AmbulanceIcon, tone: "red", route: "/map?type=hospital" },
    { label: "Police Stations", value: "7", icon: PoliceIcon, tone: "blue", route: "/map?type=police" },
    { label: "Fire Stations", value: "4", icon: FireIcon, tone: "amber", route: "/map?type=fire" },
  ];

  return (
    <div className="dash">
      <section className="dash-hero">
        <div className="dash-hero-text">
          <span className="pill dash-hero-pill">
            <span className="live-dot" />
            System Online
          </span>
          <h2>Welcome back, {user?.username || "Responder"}</h2>
          <p>Always ready, anytime and anywhere. Find help in seconds.</p>
        </div>

        <form className="dash-search" onSubmit={handleSearch}>
          <SearchIcon size={20} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for hospitals, police, fire stations..."
          />
          <button type="submit">Search</button>
        </form>
      </section>

      <section className="dash-stats">
        {stats.map(({ label, value, hint, icon: Icon, tone }) => (
          <div key={label} className={`stat-card stat-card--${tone}`}>
            <div className="stat-icon">
              <Icon size={22} />
            </div>
            <div className="stat-body">
              <span className="stat-label">{label}</span>
              <strong className="stat-value">{value}</strong>
              <span className="stat-hint">{hint}</span>
            </div>
          </div>
        ))}
      </section>
      <section className="dash-section">
        <div className="section-head">
          <h3>Quick Access</h3>
          <span>Tap a service to get help instantly</span>
        </div>
        <div className="quick-grid">
          {quickAccess.map(({ key, title, desc, icon: Icon, tone, route }) => (
            <button
              key={key}
              className={`quick-card quick-card--${tone}`}
              onClick={() => navigate(route)}
            >
              <span className="quick-icon">
                <Icon size={26} />
              </span>
              <span className="quick-title">{title}</span>
              <span className="quick-desc">{desc}</span>
            </button>
          ))}
        </div>
      </section>
      <section className="dash-lower">
        <div className="panel">
          <div className="section-head">
            <h3>Nearby Services</h3>
            <span>Within 5 km of your location</span>
          </div>
          <div className="count-list">
            {nearbyCounts.map(({ label, value, icon: Icon, tone, route }) => (
              <button
                key={label}
                className="count-row"
                onClick={() => navigate(route)}
              >
                <span className={`count-icon count-icon--${tone}`}>
                  <Icon size={20} />
                </span>
                <span className="count-label">{label}</span>
                <strong className="count-value">{value}</strong>
              </button>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="section-head">
            <h3>Location Status</h3>
          </div>
          <div
            className={`location-banner location-banner--${
              locationOn ? "on" : "off"
            }`}
          >
            <SignalIcon size={22} />
            <div>
              <strong>
                {locationOn === null
                  ? "Detecting location..."
                  : locationOn
                  ? "Live tracking active"
                  : "Location disabled"}
              </strong>
              <span>
                {locationOn
                  ? "Your position is shared with responders"
                  : "Enable location for accurate help"}
              </span>
            </div>
          </div>

          <div className="section-head" style={{ marginTop: "18px" }}>
            <h3>Emergency Hotlines</h3>
          </div>
          <div className="contact-grid">
            {emergencyContacts.map(({ label, number, tone }) => (
              <a
                key={number}
                href={`tel:${number}`}
                className={`contact-chip contact-chip--${tone}`}
              >
                <PhoneIcon size={16} />
                <span>{label}</span>
                <strong>{number}</strong>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
