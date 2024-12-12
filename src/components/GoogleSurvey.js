import React, {useEffect, useState} from 'react';

import classes from "./UI/ModalContainer.module.scss";
import { useTranslation } from 'next-i18next';
import {useAppContext} from "@/contexts/AppContext";
import ButtonWrapper from "@/components/UI/ButtonWrapper";
import IconCloseSquare from "../../public/iconsax/close-square.svg";
import IconClose from "../../public/iconsax/close-circle.svg";

const GoogleSurvey = ({...props}) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Function to show modal after interaction
    const handleUserInteraction = () => {
      setHasInteracted(true);
      setShowModal(true);
      cleanupListeners();
    };

    // Timeout to show modal after delay
    const delayTimeout = setTimeout(() => {
      setShowModal(true);
      cleanupListeners();
    }, 5000); // Adjust delay (5000ms = 5 seconds)

    // Add interaction listeners
    const addListeners = () => {
      window.addEventListener("click", handleUserInteraction);
    };

    // Cleanup listeners
    const cleanupListeners = () => {
      window.removeEventListener("click", handleUserInteraction);
      clearTimeout(delayTimeout);
    };

    addListeners();

    // Cleanup on unmount
    return () => cleanupListeners();
  }, []);


  const { globalState, updateShowSurvey } = useAppContext();

  if (!showModal) return null;

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
               style={{minHeight: 'inherit', textAlign: 'center'}}>
            <ButtonWrapper
              icon={<IconCloseSquare className={`w-6 h-6`}/>}
              theme={'dark'}
              text={t('contactPage.survey.hide')}
              onClick={() => updateShowSurvey(false)}
              extra={'uppercase h-[50px] w-[240px] self-center'}/>
            <button className="absolute top-[20px] right-[20px] text-inherit hover:text-gray-400"
                    onClick={() => setShowModal(false)}>
              <IconClose className="w-6 h-6"/>
            </button>
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
