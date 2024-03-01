import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Post } from '../../components/Post/Post';
import { fetchPost } from '../../redux/slices/posts';

export const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.posts);
  const userData = useSelector(state => state.auth.data);

  const isPostsLoading = posts.status === 'loading';

  useEffect(() => {
    dispatch(fetchPost());
  }, [])

  return (
    <>
      <div style={{ marginBottom: 15 }}>
        <button>New</button>
        <button>Popular</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {(isPostsLoading ? Array(5).fill() : posts.items).map((obj, index) =>
          isPostsLoading ? (
            <Post key={index} isLoading={true} />
          ) : (
              <Post
                key={index}
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            ),
        )}
      </div>
    </>
  );
};