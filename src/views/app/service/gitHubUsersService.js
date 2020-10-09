import ApiService from '../apiservice'

class GitHubUsersService extends ApiService {
    constructor() {
        super('/api/')
    }
    
    getUsers(page) {        
        console.log('AQUIIIIIII')
        console.log(page)
        console.log('github-users/' + page)
        return this.get('github-users/' + page)
    }

}

export default GitHubUsersService;