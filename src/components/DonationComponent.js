import React from 'react';
import EtherScanComponent from "@/components/EtherScanComponent";
import DonationProgressComponent from "@/components/DonationProgressComponent";
import DevCurrentLists from "@/components/DevCurrentLists";
import {useAppContext} from "@/contexts/AppContext";

const DonationComponent = ({ pools, transactions }) => {
  const { globalState } = useAppContext();


  return (
    <>
      <DonationProgressComponent />
      <EtherScanComponent address={globalState?.currentPool?.eth_address} />
      <DevCurrentLists pools={pools} transactions={transactions}/>
    </>);
};

export default DonationComponent;

