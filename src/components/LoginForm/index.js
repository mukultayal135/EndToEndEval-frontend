/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import makeRequest from '../../utils/makeRequest';
import { AUTH_URL, GET_TOKEN } from '../../constants/apiEndPoints';
import './LoginForm.css';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    makeRequest(AUTH_URL, GET_TOKEN, {
      data: {
        email: data.email,
        password: data.password,
      },
    })
      .then((response) => {
        localStorage.setItem('token', response.token);
        navigate('/home');
      })
      .catch((e) => {
        if (e.response?.status === 401) {
          alert(e.response.data.message);
          localStorage.removeItem('token');
          navigate('/');
        }
      });
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            {...register('email', {
              required: 'Email is required',
            })}
          />
          <span style={{ color: 'red' }}>
            {errors.email && errors.email.message}
          </span>
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 5,
                message: 'Password must be at least 5 characters',
              },
            })}
          />
          <span style={{ color: 'red' }}>
            {errors?.password && errors.password.message}
          </span>
        </div>
        <div className="field">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
