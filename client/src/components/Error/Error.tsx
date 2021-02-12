import React from 'react';

interface IErrorProps {
  title: string;
  message?: string;
  onClose?: CallableFunction;
}

const Error: React.FC<IErrorProps> = ({
  title = '',
  message = '',
  onClose,
}) => {
  const handleOnClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (typeof onClose !== 'undefined') {
      onClose();
    }
  };

  return (
    <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-600">
      <span className="inline-block align-middle mr-8">
        <b>
          {title}! {message}
        </b>
      </span>
      {onClose && (
        <button
          className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
          onClick={handleOnClose}
        >
          <span>×</span>
        </button>
      )}
    </div>
  );
};

export default Error;
