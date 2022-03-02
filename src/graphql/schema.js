import { gql } from "apollo-server-core";
import { postResolvers } from "./post/resolvers";
import { postTypeDefs } from "./post/typedefs";
import { userResolvers } from "./user/resolvers";
import { userTypeDefs } from "./user/typedefs";
import {apiFiltersTypeDefs} from "./api-filters/typedefs";

const rootTypesDefs = gql`
    type Query {
        hi: String
    }
`

const rootResolvers = {
    Query: {
        hi: () => 'Hello World'
    }
}

export const typeDefs = [rootTypesDefs, userTypeDefs, postTypeDefs, apiFiltersTypeDefs]
export const resolvers = [rootResolvers, userResolvers, postResolvers]