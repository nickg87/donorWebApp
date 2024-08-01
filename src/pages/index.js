// src/app/page.js
import React from 'react';
import MainContent from '../components/MainContent';
import { AppProvider } from '../contexts/AppContext';

const apiUrl = process.env.REACT_APP_API_URL;

export default function Home({pools, donors}) {
  return <AppProvider>
    <MainContent pools={pools} donors={donors}/>
  </AppProvider>
}


export async function getServerSideProps(context) {
  try {
    // Fetch pools
    const poolsRes = await fetch(apiUrl + 'pools');
    const poolsData = await poolsRes.json();

    // Fetch donors
    const donorsRes = await fetch(apiUrl + 'donors');
    const donorsData = await donorsRes.json();

    return {
      props: {
        pools: poolsData,
        donors: donorsData,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        pools: null,
        donors: null,
      },
    };
  }
}
