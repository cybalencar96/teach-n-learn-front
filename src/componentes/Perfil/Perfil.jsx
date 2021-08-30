import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Aulas from "../Aulas";
import "./estilo.css";

class Perfil extends Component {
    constructor(props) {
        super(props);
        this.logado = this.props.estado.userIsLogged;
        this.idUsuario = this.props.estado.userId;
        //Se usuário estiver logado, guarda as informacoes existentes,
        //caso contrário, deixa tudo como nulo e segue para o redirecionamento.
        //Isso garante que não haverá erro de construcao com dados nulos.
        if (this.logado) {
            this.userHandle = this.props.estado.userDados.basicInfo.name;
            this.email = this.props.estado.userDados.basicInfo.email;
            this.phone = this.props.estado.userDados.basicInfo.phone;
            this.foto = this.props.estado.userDados.basicInfo.profileImg;
            this.teaching = this.props.estado.userDados.teaching;
            this.learning = this.props.estado.userDados.learning;
        }
    }

    render() {
        if (!this.logado) {
            return <Redirect to="/login" />;
        }
        return (
            <div>
              <div className="topo-perfil">
                  <div className="topo-perfil-foto">
                      <img src={this.foto} alt="Foto de perfil" />
                  </div>
                  <div className="topo-perfil-info">
                      <h1>Usuario: {this.userHandle}</h1>
                      <h2>Email: {this.email}</h2>
                      <h2>Telefone: {this.phone}</h2>
                      <button>
                          <Link to="/editProfile"> Editar</Link>{" "}
                      </button>
                  </div>
              </div>
              <div className="topo-perfil">
                <h1>Suas aulas: </h1>
                <Aulas lista={this.teaching} ></Aulas>
                <button><Link to="/addAula">Adicionar uma aula</Link></button>
              </div>
            </div>
        );
    }
}

export default Perfil;
