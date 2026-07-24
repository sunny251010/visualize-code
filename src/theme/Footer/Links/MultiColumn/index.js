import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import LinkItem from '@theme/Footer/LinkItem';
import {useTranslation} from '@site/src/i18n/language';

const titleKeys = {
  Courses: 'footer.courses',
  Practice: 'footer.practice',
  More: 'footer.more',
};

function ColumnLinkItem({item}) {
  return item.html ? (
    <li
      className={clsx('footer__item', item.className)}
      dangerouslySetInnerHTML={{__html: item.html}}
    />
  ) : (
    <li key={item.href ?? item.to} className="footer__item">
      <LinkItem item={item} />
    </li>
  );
}

function Column({column}) {
  const t = useTranslation();
  const title = titleKeys[column.title] ? t(titleKeys[column.title]) : column.title;

  return (
    <div
      className={clsx(
        ThemeClassNames.layout.footer.column,
        'col footer__col',
        column.className,
      )}>
      <div className="footer__title">{title}</div>
      <ul className="footer__items clean-list">
        {column.items.map((item, index) => (
          <ColumnLinkItem key={index} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default function FooterLinksMultiColumn({columns}) {
  return (
    <div className="row footer__links">
      {columns.map((column, index) => (
        <Column key={index} column={column} />
      ))}
    </div>
  );
}
