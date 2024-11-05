import React, {useEffect, useState} from 'react';
import {useSendTransaction, useWaitForTransactionReceipt, useEstimateGas} from 'wagmi';
import { parseEther } from 'viem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faInfoCircle, faCopy, faEthernet } from '@fortawesome/free-solid-svg-icons';
import classes from './WalletConnect.module.scss';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';


import IconCopy from "../../../public/iconsax/copy.svg";
import IconWallet from "../../../public/iconsax/wallet-2.svg";
import IconETH from "../../../public/iconsax/ethereum-classic-(etc).svg";

import { useAppContext } from '@/contexts/AppContext';
import {useTranslation} from "next-i18next";
import {copyToClipboard} from '@/utils/helpers';
import axios from "axios";
import {ethers} from "ethers";
import IconClose from "../../../public/iconsax/close-circle.svg";
import IconWalletAdd from "../../../public/iconsax/empty-wallet-add.svg";
import ButtonWrapper from "@/components/UI/ButtonWrapper";
import InputWrapper from "@/components/UI/InputWrapper";

//https://wagmi.sh/react/guides/send-transaction
export default function SendTransaction(props) {
  //console.log(props);
  const { data: hash, error, isPending, sendTransaction } = useSendTransaction();

  const { globalState } = useAppContext();
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
    <div className="w-full mx-auto ">
      <h4 className="text-center mt-[-6px] mb-4 text-[#8B91B5]">Send Transaction</h4>
      <form className="space-y-4" onSubmit={submit}>
        {currentPool?.eth_address &&
          <div className="text-left">
            <label htmlFor="address" className="block text-sm font-medium">Address</label>
            <InputWrapper
              id="address"
              name="address"
              theme={globalState?.theme}
              placeholder="0x..."
              value={currentPool?.eth_address}
              required={true}
              readOnly={true}
              icon={<IconCopy onClick={(e) => {
                e.preventDefault();
                copyToClipboard(currentPool?.eth_address)
              }} className="py-1 w-[24px] h-[24px]"/>}
              extra={''}/>
          </div>
        }
        {currentPool?.entry_amount &&
          <div className="text-left">
            <label htmlFor="value" className="block text-sm font-medium">Amount (ETH)</label>
            <InputWrapper
              id="value"
              name={'value'}
              type={'number'}
              theme={globalState?.theme}
              placeholder={currentPool.entry_amount}
              value={currentPool.entry_amount}
              required={true}
              readOnly={true}
              extra={''}/>
          </div>}
        <ButtonWrapper theme={'dark'} disabled={isPending}
                       text={isPending ? t('sendTransactionComponent.isTransactionPending') : t('sendTransactionComponent.sendTransaction')}
                       extra={' h-[50px] w-full'}/>

        {/*<button*/}
        {/*  onClick={(e) => {*/}
        {/*    e.preventDefault();*/}
        {/*  }}*/}
        {/*  disabled={isPending}*/}
        {/*  className={`w-full py-2 px-4 rounded-md font-semibold text-white ${*/}
        {/*    isPending ? 'bg-gray-600 cursor-not-allowed' : 'bg-gray-600 hover:bg-indigo-700'*/}
        {/*  } transition duration-200`}*/}
        {/*>*/}
        {/*  Ask for fee*/}
        {/*</button>*/}

        {props.userWalletAddress && (
          <div className={`mt-4 text-center text-xs ${classes.userWalletAddress} ${globalState?.theme}`} style={{wordBreak: 'keep-all'}}>
            {/* Icon is placed before the text */}
            <IconWallet className="w-4 h-4 inline-block mx-1 grayed"/>
        {/* Display text that can be translated, formatted correctly */}
          <span dangerouslySetInnerHTML={{
          __html: t('sendTransactionComponent.userWalletAddress', { var1: props.userWalletAddress }),
            }} />
          </div>
        )}
        {props.userBalance?.balance?.formatted && (
            <div className={`mt-4 text-center text-xs ${classes.userBalanceText} ${globalState?.theme}`} style={{wordBreak: 'keep-all'}}>
              {/* Icon is placed before the text */}
              <IconETH className="w-4 h-4 inline-block mx-1 grayed"/>
              {/* Display text that can be translated, formatted correctly */}
              <span dangerouslySetInnerHTML={{
                __html: t('sendTransactionComponent.balanceText', {
                  var1: parseFloat(props.userBalance?.balance?.formatted).toFixed(7),
                  var2: props.userBalance?.balance?.symbol
                }),
              }}/>
            </div>
          )
        }



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
