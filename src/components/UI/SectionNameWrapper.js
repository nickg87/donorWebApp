import React from 'react';
import classes from './SectionNameWrapper.module.scss';

const SectionNameWrapper = ({ icon, text, theme, onClick, extra }) => {
  return (
        <div onClick={onClick} className={`                
                flex 
                items-center 
                justify-center 
                gap-2 
                p-2 px-4
                rounded-full  
                inset-0 
                transition-all 
                duration-300 
                hover:bg-opacity-90 ${classes.sectionNameContentWrapper} ${classes[theme]} ${extra}`}>
          {icon && icon}
          {text && text}
        </div>
  );
};

export default SectionNameWrapper;
