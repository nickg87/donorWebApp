"use client";
// src/components/ProgressBar.js
import React, { useState, useEffect, Suspense } from 'react';
import { useTranslation } from 'next-i18next';
import ProgressBarComponent from "@/components/ProgressBarComponent";
import DonateButton from "@/components/DonateButton";

const DonationProgressComponent = () => {
  const { t, i18n } = useTranslation();

  return (

      <>
        <div className="mx-auto p-4">
          <h1 className="text-3xl font-semibold text-center mb-2">{t("welcomeCurrentPool", {var1: '500$'})}</h1>
          <h2 className="text-center text-white-600 mb-6">
            {t("welcomeCurrentPoolSubText")}
          </h2>
          <ProgressBarComponent />
          <DonateButton/>
          <blockquote className="text-center mb-2 leading-8 enhanceText" dangerouslySetInnerHTML={{
            __html: t('welcomeCurrentPoolDescriptionText', { var1: '$10 USDT', var2: '$500 USDT' }),
          }} />

        </div>
      </>
  )
    ;
};


export default DonationProgressComponent;