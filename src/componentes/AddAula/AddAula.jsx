import React, { Component } from "react";
import DiaSemana from "./DiaSemana";
import "./estilo.css";
const axios = require("axios");

class AddAula extends Component {
    constructor(props) {
        super(props);
        this.listaDias = [];
        this.state = {
            numDias: 0,
            dias: [],
        };
        this.aula = {
            teacherId: this.props.id,
            class: "",
            maxStudents: 0,
            price: 0,
            dateClass: [],
        };
    }

    maisDia(evento) {
        evento.preventDefault();
        this.listaDias = [
            ...this.state.dias,
            {
                weekday: "Segunda",
                hasClass: true,
                startHour: "",
                endHour: "",
            },
        ];
        const mais = this.state.numDias + 1;
        const novoEstado = {
            numDias: mais,
            dias: this.listaDias,
        };
        this.setState(novoEstado);
    }

    HandleDia(key, att, value) {
        this.listaDias[key][att] = value;
    }

    async HandleSubmit(evento) {
        evento.preventDefault();
        this.aula.dateClass = this.listaDias;
        console.log(this.aula);
        await axios
            .post(
                "https://afternoon-ridge-91819.herokuapp.com/api/v0/classes",
                {
                    data: this.aula,
                }
            )
            .then((res) => {
                console.log(res.data);
            });
    }

    _HandleChange(evento) {
        switch (evento.target.id) {
            case "nome":
                this.aula.class = evento.target.value;
                break;
            case "numAlunos":
                this.aula.maxStudents = evento.target.value;
                break;
            case "preco":
                this.aula.price = evento.target.value;
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
                    <label>Dias:</label>
                    {this.listaDias.map((dia, key) => {
                        return (
                            <DiaSemana
                                handle={this.HandleDia.bind(this)}
                                index={key}
                            />
                        );
                    })}
                    <button onClick={this.maisDia.bind(this)}>
                        Adicionar dia
                    </button>
                    <input type="submit" value="Enviar" />
                </form>
            </div>
        );
    }
}

export default AddAula;
