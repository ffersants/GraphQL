import { gql } from "apollo-server-core";

export const commentTypeDefs = gql`
    extend type Query {
        getComments(postId: ID!): [Comment]!
    }

    extend type Mutation {
        createComment(commentData: CommentInput): Boolean
    }

    type Subscription {
        onComment: Comment!
    }

    type Comment {
        comment: String!
        authorId: ID!
    }

    input CommentInput {
        comment: String!
        authorId: ID!
        postId: ID!
    }
`