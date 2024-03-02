import React from "react";
import css from "./SideBlock.module.css";

export const SideBlock = ({ title, children }) => {
  return (
    <div className={css.root}>
      <h6 className={css.title}>{title}</h6>
      {children}
    </div>
  );
};