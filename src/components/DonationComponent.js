import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import QRCodeComponent from "@/components/QRCodeComponent";
import EtherScanComponent from "@/components/EtherScanComponent";
import DonationProgressComponent from "@/components/DonationProgressComponent";
import DonateButton from "@/components/DonateButton";

const DonationComponent = () => {
  const [response, setResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const ethAddress = process.env.NEXT_PUBLIC_DONOR_ETH_ADDRESS;
  //console.log(ethAddress);

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

      <DonationProgressComponent />
      <div className="flex flex-col justify-center items-center p-4">
        <QRCodeComponent address={ethAddress} amount={0.1}/>
        <EtherScanComponent address={ethAddress} />
        <DonateButton/>
      </div>
    </>);
};

export default DonationComponent;

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
