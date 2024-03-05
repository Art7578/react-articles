import React from 'react';
import css from './UserInfo.module.css'; 

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {

  return (
    <div className={css.root}>
      <img className={css.avatar} src={avatarUrl || '../../../public/noavatar.png'} alt={fullName} />
      <div className={css.userDetails}>
        <span className={css.userName}>{fullName}</span>
        <span className={css.additional}>{additionalText}</span>
      </div>
    </div>
  );
};