
export const getUsers = (fetch) => (path = '/') => {
    console.log(path)
    console.log(process.env.API_URL + '/users' + path)
    return fetch(process.env.API_URL + '/users' + path)
 }