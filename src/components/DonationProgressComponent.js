"use client";
// src/components/ProgressBar.js
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import ProgressBarComponent from "@/components/ProgressBarComponent";
import RoundedCircleProgressBar from "@/components/RoundedCircleProgressBar";
import DonateButton from "@/components/DonateButton";
import IndexTiles from "@/components/IndexTiles";
import ETHPrice from "@/components/ETHPrice";
import {useAppContext} from "@/contexts/AppContext";
import classes from './DonationProgressComponent.module.scss';

const DonationProgressComponent = ({...props}) => {
  const {t, i18n} = useTranslation();
  const isSpecial = props?.type === 'special';
  const {globalState} = useAppContext();
  // console.log(globalState);
  // console.log(isSpecial);
  let whatPool = 'currentPool';
  if (isSpecial) {
    whatPool = 'specialPool';
  }
  const poolPrizeAmount = globalState[whatPool]?.prize_amount;
  const poolEntryAmount = globalState[whatPool]?.entry_amount;
  const poolPrizeAmountInDollars = (parseFloat(poolPrizeAmount)*parseFloat(globalState.currentEthPrice?.lastPrice)).toFixed(2);
  const formattedPrizeAmount = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(poolPrizeAmountInDollars);
  const poolEntryAmountInDollars = (parseFloat(poolEntryAmount)*parseFloat(globalState.currentEthPrice?.lastPrice)).toFixed(2);
  const poolSize = poolPrizeAmount +' ETH (~' + formattedPrizeAmount + ' $)';
  // console.log(globalState.currentEthPrice);
  // console.log(poolPrizeAmountInDollars);

  return (
    <>
      <div className={`mx-auto py-4  ${globalState?.theme === 'dark' ? 'text-white' : 'text-black'}`}>
        <ETHPrice />
        {isSpecial ?
          <>
            <h1
              className={`text-3xl font-semibold text-center mb-2 ${globalState?.theme === 'dark' ? 'text-white' : 'text-black'}`}>{t("special.welcomeCurrentPool", {var1: poolSize})}</h1>
            <h2 className={`text-center mb-6 ${globalState?.theme === 'dark' ? 'text-white' : 'text-black'}`}>
              {t("special.welcomeCurrentPoolSubText")}
            </h2>
          </> :
          <>
            <h1
              className={`text-3xl font-semibold text-center mb-2 ${globalState?.theme === 'dark' ? 'text-white' : 'text-black'}`}>{t("welcomeCurrentPool", {var1: poolSize})}</h1>
            <h2 className={`text-center mb-6 ${globalState?.theme === 'dark' ? 'text-white' : 'text-black'}`}>
            {t("welcomeCurrentPoolSubText")}
            </h2>
          </>
        }

        {/*<ProgressBarComponent />*/}
        <RoundedCircleProgressBar isSpecial={isSpecial}/>
        <DonateButton isSpecial={isSpecial}/>
        {!isSpecial && <IndexTiles/> }
      </div>
    </>
  );
};

export default DonationProgressComponent;
