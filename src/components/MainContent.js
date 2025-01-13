"use client";

import React from 'react';
import DevCurrentLists from "./DevCurrentLists";
import PoolCurrentTransactionList from "@/components/PoolCurrentTransactionList";
import SocialDonationsSlider from '../components/SocialDonationsSlider';
import NewsArticlesSlider from '../components/NewsArticlesSlider';
import {useAppContext} from "@/contexts/AppContext";
import EtherScanComponent from "@/components/EtherScanComponent";
import DonationProgressComponent from "@/components/DonationProgressComponent";

const MainContent = ({ pools, transactions, articles }) => {
  // console.log('articles:');
  // console.log(articles);
  // console.log('transactions:');
  // console.log(transactions);
  // console.log('pools:');
  // console.log(pools);
  // Filter pools of type "social"
  const socialPools = pools.filter((pool) => pool.type === "social" && pool.active === true );

  const { globalState } = useAppContext();
  return (
    <>
      <div
        className="bg-gradient-to-r from-yellow-300 via-red-400 to-pink-500 text-white text-center py-4 px-6 rounded-md shadow-lg mt-6 mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold mb-2">We've asked, and you answered!</h1>
        <p className="text-lg">
          DonorHub is now <span className="font-extrabold text-white">LuckyHub</span>
        </p>
      </div>
      <DonationProgressComponent pools={pools} transactions={transactions}/>
      <PoolCurrentTransactionList pool={globalState?.currentPool}/>
      <SocialDonationsSlider pools={socialPools}/>
      <NewsArticlesSlider items={articles}/>

    </>
  );
};


export default MainContent;