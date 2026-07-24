import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import {useTranslation} from '@site/src/i18n/language';

const labelKeys = {
  'All Courses': 'courses.all',
  Visualizer: 'nav.visualizer',
  Quiz: 'nav.quiz',
  Blog: 'nav.blog',
};

export default function FooterLinkItem({item}) {
  const t = useTranslation();
  const {to, href, label, prependBaseUrlToHref, className, ...props} = item;
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, {forcePrependBaseUrl: true});
  const translatedLabel = labelKeys[label] ? t(labelKeys[label]) : label;

  return (
    <Link
      className={clsx('footer__link-item', className)}
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      {...props}>
      {translatedLabel}
      {href && !isInternalUrl(href) && <IconExternalLink />}
    </Link>
  );
}
