import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import {useTranslation} from "next-i18next";
import { parseEther } from 'viem';

const DonationQRCode = ({ address, amount }) => {
  console.log(amount)
  console.log(typeof amount)
  const parsedAmount = parseEther(amount);
  console.log(parsedAmount);
  const { t, i18n } = useTranslation();
  const qrData = `ethereum:${address}?value=${parsedAmount}`;
  console.log(qrData)

  return (
    <div className="flex flex-col justify-center items-center p-8">
      <div className="w-full mx-auto p-8 bg-gray-800 text-gray-200 shadow-md rounded-lg">
        <div className="flex flex-col items-center" style={{wordBreak: "break-all"}}>
          <div className="w-full mx-auto p-8 bg-white rounded-lg shadow-md">
            <QRCode value={qrData}  style={{ width: '100%', height: '100%' }} />
          </div>
          <p className="mt-4 text-center text-sm" style={{wordBreak:'keep-all'}}  dangerouslySetInnerHTML={{
            __html: t('qrCodeComponent.text', {var1: amount, var2: address}),
          }}/>


        </div>
      </div>
    </div>

  );
};

export default DonationQRCode;
