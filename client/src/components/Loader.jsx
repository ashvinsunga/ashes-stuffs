import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner
      className='tw-mt-10'
      animation='grow'
      role='status'
      style={{
        width: '50px',
        height: '50px',
        margin: 'auto',
        display: 'block',
      }}>
      <span className='sr-only'>Loading...</span>
    </Spinner>
  );
};

export default Loader;
