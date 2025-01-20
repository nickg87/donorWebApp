import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { temp_hash } = req.query;

  if (!temp_hash) {
    return res.status(400).json({ error: 'Missing temp_hash in query parameters.' });
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    // Trigger the backend verification endpoint
    const backendUrl = `${apiUrl}emailSubscription/verify?temp_hash=${temp_hash}`;
    const response = await axios.get(backendUrl);

    // Pass the backend's response to the client
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error verifying subscription:', error.response?.data || error.message);
    return res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: 'Internal server error.' });
  }
}
