import DataLoader from "dataloader";

export const makePostDataLoader = (getPost) => {
    return new DataLoader(async(usersId) => {
        
        const usersIdQueryUrl = usersId.join('&userId=')
        const url ='?userId=' + usersIdQueryUrl
        
        const result = await getPost(url)
        const posts = await result.json()

        return usersId.map(user => posts.filter(post => post.userId === user))
    })
}