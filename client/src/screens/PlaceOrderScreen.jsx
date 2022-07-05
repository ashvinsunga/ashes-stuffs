import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppButton from '../components/AppButton';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import { USER_DETAILS_RESET } from '../constants/userConstants';

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  if (!cart.shippingAddress.address) {
    navigate('/shipping');
  } else if (!cart.paymentMethod) {
    navigate('/payment');
  }
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }
    // eslint-disable-next-line
  }, [navigate, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <div className='tw-flex tw-justify-center'>
            <ul className='tw-bg-white tw-rounded-lg tw-w-96 tw-text-gray-900'>
              <li className='tw-px-6 tw-py-2 tw-border-b tw-border-gray-200 tw-w-full tw-rounded-t-lg'>
                <h2>Shipping</h2>
                <p>
                  <strong>Address:</strong>
                  {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                  {cart.shippingAddress.postalCode},{' '}
                  {cart.shippingAddress.country}
                </p>
              </li>

              <li className='tw-px-6 tw-py-2 tw-border-b tw-border-gray-200 tw-w-full tw-rounded-t-lg'>
                <h2>Payment Method</h2>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </li>

              <li className='tw-px-6 tw-py-2 tw-border-b tw-border-gray-200 tw-w-full tw-rounded-t-lg'>
                <h2>Order Items</h2>
                {cart.cartItems.length === 0 ? (
                  <Message>Your cart is empty</Message>
                ) : (
                  <ul className='tw-bg-white tw-rounded-lg tw-w-96 tw-text-gray-900'>
                    {cart.cartItems.map((item, index) => (
                      <li
                        key={index}
                        className='tw-px-6 tw-py-2 tw-border-b tw-border-gray-200 tw-w-full tw-rounded-t-lg'>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ₱{item.price} = ₱
                            {item.qty * item.price}
                          </Col>
                        </Row>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </Col>
        <Col md={4}>
          <Card>
            <ul className='tw-bg-white tw-rounded-lg tw-w-96 tw-text-gray-900 tw-text-center'>
              <li className='tw-px-6 tw-py-2 tw-border-b tw-border-gray-200 tw-w-full tw-rounded-t-lg'>
                <h2>Order Summary</h2>
              </li>
              <li className='tw-px-6 tw-py-2 tw-border-b tw-border-gray-200 tw-w-full tw-rounded-t-lg'>
                <Row>
                  <Col>Items</Col>
                  <Col>₱ {cart.itemsPrice}</Col>
                </Row>
              </li>
              <li className='tw-px-6 tw-py-2 tw-border-b tw-border-gray-200 tw-w-full tw-rounded-t-lg'>
                <Row>
                  <Col>Shipping</Col>
                  <Col>₱ {cart.shippingPrice}</Col>
                </Row>
              </li>
              <li className='tw-px-6 tw-py-2 tw-border-b tw-border-gray-200 tw-w-full tw-rounded-t-lg'>
                <Row>
                  <Col>Tax</Col>
                  <Col>₱ {cart.taxPrice}</Col>
                </Row>
              </li>
              <li className='tw-px-6 tw-py-2 tw-border-b tw-border-gray-200 tw-w-full tw-rounded-t-lg'>
                <Row>
                  <Col>Total</Col>
                  <Col>₱ {cart.totalPrice}</Col>
                </Row>
              </li>
              <li className='tw-px-6 tw-py-2 tw-border-b tw-border-gray-200 tw-w-full tw-rounded-t-lg'>
                {error && <Message variant='danger'>{error}</Message>}
              </li>
              <li className='tw-px-6 tw-py-2 tw-border-b tw-border-gray-200 tw-w-full tw-rounded-t-lg'>
                <AppButton
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}>
                  Place Order
                </AppButton>
              </li>
            </ul>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
