import { Dispatch, FC, SetStateAction, useState } from "react";
import useIsLoggedInHook from "../../utils/isLoggedInHook";
import { apiCall } from "../../utils/apiCall";
import { toast } from "react-toastify";

const NewPost: FC<{ refetch: Dispatch<SetStateAction<boolean>> }> = ({
  refetch,
}) => {
  const [post, setPost] = useState("");
  const { myId } = useIsLoggedInHook();

  const handlePost = async () => {
    const result = await apiCall("post", `/post`, {
      content: post,
      userId: myId,
    });
    const formatedResult = result as { success: true };
    if (formatedResult.success) {
      toast.success("Post published!");
      refetch(true);
      setPost("");
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <section className="new_post_container">
      <textarea
        rows={10}
        placeholder="write something..."
        value={post}
        onChange={e => setPost(e.target.value)}
      />
      <button onClick={handlePost}>Post</button>
    </section>
  );
};
export default NewPost;
