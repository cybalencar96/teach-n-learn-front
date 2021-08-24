import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends Component {

    HandleLogout(){
        console.log("Logout acontece");
        this.props.estado();
    }

    render() {
        this.HandleLogout();
        return (
            <Redirect to="/" />
         );
    }
}
 
export default Logout;