"use client";

// src/components/ProgressBar.js
import React, { useState, useEffect, Suspense } from 'react';
import { useTranslation } from 'next-i18next';

import { useAppContext } from '../contexts/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';

import dynamic from "next/dynamic";
import ProgressBarComponent from "@/components/ProgressBarComponent";
import EmbossedCircle from "@/components/EmbossedCircle";
const GaugeComponent = dynamic(() => import('react-gauge-component'), { ssr: false });


const DonationProgressComponent = () => {
  const { globalState, setGlobalState } = useAppContext();
  const { t, i18n } = useTranslation();

  //console.log(globalState);

  // useEffect(() => {
  //     // Simulate loading effect
  //     const timer = setTimeout(() => {
  //       setLoading(false);
  //     }, 2000); // Simulate 2 seconds of loading time
  //
  //     return () => clearTimeout(timer);
  // }, []);

  // Dynamic width state for the progress bar
  const [progressWidth, setProgressWidth] = useState(globalState.balance ? globalState.balance * 10 : 0); // Start at 5%

  //console.log(progressWidth);

  useEffect(() => {
    setProgressWidth(globalState.balance * 10);
  }, [globalState.balance]);


  // Function to simulate infinite loading animation
  // useEffect(() => {
  //     const interval = setInterval(() => {
  //       // Toggle width between 25% and 95%
  //       setProgressWidth((prevWidth) =>
  //         prevWidth >= 100 ? 0 : prevWidth + 10
  //       );
  //     }, 3000); // Adjust interval based on your animation speed
  //
  //     return () => clearInterval(interval);
  //
  // }, [progressWidth, globalState.amount]);


  return (

      <>
        <div className="mx-auto p-4">
          <h1 className="text-3xl font-semibold text-center mb-2">{t("welcomeCurrentPool", {var1: '500$'})}</h1>
          <h2 className="text-center text-white-600 mb-6">
            {t("welcomeCurrentPoolSubText")}
          </h2>
          <blockquote className="text-center mb-2 leading-8 enhanceText" dangerouslySetInnerHTML={{
            __html: t('welcomeCurrentPoolDescriptionText', { var1: '$10 USDT', var2: '$500 USDT' }),
          }} />
          <ProgressBarComponent />
          {/*<EmbossedCircle size={300}>*/}
          {/*  <GaugeComponent*/}
          {/*    type="radial"*/}
          {/*    arc={{*/}
          {/*      //colorArray: ['#fff', '#fff'],*/}
          {/*      colorArray: ['#833AB4FF', '#FD1D1DFF'],*/}
          {/*      padding: 0.02,*/}
          {/*      subArcs: [*/}
          {/*        {limit: 25},*/}
          {/*        {limit: 50},*/}
          {/*        {limit: 95},*/}
          {/*        {}*/}
          {/*      ]*/}
          {/*    }}*/}
          {/*    labels={{*/}
          {/*      valueLabel: {*/}
          {/*        style: {fill: 'white', fontSize: 45, textShadow: 'unset'}*/}
          {/*      },*/}
          {/*      tickLabels: {*/}
          {/*        hideMinMax: true,*/}
          {/*        type: "inner",*/}
          {/*        defaultTickValueConfig: {*/}
          {/*          style: {fill: 'white'}*/}
          {/*        }*/}
          {/*      }*/}
          {/*    }}*/}
          {/*    pointer={{ color:'#d54c03', animationDelay: 0}}*/}
          {/*    value={progressWidth}*/}
          {/*  />*/}
          {/*</EmbossedCircle>*/}

          {/*old gauge*/}
          {/*<GaugeComponent*/}
          {/*  type="semicircle"*/}
          {/*  arc={{*/}
          {/*    colorArray: ['#00FF15', '#FF2121'],*/}
          {/*    padding: 0.02,*/}
          {/*    subArcs: [*/}
          {/*      {limit: 25},*/}
          {/*      {limit: 50},*/}
          {/*      {limit: 60},*/}
          {/*      {limit: 70},*/}
          {/*      {limit: 95},*/}
          {/*      {},*/}
          {/*      {},*/}
          {/*      {}*/}
          {/*    ]*/}
          {/*  }}*/}
          {/*  pointer={{type: "blob", animationDelay: 0}}*/}
          {/*  value={progressWidth}*/}
          {/*/>*/}
        </div>
      </>
  )
    ;
};


export default DonationProgressComponent;