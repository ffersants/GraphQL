import {ValidationError} from 'apollo-server-errors'

export const createPostFn = async(postData, datasource) => {
    const {title, body, userId} = postData
    if(!title || !body || !userId) throw new ValidationError('Title, body and userId are required')
    
    const post = await createPostInfo(postData, datasource)
    return await datasource.post('', {...post})
}

export const updatePostFn = async(postData, postId, datasource) => {
    if(!postId) throw new ValidationError('PostId is required')

    const {title, body, userId} = postData    
    if(!title || !body || !userId) throw new ValidationError('Title, body and userId are required')
    
    return await datasource.patch(postId, {...postData})
}

const userExists = async(userId, datasource) => {
    try{
        await datasource.context.dataSources.usersApi.get('/' + userId)
    }
    catch(e){
        throw new ValidationError(`User with id ${userId} doesn't exist`)
    }
}

const createPostInfo = async (postData, datasource) => {
    const {title, body, userId} = postData

    await userExists(userId, datasource)

    const lastIndexRef = await datasource.get('', {
        _limit: 1,
        _order: 'indexRef',
        _sort: 'desc'
    })

    const indexRef = lastIndexRef[0].indexRef + 1

    return {
        title,
        body,
        userId,
        indexRef,
        createAt: new Date().toISOString()
    }
}

