//src/pages/faq/index.js
import React, { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from "next/head";
import SectionNameWrapper from "@/components/UI/SectionNameWrapper";
import IconMessageText from "../../../public/iconsax/message-text-1.svg";
import IconMinus from "../../../public/iconsax/minus.svg";
import IconAdd from "../../../public/iconsax/add.svg";
import {useTranslation} from "next-i18next";
import {useAppContext} from "@/contexts/AppContext";
import PageWrapper from "@/components/PageWrapper";
import classes from "../pages.module.scss";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t, i18n } = useTranslation();
  const { globalState } = useAppContext();

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'What is the purpose of this FAQ section?',
      answer: 'This FAQ section is designed to answer the most common questions from our users to help them understand our service better. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac nisl ac sem dapibus tincidunt sed et erat. Pellentesque in sem elit. Aliquam felis justo, pulvinar in urna sed, euismod placerat tortor. Phasellus id massa nec urna euismod maximus eget nec nibh. Donec volutpat euismod semper. Etiam non massa scelerisque, varius ante ut, pretium tellus. In pharetra at ligula nec fringilla.',
    },
    {
      question: 'How can I contact support?',
      answer: 'You can contact support via our contact form or by emailing support@example.com. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac nisl ac sem dapibus tincidunt sed et erat. Pellentesque in sem elit. Aliquam felis justo, pulvinar in urna sed, euismod placerat tortor. Phasellus id massa nec urna euismod maximus eget nec nibh. Donec volutpat euismod semper. Etiam non massa scelerisque, varius ante ut, pretium tellus. In pharetra at ligula nec fringilla.',
    },
    {
      question: 'What is the purpose of this section?',
      answer: 'This FAQ section is designed to answer the most common questions from our users to help them understand our service better. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac nisl ac sem dapibus tincidunt sed et erat. Pellentesque in sem elit. Aliquam felis justo, pulvinar in urna sed, euismod placerat tortor. Phasellus id massa nec urna euismod maximus eget nec nibh. Donec volutpat euismod semper. Etiam non massa scelerisque, varius ante ut, pretium tellus. In pharetra at ligula nec fringilla.',
    },
    {
      question: 'How can I contact you?',
      answer: 'You can contact support via our contact form or by emailing support@example.com. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac nisl ac sem dapibus tincidunt sed et erat. Pellentesque in sem elit. Aliquam felis justo, pulvinar in urna sed, euismod placerat tortor. Phasellus id massa nec urna euismod maximus eget nec nibh. Donec volutpat euismod semper. Etiam non massa scelerisque, varius ante ut, pretium tellus. In pharetra at ligula nec fringilla.',
    },
    // Add more FAQ items here
  ];

  return (
    <>
      <PageWrapper
        theme={globalState?.theme}
        pageTitle={t('faq.pageTitle')}
        sectionIcon={<IconMessageText className={`w-6 h-6`}/>}
        sectionNameText={t('faq.pageHeadlineText')}
        sectionTitleText={t('faq.pageTitleText')}
      >
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              className={`p-4 rounded-[12px] ${classes.containerWrapper} ${classes[globalState?.theme]} border backdrop-blur-md ${globalState?.theme === 'dark' ? 'border-darkBorder shadow-darkTheme' : 'border-lightBorder shadow-lightTheme'} `}>
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center px-2 py-2 font-semibold "
              >
                <span className="flex-1 text-left">{faq.question}</span>
                {activeIndex !== index ? (
                  <IconAdd className="w-6 h-6"/>
                ) : (
                  <IconMinus className="w-6 h-6"/>
                )}
              </button>
              <div
                className={`transition-max-height duration-300 ease-in-out overflow-hidden px-4 ${activeIndex === index ? ' py-2 max-h-screen' : 'max-h-0'}`}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>

      </PageWrapper>
    </>
  );
};

export async function getServerSideProps({locale}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default FAQ;
