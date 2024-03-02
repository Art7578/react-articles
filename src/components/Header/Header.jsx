import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import css from './Header.module.css';

import { logout, selectIsAuth } from "../../redux/slices/auth";

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm('Are you sure you want to log?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className={css.root}>
      <div className={css.inner}>
        <Link className={css.logo} to="/">
          <div>DAILY BLOG</div>
        </Link>
        <div className={css.buttons}>
          {isAuth ? (
            <>
              <Link to="/add-post">
                <button className="button-outlined" variant="contained">Write the article</button>
              </Link>
              <button onClick={onClickLogout} className="button-contained button-error">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="button-outlined">Log In</button>
              </Link>
              <Link to="/register">
                <button className="button-contained">Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};