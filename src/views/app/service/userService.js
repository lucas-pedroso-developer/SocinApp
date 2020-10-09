import ApiService from '../apiservice'
class UserService extends ApiService {
    constructor() {
        super('/api/users')
    }

    authenticate(credenciais) {        
        return this.post('/authenticate', credenciais)
    }

    save(user) {
        return this.post('/', user);
    }

    getUserById(id) {
		return this.get(`/${id}`);
	}

    update(id, user) {
		return this.put(`/${id}`, user);
	}

    delete(id) {
        console.log('aqui service')
        console.log(id)
        console.log('aqui service')
		return this.delete(`/${id}`);
    }
    
}

export default UserService;