import React from 'react';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import TOC from '@theme/TOC';
import {useLanguage} from '@site/src/i18n/language';
import {getTranslatedToc} from '@site/src/utils/lessonToc';

export default function DocItemTOCDesktop() {
  const {toc, frontMatter} = useDoc();
  const {language, t} = useLanguage();

  return (
    <TOC
      toc={getTranslatedToc(toc, frontMatter, t, language)}
      minHeadingLevel={frontMatter.toc_min_heading_level}
      maxHeadingLevel={frontMatter.toc_max_heading_level}
      className={ThemeClassNames.docs.docTocDesktop}
    />
  );
}
