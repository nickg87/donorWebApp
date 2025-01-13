//src/pages/contact/index.js
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const apiName = process.env.NEXT_PUBLIC_API_NAME || 'DonorHub';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
const generateEmailTemplate = require('../../utils/emailTemplateHelper');
import ButtonWrapper from "@/components/UI/ButtonWrapper";
import IconMessageText from "../../../public/iconsax/message-text-1.svg";
import PageWrapper from "@/components/PageWrapper";
import {useAppContext} from "@/contexts/AppContext";
import IconCloseSquare from "../../../public/iconsax/close-square.svg";
import IconClipboardTick from "../../../public/iconsax/clipboard-tick.svg";

export default function Contact() {
  //const surveyActive = process.env.NEXT_PUBLIC_SURVEY_ACTIVE === 'true';
  const surveyActive = false;
  const { t, i18n } = useTranslation();
  const { globalState, updateShowSurvey } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  //console.log(i18n.language);

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
    <>
      <PageWrapper
        theme={globalState?.theme}
        pageTitle={t('contactPage.pageTitle')}
        sectionNameText={t('contactPage.title')}
        sectionIcon={<IconMessageText className="w-6 h-6" />}
        sectionTitleText={t('contactPage.pageTitleText')}
        canonicalPath={"/contact"}
      >
        <>
          {statusMessage && (
            <div
              className={`relative mb-4 p-4 rounded-md ${
                statusType === 'success' ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              <button
                className="absolute top-2 right-2 p-4 py-2 px-4"
                onClick={handleCloseMessage}
              >
                <FontAwesomeIcon style={{width: '18'}} icon={faTimes}/>
              </button>
              {statusMessage}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
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
              <label htmlFor="email" className="block text-sm font-medium">
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
              <label htmlFor="message" className="block text-sm font-medium">
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
              <ButtonWrapper theme={'dark'} extra={'h-[50px] w-[156px]'}>
                {t('contactPage.form.fields.submit')}
              </ButtonWrapper>
            </div>
          </form>
          { surveyActive &&
            <div className={'mb-4 p-4'}>
              <hr/>
              <div className={'mt-4'}>
                {t('contactPage.survey.text')}
              </div>
              <div className={'mt-4 scale-75 text-center'}>
                <ButtonWrapper
                  icon={<IconClipboardTick className={`w-6 h-6`}/>}
                  theme={'light'}
                  text={t('contactPage.survey.button')}
                  onClick={() => updateShowSurvey('true')}
                  extra={'uppercase h-[50px] w-[100%]'}/>
              </div>
            </div>
          }
        </>
      </PageWrapper>
    </>
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
