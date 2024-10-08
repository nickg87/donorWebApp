"use client";

import CustomButton from "./CustomButton"; // Assuming you rename CustomButton to Web3CustomButton
import SendTransaction from "./SendTransaction"; // Assuming you rename CustomButton to Web3CustomButton
import { useAccount, useBalance } from "wagmi";
import {useTranslation} from "next-i18next";

export default function DApp({currentPool}) {
  const { isConnected, address } = useAccount();
  const { data: balance, isLoading } = useBalance({
    address, // User's wallet address
  });
  const { t, i18n } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center p-8">
      {/*{isConnected &&*/}
      {/*  <div className="flex items-center p-2 m-10">*/}
      {/*    <w3m-button size="sm"/>*/}
      {/*  </div>}*/}
      {isConnected && <SendTransaction currentPool={currentPool}  userWalletAddress={address} userBalance={{balance}}/>}
      {!isConnected && <>{t('donateComponent.howToParticipateText')}</>}
      <CustomButton/>

    </div>
  );
}
