import React, { Component } from 'react';

class EditProfile extends Component {
    
    constructor (props){
        super(props);
        this.dados = this.props.estado.userDados.basicInfo;
    }

    _HandleForm(evento){
        evento.preventDefault();
        evento.stopPropagation();
        this.props.editaPerfil(this.dados);
        this.props.history.push("/perfil");
        console.log(this.props);
    }

    _HandleName(evento){
        evento.stopPropagation();
        switch(evento.target.id){
            case "nome":
                this.dados.name = evento.target.value;
                break;
            case "email":
                this.dados.email = evento.target.value;
                break;
            case "phone":
                this.dados.phone = evento.target.value;
                break;
            case "username":
                this.dados.username = evento.target.value;
                break;
            default:
                break;
        }
        
    }

    render() { 
        console.log(this.dados);
        return ( 
            <div className="edit">
                <form onSubmit={this._HandleForm.bind(this)}>
                    <fieldset className="inputCampo">
                        <label>Nome</label>
                        <input id="nome" type="text" defaultValue={this.dados.name} onChange={this._HandleName.bind(this)} />
                    </fieldset>
                    <fieldset className="inputCampo">
                        <label>Email</label>
                        <input id="email" type="email" defaultValue={this.dados.email} onChange={this._HandleName.bind(this)} />
                    </fieldset>
                    <fieldset className="inputCampo">
                        <label>Telefone</label>
                        <input id="phone" type="text" defaultValue={this.dados.phone} onChange={this._HandleName.bind(this)} />
                    </fieldset>
                    <fieldset className="inputCampo">
                        <label>Usuário</label>
                        <input id="username"t type="text" defaultValue={this.dados.username} onChange={this._HandleName.bind(this)} />
                    </fieldset>
                    <input type="submit" value="Modificar" />
                </form>
            </div>
            
         );
    }
}
 
export default EditProfile;