import { useRouter } from 'next/router';
import axios from 'axios';

export default function BlogPost({ post }) {
  const router = useRouter();

  // If the page is being generated, display loading
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {/* You can also include meta tags for SEO here */}
    </div>
  );
}

// Fetch the data for each post using the slug
export async function getServerSideProps({ params }) {
  const { slug } = params;

  // Call your Express backend API to get the post content
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/${slug}`);
  const post = response.data;

  // If the post doesn't exist, return a 404 page
  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post }, // Pass post data to the page component
  };
}
