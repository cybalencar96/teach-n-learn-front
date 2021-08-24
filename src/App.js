import './App.css';
import Nav from "./Nav";
import About from "./About";
import Shop from "./Shop";
import ItemDetail from "./itemDetail"
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Item from './itemDetail';
import Home from './Home'
function App() {

  return (
    <Router>
      <div className="App">
        <Nav />
        {/* O component switch serve para para no primeiro match da URl */}
        <Switch>
          {/* O component Route serve para criar rotas pra aplicação e renderizar outros componentes  */}
          <Route path="/about" component={About}/>
          {/* atributo exact serve para somente carregar a pagina home se tiver apenas o / vazio sem nada depois */}
          <Route path="/" exact component={Home}/>
          <Route path="/shop" exact component={Shop}/>
          <Route path="/shop/:id" component={ItemDetail}/>
        </Switch>
      </div>
    </Router>
  );
}


export default App;
