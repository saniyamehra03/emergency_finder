import "./Home.css";
import MapPage from "./MapPage";

function Home() {


  // useEffect(() => {
  //   const savedUser = localStorage.getItem("user");

  //   if (savedUser) {
  //     setUser(JSON.parse(savedUser));
  //   }
  // }, []);

  return (
    
     <div className="dashboard-title">
      <h1>🚨Emergency Finder Dashboard</h1>
      <div className="welcome-card"></div>
        <h2>Welcome Back 👋</h2>
  <p>
    Find nearby hospitals, police stations and
    fire stations instantly.
  </p>
      <MapPage/>
     </div>
  );
}

export default Home;