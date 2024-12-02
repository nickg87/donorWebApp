"use client";

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import {formatEther } from 'viem';
import { fetchCurrentTransactionsForPoolId, timestampToDateString, getTimeAgo} from "@/utils/helpers";
import {useAppContext} from "@/contexts/AppContext";
import SectionNameWrapper from "@/components/UI/SectionNameWrapper";
import IsTestNetComponent from "@/components/UI/IsTestNetComponent";
import TransactionItem from "@/components/UI/TransactionItem";
import IconCard from "../../public/iconsax/card.svg";
import classes from "./PoolCurrentTransactionList.module.scss";



const PoolCurrentTransactionList = ({ pool, type }) => {
  const { globalState, updateCurrentPoolBalance, updateSpecialPoolBalance } = useAppContext();
  const isSpecial = type === 'special';
  //console.log(globalState);
  const [transactions, setTransactions] = useState(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const getTransactionsForPool = async (id) => {
      const data = await fetchCurrentTransactionsForPoolId(id);
      if (data?.response?.status !== 404) {
        setTransactions(data);
      }
    };

    if (pool?.id) {
      getTransactionsForPool(pool?.id);
    }

  }, [pool?.id]);

  useEffect(() => {
    if (transactions) {
      const balance = transactions.reduce((acc, transaction) => acc + Number(formatEther(transaction.value)), 0);
      if (isSpecial) {
        updateSpecialPoolBalance(balance);
      } else {
        updateCurrentPoolBalance(balance);
      }

    }
  }, [pool?.id, transactions]);

  if (!transactions) return null;

  return (
    <>
      {pool?.is_test_net && <IsTestNetComponent/> }
      <div className="flex flex-col justify-center items-center py-4">
        <SectionNameWrapper icon={<IconCard className={`w-6 h-6`}/>} theme={globalState?.theme} text={t('sections.transactions.name') + (pool?.is_test_net ? ' This is a SEPOLIA Test net!' : '')} extra={'uppercase h-[50px] w-[200px]'}/>
      </div>
      <div className="flex flex-col justify-center items-center p-4">
        <h2 className={`${classes.sectionTitle} ${classes[globalState?.theme]} mt-4 mb-4`}>{t('sections.transactions.title')}</h2>
        <div className="sm:px-2 sm:py-0 md:p-8 w-full sticky top-0 z-[2]">
          <div
            className={`p-8 rounded-[30px] ${classes.transactionItemsWrapper} ${classes.customScrollbar} ${classes[globalState?.theme]} border backdrop-blur-md ${globalState?.theme === 'dark' ? 'border-darkBorder bg-[#030A31] bg-opacity-80 shadow-darkTheme' : 'border-lightBorder bg-white/54 shadow-lightTheme'} `}>
            {transactions && (
              transactions.map((item) => (
                <TransactionItem key={item.id} transaction={item} isTest={pool?.is_test_net} theme={globalState?.theme}/>
              ))
            )}
          </div>
        </div>
      </div>
    </>

  );
};


export default PoolCurrentTransactionList;