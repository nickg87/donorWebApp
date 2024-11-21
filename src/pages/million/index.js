import React from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import SpecialPoolContent from "@/components/SpecialPoolContent";
import axios from "axios";

export default function Million({ pools, transactions, articles }) {
  return <SpecialPoolContent pools={pools} transactions={transactions} articles={articles} />
}

// Add serverSideTranslations to load translations
export async function getServerSideProps({ locale }) {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  console.log('apiUrl via process.env.NEXT_PUBLIC_BACKEND_API_URL: ' + apiUrl);

  try {
    const poolsRes = await fetch(apiUrl + 'pools');
    const poolsData = await poolsRes.json();

    const transactionsRes = await fetch(apiUrl + 'transactions');
    const transactionsData = await transactionsRes.json();

    const articlesRes = await axios.get(`${apiUrl}articles`);
    const articlesData = await articlesRes.data;

    return {
      props: {
        pools: poolsData,
        transactions: transactionsData,
        articles: articlesData,
        ...(await serverSideTranslations(locale, ['common'])),
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        pools: null,
        transactions: null,
        articles: null,
        ...(await serverSideTranslations(locale, ['common'])),
      },
    };
  }
}
