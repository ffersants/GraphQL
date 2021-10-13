const { ApolloServer } = require("apollo-server-express");

const server = new ApolloServer({
    typeDefs: gql`

    type Query {
            libraries: Library
            # A library has a branch and books
            type Library {
              branch: String!
              books: [Book!]
            }
            
            # A book has a title and author
            type Book {
              title: String!
              author: Author!
            }
            
            # An author has a name
            type Author {
              name: String!
            }
            
            type Query {
              libraries: [Library]
            }
        }

    `,
    resolvers: {
        Query: {
            library: () => {
                return {

                }
            }
        }
    }
})

const port = 123

server.listen(port, () => {
    console.log('Server running on port ' + port)
})