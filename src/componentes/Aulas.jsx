import React, { Component } from 'react';

class Aulas extends Component {
    
    constructor () {
        super();
        this.state = {
            aulas: [],
            fetch: false
        }
    }

    async ChamaAulas () {
        const resposta = await fetch("https://afternoon-ridge-91819.herokuapp.com/api/v0/classes");
        const aulasFetch = await resposta.json();
        if (!this.state.fetch){
            console.log("Fez um fetch");
            const novoEstado = {
                aulas: aulasFetch,
                fetch: true
            };
            this.setState(novoEstado);
        }
    }

    render() {
        this.ChamaAulas();
        console.log("Render dos resultados");
        return (
            <div className="buscaprincipal">
                <h1><strong> Aqui estão algumas de nossas aulas: </strong></h1>
                <div className="lista-cards">
                    {this.state.aulas.map( (aula, index) =>{
                        return(
                            <div className="card-aula" key={index}>
                                <h1> {aula.class} </h1>
                                <h2>Maximo de estudantes: {aula.maxStudents}</h2>
                                <h2>Preço: {aula.price}</h2>
                                <div className="dias-semana-card">
                                    {aula.dateClass.map( (dia, index) => {
                                        if(dia.hasClass){
                                            return(
                                                <section key={index}>
                                                    <h2> <strong>{dia.weekday}</strong> </h2>
                                                    <h3> {dia.startHour} - {dia.endHour}</h3>
                                                </section>
                                            )
                                        }
                                        return("")
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
         );
    }
}
 
export default Aulas;