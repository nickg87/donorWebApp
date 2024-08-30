"use client";


import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";
import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faWallet, faUnlink} from '@fortawesome/free-solid-svg-icons';

export default function CustomButton() {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      console.log(window.ethereum);
    } else {
      console.log(window);
    }
  }, []);

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

  const baseStyle =
    "w-full px-4 py-4 font-bold mt-4 text-white text-center rounded-full  transition-all duration-300 ease-in-out transform focus:outline-none flex items-center justify-center";


  return (
    <>
      {error && <div className="text-red-500">{error}</div>}
      {isConnected ? (
        <button
          onClick={handleDisconnect}
          className={`${baseStyle} bg-gradient-to-r m-2 p-2 bg-gray-800 hover:bg-grey-900`}
        >
          {/*//from-red-500 to-pink-500*/}
          <FontAwesomeIcon icon={faUnlink} className="mr-2 text-xl w-5 h-5" />
          Disconnect
        </button>
      ) : (
        <button
          onClick={handleConnect}
          className={`${baseStyle} bg-gradient-to-r m-2 p-2 from-red-500 to-pink-500 hover:from-red-800 hover:to-pink-800`}
        >
          <FontAwesomeIcon icon={faWallet} className="mr-2 text-xl w-5 h-5" /> Connect Wallet
        </button>
      )}
    </>
  );
}
