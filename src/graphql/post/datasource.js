import { RESTDataSource } from "apollo-datasource-rest";

export class PostsApi extends RESTDataSource{
    constructor(){
        super();
        this.baseURL = process.env.API_URL + '/posts/'
    }

    async getPosts(urlParams){
        return this.get('', urlParams)
    }
    async getPost(postId){
        return this.get(postId)
    }
}