import axios from 'axios';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getServerSideProps(context) {
  const { temp_hash } = context.query;

  if (!temp_hash) {
    return {
      notFound: true, // Return 404 for missing temp_hash
    };
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace(/\/$/, ''); // Ensure there's no trailing slash
    const backendUrl = `${apiUrl}/emailSubscription/verify?temp_hash=${temp_hash}`;
    const response = await axios.get(backendUrl);

    // Check if response contains a message or error object and use the appropriate message
    const message = response.data.message ? response.data.message?.[context.locale] : 'Subscription verified!';

    return {
      props: {
        status: 'Success', // Assuming the verification is successful
        message: message || 'Internal server error.',
        ...(await serverSideTranslations(context.locale, ['common'])),
      },
    };
  } catch (error) {
    //console.error('Error verifying subscription:', JSON.stringify(error.response?.data || error.message));
    // If an error is returned, extract the message from the error object
    const errorMessage = error.response?.data?.error?.[context.locale] || 'Internal server error.';

    return {
      props: {
        status: 'Error',
        message: errorMessage,
        ...(await serverSideTranslations(context.locale, ['common'])),
      },
    };
  }
}

export default function VerifySubscriptionPage({ status, message }) {
  return (
    <div>
      <h1>{status}</h1>
      <p>{message}</p>
    </div>
  );
}
