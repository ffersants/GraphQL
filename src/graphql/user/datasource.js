import { SQLDataSource  } from "datasource-sql";
import {makeUserDataLoader} from './dataloaders'
import {createUserFn} from './utils/helper'
export class UsersApi extends SQLDataSource{
    getUsers(){
        return this.get('')
    }

    createUser(userData){
        return this.knex('users')
            .insert({...userData})
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