import DataLoader from "dataloader"
import fetch from 'node-fetch'

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

const posts = async (parent, __, {getPosts}) => {
    const posts = await getPosts()
    const toReturn = posts.json()
    return toReturn
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

const userDataLoader = new DataLoader(async(ids) => {
    //2ª após as várias chamadas, esse método é executado uma vez, onde
    //ids é um array sem duplicação composto pelos valores recebidos via parâmetro na primeira etapa
    console.log('ids =>', ids)
    const idsConcatenated = ids.join('&id=')
    const url = 'http://localhost:3000/users/?id=' + idsConcatenated
    const result = await fetch(url)
    const allUsers = await result.json()
    
    // é retornado uma lista com os usários que têm seu id presente na lista de ids
    const toReturn = ids.map(id => allUsers.find(user => user.id === id))
    console.log('toReturn => ', toReturn)
    return toReturn
})

const user = async ({userId}, parent, {getUsers}) => {
    //1ª esse log e achamada do dataloader é realizado pra cada post, na resolução do campo user
    console.log('o userId passado pro dataloader eh', userId)
    const postAuthor = await userDataLoader.load(userId)
    
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