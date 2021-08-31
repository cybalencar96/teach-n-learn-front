import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./estilo.css"

class Cabecalho extends Component {
    render() {
        return ( 
            <header className="cabecalho">
                <div>
                    <h1>
                        <Link to="/"> Teach-n-learn</Link>
                    </h1>
                </div>
                <ul>
                    <li>
                        
                    </li>
                    <li>
                        <Link to="/BuscaAulas"> Aulas</Link>
                    </li>
                    <li>
                        <Link to="/perfil"> Acese seu perfil</Link>
                    </li>
                    <li>
                        {this.props.logado ? <Link to ="/logout">Log out</Link> : <Link to="/login"> Log in</Link>} 
                    </li>
                </ul>
            </header>
         );
    }
}
 
export default Cabecalho;

