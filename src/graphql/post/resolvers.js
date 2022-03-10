//QUERY RESOLVERS
const post = async (_, {id}, {dataSources}) => {
    //execução do resolver para tipo union passa primeiro aqui
    const result = await dataSources.postsApi.getPost(`/${id}`)
    // if(Math.random() > Math.random()){
    //     return {
    //         statusCode: 404,
    //         message: "Connection timeout",
    //         postId: id
    //     }
    // }

    // if(typeof post.id === "undefined") {
    //     return {
    //         statusCode: 404,
    //         message: "Couldn't find post"
    //     }
    // }

    return result
}

const posts = async (parent, __, {dataSources}) => {
    const posts = await dataSources.postsApi.getPosts()
    return posts
}

const postsPagination = async (parent, {filters}, {dataSources}, info) => {
    const urlQuery = new URLSearchParams(filters)
    const posts = await dataSources.postsApi.getPosts('/?' + urlQuery)
    return posts
}

//MUTATION RESOLVERS
const createPost = async(parent, {postData}, {dataSources}) => {
    const i = await dataSources.postsApi.createPost(postData)
    return i
}

const updatePost = async(parent, {postData, postId}, {dataSources}) => {
    const i = await dataSources.postsApi.updatePost(postData, postId)
    return i
}

//TRIVIAL RESOLVERS
const daysFromCreation = (arg1) => {
    const {createdAt} = arg1
    const postDate = new Date(createdAt)
    const today = new Date()

    const differenceBetweenDays = Math.abs(today - postDate)
    const diffInDays = Math.ceil(differenceBetweenDays / (1000*60*60*24));

    return diffInDays
}

const user = async ({userId}, parent, {dataSources}) => {
    //1ª esse log e achamada do dataloader é realizado pra cada post, na resolução do campo user
    console.log('o userId passado pro dataloader eh', userId)
    const postAuthor = await dataSources.usersApi.dataloader.load(userId)
    
    //3ª de alguma maneira, aqui é lembrado o post que estava em resolução, e deste modo, o user
    //autor do post é atribuído à variável postAuthor
    console.log('o user do post eh', postAuthor)
    return postAuthor
}

export const postResolvers = {
    Query: {
        post,
        posts,
        postsPagination
    },
    Mutation: {
        createPost,
        updatePost
    },
    Post: {
        daysFromCreation,
        user
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