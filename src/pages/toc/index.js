import React from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from "next/head";
import IconDocumentText from "../../../public/iconsax/document-text-1.svg";
import {useAppContext} from "@/contexts/AppContext";
import PageWrapper from "@/components/PageWrapper";
import {useTranslation} from "next-i18next";



export default function ToC() {
  const { t, i18n } = useTranslation();
  const { globalState } = useAppContext();
  return (
    <>
      <PageWrapper
        theme={globalState?.theme}
        pageTitle={t('toc.pageTitle')}
        sectionIcon={<IconDocumentText className={`w-6 h-6`}/>}
        sectionNameText={t('toc.pageHeadlineText')}
        sectionTitleText={t('toc.pageTitleText')}
        canonicalPath={"/toc"}
      >
        <p className="text-sm  text-center mb-12">
          Effective Date: <span className="font-medium">2024/12/01</span>
        </p>

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            {t('toc.section1.title')}
          </h2>
          <span dangerouslySetInnerHTML={{
            __html: t('toc.section1.text'),
          }} className="leading-relaxed mb-4"/>

        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            {t('toc.section2.title')}
          </h2>
          <p className="leading-relaxed mb-4">
            {t('toc.section2.text1')}
          </p>
          <ul className="list-disc list-inside leading-relaxed">
            <li> {t('toc.section2.li1')}</li>
            <li> {t('toc.section2.li2')}</li>
            <li> {t('toc.section2.li3')}</li>
          </ul>
          <p className="leading-relaxed mt-4">
            {t('toc.section2.text2')}
          </p>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            {t('toc.section3.title')}
          </h2>
          <p className="leading-relaxed mb-4">
            {t('toc.section3.text1')}
          </p>
          <ul className="list-disc list-inside leading-relaxed">
            <li> {t('toc.section3.li1')}</li>
            <li> {t('toc.section3.li2')}</li>
            <li> {t('toc.section3.li3')}</li>
          </ul>
          <p className="leading-relaxed mt-4">
            {t('toc.section3.text2')}
          </p>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            {t('toc.section4.title')}
          </h2>
          <p className="leading-relaxed mb-4">
            {t('toc.section4.text1')}
          </p>
          <ul className="list-disc list-inside leading-relaxed">
            <li> {t('toc.section4.li1')}</li>
            <li> {t('toc.section4.li2')}</li>
            <li> {t('toc.section4.li3')}</li>
          </ul>
          <p className="leading-relaxed mt-4">
            {t('toc.section4.text2')}
          </p>
        </section>

        {/* Section 5 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            {t('toc.section5.title')}
          </h2>
          <p className="leading-relaxed mb-4">
            {t('toc.section5.text1')}
          </p>
          <ul className="list-disc list-inside leading-relaxed">
            <li> {t('toc.section5.li1')}</li>
            <li> {t('toc.section5.li2')}</li>
            <li> {t('toc.section5.li3')}</li>
          </ul>
          <p className="leading-relaxed mt-4">
            {t('toc.section5.text2')}
          </p>
        </section>

        {/* Section 6 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            {t('toc.section6.title')}
          </h2>
          <p className="leading-relaxed mb-4">
            {t('toc.section6.text1')}
          </p>
          <ul className="list-disc list-inside leading-relaxed">
            <li> {t('toc.section6.li1')}</li>
            <li> {t('toc.section6.li2')}</li>
            <li> {t('toc.section6.li3')}</li>
          </ul>
          <p className="leading-relaxed mt-4">
            {t('toc.section6.text2')}
          </p>
        </section>

        {/* Section 7 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            {t('toc.section7.title')}
          </h2>
          <span dangerouslySetInnerHTML={{
            __html: t('toc.section7.text'),
          }} className="leading-relaxed"/>
        </section>

        {/* Section 8 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            {t('toc.section8.title')}
          </h2>
          <span dangerouslySetInnerHTML={{
            __html: t('toc.section8.text'),
          }} className="leading-relaxed"/>
        </section>

        <footer className="text-center mt-12">
          <p className="text-sm ">
            {t('toc.footer.text')}
            <a
              href="mailto:contact@donorhub.site"
              className="text-blue-500 hover:underline"
            >
              contact@donorhub.site
            </a>
            .
          </p>
        </footer>
      </PageWrapper>
    </>
  );
}

// Add serverSideTranslations to load translations
export async function getServerSideProps({locale}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}