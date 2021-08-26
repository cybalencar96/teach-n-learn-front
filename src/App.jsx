import Perfil from "./componentes/Perfil";
import Login from "./componentes/Login";
import Logout from "./componentes/Logout";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./componentes/Home";
import "./index.css";
import Cabecalho from "./componentes/Cabecalho";
import EditProfile from "./componentes/editProfile";
import Aulas from "./componentes/Aulas";
const axios = require('axios');

class App extends Component {

    constructor(){
        super();
        this.state = {
            userIsLogged: false,
            userId: null,
            userDados: null,
        }
    }

    async LogUserIn(email, senha){
        // console.log("Login");
        // axios.post("https://afternoon-ridge-91819.herokuapp.com/api/v0/users/login",{
        //         body: {
        //             username: "usuario2123",
        //             password: "usuario2123"
        //         }
                
        //     }
        // ).then( res => console.log(res.data)).catch(err => console.log(err.response))
        console.log("Login");
         axios.post("https://afternoon-ridge-91819.herokuapp.com/api/v0/users/login",{
                 body: {
                     username: "usuario2123",
                     password: "usuario2123"
                 }
                
             }
         ).then( res => console.log(res.data)).catch(err => console.log(err.response))
        // const usuario = await banco.json();
        // console.log(usuario);
        // if (usuario.password === senha){
        //     const novoEstado = {
        //         userIsLogged: true,
        //         userId: Math.random()*10,
        //         userDados: usuario
        //     };
        //     this.setState(novoEstado);
        //     return 0;
        // }

        // return 1;
    }

    LogUserOut () {
        const novoEstado = {
            userIsLogged: false,
            userId: null
        }
        this.setState(novoEstado);
    }

    EditP (dadosNovos) {
        const novoEstado = {
            userDados: dadosNovos
        }
        this.setState(novoEstado);
        console.log(this.state);
    }

    

    render(){
        return (
        <section>
            <Router>
                <Cabecalho estado={this.state}></Cabecalho>
                <div className="App">
                    {/* O component switch serve para para no primeiro match da URl */}
                    <Switch>
                        <Route path="/aulas" component={Aulas} />
                        <Route path="/editProfile" exact render={(props) => <EditProfile {...props} estado={this.state} editaPerfil={this.EditP.bind(this)} /> } />
                        {/* O component Route serve para criar rotas pra aplicação e renderizar outros componentes  */}
                        <Route path="/perfil" exact render={ (props) => <Perfil {...props} estado={this.state} /> } />
                        {/* atributo exact serve para somente carregar a pagina home se tiver apenas o / vazio sem nada depois */}
                        <Route path="/" exact component={Home} />
                        <Route path="/login" exact render={ (props) => <Login {...props} LogUserIn={this.LogUserIn.bind(this)} />} />
                        <Route path="/logout" exact render={ (props) => <Logout {...props} estado={this.LogUserOut.bind(this)}  />} />
                    </Switch>
                </div>
            </Router>
        </section>
    );}
}

export default App;
