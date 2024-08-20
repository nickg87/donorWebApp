// src/pages/index.js
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MainContent from "@/components/MainContent";

export async function getServerSideProps({ locale }) {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  try {
    const poolsRes = await fetch(apiUrl + 'pools');
    const poolsData = await poolsRes.json();

    const donorsRes = await fetch(apiUrl + 'donors');
    const donorsData = await donorsRes.json();

    return {
      props: {
        pools: poolsData,
        donors: donorsData,
        ...(await serverSideTranslations(locale, ['common'])),
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        pools: null,
        donors: null,
        ...(await serverSideTranslations(locale, ['common'])),
      },
    };
  }
}

export default function Home({ pools, donors }) {
  return <MainContent pools={pools} donors={donors} />;
}
