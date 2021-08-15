import prisma from "../../../prisma";

const main = async (parent, { post }, { pubsub }, info) => {
  try {
    const createdPost = await prisma.post.create({
      data: post,
    });

    const allPosts = await prisma.post.findMany();

    pubsub.publish("posts", {
      posts: allPosts,
    });

    return createdPost;
  } catch (error) {
    throw error;
  }
};

export default main;
