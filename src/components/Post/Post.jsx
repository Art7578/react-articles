import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import css from './Post.module.css';
import { UserInfo } from '../UserInfo/UserInfo';
import { PostSkeleton } from './Skeleton';
import { fetchRemovePost } from '../../redux/slices/posts';

export const Post = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();

  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () => {
    if (window.confirm('Are you sure you want to delete article?')) {
      dispatch(fetchRemovePost(id));
    }
  };

  return (
    <div className={css.root + (isFullPost ? ' ' + css.rootFull : '')}>
      {isEditable && (
        <div className={css.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <button className={css.button + ' ' + css.primaryButton}>
              Edit
            </button>
          </Link>
          <button onClick={onClickRemove} className={css.button + ' ' + css.secondaryButton}>
            Delete
          </button>
        </div>
      )}
      {imageUrl && (
        <img
          className={css.image + (isFullPost ? ' ' + css.imageFull : '')}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={css.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={css.indention}>
          <h2 className={css.title + (isFullPost ? ' ' + css.titleFull : '')}>
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          <ul className={css.tags}>
            {tags.map((name) => (
              <li key={name}>
                <Link to={`/tag/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
          {children && <div className={css.content}>{children}</div>}
          <span className={css.postDetails}>Views: {viewsCount}</span>
        </div>
      </div>
    </div>
  );
};