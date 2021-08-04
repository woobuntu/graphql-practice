import createComment from "./createComment";
import deleteComment from "./deleteComment";
import updateComment from "./updateComment";

const mutationResolversAboutComments = {
  createComment,
  deleteComment,
  updateComment,
};

export default mutationResolversAboutComments;
