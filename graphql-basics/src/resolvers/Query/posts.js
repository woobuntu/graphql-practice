const posts = (parent, { query }, { db: { posts } }, info) =>
  query
    ? posts.filter(({ title, body }) => {
        const loweredQuery = query.toLowerCase();
        const isMatchedWithEachOther = (column, value) =>
          column.toLowerCase().includes(value);
        return (
          isMatchedWithEachOther(title, loweredQuery) ||
          isMatchedWithEachOther(body, loweredQuery)
        );
      })
    : posts;

export default posts;
