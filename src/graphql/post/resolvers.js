const post = async (_, {id}, {getPosts}) => {
    const post = await getPosts(`/${id}`)
    console.log(id)
    return post.json()
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
    }
} 