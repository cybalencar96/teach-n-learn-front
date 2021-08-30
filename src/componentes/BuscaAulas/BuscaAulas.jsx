import axios from "axios";
import React, { Component } from "react";
import Aulas from "../Aulas";

class BuscaAulas extends Component {
    state = { lista: [] };
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
                    this.setState({ lista: res.data });
                });
        } else {
            axios
                .get(
                    "https://afternoon-ridge-91819.herokuapp.com/api/v0/classes/search?name=" +
                        search
                )
                .then((res) => this.setState({ lista: res.data }));
        }
    }
    render() {
        return <Aulas lista={this.state.lista} />;
    }
}

export default BuscaAulas;
