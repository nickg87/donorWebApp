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

const DonationProgressComponent = () => {
  const {t, i18n} = useTranslation();
  const {globalState} = useAppContext();
  const poolPrizeAmount = globalState.currentPool?.prize_amount;
  const poolEntryAmount = globalState.currentPool?.entry_amount;
  const poolPrizeAmountInDollars = (parseFloat(poolPrizeAmount)*parseFloat(globalState.currentEthPrice?.lastPrice)).toFixed(2);
  const poolEntryAmountInDollars = (parseFloat(poolEntryAmount)*parseFloat(globalState.currentEthPrice?.lastPrice)).toFixed(2);
  const poolSize = poolPrizeAmount +' ETH (~' + poolPrizeAmountInDollars + ' $)';
  // console.log(globalState.currentEthPrice);
  // console.log(poolPrizeAmountInDollars);

  return (
    <>
      <div className={`mx-auto py-4  ${globalState?.theme === 'dark' ? 'text-white' : 'text-black'}`}>
        <ETHPrice />
        <h1 className={`text-3xl font-semibold text-center mb-2 ${globalState?.theme === 'dark' ? 'text-white' : 'text-black'}`}>{t("welcomeCurrentPool", { var1: poolSize  })}</h1>
        <h2 className={`text-center mb-6 ${globalState?.theme === 'dark' ? 'text-white' : 'text-black'}`}>
          {t("welcomeCurrentPoolSubText")}
        </h2>
        {/*<ProgressBarComponent />*/}
        <RoundedCircleProgressBar />
        <DonateButton />
        <IndexTiles />
      </div>
    </>
  );
};

export default DonationProgressComponent;
