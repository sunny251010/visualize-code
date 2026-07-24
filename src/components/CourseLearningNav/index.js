import {useEffect, useMemo, useState} from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {
  courses,
  getCoursePath,
} from '@site/src/data/courseNavigation';
import {useTranslation} from '@site/src/i18n/language';
import {progressService} from '@site/src/services/progressService';
import styles from './styles.module.css';

export default function CourseLearningNav() {
  const location = useLocation();
  const t = useTranslation();
  const [progress, setProgress] = useState({});
  const activeCourse = useMemo(
    () => getActiveCourse(location.pathname),
    [location.pathname],
  );

  useEffect(() => {
    try {
      setProgress(progressService.getProgress());
    } catch {
      setProgress({});
    }
  }, []);

  useEffect(() => {
    const currentCourse = getActiveCourse(location.pathname);
    if (!currentCourse) {
      return;
    }

    const nextProgress = progressService.recordLessonVisit({
      courseId: currentCourse.id,
      lessonId: location.pathname,
      path: location.pathname,
    });

    setProgress(nextProgress);
  }, [location.pathname]);

  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav} aria-label={t('nav.courses')}>
        {courses
          .filter((course) => !course.comingSoon)
          .sort((a, b) => a.order - b.order)
          .map((course) => {
            const isActive = activeCourse?.id === course.id;
            const savedPath = progress.lastLessons?.[course.id];
            const to = savedPath ?? getCoursePath(course);

            return (
              <Link
                className={`${styles.link} ${isActive ? styles.activeLink : ''}`}
                to={to}
                key={course.id}>
                {t(`course.${course.id}.title`, course.title)}
              </Link>
            );
          })}
      </nav>
    </div>
  );
}


function getActiveCourse(pathname) {
  return courses.find((course) => pathname.includes(`/courses/${course.slug}`));
}
