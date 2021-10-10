const user = () => {
    return {
        id: 1,
        userName: 'Fernando'
    }
}

const users = () => {
    return [
        {
            id: 1,
            userName: 'Fernando'
        },
        {
            id: 3,
            userName: 'Ricardo'
        },
        {
            id: 5,
            userName: 'Amanda'
        }
    ]
}

export const userResolvers = {
    Query: {
        user,
        users
    }
}