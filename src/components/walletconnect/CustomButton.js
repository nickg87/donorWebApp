"use client";


import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";
import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faWallet, faUnlink} from '@fortawesome/free-solid-svg-icons';

import IconWalletAdd from "../../../public/iconsax/empty-wallet-add.svg";
import IconWalletRemove from "../../../public/iconsax/empty-wallet-remove.svg";
import IconLovely from "../../../public/iconsax/lovely.svg";
import ButtonWrapper from "@/components/UI/ButtonWrapper";
import {useTranslation} from "next-i18next";
import {useAppContext} from "@/contexts/AppContext";

export default function CustomButton() {
  const { t } = useTranslation();
  const { globalState } = useAppContext();
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [error, setError] = useState(null);

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (err) {
      setError("An error occurred while disconnecting.");
      console.error(err);
    }
  };

  const handleConnect = async () => {
    try {
      await open();
    } catch (err) {
      setError("An error occurred while connecting.");
      console.error(err);
    }
  };


  return (
    <>
      {error && <div className="text-red-500">{error}</div>}
      {isConnected ? (
          <ButtonWrapper icon={<IconWalletRemove className={`w-6 h-6`}/>} theme={'light'} onClick={handleDisconnect} text={t('sendTransactionComponent.disconnectButton')} extra={' h-[50px] w-[200px]'} />
        // <button
        //   onClick={handleDisconnect}
        //   className={`${baseStyle} bg-gradient-to-r m-2 p-2 bg-gray-800 hover:bg-grey-900`}
        // >
        //   {/*//from-red-500 to-pink-500*/}
        //   <FontAwesomeIcon icon={faUnlink} className="mr-2 text-xl w-5 h-5" />
        //   Disconnect
        // </button>
      ) : (
        <ButtonWrapper icon={<IconWalletAdd className={`w-6 h-6`}/>} theme={'dark'} onClick={handleConnect} text={t('sendTransactionComponent.connectButton')} extra={' h-[50px] w-[200px]'} />
        // <button
        //   onClick={handleConnect}
        //   className={`${baseStyle} bg-gradient-to-r m-2 p-2 from-red-500 to-pink-500 hover:from-red-800 hover:to-pink-800`}
        // >
        //   <FontAwesomeIcon icon={faWallet} className="mr-2 text-xl w-5 h-5" /> Connect Wallet
        // </button>
      )}
    </>
  );
}
