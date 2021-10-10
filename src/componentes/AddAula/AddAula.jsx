import React, { Component } from "react";
import DiaSemana from "./DiaSemana";
import "./estilo.css";
/* import lista from "./listaDeDias"; */
import {pt_en, en_pt} from "../../Extras/translate"
import Alerta from "../Alerta";
const axios = require("axios");

class AddAula extends Component {
    constructor(props) {
        super(props);
        this.state = {
            diasLivres: [
                "Segunda",
                "Terça",
                "Quarta",
                "Quinta",
                "Sexta",
                "Sabado",
                "Domingo",
            ],
            novoDia: "Segunda",
            listaDias: [],
            botao: "Cadastrar",
            nome: "",
            numAlunos: 0,
            preco: 0
        };
        const id = JSON.parse(sessionStorage.getItem("user"))._id;
        this.aula = {
            "teacherId": id,
            subject: "",
            maxStudents: 0,
            price: 0,
            classDates: [],
        };
    }

    maisDia(evento) {
        evento.stopPropagation();
        evento.preventDefault();
        const template = {
            weekday: pt_en[this.state.novoDia],
            hasClass: true,
            startHour: "",
            endHour: "",
        }
        const novoEstado = {
            listaDias: [...this.state.listaDias, template],
        };
        this.setState(novoEstado);
    }

    HandleDia(key, att, value) {
        if(key !== 10){ //Código 10 significa delete
            let atualizacao = [...this.state.listaDias];
            atualizacao[key][att] = value;
            const novoEstado = {
                listaDias: atualizacao,
            };
            this.setState(novoEstado);
        } else { //se for para deletar
            let atualizacao = [...this.state.listaDias];
            atualizacao.splice(value,1); //remove o item da lista
            this.setState({listaDias: atualizacao});
        }
    }

    _HandleNovo(evento) {
        evento.preventDefault();
        this.setState({novoDia: evento.target.value});
    }

    async HandleSubmit(evento) {
        evento.preventDefault();
        this.aula.classDates = this.state.listaDias;
        this.aula.subject = this.state.nome;
        this.aula.maxStudents = this.state.numAlunos;
        this.aula.price = this.state.preco;
        console.log(this.aula);
        this.setState({botao: "Cadastrando..."});
        await axios.post(
            "https://fathomless-coast-56337.herokuapp.com/classes",
            this.aula 
        ).then( res => {
            console.log(res);
            const usuario = JSON.parse(sessionStorage.getItem("user"));
            usuario.teaching.push(res.data.body.posted._id);
            sessionStorage.setItem("user", JSON.stringify(usuario));
            this.props.history.push("/perfil");
        })
        .catch( (err) => {
            console.log(err);
            this.setState({msg: "Erro ao cadastrar aula!"});
        })
    }

    _HandleChange(evento) {
        const value = evento.target.type === "number" ? Number(evento.target.value) : evento.target.value;
        this.setState({
            [evento.target.id]: value 
        });
    }

    render() {
        return (
            <div className="container-form">
                <Alerta msg={this.state.msg} />
                <form onSubmit={this.HandleSubmit.bind(this)}>
                    <fieldset className="inputCampo">
                        <label>Nome da aula</label>
                        <input
                            id="nome"
                            type="text"
                            value={this.state.nome}
                            onChange={this._HandleChange.bind(this)}
                        />
                    </fieldset>
                    <fieldset className="inputCampo">
                        <label>Numero máximo de alunos</label>
                        <input
                            id="numAlunos"
                            type="number"
                            value={this.state.numAlunos}
                            onChange={this._HandleChange.bind(this)}
                        />
                    </fieldset>
                    <fieldset className="inputCampo">
                        <label>Preço (R$)</label>
                        <input
                            id="preco"
                            type="number"
                            value={this.state.preco}
                            onChange={this._HandleChange.bind(this)}
                        />
                    </fieldset>
                    <h3>Dias:</h3>
                    {this.state.listaDias.map((dia, key) => {
                        if (dia.hasClass) {
                            return (
                                <DiaSemana
                                    handle={this.HandleDia.bind(this)}
                                    index={key}
                                    dia={en_pt[dia.weekday]}
                                />
                            );
                        }
                        return("");
                    })}
                    <select onChange={this._HandleNovo.bind(this)} value={this.state.novoDia}>
                        {this.state.diasLivres.map((dia, key) => {
                            return (
                                <option key={key} value={dia}>
                                    {dia}
                                </option>
                            );
                        })}
                    </select>
                    <button onClick={this.maisDia.bind(this)}>
                        Adicionar dia
                    </button>
                    <input type="submit" value={this.state.botao} className="btn-positivo" />
                </form>
            </div>
        );
    }
}

export default AddAula;
