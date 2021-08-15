const posts = {
  subscribe(parent, args, { pubsub }, info) {
    return pubsub.asyncIterator("posts");
  },
};

export default posts;
