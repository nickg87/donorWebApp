// src/pages/blog/index.js
import axios from 'axios';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React from "react";
import { useTranslation } from "next-i18next";
import { useAppContext } from "@/contexts/AppContext";
import ArticleListItem from "@/components/UI/ArticleListItem";
import IconBook from "../../../public/iconsax/book-1.svg";
import PageWrapper from "@/components/PageWrapper";

export default function Blog({ articles }) {
  const { t, i18n } = useTranslation();
  const { globalState } = useAppContext();

  return (
    <PageWrapper
      theme={globalState?.theme}
      pageTitle={t('blog.pageTitle')}
      sectionIcon={<IconBook className={`w-6 h-6`}/>}
      sectionNameText={t('blog.linkText')}
      sectionTitleText={t('blog.listTitleText')}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {articles.map((article) => (
          <ArticleListItem key={article?.id} article={article}/>
        ))}
      </div>
    </PageWrapper>
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
