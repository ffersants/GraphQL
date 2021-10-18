const post = async (_, {id}, {getPosts}) => {
    const post = await getPosts(`/${id}`)
    console.log(id)
    return post.json()
}

const posts = async (_, {id}, {getPosts}) => {
    const posts = await getPosts()
    return posts.json()
}

export const postResolvers = {
    Query: {
        post,
        posts
    }
} 