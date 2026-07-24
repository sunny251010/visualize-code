import React, {useEffect, useMemo} from 'react';
import clsx from 'clsx';
import {
  ThemeClassNames,
  useThemeConfig,
  usePrevious,
  Collapsible,
  useCollapsible,
} from '@docusaurus/theme-common';
import {isSamePath} from '@docusaurus/theme-common/internal';
import {
  isActiveSidebarItem,
  findFirstSidebarItemLink,
  useDocSidebarItemsExpandedState,
  useVisibleSidebarItems,
} from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import useIsBrowser from '@docusaurus/useIsBrowser';
import DocSidebarItems from '@theme/DocSidebarItems';
import DocSidebarItemLink from '@theme/DocSidebarItem/Link';
import {useTranslation} from '@site/src/i18n/language';

function getStorageKey(item) {
  return `visualize-code:sidebar:${item.href ?? item.label}`;
}

function readStoredCollapsed(item, fallback) {
  if (typeof window === 'undefined') {
    return fallback;
  }

  const stored = window.localStorage.getItem(getStorageKey(item));
  return stored === null ? fallback : stored === 'true';
}

function useAutoExpandActiveCategory({
  isActive,
  collapsed,
  updateCollapsed,
  activePath,
}) {
  const wasActive = usePrevious(isActive);
  const previousActivePath = usePrevious(activePath);

  useEffect(() => {
    const justBecameActive = isActive && !wasActive;
    const stillActiveButPathChanged =
      isActive && wasActive && activePath !== previousActivePath;

    if ((justBecameActive || stillActiveButPathChanged) && collapsed) {
      updateCollapsed(false);
    }
  }, [
    isActive,
    wasActive,
    collapsed,
    updateCollapsed,
    activePath,
    previousActivePath,
  ]);
}

function useCategoryHrefWithSSRFallback(item) {
  const isBrowser = useIsBrowser();

  return useMemo(() => {
    if (item.href && !item.linkUnlisted) {
      return item.href;
    }

    if (isBrowser || !item.collapsible) {
      return undefined;
    }

    return findFirstSidebarItemLink(item);
  }, [item, isBrowser]);
}

function CollapseButton({collapsed, categoryLabel, onClick}) {
  return (
    <button
      aria-label={
        collapsed
          ? translate(
              {
                id: 'theme.DocSidebarItem.expandCategoryAriaLabel',
                message: "Expand sidebar category '{label}'",
                description: 'The ARIA label to expand the sidebar category',
              },
              {label: categoryLabel},
            )
          : translate(
              {
                id: 'theme.DocSidebarItem.collapseCategoryAriaLabel',
                message: "Collapse sidebar category '{label}'",
                description: 'The ARIA label to collapse the sidebar category',
              },
              {label: categoryLabel},
            )
      }
      aria-expanded={!collapsed}
      type="button"
      className="clean-btn menu__caret"
      onClick={onClick}
    />
  );
}

export default function DocSidebarItemCategory(props) {
  const visibleChildren = useVisibleSidebarItems(
    props.item.items,
    props.activePath,
  );

  if (visibleChildren.length === 0) {
    return <DocSidebarItemCategoryEmpty {...props} />;
  }

  return <DocSidebarItemCategoryCollapsible {...props} />;
}

function isCategoryWithHref(category) {
  return typeof category.href === 'string';
}

function DocSidebarItemCategoryEmpty({item, ...props}) {
  if (!isCategoryWithHref(item)) {
    return null;
  }

  const {
    type,
    collapsed,
    collapsible,
    items,
    linkUnlisted,
    ...forwardableProps
  } = item;

  const linkItem = {
    type: 'link',
    ...forwardableProps,
  };

  return <DocSidebarItemLink item={linkItem} {...props} />;
}

function DocSidebarItemCategoryCollapsible({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}) {
  const {label, collapsible, className, href} = item;
  const t = useTranslation();
  const translatedLabel = t(`sidebar.${label}`, label);
  const {
    docs: {
      sidebar: {autoCollapseCategories},
    },
  } = useThemeConfig();
  const hrefWithSSRFallback = useCategoryHrefWithSSRFallback(item);
  const isActive = isActiveSidebarItem(item, activePath);
  const isCurrentPage = isSamePath(href, activePath);
  const {collapsed, setCollapsed} = useCollapsible({
    initialState: () => {
      if (!collapsible) {
        return false;
      }

      if (isActive) {
        return false;
      }

      return readStoredCollapsed(item, item.collapsed);
    },
  });
  const {expandedItem, setExpandedItem} = useDocSidebarItemsExpandedState();

  const updateCollapsed = (toCollapsed = !collapsed) => {
    setExpandedItem(toCollapsed ? null : index);
    setCollapsed(toCollapsed);

    if (typeof window !== 'undefined' && collapsible) {
      window.localStorage.setItem(getStorageKey(item), String(toCollapsed));
    }
  };

  useAutoExpandActiveCategory({
    isActive,
    collapsed,
    updateCollapsed,
    activePath,
  });

  useEffect(() => {
    if (
      collapsible &&
      expandedItem != null &&
      expandedItem !== index &&
      autoCollapseCategories
    ) {
      setCollapsed(true);
    }
  }, [collapsible, expandedItem, index, setCollapsed, autoCollapseCategories]);

  const handleItemClick = (event) => {
    onItemClick?.(item);

    if (!collapsible) {
      return;
    }

    if (href) {
      if (isCurrentPage) {
        event.preventDefault();
        updateCollapsed();
      } else {
        updateCollapsed(false);
      }
    } else {
      event.preventDefault();
      updateCollapsed();
    }
  };

  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemCategory,
        ThemeClassNames.docs.docSidebarItemCategoryLevel(level),
        'menu__list-item',
        {
          'menu__list-item--collapsed': collapsed,
        },
        className,
      )}>
      <div
        className={clsx('menu__list-item-collapsible', {
          'menu__list-item-collapsible--active': isCurrentPage,
        })}>
        <Link
          className={clsx('menu__link', {
            'menu__link--sublist': collapsible,
            'menu__link--sublist-caret': !href && collapsible,
            'menu__link--active': isActive,
          })}
          onClick={handleItemClick}
          aria-current={isCurrentPage ? 'page' : undefined}
          role={collapsible && !href ? 'button' : undefined}
          aria-expanded={collapsible && !href ? !collapsed : undefined}
          href={collapsible ? hrefWithSSRFallback ?? '#' : hrefWithSSRFallback}
          {...props}>
          <span>{translatedLabel}</span>
        </Link>
        {href && collapsible && (
          <CollapseButton
            collapsed={collapsed}
            categoryLabel={translatedLabel}
            onClick={(event) => {
              event.preventDefault();
              updateCollapsed();
            }}
          />
        )}
      </div>

      <Collapsible lazy as="ul" className="menu__list" collapsed={collapsed}>
        <DocSidebarItems
          items={item.items}
          tabIndex={collapsed ? -1 : 0}
          onItemClick={onItemClick}
          activePath={activePath}
          level={level + 1}
        />
      </Collapsible>
    </li>
  );
}
