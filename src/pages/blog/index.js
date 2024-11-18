// src/pages/blog/index.js
import axios from 'axios';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React from "react";
import { useTranslation } from "next-i18next";
import { useAppContext } from "@/contexts/AppContext";
import ArticleListItem from "@/components/UI/ArticleListItem";

export default function Blog({ articles }) {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('blog.listTitleText')}</title>
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-left mb-10">{t('blog.listTitleText')}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {articles.map((article) => (
              <ArticleListItem key={article?.id} article={article}/>
          ))}
        </div>
      </div>
    </>
  );
}

// Fetch the list of articles to display on the /blog page
export async function getServerSideProps({locale}) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    const response = await axios.get(`${apiUrl}articles`);

    if (!response.data || response.data.length === 0) {
      return {notFound: true}; // Return 404 if no articles are found
    }

    const articles = response.data;

    return {
      props: {
        articles, // Pass articles data as a prop
        ...(await serverSideTranslations(locale, ['common'])), // Load translations
      },
    };
  } catch (error) {
    console.error('Error fetching articles:', error);
    return {notFound: true}; // Return 404 if there's an error
  }
}
