"use client";

// src/components/MainContent.js
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import SocialDonations from '../components/SocialDonations';

const MainContent = () => {

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
  }, []);

  return (
    <Layout>
      <>
        <div className="bg-gray-700 m-2 p-4 flex rounded-md shadow-md">
          <div className="w-full max-w-screen-sm mx-auto">
            <h1 className="text-2xl font-bold text-gray-100">Welcome to My App</h1>
            <p className="text-gray-200 mt-2">
              Get started by editing <code className="text-blue-600">src/app/pages.js</code>
            </p>
          </div>

        </div>
        {loading && (
          <div className="m-2 p-4 flex justify-center items-center">
            <div className="w-full max-w-screen-sm mx-auto bg-gray-300 rounded-md shadow-md p-4">
                <div className="relative h-4 bg-gray-400 rounded-full overflow-hidden">
                      <div  className="absolute top-0 left-0 h-full bg-blue-500" style={{ width: progressWidth + '%' }} ></div>
                </div>
                <div className="mt-4 flex justify-center">
                  <p className="text-gray-600">Loading...</p>
                </div>
            </div>
          </div>
          )}
        <>
          {/* Existing content here */}
          <SocialDonations />
        </>
      </>
    </Layout>
  );
};


export default MainContent;