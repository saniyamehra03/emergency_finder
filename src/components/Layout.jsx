import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  DashboardIcon,
  PinIcon,
  MapIcon,
  AiIcon,
  ShieldLogo,
  LogoutIcon,
  MenuIcon,
  CloseIcon,
  SignalIcon,
} from "./Icons";
import "./Layout.css";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: DashboardIcon },
  { to: "/nearby", label: "Nearby Services", icon: PinIcon },
  { to: "/map", label: "Live Map", icon: MapIcon },
  { to: "/analyzer", label: "AI Analyzer", icon: AiIcon, accent: true },
];

const Layout = ({ children, title, subtitle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [locating, setLocating] = useState("checking");

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("user"));
      if (stored) setUser(stored);
    } catch {
    }
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocating("off");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      () => setLocating("on"),
      () => setLocating("off"),
      { timeout: 8000 }
    );
  }, []);
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="layout">
      {open && <div className="layout-scrim" onClick={() => setOpen(false)} />}

      <aside className={`sidebar ${open ? "sidebar--open" : ""}`}>
        <div className="sidebar-brand">
          <span className="brand-mark">
            <ShieldLogo size={22} />
          </span>
          <div className="brand-text">
            <strong>Emergency</strong>
            <span>Finder</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(({ to, label, icon: Icon, accent }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `nav-item ${isActive ? "nav-item--active" : ""} ${
                  accent ? "nav-item--accent" : ""
                }`
              }
            >
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-status">
          <div className={`status-card status-card--${locating}`}>
            <SignalIcon size={18} />
            <div>
              <span className="status-title">Location</span>
              <span className="status-value">
                {locating === "on"
                  ? "Active"
                  : locating === "off"
                  ? "Disabled"
                  : "Checking..."}
              </span>
            </div>
          </div>
        </div>

        <div className="sidebar-user">
          <div className="user-avatar">
            {(user?.username || "G").charAt(0).toUpperCase()}
          </div>
          <div className="user-meta">
            <strong>{user?.username || "Guest"}</strong>
            <span>{user?.phone ? `+${user.phone}` : "Not signed in"}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout} aria-label="Logout">
            <LogoutIcon size={18} />
          </button>
        </div>
      </aside>

      <div className="layout-main">
        <header className="topbar">
          <button
            className="menu-btn"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            {open ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </button>
          <div className="topbar-titles">
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <a className="sos-pill" href="tel:112">
            <span className="live-dot" />
            SOS · 112
          </a>
        </header>

        <main className="content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
