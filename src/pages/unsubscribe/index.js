import React from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from "next/head";
import IconDocumentText from "../../../public/iconsax/document-text-1.svg";
import { useAppContext } from "@/contexts/AppContext";
import PageWrapper from "@/components/PageWrapper";
import { useTranslation } from "next-i18next";
import IconMessageRemove from "../../../public/iconsax/message-remove.svg";
import EmailUnsubscriptionComponent from "@/components/EmailUnsubscriptionComponent";

export default function Privacy() {
  const { t } = useTranslation();
  const { globalState } = useAppContext();

  return (
    <>
      <PageWrapper
        theme={globalState?.theme}
        pageTitle={t('unsubscribe.pageTitle')}
        sectionIcon={<IconMessageRemove className={`w-6 h-6`}/>}
        sectionNameText={t('unsubscribe.linkText')}
        sectionTitleText={t('unsubscribe.listTitleText')}
        canonicalPath={"/unsubscribe"}
      >
        <EmailUnsubscriptionComponent/>
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
