import Query from "./Query";
import Mutation from "./Mutation";
import Subscription from "./Subscription";
import User from "./User";
import Post from "./Post";
import Comment from "./Comment";

const resolver = {
  Query,
  Mutation,
  Subscription,
  User,
  Post,
  Comment,
};

export { resolver as default };
