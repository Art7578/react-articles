import React from "react";
import { SideBlock } from "../SideBlock/SideBlock";
import css from "./TagsBlock.module.css";

export const TagsBlock = ({ items, isLoading = true }) => {
  return (
    <SideBlock title="Tags">
      <ul className={css.list}>
        {(isLoading ? [...Array(5)] : items).map((name, i) => (
          <a
            key={i}
            className={css.link}
            href={`/tags/${name}`}
          >
            <li className={css.listItem}>
              <span className={css.icon}>#</span>
              {isLoading ? (
                <span className={css.skeleton}></span>
              ) : (
                <span className={css.text}>{name}</span>
              )}
            </li>
          </a>
        ))}
      </ul>
    </SideBlock>
  );
};