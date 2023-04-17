import React, { Component } from 'react';
import './App.css';
import {
  MapContainer,
  TileLayer,
  Marker
} from "react-leaflet";
import TipoRecursoCollaps from './components/TipoRecursoCollaps/TipoRecursoCollaps.js';

import "leaflet/dist/leaflet.css";

/**
 * Código necessário para concertar BUG do Marker Icon
 */
import L from "leaflet";
import ListItem from './components/ListItem/ListItem';
import MarkerPopup from './components/MarkerPopup/MarkerPopup';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


class App extends Component {
  state = {
    recursos: [],
    tipos_recursos: []
  };

  componentDidMount() {
    fetch("http://localhost:3000/recursos")
      .then((response) => response.json())
      .then((response) => {
        this.setState({ recursos: response });
      });

    fetch("http://localhost:3000/tipo_recursos")
      .then((response) => response.json())
      .then((response) => {
        this.setState({ tipos_recursos: response });
      });
  }

  render() {
    const center = [-5.2392367149948615, -38.130914436927064];

    return (
      <div>
        {/**
         * Painel Lateral com as camadas
         */}
        <aside>
          <div id='logo-containter'>
            <img id="logo" src='https://ipsum.co.uk/wp-content/uploads/2021/02/01.-Ipsum-Logo-Chevron-Blue.png' width={300} />
          </div>
          {this.state.tipos_recursos.length > 0 && this.state.tipos_recursos.map((tipo) => (
            <TipoRecursoCollaps title={tipo["DESCRICAO"]}
              recursos={this.state.recursos.length > 0 && this.state.recursos.filter((rec) => (
                rec["TIPO_RECURSO"]["ID"] === tipo["ID"]
              ))} />
          ))}


          {/* {this.state.recursos.length > 0 && this.state.recursos.map((marker) => (
            <ListItem key={marker["ID"]}
              fantasia={marker["NM_FANTAS"]}
              tipo={marker["TIPO_RECURSO"]}
            />
          ))} */}
        </aside>
        {/**
         * Mapa em si
         */}
        <MapContainer
          center={center}
          zoom={10}
          style={{ width: "75vw", height: "100vh" }}
          scrollWheelZoom={true}>
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {/* {console.log(this.state.recursos)} */}


          {this.state.recursos.length > 0 &&
            this.state.recursos.map((marker) => (
              <Marker key={marker["ID"]}
                position={[
                  marker["LAT"],
                  marker["LONG"]
                ]}
              >
                <MarkerPopup
                  nomeFantasia={marker["NM_FANTAS"]}
                  cnpj={marker["CNPJ"]}
                  ddd={marker["DDD"]}
                  telefone={marker["TELEFONE"]}
                />
              </Marker>
            ))}


        </MapContainer>
      </div>
    );
  }
}

export default App;