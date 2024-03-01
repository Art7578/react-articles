import React from "react";
import css from "./Post.module.css";

export const PostSkeleton = () => {
  return (
    <div className={css.skeleton}>
      <div className={css.stack}>
        <div className={css.skeletonRectangular}></div>
        <div className={css.skeletonContent}>
          <div className={css.skeletonUser}>
            <div className={css.skeletonCircular}></div>
            <div className={css.skeletonUserDetails}>
              <div className={css.skeletonText}></div>
              <div className={css.skeletonText}></div>
            </div>
          </div>
          <div className={css.skeletonInfo}>
            <div className={css.skeletonText}></div>
            <div className={css.skeletonTags}>
              <div className={css.skeletonText}></div>
              <div className={css.skeletonText}></div>
              <div className={css.skeletonText}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};