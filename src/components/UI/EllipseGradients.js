import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import classes from './EllipseGradients.module.scss';

const EllipseGradients = () => {

  const { globalState } = useAppContext();

  return (
    <>
      <div className="absolute" style={{width: '100%', overflow: 'hidden'}}>
        <div
          className={[classes.topRightEllipseGradient, classes[globalState?.theme], globalState.theme === 'dark' ? 'darkTheme' : 'lightTheme'].join(' ')}/>
        <div
          className={[classes.leftEllipseGradient, classes[globalState?.theme], 'left-ellipse-gradient', globalState.theme === 'dark' ? 'darkTheme' : 'lightTheme'].join(' ')}/>
      </div>
      <div className={[classes.centerEllipseGradient, classes[globalState?.theme],  'center-ellipse-gradient', globalState.theme === 'dark' ? 'darkTheme' : 'lightTheme'].join(' ')}/>
    </>
  );
};

export default EllipseGradients;
