import React, { useState } from 'react';


import classes from "./UI/ModalContainer.module.scss";
import { useTranslation } from 'next-i18next';
import {useAppContext} from "@/contexts/AppContext";
import ModalContainer from "@/components/UI/ModalContainer";
import IconClose from "../../public/iconsax/close-circle.svg";
import ButtonWrapper from "@/components/UI/ButtonWrapper";
import IconStar from "../../public/iconsax/star.svg";
import IconCloseSquare from "../../public/iconsax/close-square.svg";

const GoogleSurvey = ({...props}) => {
  console.log('kkt');
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [showHowToModal, setShowHowToModal] = useState(false);
  const [activeTab, setActiveTab] = useState('wallet'); // State to manage active tab
  const [loading, setLoading] = useState(false);
  const { globalState, updateShowSurvey } = useAppContext();
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
      <div className={`fixed z-[10] inset-0 ${classes.modalWrapper} ${classes[globalState.theme]} bg-opacity-50 backdrop-filter backdrop-blur-lg overflow-y-auto flex items-center justify-center`}>
        <div
          className={`p-4 md:p-8 rounded-[20px] md:rounded-[30px] max-w-full max-h-full 
    min-h-[70vh] min-w-[90vw] md:min-h-[60vh] md:min-w-[50vw] 
    md:max-h-[90vh] md:max-w-[70vw] mx-2 md:mx-4 
    ${classes.modalContentWrapper} ${classes[globalState.theme]} ${globalState.theme} 
    border backdrop-blur-md ${globalState.theme === 'dark' ? 'border-darkBorder shadow-darkTheme' : 'border-lightBorder shadow-lightTheme'}`}
        >
          <div className="flex-col flex-grow flex-shrink w-full h-full flex items-stretch justify-stretch"
               style={{minHeight: 'inherit'}}>
            <ButtonWrapper
              icon={<IconCloseSquare className={`w-6 h-6`}/>}
              theme={'dark'}
              text={t('contactPage.survey.hide')}
              onClick={() => updateShowSurvey(false)}
              extra={'uppercase h-[50px] w-[100%]'}/>
            <iframe
              title="Help us to be better"
              className="flex-grow flex-shrink w-full h-full rounded-[15px] md:rounded-[20px] border-none"
              src="https://docs.google.com/forms/d/e/1FAIpQLSckfx4zD3RpCKp-_QZlSfAYltrpkB2e4p1Bl9xO5IbCf8uhEQ/viewform?embedded=true"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              allow="fullscreen"
              style={{minHeight: 'inherit'}}
            >
              Loading…
            </iframe>
          </div>
        </div>


      </div>
    </>
  );
};

export default GoogleSurvey;
