import { RESTDataSource } from "apollo-datasource-rest";
import {makePostDataLoader} from './dataloaders'
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