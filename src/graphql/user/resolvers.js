import fetch from 'node-fetch'

const user = async (parent, {id}, {getUsers}, info) => {
    const user = await getUsers(`/${id}`)
    return user.json()
}

const users = async (parent, resolverArguments, {getUsers}) => {
    const users = await getUsers('/')
   return users.json()
}

async function userByName(parent, {firstName}, {userDataLoader}) {
    const user = await getUsers(`?firstName=${firstName}`)
    return user.json();
}

const fullName = (parent, resolverArguments, context, info) => {
    const {firstName, lastName} = parent
    return `${firstName} ${lastName}`;
}

const posts = async ({id}, resolverArgs, {postDataLoader}) => {
    const userPosts = await postDataLoader.load(id)
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