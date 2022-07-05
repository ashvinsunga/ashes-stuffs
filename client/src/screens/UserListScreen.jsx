import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ListButton from '../components/ListButton';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers, deleteUser } from '../actions/userActions';

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <h1 className='tw-mb-4 tw-font-extrabold'>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <table className='tw-min-w-full'>
          <thead className='tw-border-b tw-bg-gray-200 tw-text-center'>
            <tr>
              <th
                scope='col'
                className='tw-text-sm tw-font-extrabold tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left'>
                ID
              </th>
              <th
                scope='col'
                className='tw-text-sm tw-font-extrabold tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left'>
                NAME
              </th>
              <th
                scope='col'
                className='tw-text-sm tw-font-extrabold tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left'>
                EMAIL
              </th>
              <th
                scope='col'
                className='tw-text-sm tw-font-extrabold tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left'>
                ADMIN
              </th>
              <th
                scope='col'
                className='tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left'></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                className='tw-border-b tw-transition tw-duration-150 tw-ease-in-out hover:tw-bg-lime-200'
                key={user._id}>
                <td className='tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-font-medium tw-text-gray-900'>
                  {user._id}
                </td>
                <td className='tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-font-medium tw-text-gray-900'>
                  {user.name}
                </td>
                <td className='tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-font-medium tw-text-gray-900'>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td className='tw-px-6 tw-text-center tw-py-4 tw-whitespace-nowrap tw-text-sm tw-font-medium tw-text-gray-900'>
                  {' '}
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td className='tw-px-6 tw-my-2 tw-grid tw-grid-cols-2 tw-justify-items-center'>
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <ListButton>
                      <i className='fas fa-edit'></i>
                    </ListButton>
                  </Link>
                  <ListButton onClick={() => deleteHandler(user._id)}>
                    <i className='fas fa-trash'></i>
                  </ListButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UserListScreen;
