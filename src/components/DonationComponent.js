import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import QRCodeComponent from "@/components/QRCodeComponent";
import EtherScanComponent from "@/components/EtherScanComponent";
import DonationProgressComponent from "@/components/DonationProgressComponent";
import DonateButton from "@/components/DonateButton";
import DApp from "@/components/walletconnect/DApp";
import DevCurrentLists from "@/components/DevCurrentLists";
import {useAppContext} from "@/contexts/AppContext";

const DonationComponent = ({ pools, transactions }) => {
  const [response, setResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { globalState } = useAppContext();


  //const isDev = process.env.NEXT_PUBLIC_DEVELOPER_MODE === 'true';
  //console.log('isDev: ' + isDev);
  const ethAddress = process.env.NEXT_PUBLIC_DONOR_ETH_ADDRESS;
  const ethAmount = 0.001;
  //console.log(ethAddress);




  return (
    <>
      <DonationProgressComponent />
      {/*<DApp/>*/}
      <EtherScanComponent address={globalState?.currentPool?.eth_address} />
      <DevCurrentLists pools={pools} transactions={transactions}/>
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
