"use client";

import React from 'react';
import SocialDonations from '../components/SocialDonations';
import DonationComponent from './DonationComponent';
import DevCurrentLists from "./DevCurrentLists";

const MainContent = ({ pools, donors }) => {
  return (
      <>
        <DonationComponent pools={pools} donors={donors} />
        <SocialDonations />
      </>
  );
};


export default MainContent;