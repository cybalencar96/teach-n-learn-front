import axios from "axios";
import React, { Component } from "react";
import Alerta from "./Alerta";

class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            msg: ""
        }   
        this.dados = {
            name: "",
            email: "",
            username: "",
            password: "",
            phone: "",
            profileImg: "",
        };
    }

    _HandleChange(evento) {
        evento.stopPropagation();
        switch (evento.target.id) {
            case "nome":
                this.dados.name = evento.target.value;
                break;
            case "email":
                this.dados.email = evento.target.value;
                break;
            case "username":
                this.dados.username = evento.target.value;
                break;
            case "senha":
                this.dados.password = evento.target.value;
                break;
            case "phone":
                this.dados.phone = evento.target.value;
                break;
            case "imgLink":
                this.dados.profileImg = evento.target.value;
                break;
            default:
                break;
        }
    }

    _HandleForm(evento) {
        evento.preventDefault();
        console.log(this.dados);
        axios.post(
            "https://afternoon-ridge-91819.herokuapp.com/api/v0/users/signin",
            {
                body: this.dados,
            }
        ).then( (res) => {
            console.log("Resposta recebida");
            console.log(res.data);
        }).catch((err) => console.error(err.response));
    }

    render() {
        return (
            <div className="login">
                <Alerta msg={this.state.msg} />
                <form onSubmit={this._HandleForm.bind(this)}>
                    <fieldset className="inputCampo">
                        <label>Nome</label>
                        <input
                            id="nome"
                            type="text"
                            onChange={this._HandleChange.bind(this)}
                        />
                    </fieldset>
                    <fieldset className="inputCampo">
                        <label>Email</label>
                        <input
                            id="email"
                            type="email"
                            onChange={this._HandleChange.bind(this)}
                        />
                    </fieldset>
                    <fieldset className="inputCampo">
                        <label>Username</label>
                        <input
                            id="username"
                            type="text"
                            onChange={this._HandleChange.bind(this)}
                        />
                    </fieldset>
                    <fieldset className="inputCampo">
                        <label>Senha</label>
                        <input
                            id="senha"
                            type="password"
                            onChange={this._HandleChange.bind(this)}
                        />
                    </fieldset>
                    <fieldset className="inputCampo">
                        <label>Telefone</label>
                        <input
                            id="phone"
                            type="text"
                            onChange={this._HandleChange.bind(this)}
                        />
                    </fieldset>
                    <fieldset className="inputCampo">
                        <label>Link de imagem</label>
                        <input
                            id="imgLink"
                            type="text"
                            onChange={this._HandleChange.bind(this)}
                        />
                    </fieldset>
                    <input type="submit" value="Entrar"></input>
                </form>
            </div>
        );
    }
}

export default SignIn;
