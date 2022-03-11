import { gql } from "apollo-server-core";

export const userTypeDefs = gql`
    extend type Query{
        user(id: ID!): User!
        userByName(firstName: String!): [User!]!
        users: [User!]!
    }

    type Mutation {
        createUser(data: userData): User!
        deleteUser(userId: ID!): Boolean
    }

    input userData {
        userName: String!
        firstName: String!
        lastName: String!
    }

    type User {
        id: ID!
        firstName: String!
        lastName: String!
        userName: String!
        indexRef: Int!
        createdAt: String!
        fullName: String!
        posts: [Post!]!
    }   
`