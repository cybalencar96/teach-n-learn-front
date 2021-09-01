import Perfil from "./componentes/Perfil/Perfil";
import Login from "./componentes/Login";
import Logout from "./componentes/Logout";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./componentes/Home";
import "./index.css";
import Cabecalho from "./componentes/Cabecalho/Cabecalho";
import EditProfile from "./componentes/editProfile";
import SignIn from "./componentes/SignIn";
import AddAula from "./componentes/AddAula/AddAula";
import BuscaAulas from "./componentes/BuscaAulas/BuscaAulas";

class App extends Component {
    constructor() {
        super();
        this.state = {
            userIsLogged: JSON.parse(sessionStorage.getItem("userIsLogged")),
        };
    }

    LogUser(novoEstado) { //Necessário para renderizar o cabeçalho novamente após login/logout
        this.setState(novoEstado);
    }

    EditP(dadosNovos) {
        const novoEstado = {
            userDados: dadosNovos,
        };
        this.setState(novoEstado);
    }

    render() {
        return (
            <section>
                <Router>
                    <Cabecalho logado={this.state.userIsLogged}></Cabecalho>
                    <div className="App">
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/addAula" component={AddAula} />
                            <Route path="/BuscaAulas" component={BuscaAulas} />
                            <Route path="/editProfile" exact component={EditProfile} />
                            <Route path="/perfil" exact component={Perfil} />
                            <Route path="/signin" component={SignIn} />
                            <Route
                                path="/login"
                                exact
                                render={(props) => (
                                    <Login
                                        {...props}
                                        LogUser={this.LogUser.bind(this)}
                                    />
                                )}
                            />
                            <Route
                                path="/logout"
                                exact
                                render={(props) => (
                                    <Logout
                                        {...props}
                                        LogUser={this.LogUser.bind(this)}
                                    />
                                )}
                            />
                        </Switch>
                    </div>
                </Router>
            </section>
        );
    }
}

export default App;
