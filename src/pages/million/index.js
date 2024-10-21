import React from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from "next/head";


export default function Million() {
  return (
    <>
      <Head>
        <title>The One Million Dollar Pool | DonorHub App</title>
      </Head>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">One Million Dollar Pool</h1>
        <p>
          Welcome to [Your Website/App Name]! These terms and conditions outline the rules and regulations
          for the use of [Your Website/App Name]'s Website and Mobile App. By accessing this website and app
          we assume you accept these terms and conditions. Do not continue to use [Your Website/App Name] if
          you do not agree to take all of the terms and conditions stated on this page.
        </p>
      </div>
    </>
  );
}

// Add serverSideTranslations to load translations
export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}