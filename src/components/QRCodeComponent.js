import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import {useTranslation} from "next-i18next";
import { parseEther } from 'viem';
import {copyToClipboard} from '@/utils/helpers';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy} from "@fortawesome/free-solid-svg-icons";

const DonationQRCode = ({ address, amount }) => {
  const isDev = process.env.NEXT_PUBLIC_DEVELOPER_MODE === 'true';
  const parsedAmount = parseEther(amount);
  const { t, i18n } = useTranslation();
  const qrData = `ethereum:${address}?value=${parsedAmount}`;
  if (isDev) {
    console.log('amount: ' + amount)
    console.log('parsedAmount: ' + parsedAmount);
    console.log('qrData: ');
    console.log(qrData);
  }

  return (
    <div className="flex flex-col justify-center items-center p-8">
      <div className="w-full mx-auto p-8 bg-gray-800 text-gray-200 shadow-md rounded-lg">
        <div className="flex flex-col items-center" style={{wordBreak: "break-all"}}>
          <div className="w-full mx-auto p-8 bg-white rounded-lg shadow-md">
            <QRCode value={qrData} style={{width: '100%', height: '100%'}}/>
          </div>
          <p className="mt-4 text-center text-sm" style={{wordBreak: 'keep-all'}} dangerouslySetInnerHTML={{
            __html: t('qrCodeComponent.text', {var1: amount}),
          }}/>
          <div className="w-full text-left">
            {/*<label htmlFor="address" className="block text-sm font-medium">Address</label>*/}
            <div className="mt-2 flex items-center">
              <input
                id="address"
                name="address"
                className="block w-full px-3 py-2 border border-gray-600 border-r-0 rounded-l-md bg-gray-900 text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="0x..."
                value={address}
                required
                readOnly
              />
              <button
                onClick={() => copyToClipboard(address)}
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

export default DonationQRCode;
