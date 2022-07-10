import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppButton from '../components/AppButton';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const navigate = useNavigate();
  if (!shippingAddress.address) {
    navigate('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div className='tw-grid tw-grid-cols-1 tw-justify-items-center tw-text-lg'>
      <CheckoutSteps step1 step2 step3 />
      <h1 className='tw-mb-6 tw-font-extrabold'>Payment Method</h1>
      <form onSubmit={submitHandler}>
        <label className='tw-mb-2 tw-font-extrabold'>Select Method</label>

        <div className='tw-mb-5'>
          <div className='tw-form-check'>
            <input
              className='tw-form-check-input tw-h-4 tw-w-4 tw-mt-1 tw-mr-2 tw-cursor-pointer'
              type='radio'
              name='paymentMethod'
              value='PayPal'
              onChange={(e) => setPaymentMethod(e.target.value)}
              id='PayPal'
              checked
            />
            <label
              className='tw-cursor-pointer tw-form-check-label tw-inline-block tw-text-gray-800'
              htmlFor='PayPal'>
              PayPal or Credit Card
            </label>
          </div>

          <div className='tw-form-check'>
            <input
              disabled
              className='tw-form-check-input tw-h-4 tw-w-4 tw-mt-1 tw-mr-2 tw-cursor-not-allowed'
              type='radio'
              name='paymentMethod'
              value='Stripe'
              onChange={(e) => setPaymentMethod(e.target.value)}
              id='Stripe'
            />
            <label
              className='tw-cursor-not-allowed tw-form-check-label tw-inline-block tw-text-gray-400'
              htmlFor='Stripe'>
              Stripe (Will be available soon...)
            </label>
          </div>
        </div>

        <AppButton type='submit'>Continue</AppButton>
      </form>
    </div>
  );
};

export default PaymentScreen;
