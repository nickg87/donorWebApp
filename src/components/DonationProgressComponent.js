"use client";
// src/components/ProgressBar.js
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import ProgressBarComponent from "@/components/ProgressBarComponent";
import DonateButton from "@/components/DonateButton";
import {useAppContext} from "@/contexts/AppContext";

// New component to fetch ETH price from Binance
const ETHPrice = () => {
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);

  const { globalState, updateCurrentEthPrice} = useAppContext();

  useEffect(() => {
    // Fetch ETH price from Binance API
    const fetchETHPrice = async () => {
      try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT');
        if (!response.ok) {
          throw new Error('Failed to fetch ETH price');
        }
        const data = await response.json();
        const formattedPrice = parseFloat(data.price).toFixed(2)
        setPrice(formattedPrice); // Keep the price to two decimal places
        updateCurrentEthPrice(formattedPrice);
      } catch (err) {
        console.error(err);
        setError('Could not fetch price');
      }
    };
    
    // Fetch ETH price from Binance API
    const fetchETH24Change = async () => {
      try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT');
        if (!response.ok) {
          throw new Error('Failed to fetch ETH price');
        }
        const data = await response.json();
        //console.log(data);
        const formattedPrice = parseFloat(data?.lastPrice).toFixed(2)
        setPrice(formattedPrice); // Keep the price to two decimal places
        updateCurrentEthPrice(data);
      } catch (err) {
        console.error(err);
        setError('Could not fetch price');
      }
    };

    //fetchETHPrice();
    fetchETH24Change();

    // Optionally, you could add a timer to fetch periodically, e.g., every minute
    const interval = setInterval(fetchETH24Change, 6000000); // Refresh every 6000 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  // If an error occurred during the fetch, display the error message
  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  // While fetching, show a loading indicator or some placeholder
  if (!price) {
    return <p className={`text-center ${globalState?.theme === 'dark' ? 'text-white' : 'text-black'}`}>Loading ETH price...</p>;
  }

  return <p className={`text-center ${globalState?.theme === 'dark' ? 'text-white' : 'text-black'}`}>Current ETH Price: ${price} USD <span>({parseFloat(globalState?.currentEthPrice?.priceChangePercent) > 0 && '+'}{globalState?.currentEthPrice?.priceChangePercent}%)</span></p>;
};

const DonationProgressComponent = () => {
  const { t, i18n } = useTranslation();
  const { globalState } = useAppContext();
  const poolPrizeAmount = globalState.currentPool?.prize_amount;
  const poolEntryAmount = globalState.currentPool?.entry_amount;
  const poolPrizeAmountInDollars = (parseFloat(poolPrizeAmount)*parseFloat(globalState.currentEthPrice?.lastPrice)).toFixed(2);
  const poolEntryAmountInDollars = (parseFloat(poolEntryAmount)*parseFloat(globalState.currentEthPrice?.lastPrice)).toFixed(2);
  const poolSize = poolPrizeAmount +' ETH (~' + poolPrizeAmountInDollars + ' $)';
  // console.log(globalState.currentEthPrice);
  // console.log(poolPrizeAmountInDollars);

  return (
    <>
      <div className="mx-auto p-4">
        <ETHPrice />
        <h1 className={`text-3xl font-semibold text-center mb-2 ${globalState?.theme === 'dark' ? 'text-white' : 'text-black'}`}>{t("welcomeCurrentPool", { var1: poolSize  })}</h1>
        <h2 className={`text-center mb-6 ${globalState?.theme === 'dark' ? 'text-white' : 'text-black'}`}>
          {t("welcomeCurrentPoolSubText")}
        </h2>
        <ProgressBarComponent />
        <DonateButton />
        <blockquote className="text-center mb-2 leading-8 enhanceText" dangerouslySetInnerHTML={{
          __html: t('welcomeCurrentPoolDescriptionText', { var1: '~$' + poolEntryAmountInDollars + ' in ETH', var2: '$' + poolPrizeAmountInDollars + ' in ETH' }),
        }} />
      </div>
    </>
  );
};

export default DonationProgressComponent;
