import React, { Component } from 'react';

class ResultadosBusca extends Component {
    render() { 
        return ( 
            <div className="lista-cards">
                {this.props.aulas.map( (aula, index) =>{
                    return(
                        <div className="card-aula" key={index}>
                            <h1> {aula.class} </h1>
                            <h2>Maximo de estudantes: {aula.maxStudents}</h2>
                            <h2>Preço: {aula.price}</h2>
                        </div>
                    )
                })}
            </div>
         );
    }
}
 
export default ResultadosBusca;