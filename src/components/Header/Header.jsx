import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import css from './Header.module.css';

import { logout, selectIsAuth } from "../../redux/slices/auth";

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const location = useLocation();

  const isActiveRoute = (route) => {
    return location.pathname === route;
  };

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
                <button className={css.button_add}>Write the article</button>
              </Link>
              <button onClick={onClickLogout} className={css.button_error}>
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className={isActiveRoute('/login') ? `${css.button_contained} ${css.active}` : css.button_contained}>Log In</button>
              </Link>
              <Link to="/register">
                <button className={isActiveRoute('/register') ? `${css.button_contained} ${css.active}` : css.button_contained}>Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};