import React, { useState, useEffect } from 'react';

const EmbossedCircle = (props) => {
  const [circleSize, setCircleSize] = useState(getCircleSize());

  useEffect(() => {
    // Debounce function to limit the number of resize event handler calls
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setCircleSize(getCircleSize());
      }, 300); // Adjust the debounce delay as needed
    };

    if (typeof window !== 'undefined') {
      // Only add event listener if window is available
      window.addEventListener('resize', handleResize);
    }

    // Cleanup event listener on component unmount
    return () => {
      if (typeof window !== 'undefined') {
        setCircleSize(getCircleSize());
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  function getCircleSize() {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) { // Example breakpoint for mobile
      const smallerDimension = Math.min(window.innerWidth, window.innerHeight);
      let sizeToReturn =`${smallerDimension * 0.8}px`;
      return sizeToReturn;
    } else {
      return props.size ?? '200px';
    }
  }

  // console.log('circleSize');
  // console.log(circleSize);

  let circleStyle = {
    width: circleSize,
    height: circleSize,
    borderRadius: '50%',
    margin: '3rem auto',
    backgroundColor: 'rgba(41,41,41,0.15)',
    boxShadow: `
      -20px -20px 40px rgba(255, 255, 255, 0.2),
      20px 20px 40px rgba(0, 0, 0, 0.2),
      inset -3px -3px 5px rgba(0, 0, 0, 0),
      inset 3px 3px 5px rgba(255, 255, 255, 0.05)
    `,
  };

  return <div style={circleStyle}>{props.children}</div>;
};

export default EmbossedCircle;
