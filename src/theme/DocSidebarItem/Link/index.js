import DocSidebarItemLinkOriginal from '@theme-original/DocSidebarItem/Link';
import {useTranslation} from '@site/src/i18n/language';
import {translateSidebarLabel} from '@site/src/utils/sidebarLabels';

export default function DocSidebarItemLink(props) {
  const t = useTranslation();
  const translatedItem = {
    ...props.item,
    label: translateSidebarLabel(props.item.label, t),
  };

  return <DocSidebarItemLinkOriginal {...props} item={translatedItem} />;
}
