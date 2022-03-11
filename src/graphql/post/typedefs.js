import { gql } from "apollo-server-core";

export const postTypeDefs = gql`
    type Query {
        post(id: ID): QueryResult
        posts: [Post]
        postsPagination(filters: ApiFilters): [Post]!
    }

    type Mutation {
        createPost(postData: dataToCreatePost): Post!
        updatePost(postData: dataToCreatePost!, postId: ID!): Post!
        deletePost(postId: ID!): Boolean
    }

    union QueryResult = QueryWarning | Post | QueryTimeOut 

    interface ErrosAndWarnings {
        message: String!
        statusCode: Int!
    }

    type QueryWarning implements ErrosAndWarnings{
        message: String!
        statusCode: Int!
    }

    type QueryTimeOut implements ErrosAndWarnings{
        message: String!
        statusCode: Int!
        postId: Int!
    }

    input dataToCreatePost {
        title: String!
        body: String!
        userId: Int!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        user:User!
        indexRef: Int!
        createdAt: String!
        daysFromCreation: Int!
    }
`
 