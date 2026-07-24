import Link from '@docusaurus/Link';
import {getCoursePath} from '@site/src/data/courseNavigation';
import {useTranslation} from '@site/src/i18n/language';
import styles from './styles.module.css';

export default function CourseCard({course}) {
  const t = useTranslation();
  const isComingSoon = course.comingSoon;
  const title = t(`course.${course.id}.title`, course.title);
  const description = t(`course.${course.id}.description`, course.description);

  const content = (
    <>
      <span className={styles.icon}>{course.icon}</span>
      <span className={styles.title}>{title}</span>
      <p>{description}</p>
      <span className={styles.meta}>
        {isComingSoon
          ? t('common.comingSoon')
          : `${countLessons(course)} ${t('common.lessons')}`}
      </span>
    </>
  );

  if (isComingSoon) {
    return <article className={`${styles.card} ${styles.disabled}`}>{content}</article>;
  }

  return (
    <Link className={styles.card} to={getCoursePath(course)}>
      {content}
    </Link>
  );
}

function countLessons(course) {
  return course.sections.reduce(
    (total, section) => total + section.lessons.length,
    0,
  );
}
