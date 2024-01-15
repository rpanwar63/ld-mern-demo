import { FC, FormEvent, useEffect, useState } from "react";
import { apiCall } from "../../utils/apiCall";
import { CommentType, PaginationType } from "../../types/Post";
import useIsLoggedInHook from "../../utils/isLoggedInHook";

type CommentsProps = {
  postId: string;
  postAuthorId: string;
};

const Comments: FC<CommentsProps> = ({ postAuthorId, postId }) => {
  const [newComment, setnewComment] = useState("");
  const [commentsData, setCommentsData] = useState<CommentType[]>([]);
  const { isLoggedIn, myId } = useIsLoggedInHook();

  const fetchComments = async () => {
    const result = await apiCall("get", `/comment?post_id=${postId}`, null);
    const formatedResult = result as {
      comments: CommentType[];
      pagination: PaginationType;
    };
    setCommentsData(formatedResult.comments);
  };
  const handleCommentSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await apiCall("post", `/comment?post_id=${postId}`, {
      content: newComment,
      user_id: myId,
      post_author_id: postAuthorId,
    });
    const formatedResult = result as { success: boolean };
    if (formatedResult.success) {
      setnewComment("");
      fetchComments();
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="comments_section">
      <h3>Comments {`(${commentsData.length})`}</h3>
      {isLoggedIn && (
        <div className="add_comment">
          <form onSubmit={handleCommentSubmission}>
            <input
              type="text"
              placeholder="Add a comment..."
              onChange={e => {
                setnewComment(e.target.value);
              }}
              value={newComment}
            />
            <button type="submit">Add comment</button>
          </form>
        </div>
      )}
      {commentsData.map(comment => (
        <div className="comment" key={comment._id}>
          <p className="comment_text">
            {comment.author.username}: {comment.content}
          </p>
        </div>
      ))}
    </div>
  );
};
export default Comments;
