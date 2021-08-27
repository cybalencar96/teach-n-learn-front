import Perfil from "./componentes/Perfil";
import Login from "./componentes/Login";
import Logout from "./componentes/Logout";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./componentes/Home";
import "./index.css";
import Cabecalho from "./componentes/Cabecalho";
import EditProfile from "./componentes/editProfile";
import Aulas from "./componentes/Aulas";
import SignIn from "./componentes/SignIn";

class App extends Component {
    constructor() {
        super();
        this.state = {
            userIsLogged: false,
            userId: null,
            userDados: null,
        };
    }

    LogUserIn(novoEstado) {
        console.log("Login");
        this.setState(novoEstado);
    }

    LogUserOut() {
        const novoEstado = {
            userIsLogged: false,
            userId: null,
            userDados: null
        };
        this.setState(novoEstado);
    }

    EditP(dadosNovos) {
        const novoEstado = {
            userDados: dadosNovos,
        };
        this.setState(novoEstado);
        console.log(this.state);
    }

    render() {
        return (
            <section>
                <Router>
                    <Cabecalho estado={this.state}></Cabecalho>
                    <div className="App">
                        {/* O component switch serve para para no primeiro match da URl */}
                        <Switch>
                            <Route path="/aulas" component={Aulas} />
                            <Route
                                path="/editProfile"
                                exact
                                render={(props) => (
                                    <EditProfile
                                        {...props}
                                        estado={this.state}
                                        editaPerfil={this.EditP.bind(this)}
                                    />
                                )}
                            />
                            <Route
                                path="/perfil"
                                exact
                                render={(props) => (
                                    <Perfil {...props} estado={this.state} />
                                )}
                            />
                            <Route path="/" exact component={Home} />
                            <Route
                                path="/login"
                                exact
                                render={(props) => (
                                    <Login
                                        {...props}
                                        LogUserIn={this.LogUserIn.bind(this)}
                                    />
                                )}
                            />
                            <Route
                                path="/logout"
                                exact
                                render={(props) => (
                                    <Logout
                                        {...props}
                                        estado={this.LogUserOut.bind(this)}
                                    />
                                )}
                            />
                            <Route path="/signin" component={SignIn} />
                        </Switch>
                    </div>
                </Router>
            </section>
        );
    }
}

export default App;
