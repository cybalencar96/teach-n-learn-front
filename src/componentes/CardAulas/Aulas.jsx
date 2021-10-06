import React, { Component } from "react";
import { BtnBook, BtnDelete, BtnUnbook } from "./Botoes";
import { en_pt } from "../../Extras/translate";
import "./estilo.css";

class Aulas extends Component {
    constructor(props) {
        super(props);
        this.state = {aulas: [...this.props.lista]}
        if (JSON.parse(sessionStorage.getItem("userIsLogged"))) {
            this.user = JSON.parse(sessionStorage.getItem("user"));
        } else {
            this.user = {
                id: null,
                learning: [],
            };
        }
        this.button = [];
    }

    UpdateF() {
         window.location.reload();
    }

    render() {
        return (
            <div className="lista-cards">
                {this.state.aulas.map((aula, index) => {
                    if (aula.teacherId === this.user.id) {
                        this.button = [
                            <BtnDelete
                                id={aula._id}
                                update={this.UpdateF.bind(this)}
                                key={index}
                            />,
                        ];
                    } else {
                        const dados = {
                            userId: this.user.id,
                            classId: aula._id,
                        };
                        if (this.user.learning.includes(aula._id)) {
                            this.button = [
                                <BtnUnbook
                                    data={dados}
                                    update={this.UpdateF.bind(this)}
                                    key={index}
                                />,
                            ];
                        } else {
                            this.button = [
                                <BtnBook
                                    data={dados}
                                    update={this.UpdateF.bind(this)}
                                    key={index}
                                />,
                            ];
                        }
                    }
                    return (
                        <div className="card-aula" key={index}>
                            <h1> {aula.subject} </h1>
                            <h2>Maximo de estudantes: {aula.maxStudents}</h2>
                            <h2>Preço: {aula.price}</h2>
                            <div className="dias-semana-card">
                                {aula.classDates.map((dia, index) => {
                                    if (dia.hasClass) {
                                        return (
                                            <section key={index}>
                                                <h2>
                                                    <strong>
                                                        {en_pt[dia.weekday]}
                                                    </strong>
                                                </h2>
                                                <h3>
                                                    {dia.startHour} -{" "}
                                                    {dia.endHour}
                                                </h3>
                                            </section>
                                        );
                                    }
                                    return "";
                                })}
                            </div>
                            {this.button}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Aulas;
