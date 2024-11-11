import React, { useState,useEffect } from 'react';
import classes from "./ModalContainer.module.scss";

const ModalContainer = ({ children, show, theme }) => {

  return (
    <>
      {show && (
        <div className={`fixed z-[10] inset-0 ${classes.modalWrapper} ${classes[theme]} bg-opacity-50 backdrop-filter backdrop-blur-lg overflow-y-auto flex items-center justify-center`}>
          <div className={`p-8 rounded-[30px]  max-w-full md:min-w-[500px] sm:max-w-[454px] mx-4 ${classes.modalContentWrapper} ${classes[theme]} ${theme} border backdrop-blur-md ${theme === 'dark' ? 'border-darkBorder shadow-darkTheme' : 'border-lightBorder shadow-lightTheme'} `}>
            <div className="flex flex-col">
              {children}
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default ModalContainer;
