// import {PubSub} from 'apollo-server-express'

// export const pubSub = new PubSub()

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
    // Subscription: {
    //     onComment: {
    //         subscribe: () => pubSub.asyncIterator('COMMENT_TRIGGER')
    //     }
    // }
}