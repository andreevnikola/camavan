import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
  Popup,
} from "react-leaflet";

import L from "leaflet";

const iconTarget = new L.Icon({
  iconUrl: "/images/svg/target.svg",
  iconRetinaUrl: "/images/svg/target.svg",
  iconSize: new L.Point(20, 20),
  className: "bg-transparent",
  popupAnchor: [2, -40],
});

function PinabbleMarker({ setter }: any) {
  const [position, setPosition] = useState([
    42.515789616459884, 25.21277851883607,
  ]);
  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      setter([lat, lng]);
    },
  });
  return <Marker position={position as any} icon={iconTarget} />;
}

export function ChangeView({ coords }: { coords: [number, number] }) {
  const map = useMap();
  map.setView(coords, 6.4);
  return null;
}

export default function Map({
  lat = 42.515789616459884,
  lng = 25.21277851883607,
  setter,
}: any) {
  const [geoData, setGeoData] = useState({
    lat: lat,
    lng: lng,
  });

  const setPinpointFromMarker = (coords: [number, number]) => {
    setter(coords);
  };

  const center = [geoData.lat, geoData.lng];

  return (
    <MapContainer center={center as any} zoom={6.4} style={{ height: "250px" }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <PinabbleMarker setter={setPinpointFromMarker} />
      <ChangeView coords={center as any} />
    </MapContainer>
  );
}
