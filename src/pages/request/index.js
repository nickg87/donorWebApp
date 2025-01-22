export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/',
      permanent: false, // Temporary redirect
    },
  };
}

export default function RequestPage() {
  return <div>Redirecting...</div>; // Optionally display a message during redirect
}