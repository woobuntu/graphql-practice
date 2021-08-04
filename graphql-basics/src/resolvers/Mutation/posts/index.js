import createPost from "./createPost";
import deletePost from "./deletePost";
import updatePost from "./updatePost";

const mutationResolversAboutPosts = {
  createPost,
  deletePost,
  updatePost,
};

export default mutationResolversAboutPosts;
