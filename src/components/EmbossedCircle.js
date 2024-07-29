import React from 'react';


const EmbossedCircle = () => {
  const circleStyle = {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    margin:'3rem',
    //backgroundColor: '#f9f9f9', // Light grey background for better contrast
    boxShadow: `
      -10px -10px 20px rgba(255, 255, 255, 0.4), /* Top-left highlight */
      10px 10px 20px rgba(0, 0, 0, 0.3), /* Bottom-right shadow */
      inset -3px -3px 5px rgba(0, 0, 0, 0), /* Inner shadow */
      inset 3px 3px 5px rgba(255, 255, 255, 0.05) /* Inner highlight */
    `,
  };

  return <div style={circleStyle}></div>;
};

export default EmbossedCircle;