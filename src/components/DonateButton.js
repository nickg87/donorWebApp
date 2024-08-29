import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'next-i18next';
import DApp from "@/components/walletconnect/DApp";
import QRCodeComponent from "@/components/QRCodeComponent";

const DonateButton = () => {
  const { t } = useTranslation();
  const [response, setResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('wallet'); // State to manage active tab

  const ethAddress = process.env.NEXT_PUBLIC_DONOR_ETH_ADDRESS;
  const ethAmount = 0.1; // Example amount, replace with actual logic if needed

  const handleDonateNow = async () => {
    const transferStartedMessage = t('donateComponent.transferStartedMessage');
    setLoading(true); // Set loading state to true
    try {
      const simulatedResponse = { success: true, message: transferStartedMessage };
      setResponse(simulatedResponse);
      setShowModal(true);
      setLoading(false);
    } catch (error) {
      console.error('Error initiating transfer:', error);
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center p-4">
        <button onClick={handleDonateNow} className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 md:py-6 md:px-12 rounded-full flex items-center gradient-bg">
          <div className="w-8 h-8 flex items-center justify-center mr-2">
            <FontAwesomeIcon icon={faHandHoldingDollar} />
          </div>
          <span className="text-md md:text-2xl uppercase">{t('donateComponent.buttonText')}</span>
        </button>

        <p className="mt-4 text-center text-sm">
          {t('donateComponent.text', { var1: "500 USDT" })}
        </p>
      </div>

      {showModal && (
        <div className="fixed z-10 inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg overflow-y-auto flex items-center justify-center">
          <div className="bg-black rounded-lg max-w sm:max-w-md w-full bg-opacity-50 sm:bg-opacity-100 h-full sm:h-auto sm:max-h-screen flex flex-col text-center shadow-md">

            {/* Modal Header */}
            <div className="relative text-white py-4 px-6 flex justify-between items-center">
              <p className="text-xl font-bold">{t('donateComponent.modalTitle')}</p>
              <button
                className="absolute top-4 right-4 text-white hover:text-gray-400"
                onClick={() => setShowModal(false)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* Modal Content (Scrollable if needed) */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Tabs */}
              <div className="flex justify-center mb-4">
                <button
                  onClick={() => setActiveTab('wallet')}
                  className={`px-4 py-2 font-bold rounded-t ${activeTab === 'wallet' ? 'bg-white text-black' : 'bg-gray-300 text-gray-600'}`}
                >
                  Wallet Connect
                </button>
                <button
                  onClick={() => setActiveTab('qr')}
                  className={`px-4 py-2 font-bold rounded-t ${activeTab === 'qr' ? 'bg-white text-black' : 'bg-gray-300 text-gray-600'}`}
                >
                  Scan QR Code
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'wallet' && <DApp />}
              {activeTab === 'qr' && <QRCodeComponent address={ethAddress} amount={ethAmount.toString()} />}
            </div>

            {/* Modal Footer */}
            <div className="text-white py-4 px-6">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-full"
              >
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
