import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingDollar, faQrcode, faWallet } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'next-i18next';
import DApp from "@/components/walletconnect/DApp";
import QRCodeComponent from "@/components/QRCodeComponent";
import {useAppContext} from "@/contexts/AppContext";
import ButtonWrapper from "@/components/UI/ButtonWrapper";
import ModalContainer from "@/components/UI/ModalContainer";

import IconLovely from "../../public/iconsax/lovely.svg";
import classes from "@/components/IndexTile.module.scss";

const DonateButton = () => {
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

  const   handleDonateNow = async () => {
    setLoading(true); // Set loading state to true
    try {
      setShowModal(true);
    } catch (error) {
      console.error('Error initiating transfer:', error);
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center p-4">
        <div className="flex flex-col justify-center items-center p-4">
          <ButtonWrapper icon={<IconLovely className={`w-6 h-6`}/>} theme={'light'} onClick={handleDonateNow} text={t('donateComponent.buttonText')} extra={'uppercase h-[50px] w-[200px]'} />
        </div>
        <p className="mt-4 text-center text-sm text-[#8B91B5]" dangerouslySetInnerHTML={{
          __html: t('donateComponent.note', {
            var1: "~" + poolPrizeAmountInDollars + " $ in ETH"
          }),
        }} />
      </div>
      {showModal && (
        <>
          <ModalContainer show={showModal} theme={globalState.theme}>
            <>
              {/* First Row: Title and Close Button */}
              <div className="relative py-4 px-6 flex justify-between items-center">
                <p className="text-xl font-bold">{t('donateComponent.modalTitle')}</p>
                <button className="absolute top-4 right-4 text-white hover:text-gray-400"
                        onClick={() => setShowModal(false)}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                       xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              {/* Modal Content (Scrollable if needed) */}
              <div className="flex-1 overflow-y-auto px-4">
                {/* Tab Content */}
                {activeTab === 'wallet' && <DApp currentPool={currentPool}/>}
                {activeTab === 'qr' && <QRCodeComponent currentPool={currentPool} />}
              </div>

              {/* Modal Footer */}
              {/*<div className="text-white py-4 px-6">*/}
              {/*  <button onClick={() => setShowModal(false)} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-full">*/}
              {/*    {t('general.close')}*/}
              {/*  </button>*/}
              {/*</div>*/}
            </>


          </ModalContainer>
        </>

      )}

    </>
  );
};

export default DonateButton;
