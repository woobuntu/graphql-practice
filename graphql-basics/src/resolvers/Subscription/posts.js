const posts = {
  subscribe(parent, args, { db: { posts }, pubsub }, info) {
    return pubsub.asyncIterator("posts");
  },
};

export default posts;
