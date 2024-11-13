// src/pages/blog/index.js
import axios from 'axios';
import Link from 'next/link';
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React from "react";
import {useTranslation} from "next-i18next";

export default function Blog({ articles }) {
  console.log(articles);
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('blog.listTitleText')}</title>
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-6">{t('blog.listTitleText')}</h1>
        <ul className="space-y-6">
          {articles.map((article) => (
            <li key={article.slug} className="p-6 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <Link className="text-2xl font-semibold text-blue-600 hover:text-blue-800 transition-colors" href={`/blog/${article.slug}`}>
                  {article.title[i18n.language]}
              </Link>
              <p className="text-gray-700 mt-2">{article.short[i18n.language]}</p>
              <Link className="text-sm text-blue-500 hover:underline mt-4 inline-block" href={`/blog/${article.slug}`}>
               Read more
              </Link>
              {article.files?.[0].path && <img src={article.files?.[0].path} alt={'Image for ' + article.description[i18n.language]}/>}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

// Fetch the list of articles to display on the /blog page
export async function getServerSideProps({ locale }) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    const response = await axios.get(`${apiUrl}articles`);

    if (!response.data || response.data.length === 0) {
      return { notFound: true }; // Return 404 if no articles are found
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
    return { notFound: true }; // Return 404 if there's an error
  }
}
