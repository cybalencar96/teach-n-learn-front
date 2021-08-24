import About from "./About";
import Login from "./componentes/Login.jsx";
import ItemDetail from "./itemDetail";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import "./index.css";

class App extends Component {

  LogUserIn(email, senha){
    console.log(email + senha);
  }
    render(){return (
        <section>
            <div className="cabecalho">
                <ul>
                    <link></link>
                    <li>
                        <h1>
                            <button><a href="/"> Teach-n-learn</a></button> 
                        </h1>
                    </li>
                    <li>
                        <button><a href="/aulas"> Aulas</a></button> 
                    </li>
                    <li>
                        <button><a href="/about"> About us</a></button> 
                    </li>
                    <li>
                        <button><a href="/login"> Log in</a></button> 
                    </li>
                </ul>
                <hr></hr>
            </div>
            <Router>
                <div className="App">
                    {/* O component switch serve para para no primeiro match da URl */}
                    <Switch>
                        {/* O component Route serve para criar rotas pra aplicação e renderizar outros componentes  */}
                        <Route path="/about" component={About} />
                        {/* atributo exact serve para somente carregar a pagina home se tiver apenas o / vazio sem nada depois */}
                        <Route path="/" exact component={Home} />
                        <Route path="/login" exact render={ (props) => <Login {...props} LogUserIn={this.LogUserIn.bind(this)} />} />
                        <Route path="/shop/:id" component={ItemDetail} />
                    </Switch>
                </div>
            </Router>
        </section>
    );}
}

export default App;
