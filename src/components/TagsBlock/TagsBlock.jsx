import React, { useEffect, useState } from "react";
import { SideBlock } from "../SideBlock/SideBlock";
import { Link } from "react-router-dom";
import css from "./TagsBlock.module.css";

export const TagsBlock = ({ items, isLoading = true }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setTags(items);
  }, [items]);

  return (
    <div className={css.block}>
      <SideBlock title="Tags">
        <ul className={css.list}>
          {(isLoading ? [...Array(7)] : tags).map((name, i) => (
            <Link key={i} className={css.link} to={`/tag/${name}`}>
              <li className={css.listItem}>
                <span className={css.icon}>#</span>
                {isLoading ? (
                  <span className={css.skeleton}></span>
                ) : (
                  <span className={css.text}>{name}</span>
                )}
              </li>
            </Link>
          ))}
        </ul>
      </SideBlock>
    </div>
  );
};