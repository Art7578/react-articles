import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './Post.module.css';
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
    <div className={styles.root + (isFullPost ? ' ' + styles.rootFull : '')}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <button className={styles.button + ' ' + styles.primaryButton}>
              Edit
            </button>
          </Link>
          <button onClick={onClickRemove} className={styles.button + ' ' + styles.secondaryButton}>
            Delete
          </button>
        </div>
      )}
      {imageUrl && (
        <img
          className={styles.image + (isFullPost ? ' ' + styles.imageFull : '')}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2 className={styles.title + (isFullPost ? ' ' + styles.titleFull : '')}>
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags.map((name) => (
              <li key={name}>
                <Link to={`/tag/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <span>Views: {viewsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};