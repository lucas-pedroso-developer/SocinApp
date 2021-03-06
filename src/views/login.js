import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'

import UserService from './app/service/userService'
//import LocalStorageService from '../app/service/localstorageService'
import { errorMessage } from '../components/toastr'

class Login extends React.Component {

    state = {
        email: '',
        password: ''
    }

    constructor() {
        super();
        this.service = new UserService();
    }

    enter = () => {
        
        this.service.authenticate({
            email: this.state.email,
            password: this.state.password
        }).then(response => {
            localStorage.setItem('_logged_user', JSON.stringify(response.data));
            this.props.history.push('/home');
        }).catch(error => {                  
            errorMessage(error.response.data)
        })
        
    }



    prepareRegister = () => {
        this.props.history.push('register-users')
    }

    render() {
        return (
            
            <div className="row">
                <div className="col-md-6" style={ {position: 'relative', left: '300px'} }>
                    <Card title="Login">
                        <div className="row">
                            <span>{this.state.errorMessage}</span>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="bs-component">
                                    <fieldset>
                                        <FormGroup Label="Email: *" htmlFor="exampleInputEmail1">
                                            <input type="email" 
                                                    onChange={e => this.setState({email: e.target.value})}
                                                    className="form-control" 
                                                    id="exampleInputEmail1" 
                                                    aria-describedby="emailHelp" 
                                                    placeholder="Digite o Email" />
                                        </FormGroup>
                                        <FormGroup Label="Senha: *" htmlFor="exampleInputPassword1">
                                            <input type="password"
                                                onChange={e => this.setState({password: e.target.value})}
                                                className="form-control"        
                                                id="exampleInputPassword1"
                                                placeholder="Password" />
                                        </FormGroup>
                                        <button onClick={this.enter} className="btn btn-success">Entrar</button>
                                        <button onClick={this.prepareRegister} className="btn btn-danger">Cadastrar</button>                                            
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            
        )
    }
}

export default withRouter(Login)