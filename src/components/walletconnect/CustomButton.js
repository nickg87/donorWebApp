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
    "px-4 py-2 font-bold text-white rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 active:translate-y-0 focus:outline-none inline-flex";

  return (
    <>
      {error && <div className="text-red-500">{error}</div>}
      {isConnected ? (
        <button
          onClick={handleDisconnect}
          className={`${baseStyle} bg-gradient-to-r m-2 p-2 from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600`}
        >
          <FontAwesomeIcon icon={faUnlink} className="mr-2 text-xl w-5 h-5" />
          Disconnect
        </button>
      ) : (
        <button
          onClick={handleConnect}
          className={`${baseStyle} bg-gradient-to-r m-2 p-2 from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600`}
        >
          <FontAwesomeIcon icon={faWallet} className="mr-2 text-xl w-5 h-5" /> Connect Wallet
        </button>
      )}
    </>
  );
}
