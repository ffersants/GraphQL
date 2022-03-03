const post = async (_, {id}, {getPosts}) => {
    //execução do resolver para tipo union passa primeiro aqui
    const result = await getPosts(`/${id}`)
    const post = await result.json()

    if(Math.random() > Math.random()){
        return {
            statusCode: 404,
            message: "Connection timeout",
            postId: id
        }
    }

    if(typeof post.id === "undefined") {
        return {
            statusCode: 404,
            message: "Couldn't find post"
        }
    }

    return post
}

const posts = async (_, __, {getPosts}) => {
    const posts = await getPosts()
    return posts.json()
}

const postsPagination = async (parent, {filters}, {getPosts}, info) => {
    const urlQuery = new URLSearchParams(filters)
    const posts = await getPosts('/?' + urlQuery)
    return posts.json()
}

const daysFromCreation = (arg1) => {
    const {createdAt} = arg1
    const postDate = new Date(createdAt)
    const today = new Date()

    const differenceBetweenDays = Math.abs(today - postDate)

    const diffInDays = Math.ceil(differenceBetweenDays / (1000*60*60*24));

    return diffInDays
}

export const postResolvers = {
    Query: {
        post,
        posts,
        postsPagination
    },
    Post: {
        daysFromCreation
    }, 
    QueryResult: {
        __resolveType: (obj) => {
            //depois de ter executada a função resolver post(id), é executado essa função
            if(typeof obj.statusCode !== "undefined") return 'QueryWarning'
            if(typeof obj.postId !== "undefined") return 'QueryTimeOut'
            if(typeof obj.id !== "undefined") return 'Post'
            return null
        }
    },
    ErrosAndWarnings: {
        __resolveType: (obj) => {
            if(typeof obj.statusCode !== "undefined") return 'QueryWarning'
            if(typeof obj.postId !== "undefined") return 'QueryTimeOut'
            return null
        }
    }
} 