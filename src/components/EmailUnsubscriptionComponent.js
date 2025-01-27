import React, { useState } from 'react';
import InputWrapper from "@/components/UI/InputWrapper";
import IconStar from "../../public/iconsax/star.svg";
import IconLovely from "../../public/iconsax/lovely.svg";
import ButtonWrapper from "@/components/UI/ButtonWrapper";
import IconMessageRemove from "../../public/iconsax/message-remove.svg";
import {useTranslation} from "next-i18next";

const EmailUnsubscriptionComponent = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {

      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
      const response = await fetch(apiUrl + 'emailSubscription/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setError(data?.error || false);
      setMessage(data.message[i18n.language] || 'An error occurred. Please try again.');
    } catch (error) {
      setError(error?.error || false);
      setMessage('Failed to send request. Please try again.');
    } finally {
      setLoading(false);
      setEmail('');
    }
  };

  return (
    <div className="flex flex-col gap-3 mb-6 justify-start align-center">
      <h2 className="text-2xl font-semibold">
        {t('unsubscribe.heading')}
      </h2>
      <p className="mb-2">
        {t('unsubscribe.subheading')}
      </p>
      <form onSubmit={handleSubmit} className="flex gap-3 justify-start align-center">
        <InputWrapper
          id="email"
          name={'value'}
          type={'email'}
          theme={'dark'}
          placeholder={t('unsubscribe.inputPlaceholder')}
          value={email}
          required={true}
          readOnly={false}
          onChange={(e) => setEmail(e.target.value)}
          extra={'max-w-full sm:min-w-[500px] min-w-[65vw] h-[50px]'}/>
        <div className="mt-1 flex items-center">
          <ButtonWrapper icon={<IconMessageRemove className="w-7 h-7"/>}
                         theme={'light'}
                         extra={'uppercase h-[40px] w-[80px]'}/>
        </div>
      </form>
      {message && (
        <p
          className={`mt-4 text-sm ${
           (error === 'unsubscribed') ? 'text-green-600' : ((error === 'invalid_email') ? 'text-red-600' : 'text-yellow-600')
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default EmailUnsubscriptionComponent;
