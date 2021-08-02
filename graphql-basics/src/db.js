// 더미 데이터
const users = [
  { id: "1", name: "woobuntu", email: "이메일" },
  {
    id: "2",
    name: "name",
    email: "email",
  },
];
const posts = [
  {
    id: "1",
    title: "title",
    body: "body",
    published: true,
    author: "1",
  },
  {
    id: "2",
    title: "제목",
    body: "내용",
    published: false,
    author: "2",
  },
];

const comments = [
  { id: "1", text: "댓글1", author: "1", post: "1" },
  { id: "2", text: "댓글2", author: "1", post: "2" },
  { id: "3", text: "댓글3", author: "2", post: "1" },
  { id: "4", text: "댓글4", author: "2", post: "2" },
];

const db = {
  users,
  posts,
  comments,
};

export { db as default };
