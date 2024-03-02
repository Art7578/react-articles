import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Home.module.css';

import { Post } from '../../components/Post/Post';
import { TagsBlock } from '../../components/TagsBlock/TagsBlock';
import { fetchPost, fetchTags } from '../../redux/slices/posts';

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector(state => state.posts);
  const userData = useSelector(state => state.auth.data);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPost());
    dispatch(fetchTags())
  }, [])

  return (
    <>
      <div className={styles.tabs}>
        <div className={styles.tab}>New</div>
        <div className={styles.tab}>Popular</div>
      </div>
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
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
            ),
          )}
        </div>
        <div className={styles.gridItem}>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
        </div>
      </div>
    </>
  );
};