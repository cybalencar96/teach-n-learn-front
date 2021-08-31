import React, { Component } from 'react';

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
    this.props.history.push("/BuscaAulas?search="+this.texto);
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
      </div> 
      <div className="corpo-home">   
        <h1>Conecte o seu conhecimento</h1>
        <img className="main-img-home"src="./assets/Logo-home.png" alt="home"/>
        <h2>Uma plataforma feita para professores e alunos</h2>
      </div>
    </div>
    );
  }
}
 //import "../../public/assets/"
export default Home;