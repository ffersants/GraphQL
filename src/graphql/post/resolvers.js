const post = () => {
    return {
        id: 2,
        title: 'This is a post title'
    }
}

export const postResolvers = {
    Query: {
        post
    }
} 