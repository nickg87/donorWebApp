// src/pages/index.js
import React from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from "next/head";
import MainContent from "@/components/MainContent";

export async function getServerSideProps({ locale }) {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  console.log('apiUrl via process.env.NEXT_PUBLIC_BACKEND_API_URL: ' + apiUrl);

  try {
    const poolsRes = await fetch(apiUrl + 'pools');
    const poolsData = await poolsRes.json();

    const transactionsRes = await fetch(apiUrl + 'transactions');
    const transactionsData = await transactionsRes.json();

    const articlesRes = await fetch(apiUrl + 'articles');
    const articlesData = await articlesRes.json();

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

export default function Home({ pools, transactions, articles }) {
  return <>
    <Head>
      <link rel="canonical" href={(process.env.NEXT_PUBLIC_SITE_URL || "https://luckyhub.app")}/>
    </Head>
    <MainContent pools={pools} transactions={transactions} articles={articles}/>
  </>

}
