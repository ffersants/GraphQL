import { ApolloServer, gql } from 'apollo-server'

const server = new ApolloServer({
    typeDefs: gql`
        type Query {
            hello: String
        }`,
        resolvers: {
            Query: {
                hello: () => {
                    return 'Hello world!';
                }
            }
        }
})

const port = 7000

server.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})