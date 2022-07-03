import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
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
    <div className='tw-flex tw-justify-center'>
      <form onSubmit={submitHandler}>
        <div className='tw-flex tw-flex-row tw-items-center tw-justify-center lg:tw-justify-start'></div>

        <div className='tw-flex tw-items-center tw-my-4 before:tw-flex-1 before:tw-border-t before:tw-border-gray-300 before:tw-mt-0.5 after:tw-flex-1 after:tw-border-t after:tw-border-gray-300 after:tw-mt-0.5'>
          <p className='tw-text-center tw-font-semibold tw-mx-4 tw-mb-0'>
            Welcome to Ashes Stuffs! Please sign in.
          </p>
        </div>

        <div className='tw-justify-center'>
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
        </div>

        {/* <!-- Email input --> */}
        <div className='tw-mb-6'>
          <input
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            className='tw-form-control tw-block tw-w-full tw-px-4 tw-py-2 tw-text-xl tw-font-normal tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-teal-600 focus:tw-outline-none'
          />
        </div>

        {/* <!-- Password input --> */}
        <div className='tw-mb-6'>
          <input
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='tw-form-control tw-block tw-w-full tw-px-4 tw-py-2 tw-text-xl tw-font-normal tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-teal-600 focus:tw-outline-none'
          />
        </div>

        <div className='text-center lg:text-left'>
          <button
            type='submit'
            className='tw-inline-block tw-px-7 tw-py-3 tw-mb-10 tw-bg-green-600 hover:tw-bg-green-500 tw-text-white tw-font-medium tw-text-sm tw-uppercase tw-rounded tw-shadow-md  hover:tw-shadow-lg focus:tw-bg-blue-700 focus:tw-shadow-lg focus:tw-outline-none focus:tw-ring-0 active:tw-bg-blue-800 active:tw-shadow-lg tw-transition tw-duration-150 tw-ease-in-out'>
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

    // <FormContainer>
    //   <h1>Sign In</h1>
    //   {error && <Message variant='danger'>{error}</Message>}
    //   {loading && <Loader />}
    //   <Form onSubmit={submitHandler}>
    //     <Form.Group controlId='email'>
    //       <Form.Label>Email Address</Form.Label>
    //       <Form.Control
    //         type='email'
    //         placeholder='Enter email'
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}></Form.Control>
    //     </Form.Group>

    //     <Form.Group controlId='password'>
    //       <Form.Label>Password</Form.Label>
    //       <Form.Control
    //         type='password'
    //         placeholder='Enter password'
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}></Form.Control>
    //     </Form.Group>

    //     <Button type='submit' variant='primary'>
    //       Sign In
    //     </Button>
    //   </Form>

    //   <Row className='py-3'>
    //     <Col>
    //       New Customer?{' '}
    //       <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
    //         Register
    //       </Link>
    //     </Col>
    //   </Row>
    // </FormContainer>
  );
};

export default LoginScreen;
