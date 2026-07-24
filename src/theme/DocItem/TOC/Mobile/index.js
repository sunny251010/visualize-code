import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import TOCCollapsible from '@theme/TOCCollapsible';
import {useTranslation} from '@site/src/i18n/language';
import {getTranslatedToc} from '@site/src/utils/lessonToc';
import styles from './styles.module.css';

export default function DocItemTOCMobile() {
  const {toc, frontMatter} = useDoc();
  const t = useTranslation();

  return (
    <TOCCollapsible
      toc={getTranslatedToc(toc, frontMatter, t)}
      minHeadingLevel={frontMatter.toc_min_heading_level}
      maxHeadingLevel={frontMatter.toc_max_heading_level}
      className={clsx(ThemeClassNames.docs.docTocMobile, styles.tocMobile)}
    />
  );
}
