import { SQLDataSource  } from "datasource-sql";
import {createPostFn, updatePostFn} from './utils/helpers'
export class PostsApi extends SQLDataSource{
    constructor(config) {
        super(config)
    }
    
    async getPosts(){
        try{
            return this.knex
            .select('*')
            .from('posts')
        }
        catch(e){
            console.log(e)
            console.log(typeof e)
        }
    }

    async createPost(postData){
        return this.knex('posts').insert({...postData})
    }

    async updatePost(postId){
        const i = await updatePostFn(postData, postId, this)
        return i
    }

    async deletePost(postId){
        console.log(postId)
        return await this.delete(postId)
    }

    async getPost(postId){
        return this.get(postId, undefined, {
            cacheOptions: {
                ttl: 15
            },
            headers: {
                'Authorization': 'Bearer '
            }
        })
    }
}