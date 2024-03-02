import React from "react";
import styles from "./SideBlock.module.css";

export const SideBlock = ({ title, children }) => {
  return (
    <div className={styles.root}>
      <h6 className={styles.title}>{title}</h6>
      {children}
    </div>
  );
};