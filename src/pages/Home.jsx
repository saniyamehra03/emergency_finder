import "./Home.css";
import {useNavigate} from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-container">

      <div className="hero-section">
        <h1>🚨 Emergency Finder</h1>

        <p>
          Find nearby hospitals, police stations and
          fire services instantly when you need help.
        </p>

        <button className="start-btn" onClick={() => navigate("/login")}>
          Get Started
        </button>
      </div>

    </div>
  );
}

export default Home;