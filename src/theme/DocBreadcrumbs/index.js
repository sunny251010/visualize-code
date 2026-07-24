import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useSidebarBreadcrumbs} from '@docusaurus/plugin-content-docs/client';
import {useHomePageRoute} from '@docusaurus/theme-common/internal';
import {useLocation} from '@docusaurus/router';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import DocBreadcrumbsStructuredData from '@theme/DocBreadcrumbs/StructuredData';
import {courses} from '@site/src/data/courseNavigation';
import {useTranslation} from '@site/src/i18n/language';

function BreadcrumbsItemLink({children, href, isLast}) {
  const className = 'breadcrumbs__link';

  if (isLast) {
    return <span className={className}>{children}</span>;
  }

  return href ? (
    <Link className={className} href={href}>
      <span>{children}</span>
    </Link>
  ) : (
    <span className={className}>{children}</span>
  );
}

function BreadcrumbsItem({children, active}) {
  return (
    <li
      className={clsx('breadcrumbs__item', {
        'breadcrumbs__item--active': active,
      })}>
      {children}
    </li>
  );
}

export default function DocBreadcrumbs() {
  const breadcrumbs = useSidebarBreadcrumbs();
  const homePageRoute = useHomePageRoute();
  const location = useLocation();
  const t = useTranslation();

  if (!breadcrumbs) {
    return null;
  }

  const normalizedBreadcrumbs = addCoursesBreadcrumb(
    breadcrumbs,
    location.pathname,
  );
  const translatedBreadcrumbs = normalizedBreadcrumbs.map((item) => ({
    ...item,
    label:
      item.label === 'Courses'
        ? t('courses.all')
        : t(`sidebar.${item.label}`, item.label),
  }));

  return (
    <>
      <DocBreadcrumbsStructuredData breadcrumbs={translatedBreadcrumbs} />
      <nav
        className={clsx(
          ThemeClassNames.docs.docBreadcrumbs,
        )}
        aria-label={translate({
          id: 'theme.docs.breadcrumbs.navAriaLabel',
          message: 'Breadcrumbs',
          description: 'The ARIA label for the breadcrumbs',
        })}>
        <ul className="breadcrumbs">
          {homePageRoute && (
            <BreadcrumbsItem active={false}>
              <BreadcrumbsItemLink href={homePageRoute.path} isLast={false}>
                {t('nav.home')}
              </BreadcrumbsItemLink>
            </BreadcrumbsItem>
          )}
          {translatedBreadcrumbs.map((item, index) => {
            const isLast = index === translatedBreadcrumbs.length - 1;
            const href =
              item.type === 'category' && item.linkUnlisted
                ? undefined
                : item.href;

            return (
              <BreadcrumbsItem key={`${item.label}-${index}`} active={isLast}>
                <BreadcrumbsItemLink href={href} isLast={isLast}>
                  {item.label}
                </BreadcrumbsItemLink>
              </BreadcrumbsItem>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

function addCoursesBreadcrumb(breadcrumbs, pathname) {
  const activeCourse = courses.find((course) =>
    pathname.includes(`/courses/${course.slug}`),
  );

  if (!activeCourse || breadcrumbs.some((item) => item.label === 'Courses')) {
    return breadcrumbs;
  }

  return [
    {
      type: 'category',
      label: 'Courses',
      href: '/courses',
    },
    ...breadcrumbs,
  ];
}
