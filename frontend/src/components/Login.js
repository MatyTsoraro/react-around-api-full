import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../utils/auth';

const Login = ({ handleLogin, isLoading }) => {
  const history = useHistory();

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [token, setToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    if (token) {
      history.push('/');
    }
  }, [token, history]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = data;

    login(email, password)
      .then((data) => {
        const { token } = data;
        setToken(token);
        localStorage.setItem('token', token);
        handleLogin();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='auth-form'>
      <h2 className='auth-form__title'>Log in</h2>
      <form className='auth-form__form' onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          className='auth-form__input'
          placeholder='Email'
          value={data.email}
          onChange={handleChange}
        />
        <input
          type='password'
          name='password'
          className='auth-form__input'
          placeholder='Password'
          value={data.password}
          onChange={handleChange}
        />

        <div className='auth-form__footer'>
          <div className='auth-form__footer-wrapper'>
            <button type='submit' className='auth-form__submit-button'>
              {isLoading ? 'Logging In...' : 'Log in'}
            </button>
            <p className='auth-form__footer-text'>
              Not a member yet?{' '}
              <Link to='/signup' className='auth-form__footer-link'>
                Sign up here!
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
