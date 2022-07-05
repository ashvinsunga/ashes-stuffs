import React from 'react';

const AppButton = ({ children, onClick, disabled }) => {
  let activeButtonClass = disabled
    ? 'tw-cursor-not-allowed '
    : 'hover:tw-bg-teal-500 ';
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${activeButtonClass}tw-px-7 tw-py-3 tw-mb-4 tw-btn-sm tw-text-white tw-font-medium tw-text-sm tw-uppercase tw-bg-teal-600 tw-rounded tw-shadow-md`}>
      {children}
    </button>
  );
};

export default AppButton;
