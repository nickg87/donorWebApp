//src/pages/faq/index.js
import React, { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
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

  // Function to generate FAQs dynamically
  const generateFAQs = (num) => {
    const faqs = [];
    for (let i = 1; i <= num; i++) {
      faqs.push({
        questionKey: `faq.q${i}.q`,
        answerKey: `faq.q${i}.a`,
      });
    }
    return faqs;
  };

// Usage example with 18 FAQs
  const faqs = generateFAQs(18);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <PageWrapper
        theme={globalState?.theme}
        pageTitle={t('faq.pageTitle')}
        sectionIcon={<IconMessageText className="w-6 h-6" />}
        sectionNameText={t('faq.pageHeadlineText')}
        sectionTitleText={t('faq.pageTitleText')}
        canonicalPath={"/faq"}
      >
        {/* Video Content */}
        <div className="relative pb-[56.25%] h-0 overflow-hidden w-full m-10">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/oVrz7T99gwA?si=4JV2AXj5bvRRcUb0"
            title="How to quickly enter a prize pool"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`p-4 rounded-[12px] ${classes.containerWrapper} ${classes[globalState?.theme]} border backdrop-blur-md ${globalState?.theme === 'dark' ? 'border-darkBorder shadow-darkTheme' : 'border-lightBorder shadow-lightTheme'}`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center px-2 py-2 font-semibold "
              >
                <span className="flex-1 text-left">{t(faq.questionKey)}</span>
                {activeIndex !== index ? (
                  <IconAdd className="w-6 h-6" />
                ) : (
                  <IconMinus className="w-6 h-6" />
                )}
              </button>
              <div
                className={`transition-max-height duration-300 ease-in-out overflow-hidden px-4 ${activeIndex === index ? ' py-2 max-h-screen' : 'max-h-0'}`}
              >
                {t(faq.answerKey)}
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
