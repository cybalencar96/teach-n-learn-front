import React, { Component } from "react";
import { Link } from "react-router-dom";
import Alerta from "./Alerta";
const axios = require("axios");

class Login extends Component {
    constructor(props) {
        super(props);
        this.username = "";
        this.senha = "";
        this.state = {
            botao: "Entrar",
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
        this.setState({botao: "Entrando..."}) //Indica ao usuário pelo botão que o proceso está sendo feito
        await axios
            .post( //Requisição de login ao servidor
                "https://afternoon-ridge-91819.herokuapp.com/api/v0/users/login",
                {
                    body: {
                        username: this.username,
                        password: this.senha,
                    },
                }
            )
            .then((res) => {
                if (res.data.status === 200) {
                    //login success
                    const novoEstado = {
                        userIsLogged: true,
                        userId: res.data.userData.id,
                        userDados: res.data.userData,
                    };
                    this.props.LogUserIn(novoEstado);
                    this.props.history.push("/"); //Redireciona para a Home
                } else {
                    const novoEstado = {
                        msg: "loginFailed", //Para exibir uma mensagem de erro ao usuario
                        botao: "Entrar",
                    };
                    this.setState(novoEstado);
                }
            })
            .catch((err) => console.log(err.response));
    }

    render() {
        return (
            <div className="container-form">
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
                    <input type="submit" value={this.state.botao}></input>
                </form>
                <button>
                    <Link to="/signin">Faça seu cadastro</Link>
                </button>
            </div>
        );
    }
}

export default Login;
