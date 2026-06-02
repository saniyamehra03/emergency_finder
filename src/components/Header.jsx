import React from "react";

const Header = ({ user, location, lastUpdated, onLogout }) => {
  return (
    <div className="header-box">
      <div>
        <h2>Welcome, {user?.username} 👋</h2>
        <p>Stay Safe ❤️</p>
      </div>

      <div>
        {location && (
          <>
            <p>📡 Live Tracking ON</p>
            <p>
              🕒 Last Update:
              {lastUpdated?.toLocaleTimeString()}
            </p>
          </>
        )}
      </div>

      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default Header;