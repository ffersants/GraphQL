import {RESTDataSource} from 'apollo-datasource-rest'
import {makeUserDataLoader} from './dataloaders'
import {createUserFn} from './utils/helper'
export class UsersApi extends RESTDataSource{
    constructor(){
        super()
        this.baseURL = process.env.API_URL + '/users/'
        this.dataloader = makeUserDataLoader(this.getUsersByParams.bind(this))
    }

    getUsers(){
        return this.get('')
    }

    createUser(userData){
        return createUserFn(userData, this)
    }

    async deleteUser(userId){
            return this.delete(userId)
                .then(() => true)
                .catch(() => false)
    }

    getUser(userId){
        return this.get(userId)
    }

    getUsersByParams(params = ''){
        return this.get(params, undefined, {
            cacheOptions: {
                ttl: 15
            }            
        })
    }
}