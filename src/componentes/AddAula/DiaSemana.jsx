import React, { Component } from "react";

class DiaSemana extends Component {
    
    HandleChange(evento) {
        switch (evento.target.id) {
            case "dia":
                this.props.handle(
                    this.props.index,
                    "weekday",
                    evento.target.value
                );
                break;
            case "comeco":
                this.props.handle(
                    this.props.index,
                    "startHour",
                    evento.target.value
                );
                break;
            case "final":
                this.props.handle(
                    this.props.index,
                    "endHour",
                    evento.target.value
                );
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <fieldset className="dia-semana" key={this.index}>
                <label>Dia</label>
                <select id="dia" onChange={this.HandleChange.bind(this)} defaultValue="Segunda">
                    <option key="1" value="Segunda">
                        Segunda
                    </option>
                    <option key="2" value="Terça">
                        Terça
                    </option>
                    <option key="3" value="Quarta">
                        Quarta
                    </option>
                    <option key="4" value="Quinta">
                        Quinta
                    </option>
                    <option key="5" value="Sexta">
                        Sexta
                    </option>
                    <option key="6" value="Sábado">
                        Sábado
                    </option>
                    <option key="7" value="Domingo">
                        Domingo
                    </option>
                </select>
                <label>Começo</label>
                <input
                    id="comeco"
                    type="time"
                    onChange={this.HandleChange.bind(this)}
                />
                <label>Final</label>
                <input
                    id="final"
                    type="time"
                    onChange={this.HandleChange.bind(this)}
                />
            </fieldset>
        );
    }
}

export default DiaSemana;
