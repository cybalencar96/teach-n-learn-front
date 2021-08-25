import React, { Component } from 'react';
import alertas from "./listaAlertas";

class Alerta extends Component {
    constructor (props) {
        super(props);
        this.alerta = null;
    }
    render() { 
        this.alerta = alertas[this.props.msg];
        return ( 
            <div className="alerta">
                {this.alerta}
            </div>
         );
    }
}
 
export default Alerta;