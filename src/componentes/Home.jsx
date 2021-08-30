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
      <div className="corpoHome">   
        <h1>O portal para encontrar conhecimento!</h1>
      </div>
    </div>
    );
  }
}
 
export default Home;