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
import Navbar from "./pages/Navbar";
import Sidebar from "./pages/Sidebar";

import { Polyline } from "react-leaflet";
import { useMap } from "react-leaflet";
import Heading from './components/Heading';
import Login from "./components/Login";
import Header from "./components/Header";
const App = () => {
  const[user,setUser] = useState(null);
  // const [watchId , setWatchId] = useState(null);
  // const [location, setLocation] = useState(null);
  // const[type,setType] = useState("");
  // const [places ,setPlaces] = useState([]);
  // const[loading,setLoading] =useState(false);
  // const[error,setError] = useState("");
  // const [search ,setSearch] = useState("");
  // const [emergencyMode , setEmergencyMode] = useState(false);
// const [animatedPos, setAnimatedPos] = useState(null);
  
  const getLocation = () => {
    if(!navigator.geolocation){
      alert("Geolocation is not supported by your browser");
      return;
    }
    if(watchId !== null)return;
    const id = navigator.geolocation.watchPosition(
      (position) => {
        console.log("Received Location Sucessfully");
        setLocation({
         lat: position.coords.latitude ,
         lng: position.coords.longitude 
        });
         setLastUpdated(new Date());
      },
      (error) => {
        console.log("Error:", error.message);
      }
    );
    setWatchId(id);
  };
  const getEmergencyNumber = () => {
    if(type ==="hospital")return "102";
    if(type ==="police") return "100";
    if(type=== "fire") return "101";
  };
  const getDistance = (lat1 ,lon1 , lat2 ,lon2) => {
    const R = 6371 ;
    const dLat =(lat2 -lat1) * Math.PI /180 ;
    const dLon = (lon2 -lon1) * Math.PI /180 ;
    const a = 
    Math.sin(dLat/2)* Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI /180)*
    Math.cos(lat2 * Math.PI /180)*
    Math.sin(dLon/2)* Math.sin(dLon/2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(2);
  };
   const getETA = (distance) => {
  const speed = 40; 
  const time = distance / speed;
  return (time * 60).toFixed(0); 
  };
   

  useEffect(() => {
    if(!location)return;
  if(!animatedPos){
    setAnimatedPos(location);
    return;
  }
  let start = animatedPos;
  let end = location;
  let steps = 20;
  let count =0;
  const imterval = setInterval(() => {
    count++;
    const lat = start.lat + (end.lat - start.lat) * (count / steps);
    const lng = start.lng + (end.lng - start.lng) * (count / steps);
    setAnimatedPos({lat,lng});
    if(count>=steps){
      clearInterval(imterval);
    }
  }, 50);
  return () => clearInterval(imterval);
  }, [location]);
   
 
  useEffect(() =>
  {
    console.log("Emergency Mode:" ,emergencyMode);
  }, [emergencyMode]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if(savedUser){
      setUser(JSON.parse(savedUser));
    }
  }, []);
 useEffect(() => {
  return () => {
    if(watchId !== null){
      navigator.geolocation.clearWatch(watchId);
    }
  };
 }, [watchId]);

  const fetchNearbyPlaces = async() =>
 {
  if(!location) return;
  setLoading(true);
  setError("");
  let amenityType = "";
  if ( type === "hospital") amenityType ="hospital";
   if ( type === "police") amenityType ="police";
    if ( type === "fire") amenityType ="fire_station";

   const query = `
  [out:json] [timeout:10];
  (
  node["amenity"="${amenityType}"](around:5000,${location.lat},${location.lng});
  );
  out body;
  `;
  try{
      const response = await fetch("https://overpass-api.de/api/interpreter",
     {
    method :"POST",
    body : query
   });
    if (!response.ok) {
  throw new Error("API failed");
}
const data = await response.json();
console.log("API:" , data);
setPlaces(data.elements || []);
} catch (err) {
    console.error("Error:", err);
    if(err.message === "API failed"){
      setError("Server busy 😔 Please try again");
    }
      else{
        setError("Something went wrong")
      }
  } finally {
    setLoading(false);
  }
};
  
const nearestPlace =

  places.length > 0
    ? places.reduce((prev, curr) => {
        const prevDist = getDistance(location.lat, location.lng, prev.lat, prev.lon);
        const currDist = getDistance(location.lat, location.lng, curr.lat, curr.lon);
        return prevDist < currDist ? prev : curr;
      })
    : null;
     useEffect(() => {
    if(emergencyMode && nearestPlace){
      handleEmergencyClick();
    }
  },[nearestPlace,emergencyMode]);
 const shareLocation = () => {
  if (!location) {
    alert("Location not available");
    return;
  }

  const url = `https://www.google.com/maps?q=${location.lat},${location.lng}`;

  navigator.clipboard.writeText(url);
  alert("📤 Location copied! Share it with someone.");
};
  
  
  const handleEmergencyClick = () => {
    if(!location) {
      alert("Location not available");
      return;
    }
    if(!nearestPlace){
      alert("No hospital found nearby");
      return;
    }
     const url = `https://www.google.com/maps/dir/?api=1&origin=${location.lat},${location.lng}&destination=${nearestPlace.lat},${nearestPlace.lon}`;
      window.open(url, "_blank");
  };
 const playAlarm = () => {
  const audio = new Audio(
    "https://www.soundjay.com/button/beep-07.wav"
  );
  audio.play();
};

return (
  <>
  {!user ? (
      <Login onLogin={setUser} />
    ) : (
  <div className='container main-box'>
      <Header
  user={user}
  location={location}
  lastUpdated={lastUpdated}
  onLogout={() => {
    localStorage.removeItem("user");
    setUser(null);
  }}
/>
          <button className="sos-btn"style={{
          background: "red", 
          color: "white", 
          marginTop: "10px",
         padding : "10px 20px",
         border: "none",
         borderRadius: "5px",
         marginBottom: "10px",
         cursor: "pointer"
       }} 
   onClick={() =>{
     playAlarm();
    setEmergencyMode(true);
  getLocation();
  setType("hospital");
  }}>
  🚨 Emergency Help
</button>
<button 
  onClick={shareLocation}
  style={{
    marginTop: "10px",
    padding: "8px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }}
>
  📤 Share My Location
</button>
      
<div className="action-buttons">

      <button className ="ambulance-btn" onClick={() => {
        setEmergencyMode(false);
        setType("hospital");
        getLocation();
       console.log("Location:",location);
      }}>
        🚑Ambulance
      </button>

      <button className="police-btn" onClick={() => {
        setEmergencyMode(false);
         setType("police");
        getLocation();
       console.log("Location:",location);
      }}>
       👮  Police
      </button>

      <button className="fire-btn" onClick={() => {
        setEmergencyMode(false);
         setType("fire");
        getLocation();
        console.log("Location:",location);
      }}>
        🔥Fire
      </button>
      </div>
      {loading && places.length === 0 && !emergencyMode && 
      <p>🔍 Finding nearby help...</p>}
   
      {!loading && error && (
        <div>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={fetchNearbyPlaces}>🔄Retry</button>
        </div> 
      )}
      <input type="text" placeholder="search place..." value={search} 
      onChange={(e) => setSearch(e.target.value)}
       style={{ marginTop: "10px", padding: "8px", width: "80%" }}
          />
     {location && places.length > 0 && !emergencyMode && (
      
  <MapContainer
  
    center={[location.lat, location.lng]}
    zoom={15}
    style={{ height: "400px", width: "100%", marginTop: "20px" }}>
      <MapUpdater location={animatedPos || location} />
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
  <Marker
  position={[
    animatedPos?.lat || location.lat,
    animatedPos?.lng || location.lng
  ]}
  icon={userIcon}
  >
      <Popup>You are here</Popup>
    </Marker>
     {location && nearestPlace && (
    <Routing
      location={location}
      nearestPlace={nearestPlace}
    />
  )}
     {routePositions.length > 0 && (
    <Polyline positions={routePositions} />
     )}
    {sortedPlaces.map((place, index) => (
      <Marker key={index} position={[place.lat, place.lon]}
      icon={
      type === "hospital" ? hospitalIcon :
      type === "police" ? policeIcon :
      type === "fire" ? fireIcon : null
      }>
        <Popup>{place.tags?.name || "Unnamed Place"}</Popup>
      </Marker>
    ))}
  </MapContainer>
)}
      {!loading && !error && places.length === 0 && type &&(
        <p>No nearby {type} found</p>
      )}
      {!loading && places.length > 0 && !emergencyMode && (
         <div>
        
        <h2>Nearby Results</h2>
        {sortedPlaces.map((place,index) =>(
          <div className='card'
         
          style={{border: place === nearestPlace ? "2px solid green" : ""}}
           key={index}>
            {place === nearestPlace && <p>⭐ Nearest</p>}
          <a href={`tel:${getEmergencyNumber()}`}>
            📞Call ({getEmergencyNumber()})</a>
            <p>
              📏{getDistance(location.lat , location.lng ,
                 place.lat , place.lon)} km away
            </p>
            <p>
              ⏱️ {getETA(
                 getDistance(location.lat, location.lng, place.lat, place.lon)
                )} min away
            </p>
            <p><b>{place.tags?.name || 'Unnamed Place'}</b></p>
           <p>📍 Latitude: {place.lat}</p>
           <p>📍 Longitude: {place.lon}</p>
           {place.lat && place.lon &&(
          <a 
          href ={`https://www.google.com/maps/dir/?api=1&origin=${location.lat},${location.lng}&destination=${place.lat},${place.lon}`}
          target ="_blank"
          rel="noopener noreferrer" >
              🚗Get Direction
          </a>
           )}
          </div>                                                                                                                                                                                                                          
        ))}
      </div>
    )}
    </div>
    )}                                                                        
    </>

);
};

export default App;