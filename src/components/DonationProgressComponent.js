"use client";

// src/components/ProgressBar.js
import React, { useState, useEffect, Suspense } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';

import dynamic from "next/dynamic";
const GaugeComponent = dynamic(() => import('react-gauge-component'), { ssr: false });


const DonationProgressComponent = () => {

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
    }, 3000); // Adjust interval based on your animation speed

    return () => clearInterval(interval);
  }, [progressWidth]);


  return (
    loading && (
      <>
        <div className="max-w-screen-sm mx-auto p-4">
          <h1 className="text-3xl font-semibold text-center mb-2">Current Donation Pool</h1>
          <h2 className="text-center text-white-600 mb-6">
            Help us reach our goal! Every contribution makes a difference.
          </h2>
          <blockquote className="text-center mb-2 leading-8 enhanceText">
            <p>The gauge below represents our current donation pool. Each donation is a fixed amount of <strong>$10 USDT</strong>, and our goal is to reach <strong>$500 USDT</strong>. </p>
            <p>Once we hit this target, the entire amount <strong>will be donated back to YOU </strong>, one lucky donor. </p>
            <p>It's a simple way to do good and potentially bring joy back into your life!</p>
          </blockquote>
          <GaugeComponent
            type="semicircle"
            arc={{
              colorArray: ['#00FF15', '#FF2121'],
              padding: 0.02,
              subArcs: [
                {limit: 25},
                {limit: 50},
                {limit: 60},
                {limit: 70},
                {limit: 95},
                {},
                {},
                {}
              ]
            }}
            pointer={{type: "blob", animationDelay: 0}}
            value={progressWidth}
          />
          <div className="flex justify-center p-4">
            <button
              className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-12 rounded-full flex items-center gradient-bg">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-2">
                <FontAwesomeIcon icon={faHandHoldingDollar}/>
              </div>
              <span className="text-2xl">DONATE NOW</span>
            </button>
          </div>
        </div>

      </>

    )
  )
    ;
};


export default DonationProgressComponent;