import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppButton from '../components/AppButton';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartActions';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const navigate = useNavigate();

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <div className='tw-grid tw-grid-cols-1 tw-justify-items-center tw-text-lg'>
      <CheckoutSteps step1 step2 />
      <h1 className='tw-mb-2 tw-font-extrabold'>Shipping</h1>
      <form onSubmit={submitHandler}>
        <div className='tw-text-left'>
          <label className='tw-text-sm'>Address</label>
          <br />
          <input
            type='text'
            placeholder='Enter address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
            className='tw-w-96 tw-mb-3 tw-px-4 tw-py-2 tw-font-normal tw-text-gray-700 tw-border tw-border-solid tw-border-gray-300 tw-rounded  focus:tw-border-teal-600 focus:tw-outline-none'></input>
        </div>

        <div className='tw-text-left'>
          <label className='tw-text-sm'>City</label>
          <br />
          <input
            type='text'
            placeholder='Enter city'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
            className='tw-w-96 tw-mb-3 tw-px-4 tw-py-2 tw-font-normal tw-text-gray-700 tw-border tw-border-solid tw-border-gray-300 tw-rounded  focus:tw-border-teal-600 focus:tw-outline-none'></input>
        </div>

        <div className='tw-text-left'>
          <label className='tw-text-sm'>Postal Code</label>
          <br />
          <input
            type='text'
            placeholder='Enter postal code'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
            className='tw-w-96 tw-mb-3 tw-px-4 tw-py-2 tw-font-normal tw-text-gray-700 tw-border tw-border-solid tw-border-gray-300 tw-rounded  focus:tw-border-teal-600 focus:tw-outline-none'></input>
        </div>

        <div className='tw-text-left'>
          <label className='tw-text-sm'>Country</label>
          <br />
          <input
            type='text'
            placeholder='Enter country'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
            className='tw-w-96 tw-mb-3 tw-px-4 tw-py-2 tw-font-normal tw-text-gray-700 tw-border tw-border-solid tw-border-gray-300 tw-rounded  focus:tw-border-teal-600 focus:tw-outline-none'></input>
        </div>

        <AppButton type='submit'>Continue</AppButton>
      </form>
    </div>
  );
};

export default ShippingScreen;
