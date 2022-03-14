import { SQLDataSource  } from "datasource-sql";
import {createPostFn, updatePostFn} from './utils/helpers'
export class PostsApi extends SQLDataSource{

    async getPosts(fields = '*', postsId){
        return this.knex
            .select(...fields)
            .from('posts')
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