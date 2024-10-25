import React from 'react';

const ButtonWrapper = ({ children, icon }) => {
  return (
    <div className="relative inline-block">
      <button className="flex items-center justify-center h-[50px] px-6 rounded-full text-white buttonStyle2 border border-transparent transition-all duration-300 hover:bg-opacity-90">
        {icon && <span className="mr-2">{icon}</span>} {/* Icon optional */}
        {children}
      </button>
    </div>
  );
};

export default ButtonWrapper;
