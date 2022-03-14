import { gql } from "apollo-server-express";

export const apiFiltersTypeDefs = gql`
    input ApiFilters {
        _sort: String
        _order: ApiOrderFilter
        _start: Int
        _limit: Int
    } 
    enum ApiOrderFilter {
        ASC,
        DESC
    }
`