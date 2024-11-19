import Link from "next/link";
import React from "react";
import classes from './ArticleListItem.module.scss';
import {useAppContext} from "@/contexts/AppContext";
import {useTranslation} from "next-i18next";
import ButtonWrapper from "@/components/UI/ButtonWrapper";

const ArticleListItem = ({ article }) => {

  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const { globalState } = useAppContext();

  return (
    <div
      key={article.slug}
      className={`${classes.articleWrapper} p-8 rounded-lg shadow-lg transition-shadow hover:shadow-lg backdrop-blur`}
      style={{
        backgroundImage: article.files?.[0]?.path ? `url(${article.files[0].path})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay for increased opacity on the image */}
      <div
        className={`${classes.articleContainer} ${classes[globalState?.theme]} absolute inset-0 rounded-lg`}
        style={{
          opacity: 0.7, // Adjust this value for the desired transparency level
          backgroundBlendMode: 'multiply',
        }}
      ></div>

      {/* Article content */}
      <div className="relative z-10">
        <Link href={`/blog/${article.slug}`}>
          <h2 className="text-2xl font-semibold hover:text-blue-300 transition-colors">
            {article.title[i18n.language]}
          </h2>
        </Link>
        <p className="mt-2">{article.short[i18n.language]}</p>
        <Link href={`/blog/${article.slug}`} className="text-sm text-orange-400 hover:underline mt-4 inline-block">
          <ButtonWrapper theme={'dark'}>
            {t('blog.listReadMore')}
          </ButtonWrapper>
        </Link>

      </div>
    </div>


  );
};

export default ArticleListItem;



