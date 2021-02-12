import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center">
      <div
        className="spinner animate-spin ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"
        style={{ borderTopColor: '#4299e1' }}
      ></div>
    </div>
  );
};

export default Spinner;
