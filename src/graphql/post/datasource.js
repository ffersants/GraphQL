import { RESTDataSource } from "apollo-datasource-rest";
import {makePostDataLoader} from './dataloaders'
import {createPostFn, updatePostFn} from './utils/helpers'
export class PostsApi extends RESTDataSource{
    constructor(){
        super();
        this.baseURL = process.env.API_URL + '/posts/'
        this.dataloader = makePostDataLoader(this.getPosts.bind(this))
    }

    async getPosts(urlParams){
        return this.get(this.baseURL, urlParams, {
            cacheOptions: {
                ttl: 15
            }
        })
    }

    async createPost(postData){
        const i = await createPostFn(postData, this)
        console.log(i)
        return i
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