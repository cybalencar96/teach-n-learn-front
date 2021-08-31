import axios from "axios";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Aulas from "../CardAulas/Aulas";
import "./estilo.css";

class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {teaching: [], learning: []}
        this.teaching = [];
        this.learning = [];
        this.logado = JSON.parse(sessionStorage.getItem("userIsLogged"));
        //Se usuário estiver logado, guarda as informacoes existentes,
        //caso contrário, deixa tudo como nulo e segue para o redirecionamento.
        //Isso garante que não haverá erro de construcao com dados nulos.
        if (this.logado) {
            const usuario = JSON.parse(sessionStorage.getItem("user"));
            this.idUsuario = usuario.id;
            this.userHandle = usuario.basicInfo.name;
            this.email = usuario.basicInfo.email;
            this.phone = usuario.basicInfo.phone;
            this.foto = usuario.basicInfo.profileImg;
            this.teachingIds = usuario.teaching;
            this.learningIds = usuario.learning;
            
            //Pega as aulas que está lecionando
            
            this.getsT = [];
            for (let i = 0; i < this.teachingIds.length; i++) {
                this.getsT.push(
                    axios.get(
                        "https://afternoon-ridge-91819.herokuapp.com/api/v0/classes/" +
                            this.teachingIds[i]
                    )
                );
            }
            if(this.getsT){
                axios.all(this.getsT).then(
                    axios.spread((...responses) => {
                        const lecionando = responses.map( item => item.data);
                        this.setState({ teaching: lecionando });
                    })
                );
            }
            this.getsL = [];
            for (let i = 0; i < this.learningIds.length; i++) {
                this.getsL.push(
                    "https://afternoon-ridge-91819.herokuapp.com/api/v0/classes/" +
                        this.learningIds[i]
                );
            }
            if(this.getL){
                axios.all(this.getsL).then(
                    axios.spread((...res) => {
                        const assistindo = res.map((item) => item.data);
                        this.setState({ learning: assistindo });
                    })
                );
            }
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
                <div className="corpo-perfil">
                    <h1>Suas aulas como professor: </h1>
                    {<Aulas lista={this.state.teaching} />}
                    <button>
                        <Link to="/addAula">Adicionar uma aula</Link>
                    </button>
                    <h1>Suas aulas como aluno: </h1>
                    {<Aulas lista={this.state.learning} />}
                </div>
            </div>
        );
    }
}

export default Perfil;
