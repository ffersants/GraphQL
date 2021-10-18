import fetch from 'node-fetch'

const user = async (parent, {id}, {getUsers}, info) => {
    const user = await getUsers(`/${id}`)
    return user.json()
}

const users = async (parent, resolverArguments, {getUsers}) => {
   const users = await getUsers()
   return users.json()
}

export const userResolvers = {
    Query: {
        user,
        users
    }
}