"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";
import { ethers } from "ethers";
import React, { useState, useEffect, useCallback } from "react";

export default function TransferButton() {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [provider, setProvider] = useState(null);
  const [error, setError] = useState(null);
  const amountInEther = "0.0001"; // Amount to send in Ether

  useEffect(() => {
    // Initialize provider when wallet is connected
    if (window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(web3Provider);
    } else {
      console.error("Ethereum provider not found");
    }
  }, [isConnected]); // Depend on isConnected to initialize provider

  const handleTransfer = useCallback(async () => {
    if (!provider) {
      console.error("Provider is not available.");
      setError("Provider is not available.");
      return;
    }

    try {
      const signer = provider.getSigner();
      const recipientAddress = process.env.NEXT_PUBLIC_DONOR_ETH_ADDRESS; // Ensure this is set

      if (!recipientAddress) {
        console.error("Recipient address is not set.");
        setError("Recipient address is not set.");
        return;
      }

      const amount = ethers.utils.parseEther(amountInEther); // Convert to Wei

      const tx = {
        to: recipientAddress,
        value: amount,
      };

      const txResponse = await signer.sendTransaction(tx);
      console.log("Transaction sent:", txResponse);

      // Optionally, wait for the transaction to be mined
      await txResponse.wait();
      console.log("Transaction mined:", txResponse);
    } catch (err) {
      setError(`Transaction failed: ${err.message}`);
      console.error("Transaction error:", err);
    }
  }, [provider]);

  if (!isConnected) {
    return (
      <button onClick={() => open()} className="px-4 py-2 bg-blue-500 text-white rounded">
        Connect Wallet
      </button>
    );
  }

  return (
    <div>
      <button
        onClick={handleTransfer}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Send {amountInEther} ETH
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
