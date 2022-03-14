import {SQLDataSource} from 'datasource-sql'

export class CommentsApi extends SQLDataSource {
    getComments(postId){
        console.log(postId)
        return this.knex
            .select('*')
            .from('comments')
            .where('postId', postId)
    }

    createComment(commentData){
        console.log(commentData)

        return this.knex('comments')
            .insert({...commentData})
    }
}