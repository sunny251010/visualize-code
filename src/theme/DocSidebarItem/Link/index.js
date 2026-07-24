import DocSidebarItemLinkOriginal from '@theme-original/DocSidebarItem/Link';
import {useTranslation} from '@site/src/i18n/language';

export default function DocSidebarItemLink(props) {
  const t = useTranslation();
  const translatedItem = {
    ...props.item,
    label: t(`sidebar.${props.item.label}`, props.item.label),
  };

  return <DocSidebarItemLinkOriginal {...props} item={translatedItem} />;
}
