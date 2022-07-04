import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listOrders } from '../actions/orderActions';
import ListButon from '../components/ListButton';

const OrderListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <>
      <div className='tw-flex tw-flex-col'>
        <div className='tw-overflow-x-auto sm:-tw-mx-6 lg:-tw-mx-8'>
          <div className='tw-py-2 tw-inline-block tw-min-w-full sm:tw-px-6 lg:tw-px-8'>
            <div className='tw-overflow-x-auto'>
              <h1 className='tw-mb-4 tw-font-extrabold'>Orders</h1>
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
                        USER
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
                          {order.user && order.user.name}
                        </td>
                        <td className='tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-font-medium tw-text-gray-900'>
                          {order.createdAt.substring(0, 10)}
                        </td>
                        <td className='tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-font-medium tw-text-gray-900'>
                          ₱ {order.totalPrice}
                        </td>
                        <td className='tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-center tw-text-sm tw-font-medium tw-text-gray-900'>
                          {order.isPaid ? (
                            order.paidAt.substring(0, 10)
                          ) : (
                            <i
                              className='fas fa-times'
                              style={{ color: 'red' }}></i>
                          )}
                        </td>
                        <td className='tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-center tw-text-sm tw-font-medium tw-text-gray-900'>
                          {order.isDelivered ? (
                            order.deliveredAt.substring(0, 10)
                          ) : (
                            <i
                              className='fas fa-times'
                              style={{ color: 'red' }}></i>
                          )}
                        </td>
                        <td className='tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-font-medium tw-text-gray-900'>
                          <Link to={`/order/${order._id}`}>
                            <ListButon>Details</ListButon>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderListScreen;
