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
      >
        <p className="text-sm text-gray-500 text-center mb-12">
          Effective Date: <span className="font-medium">2024/12/01</span>
        </p>

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            1. Purpose of donorHub
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            donorHub is a cryptocurrency-driven donation platform designed to connect
            individuals with charitable causes worldwide. Our mission is to make giving
            easy, transparent, and rewarding by allowing donors to contribute and
            participate in prize pools.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Whether you're looking to support humanitarian projects, environmental
            conservation, education, or any other cause, donorHub ensures that your
            contributions are securely processed and reach their intended recipients.
            Prize pools are an added feature to incentivize donors, combining philanthropy
            with engagement.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">2. Eligibility</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            To use donorHub, you must meet the following requirements:
          </p>
          <ul className="list-disc list-inside text-gray-600 leading-relaxed">
            <li>You are at least 18 years old or the legal age of majority in your country.</li>
            <li>
              You agree to provide accurate and complete information during the donation process.
            </li>
            <li>
              You are not prohibited by law from making cryptocurrency transactions in your jurisdiction.
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed mt-4">
            donorHub reserves the right to terminate accounts or restrict access if any
            eligibility criteria are violated.
          </p>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">3. User Accounts (if applicable)</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            If user accounts are available or introduced in the future, they will be subject to the following terms:
          </p>
          <ul className="list-disc list-inside text-gray-600 leading-relaxed mb-4">
            <li>Choose a secure and unique password.</li>
            <li>Keep your login credentials confidential and secure.</li>
            <li>
              Ensure that all account information is current and accurate to avoid disruptions.
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">
            In case of unauthorized account access or suspicious activity, notify donorHub
            immediately. We will not be liable for any losses or damages caused by your
            failure to maintain account security.
          </p>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">4. Donations and Prize Pools</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Donations made through donorHub are final, non-refundable, and processed
            through secure blockchain networks. Prize pools offer users the chance to win
            rewards, subject to the following conditions:
          </p>
          <ul className="list-disc list-inside text-gray-600 leading-relaxed">
            <li>Each prize pool specifies entry requirements, deadlines, and rules.</li>
            <li>Winners are selected fairly, either via blockchain mechanisms or secure randomizers.</li>
            <li>
              Prize distribution may be subject to verification processes and adherence to
              the pool's terms.
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed mt-4">
            By participating in prize pools, you acknowledge the inherent risks of
            cryptocurrency transactions, including fluctuations in value and transaction fees.
          </p>
        </section>

        {/* Section 5 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            5. Cryptocurrency Transactions
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            All transactions on donorHub are processed on blockchain networks. This
            ensures security and transparency but may also lead to:
          </p>
          <ul className="list-disc list-inside text-gray-600 leading-relaxed">
            <li>Irreversible transactions once confirmed on the blockchain.</li>
            <li>Delays caused by network congestion or wallet errors.</li>
            <li>Responsibility for inputting correct wallet addresses lies solely with the user.</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mt-4">
            donorHub is not liable for losses arising from user errors or network issues.
            Always double-check transaction details before proceeding.
          </p>
        </section>

        {/* Section 6 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            6. User Responsibilities
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Users must adhere to the following guidelines when using donorHub:
          </p>
          <ul className="list-disc list-inside text-gray-600 leading-relaxed mb-4">
            <li>Refrain from illegal activities, including fraud, money laundering, or tax evasion.</li>
            <li>Respect the intellectual property of others.</li>
            <li>Avoid submitting harmful, misleading, or offensive content.</li>
          </ul>
          <p className="text-gray-600 leading-relaxed">
            Violations may result in account suspension, legal action, or other consequences.
          </p>
        </section>

        {/* Section 7 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            7. Data Privacy
          </h2>
          <p className="text-gray-600 leading-relaxed">
            donorHub collects and processes your data in accordance with our{" "}
            <a
              href="/privacy"
              className="text-blue-500 hover:underline"
            >
              Privacy Policy
            </a>
            . Your data will never be sold or shared with third parties without
            consent unless required by law.
          </p>
        </section>

        {/* Section 8 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            8. Liability Disclaimer
          </h2>
          <p className="text-gray-600 leading-relaxed">
            donorHub provides services "as is" without guarantees. We disclaim all
            warranties, and our liability is limited to the maximum extent permitted by law.
          </p>
        </section>

        <footer className="text-center mt-12">
          <p className="text-sm text-gray-500">
            For questions, contact us at{" "}
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