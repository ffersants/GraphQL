import { gql } from "apollo-server-core";

export const postTypeDefs = gql`
    extend type Query {
        post: Post
    }
    type Post {
        id: Int
        title: String
    }
`
 