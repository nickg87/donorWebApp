import React from 'react';
import classes from './ThemeSwitcher.module.scss';
import Image from 'next/image';
import {useAppContext} from "@/contexts/AppContext";
import Sun from "../../../public/iconsax/sun-1.svg";
import Moon from "../../../public/iconsax/moon.svg";

const ThemeSwitcher = () => {
  const { globalState, updateCurrentTheme } = useAppContext();

  const toggleTheme = () => {
    let theme = globalState.theme === 'dark' ? 'light' : 'dark';
    updateCurrentTheme(theme)
  };

  return (
    <button onClick={toggleTheme} className={`${classes.themeSwitcher} ${classes[globalState.theme]} themeSwitcher`} title={`Switch to ${globalState.theme === 'dark' ? 'Light' : 'Dark'} theme`}>
      <div className={`${classes.switchToggle} ${classes[globalState.theme]} `}>
        <div className={`${classes.iconWrapper} ${classes[globalState.theme]}`}>
          {globalState.theme === 'light' ? (
            <Sun className={`w-6 h-6 text-white`} /> // Apply color for light theme
          ) : (
            <Moon className={`w-6 h-6 text-white`} /> // Apply color for dark theme
          )}
        </div>
      </div>


    </button>
  );
};

export default ThemeSwitcher;
