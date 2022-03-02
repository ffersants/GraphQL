import { gql } from "apollo-server-core";

export const userTypeDefs = gql`
    extend type Query{
        user(id: ID!): User!
        userByName(firstName: String!): [User!]!
        users: [User!]!
    }
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        userName: String!
        indexRef: Int!
        createdAt: String!
        fullName: String!
    }   
`