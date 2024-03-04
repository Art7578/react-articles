import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsByTag } from "../../redux/slices/posts";
import { Post } from "../../components/Post/Post";
import { useParams } from "react-router-dom";

const TagPage = () => {
  const dispatch = useDispatch();
  const { tag } = useParams();

  // Извлекаем данные из состояния Redux
  const { items: posts, status } = useSelector((state) => state.posts.posts);

  useEffect(() => {
    dispatch(fetchPostsByTag(tag));
  }, [dispatch, tag]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Posts with tag: {tag}</h1>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post._id}
            id={post._id}
            title={post.title}
            imageUrl={post.imageUrl ? `http://localhost:4444${post.imageUrl}` : ""}
            createdAt={post.createdAt}
            viewsCount={post.viewsCount}
            commentsCount={3}
            tags={post.tags}
            isFullPost={false}
          />
        ))
      ) : (
        <div>No posts found with this tag</div>
      )}
    </div>
  );
};

export default TagPage;
