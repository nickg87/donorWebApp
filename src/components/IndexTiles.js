import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingDollar, faQrcode, faWallet } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'next-i18next';
import DApp from "@/components/walletconnect/DApp";
import QRCodeComponent from "@/components/QRCodeComponent";
import {useAppContext} from "@/contexts/AppContext";
import classes from './IndexTile.module.scss';
import ButtonWrapper from "@/components/UI/ButtonWrapper";

import ImgBlocks from "../../public/images/blocks.svg";
import ImgBlock from "../../public/images/block.svg";
import ImgColorBlocks from "../../public/images/colorBlocks.svg";

const IndexTiles = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('wallet'); // State to manage active tab
  const [loading, setLoading] = useState(false);
  const { globalState } = useAppContext();
  const currentPool = globalState?.currentPool;
  const poolPrizeAmount = currentPool?.prize_amount;
  const poolEntryAmount = currentPool?.entry_amount;
  const poolPrizeAmountInDollars = (parseFloat(poolPrizeAmount)*parseFloat(globalState.currentEthPrice?.lastPrice)).toFixed(2);
  const poolEntryAmountInDollars = (parseFloat(poolEntryAmount)*parseFloat(globalState.currentEthPrice?.lastPrice)).toFixed(2);
  const poolSize = poolPrizeAmount +' ETH (~' + poolPrizeAmountInDollars + ' $)';


  return (
    <>
      <div className="flex flex-col justify-center items-center p-4">
        <div className="sm:px-2 sm:py-0 md:p-4 w-full sticky top-0 z-[2]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-6"> {/* Use grid to create columns */}
            <div
              className={`p-8 rounded-[30px] ${classes.tileWrapper} ${classes[globalState?.theme]} border backdrop-blur-md ${globalState?.theme === 'dark' ? 'border-darkBorder bg-[#030A31] bg-opacity-80 shadow-darkTheme' : 'border-lightBorder bg-white/54 shadow-lightTheme'} `}>
              <div className="relative -mt-14 mb-6"> {/* Add negative margin here */}
                <ImgBlocks className={'w-16 h-16'}/>
              </div>
              <div dangerouslySetInnerHTML={{
                __html: t('firstTextTile', {
                  var1: poolEntryAmountInDollars
                }),
              }}/>
            </div>

            <div
              className={`p-8 rounded-[30px] ${classes.tileWrapper} ${classes[globalState?.theme]} border backdrop-blur-md ${globalState?.theme === 'dark' ? 'border-darkBorder bg-[#030A31] bg-opacity-80 shadow-darkTheme' : 'border-lightBorder bg-white/54 shadow-lightTheme'} `}>
              <div className="relative -mt-14 mb-6">
                <ImgBlock className={'w-16 h-16'}/>
              </div>
              <div dangerouslySetInnerHTML={{
                __html: t('secondTextTile', {
                  var1: poolEntryAmountInDollars,
                  var2: poolPrizeAmountInDollars
                }),
              }}/>
            </div>

            <div
              className={`p-8 rounded-[30px] ${classes.tileWrapper} ${classes[globalState?.theme]} border backdrop-blur-md ${globalState?.theme === 'dark' ? 'border-darkBorder bg-[#030A31] bg-opacity-80 shadow-darkTheme' : 'border-lightBorder bg-white/54 shadow-lightTheme'} `}>
              <div className="relative -mt-14 mb-6">
                <ImgColorBlocks className={'w-16 h-16'}/>
              </div>
              <div dangerouslySetInnerHTML={{
                __html: t('thirdTextTile'),
              }}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexTiles;
