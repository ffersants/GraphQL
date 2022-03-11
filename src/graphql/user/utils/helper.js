import {ValidationError} from 'apollo-server-errors'

export const createUserFn = async(userData, datasource) => {
    const {firstName, lastName, userName} = userData
    if(!firstName || !lastName || !userName) throw new ValidationError('Firstname, lastName and userName are required')
    
    const user = await createUserInfo(userData, datasource)
    
    return await datasource.post('', {...user})
}

export const updateUserFn = async(userData, postId, datasource) => {
    const {firstName, lastName, userName} = userData
    if(!firstName || !lastName || !userName) throw new ValidationError('Firstname, lastName and userName are required')
    
    return await datasource.patch(postId, {...userData})
}

const userExists = async(userName, datasource) => {
        const userSearch = await datasource.context.dataSources.usersApi.get('/?userName=' + userName)
        if(userSearch) throw new ValidationError(`Username ${userName} is not available`)
}

const getLastIndexRefOrId = async (datasource, infoToGet) => {
    return await datasource.get('', {
        _limit: 1,
        _order: infoToGet,
        _sort: 'desc'
    })
}

const createUserInfo = async (userData, datasource) => {
    const {firstName, lastName, userName} = userData

    userExists(userName)

    const indexRef = (await getLastIndexRefOrId(datasource, 'indexRef'))[0].indexRef + 1
    const id = (await getLastIndexRefOrId(datasource, 'id'))[0].id + 1

    console.log(indexRef)
    console.log(id)

    return {
        firstName,
        lastName,
        userName,
        indexRef,
        id,
        createdAt: new Date().toISOString()
    }
}

