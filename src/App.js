import React from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents
} from "react-leaflet";
import { useState } from 'react';
import Papa from "papaparse";
import './App.css';
import "leaflet/dist/leaflet.css";

/**
 * Código necessário para concertar BUG do Marker Icon
 */
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});



export default function App() {
  const center = [-5.2392367149948615, -38.130914436927064];

  return (
    <div>
      <h1>Escolha um arquivo .CSV</h1>
      <input type="file" name="file" accept=".csv" onChange={loadCsv} />
      <MapContainer
        center={center}
        zoom={10}
        style={{ width: "100vw", height: "80vh" }}
        scrollWheelZoom={false}
      >
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
<LocationMarker/>
        <Marker position={center}>
          <Popup>
            Casa
          </Popup>
        </Marker>
        
      </MapContainer>
    </div>
  );
}

function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

const loadCsv = (event) => {
  // Passing file data (event.target.files[0]) to parse using Papa.parse
  Papa.parse(event.target.files[0], {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      results.data.map((d)=>{
        console.log(Object.values(d))
        
      })
    },
  });
};
