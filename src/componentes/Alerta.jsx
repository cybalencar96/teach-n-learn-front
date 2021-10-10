import React, { Component } from 'react';
import alertas from "../Extras/listaAlertas";

class Alerta extends Component {
    constructor (props) {
        super(props);
        this.alerta = null;
    }
    render() {
        if(!this.props.msg){
            this.alerta = ""
            this.className = "alerta"
        } else {
            this.alerta = alertas[this.props.msg].msg;
            this.className = alertas[this.props.msg].className;
        }
        return <div className={this.className}>{this.alerta}</div>;
    }
}
 
export default Alerta;