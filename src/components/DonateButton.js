import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import DApp from "@/components/walletconnect/DApp";
//import QRCodeComponent from "@/components/QRCodeComponent";
import {useAppContext} from "@/contexts/AppContext";
import ButtonWrapper from "@/components/UI/ButtonWrapper";
import ModalContainer from "@/components/UI/ModalContainer";

import IconLovely from "../../public/iconsax/lovely.svg";
import IconClose from "../../public/iconsax/close-circle.svg";
import IconStar from "../../public/iconsax/star.svg";
import IconVideo from "../../public/iconsax/video-square.svg";

const DonateButton = ({...props}) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [showHowToModal, setShowHowToModal] = useState(false);
  const [activeTab, setActiveTab] = useState('wallet'); // State to manage active tab
  const [loading, setLoading] = useState(false);
  const { globalState } = useAppContext();
  const currentPool = props.isSpecial ? globalState?.specialPool : globalState?.currentPool;
  const poolPrizeAmount = currentPool?.prize_amount;
  const poolEntryAmount = currentPool?.entry_amount;
  const poolPrizeAmountInDollars = (parseFloat(poolPrizeAmount)*parseFloat(globalState.currentEthPrice?.lastPrice)).toFixed(2);
  const poolEntryAmountInDollars = (parseFloat(poolEntryAmount)*parseFloat(globalState.currentEthPrice?.lastPrice)).toFixed(2);
  const poolSize = poolPrizeAmount +' ETH (~' + poolPrizeAmountInDollars + ' $)';

  const handleDonateNow = async () => {
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
          <ButtonWrapper icon={props.isSpecial ? <IconStar className={`w-6 h-6`}/> : <IconLovely className={`w-6 h-6`}/>} theme={'light'} onClick={handleDonateNow} text={props.isSpecial ? t('special.donateComponent.buttonText') : t('donateComponent.buttonText')} extra={'uppercase h-[50px] w-[200px]'} />
        </div>
        <p className="mt-4 text-center text-sm text-[#8B91B5]" dangerouslySetInnerHTML={{
          __html: t('donateComponent.note', {
            var1: "~" + poolPrizeAmountInDollars + " $ in ETH"
          }),
        }} />


        {showHowToModal && (
          <ModalContainer show={showHowToModal} theme={globalState.theme}>
            <div className={`flex flex-col gap-4`}>
              {/* First Row: Title and Close Button */}
              <div className="relative flex justify-between items-center gap-2">
                <div className="w-full text-xl text-center font-bold">{t('donateComponent.buttonTextQuickGuide')}: {t('donateComponent.modalTitle')}</div>
                <button className="absolute top-0 right-0 text-inherit hover:text-gray-400"
                        onClick={() => setShowHowToModal(false)}>
                  <IconClose className="w-6 h-6"/>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                {/* Video Content */}
                <div className="relative pb-[56.25%] h-0 overflow-hidden w-full">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/oVrz7T99gwA?si=4JV2AXj5bvRRcUb0"
                    title="How to quickly enter a prize pool"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </ModalContainer>
        )}

        <div className="flex flex-col justify-center items-center p-4 transform scale-75">
          <ButtonWrapper icon={<IconVideo className="w-6 h-6"/>} theme={'dark'} onClick={() => setShowHowToModal(true)} text={t('donateComponent.buttonTextQuickGuide')} extra={'uppercase h-[50px] w-[180px]'} />
        </div>


      </div>
      {showModal && (
        <ModalContainer show={showModal} theme={globalState.theme}>
          <div className={`flex flex-col gap-4`}>
            {/* First Row: Title and Close Button */}
            <div className="relative flex justify-between items-center gap-2">
              <div className="w-full text-xl text-center font-bold">{t('donateComponent.modalTitle')}</div>
              <button className="absolute top-0 right-0 text-inherit hover:text-gray-400"
                      onClick={() => setShowModal(false)}>
                <IconClose className="w-6 h-6"/>
              </button>
              </div>
              {/* Modal Content (Scrollable if needed) */}
              <div className="flex-1 overflow-y-auto max-h-[70vh]">
                {/* Tab Content */}
                {activeTab === 'wallet' && <DApp currentPool={currentPool}/>}
                {/*{activeTab === 'qr' && <QRCodeComponent currentPool={currentPool} />}*/}
              </div>
            </div>
          </ModalContainer>
      )}

    </>
  );
};

export default DonateButton;
