import React, { Component } from 'react';
const queryString = require('query-string');

class Login extends Component {

  constructor(props){
    super(props);
    this.email="";
    this.senha="";
    this.redirect = queryString.parse(this.props.location.search).redirect;
  }

  _HandleEmailChange(evento){
    evento.stopPropagation();
    this.email = evento.target.value;
  }

  _HandlePassChange(evento){
    evento.stopPropagation();
    //pois é, a senha tá indo em plain text, vamos implementar o hash futuramente
    this.senha = evento.target.value;
  }

  _HandleLogin(evento){
    evento.preventDefault();
    evento.stopPropagation();
    this.props.LogUserIn(this.email, this.senha);
    if(this.redirect){
      console.log("Veio de redi");
      this.props.history.push("/perfil");
    } else {
      this.props.history.push("/");
    }
  }

  render() {return (
    <div className="login">
      <form onSubmit={this._HandleLogin.bind(this)}>
        <fieldset className="inputCampo">
          <label>Email</label>
          <input onChange={this._HandleEmailChange.bind(this)} type="email"></input>
        </fieldset>
        <fieldset className="inputCampo">
          <label>Senha</label>
          <input onChange={this._HandlePassChange.bind(this)} type="password"></input>
        </fieldset>
        <input type="submit" value="Entrar"></input>
      </form>
    </div>
  );}
}

export default Login;
