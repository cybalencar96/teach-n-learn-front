import React, { Component } from 'react';

class Home extends Component {
  state = {  }
  render() {
    console.log("oi");
    return ( 
    <div className="buscaprincipal">
      <form>
        <input type="text" placeholder="Procure aqui por uma aula"></input>
        <input type="submit" value="Vai"></input>
      </form>
    </div> );
  }
}
 
export default Home;