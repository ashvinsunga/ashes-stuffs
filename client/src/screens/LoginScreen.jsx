import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../actions/userActions.js';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '';

  useEffect(() => {
    if (userInfo) {
      navigate(`/${redirect}`);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className='tw-grid tw-grid-cols-1 tw-text-center tw-text-lg'>
      <form onSubmit={submitHandler}>
        <p className='tw-text-center tw-text-2xl tw-font-extrabold tw-mx-4 tw-mb-6'>
          Welcome to Ashes Stuffs! Please sign in.
        </p>
        <div className='tw-grid tw-grid-cols-1 tw-justify-items-center'>
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
        </div>

        <div>
          <input
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            className='tw-w-80 tw-mb-6 tw-px-4 tw-py-2 tw-font-normal tw-text-gray-700 tw-border tw-border-solid tw-border-gray-300 tw-rounded  focus:tw-border-teal-600 focus:tw-outline-none'
          />
        </div>
        <div>
          <input
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='tw-w-80 tw-mb-6 tw-px-4 tw-py-2 tw-font-normal tw-text-gray-700 tw-border tw-border-solid tw-border-gray-300 tw-rounded  focus:tw-border-teal-600 focus:tw-outline-none'
          />
        </div>

        <div className='text-center lg:text-left'>
          <button
            type='submit'
            className='tw-inline-block tw-px-7 tw-py-3 tw-mb-10 tw-bg-green-600 hover:tw-bg-green-500 tw-text-white tw-font-medium tw-text-sm tw-uppercase tw-rounded tw-shadow-md'>
            Sign In
          </button>
          <p className='tw-text-sm tw-font-semibold tw-mt-2 tw-pt-1 tw-mb-0'>
            Don't have an account?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
              className='tw-text-red-600 hover:tw-text-red-700 focus:tw-text-red-700 tw-transition tw-duration-200 tw-ease-in-out'>
              Register here!
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
