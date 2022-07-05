import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import AppButton from '../components/AppButton';

const UserEditScreen = () => {
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate('/admin/userlist');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, navigate, userId, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      <Link to='/admin/userlist'>
        <AppButton>Go Back</AppButton>
      </Link>
      <div className='tw-grid tw-grid-cols-1 tw-justify-items-center tw-text-lg'>
        <h1 className='tw-mb-6 tw-font-extrabold'>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <form onSubmit={submitHandler}>
            <div className='tw-text-left'>
              <label>Name</label>
              <br />
              <input
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='tw-w-80 tw-mb-6 tw-px-4 tw-py-2 tw-font-normal tw-text-gray-700 tw-border tw-border-solid tw-border-gray-300 tw-rounded  focus:tw-border-teal-600 focus:tw-outline-none'></input>
            </div>
            <div>
              <label>Email Address</label>
              <br />
              <input
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='tw-w-80 tw-mb-6 tw-px-4 tw-py-2 tw-font-normal tw-text-gray-700 tw-border tw-border-solid tw-border-gray-300 tw-rounded  focus:tw-border-teal-600 focus:tw-outline-none'></input>
            </div>
            <div>
              <label className='tw-mb-4 tw-mr-4'>Is Admin? </label>
              <input
                type='checkbox'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}></input>
            </div>
            <AppButton type='submit'>Update</AppButton>
          </form>
        )}
      </div>
    </>
  );
};

export default UserEditScreen;
