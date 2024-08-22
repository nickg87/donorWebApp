import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const apiName = process.env.NEXT_PUBLIC_API_NAME || 'DonorHub';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
const generateEmailTemplate = require('../../utils/emailTemplateHelper');
import i18n from "i18next";

export default function Contact() {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  console.log(i18n.language);

  const [statusMessage, setStatusMessage] = useState(''); // New state for the status message
  const [statusType, setStatusType] = useState(''); // New state for message type ('success' or 'error')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the current language (locale) from i18next
    const currentLanguage = i18n.language === 'es' ? 'Spanish' : 'English';
    console.log(currentLanguage);

    // Inside your handler function
    const modifiedMessage = generateEmailTemplate({
      apiName: apiName,
      formData: {
        name: formData.name,
        email: formData.email,
        message: formData.message
      },
      currentLanguage: currentLanguage
    });

    try {
      const response = await fetch(apiUrl + 'emails/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          message: modifiedMessage,
          apiName: apiName,
        }),
      });

      if (response.ok) {
        setStatusMessage(t('contactPage.form.messageSuccess'));
        setStatusType('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatusMessage(t('contactPage.form.messageFailed'));
        setStatusType('error');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      setStatusMessage(t('contactPage.form.messageError'));
      setStatusType('error');
    }
  };

  const handleCloseMessage = () => {
    setStatusMessage('');
  };

  return (
    <div className="container sm:mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{t('contactPage.title')}</h1>
      {statusMessage && (
        <div
          className={`relative mb-4 p-4 rounded-md text-white ${
            statusType === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          <button
            className="absolute top-2 right-2 p-4 py-2 px-4 text-white"
            onClick={handleCloseMessage}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          {statusMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white">
            {t('contactPage.form.fields.name')}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white">
            {t('contactPage.form.fields.email')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-white">
            {t('contactPage.form.fields.message')}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows="5"
            required
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-gray-700 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {t('contactPage.form.fields.submit')}
          </button>
        </div>
      </form>
    </div>
  );
}

// Add serverSideTranslations to load translations
export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
