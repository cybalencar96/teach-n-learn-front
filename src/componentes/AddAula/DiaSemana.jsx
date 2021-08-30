import React, { Component } from "react";

class DiaSemana extends Component {
    
    HandleChange(evento) {
        evento.stopPropagation();
        switch (evento.target.id) {
            case "deleta":
                this.props.handle(
                    10,
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
                <input id="dia" value={this.props.dia} readOnly/>
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
                <button id="deleta" type="button" onClick={this.HandleChange.bind(this)}>Deletar</button>
            </fieldset>
        );
    }
}

export default DiaSemana;
