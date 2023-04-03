import React, { Component } from 'react';
import './App.css';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

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


class App extends Component {
  state = { markers: [] };

  componentDidMount() {
    fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.setState({ markers: response });
      });
  }

  render() {
    const center = [-5.2392367149948615, -38.130914436927064];

    return (
      <div>
        <aside>
          teste
        </aside>
        <MapContainer
          center={center}
          zoom={10}
          style={{ width: "100vw", height: "100vh" }}
          scrollWheelZoom={true}>
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {/* {console.log(this.state.markers)} */}


          {this.state.markers.length > 0 &&
         this.state.markers.map((marker) => (
           <Marker
             position={[
               marker["LAT"],
               marker["LONG"]
             ]}
           >
             <Popup>{marker["NM_FANTAS"]}</Popup>
           </Marker>
         ))}


        </MapContainer>
      </div>
    );
  }
}

export default App;