import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './Home.module.css';

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
  }, [dispatch])

  return (
    <>
      <div className={css.tabs}>
        <div className={css.tab}>New</div>
        <div className={css.tab}>Popular</div>
      </div>
      <div className={css.gridContainer}>
        <div className={css.gridItem}>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
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
            ),
          )}
        </div>
        <div className={css.tagsItem}>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
        </div>
      </div>
    </>
  );
};