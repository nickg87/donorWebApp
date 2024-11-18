import Link from "next/link";
import React from "react";
import classes from './SliderItem.module.scss';
import {useAppContext} from "@/contexts/AppContext";
import {useTranslation} from "next-i18next";
import IconDollar from "../../../public/iconsax/dollar-circle.svg";
import IconClock from "../../../public/iconsax/clock-1.svg";
import {getTimeAgo} from "@/utils/helpers";

const SliderItem = ({ item, type }) => {

  const { t,i18n } = useTranslation();
  const { globalState } = useAppContext();

  if (type === 'article') {
    item.image = item.files?.[0]?.path ? `${item.files[0].path}` : '/images/placeholder.svg';
    item.text = item.title[i18n.language];
  }

  return (
    <div
      className={`rounded-[30px] mb-10 mx-1 ${classes[globalState?.theme]} border backdrop-blur-md ${globalState?.theme === 'dark' ? 'border-darkBorder bg-[#030A31] bg-opacity-80 shadow-darkTheme' : 'border-lightBorder bg-white/54 shadow-lightTheme'} `}>
      <img
        src={item.image}
        alt={item.text}
        title={item.text}
        className="w-full h-60 object-cover rounded-[30px] rounded-b-none"
      />
      <div
        className={`${classes.sliderDetailItemWrapper} ${classes[globalState?.theme]} p-6 flex flex-col align-center items-start`}>
        <div
          className={`${classes.sliderDetailItemIconWrapper} ${classes[globalState?.theme]} flex align-center gap-2 items-center`}>
          { (type === 'article') ? <IconClock className={`${classes[globalState?.theme]} w-6 h-6`}/> : <IconDollar className={`${classes[globalState?.theme]} w-6 h-6`}/> }
          <span className="text-xs text-inherit">{(type === 'article') ? t('general.timeAgo', {var1: getTimeAgo(item.created_at, i18n.language)}) : item.prize}</span>
        </div>
        <div className={`${classes.sliderDetailTitleWrapper} ${classes[globalState?.theme]} text-left`}>
          { (type === 'article') ?
            <Link href={`/blog/${item.slug}`}>
            {item.text}
          </Link> : item.text }
        </div>
      </div>

    </div>


  );
};

export default SliderItem;



