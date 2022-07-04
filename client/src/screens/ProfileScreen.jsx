import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import ListButton from '../components/ListButton';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2 className='tw-pb-6 tw-font-extrabold'>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </Col>
      <Col md={9}>
        <h2 className='tw-pb-6 tw-font-extrabold'>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
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
                  DATE
                </th>
                <th
                  scope='col'
                  className='tw-text-sm tw-font-extrabold tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left'>
                  TOTAL
                </th>
                <th
                  scope='col'
                  className='tw-text-sm tw-font-extrabold tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left'>
                  PAID
                </th>
                <th
                  scope='col'
                  className='tw-text-sm tw-font-extrabold tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left'>
                  DELIVERED
                </th>
                <th
                  scope='col'
                  className='tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left'></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  className='tw-border-b tw-transition tw-duration-150 tw-ease-in-out hover:tw-bg-lime-200'
                  key={order._id}>
                  <td className='tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-font-medium tw-text-gray-900'>
                    {order._id}
                  </td>
                  <td className='tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-font-medium tw-text-gray-900'>
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className='tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-font-medium tw-text-gray-900'>
                    ₱ {order.totalPrice}
                  </td>
                  <td className='tw-px-6 tw-text-center tw-py-4 tw-whitespace-nowrap tw-text-sm tw-font-medium tw-text-gray-900'>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td className='tw-px-6 tw-text-center tw-py-4 tw-whitespace-nowrap tw-text-sm tw-font-medium tw-text-gray-900'>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td className='tw-px-3 tw-my-2 tw-justify-items-center'>
                    <Link to={`/order/${order._id}`}>
                      <ListButton>Details</ListButton>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          // <Table striped bordered hover responsive className='table-sm'>
          //   <thead>
          //     <tr>
          //       <th>ID</th>
          //       <th>DATE</th>
          //       <th>TOTAL</th>
          //       <th>PAID</th>
          //       <th>DELIVERED</th>
          //       <th></th>
          //     </tr>
          //   </thead>
          //   <tbody>
          //     {orders.map((order) => (
          //       <tr key={order._id}>
          //         <td>{order._id}</td>
          //         <td>{order.createdAt.substring(0, 10)}</td>
          //         <td>{order.totalPrice}</td>
          //         <td>
          //           {order.isPaid ? (
          //             order.paidAt.substring(0, 10)
          //           ) : (
          //             <i className='fas fa-times' style={{ color: 'red' }}></i>
          //           )}
          //         </td>
          //         <td>
          //           {order.isDelivered ? (
          //             order.deliveredAt.substring(0, 10)
          //           ) : (
          //             <i className='fas fa-times' style={{ color: 'red' }}></i>
          //           )}
          //         </td>
          //         <td>
          //           <LinkContainer to={`/order/${order._id}`}>
          //             <Button className='btn-sm' variant='light'>
          //               Details
          //             </Button>
          //           </LinkContainer>
          //         </td>
          //       </tr>
          //     ))}
          //   </tbody>
          // </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
