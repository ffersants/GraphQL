import fetch from "node-fetch";
import { getUsers } from "./user/utils";
import {getPosts} from './post/utils'
import { makeUserDataLoader } from "./user/dataloaders";

export const context = () => {
  return {
    userDataLoader: makeUserDataLoader(getUsers(fetch)),
    getUsers: getUsers(fetch),
    getPosts: getPosts(fetch),
  };
};
