import React from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from "next/head";
import IconDocumentText from "../../../public/iconsax/document-text-1.svg";
import { useAppContext } from "@/contexts/AppContext";
import PageWrapper from "@/components/PageWrapper";
import { useTranslation } from "next-i18next";

export default function Privacy() {
  const { t } = useTranslation();
  const { globalState } = useAppContext();

  return (
    <>
      <PageWrapper
        theme={globalState?.theme}
        pageTitle={t('privacy.pageTitle')}
        sectionIcon={<IconDocumentText className={`w-6 h-6`} />}
        sectionNameText={t('privacy.pageHeadlineText')}
        sectionTitleText={t('privacy.pageTitleText')}
      >
        <p className="text-sm text-gray-500 text-center mb-12">
          {t('privacy.effectiveDate', { date: '2024/12/01' })}
        </p>

        <section className="mb-6">
          <p className="text-gray-700">
            {t('privacy.introText')}
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {t('privacy.dataCollection.title')}
          </h2>
          <p className="text-gray-700">
            {t('privacy.dataCollection.description')}
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {t('privacy.useOfData.title')}
          </h2>
          <p className="text-gray-700">
            {t('privacy.useOfData.description')}
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {t('privacy.cookies.title')}
          </h2>
          <p className="text-gray-700">
            {t('privacy.cookies.description')}
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {t('privacy.security.title')}
          </h2>
          <p className="text-gray-700">
            {t('privacy.security.description')}
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {t('privacy.changes.title')}
          </h2>
          <p className="text-gray-700">
            {t('privacy.changes.description')}
          </p>
        </section>

        <footer className="text-center mt-12">
          <p className="text-sm text-gray-500">
            {t('privacy.footerText')}{" "}
            <a
              href="mailto:contact@donorhub.site"
              className="text-blue-500 hover:underline"
            > contact@donorhub.site
            </a>

            .
          </p>
        </footer>
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