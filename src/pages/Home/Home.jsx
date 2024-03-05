import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './Home.module.css';

import { Post } from '../../components/Post/Post';
import { TagsBlock } from '../../components/TagsBlock/TagsBlock';
import { fetchPost, fetchTags } from '../../redux/slices/posts';

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector(state => state.posts);
  const userData = useSelector(state => state.auth.data);

  const [activeTab, setActiveTab] = useState(null);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPost());
    dispatch(fetchTags());
  }, [dispatch]);

  const filteredPosts = () => {
    if (activeTab === 'New') {
      // Filter posts created today
      return isPostsLoading
        ? [...Array(5)]
        : posts.items.filter(
            (post) =>
              new Date(post.createdAt).toDateString() === new Date().toDateString()
          );
    } else if (activeTab === 'Popular') {
      // Filter posts with viewsCount > 10
      return isPostsLoading
        ? [...Array(5)]
        : posts.items.filter((post) => post.viewsCount > 10);
    } else {
      // Return all posts if activeTab is null
      return isPostsLoading ? [...Array(5)] : posts.items;
    }
  };

  const handleTabClick = (tab) => {
    // If the same tab is clicked again, reset activeTab to null
    setActiveTab(activeTab === tab ? null : tab);
  };

  return (
    <>
      <div className={css.tabs}>
        <button
          className={css.tab}
          onClick={() => handleTabClick('New')}
          style={{ fontWeight: activeTab === 'New' ? 'bold' : 'normal' }}
        >
          New
        </button>
        <button
          className={css.tab}
          onClick={() => handleTabClick('Popular')}
          style={{ fontWeight: activeTab === 'Popular' ? 'bold' : 'normal' }}
        >
          Popular
        </button>
      </div>
      <div className={css.gridContainer}>
        <div className={css.gridItem}>
          {filteredPosts().map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                key={obj._id}
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </div>
        <div className={css.tagsItem}>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
        </div>
      </div>
    </>
  );
};