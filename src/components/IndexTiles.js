import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingDollar, faQrcode, faWallet } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'next-i18next';
import DApp from "@/components/walletconnect/DApp";
import QRCodeComponent from "@/components/QRCodeComponent";
import {useAppContext} from "@/contexts/AppContext";
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
              className={`p-8 rounded-[30px]  border backdrop-blur-md ${globalState?.theme === 'dark' ? 'border-darkBorder bg-[#030A31] bg-opacity-80 shadow-darkTheme' : 'border-lightBorder bg-white/54 shadow-lightTheme'} ${globalState?.theme === 'dark' ? 'text-white shadow-gray-900' : 'text-black shadow-gray-200'}`}>
              <div className="relative -mt-14 mb-6"> {/* Add negative margin here */}
                <ImgBlocks className={'w-16 h-16'}/>
              </div>
              <h3 className={'text-lg font-bold'}>Together, we can make a difference</h3>
              <span>Your donation helps reach the {'~$' + poolEntryAmountInDollars + ' in ETH'} goal for the current donation pool.</span>
            </div>

            <div
              className={`p-8 rounded-[30px]  border backdrop-blur-md ${globalState?.theme === 'dark' ? 'border-darkBorder bg-[#030A31] bg-opacity-80 shadow-lg' : 'border-lightBorder bg-white/54 shadow-lg'} ${globalState?.theme === 'dark' ? 'text-white shadow-gray-900' : 'text-black shadow-gray-200'}`}>
              <div className="relative -mt-14 mb-6">
                <ImgBlock className={'w-16 h-16'}/>
              </div>
              <h3 className={'text-lg font-bold'}>The Gauge shows current pool progress</h3>
              <span>Each donation is a fixed amount of <strong>${poolPrizeAmountInDollars} in ETH</strong>, and our goal is to reach <strong>${poolPrizeAmountInDollars} in ETH</strong></span>
            </div>

            <div
              className={`p-8 rounded-[30px]  border backdrop-blur-md ${globalState?.theme === 'dark' ? 'border-darkBorder bg-[#030A31] bg-opacity-80 shadow-lg' : 'border-lightBorder bg-white/54 shadow-lg'} ${globalState?.theme === 'dark' ? 'text-white shadow-gray-900' : 'text-black shadow-gray-200'}`}>
              <div className="relative -mt-14 mb-6">
                <ImgColorBlocks className={'w-16 h-16'}/>
              </div>
              <h3 className={'text-lg font-bold'}>Bring joy back into your life</h3>
              <span>Once we hit this target, the entire(<sup> * </sup>) amount <strong>will be donated back to YOU</strong>, one lucky donor.</span>
            </div>
          </div>
        </div>


      </div>

      <blockquote className="text-center mb-2 leading-8 enhanceText" dangerouslySetInnerHTML={{
        __html: t('welcomeCurrentPoolDescriptionText', {
          var1: '~$' + poolEntryAmountInDollars + ' in ETH',
          var2: '$' + poolPrizeAmountInDollars + ' in ETH'
        }),
      }}/>
    </>
  );
};

export default IndexTiles;
