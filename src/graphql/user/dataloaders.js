import DataLoader from "dataloader"
import fetch from 'node-fetch'

export const makeUserDataLoader = (getUsers) => {
    return new DataLoader(async(ids) => {
        //2ª após as várias chamadas, esse método é executado uma vez, onde
        //ids é um array sem duplicação composto pelos valores recebidos via parâmetro na primeira etapa

        const idsConcatenated = ids.join('&id=')
        const users = await getUsers('?id='+idsConcatenated)
        const allUsers = await users.json()
        console.log(allUsers, 'allUsers')
        // é retornado uma lista com os usários que têm seu id presente na lista de ids
        const toReturn = ids.map(id => allUsers.find(user => user.id === id))
        console.log('toReturn => ', toReturn)
        return toReturn
    })
}

