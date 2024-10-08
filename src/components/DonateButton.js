import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingDollar, faQrcode, faWallet } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'next-i18next';
import DApp from "@/components/walletconnect/DApp";
import QRCodeComponent from "@/components/QRCodeComponent";
import {useAppContext} from "@/contexts/AppContext";

const DonateButton = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('wallet'); // State to manage active tab
  const [loading, setLoading] = useState(false);
  const { globalState } = useAppContext();
  const currentPool = globalState?.currentPool;

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
        <button onClick={handleDonateNow} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 md:py-6 md:px-12 rounded-full flex items-center gradient-btn-bg">
          <div className="w-8 h-8 flex items-center justify-center mr-2">
            <FontAwesomeIcon icon={faHandHoldingDollar} />
          </div>
          <span className="text-md md:text-2xl uppercase">{t('donateComponent.buttonText')}</span>
        </button>
        <p className="mt-4 text-center text-sm">
          {t('donateComponent.text', { var1: "50 $ in ETH" })}
        </p>
      </div>
      {showModal && (
        <div className="fixed z-10 inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg overflow-y-auto flex items-center justify-center">
          <div className="bg-black sm:rounded-lg max-w sm:max-w-md w-full bg-opacity-75 sm:bg-opacity-100 h-full sm:h-auto sm:max-h-screen flex flex-col text-center shadow-md">
            {/* Modal Header */}
            <div className="flex flex-col bg-black sm:bg-transparent">
              {/* First Row: Title and Close Button */}
              <div className="relative text-white py-4 px-6 flex justify-between items-center">
                <p className="text-xl font-bold">{t('donateComponent.modalTitle')}</p>
                <button className="absolute top-4 right-4 text-white hover:text-gray-400" onClick={() => setShowModal(false)}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              {/* Second Row: Tabs */}
              {/*<div className="flex">*/}
              {/*  <button onClick={() => setActiveTab('wallet')} className={`flex-1 flex items-center justify-center py-2 font-bold text-center rounded-t border-b-2 ${activeTab === 'wallet' ? 'text-white border-white' : 'border-b-1 text-gray-400 border-gray-400'}`}>*/}
              {/*    <div className="w-4 h-4 flex items-center justify-center mr-2">*/}
              {/*      <FontAwesomeIcon icon={faWallet}/>*/}
              {/*    </div>*/}
              {/*    <span className="text-md uppercase">Wallet Connect</span>*/}

              {/*  </button>*/}
              {/*  <button onClick={() => setActiveTab('qr')} className={`flex-1 flex items-center justify-center py-2 font-bold text-center rounded-t border-b-2 ${activeTab === 'qr' ? 'text-white border-white' : 'border-b-1 text-gray-400 border-gray-400'}`}>*/}
              {/*    <div className="w-4 h-4 flex items-center justify-center mr-2">*/}
              {/*      <FontAwesomeIcon icon={faQrcode}/>*/}
              {/*    </div>*/}
              {/*    <span className="text-md uppercase">Scan QR Code</span>*/}
              {/*  </button>*/}
              {/*</div>*/}


            </div>

            {/* Modal Content (Scrollable if needed) */}
            <div className="flex-1 overflow-y-auto px-4">
              {/* Tab Content */}
              {activeTab === 'wallet' && <DApp currentPool={currentPool}/>}
              {activeTab === 'qr' && <QRCodeComponent currentPool={currentPool} />}
            </div>

            {/* Modal Footer */}
            <div className="text-white py-4 px-6">
              <button onClick={() => setShowModal(false)} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-full">
                {t('general.close')}
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default DonateButton;
