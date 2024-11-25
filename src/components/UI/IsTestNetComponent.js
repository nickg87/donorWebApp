import React from 'react';
import classes from './IsTestNetComponent.module.scss';
import IconDanger from "../../../public/iconsax/danger.svg";

const IsTestNetComponent = ({ theme }) => {
  return (
    <a href={'https://sepolia.etherscan.io/'} target="_blank"
      aria-label="Test Net - Sepolia"
      className={`fixed right-0 
                  flex items-center justify-center 
                  px-2 py-4 bg-yellow-500 
                  z-50 ${classes.isTestNetComponentWrapper} ${classes[theme]}`}
    >
      <IconDanger className={`w-6 h-6 mb-1 rotate-90`}/><IconDanger className={`w-6 h-6 mb-1 hidden sm:inline rotate-90`}/><IconDanger className={`w-6 h-6 mb-1 hidden sm:inline rotate-90`}/>
      <span className="hidden sm:inline">This is </span>Test Net - Sepolia
      <IconDanger className={`w-6 h-6 mt-1 rotate-90`}/><IconDanger className={`w-6 h-6 mt-1 hidden sm:inline rotate-90`}/><IconDanger className={`w-6 h-6 mt-1 hidden sm:inline rotate-90`}/>
    </a>
  );
};

export default IsTestNetComponent;
