export type PostType = {
  _id: string;
  content: string;
  author: { id: string; username: string };
  date: string;
};
export type CommentType = {
  _id: string;
  author: { id: string; username: string };
  content: string;
  date: string;
};
export type PaginationType = {
  currentPage: number;
  totalCount: number;
  totalPages: number;
};
