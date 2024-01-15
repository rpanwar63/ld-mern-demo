export type NotificationType = {
  _id: string;
  post_id: string;
  content: string;
  from: {
    id: string;
    username: string;
  };
  date: string;
};
