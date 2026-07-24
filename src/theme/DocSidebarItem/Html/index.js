import React from 'react';
import {useTranslation} from '@site/src/i18n/language';

export default function DocSidebarItemHtml({item}) {
  const t = useTranslation();

  if (typeof item.value === 'string' && item.value.startsWith('sidebar.')) {
    return (
      <li className="menu__list-item">
        <span className="vc-sidebar-course-heading">
          {t(item.value, item.value)}
        </span>
      </li>
    );
  }

  return (
    <li
      className="menu__list-item"
      dangerouslySetInnerHTML={{__html: item.value}}
    />
  );
}
