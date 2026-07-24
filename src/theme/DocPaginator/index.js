import React from 'react';
import clsx from 'clsx';
import PaginatorNavLink from '@theme/PaginatorNavLink';
import {useTranslation} from '@site/src/i18n/language';

export default function DocPaginator(props) {
  const {className, previous, next} = props;
  const t = useTranslation();

  return (
    <nav
      className={clsx(className, 'pagination-nav')}
      aria-label="Docs pages">
      {previous && (
        <PaginatorNavLink
          {...previous}
          title={t(`sidebar.${previous.title}`, previous.title)}
          subLabel={t('pagination.previous')}
        />
      )}
      {next && (
        <PaginatorNavLink
          {...next}
          title={t(`sidebar.${next.title}`, next.title)}
          subLabel={t('pagination.next')}
          isNext
        />
      )}
    </nav>
  );
}
