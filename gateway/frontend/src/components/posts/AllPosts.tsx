import { useEffect, useState } from "react";
import Post from "./Post";
import { PaginationType, PostType } from "../../types/Post";
import NewPost from "./NewPost";
import { apiCall } from "../../utils/apiCall";
import useIsLoggedInHook from "../../utils/isLoggedInHook";

const AllPosts = () => {
  const { isLoggedIn } = useIsLoggedInHook();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [refetchPosts, setRefetchPosts] = useState(true);

  const fetchPosts = async () => {
    const result = await apiCall("get", "/post", null);
    if (result) {
      const formatedResult = result as {
        posts: PostType[];
        pagination: PaginationType;
      };
      setPosts(formatedResult.posts || []);
      setRefetchPosts(false);
    }
  };

  useEffect(() => {
    if (refetchPosts) {
      fetchPosts();
    }
  }, [refetchPosts]);

  return (
    <>
      {isLoggedIn && <NewPost refetch={setRefetchPosts} />}
      <section className="posts_section">
        {posts.map(post => (
          <Post key={post._id} data={post} />
        ))}
      </section>
    </>
  );
};
export default AllPosts;
