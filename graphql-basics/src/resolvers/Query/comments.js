const comments = (parent, { query }, { db: { comments } }, info) =>
  query
    ? comments.filter(({ text }) => {
        const loweredQuery = query.toLowerCase();
        return text.toLowerCase().includes(loweredQuery);
      })
    : comments;

export default comments;
