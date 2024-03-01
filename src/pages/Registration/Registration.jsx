import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate } from "react-router-dom";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";

import css from './Registration.module.css';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: ''
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

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
      <h5 className={css.title}>Создание аккаунта</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.avatar}>
          <img src="avatar.jpg" alt="Avatar" style={{ width: '100px', height: '100px' }} />
        </div>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            id="fullName"
            className={css.field}
            type="text"
            {...register('fullName', { required: 'Enter your fullName' })}
          />
          {errors.fullName && <span>{errors.fullName.message}</span>}
        </div>
        <div>
          <label htmlFor="email">E-Mail:</label>
          <input
            id="email"
            className={css.field}
            type="email"
            {...register('email', { required: 'Enter your email' })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            className={css.field}
            type="password"
            {...register('password', { required: 'Enter your password' })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <button disabled={!isValid} type="submit">
          Register
        </button>
      </form>
    </div>
  );
};