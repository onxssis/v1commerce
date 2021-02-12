import React from 'react';

interface IButtonProps {
  onClick?: any;
  className?: string;
  bg?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<IButtonProps> = ({ onClick, children, className, bg, disabled, type = 'button' }) => {
  return (
    <button
      className={`bg-${bg ?? 'blue'}-500 text-white active:bg-${bg ?? 'blue'}-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ${className} ${disabled && 'opacity-50 cursor-not-allowed pointer-events-none'}`}
      type={type}
      style={{ transition: 'all .15s ease' }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
