"use client";

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import {formatEther } from 'viem';
import { fetchCurrentTransactionsForPoolId, timestampToDateString, getTimeAgo} from "@/utils/helpers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import {useAppContext} from "@/contexts/AppContext";
import SectionNameWrapper from "@/components/UI/SectionNameWrapper";
import IconCard from "../../public/iconsax/card.svg";
import classes from "./PoolCurrentTransactionList.module.scss";

import IconClock from "../../public/iconsax/clock-1.svg";
import IconWallet from "../../public/iconsax/wallet-2.svg";
import IconBox from "../../public/iconsax/box-1.svg";
import IconLink from "../../public/iconsax/link-2.svg";
import IconDollar from "../../public/iconsax/dollar-circle.svg";


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

  const TransactionItem = ({ transaction }) => {
    const { t,i18n } = useTranslation();
    return (
      <div className={`${classes.transactionItemWrapper} ${classes[globalState?.theme]} border-b py-4 first:pt-0 last:pb-0 last:border-b-0`}>
        <div className="flex flex-wrap lg:flex-nowrap lg:space-x-6">

          {/* Block */}
          <div className={`${classes.transactionDetailWrapper} ${classes[globalState?.theme]} flex flex-col items-start w-1/2 lg:flex-1`}>
            <div className={`${classes.transactionDetailIconWrapper} ${classes[globalState?.theme]} flex flex-col items-center lg:items-start`}>
              <IconBox className={`${classes[globalState?.theme]} w-6 h-6 mb-1`} />
              <span className="text-xs">{t('sections.transactions.list.block')}</span>
            </div>
            <div className={`${classes.transactionDetailValueWrapper} ${classes[globalState?.theme]} text-left`}>
              {transaction.blockNumber}
            </div>
          </div>

          {/* Age */}
          <div className={`${classes.transactionDetailWrapper} ${classes[globalState?.theme]} flex flex-col items-start w-1/2 lg:flex-1`}>
            <div className={`${classes.transactionDetailIconWrapper} ${classes[globalState?.theme]} flex flex-col items-center lg:items-start`}>
              <IconClock className={`${classes[globalState?.theme]} w-6 h-6 mb-1`} />
              <span className="text-xs">{t('sections.transactions.list.age')}</span>
            </div>
            <div className={`${classes.transactionDetailValueWrapper} ${classes[globalState?.theme]} text-left`}>
              {getTimeAgo(transaction.timeStamp, i18n.language)} ago
            </div>
          </div>

          {/* From */}
          <div className={`${classes.transactionDetailWrapper} ${classes[globalState?.theme]} flex flex-col items-start w-full lg:w-auto lg:flex-1`}>
            <div className={`${classes.transactionDetailIconWrapper} ${classes[globalState?.theme]} flex flex-col items-center lg:items-start`}>
              <IconWallet className={`${classes[globalState?.theme]} w-6 h-6 mb-1`} />
              <span className="text-xs">{t('sections.transactions.list.from')}</span>
            </div>
            <div
              className={`${classes.transactionDetailValueWrapper} ${classes[globalState?.theme]} text-left flex items-center`}
              style={{width: 'calc(100% - 48px)'}}>
              <span className="truncate max-w-[calc(100%_-_10px)]" title={transaction.from}>
                        {transaction.from}
                      </span>
              <a
                href={`https://etherscan.io/tx/${transaction.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link ml-2 hover:text-blue-500 transition"
                title="Check it on etherscan!"
              >
                <IconLink className="w-6 h-6 ml-1"/>
              </a>

            </div>
          </div>

          {/* Amount */}
          <div
            className={`${classes.transactionDetailWrapper} ${classes[globalState?.theme]} flex flex-col items-start w-1/2 lg:flex-1`}>
            <div
              className={`${classes.transactionDetailIconWrapper} ${classes[globalState?.theme]} flex flex-col items-center lg:items-start`}>
              <IconDollar className={`${classes[globalState?.theme]} w-6 h-6 mb-1`}/>
              <span className="text-xs">{t('sections.transactions.list.amount')}</span>
            </div>
            <div className={`${classes.transactionDetailValueWrapper} ${classes[globalState?.theme]} text-left`}>
              {formatEther(transaction.value)} ETH
            </div>
          </div>

          {/* TxFee */}
          <div className={`${classes.transactionDetailWrapper} ${classes[globalState?.theme]} flex flex-col items-start w-1/2 lg:flex-1`}>
            <div className={`${classes.transactionDetailIconWrapper} ${classes[globalState?.theme]} flex flex-col items-center lg:items-start`}>
              <IconDollar className={`${classes[globalState?.theme]} w-6 h-6 mb-1`} />
              <span className="text-xs">TxFee</span>
            </div>
            <div className={`${classes.transactionDetailValueWrapper} ${classes[globalState?.theme]} text-left`}>
              {Number(formatEther((BigInt(transaction.gasUsed) * BigInt(transaction.gasPrice)))).toFixed(8)} ETH
            </div>
          </div>

        </div>
      </div>
    );
  };

  if (!transactions) return null;

  return (
    <>
      <div className="flex flex-col justify-center items-center py-4">
        <SectionNameWrapper icon={<IconCard className={`w-6 h-6`}/>} theme={globalState?.theme} text={t('sections.transactions.name')} extra={'uppercase h-[50px] w-[200px]'}/>
      </div>
      <div className="flex flex-col justify-center items-center p-4">
        <h2 className={`${classes.sectionTitle} ${classes[globalState?.theme]} mt-4 mb-4`}>{t('sections.transactions.title')}</h2>
        <div className="sm:px-2 sm:py-0 md:p-8 w-full sticky top-0 z-[2]">
          <div
            className={`p-8 rounded-[30px] ${classes.transactionItemsWrapper} ${classes.customScrollbar} ${classes[globalState?.theme]} border backdrop-blur-md ${globalState?.theme === 'dark' ? 'border-darkBorder bg-[#030A31] bg-opacity-80 shadow-darkTheme' : 'border-lightBorder bg-white/54 shadow-lightTheme'} `}>
            {transactions && (
              transactions.map((item) => (
                <TransactionItem key={item.id} transaction={item}/>
              ))
            )}
          </div>
        </div>
      </div>
    </>

  );
};


export default PoolCurrentTransactionList;