import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';

const DonateButton = () => {
  const [response, setResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const ethAddress = process.env.NEXT_PUBLIC_DONOR_ETH_ADDRESS;
  // console.log(ethAddress);

  const handleDonateNow = async () => {
    try {
      // Simulate API call or blockchain transaction initiation
      const simulatedResponse = await initiateCryptoTransfer();
      setResponse(simulatedResponse);
      setShowModal(true);
      setLoading(false);

      // Automatically clear response after 3 seconds
      setTimeout(() => {
        setResponse(null);
        setShowModal(false);
      }, 3000);
    } catch (error) {
      console.error('Error initiating transfer:', error);
      setLoading(false);
      setShowModal(false);
    }
  };


  return (
    <>
      <div className="flex flex-col justify-center items-center p-4">

        <button onClick={handleDonateNow}  className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 md:py-6 md:px-12 rounded-full flex items-center  gradient-bg">
          <div className="w-8 h-8 flex items-center justify-center mr-2">
            <FontAwesomeIcon icon={faHandHoldingDollar}/>
          </div>
          <span className="text-md md:text-2xl">DONATE NOW</span>
        </button>

        <p className="mt-4 text-center text-sm">
          Your donation helps reach the 500 USDT goal for the current donation pool. Together, we can make a difference!
        </p>

      </div>
      {showModal && (
        <div className="fixed z-10 inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-black rounded-lg p-8 max-w-md w-full text-center shadow-md">
              <p className="text-xl font-bold mb-4">{response.message}</p>
              <p className="mb-4">Your donation has been successfully initiated. Thank you!</p>
              <button
                onClick={() => setShowModal(false)}
                className="bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>);
};

export default DonateButton;

// Mock function to simulate crypto transfer initiation
const initiateCryptoTransfer = async () => {
  // Simulate API call or blockchain transaction initiation
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate successful transfer
      resolve({success: true, message: 'Crypto transfer initiated successfully!'});
    }, 2000); // Simulate 2 seconds of transfer initiation time
  });
};
