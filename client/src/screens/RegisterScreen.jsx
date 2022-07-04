import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { register } from '../actions/userActions';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      setMessage('');
      dispatch(register(name, email, password));
    }
  };

  return (
    <div className='tw-grid tw-grid-cols-1 tw-text-center tw-text-lg'>
      <form onSubmit={submitHandler}>
        <p className='tw-text-center tw-text-2xl tw-font-extrabold tw-mx-4 tw-mb-6'>
          Create your Account
        </p>
        <div className='tw-grid tw-grid-cols-1 tw-justify-items-center'>
          {loading && <Loader />}
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
        </div>

        <div>
          <input
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            type='text'
            className='tw-w-80 tw-mb-6 tw-px-4 tw-py-2 tw-font-normal tw-text-gray-700 tw-border tw-border-solid tw-border-gray-300 tw-rounded  focus:tw-border-teal-600 focus:tw-outline-none'
          />
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
        <div>
          <input
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='tw-w-80 tw-mb-6 tw-px-4 tw-py-2 tw-font-normal tw-text-gray-700 tw-border tw-border-solid tw-border-gray-300 tw-rounded  focus:tw-border-teal-600 focus:tw-outline-none'
          />
        </div>
        <div className='text-center lg:text-left'>
          <button
            type='submit'
            className='tw-px-7 tw-py-3 tw-mb-10 tw-bg-green-600 hover:tw-bg-green-500 tw-text-white tw-font-medium tw-text-sm tw-uppercase tw-rounded tw-shadow-md  hover:tw-shadow-lg  focus:tw-outline-none focus:tw-rin    g-0  active:tw-shadow-lg tw-transition tw-duration-150 tw-ease-in-out'>
            Submit
          </button>
          <p className='tw-text-sm tw-font-semibold tw-mt-2 tw-pt-1 tw-mb-0'>
            Already have an account?{' '}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : '/login'}
              className='tw-text-blue-600 hover:tw-text-blue-700 tw-transition tw-duration-200 tw-ease-in-out'>
              Sign in here!
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;
