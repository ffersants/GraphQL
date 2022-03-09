import DataLoader from "dataloader";

export const makePostDataLoader = (getPosts) => {
    return new DataLoader(async(usersId) => {
        const usersIdQueryUrl = usersId.join('&userId=')
        const url ='?userId=' + usersIdQueryUrl
        const posts = await getPosts(url)
        return usersId.map(user => posts.filter(post => post.userId === user))
    })
}