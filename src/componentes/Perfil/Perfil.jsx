import axios from "axios";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Aulas from "../CardAulas/Aulas";
import "./estilo.css";

class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {teaching: [], learning: [], fetchedT: false, fetchedL: false}
        this.teaching = [];
        this.learning = [];
        this.logado = JSON.parse(sessionStorage.getItem("userIsLogged"));
        //Se usuário estiver logado, guarda as informacoes existentes,
        //caso contrário, deixa tudo como nulo e segue para o redirecionamento.
        //Isso garante que não haverá erro de construcao com dados nulos.
        if (this.logado) {
            const usuario = JSON.parse(sessionStorage.getItem("user"));
            this.idUsuario = usuario._id;
            this.userHandle = usuario.credentials.name;
            this.email = usuario.credentials.email;
            this.phone = usuario.credentials.phone;
            this.foto = usuario.credentials.profileImg;
            this.teachingIds = usuario.teaching;
            this.learningIds = usuario.learnings;
            
            //Pega as aulas que está lecionando
            
            if(this.teachingIds.length !== 0){
                //evita fazer requisições caso não existam aulas
                axios.get(
                    "https://fathomless-coast-56337.herokuapp.com/classes",
                    {
                        params:{
                            "type": "byTeacherId",
                            "searchInfo": encodeURIComponent(JSON.stringify(this.idUsuario)) //insere o array na url do get
                        }
                    }
                ).then( (res) => {
                    this.teaching = res.data.body;
                    if (Object.prototype.toString.call(this.teaching) === "[object Object]"){
                        this.teaching = [this.teaching];
                    }
                    this.setState({teaching: this.teaching, fetchedT: true});
                }
                ).catch((err) => {
                    alert("Erro de conexão!");
                    console.error(err);
                });
            }
            
            //Pega as aulas que está assistindo
            if(this.learningIds.length !== 0){ //evita fazer requisições caso não existam aulas
                console.log("learning");
                axios.get(
                    "https://fathomless-coast-56337.herokuapp.com/classes",
                    {
                        params:{
                            "type": "byClassId",
                            "searchInfo": encodeURIComponent(JSON.stringify(this.learningIds)) //insere o array na url do get
                        }
                    }
                ).then( (res) => {
                    this.learning = res.data.body;
                    if (Object.prototype.toString.call(this.learning) === "[object Object]"){
                        this.learning = [this.learning];
                    }
                    this.setState({learning: this.learning, fetchedL: true});
                }
                ).catch((err) => {
                    alert("Erro de conexão!");
                    console.error(err);
                });
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
                    {this.state.fetchedT ? (
                        <Aulas lista={this.state.teaching} />
                    ) : (
                        <img
                            src="./assets/loading-buffering.gif"
                            alt="Loading png"
                            height="100"
                            width="100"
                        />
                    )}
                    <button>
                        <Link to="/addAula">Adicionar uma aula</Link>
                    </button>
                    <h1>Suas aulas como aluno: </h1>
                    {this.state.fetchedL ? (
                        <Aulas lista={this.state.learning} />
                    ) : (
                        <img
                            src="./assets/loading-buffering.gif"
                            alt="Loading png"
                            height="100"
                            width="100"
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default Perfil;
