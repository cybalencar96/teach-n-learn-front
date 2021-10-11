import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class BtnDelete extends Component {
    _Delete() {
        axios
            .delete(
                "https://fathomless-coast-56337.herokuapp.com/classes",
                {
                    headers: { },
                    data: {
                        classId: this.props.id,
                        userId: this.props.teacher
                    }
                }
            )
            .then( res => {
                if (res.status === 200){
                    const aulas = JSON.parse(sessionStorage.getItem("user"));
                    aulas.teaching.splice(aulas.teaching.indexOf(this.props.id), 1); //deleta a aula da lista de "teaching"
                    sessionStorage.setItem("user", JSON.stringify(aulas));
                    this.props.update();
                } else {
                    console.error(res.data);
                }
            })
            .catch((err) => {
                alert("Erro no sistema");
                console.log(err);
            });;
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
                "https://fathomless-coast-56337.herokuapp.com/classes/" +
                    this.props.data.classId +
                    "/book",
                {
                    userId: this.props.data.userId,
                }
            )
            .then((res) => {
                if (res.status === 200) {
                    const aulas = JSON.parse(sessionStorage.getItem("user"));
                    aulas.learnings.push(this.props.data.classId);
                    sessionStorage.setItem("user", JSON.stringify(aulas));
                    this.props.update();
                } else {
                    console.error(res.data);
                }
            })
            .catch(err =>
                console.error(err));  
    }

    render() {
        return JSON.parse(sessionStorage.getItem("userIsLogged")) ? (
            <button
                type="button"
                className="btn-positivo"
                onClick={this._Book.bind(this)}
            >
                Inscrever-se
            </button>
        ) : (
            <button>
                <Link to="/login">Faça login para se inscrever!</Link>
            </button>
        );
    }
}

class BtnUnbook extends Component {
    _Unbook() {
        axios
            .post(
                "https://fathomless-coast-56337.herokuapp.com/classes/" +
                    this.props.data.classId +
                    "/unbook",
                {
                    userId: this.props.data.userId,
                }
            )
            .then((res) => {
                if (res.status === 200) {
                    const aulas = JSON.parse(sessionStorage.getItem("user"));
                    aulas.learnings.splice(aulas.learnings.indexOf(this.props.data.classId),1);
                    sessionStorage.setItem("user", JSON.stringify(aulas));
                    this.props.update();
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
                onClick={this._Unbook.bind(this)}
            >
                Desinscrever-se
            </button>
        );
    }
}
export {BtnDelete, BtnBook, BtnUnbook}
