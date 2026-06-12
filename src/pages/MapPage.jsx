import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import {
  AmbulanceIcon,
  PoliceIcon,
  FireIcon,
  PhoneIcon,
  RouteIcon,
  ShareIcon,
  SearchIcon,
  ClockIcon,
  PinIcon,
} from "../components/Icons";
import "./MapPage.css";

const MapPage = () => {
  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [animatedPos, setAnimatedPos] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [searchParams] = useSearchParams();

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    if (watchId !== null) return;
    const id = navigator.geolocation.watchPosition(
      (position) => {
        console.log("Received Location Sucessfully");
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
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
    if (type === "hospital") return "102";
    if (type === "police") return "100";
    if (type === "fire") return "101";
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  const getETA = (distance) => {
    const speed = 40;
    const time = distance / speed;
    return (time * 60).toFixed(0);
  };

  const fetchNearbyPlaces = async () => {
    if (!location) return;
    setLoading(true);
    setError("");
    let amenityType = "";
    if (type === "hospital") amenityType = "hospital";
    if (type === "police") amenityType = "police";
    if (type === "fire") amenityType = "fire_station";

    const query = `
  [out:json] [timeout:10];
  (
  node["amenity"="${amenityType}"](around:5000,${location.lat},${location.lng});
  );
  out body;
  `;
    try {
      const response = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: query,
      });
      if (!response.ok) {
        throw new Error("API failed");
      }
      const data = await response.json();
      console.log("API:", data);
      setPlaces(data.elements || []);
    } catch (err) {
      console.error("Error:", err);
      if (err.message === "API failed") {
        setError("Server busy. Please try again");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const shareLocation = () => {
    if (!location) {
      alert("Location not available");
      return;
    }
    const url = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
    navigator.clipboard.writeText(url);
    alert("Location copied! Share it with someone.");
  };

  const handleEmergencyClick = () => {
    if (!location) {
      alert("Location not available");
      return;
    }
    if (!nearestPlace) {
      alert("No hospital found nearby");
      return;
    }
    const url = `https://www.google.com/maps/dir/?api=1&origin=${location.lat},${location.lng}&destination=${nearestPlace.lat},${nearestPlace.lon}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    console.log("updated location:", location);
    if (location && type) {
      fetchNearbyPlaces();
    }
  }, [location, type]);

  useEffect(() => {
    if (!location) return;
    if (!animatedPos) {
      setAnimatedPos(location);
      return;
    }
    let start = animatedPos;
    let end = location;
    let steps = 20;
    let count = 0;
    const imterval = setInterval(() => {
      count++;
      const lat = start.lat + (end.lat - start.lat) * (count / steps);
      const lng = start.lng + (end.lng - start.lng) * (count / steps);
      setAnimatedPos({ lat, lng });
      if (count >= steps) {
        clearInterval(imterval);
      }
    }, 50);
    return () => clearInterval(imterval);
  }, [location]);

  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  useEffect(() => {
    const selectedType = searchParams.get("type");
    if (selectedType) {
      setType(selectedType);
    }
  }, []);

  const nearestPlace =
    location && places.length > 0
      ? places.reduce((prev, curr) => {
          const prevDist = getDistance(
            location.lat,
            location.lng,
            prev.lat,
            prev.lon
          );
          const currDist = getDistance(
            location.lat,
            location.lng,
            curr.lat,
            curr.lon
          );
          return prevDist < currDist ? prev : curr;
        })
      : null;

  useEffect(() => {
    if (emergencyMode && nearestPlace) {
      handleEmergencyClick();
    }
  }, [nearestPlace, emergencyMode]);

  const routePositions =
    location && nearestPlace
      ? [
          [location.lat, location.lng],
          [nearestPlace.lat, nearestPlace.lon],
        ]
      : [];

  const filteredPlaces = search
    ? places.filter((place) => {
        const name = place.tags?.name?.toLowerCase() || "";
        return name.includes(search.toLowerCase().trim());
      })
    : places;

  const sortedPlaces = location
    ? [...filteredPlaces].sort((a, b) => {
        const distA = parseFloat(
          getDistance(location.lat, location.lng, a.lat, a.lon)
        );
        const distB = parseFloat(
          getDistance(location.lat, location.lng, b.lat, b.lon)
        );
        return distA - distB;
      })
    : [];

  const userIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
    iconSize: [30, 30],
  });
  const hospitalIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2967/2967350.png",
    iconSize: [30, 30],
  });
  const policeIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/484/484167.png",
    iconSize: [30, 30],
  });
  const fireIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/482/482132.png",
    iconSize: [30, 30],
  });

  const MapUpdater = ({ location }) => {
    const map = useMap();
    useEffect(() => {
      if (location) {
        map.setView([location.lat, location.lng], 15);
      }
    }, [location]);
    return null;
  };

  const Routing = ({ location, nearestPlace }) => {
    const map = useMap();
    useEffect(() => {
      if (!location || !nearestPlace) return;
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(location.lat, location.lng),
          L.latLng(nearestPlace.lat, nearestPlace.lon),
        ],
        lineOptions: {
          styles: [{ color: "#3b82f6", weight: 5 }],
        },
        createMarker: () => null,
      }).addTo(map);
      return () => map.removeControl(routingControl);
    }, [location, nearestPlace]);
    return null;
  };

  const serviceLabel =
    type === "hospital"
      ? "Hospitals"
      : type === "police"
      ? "Police Stations"
      : type === "fire"
      ? "Fire Stations"
      : "Emergency Services";

  return (
    <div className="map-page">
      <div className="map-toolbar">
        <div className="service-tabs">
          <button
            className={`service-tab service-tab--red ${
              type === "hospital" ? "is-active" : ""
            }`}
            onClick={() => {
              setEmergencyMode(false);
              setType("hospital");
              getLocation();
            }}
          >
            <AmbulanceIcon size={20} />
            Ambulance
          </button>
          <button
            className={`service-tab service-tab--blue ${
              type === "police" ? "is-active" : ""
            }`}
            onClick={() => {
              setEmergencyMode(false);
              setType("police");
              getLocation();
            }}
          >
            <PoliceIcon size={20} />
            Police
          </button>
          <button
            className={`service-tab service-tab--amber ${
              type === "fire" ? "is-active" : ""
            }`}
            onClick={() => {
              setEmergencyMode(false);
              setType("fire");
              getLocation();
            }}
          >
            <FireIcon size={20} />
            Fire
          </button>
        </div>

        <button className="share-btn" onClick={shareLocation}>
          <ShareIcon size={18} />
          Share Location
        </button>
      </div>

      <div className="map-search">
        <SearchIcon size={18} />
        <input
          type="text"
          placeholder="Search a place by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {!type && (
        <div className="map-empty">
          <PinIcon size={40} />
          <h3>Select a service</h3>
          <p>Choose Ambulance, Police, or Fire to find help near you.</p>
        </div>
      )}

      {loading && places.length === 0 && !emergencyMode && (
        <div className="map-empty">
          <span className="spinner" />
          <h3>Finding nearby help...</h3>
          <p>Locating the closest {serviceLabel.toLowerCase()}.</p>
        </div>
      )}

      {!loading && error && (
        <div className="map-error">
          <p>{error}</p>
          <button onClick={fetchNearbyPlaces}>Retry</button>
        </div>
      )}
      {location && places.length > 0 && !emergencyMode && (
        <div className="map-shell">
          <MapContainer
            center={[location.lat, location.lng]}
            zoom={15}
            style={{ height: "440px", width: "100%" }}
          >
            <MapUpdater location={animatedPos || location} />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              position={[
                animatedPos?.lat || location.lat,
                animatedPos?.lng || location.lng,
              ]}
              icon={userIcon}
            >
              <Popup>You are here</Popup>
            </Marker>
            {location && nearestPlace && (
              <Routing location={location} nearestPlace={nearestPlace} />
            )}
            {routePositions.length > 0 && <Polyline positions={routePositions} />}
            {sortedPlaces.map((place, index) => (
              <Marker
                key={index}
                position={[place.lat, place.lon]}
                icon={
                  type === "hospital"
                    ? hospitalIcon
                    : type === "police"
                    ? policeIcon
                    : type === "fire"
                    ? fireIcon
                    : null
                }
              >
                <Popup>{place.tags?.name || "Unnamed Place"}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}
      {!loading && places.length > 0 && !emergencyMode && (
        <div className="results">
          <div className="section-head">
            <h3>Nearby {serviceLabel}</h3>
            <span>{sortedPlaces.length} found within 5 km</span>
          </div>
          <div className="results-grid">
            {sortedPlaces.map((place, index) => {
              const dist = getDistance(
                location.lat,
                location.lng,
                place.lat,
                place.lon
              );
              const isNearest = place === nearestPlace;
              return (
                <div
                  className={`result-card ${isNearest ? "result-card--nearest" : ""}`}
                  key={index}
                >
                  {isNearest && <span className="nearest-badge">Nearest</span>}
                  <h4>{place.tags?.name || "Unnamed Place"}</h4>
                  <div className="result-meta">
                    <span>
                      <PinIcon size={15} /> {dist} km
                    </span>
                    <span>
                      <ClockIcon size={15} /> {getETA(dist)} min
                    </span>
                  </div>
                  <div className="result-actions">
                    <a
                      className="result-call"
                      href={`tel:${getEmergencyNumber()}`}
                    >
                      <PhoneIcon size={16} />
                      Call {getEmergencyNumber()}
                    </a>
                    {place.lat && place.lon && (
                      <a
                        className="result-route"
                        href={`https://www.google.com/maps/dir/?api=1&origin=${location.lat},${location.lng}&destination=${place.lat},${place.lon}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <RouteIcon size={16} />
                        Directions
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapPage;
