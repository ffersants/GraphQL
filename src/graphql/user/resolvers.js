import fetch from 'node-fetch'

const user = async (parent, args, context, info) => {
    console.log(args)
    const user = await fetch(`http://localhost:3000/users/${id}`)
    return user.json()
}

const users = async (parent, resolverArguments) => {
   const users = await fetch('http://localhost:3000/users')
   return users.json()
}

export const userResolvers = {
    Query: {
        user,
        users
    }
}