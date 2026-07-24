import React from 'react';
import {useTranslation} from '@site/src/i18n/language';

export default function FooterCopyright() {
  const t = useTranslation();

  return <div className="footer__copyright">{t('footer.copyright')}</div>;
}
