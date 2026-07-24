import React from 'react';
import clsx from 'clsx';
import PaginatorNavLink from '@theme/PaginatorNavLink';
import {useTranslation} from '@site/src/i18n/language';
import {translateSidebarLabel} from '@site/src/utils/sidebarLabels';

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
          title={translateSidebarLabel(previous.title, t)}
          subLabel={t('pagination.previous')}
        />
      )}
      {next && (
        <PaginatorNavLink
          {...next}
          title={translateSidebarLabel(next.title, t)}
          subLabel={t('pagination.next')}
          isNext
        />
      )}
    </nav>
  );
}
