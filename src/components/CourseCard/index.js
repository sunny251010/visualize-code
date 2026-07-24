import Link from '@docusaurus/Link';
import {getCoursePath} from '@site/src/data/courseNavigation';
import styles from './styles.module.css';

export default function CourseCard({course}) {
  const isComingSoon = course.comingSoon;

  const content = (
    <>
      <span className={styles.icon}>{course.icon}</span>
      <span className={styles.title}>{course.title}</span>
      <p>{course.description}</p>
      <span className={styles.meta}>
        {isComingSoon ? 'Coming soon' : `${countLessons(course)} bài học`}
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
