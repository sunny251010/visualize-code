import {useLanguage} from '@site/src/i18n/language';
import styles from './styles.module.css';

export default function LanguageToggle() {
  const {language, toggleLanguage, t} = useLanguage();
  const nextLanguage = language === 'vi' ? 'EN' : 'VI';

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleLanguage}
      title={t('nav.switchLanguage')}
      aria-label={t('nav.switchLanguage')}>
      <span>{language.toUpperCase()}</span>
      <strong>{nextLanguage}</strong>
    </button>
  );
}
