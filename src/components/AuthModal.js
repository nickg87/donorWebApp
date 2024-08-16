import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';

const AuthModal = ({ showModal, setShowModal }) => {
  const { updateUser } = useAppContext();
  const [email, setEmail] = useState('guliman.nicu@gmail.com');
  const [password, setPassword] = useState('parola123');
  const [name, setName] = useState('Test');
  const [isRegistering, setIsRegistering] = useState(false); // Track whether we're in register mode
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(apiUrl + 'auth/login', { // Endpoint of your Express backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store session token in localStorage or cookie
        localStorage.setItem('sessionToken', data.token);
        updateUser({
          email, // Include other user details if available
          token: data.token,
          name: data.name,
        });
        setShowModal(false); // Close the modal on success
      } else {
        // Handle errors
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An unexpected error occurred');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const requestLink = apiUrl + 'auth/register';
    console.log(requestLink);
    try {
      const response = await fetch(requestLink, { // Endpoint of your Express backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Optionally log in the user automatically after registration
        // For now, just close the modal
        //setShowModal(false);
        setMessage('User registered! Try to login');
        setIsRegistering(false);
      } else {
        // Handle errors
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An unexpected error occurred');
    }
  };


  const handleSwitch = () => {
    setIsRegistering(!isRegistering);
    setMessage(''); // Clear any previous message
    setError(''); // Clear any previous errors
  };

  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-black p-6 rounded-lg shadow-lg w-full max-w-sm mx-4">
        <button
          className="absolute top-2 right-2 text-white hover:text-gray-700"
          onClick={() => setShowModal(false)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <h2 className="text-xl font-semibold mb-4">{isRegistering ? 'Register' : 'Sign In'}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-yellow-500 mb-4">{message}</p>}
        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          {isRegistering && (
            <>
              <label className="block text-sm font-medium text-white mb-2">Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md mb-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </>
          )}
          <label className="block text-sm font-medium text-white mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md mb-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="block text-sm font-medium text-white mb-2">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md mb-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isRegistering ? 'Register' : 'Sign In'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={handleSwitch}
            className="text-blue-500 hover:underline"
          >
            {isRegistering ? 'Have an account? Go to login' : 'Not registered yet? Register'}
          </button>
          {/* Optionally add a Forgot Password link */}
          <div className="mt-2 text-blue-500 hover:underline">
            Forgot Password?
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
