"use client";
// src/components/MainContent.js
import React, { useState, useEffect } from 'react';
import SocialDonations from '../components/SocialDonations';
import DonationProgressComponent from './DonationProgressComponent';
import DonationComponent from './DonationComponent';
import Head from 'next/head';
import DevCurrentLists from "./DevCurrentLists";

const MainContent = ({ pools, donors }) => {
  let dev = false;
  return (
      <>
        <Head>
        <title>Home Page | DonorHub App</title>
        </Head>
        <DonationProgressComponent />
        <DonationComponent />
        { dev && <DevCurrentLists pools={pools} donors={donors}/> }
        <SocialDonations />
      </>
  );
};


export default MainContent;