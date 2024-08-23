"use client";

import CustomButton from "./CustomButton"; // Assuming you rename CustomButton to Web3CustomButton
import TransferButton from "./TransferButton"; // Assuming you rename CustomButton to Web3CustomButton
import { useAccount } from "wagmi";

export default function DApp() {
  const { isConnected } = useAccount();

  return (
    <>
      {isConnected &&
        <div className="flex items-center p-2 m-10">
          <w3m-button size="sm"/>
        </div> }
      <CustomButton />
      <TransferButton />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-full">


        {/*{isConnected && (*/}
        {/*  <>*/}
        {/*    <div className="grid  border border-gray-200 rounded-lg overflow-hidden shadow-sm">*/}
        {/*      <h3 className="text-sm font-semibold p-2">Account button (only when connected)</h3>*/}
        {/*      <div className="text-xs  p-2 font-mono overflow-x-auto">*/}
        {/*        {'<w3m-account-button balance={"show"} />'}*/}
        {/*      </div>*/}
        {/*      <div className="flex justify-center items-center p-4">*/}
        {/*        <w3m-account-button balance={"show"} />*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*    <div className="grid  border border-gray-200 rounded-lg overflow-hidden shadow-sm">*/}
        {/*      <h3 className="text-sm font-semibold p-2">Account button with balance hidden</h3>*/}
        {/*      <div className="text-xs  p-2 font-mono overflow-x-auto">*/}
        {/*        {'<w3m-account-button balance={"hide"} />'}*/}
        {/*      </div>*/}
        {/*      <div className="flex justify-center items-center p-4">*/}
        {/*        <w3m-account-button balance={"hide"} />*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </>*/}
        {/*)}*/}

        {/*{!isConnected && (*/}
        {/*  <div className="grid border border-gray-200 rounded-lg overflow-hidden shadow-sm">*/}
        {/*    <div className="text-sm font-semibold p-2">Connect button (only when not connected)</div>*/}
        {/*    <div className="text-xs  p-2 font-mono overflow-x-auto">{"<w3m-connect-button />"}</div>*/}
        {/*    <div className="flex justify-center items-center p-4">*/}
        {/*      <w3m-connect-button />*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*)}*/}

        {/*<div className="grid  border border-gray-200 rounded-lg overflow-hidden shadow-sm">*/}
        {/*  <h3 className="text-sm font-semibold p-2">Custom button</h3>*/}
        {/*  <div className="text-xs  p-2 font-mono overflow-x-auto">{"Check: components/CustomButton.js"}</div>*/}
        {/*  <div className="flex justify-center items-center p-4">*/}
        {/*    <CustomButton />*/}
        {/*  </div>*/}
        {/*</div>*/}

      </div>
    </>
  );
}
