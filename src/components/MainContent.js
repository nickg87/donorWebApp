"use client";

import React from 'react';
import SocialDonations from '../components/SocialDonations';
import DevCurrentLists from "./DevCurrentLists";
import PoolCurrentTransactionList from "@/components/PoolCurrentTransactionList";
import {useAppContext} from "@/contexts/AppContext";
import EtherScanComponent from "@/components/EtherScanComponent";
import DonationProgressComponent from "@/components/DonationProgressComponent";

const MainContent = ({ pools, transactions }) => {
  const { globalState } = useAppContext();
  return (
      <>
        <DonationProgressComponent pools={pools} transactions={transactions}/>
        <PoolCurrentTransactionList pool={globalState?.currentPool}/>
        <EtherScanComponent address={globalState?.currentPool?.eth_address} />
        <SocialDonations />
      </>
  );
};


export default MainContent;