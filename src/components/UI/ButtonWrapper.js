import React from 'react';
import classes from './ButtonWrapper.module.scss';

const ButtonWrapper = ({ children, icon, text, theme, onClick, disabled, extra }) => {
  return (
      <button onClick={onClick} disabled={disabled}
              className={`
                relative
                flex 
                rounded-full 
                items-center 
                justify-center 
                overflow-hidden
                h-auto 
                w-auto 
                px-2
                py-4
                ${classes.buttonWrapperStyle} 
                ${classes[theme]} 
                ${extra}
                `}>
        <div className={`                
                flex 
                items-center 
                justify-center 
                gap-2 
                rounded-full 
                text-white 
                transition-all 
                duration-300 
                ${extra}
                hover:bg-opacity-90 ${classes.buttonContentWrapper} ${classes[theme]} `}>
          {icon && icon}
          {text && text}
          {children}
        </div>
      </button>
  );
};

export default ButtonWrapper;
