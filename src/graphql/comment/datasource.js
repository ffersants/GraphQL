import {SQLDataSource} from 'datasource-sql'
import {pubsub} from '../pubsub'

export class CommentsApi extends SQLDataSource {
    getComments(postId){
        return this.knex
            .select('*')
            .from('comments')
            .where('postId', postId)
    }

    createComment(commentData){
        const comment = this.knex('comments').insert({...commentData});
        
        pubsub.publish(['COMMENT_TRIGGER'], {
            onComment: commentData
        })
        
        return comment
    }
}