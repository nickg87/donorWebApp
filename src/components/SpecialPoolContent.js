"use client";

import React from 'react';
import DevCurrentLists from "./DevCurrentLists";
import PoolCurrentTransactionList from "@/components/PoolCurrentTransactionList";
import SocialDonationsSlider from '../components/SocialDonationsSlider';
import NewsArticlesSlider from '../components/NewsArticlesSlider';
import {useAppContext} from "@/contexts/AppContext";
import EtherScanComponent from "@/components/EtherScanComponent";
import DonationProgressComponent from "@/components/DonationProgressComponent";
import IconStar from "../../public/iconsax/star.svg";
import PageWrapper from "@/components/PageWrapper";
import {useTranslation} from "next-i18next";

const SpecialPoolContent = ({ pools, transactions, articles }) => {
  const { t, i18n } = useTranslation();
  const { globalState } = useAppContext();
  return (
    <PageWrapper
      theme={globalState?.theme}
      pageTitle={t('special.pageTitle')}
      sectionIcon={<IconStar className={`w-6 h-6`}/>}
      sectionNameText={t('special.linkText')}
      sectionTitleText={t('special.listTitleText')}
      sectionDecriptionText={t('special.secondaryText')}
    >
        <DonationProgressComponent type={'special'}/>
        <PoolCurrentTransactionList pool={globalState?.specialPool}/>
        <NewsArticlesSlider items={articles}/>
        <EtherScanComponent address={globalState?.specialPool?.eth_address} />
    </PageWrapper>
  );
};


export default SpecialPoolContent;