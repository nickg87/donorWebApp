import React from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from "next/head";


export default function ToC() {
  return (
    <>
      <Head>
        <title>Terms and conditions Page | DonorHub App</title>
      </Head>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
        <p>
          Welcome to [Your Website/App Name]! These terms and conditions outline the rules and regulations
          for the use of [Your Website/App Name]'s Website and Mobile App. By accessing this website and app
          we assume you accept these terms and conditions. Do not continue to use [Your Website/App Name] if
          you do not agree to take all of the terms and conditions stated on this page.
        </p>
        <p>
          The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer
          Notice and all Agreements: "Client", "You" and "Your" refers to you, the person accessing this
          website and accepting the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our"
          and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and
          ourselves, or either the Client or ourselves. All terms refer to the offer, acceptance and
          consideration of payment necessary to undertake the process of our assistance to the Client in the
          most appropriate manner, whether by formal meetings of a fixed duration, or any other means, for
          the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated
          services/products, in accordance with and subject to, prevailing law of. Any use of the above
          terminology or other words in the singular, plural, capitalisation and/or he/she or they, are taken
          as interchangeable and therefore as referring to same.
        </p>
        <h2 className="text-lg font-bold mt-4">Cookies</h2>
        <p>
          We employ the use of cookies. By accessing [Your Website/App Name], you agreed to use cookies in
          agreement with the [Your Website/App Name]'s Privacy Policy. Most interactive websites use cookies
          to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the
          functionality of certain areas to make it easier for people visiting our website. Some of our
          affiliate/advertising partners may also use cookies.
        </p>
        <h2 className="text-lg font-bold mt-4">License</h2>
        <p>
          Unless otherwise stated, [Your Website/App Name] and/or its licensors own the intellectual property
          rights for all material on [Your Website/App Name]. All intellectual property rights are reserved.
          You may access this from [Your Website/App Name] for your own personal use subjected to restrictions
          set in these terms and conditions. You must not:
        </p>
        <ul className="list-disc pl-8">
          <li>Republish material from [Your Website/App Name]</li>
          <li>Sell, rent or sub-license material from [Your Website/App Name]</li>
          <li>Reproduce, duplicate or copy material from [Your Website/App Name]</li>
          <li>Redistribute content from [Your Website/App Name]</li>
        </ul>
        <p>This Agreement shall begin on the date hereof.</p>
        <h2 className="text-lg font-bold mt-4">Hyperlinking to our Content</h2>
        <p>
          The following organizations may link to our Website without prior written approval:
        </p>
        <ul className="list-disc pl-8">
          <li>Government agencies;</li>
          <li>Search engines;</li>
          <li>News organizations;</li>
          <li>Online directory distributors may link to our Website in the same manner as they hyperlink to
            the Websites of other listed businesses; and
          </li>
          <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping
            malls, and charity fundraising groups which may not hyperlink to our Web site.
          </li>
        </ul>
        <p>These organizations may link to our home page, to publications or to other Website information
          so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship,
          endorsement or approval of the linking party and its products and/or services; and (c) fits within
          the context of the linking party’s site.
        </p>
        <h2 className="text-lg font-bold mt-4">Content Liability</h2>
        <p>
          We shall not be hold responsible for any content that appears on your Website. You agree to protect
          and defend us against all claims that is rising on your Website. No link(s) should appear on any
          Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise
          violates, or advocates the infringement or other violation of, any third party rights.
        </p>
        <h2 className="text-lg font-bold mt-4">Reservation of Rights</h2>
        <p>
          We reserve the right to request that you remove all links or any particular link to our Website. You
          approve to immediately remove all links to our Website upon request. We also reserve the right to
          amend these terms and conditions and it’s linking policy at any time. By continuously linking to our
          Website, you agree to be bound to and follow these linking terms and conditions.
        </p>
        <h2 className="text-lg font-bold mt-4">Removal of links from our website</h2>
        <p>
          If you find any link on our Website that is offensive for any reason, you are free to contact and
          inform us any moment. We will consider requests to remove links but we are not obligated to or so or
          to respond to you directly.
        </p>
        <p>
          We do not ensure that the information on this website is correct, we do not warrant its completeness
          or accuracy; nor do we promise to ensure that the website remains available or that the material on
          the website is kept up to date.
        </p>
        <h2 className="text-lg font-bold mt-4">Disclaimer</h2>
        <p>
          To the maximum extent permitted by applicable law, we exclude all representations, warranties and
          conditions relating to our website and the use of this website. Nothing in this disclaimer will:
        </p>
        <ul className="list-disc pl-8">
          <li>limit or exclude our or your liability for death or personal injury;</li>
          <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
          <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
          <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
        </ul>
        <p>
          The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer:
          (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the
          disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.
        </p>
        <p>
          As long as the website and the information and services on the website are provided free of charge,
          we will not be liable for any loss or damage of any nature.
        </p>
      </div>
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