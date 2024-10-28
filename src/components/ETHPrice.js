"use client";
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import {useAppContext} from "@/contexts/AppContext";
import classes from './ETHPrice.module.scss';
import IconETH from "../../public/iconsax/ethereum-classic-(etc).svg";

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

  return <div className={[classes.currentPrice, 'text-center', 'mt-0', 'sm:mt-4', 'm-4', 'justify-center', 'flex', globalState?.theme].join(' ')}>
    <p
    className={`flex flex-col sm:flex-row text-center align-middle justify-center items-center gap-1 ${globalState?.theme === 'dark' ? 'text-inherit' : 'text-inherit'}`}>
      <IconETH className={`h-[24px] w-[24px]`} />
      Current ETH Price:
    ${price} USD <span><b>({parseFloat(globalState?.currentEthPrice?.priceChangePercent) > 0 && '+'}{globalState?.currentEthPrice?.priceChangePercent}%)</b></span>
  </p></div>;
};


export default ETHPrice;
