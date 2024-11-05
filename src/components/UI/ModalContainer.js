import React, { useState,useEffect } from 'react';
import classes from "./ModalContainer.module.scss";

const ModalContainer = ({ children, show, theme }) => {

  return (
    <>
      {show && (
        <div className={`fixed z-[10] inset-0 ${theme === 'dark' ?  'bg-black' : 'bg-white'} ${classes.modalWrapper} bg-opacity-50 backdrop-filter backdrop-blur-lg overflow-y-auto flex items-center justify-center`}>
          <div className={`p-8 rounded-[30px]  max-w-full sm:max-w-[454px] mx-4 ${classes.modalContentWrapper} ${theme} border backdrop-blur-md ${theme === 'dark' ? 'border-darkBorder bg-[#030A31] bg-opacity-80 shadow-darkTheme' : 'border-lightBorder bg-white/54 shadow-lightTheme'} `}>
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
