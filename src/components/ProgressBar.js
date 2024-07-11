"use client";

// src/components/ProgressBar.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';

const ProgressBar = () => {

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Simulate loading effect
    const timer = setTimeout(() => {
      //setLoading(false);
    }, 2000); // Simulate 2 seconds of loading time

    return () => clearTimeout(timer);
  }, []);

  // Dynamic width state for the progress bar
  const [progressWidth, setProgressWidth] = useState('5'); // Start at 5%

  // Function to simulate infinite loading animation
  useEffect(() => {
    const interval = setInterval(() => {
      // Toggle width between 25% and 95%
      setProgressWidth((prevWidth) =>
        prevWidth >= 100 ? 0 : prevWidth + 10
      );
    }, 500); // Adjust interval based on your animation speed

    return () => clearInterval(interval);
  }, [progressWidth]);


  return (
        loading && (
          <div className="m-2 p-4 flex justify-center items-center">
            <div className="w-full max-w-screen-sm mx-auto bg-gray-300 rounded-md shadow-md p-4">
              <div className="relative h-4 bg-gray-400 rounded-full overflow-hidden">
                <div  className="absolute top-0 left-0 h-full bg-blue-500" style={{ width: progressWidth + '%' }} ></div>
              </div>
              <div className="mt-4 flex justify-center items-center flex-col">
                <FontAwesomeIcon icon={faHandHoldingDollar} className="text-black w-24 h-24" />
                <p className="text-gray-600">Loading...</p>
              </div>
            </div>
          </div>
        ));
};


export default ProgressBar;