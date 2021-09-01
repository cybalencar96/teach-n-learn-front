import axios from "axios";
import React, { Component } from "react";
import Aulas from "../CardAulas/Aulas";
class BuscaAulas extends Component {
    state = { lista: [], fetched: false };
    constructor(props) {
        super(props);
        const urlParams = new URLSearchParams(window.location.search);
        this.search = urlParams.get("search");
        if (!this.search) {
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
                        this.search
                )
                .then((res) => this.setState({ lista: res.data, fetched: true }));
        }
        console.log("constructor");
    }


    render() {
        return (
            <div>
                {this.state.fetched ? (
                    <Aulas lista={this.state.lista} />
                ) : (
                    <img
                        src="./assets/loading-buffering.gif"
                        alt="Loading png"
                        height="200"
                        width="200"
                    />
                )}
                <div>
                    Icons made by{" "}
                    <a href="https://www.freepik.com" title="Freepik">
                        Freepik
                    </a>{" "}
                    from{" "}
                    <a href="https://www.flaticon.com/" title="Flaticon">
                        www.flaticon.com
                    </a>
                </div>
            </div>
        );
    }
}

export default BuscaAulas;
