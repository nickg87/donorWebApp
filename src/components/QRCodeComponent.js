import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import {useTranslation} from "next-i18next";
import { parseEther } from 'viem';
import {copyToClipboard} from '@/utils/helpers';
import { ethers } from 'ethers';
import Web3 from 'web3';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy} from "@fortawesome/free-solid-svg-icons";

const QRCodeComponent = ({ currentPool }) => {
  console.log(currentPool);
  const poolId = currentPool.id;
  const amountCP = currentPool.entry_amount;
  const entryAmount = currentPool.entry_amount;
  const contractAddress = currentPool.eth_address;

  // Create a new instance of Web3 (only if you need it; otherwise, you can skip this)
  const web3 = new Web3(); // Can use a specific provider if needed, but we’ll encode without one for now

  const encodeEnterPoolData = (poolId, entryAmount) => {
    // Convert entry amount from Ether to Wei
    const parsedAmount = web3.utils.toWei(entryAmount.toString(), 'ether');

    // Encode the function signature
    const functionSignature = web3.eth.abi.encodeFunctionSignature("enterPool(uint256,uint256)");

    // Encode the parameters
    const parameters = web3.eth.abi.encodeParameters(['uint256', 'uint256'], [poolId, parsedAmount]);

    // Concatenate the function signature and parameters
    const enterPoolData = functionSignature + parameters.slice(2); // Remove '0x' from parameters to concatenate

    return enterPoolData;
  };


  const encodedData = encodeEnterPoolData(poolId, entryAmount);
  console.log('Encoded Enter Pool Data:', encodedData);

  console.log('amountCP');
  console.log(amountCP);
  const isDev = process.env.NEXT_PUBLIC_DEVELOPER_MODE === 'true';

  const { t, i18n } = useTranslation();

  //const qrData = `ethereum:${currentPool?.eth_address}?value=${currentPool?.entry_amount}&poolId=${currentPool?.id}`

  // Encode the function data
  const contractABI = [
    "function enterPool(uint256 poolId, uint256 ticketPrice) payable"
  ];
  const iFace = new ethers.utils.Interface(contractABI);
  const parsedAmount = ethers.utils.parseEther(entryAmount.toString());
  const qrDataNormal = `ethereum:${contractAddress}?value=${parsedAmount}`;

  // Encode the data for the function call
  const enterPoolData = iFace.encodeFunctionData("enterPool", [
    poolId,
    ethers.utils.parseEther(entryAmount.toString())
  ]);

  // Construct the QR data URI
  const qrData = `ethereum:${contractAddress}?value=${parsedAmount}&data=${enterPoolData}`;
  const qrDataX = `ethereum:${contractAddress}?value=${parsedAmount}&data=${encodedData}`;

  // `&drawnStatus=${currentPool?.drawn_status}` + // Additional parameters from currentPool
    // `&type=${currentPool?.type}`;


  if (isDev) {
    console.log('amount: ' + amountCP)
    console.log('qrData: ');
    console.log(qrData);
    console.log('qrDataNormal: ');
    console.log(qrDataNormal);
    console.log('qrDataX: ');
    console.log(qrDataX);
  }


  const handleTransaction = async () => {
    // Initialize Etherscan provider for ethers v5
    const provider = new ethers.providers.EtherscanProvider("homestead", '2B67KIW4DVH6ET3I4NB1E4I53D9IAZ4F23');

    // Estimate gas cost using Ethers.js
    const estimatedGas = await provider.estimateGas({
      to: contractAddress,
      data: enterPoolData,
      value: parsedAmount
    });

    // Display estimated gas to the user
    console.log('Estimated gas:', estimatedGas);

    // Convert to Gwei
    const estimatedGasInGwei = ethers.utils.formatUnits(estimatedGas, "gwei");
    console.log(`Estimated Gas in Gwei: ${estimatedGasInGwei}`);

    // Convert to Ether
    const estimatedGasInEther = ethers.utils.formatUnits(estimatedGas, "ether");
    console.log(`Estimated Gas in Ether: ${estimatedGasInEther}`);


    // Proceed with the transaction if the user confirms
    // ...
  };



  return (
    <div className="flex flex-col justify-center items-center p-8">
      <div className="w-full mx-auto p-8 bg-gray-800 text-gray-200 shadow-md rounded-lg">
        <div className="flex flex-col items-center" style={{wordBreak: "break-all"}}>
          <div className="w-full mx-auto p-8 bg-white rounded-lg shadow-md">
            <QRCode value={qrData} style={{width: '100%', height: '100%'}}/>
            {/*<div>qrDataNormal:</div>*/}
            {/*{qrDataNormal && <QRCode value={qrData} style={{width: '100%', height: '100%'}}/>}*/}
            <button style={{color: '#000', marginTop: '1rem'}} onClick={handleTransaction}>Test Enter Pool</button>
          </div>
          <p className="mt-4 text-center text-sm" style={{wordBreak: 'keep-all'}} dangerouslySetInnerHTML={{
            __html: t('qrCodeComponent.text', {var1: currentPool?.entry_amount}),
          }}/>
          <div className="w-full text-left">
            {/*<label htmlFor="address" className="block text-sm font-medium">Address</label>*/}
            <div className="mt-2 flex items-center">
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
                onClick={() => copyToClipboard(currentPool?.eth_address)}
                className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-r-md focus:outline-none copyToClipboard"
              >
                <FontAwesomeIcon icon={faCopy} className="w-4 h-4"/>
              </button>
            </div>
          </div>


        </div>
      </div>
    </div>

  );
};

export default QRCodeComponent;
