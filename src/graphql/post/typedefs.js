import { gql } from "apollo-server-core";

export const postTypeDefs = gql`
    extend type Query {
        post(id: ID): Post
        posts: [Post]
        postsPagination(filters: ApiFilters): [Post]!
    }
    type Post {
        id: ID!
        title: String!
        body: String!
        #user:User!
        indexRef: Int!
        createdAt: String!
        daysFromCreation: Int!
    }
`
 