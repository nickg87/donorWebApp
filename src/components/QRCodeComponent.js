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
    <div className="flex flex-col items-center" style={{ wordBreak: "break-all" }}>
      <div className="max-w-xs mx-auto p-4 bg-white rounded-lg shadow-md">
        <QRCode value={qrData} size={200}/>
      </div>
      <p className="mt-4 text-center text-sm">{t('qrCodeComponent.text', {var1: amount, var2: address})}</p>
    </div>
  );
};

export default DonationQRCode;
