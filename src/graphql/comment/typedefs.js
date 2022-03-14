import { gql } from "apollo-server-core";

export const commentTypeDefs = gql`
    extend type Query {
        getComments(postId: ID!): [Comment]!
    }

    extend type Mutation {
        createComment(commentData: CommentInput): Boolean
    }

    type Comment {
        comment: String!
        author: ID!
    }

    input CommentInput {
        comment: String!
        authorId: ID!
        postId: ID!
    }
`