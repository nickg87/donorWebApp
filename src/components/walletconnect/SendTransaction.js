import React, {useEffect, useState} from 'react';
import {useSendTransaction, useWaitForTransactionReceipt, useEstimateGas} from 'wagmi';
import { parseEther } from 'viem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faInfoCircle, faCopy, faEthernet } from '@fortawesome/free-solid-svg-icons';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { useAppContext } from '@/contexts/AppContext';
import {useTranslation} from "next-i18next";
import {copyToClipboard} from '@/utils/helpers';
import axios from "axios";
import {ethers} from "ethers";

//https://wagmi.sh/react/guides/send-transaction
export default function SendTransaction(props) {
  //console.log(props);
  const { data: hash, error, isPending, sendTransaction } = useSendTransaction();

  const { askForGasFee } = useEstimateGas();
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [gasEstimation, setGasEstimation] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(true); // New state to handle confirmation display
  // const recipientAddress = process.env.NEXT_PUBLIC_DONOR_ETH_ADDRESS;
  const { updateShouldFetch } = useAppContext();
  const { t, i18n } = useTranslation();
  const userBalance = props.userBalance?.balance;
  if (userBalance?.formatted) {
    let balanceFormatted = parseFloat(userBalance?.formatted).toFixed(8)
    console.log(userBalance);
    console.log(balanceFormatted);
  }

  const currentPool = props.currentPool;

  const poolId = currentPool.id;
  const ticketPriceInEther = currentPool.entry_amount; // Assuming entry_amount represents the ticket price in ETH

  const ticketPriceInWei = parseEther(ticketPriceInEther.toString());

  const { data: estimatedGas, fetch, errorEG, isLoadingEG } = useEstimateGas();

  // Encode the function data
  const contractABI = [
    "function enterPool(uint256 poolId, uint256 ticketPrice) payable"
  ];
  const iFace = new ethers.utils.Interface(contractABI);
  const parsedAmount = ethers.utils.parseEther(ticketPriceInEther.toString());

  // Encode the data for the function call
  const enterPoolData = iFace.encodeFunctionData("enterPool", [
    poolId,
    parsedAmount
  ]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await sendTransaction({
        to: currentPool.eth_address,
        data: enterPoolData, // Replace with your contract's ABI
        value: ticketPriceInWei,
      });
    } catch (err) {
      console.error("Transaction error:", err);
    }
  };

  const { isLoading: isWaiting, isSuccess: isTransactionConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  React.useEffect(() => {
    if (isWaiting) {
      setIsConfirming(true);
    } else {
      setIsConfirming(false);
    }
    if (isTransactionConfirmed) {
      updateShouldFetch(true);
      setIsConfirmed(true);
    } else {
      setIsConfirmed(false);
    }
  }, [isWaiting, isTransactionConfirmed]);

  const handleDismiss = () => {
    setIsConfirmed(false);
    setShowConfirmation(false);
  };


  return (
    <div className="w-full mx-auto p-8 bg-gray-800 text-gray-200 shadow-md rounded-lg">
      <h2 className="text-left text-2xl font-bold mb-4 text-white">Send Transaction</h2>
      <form className="space-y-4" onSubmit={submit}>
        {currentPool?.eth_address &&
          <div className="text-left">
            <label htmlFor="address" className="block text-sm font-medium">Address</label>
            <div className="mt-1 flex items-center">
              <input
                id="address"
                name="address"
                className="block w-full px-3 py-2 border border-gray-600 border-r-0 rounded-l-md bg-gray-900 text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="0x..."
                value={currentPool?.eth_address}
                required
                readOnly
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  copyToClipboard(currentPool?.eth_address)
                }}
                className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-r-md focus:outline-none copyToClipboard"
              >
                <FontAwesomeIcon icon={faCopy} className="w-4 h-4"/>
              </button>
            </div>
          </div>
        }
        {currentPool?.entry_amount &&
          <div className="text-left">
            <label htmlFor="value" className="block text-sm font-medium">Amount (ETH)</label>
            <input
              id="value"
              name="value"
              type="number"
              step="0.000000001"
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-900 text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder={currentPool.entry_amount}
              value={currentPool.entry_amount}
              required
              readOnly
            />
          </div>}
        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-2 px-4 rounded-md font-semibold text-white ${
            isPending ? 'bg-gray-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
          } transition duration-200`}
        >
          {isPending ? 'Confirming...' : 'Send'}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
          }}
          disabled={isPending}
          className={`w-full py-2 px-4 rounded-md font-semibold text-white ${
            isPending ? 'bg-gray-600 cursor-not-allowed' : 'bg-gray-600 hover:bg-indigo-700'
          } transition duration-200`}
        >
          Ask for fee
        </button>
        {props.userWalletAddress && (
          <div className="mt-4 text-center text-xs" style={{ wordBreak: 'keep-all' }}>
            {/* Icon is placed before the text */}
            <FontAwesomeIcon icon={faInfoCircle} className="w-4 h-4 inline-block mr-2" />
            {/* Display text that can be translated, formatted correctly */}
            <span dangerouslySetInnerHTML={{
              __html: t('sendTransactionComponent.text', { var1: props.userWalletAddress }),
            }} />
          </div>
        )}
        {props.userBalance?.balance?.formatted && (
          <div className="mt-4 text-center text-xs" style={{wordBreak: 'keep-all'}}>
            {/* Icon is placed before the text */}
            <FontAwesomeIcon icon={faEthereum} className="w-4 h-4 inline-block mr-2"/>
            {/* Display text that can be translated, formatted correctly */}
            <span dangerouslySetInnerHTML={{
              __html: t('sendTransactionComponent.balanceText', {var1: parseFloat(props.userBalance?.balance?.formatted).toFixed(7), var2:props.userBalance?.balance?.symbol }),
            }}/>
          </div>
        )}

      </form>
      {hash && (
        <div className="mt-4 p-2 bg-gray-700 border border-gray-600 rounded-md break-words">
          <span className="font-semibold">Transaction Hash:</span> {hash}
        </div>
      )}
      {isConfirming &&
        <div className="mt-4 p-2 bg-yellow-800 border border-yellow-700 rounded-md">Waiting for confirmation...</div>}
      {showConfirmation && isConfirmed && (
        <div className="mt-4 p-2 bg-green-800 border border-green-700 rounded-md relative">
          <span>Transaction confirmed.</span>
          <button
            onClick={handleDismiss}
            className="absolute top-1 right-1 p-1 text-gray-300 hover:text-white"
          >
            <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
          </button>
        </div>
      )}
      {error && <div className="mt-4 p-2 bg-red-800 border border-red-700 rounded-md text-red-300 break-all">Error: {error.message || 'An error occurred'}</div>}
    </div>
  );
}
