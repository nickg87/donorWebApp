"use client";
// src/components/SocialDonations.js
import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {useTranslation} from "next-i18next";
import SectionNameWrapper from "@/components/UI/SectionNameWrapper";
import SwiperComponent from "@/components/UI/SwiperComponent";
import IconHearts from "../../public/iconsax/lovely-l.svg";
import classes from "@/components/SocialDonationsSlider.module.scss";
import {useAppContext} from "@/contexts/AppContext";


const SocialDonationsSlider = () => {
  const { t, i18n } = useTranslation();
  const { globalState } = useAppContext();

  const usePlaceholder = true;
  const items = [
    { id: 1, image: '/donor-image-1.jpg', text: 'Donation Pool 1', prize: '0.02 ETH' },
    { id: 2, image: '/donor-image-2.jpg', text: 'Donation Pool 2', prize: '0.024 ETH' },
    { id: 3, image: '/donor-image-3.jpg', text: 'Donation Pool 3', prize: '0.026 ETH' },
    { id: 4, image: '/donor-image-4.jpg', text: 'Donation Pool 4', prize: '0.03 ETH' },
    // { id: 5, image: '/donor-image-5.jpg', text: 'Donation Pool 5' },
    // { id: 6, image: '/donor-image-6.jpg', text: 'Donation Pool 6' },
    // { id: 7, image: '/donor-image-7.jpg', text: 'Donation Pool 7' },
    // { id: 8, image: '/donor-image-8.jpg', text: 'Donation Pool 8' },
  ];

  const itemsPlaceholder = [
    { id: 1, image: '/images/placeholder.svg', text: 'Donation Pool 1', prize: '0.02 ETH' },
    { id: 2, image: '/images/placeholder.svg', text: 'Donation Pool 2', prize: '0.02 ETH' },
    { id: 3, image: '/images/placeholder.svg', text: 'Donation Pool 3', prize: '0.02 ETH' },
    { id: 4, image: '/images/placeholder.svg', text: 'Donation Pool 4', prize: '0.02 ETH' },
    { id: 5, image: '/images/placeholder.svg', text: 'Donation Pool 5', prize: '0.02 ETH' },
    { id: 6, image: '/images/placeholder.svg', text: 'Donation Pool 6', prize: '0.02 ETH' },
    { id: 7, image: '/images/placeholder.svg', text: 'Donation Pool 7', prize: '0.02 ETH' },
    { id: 8, image: '/images/placeholder.svg', text: 'Donation Pool 8', prize: '0.02 ETH' },
  ];

  const swipeItems = usePlaceholder ? itemsPlaceholder : items;

  return (
    <>
      <div className="flex flex-col justify-center items-center py-4">
        <SectionNameWrapper icon={<IconHearts className={`w-6 h-6`}/>} theme={globalState?.theme}
                            text={t('sections.pools.name')} extra={'uppercase h-[50px] w-[200px]'}/>
      </div>
      <div className="flex flex-col justify-center items-center p-y4">
        <h2
          className={`${classes.sectionTitle} ${classes[globalState?.theme]} mt-4 mb-4`}>{t('sections.pools.title')}</h2>
        <p className="text-center text-600 m-8 text-[#8B91B5]" dangerouslySetInnerHTML={{
          __html: t('sections.pools.text'),
        }}/>
        <SwiperComponent items={swipeItems}/>
      </div>
    </>

  );
};

export default SocialDonationsSlider;
