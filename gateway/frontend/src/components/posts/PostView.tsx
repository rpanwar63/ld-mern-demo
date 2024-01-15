import { useEffect, useState } from "react";
import { PostType } from "../../types/Post";
import { apiCall } from "../../utils/apiCall";
import Post from "./Post";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../header/Header";

const PostView = () => {
  const [post, setPost] = useState<PostType>({
    _id: "",
    author: { id: "", username: "" },
    content: "",
    date: "",
  });
  const { post_id } = useParams();

  const fetchPosts = async () => {
    const result = await apiCall("get", `/post/${post_id}`, null);
    if (result._id) {
      setPost(result);
    } else toast.error("Something went wrong!");
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Header />
      <section className="posts_section">
        <Post key={post._id} data={post} />
      </section>
    </>
  );
};
export default PostView;
