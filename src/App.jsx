import Perfil from "./componentes/Perfil"
import Login from "./componentes/Login";
import Logout from "./componentes/Logout";
import ItemDetail from "./itemDetail";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./componentes/Home";
import "./index.css";
import Cabecalho from "./componentes/Cabecalho";

class App extends Component {

    constructor(){
        super();
        this.state = {
            userIsLogged: false,
            userId: null
        }
    }

    async LogUserIn(email, senha){
        console.log("Email: "+ email + "Senha: " + senha);
        /* const banco = await fetch();
        const usuario = await banco.json(); */
        const usuario = {
            password: senha
        };
        if (usuario.password === senha){
            const novoEstado = {
                userIsLogged: true,
                userId: 1
            };
            this.setState(novoEstado);
        }
    }

    LogUserOut () {
        const novoEstado = {
            userIsLogged: false,
            userId: null
        }
        this.setState(novoEstado);
    }

    render(){
        console.log(this.estado);
        return (
        <section>
            <Router>
                <Cabecalho estado={this.state}></Cabecalho>
                <div className="App">
                    {/* O component switch serve para para no primeiro match da URl */}
                    <Switch>
                        {/* O component Route serve para criar rotas pra aplicação e renderizar outros componentes  */}
                        <Route path="/about" component={Perfil} />
                        {/* atributo exact serve para somente carregar a pagina home se tiver apenas o / vazio sem nada depois */}
                        <Route path="/" exact component={Home} />
                        <Route path="/login" exact render={ (props) => <Login {...props} LogUserIn={this.LogUserIn.bind(this)} />} />
                        <Route path="/shop/:id" component={ItemDetail} />
                        <Route path="/logout" exact render={ (props) => <Logout {...props} estado={this.LogUserOut.bind(this)}  />} />
                    </Switch>
                </div>
            </Router>
        </section>
    );}
}

export default App;
