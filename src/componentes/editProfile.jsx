import axios from 'axios';
import React, { Component } from 'react';

class EditProfile extends Component {
    
    constructor (props){
        super(props);
        this.dados = JSON.parse(sessionStorage.getItem("user"));
        this.state = {
            botao: "Enviar"
        }
    }

    async _HandleForm(evento){
        evento.preventDefault();
        evento.stopPropagation();
        this.setState({botao: "Enviando..."});
        await axios.put(
            "https://afternoon-ridge-91819.herokuapp.com/api/v0/users/"+this.dados.id,
            {
                body: this.dados.basicInfo
            }
        ).then( res => {
            if(res.data.status === 200){
                console.log(res.data.desciption);
                sessionStorage.setItem("user", JSON.stringify(this.dados));
                this.props.history.push("/perfil");
            } else {
                console.error(res.data);
            }
        });
    }

    _HandleName(evento){
        evento.stopPropagation();
        switch(evento.target.id){
            case "nome":
                this.dados.basicInfo.name = evento.target.value;
                break;
            case "email":
                this.dados.basicInfo.email = evento.target.value;
                break;
            case "phone":
                this.dados.basicInfo.phone = evento.target.value;
                break;
            case "username":
                this.dados.basicInfo.username = evento.target.value;
                break;
            default:
                break;
        }
        
    }

    render() { 
        console.log(this.dados);
        return ( 
            <div className="container-form">
                <form onSubmit={this._HandleForm.bind(this)}>
                    <fieldset className="inputCampo">
                        <label>Nome</label>
                        <input id="nome" type="text" defaultValue={this.dados.basicInfo.name} onChange={this._HandleName.bind(this)} />
                    </fieldset>
                    <fieldset className="inputCampo">
                        <label>Email</label>
                        <input id="email" type="email" defaultValue={this.dados.basicInfo.email} onChange={this._HandleName.bind(this)} />
                    </fieldset>
                    <fieldset className="inputCampo">
                        <label>Telefone</label>
                        <input id="phone" type="text" defaultValue={this.dados.basicInfo.phone} onChange={this._HandleName.bind(this)} />
                    </fieldset>
                    <fieldset className="inputCampo">
                        <label>Foto</label>
                        <input id="username"t type="text" defaultValue={this.dados.basicInfo.profileImg} onChange={this._HandleName.bind(this)} />
                    </fieldset>
                    <input type="submit" value={this.state.botao} />
                </form>
            </div>
            
         );
    }
}
 
export default EditProfile;