import React, { useState, useEffect } from "react";
import Login from "../components/Login";
import MapPage from "./MapPage";

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <>
      {!user ? (
        <Login onLogin={setUser} />
      ) : (
        <MapPage />
      )}
    </>
  );
}

export default Home;