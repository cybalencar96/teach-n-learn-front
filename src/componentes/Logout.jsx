import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
    constructor (props){
        super(props);
        if (sessionStorage.getItem("userIsLogged")) {
            console.log("Removendo sessão");
            sessionStorage.removeItem("user");
            sessionStorage.setItem("userIsLogged", false);
        }
        const novoEstado = {
            userIsLogged: false,
        };
        this.props.LogUser(novoEstado);
    }

    render() {
        return (
            <Redirect to="/" />
         );
    }
}
 
export default Logout;