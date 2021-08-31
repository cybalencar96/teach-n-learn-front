import React, { Component } from "react";
import DiaSemana from "./DiaSemana";
import "./estilo.css";
import lista from "./listaDeDias";
const axios = require("axios");

class AddAula extends Component {
    constructor(props) {
        super(props);
        this.novoDia = "monday";
        this.state = {
            diasLivres: [
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
                "sunday",
            ],
            listaDias: lista.slice(),
            botao: "Cadastrar"
        };
        const id = JSON.parse(sessionStorage.getItem("user")).id;
        this.aula = {
            teacherId: id,
            class: "",
            maxStudents: 0,
            price: 0,
            dateClass: [],
        };
    }

    maisDia(evento) {
        evento.stopPropagation();
        evento.preventDefault();
        const indice = this.state.diasLivres.indexOf(this.novoDia);
        const cortado = this.state.diasLivres.filter(
            (item, index) => index !== indice
        );
        //O seguinte método de cópia é necessário para que não afete o valor de this.state.listaDias
        //e consequentemente o de listas permanentemente. Nenhum outro método funcionou
        let atualizacao = JSON.parse(JSON.stringify(this.state.listaDias)); //Cópia estritamente por valor
        for (let i = 0; i < atualizacao.length; i++) {
            if (atualizacao[i].weekday === this.novoDia) {
                atualizacao[i].hasClass = true;
            }
        }
        const novoEstado = {
            diasLivres: cortado,
            listaDias: atualizacao,
        };
        this.setState(novoEstado);

        this.novoDia = this.state.diasLivres[1];
    }

    HandleDia(key, att, value) {
        if(key !== 10){ //Código 10 significa delete
            const atualizacao = [...this.state.listaDias];
            atualizacao[key][att] = value;
            const novoEstado = {
                listaDias: atualizacao,
            };
            this.setState(novoEstado);
        } else {
            let atualizacao = JSON.parse(
                JSON.stringify(this.state.listaDias)
            );
            for (let i = 0; i < atualizacao.length; i++) {
                if (atualizacao[i].weekday === value) {
                    atualizacao[i].hasClass = false;
                }
            }
            const novoEstado = {
                diasLivres: [...this.state.diasLivres, value],
                listaDias: atualizacao,
            };
            this.setState(novoEstado);
        }
    }

    _HandleNovo(evento) {
        evento.preventDefault();
        this.novoDia = evento.target.value;
    }

    async HandleSubmit(evento) {
        evento.preventDefault();
        this.aula.dateClass = this.state.listaDias;
        this.setState({botao: "Cadastrando..."})
        await axios.post(
            "https://afternoon-ridge-91819.herokuapp.com/api/v0/classes",
            {body: this.aula}
        ).then( res => {
            const usuario = JSON.parse(sessionStorage.getItem("user"));
            usuario.teaching.push(res.data.insertedId);
            sessionStorage.setItem("user", JSON.stringify(usuario));
            this.props.history.push("/perfil");
        })
    }

    _HandleChange(evento) {
        switch (evento.target.id) {
            case "nome":
                this.aula.class = evento.target.value;
                break;
            case "numAlunos":
                this.aula.maxStudents = Number(evento.target.value);
                break;
            case "preco":
                this.aula.price = Number(evento.target.value);
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div className="container-form">
                <form onSubmit={this.HandleSubmit.bind(this)}>
                    <fieldset className="inputCampo">
                        <label>Nome da aula</label>
                        <input
                            id="nome"
                            type="text"
                            onChange={this._HandleChange.bind(this)}
                        />
                    </fieldset>
                    <fieldset className="inputCampo">
                        <label>Numero máximo de alunos</label>
                        <input
                            id="numAlunos"
                            type="number"
                            onChange={this._HandleChange.bind(this)}
                        />
                    </fieldset>
                    <fieldset className="inputCampo">
                        <label>Preço (R$)</label>
                        <input
                            id="preco"
                            type="number"
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
                                    dia={dia.weekday}
                                />
                            );
                        }
                        return("");
                    })}
                    <select onChange={this._HandleNovo.bind(this)}>
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
