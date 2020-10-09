import React from 'react'
import Card from '../components/card'
import GitHubUsersService from './app/service/gitHubUsersService'
import GitHubUsersTable from '../components/gitHubUsersTable'
import { errorMessage } from '../components/toastr'

class Home extends React.Component {

    firstListId = 0;
    lastListId = 0;

    state =  {
        gitHubUsers: []        
    }

    constructor() {
        super();
        this.service = new GitHubUsersService();
    }

    componentDidMount() {        
        const loggedUserString = localStorage.getItem('_logged_user');
        const loggedUser = JSON.parse(loggedUserString)
        this.getUsers(0);        
    }
    
    getUsers = (id) => {
        this.service.getUsers(id).then(response => {            
            const list = response.data														
                if(list.length < 1) {
                    errorMessage.mensagemAlert("Nenhum resultado encontrado.")                    
                }                                
                this.setState({gitHubUsers: list})   
                this.firstListId = list[0].id
                this.lastListId = list[list.length - 1].id                
        }).catch(error => {                  
            this.setState({errorMessage: error.response.data});            
        })
    }

    next = () => {
        this.getUsers(this.lastListId);
    }

    back = () => {
        this.getUsers(this.firstListId);
    }

    render() {
        return (
            <Card title="Consulta de Usuários do Github">
				<div className="row">
					<div className="col-md-12">
						<div className="bs-component">
							<GitHubUsersTable gitHubUsers={this.state.gitHubUsers} />
						</div>
                        <button onClick={this.back} className="btn btn-success">Anterior</button>
                        <button onClick={this.next} className="btn btn-success">Próximo</button>
					</div>
				</div>
            </Card>
        )
    }
}

export default Home