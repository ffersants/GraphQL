import {pubsub} from '../pubsub'

const getComments = async (parent, {postId}, {dataSources}, info) => {
    return await dataSources.commentsApi.getComments(postId)
}

const createComment = async (parent, {commentData}, {dataSources}, info) => {
    return await dataSources.commentsApi.createComment(commentData)
}

export const commentResolvers = {
    Query: {
        getComments
    },
    Mutation: {
        createComment
    },
    Subscription: {
        onComment: {
            subscribe: () => pubsub.asyncIterator('COMMENT_TRIGGER')
        }
    }
}