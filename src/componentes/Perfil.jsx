import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Perfil extends Component {

  constructor (props){
    super(props);
    this.logado = this.props.estado.userIsLogged;
    this.idUsuario = this.props.estado.userId;
    if (this.logado) {
      this.foto = this.props.estado.userDados.image;
      this.userHandle = this.props.estado.userDados.account.name;
      this.wins = this.props.estado.userDados.stats.all.overall.wins;
      this.kills = this.props.estado.userDados.stats.all.overall.kills;
    } else {
      this.foto = null;
      this.userHandle = null;
      this.wins = null;
      this.kills = null;
    }
    
    this.state = {
      info: false
    }
  }

  render() {
    if (!this.logado){
      return (
        <Redirect to="/login" />
      );
    }
    return ( 
      <div className="topo-perfil">
        <img src={this.foto} alt="Foto de perfil"/>
        <h1>Usuario: {this.userHandle}</h1>
        <h1>Kills: {this.kills}</h1>
        <h1>Wins: {this.wins}</h1>
      </div>
     );
  }
}
 
export default Perfil;
