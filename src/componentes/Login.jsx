import React, { Component } from "react";
import { Link } from "react-router-dom";
import Alerta from "./Alerta";
const queryString = require("query-string");

class Login extends Component {
    constructor(props) {
        super(props);
        this.username = "";
        this.senha = "";
        this.redirect = queryString.parse(this.props.location.search).redirect;
        this.state = {
            msg: "",
        };
    }

    _HandleUsernameChange(evento) {
        evento.stopPropagation();
        this.username = evento.target.value;
    }

    _HandlePassChange(evento) {
        evento.stopPropagation();
        //pois é, a senha tá indo em plain text, vamos implementar o hash futuramente
        this.senha = evento.target.value;
    }

    async _HandleLogin(evento) {
        evento.preventDefault();
        evento.stopPropagation();
        const resultado = await this.props.LogUserIn(this.username, this.senha);
        console.log("Veio resultado");
        console.log(await resultado);
        if (resultado) {
            const novoEstado = {
                msg: "loginFailed",
            };
            this.setState(novoEstado);
        } else {
            this.props.history.push("/");
        }
        
    }

    render() {
        return (
            <div className="login">
                <Alerta msg={this.state.msg} />
                <form onSubmit={this._HandleLogin.bind(this)}>
                    <fieldset className="inputCampo">
                        <label>Username</label>
                        <input
                            onChange={this._HandleUsernameChange.bind(this)}
                            type="text"
                        ></input>
                    </fieldset>
                    <fieldset className="inputCampo">
                        <label>Senha</label>
                        <input
                            onChange={this._HandlePassChange.bind(this)}
                            type="password"
                        ></input>
                    </fieldset>
                    <input type="submit" value="Entrar"></input>
                </form>
                <button>
                    <Link to="/signin">Faça seu cadastro</Link>
                </button>
            </div>
        );
    }
}

export default Login;
