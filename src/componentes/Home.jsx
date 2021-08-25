import React, { Component } from 'react';
import ResultadosBusca from './ResultadosBusca';

class Home extends Component {
  constructor(props){
    super(props);
    this.texto = "";
    this.state = {
      aulas: []
    }
  }

  _HandleBusca(evento){
    evento.preventDefault();
    //Inserir fetch do banco aqui no lugar da aula
    const aula = {
      "class": this.texto,
      "maxStudents": 20,
      "price": 60
    }
    const novoEstado = {
      aulas: [...this.state.aulas, aula]
    }
    this.setState(novoEstado);
  }

  _HandleTexto(evento){
    evento.stopPropagation();
    this.texto = evento.target.value;
  }

  render() {
    return ( 
    <div>
      <div className="buscaprincipal">
        <form onSubmit={this._HandleBusca.bind(this)}>
          <input type="text" placeholder="Procure aqui por uma aula" onChange={this._HandleTexto.bind(this)}></input>
          <input type="submit" value="Vai"></input>
        </form>
        <ResultadosBusca aulas={this.state.aulas}/>
      </div> 
      <div className="corpoHome">   
        <h1>O portal para encontrar conhecimento!</h1>
      </div>
    </div>
    );
  }
}
 
export default Home;