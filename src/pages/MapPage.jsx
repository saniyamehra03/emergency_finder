import React from 'react'
import{  MapContainer,
TileLayer, Marker,  Popup,Polyline,useMap} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
const MapPage = ({location,
  animatedPos,
  nearestPlace,
  sortedPlaces,
  type}) => {
    //   const [location, setLocation] = useState(null);
    //   const[type,setType] = useState("");
    //   const [places ,setPlaces] = useState([]);
    //   const[loading,setLoading] =useState(false);
    //   const[error,setError] = useState("");
     const MapUpdater = ({location}) => {
    const map = useMap();
    useEffect(() => { 
      if(location){
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
        L.latLng(nearestPlace.lat, nearestPlace.lon)
      ],
      lineOptions: {
        styles: [{ color: "blue", weight: 5 }]
      },
      createMarker: () => null 
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [location, nearestPlace]);

  return null;
};
     const filteredPlaces = search?
      places.filter((place) => {
    const name = place.tags?.name?.toLowerCase() || "";
  return name.includes(search.toLowerCase().trim());
  }) :places;
    const sortedPlaces = location ?
    [...filteredPlaces].sort((a,b) => {
    const distA = parseFloat(getDistance(location.lat ,location.lng ,a.lat ,a.lon));
    const distB = parseFloat(getDistance(location.lat , location.lng ,b.lat,b.lon));
    return distA - distB;
  })
  : [];
  const userIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
    iconSize:[30,30],
  });
  const hospitalIcon = new L.Icon({
    iconUrl : "https://cdn-icons-png.flaticon.com/512/2967/2967350.png",
    iconSize : [30,30],
  });
  const policeIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/484/484167.png"
  });
  const fireIcon = new L.Icon({
    iconUrl : "https://cdn-icons-png.flaticon.com/512/482/482132.png",
    iconSize : [30,30],
  });

  return (
    <div>MapPage</div>
  )
}

export default MapPage