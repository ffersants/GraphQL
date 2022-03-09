import fetch from 'node-fetch'

const user = async (parent, {id}, {dataSources}, info) => {
    const users = await dataSources.usersApi.getUser(id)
    return users
}

const users = async (parent, resolverArguments, {dataSources}) => {
    const users = await dataSources.usersApi.getUsers()
    return users
}

async function userByName(parent, {firstName}, {dataSources}) {
    const users = await dataSources.usersApi.getUsersByParams(`?firstName=${firstName}`)
    return users
}

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
    User: {
        fullName,
        posts
    }
}