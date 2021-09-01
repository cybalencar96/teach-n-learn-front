import axios from "axios";
import React, { Component } from "react";
import Aulas from "../CardAulas/Aulas";

class BuscaAulas extends Component {
    state = { lista: [], fetched: false };
    constructor(props) {
        super(props);
        const urlParams = new URLSearchParams(window.location.search);
        const search = urlParams.get("search");
        if (!search) {
            axios
                .get(
                    "https://afternoon-ridge-91819.herokuapp.com/api/v0/classes"
                )
                .then((res) => {
                    this.setState({ lista: res.data, fetched: true });
                });
        } else {
            axios
                .get(
                    "https://afternoon-ridge-91819.herokuapp.com/api/v0/classes/search?name=" +
                        search
                )
                .then((res) => this.setState({ lista: res.data, fetched: true }));
        }
    }
    render() {
        return (
            <div>
                {this.state.fetched ? (
                    <Aulas lista={this.state.lista} />
                ) : (
                    <h2>Carregando</h2>
                )}
            </div>
        );
    }
}

export default BuscaAulas;
