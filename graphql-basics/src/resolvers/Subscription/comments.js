const comments = {
  subscribe: (parent, { postId }, { db: { posts }, pubsub }, info) => {
    const post = posts.find(({ id, published }) => id === postId && published);

    if (!post) throw new Error(`id가 ${postId}인 post가 존재하지 않습니다.`);

    return pubsub.asyncIterator(`comments in post ${postId}`);
  },
};

export default comments;
