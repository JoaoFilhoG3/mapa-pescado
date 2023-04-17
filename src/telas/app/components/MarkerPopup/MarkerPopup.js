import React, { Component } from "react";
import { Popup } from "react-leaflet";

class MarkerPopup extends Component {

    render() {
        return (
            <Popup>
                <h1>
                    {this.props.nomeFantasia}
                </h1>
                {this.props.cnpj !== "" ? this.props.cnpj : "CNPJ Não Informado"}<br />
                ({this.props.ddd}) {this.props.telefone}<br />
            </Popup>
        );
    }
}
export default MarkerPopup;