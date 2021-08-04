import mutationResolversAboutUsers from "./users";
import mutationResolversAboutPosts from "./posts";
import mutationResolversAboutComments from "./comments";

const Mutation = {
  ...mutationResolversAboutUsers,
  ...mutationResolversAboutPosts,
  ...mutationResolversAboutComments,
};

export { Mutation as default };
