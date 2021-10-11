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
                    "https://fathomless-coast-56337.herokuapp.com/classes"
                )
                .then((res) => {
                    this.setState({ lista: res.data.body, fetched: true });
                })
                .catch( (err) => {
                    console.log(err);   
                    alert("Erro no sistema!");
                });
        } else {
            axios
                .get(
                    "https://fathomless-coast-56337.herokuapp.com/classes",
                    {
                        params: {
                        "type": "bySubject",
                        "searchInfo": encodeURIComponent(JSON.stringify(this.search))
                    }}
                )
                .then((res) => {
                    let resultados = res.data.body;
                    if (Object.prototype.toString.call(resultados) === "[object Object]"){
                        resultados = [resultados];
                    }
                    this.setState({ lista: resultados, fetched: true })
                })
                .catch( (err) => {
                    console.log(err);
                    alert("Erro no sistema!");
                });
        }
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
