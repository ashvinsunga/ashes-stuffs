import React from 'react';

const AppButton = ({ children }) => {
  return (
    <div>
      {' '}
      <button className='tw-px-7 tw-py-3 tw-mb-4 tw-btn-sm tw-text-black tw-font-medium tw-text-sm tw-uppercase tw-bg-teal-400 hover:tw-bg-teal-200 tw-rounded tw-shadow-md'>
        {children}
      </button>
    </div>
  );
};

export default AppButton;
