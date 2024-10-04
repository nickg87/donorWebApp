import React, {useEffect, useState} from 'react';
import {useContractRead, useSendTransaction, useWaitForTransactionReceipt} from 'wagmi';
import { parseEther } from 'viem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faInfoCircle, faCopy } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '@/contexts/AppContext';
import {useTranslation} from "next-i18next";
import {copyToClipboard} from '@/utils/helpers';
import axios from "axios";
import {ethers} from "ethers";

//https://wagmi.sh/react/guides/send-transaction
export default function SendTransaction(props) {
  const { data: hash, error, isPending, sendTransaction } = useSendTransaction();
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(true); // New state to handle confirmation display
  // const recipientAddress = process.env.NEXT_PUBLIC_DONOR_ETH_ADDRESS;
  const { updateShouldFetch } = useAppContext();
  const { t, i18n } = useTranslation();

  const currentPool = props.currentPool;

  const submit = async (e) => {
    e.preventDefault();

    const poolId = currentPool.id;
    const ticketPriceInEther = currentPool.entry_amount; // Assuming entry_amount represents the ticket price in ETH

    try {
      // Convert ticket price to wei
      const ticketPriceInWei = parseEther(ticketPriceInEther.toString());

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

      // Call useSendTransaction with the contract address, ABI, function name, and arguments
      await sendTransaction({
        to: currentPool.eth_address,
        data: enterPoolData, // Replace with your contract's ABI
        value: ticketPriceInWei,
      });
    } catch (err) {
      console.error("Transaction error:", err);
    }
  };

  const submitX = async (e) => {
    e.preventDefault();

    const contractABI = [
      "function enterPool(uint256 poolId, uint256 ticketPrice) payable"
    ];

    const poolId = currentPool.id;
    const ticketPriceInEther = currentPool.entry_amount; // Assuming entry_amount represents the ticket price in ETH

    try {
      // Call useContractRead to get the current ticket price from the contract (optional)
      // This can be used for validation if the entry_amount might not always match the actual price
      const { data: currentTicketPrice } = await useContractRead({
        address: currentPool.eth_address,
        abi: contractABI,
        functionName: 'enterPool', // Assuming this function returns the ticket price
        args: [poolId],
      });

      console.log('currentTicketPrice');
      console.log(currentTicketPrice);

      // Validate entry amount against retrieved ticket price (if fetched)
      if (currentTicketPrice && ticketPriceInEther !== currentTicketPrice.ticketPrice.toString()) {
        throw new Error('Entry amount does not match pool ticket price.');
      }

      // Convert ticket price to wei
      const ticketPriceInWei = parseEther(ticketPriceInEther.toString());

      // Call useSendTransaction to send the ticket price (in wei) to the pool address
      await sendTransaction({
        to: currentPool.eth_address,
        value: ticketPriceInWei, // Send only the ticket price, not any additional fee
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
        {props.walletAddress && (
          <div className="mt-4 text-center text-xs" style={{ wordBreak: 'keep-all' }}>
            {/* Icon is placed before the text */}
            <FontAwesomeIcon icon={faInfoCircle} className="w-4 h-4 inline-block mr-2" />
            {/* Display text that can be translated, formatted correctly */}
            <span dangerouslySetInnerHTML={{
              __html: t('sendTransactionComponent.text', { var1: props.walletAddress }),
            }} />
          </div>
        )}

      </form>
      {hash && (
        <div className="mt-4 p-2 bg-gray-700 border border-gray-600 rounded-md break-words">
          <span className="font-semibold">Transaction Hash:</span> {hash}
        </div>
      )}
      {isConfirming && <div className="mt-4 p-2 bg-yellow-800 border border-yellow-700 rounded-md">Waiting for confirmation...</div>}
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
