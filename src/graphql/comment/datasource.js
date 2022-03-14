import {SQLDataSource} from 'datasource-sql'
import {pubSub} from './resolvers'
export class CommentsApi extends SQLDataSource {
    getComments(postId){
        console.log(postId)
        return this.knex
            .select('*')
            .from('comments')
            .where('postId', postId)
    }

    createComment(commentData){
        const comment = this.knex('comments').insert({...commentData});
        
        pubSub.publish('COMMENT_TRIGGER')
        
        return comment
    }
}