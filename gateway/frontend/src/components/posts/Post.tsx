import { FC, useEffect, useState } from "react";
import { PostType } from "../../types/Post";
import Comments from "./Comments";
import { formatDate } from "../../utils/helper";

type PostTypeProps = {
  data: PostType;
};

const Post: FC<PostTypeProps> = ({ data }) => {
  const [postData, setPostData] = useState(data);
  const [showComments, setShowComments] = useState(false);
  useEffect(() => {
    setPostData(data);
  }, [data]);

  return (
    <article className="post_container">
      <h2>
        Author: {postData.author.username} - {formatDate(postData.date)}
      </h2>
      <p>{postData.content}</p>
      <button
        className="show-comments-btn"
        onClick={() => setShowComments(prev => !prev)}
      >
        {showComments ? "Hide" : "View"} comments
      </button>
      {showComments && (
        <Comments postAuthorId={postData.author.id} postId={postData._id} />
      )}
    </article>
  );
};
export default Post;
