import {useEffect, useMemo, useState} from 'react';
import CodeBlock from '@theme/CodeBlock';
import {useTranslation} from '@site/src/i18n/language';
import styles from './styles.module.css';

export default function CodeTabs({languages = []}) {
  const t = useTranslation();
  const normalizedLanguages = useMemo(
    () => languages.map(normalizeLanguage).filter((item) => item.id && item.code),
    [languages],
  );
  const [activeId, setActiveId] = useState(normalizedLanguages[0]?.id);
  const [copied, setCopied] = useState(false);
  const activeLanguage =
    normalizedLanguages.find((item) => item.id === activeId) ??
    normalizedLanguages[0];

  useEffect(() => {
    if (!activeLanguage && normalizedLanguages[0]) {
      setActiveId(normalizedLanguages[0].id);
      return;
    }

    if (
      activeLanguage &&
      !normalizedLanguages.some((item) => item.id === activeLanguage.id)
    ) {
      setActiveId(normalizedLanguages[0]?.id);
    }
  }, [activeLanguage, normalizedLanguages]);

  useEffect(() => {
    if (!copied) {
      return undefined;
    }

    const timer = window.setTimeout(() => setCopied(false), 1400);
    return () => window.clearTimeout(timer);
  }, [copied]);

  if (!activeLanguage) {
    return null;
  }

  async function handleCopy() {
    if (window.navigator.clipboard?.writeText) {
      await window.navigator.clipboard.writeText(activeLanguage.code);
    } else {
      copyWithTextarea(activeLanguage.code);
    }

    setCopied(true);
  }

  return (
    <div className={styles.codeTabs}>
      <div className={styles.codeTabsHeader}>
        <div className={styles.codeTabsList} role="tablist">
          {normalizedLanguages.map((language) => (
            <button
              key={language.id}
              type="button"
              role="tab"
              aria-selected={language.id === activeLanguage.id}
              className={
                language.id === activeLanguage.id
                  ? `${styles.codeTab} ${styles.codeTabActive}`
                  : styles.codeTab
              }
              onClick={() => {
                setActiveId(language.id);
                setCopied(false);
              }}>
              {language.label}
            </button>
          ))}
        </div>
        <div className={styles.codeActions}>
          <button type="button" className={styles.codeAction} onClick={handleCopy}>
            {copied ? t('lesson.copied') : t('lesson.copy')}
          </button>
          <button type="button" className={styles.codeAction} disabled>
            {t('lesson.run')}
          </button>
        </div>
      </div>
      <CodeBlock language={activeLanguage.language}>
        {activeLanguage.code}
      </CodeBlock>
    </div>
  );
}

function normalizeLanguage(language) {
  return {
    id: language.id ?? language.language,
    label: language.label ?? language.title ?? language.language,
    language: language.language ?? language.id,
    code: language.code,
  };
}

function copyWithTextarea(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}
