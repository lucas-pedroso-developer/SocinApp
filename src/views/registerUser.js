import React from 'react'

import Card from '../components/card'
import FormGroup from '../components/form-group'

import { withRouter } from 'react-router-dom'
import UserService from './app/service/userService'
import  { successMessage, errorMessage } from '../components/toastr'

import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';

class RegisterUser extends React.Component {

    state = {
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        age: '',
        job: ''
    }
    

    constructor() {
        super();
        this.service = new UserService();
    }

    componentDidMount() {				
		const params = this.props.match.params	
		const loggedUserString = localStorage.getItem('_logged_user');
        const loggedUser = JSON.parse(loggedUserString)
        console.log(loggedUser['id'])
		if(params.id) {								
            this.getUserById()
		}
    }
    
    openConfirm = (user) => {
		this.setState({showConfirmDialog: true})
	}

	cancelDelete = () => {
		this.setState({showConfirmDialog: false})	
	}


    validate() {
        const messages = []

        if(!this.state.name) {
            messages.push('O campo nome é obrigatório!')
        }  
        
        if(!this.state.email) {
            messages.push('O campo email é obrigatório!')
        } else if(!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            messages.push('Email inválido!')
        }
        
        if(!this.state.age) {
            messages.push('O campo idade é obrigatório!')
        }
        
        if(!this.state.job) {
            messages.push('O campo profissão é obrigatório!')
        } 
        
        if(!this.state.password) {
            messages.push('O campo senha é obrigatório!')
        } else if(!this.state.passwordConfirm) {
            messages.push('O campo confirmação de senha é obrigatório!')
        } else if(this.state.password !== this.state.passwordConfirm) {
            messages.push('A senha e a confirmação de senhadevem ser iguais!')
        }

        return messages;
    }

    register = () => {
        const messages = this.validate();
        if(messages && messages.length > 0) {
            messages.forEach((message, index) => {
                errorMessage(message)
            });
            return false;
        }
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            age: this.state.age,
            job: this.state.job
        }
        console.log(user)
        const params = this.props.match.params	
        if(params.id) {	
            this.service
                    .update(params.id, user)
                    .then(response => {	
                        successMessage('Usuário atualizado com sucesso!')				                        
                    }).catch(error => {
                        console.log(error.response)
                        //errorMessage(error.response.data)                
                    })
        } else {
            this.service.save(user)
                .then( response => {
                    successMessage('Usuário cadastrado com sucesso!')
                    this.props.history.push('/login')
                }).catch(error => {
                    errorMessage(error.response.data)                
                })
        }
    }

    getUserById = () => {
        const loggedUserString = localStorage.getItem('_logged_user');
        const loggedUser = JSON.parse(loggedUserString)
        console.log(loggedUser['id'])
        this.service.getUserById(loggedUser['id'])
            .then( response => {           
                console.log('aqui esta setando')     
                //this.setState({...response.data})		
                console.log(response.data.name)
                this.setState({name: response.data.name})
                this.setState({email: response.data.email})
                this.setState({job: response.data.job})
            }).catch(error => {
                errorMessage(error.response.data)                
            })
    }

    delete = () => {
        console.log('agora esta deletando')
        const loggedUserString = localStorage.getItem('_logged_user');
        const loggedUser = JSON.parse(loggedUserString)        
        this.service.delete(loggedUser['id'])
            .then( response => {  
                console.log('esta aquiiiii deleteeeeee')                         
                successMessage('Usuário deletado com sucesso')
                //this.props.history.push('/login')
            }).catch(error => {
                console.log(error.response.data)
                errorMessage(error.response.data)                
            })
    }
    
    cancel = () => {
        this.props.history.push('/login')
    }

    render() {
        const confirmDialogFooter = (
		    <div>
		        <Button label="Confirma" icon="pi pi-check" onClick={this.delete} />
		        <Button label="Cancela" icon="pi pi-times" onClick={this.cancelDelete} />
		    </div>
		)
        return (            
                <Card title="Cadastro de usuário">                    
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">                                
                                <FormGroup label="Nome: *" htmlFor="inputName">
                                    <input type="text"
                                        id="inputName"
                                        className="form-control"
                                        name="name"
                                        value={this.state.name}
                                        onChange={e => this.setState({name: e.target.value})} />
                                </FormGroup>                           
                                <FormGroup label="Email: *" htmlFor="inputEmail">
                                    <input type="email"
                                        id="inputEmail"
                                        className="form-control"
                                        name="email"
                                        value={this.state.email}
                                        onChange={e => this.setState({email: e.target.value})} />
                                </FormGroup>
                                <FormGroup label="Idade: *" htmlFor="inputAge">
                                    <input type="text"
                                        id="inputAge"
                                        className="form-control"
                                        name="age"
                                        value={this.state.age}														
										onChange={e => this.setState({age: e.target.value})} />
                                </FormGroup>                           
                                <FormGroup label="Profissão: *" htmlFor="inputJob">
                                    <input type="text"
                                        id="inputJob"
                                        className="form-control"
                                        name="job"
                                        value={this.state.job}
                                        onChange={e => this.setState({job: e.target.value})} />
                                </FormGroup>
                                <FormGroup label="Senha: *" htmlFor="inputPassword">
                                    <input type="password"
                                        id="inputPassword"
                                        className="form-control"
                                        name="password"
                                        value={this.state.password}
                                        onChange={e => this.setState({password: e.target.value})} />
                                </FormGroup>
                                <FormGroup label="Confirmação de Senha: *" htmlFor="inputPasswordConfirmation">
                                    <input type="password"
                                        id="inputPasswordConfirmation"
                                        className="form-control"
                                        name="passwordConfirmation"                                        
                                        onChange={e => this.setState({passwordConfirm: e.target.value})} />
                                </FormGroup>
                                <button onClick={this.register} type="button" className="btn btn-success">Salvar</button>
                                <button onClick={this.cancel} type="button" className="btn btn-danger">Cancelar</button>
                                <button onClick={this.openConfirm} type="button" className="btn btn-danger">Deletar</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Dialog header="Confirmação" visible={this.state.showConfirmDialog} style={{width: '50vw'}} modal={true} 
                                footer={confirmDialogFooter}
                                onHide={() => this.setState({visible: false})}>
                            Confirma a exclusão deste Usuário?
                        </Dialog>

                    </div>
                </Card>
            
            
        )
    }

}

export default withRouter(RegisterUser)