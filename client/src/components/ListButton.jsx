import React from 'react';

const ListButton = ({ children, onClick }) => {
  return (
    <div>
      {' '}
      <button
        onClick={onClick}
        className='tw-px-7 tw-py-3 tw-btn-sm tw-text-black tw-text-sm tw-uppercase tw-bg-blue-100 hover:tw-bg-blue-300 tw-rounded tw-shadow-md'>
        <strong>{children}</strong>
      </button>
    </div>
  );
};

export default ListButton;
