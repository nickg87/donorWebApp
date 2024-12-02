// src/pages/pool/[id].js
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from "next/head";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Link from "next/link";
import React from "react";
import PageWrapper from "@/components/PageWrapper";
import Icon3DCube from "../../../public/iconsax/3dcube.svg";
import classes from "../pages.module.scss";
import {useAppContext} from "@/contexts/AppContext";
import TransactionItem from "@/components/UI/TransactionItem";

// Replace this with your API URL
const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL; // Make sure this is your correct backend API URL

// This is the page component
export default function PoolPage({ pool }) {
  console.log(pool)
  const { t } = useTranslation();
  const { globalState } = useAppContext();
  console.log(globalState);
  const { i18n } = useTranslation();
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  // In case the page is built without a specific id or falls back
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PageWrapper
        theme={globalState?.theme}
        pageTitle={pool.title[i18n.language]}
        sectionIcon={<Icon3DCube className={`w-6 h-6`}/>}
        sectionNameText={pool.title[i18n.language]}
      >
        <div className="flex flex-col justify-center items-center py-4">
          {pool.path && <img src={pool.path} alt={'Image for ' + pool.description[i18n.language]}/>}
          <p dangerouslySetInnerHTML={{
            __html: pool.description[i18n.language],
          }}/>
        </div>

        <div className="flex flex-col justify-center items-center py-4">
          <h2
            className={`${classes.sectionTitle} ${classes[globalState?.theme]} mt-4 mb-4`}>{t('sections.transactions.title')}</h2>
          <div className="sm:px-2 sm:py-0 md:p-8 w-full sticky top-0 z-[2]">
            <div
              className={`p-8 rounded-[30px] ${classes.sectionItemsWrapper} ${classes.customScrollbar} ${classes[globalState?.theme]} border backdrop-blur-md ${globalState?.theme === 'dark' ? 'border-darkBorder bg-[#030A31] bg-opacity-80 shadow-darkTheme' : 'border-lightBorder bg-white/54 shadow-lightTheme'} `}>
              {pool.transactions && pool.transactions.length > 0 ? (
                pool.transactions.map((item) => (
                  <TransactionItem
                    key={item.id}
                    transaction={item}
                    isTest={pool?.is_test_net}
                    theme={globalState?.theme}
                  />
                ))
              ) : (
                <div className={`justify-center items-center text-center py-4`}>We don't have transactions yet</div>
              )}

            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
}

// Fetch the content for each specific blog post (using the id)
export async function getServerSideProps({params, locale}) {
  const {id} = params; // Extract the id from the URL

  try {
    const response = await axios.get(`${apiUrl}pools/getById/${id}`);

    if (!response.data) {
      return {notFound: true}; // If no post is found, return a 404
    }

    const pool = response.data; // Extract the post data from the API response

    return {
      props: {
        pool, // Pass post data as a prop
        ...(await serverSideTranslations(locale, ['common'])),
      },
    };
  } catch (error) {
    console.error('Error fetching post data:', error);
    return {notFound: true}; // Return 404 if there's an error or no data
  }
}