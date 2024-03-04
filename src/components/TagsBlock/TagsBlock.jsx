import React from "react";
import { SideBlock } from "../SideBlock/SideBlock";
import { Link } from "react-router-dom";
import css from "./TagsBlock.module.css";

export const TagsBlock = ({ items, isLoading = true }) => {
  return (
    <SideBlock title="Tags">
      <ul className={css.list}>
        {(isLoading ? [...Array(5)] : items).map((name, i) => (
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
  );
};