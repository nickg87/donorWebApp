"use client";
// src/components/ProgressBar.js
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import ProgressBarComponent from "@/components/ProgressBarComponent";
import DonateButton from "@/components/DonateButton";

// New component to fetch ETH price from Binance
const ETHPrice = () => {
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch ETH price from Binance API
    const fetchETHPrice = async () => {
      try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT');
        if (!response.ok) {
          throw new Error('Failed to fetch ETH price');
        }
        const data = await response.json();
        setPrice(parseFloat(data.price).toFixed(2)); // Keep the price to two decimal places
      } catch (err) {
        console.error(err);
        setError('Could not fetch price');
      }
    };

    fetchETHPrice();

    // Optionally, you could add a timer to fetch periodically, e.g., every minute
    const interval = setInterval(fetchETHPrice, 6000000); // Refresh every 6000 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  // If an error occurred during the fetch, display the error message
  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  // While fetching, show a loading indicator or some placeholder
  if (!price) {
    return <p className="text-center">Loading ETH price...</p>;
  }

  return <p className="text-center">Current ETH Price: ${price} USD</p>;
};

const DonationProgressComponent = () => {
  const { t, i18n } = useTranslation();
  const poolSize = 500;

  return (
    <>
      <div className="mx-auto p-4">
        <ETHPrice />
        <h1 className="text-3xl font-semibold text-center mb-2">{t("welcomeCurrentPool", { var1: poolSize + '$' })}</h1>
        <h2 className="text-center text-white-600 mb-6">
          {t("welcomeCurrentPoolSubText")}
        </h2>
        <ProgressBarComponent />
        <DonateButton />
        <blockquote className="text-center mb-2 leading-8 enhanceText" dangerouslySetInnerHTML={{
          __html: t('welcomeCurrentPoolDescriptionText', { var1: '$10 in ETH', var2: '$500 in ETH' }),
        }} />
      </div>
    </>
  );
};

export default DonationProgressComponent;
