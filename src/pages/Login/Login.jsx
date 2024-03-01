import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

import css from "./Login.module.css";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      alert('Failed to login!');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className={css.root}>
      <h5 className={css.title}>Вход в аккаунт</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className={css.field}
          placeholder="E-Mail"
          type="email"
          {...register('email', { required: 'Enter your email' })}
        />
        {errors.email && <span className={css.error}>{errors.email.message}</span>}
        <br />
        <input
          className={css.field}
          placeholder="Password"
          type="password"
          {...register('password', { required: 'Enter your password' })}
        />
        {errors.password && <span className={css.error}>{errors.password.message}</span>}
        <br />
        <button disabled={!isValid} type="submit">
          Log in
        </button>
      </form>
    </div>
  );
};