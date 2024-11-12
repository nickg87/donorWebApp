// src/pages/blog/[slug].js
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from "next/head";
import {useTranslation} from "next-i18next";

// Replace this with your API URL
const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL; // Make sure this is your correct backend API URL

// This is the page component
export default function BlogPost({ post }) {
  const router = useRouter();
  const { slug } = router.query;
  const { i18n } = useTranslation();

  // In case the page is built without a specific slug or falls back
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{post.title[i18n.language]}</title>
      </Head>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">{post.title[i18n.language]}</h1>
        <p>{post.description[i18n.language]}</p>
        {post.path && <img src={post.path} alt={'Image for ' + post.description[i18n.language]}/>}
      </div>
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
      },
    };
  } catch (error) {
    console.error('Error fetching post data:', error);
    return { notFound: true }; // Return 404 if there's an error or no data
  }
}