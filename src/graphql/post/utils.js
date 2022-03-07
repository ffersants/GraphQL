export const getPosts = (fetch) => (path = "/") => {
    return fetch(`http://localhost:3000/posts${path}`);
};
