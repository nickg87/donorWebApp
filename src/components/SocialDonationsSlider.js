"use client";
// src/components/SocialDonations.js
import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useTranslation } from "next-i18next";
import SectionNameWrapper from "@/components/UI/SectionNameWrapper";
import SwiperComponent from "@/components/UI/SwiperComponent";
import IconHearts from "../../public/iconsax/lovely-l.svg";
import classes from "@/components/SocialDonationsSlider.module.scss";
import { useAppContext } from "@/contexts/AppContext";

const SocialDonationsSlider = ({ pools }) => {
  const { t } = useTranslation();
  const { globalState } = useAppContext();

  // Create swipeItems dynamically
  const swipeItems = pools?.length
    ? pools.map((pool) => ({
      id: pool.id,
      image: '/images/placeholder.svg', // Placeholder image for now
      text: pool.title.en || 'Untitled Pool', // Use the English title or a fallback
      prize: `${pool.prize_amount || '0.00'} ETH`, // Prize amount with fallback
      is_test_net: pool.is_test_net
    }))
    : [];

  if (!swipeItems.length) return null;

  return (
    <>
      <div className="flex flex-col justify-center items-center py-4">
        <SectionNameWrapper
          icon={<IconHearts className="w-6 h-6" />}
          theme={globalState?.theme}
          text={t('sections.pools.name')}
          extra="uppercase h-[50px] w-[200px]"
        />
      </div>
      <div className="flex flex-col justify-center items-center py-4">
        <h2
          className={`${classes.sectionTitle} ${classes[globalState?.theme]} mt-4 mb-4`}
        >
          {t('sections.pools.title')}
        </h2>
        <p
          className="text-center text-600 m-8 text-[#8B91B5]"
          dangerouslySetInnerHTML={{
            __html: t('sections.pools.text'),
          }}
        />
        <SwiperComponent items={swipeItems} />
      </div>
    </>
  );
};

export default SocialDonationsSlider;
