"use client";
// src/components/NewsArticlesSlider.js
import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {useTranslation} from "next-i18next";
import SectionNameWrapper from "@/components/UI/SectionNameWrapper";
import SwiperComponent from "@/components/UI/SwiperComponent";
import IconNote from "../../public/iconsax/note-2.svg";
import classes from "@/components/SocialDonationsSlider.module.scss";
import {useAppContext} from "@/contexts/AppContext";


const SocialDonationsSlider = ({items}) => {
  const { t, i18n } = useTranslation();
  const { globalState } = useAppContext();

  return (
    <>
      <div className="flex flex-col justify-center items-center py-4">
        <SectionNameWrapper icon={<IconNote className={`w-6 h-6`}/>} theme={globalState?.theme} text={t('sections.articles.name')} extra={'uppercase h-[50px] w-[200px]'}/>
      </div>
      <div className="flex flex-col justify-center items-center p-y4">
        <h2
          className={`${classes.sectionTitle} ${classes[globalState?.theme]} mt-4 mb-4`}>{t('sections.articles.title')}</h2>
        <p className="text-center text-600 m-8 text-[#8B91B5]" dangerouslySetInnerHTML={{
          __html: t('sections.articles.text'),
        }}/>
        <SwiperComponent items={items} type={'article'}/>
      </div>
    </>

  );
};

export default SocialDonationsSlider;
