"use client";

import React from 'react';
import DevCurrentLists from "./DevCurrentLists";
import PoolCurrentTransactionList from "@/components/PoolCurrentTransactionList";
import SocialDonationsSlider from '../components/SocialDonationsSlider';
import {useAppContext} from "@/contexts/AppContext";
import EtherScanComponent from "@/components/EtherScanComponent";
import DonationProgressComponent from "@/components/DonationProgressComponent";

const MainContent = ({ pools, transactions }) => {
  const { globalState } = useAppContext();
  return (
      <>
        <DonationProgressComponent pools={pools} transactions={transactions}/>
        <PoolCurrentTransactionList pool={globalState?.currentPool}/>
        <SocialDonationsSlider />
        <EtherScanComponent address={globalState?.currentPool?.eth_address} />
      </>
  );
};


export default MainContent;