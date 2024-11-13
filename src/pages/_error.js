import React from 'react';
import classes from './General.module.scss';
import { useAppContext } from '@/contexts/AppContext';
import ButtonWrapper from '@/components/UI/ButtonWrapper';

const ErrorPage = ({ statusCode }) => {
  const { globalState } = useAppContext();

  return (
    <div className="flex items-center justify-center min-[80vh] text-center px-4">
      <div
        className={`p-8 rounded-[30px] ${classes.contentWrapper} ${classes[globalState?.theme]} border backdrop-blur-md ${globalState?.theme === 'dark' ? 'border-darkBorder bg-[#030A31] bg-opacity-80 shadow-darkTheme' : 'border-lightBorder bg-white/54 shadow-lightTheme'}`}
      >
        <h1 className="text-6xl font-bold text-red-500 mb-4">
          {statusCode ? statusCode : 'Something went wrong'}
        </h1>
        <p className="text-2xl mb-6">
          We encountered an error while processing your request.
        </p>
        <p className="text-lg mb-6">
          Please try again later or contact support if the issue persists.
        </p>
        <a href="/" className="inline-block py-3 px-6 rounded-lg transition duration-300">
          <ButtonWrapper theme={'dark'} extra={'h-[50px] w-[186px]'}>
            Go back to Home
          </ButtonWrapper>
        </a>
      </div>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 500;
  return { statusCode };
};

export default ErrorPage;
