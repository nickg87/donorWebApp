import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const DonationQRCode = ({ address, amount }) => {
  const qrData = `ethereum:${address}?value=${amount}`;

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-xs mx-auto p-4 bg-white rounded-lg shadow-md">
        <QRCode value={qrData} size={200}/>
      </div>
      <p className="mt-4 text-center text-sm">Scan QR Code with your wallet app to donate {amount} ETH to {address}</p>
    </div>
  );
};

export default DonationQRCode;
