import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

const center: [number, number] = [23.2599, 77.4126];
const route: [number, number][] = [
  [23.267, 77.405], [23.264, 77.409], [23.260, 77.414], [23.255, 77.419], [23.249, 77.426]
];
const riskSegment: [number, number][] = [[23.260, 77.414], [23.255, 77.419], [23.249, 77.426]];

const vehicleIcon = new L.DivIcon({
  className: "nirbhay-map-marker",
  html: "<div></div>",
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

function ResizeMap() {
  const map = useMap();
  useEffect(() => {
    const timer = window.setTimeout(() => map.invalidateSize(), 80);
    return () => window.clearTimeout(timer);
  }, [map]);
  return null;
}

export default function MapView() {
  return (
    <div className="map-shell">
      <MapContainer center={center} zoom={13} scrollWheelZoom={false} className="map">
        <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Polyline positions={route} pathOptions={{ color: "#4c2f22", weight: 6, opacity: 0.5 }} />
        <Polyline positions={riskSegment} pathOptions={{ color: "#e96e9b", weight: 8, opacity: 0.9 }} />
        <Marker position={route[2]} icon={vehicleIcon}>
          <Popup><strong>Journey NIR-10482</strong><br />Demo monitoring point</Popup>
        </Marker>
        <ResizeMap />
      </MapContainer>
    </div>
  );
}
