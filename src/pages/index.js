// src/pages/index.js
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MainContent from "@/components/MainContent";

export async function getServerSideProps({ locale }) {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  console.log('apiUrl via process.env.NEXT_PUBLIC_BACKEND_API_URL: ' + apiUrl);

  try {
    const poolsRes = await fetch(apiUrl + 'pools');
    const poolsData = await poolsRes.json();

    const transactionsRes = await fetch(apiUrl + 'transactions');
    const transactionsData = await transactionsRes.json();

    return {
      props: {
        pools: poolsData,
        transactions: transactionsData,
        ...(await serverSideTranslations(locale, ['common'])),
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        pools: null,
        transactions: null,
        ...(await serverSideTranslations(locale, ['common'])),
      },
    };
  }
}

export default function Home({ pools, transactions }) {
  return <MainContent pools={pools} transactions={transactions} />;
}
