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
    <Form
      onSubmit={submitHandler}
      className='tw-grid tw-grid-cols-2 tw-mt-2 tw-justify-items-start'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='ms-sm-2 ml-sm-5 tw-h-12'></Form.Control>
      <Button
        type='submit'
        className='tw-w-28 tw-h-12 tw-ml-4 tw-rounded-md tw-bg-green-600 hover:tw-bg-green-500 focus:tw-bg-green-600 focus:tw-ring-0'>
        <strong>GO</strong>
      </Button>
    </Form>
  );
};

export default SearchBox;
