import React from 'react';
import {LanguageProvider} from '@site/src/i18n/language';

export default function Root({children}) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
