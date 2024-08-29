import React, { useState } from 'react';
import { useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '@/contexts/AppContext';

//https://wagmi.sh/react/guides/send-transaction
export default function SendTransaction() {
  const { data: hash, error, isPending, sendTransaction } = useSendTransaction();
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(true); // New state to handle confirmation display
  const recipientAddress = process.env.NEXT_PUBLIC_DONOR_ETH_ADDRESS;
  const { updateShouldFetch } = useAppContext();

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const to = formData.get('address');
    const value = formData.get('value');
    try {
      await sendTransaction({ to, value: parseEther(value) });
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
    <div className="max-w-sm md:max-w-lg mx-auto p-6 bg-gray-800 text-gray-200 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Send Transaction</h2>
      <form className="space-y-4" onSubmit={submit}>
        <div>
          <label htmlFor="address" className="block text-sm font-medium">Address</label>
          <input
            id="address"
            name="address"
            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-900 text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="0x..."
            value={recipientAddress}
            required
            readOnly
          />
        </div>
        <div>
          <label htmlFor="value" className="block text-sm font-medium">Amount (ETH)</label>
          <input
            id="value"
            name="value"
            type="number"
            step="0.000000001"
            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-900 text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="0.001"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-2 px-4 rounded-md font-semibold text-white ${
            isPending ? 'bg-gray-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
          } transition duration-200`}
        >
          {isPending ? 'Confirming...' : 'Send'}
        </button>
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
      {error && <div className="mt-4 p-2 bg-red-800 border border-red-700 rounded-md text-red-300">Error: {error.message || 'An error occurred'}</div>}
    </div>
  );
}
