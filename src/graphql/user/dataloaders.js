import DataLoader from "dataloader"

export const makeUserDataLoader = (getUser) => {
    return new DataLoader(async(ids) => {
        return getUser(ids)
    })
}

