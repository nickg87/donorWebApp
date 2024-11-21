//src/components/PageWrapper.js
import React from 'react';
import Head from "next/head";
import SectionNameWrapper from "./UI/SectionNameWrapper";
import classes from "./PageWrapper.module.scss";

const PageWrapper = ({...props}) => {
  console.log(props)
  return (
    <>
      <Head>
        <title>{props?.pageTitle}</title>
      </Head>
      <div className="flex flex-col justify-center items-center py-4">
        <SectionNameWrapper icon={props?.sectionIcon} theme={props?.theme} text={props?.sectionNameText}
                            extra={'uppercase h-[50px] w-[200px]'}/>
      </div>
      <div className="flex flex-col justify-center items-center p-y4">
        <h2 className={`${classes.sectionTitle} ${classes[props?.theme]} mt-4 mb-4`} dangerouslySetInnerHTML={{
          __html: props.sectionTitleText,
        }}/>
        {props?.sectionDecriptionText &&
          <p className="text-center text-600 m-8 text-[#8B91B5]" dangerouslySetInnerHTML={{
            __html: props?.sectionDecriptionText,
          }}/>}
      </div>
      <div className="m-4 p-4">
        {props.children}
      </div>
    </>
  );
};

export default PageWrapper;
