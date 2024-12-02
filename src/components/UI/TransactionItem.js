import Link from "next/link";
import React from "react";
import classes from './TransactionItem.module.scss';
import {useAppContext} from "@/contexts/AppContext";
import {useTranslation} from "next-i18next";
import IconDollar from "../../../public/iconsax/dollar-circle.svg";
import IconClock from "../../../public/iconsax/clock-1.svg";
import IconDanger from "../../../public/iconsax/danger.svg";
import {getTimeAgo} from "@/utils/helpers";
import IconBox from "../../../public/iconsax/box-1.svg";
import IconWallet from "../../../public/iconsax/wallet-2.svg";
import IconLink from "../../../public/iconsax/link-2.svg";
import {formatEther} from "viem";

const TransactionItem = ({ transaction, isTest, theme }) => {
  const { t,i18n } = useTranslation();
  return (
    <div className={`${classes.transactionItemWrapper} ${classes[theme]} border-b py-4 first:pt-0 last:pb-0 last:border-b-0`}>
      <div className="flex flex-wrap lg:flex-nowrap lg:space-x-6">

        {/* Block */}
        <div className={`${classes.transactionDetailWrapper} ${classes[theme]} flex flex-col items-start w-1/2 lg:flex-1`}>
          <div className={`${classes.transactionDetailIconWrapper} ${classes[theme]} flex flex-col items-center lg:items-start`}>
            <IconBox className={`${classes[theme]} w-6 h-6 mb-1`} />
            <span className="text-xs">{t('sections.transactions.list.block')}</span>
          </div>
          <div className={`${classes.transactionDetailValueWrapper} ${classes[theme]} text-left`}>
            {transaction.blockNumber}
          </div>
        </div>

        {/* Age */}
        <div className={`${classes.transactionDetailWrapper} ${classes[theme]} flex flex-col items-start w-1/2 lg:flex-1`}>
          <div className={`${classes.transactionDetailIconWrapper} ${classes[theme]} flex flex-col items-center lg:items-start`}>
            <IconClock className={`${classes[theme]} w-6 h-6 mb-1`} />
            <span className="text-xs">{t('sections.transactions.list.age')}</span>
          </div>
          <div className={`${classes.transactionDetailValueWrapper} ${classes[theme]} text-left`}>
            {getTimeAgo(transaction.timeStamp, i18n.language)} ago
          </div>
        </div>

        {/* From */}
        <div className={`${classes.transactionDetailWrapper} ${classes[theme]} flex flex-col items-start w-full lg:w-auto lg:flex-1`}>
          <div className={`${classes.transactionDetailIconWrapper} ${classes[theme]} flex flex-col items-center lg:items-start`}>
            <IconWallet className={`${classes[theme]} w-6 h-6 mb-1`} />
            <span className="text-xs">{t('sections.transactions.list.from')}</span>
          </div>
          <div
            className={`${classes.transactionDetailValueWrapper} ${classes[theme]} text-left flex items-center`}
            style={{width: 'calc(100% - 48px)'}}>
              <span className="truncate max-w-[calc(100%_-_10px)]" title={transaction.from}>
                        {transaction.from}
                      </span>
            <a
              href={`https://` + (isTest ? 'sepolia.' : null) + `etherscan.io/tx/${transaction.hash}`}
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
          className={`${classes.transactionDetailWrapper} ${classes[theme]} flex flex-col items-start w-1/2 lg:flex-1`}>
          <div
            className={`${classes.transactionDetailIconWrapper} ${classes[theme]} flex flex-col items-center lg:items-start`}>
            <IconDollar className={`${classes[theme]} w-6 h-6 mb-1`}/>
            <span className="text-xs">{t('sections.transactions.list.amount')}</span>
          </div>
          <div className={`${classes.transactionDetailValueWrapper} ${classes[theme]} text-left`}>
            {formatEther(transaction.value)} ETH
          </div>
        </div>

        {/* TxFee */}
        <div className={`${classes.transactionDetailWrapper} ${classes[theme]} flex flex-col items-start w-1/2 lg:flex-1`}>
          <div className={`${classes.transactionDetailIconWrapper} ${classes[theme]} flex flex-col items-center lg:items-start`}>
            <IconDollar className={`${classes[theme]} w-6 h-6 mb-1`} />
            <span className="text-xs">TxFee</span>
          </div>
          <div className={`${classes.transactionDetailValueWrapper} ${classes[theme]} text-left`}>
            {Number(formatEther((BigInt(transaction.gasUsed) * BigInt(transaction.gasPrice)))).toFixed(8)} ETH
          </div>
        </div>

      </div>
    </div>
  );
};

export default TransactionItem;



