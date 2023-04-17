import React, {Component} from "react";
import Collapsible from "react-collapsible";
import "./TipoRecursoCollaps.css";

class TipoRecursoCollaps extends Component{


    render(){
        return(
            <Collapsible trigger={<div id="title">{this.props.title}</div>}>
              {this.props.recursos.map((recurso)=>(
                <div id="recurso">{recurso["NM_FANTAS"]}</div>
              ))}
            </Collapsible>
        )
    }
}

export default TipoRecursoCollaps;