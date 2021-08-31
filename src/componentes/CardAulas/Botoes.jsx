import axios from "axios";
import React, { Component } from "react";

class BtnDelete extends Component {
    _Delete() {
        axios
            .delete(
                "https://afternoon-ridge-91819.herokuapp.com/api/v0/classes/" +
                    this.props.id
            )
            .then( res => {
                if (res.data.status === 200){
                    console.log("Deletado!");
                    const aulas = JSON.parse(sessionStorage.getItem("user"));
                    aulas.teaching.splice(aulas.teaching.indexOf(this.props.id), 1);
                    console.log(aulas);
                    sessionStorage.setItem("user", JSON.stringify(aulas));
                    this.props.update(aulas.teaching);
                } else {
                    console.error(res.data);
                }
            });
    }

    render() {
        return (
            <button
                type="button"
                className="btn-negativo"
                onClick={this._Delete.bind(this)}
            >
                Deletar aula
            </button>
        );
    }
}

class BtnBook extends Component {
    _Book() {
        axios
            .post(
                "https://afternoon-ridge-91819.herokuapp.com/api/v0/classes/" +
                    this.props.classId +
                    "/book",
                {
                    body: { userId: this.props.userId },
                }
            )
            .then((res) => {
                if (res.data.status === 200) {
                    const aulas = JSON.parse(sessionStorage.getItem("user"));
                    aulas.learning.push(this.props.classId);
                    sessionStorage.setItem("user", JSON.stringify(aulas));
                    this.props.update(aulas.learning);
                } else {
                    console.error(res.data);
                }
            });
    }

    render() {
        return (
            <button
                type="button"
                className="btn-positivo"
                onClick={this._Book.bind(this)}
            >
                Inscrever-se
            </button>
        );
    }
}

export {BtnDelete, BtnBook}
