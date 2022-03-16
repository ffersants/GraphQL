import { pubsub } from "../pubsub";

const getComments = async (parent, { postId }, { dataSources }, info) => {
  return await dataSources.commentsApi.getComments(postId);
};

const createComment = async (
  parent,
  { commentData },
  { dataSources },
  info
) => {
  return await dataSources.commentsApi.createComment(commentData);
};

const author = async (post, _, { dataSources }) => {
  console.log(post.authorId)
  return await dataSources.usersApi.dataloader.load(post.authorId);
};

export const commentResolvers = {
  Query: {
    getComments,
  },
  Comment: {
    author,
  },
  Mutation: {
    createComment,
  },
  Subscription: {
    onComment: {
      subscribe: () => pubsub.asyncIterator("COMMENT_TRIGGER"),
    },
  },
};
