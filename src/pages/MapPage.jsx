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
  Ambulance,
  Shield,
  Flame,
  Search,
  Share2,
  Navigation,
  PhoneCall,
  MapPin,
  Clock,
  Star,
  RefreshCw,
  Loader2,
} from "lucide-react";

const serviceMeta = {
  hospital: { label: "Ambulance", Icon: Ambulance, accent: "text-medical", bg: "bg-medical", soft: "bg-medical/10" },
  police: { label: "Police", Icon: Shield, accent: "text-police", bg: "bg-police", soft: "bg-police/10" },
  fire: { label: "Fire", Icon: Flame, accent: "text-fire", bg: "bg-fire", soft: "bg-fire/10" },
};

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
          styles: [{ color: "#e02424", weight: 5 }],
        },
        createMarker: () => null,
      }).addTo(map);

      return () => map.removeControl(routingControl);
    }, [location, nearestPlace]);

    return null;
  };

  const selectType = (newType) => {
    setEmergencyMode(false);
    setType(newType);
    getLocation();
  };

  const serviceButtons = [
    { key: "hospital", ...serviceMeta.hospital },
    { key: "police", ...serviceMeta.police },
    { key: "fire", ...serviceMeta.fire },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground">Live Map</h1>
        <p className="text-sm text-muted">
          {location
            ? lastUpdated
              ? `Location updated at ${lastUpdated.toLocaleTimeString()}`
              : "Tracking your location..."
            : "Allow location access to find nearby help."}
        </p>
      </div>

      {/* Service toggles + actions */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {serviceButtons.map(({ key, label, Icon, bg, accent, soft }) => {
            const active = type === key;
            return (
              <button
                key={key}
                onClick={() => selectType(key)}
                className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                  active
                    ? `${bg} text-primary-foreground`
                    : `${soft} ${accent} hover:opacity-80`
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            );
          })}
        </div>

        <button
          onClick={shareLocation}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted"
        >
          <Share2 className="h-4 w-4 text-primary" />
          Share my location
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Map */}
        <div className="overflow-hidden rounded-3xl border border-border bg-surface">
          {location && places.length > 0 && !emergencyMode ? (
            <MapContainer
              center={[location.lat, location.lng]}
              zoom={15}
              style={{ height: "460px", width: "100%" }}
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
              {routePositions.length > 0 && (
                <Polyline positions={routePositions} color="#e02424" />
              )}
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
          ) : (
            <div className="flex h-[460px] flex-col items-center justify-center gap-3 px-6 text-center">
              {loading ? (
                <>
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm font-medium text-foreground">
                    Finding nearby help...
                  </p>
                </>
              ) : error ? (
                <>
                  <p className="text-sm font-medium text-primary">{error}</p>
                  <button
                    onClick={fetchNearbyPlaces}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Retry
                  </button>
                </>
              ) : (
                <>
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft">
                    <MapPin className="h-7 w-7 text-primary" />
                  </span>
                  <p className="text-sm font-medium text-foreground">
                    Choose a service to see nearby results
                  </p>
                  <p className="max-w-xs text-sm text-muted">
                    Select Ambulance, Police, or Fire above and we'll map the
                    closest options to your live location.
                  </p>
                </>
              )}
            </div>
          )}
        </div>

        {/* Results list */}
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search places..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-border bg-surface py-3 pl-12 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary"
            />
          </div>

          <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
            {!loading && sortedPlaces.length === 0 && !error && (
              <div className="rounded-2xl border border-dashed border-border bg-surface p-6 text-center text-sm text-muted">
                Results will appear here once you pick a service.
              </div>
            )}

            {!loading &&
              sortedPlaces.length > 0 &&
              !emergencyMode &&
              sortedPlaces.map((place, index) => {
                const isNearest = place === nearestPlace;
                const dist = getDistance(
                  location.lat,
                  location.lng,
                  place.lat,
                  place.lon
                );
                return (
                  <div
                    key={index}
                    className={`rounded-2xl border bg-surface p-4 transition-colors ${
                      isNearest ? "border-success" : "border-border"
                    }`}
                  >
                    {isNearest && (
                      <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
                        <Star className="h-3 w-3" />
                        Nearest
                      </span>
                    )}
                    <h3 className="text-sm font-semibold text-foreground">
                      {place.tags?.name || "Unnamed Place"}
                    </h3>

                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {dist} km away
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {getETA(dist)} min
                      </span>
                    </div>

                    <div className="mt-3 flex gap-2">
                      <a
                        href={`tel:${getEmergencyNumber()}`}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary-soft px-3 py-2 text-xs font-semibold text-primary"
                      >
                        <PhoneCall className="h-3.5 w-3.5" />
                        Call {getEmergencyNumber()}
                      </a>
                      {place.lat && place.lon && (
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&origin=${location.lat},${location.lng}&destination=${place.lat},${place.lon}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-foreground px-3 py-2 text-xs font-semibold text-background"
                        >
                          <Navigation className="h-3.5 w-3.5" />
                          Directions
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
