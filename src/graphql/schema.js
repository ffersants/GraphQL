import { gql } from "apollo-server-core";

import { postResolvers } from "./post/resolvers";
import { userResolvers } from "./user/resolvers";
import {apiFitlerResolvers} from "./api-filters/resolvers";
import { commentResolvers } from "./comment/resolvers";

import { postTypeDefs } from "./post/typedefs";
import { userTypeDefs } from "./user/typedefs";
import { commentTypeDefs } from "./comment/typedefs";
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

export const typeDefs = [rootTypesDefs, userTypeDefs, postTypeDefs, apiFiltersTypeDefs, commentTypeDefs]
export const resolvers = [rootResolvers, userResolvers, postResolvers, apiFitlerResolvers, commentResolvers]