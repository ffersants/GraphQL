import { SQLDataSource  } from "datasource-sql";
import {makeUserDataLoader} from './dataloaders'
import {createUserFn} from './utils/helper'
export class UsersApi extends SQLDataSource{

    constructor(knexConfig){
        super(knexConfig)
        this.dataloader = makeUserDataLoader(this.getUser.bind(this))
    }

    getUsers(){
        return this.knex('')
    }

    createUser(userData){
        return this.knex('users')
            .insert({...userData})
    }

    async deleteUser(userId){
            return this.knex('users')
                .where(userId)
                .delete()
    }

    async getUser(userId){
        console.log(userId)
         return this.knex('users')
            .select('*')
            .whereIn('id', userId)
    }

    getUsersByParams(params = ''){
        return this.get(params, undefined, {
            cacheOptions: {
                ttl: 15
            }            
        })
    }
}