import "./Home.css";
import { useNavigate } from "react-router-dom";
import {
  ShieldLogo,
  AmbulanceIcon,
  PoliceIcon,
  FireIcon,
  PinIcon,
} from "../components/Icons";

function Home() {
  const navigate = useNavigate();

  const features = [
    { Icon: AmbulanceIcon, label: "Nearby Hospitals", tone: "red" },
    { Icon: PoliceIcon, label: "Police Stations", tone: "blue" },
    { Icon: FireIcon, label: "Fire Services", tone: "amber" },
    { Icon: PinIcon, label: "Live Tracking", tone: "green" },
  ];

  return (
    <div className="home-container">
      <div className="home-hero">
        <span className="home-mark">
          <ShieldLogo size={30} />
        </span>
        <span className="pill home-pill">
          <span className="live-dot" />
          Emergency Finder
        </span>
        <h1>Find emergency help in seconds</h1>
        <p>
          Locate nearby hospitals, police, and fire stations instantly. Live
          location tracking and an AI analyzer guide you to the right help when
          every second counts.
        </p>
        <button className="start-btn" onClick={() => navigate("/login")}>
          Get Started
        </button>

        <div className="home-features">
          {features.map(({ Icon, label, tone }) => (
            <div key={label} className={`home-feature home-feature--${tone}`}>
              <span><Icon size={22} /></span>
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
