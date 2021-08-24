import React, { Component } from 'react';

class Login extends Component {

  constructor(props){
    super(props);
    this.email="";
    this.senha="";
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
  }

  render() {return (
    <div className="login">
      <form onSubmit={this._HandleLogin.bind(this)}>
        <fieldset>
          <label>Email</label>
          <input onChange={this._HandleEmailChange.bind(this)} type="email"></input>
        </fieldset>
        <fieldset>
          <label>Senha</label>
          <input onChange={this._HandlePassChange.bind(this)} type="password"></input>
        </fieldset>
        <input type="submit" value="vai"></input>
      </form>
    </div>
  );}
}

export default Login;
