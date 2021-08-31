import React, { Component } from "react";
import {BtnBook, BtnDelete, BtnUnbook} from "./Botoes";
import "./estilo.css"

class Aulas extends Component {
    constructor(props) {
        super(props);
        if(!this.props.lista){
            this.state = {
                aulas: null,
            };
        } else {
            this.state = {
                aulas: [...this.props.lista],
            };
        }
        
        this.button = [];
    }

    UpdateF(novaLista){
        this.setState({aulas: novaLista});
    }

    render() {
        return (
            <div className="lista-cards">
                {this.props.lista.map((aula, index) => {
                    if (aula.teacherId === JSON.parse(sessionStorage.getItem("user")).id) {
                        this.button = [<BtnDelete id={aula._id} update={this.UpdateF.bind(this)} key={index}/> ]
                    } else {
                        const dados = {
                            userId: JSON.parse(sessionStorage.getItem("user")).id,
                            classId: aula._id,
                        };
                        if(JSON.parse(
                                sessionStorage.getItem("user")).learning.includes(aula._id)){
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
                            <h1> {aula.class} </h1>
                            <h2>Maximo de estudantes: {aula.maxStudents}</h2>
                            <h2>Preço: {aula.price}</h2>
                            <div className="dias-semana-card">
                                {aula.dateClass.map((dia, index) => {
                                    if (dia.hasClass) {
                                        return (
                                            <section key={index}>
                                                <h2>
                                                    <strong>
                                                        {dia.weekday}
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
