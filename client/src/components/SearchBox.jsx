import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBox = ({ navigate }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} className='tw-grid tw-grid-cols-2'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='ms-sm-2 ml-sm-5'></Form.Control>
      <Button
        type='submit'
        variant='outline-success'
        className='tw-w-40 tw-ml-4'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
