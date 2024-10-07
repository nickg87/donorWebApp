"use client";

import CustomButton from "./CustomButton"; // Assuming you rename CustomButton to Web3CustomButton
import SendTransaction from "./SendTransaction"; // Assuming you rename CustomButton to Web3CustomButton
import { useAccount } from "wagmi";

export default function DApp({currentPool}) {
  const { isConnected, address } = useAccount();

  return (
    <div className="flex flex-col justify-center items-center p-8">
      {/*{isConnected &&*/}
      {/*  <div className="flex items-center p-2 m-10">*/}
      {/*    <w3m-button size="sm"/>*/}
      {/*  </div>}*/}
      {isConnected && <SendTransaction currentPool={currentPool}  userWalletAddress={address}/>}
      <CustomButton/>

    </div>
  );
}
