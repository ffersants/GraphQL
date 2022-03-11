//QUERY RESOLVERS
const user = async (parent, {id}, {dataSources}, info) => {
    const users = await dataSources.usersApi.getUser(id)
    return users
}

const users = async (parent, resolverArguments, {dataSources}) => {
    const users = await dataSources.usersApi.getUsers()
    return users
}

//MUTATION RESOLVERS
const createUser = async(parent, {data}, {dataSources}) => {
    return await dataSources.usersApi.createUser(data)
}

const deleteUser = async(parent, {userId}, {dataSources}) => {
    return await dataSources.usersApi.deleteUser(userId)
}

async function userByName(parent, {firstName}, {dataSources}) {
    const users = await dataSources.usersApi.getUsersByParams(`?firstName=${firstName}`)
    return users
}

//TRIVIAL RESOLVERS
const fullName = (parent, resolverArguments, context, info) => {
    const {firstName, lastName} = parent
    return `${firstName} ${lastName}`;
}

const posts = async ({id}, resolverArgs, {dataSources}) => {
    const userPosts = await dataSources.postsApi.dataloader.load(id)
    return userPosts
}

export const userResolvers = {
    Query: {
        user,
        users,
        userByName
    },
    Mutation: {
        createUser,
        deleteUser
    },
    User: {
        fullName,
        posts
    }
}