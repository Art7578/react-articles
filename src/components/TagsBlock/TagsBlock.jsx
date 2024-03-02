import React from "react";
import { SideBlock } from "../SideBlock/SideBlock";
import styles from "./TagsBlock.module.css";

export const TagsBlock = ({ items, isLoading = true }) => {
  return (
    <SideBlock title="Тэги">
      <ul className={styles.list}>
        {(isLoading ? [...Array(5)] : items).map((name, i) => (
          <a
            key={i}
            className={styles.link}
            href={`/tags/${name}`}
          >
            <li className={styles.listItem}>
              <span className={styles.icon}>#</span>
              {isLoading ? (
                <span className={styles.skeleton}></span>
              ) : (
                <span className={styles.text}>{name}</span>
              )}
            </li>
          </a>
        ))}
      </ul>
    </SideBlock>
  );
};