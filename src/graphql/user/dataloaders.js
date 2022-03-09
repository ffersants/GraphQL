import DataLoader from "dataloader"

export const makeUserDataLoader = (getUsers) => {
    return new DataLoader(async(ids) => {
        const idsConcatenated = ids.join('&id=')
        const users = await getUsers('?id='+idsConcatenated)
        const toReturn = ids.map(id => users.find(user => user.id === id))
        return toReturn
    })
}

