import React, { Component } from "react";
import "./ListItem.css";

class ListItem extends Component {

    render() {
        return (
            <div id="item">
                <h1>{this.props.fantasia}</h1>
                <h3>{this.props.tipo!=null?this.props.tipo:"teste"}</h3>
            </div>
        );
    }
}

export default ListItem;