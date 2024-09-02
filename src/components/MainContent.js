"use client";

import React from 'react';
import SocialDonations from '../components/SocialDonations';
import DonationComponent from './DonationComponent';
import DevCurrentLists from "./DevCurrentLists";

const MainContent = ({ pools, transactions }) => {
  return (
      <>
        <DonationComponent pools={pools} transactions={transactions} />
        <SocialDonations />
      </>
  );
};


export default MainContent;