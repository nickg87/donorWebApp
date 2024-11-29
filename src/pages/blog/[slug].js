// src/pages/blog/[slug].js
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from "next/head";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Link from "next/link";
import React from "react";
import PageWrapper from "@/components/PageWrapper";
import IconBook from "../../../public/iconsax/book-1.svg";
import ArticleListItem from "@/components/UI/ArticleListItem";
import {useAppContext} from "@/contexts/AppContext";
import ButtonWrapper from "@/components/UI/ButtonWrapper";
import classes from "../pages.module.scss";

// Replace this with your API URL
const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL; // Make sure this is your correct backend API URL

// This is the page component
export default function BlogPost({ post }) {
  //console.log(post)
  const { t } = useTranslation();
  const { globalState } = useAppContext();
  const { i18n } = useTranslation();
  const router = useRouter();
  const { slug } = router.query;

  // In case the page is built without a specific slug or falls back
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PageWrapper
        theme={globalState?.theme}
        pageTitle={post.title[i18n.language]}
        sectionIcon={<IconBook className={`w-6 h-6`}/>}
        sectionNameText={post.title[i18n.language]}
      >
        <>
          <blockquote className={classes.short}>{post.short[i18n.language]}</blockquote>
          {post.path && <img src={post.path} alt={'Image for ' + post.description[i18n.language]}/>}
          <p dangerouslySetInnerHTML={{
            __html: post.description[i18n.language],
          }}/>

          <Link href={`/blog`} className="block mt-4 md:inline-block pr-2">
            <ButtonWrapper
              theme={'dark'}
            >
              {t('blog.backToText')}
            </ButtonWrapper>
          </Link>

        </>
      </PageWrapper>
    </>
  );
}

// Fetch the content for each specific blog post (using the slug)
export async function getServerSideProps({ params, locale }) {
  const { slug } = params; // Extract the slug from the URL

  try {
    const response = await axios.get(`${apiUrl}articles/${slug}`);

    if (!response.data) {
      return { notFound: true }; // If no post is found, return a 404
    }

    const post = response.data; // Extract the post data from the API response

    return {
      props: {
        post, // Pass post data as a prop
        ...(await serverSideTranslations(locale, ['common'])),
      },
    };
  } catch (error) {
    console.error('Error fetching post data:', error);
    return { notFound: true }; // Return 404 if there's an error or no data
  }
}