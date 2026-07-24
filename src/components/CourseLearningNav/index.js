import {useEffect, useMemo} from 'react';
import {useLocation} from '@docusaurus/router';
import {
  courses,
  getCoursePath,
} from '@site/src/data/courseNavigation';
import {useTranslation} from '@site/src/i18n/language';
import {progressService} from '@site/src/services/progressService';
import {
  forceWindowScrollToTop,
  hasCourseNavNavigation,
  prepareCourseNavNavigation,
} from '@site/src/utils/courseNavScroll';
import styles from './styles.module.css';

export default function CourseLearningNav() {
  const location = useLocation();
  const t = useTranslation();
  const activeCourse = useMemo(
    () => getActiveCourse(location.pathname),
    [location.pathname],
  );

  useEffect(() => {
    if (hasCourseNavNavigation(location.pathname)) {
      forceWindowScrollToTop();
    }
  }, [location.pathname]);

  useEffect(() => {
    const currentCourse = getActiveCourse(location.pathname);
    if (!currentCourse) {
      return;
    }

    progressService.recordLessonVisit({
      courseId: currentCourse.id,
      lessonId: location.pathname,
      path: location.pathname,
    });
  }, [location.pathname]);

  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav} aria-label={t('nav.courses')}>
        {courses
          .filter((course) => !course.comingSoon)
          .sort((a, b) => a.order - b.order)
          .map((course) => {
            const isActive = activeCourse?.id === course.id;
            const to = getCoursePath(course);

            return (
              <a
                className={`${styles.link} ${isActive ? styles.activeLink : ''}`}
                href={to}
                key={course.id}
                aria-current={isActive ? 'page' : undefined}
                onPointerDown={() => prepareCourseNavNavigation(to)}
                onClick={(event) => handleCourseClick(event, to, location.pathname)}>
                {t(`course.${course.id}.title`, course.title)}
              </a>
            );
          })}
      </nav>
    </div>
  );
}

function handleCourseClick(event, to, currentPathname) {
  if (typeof window === 'undefined') {
    return;
  }

  prepareCourseNavNavigation(to);

  if (normalizePathname(currentPathname) === normalizePathname(to)) {
    event.preventDefault();
    forceWindowScrollToTop();
  }
}

function getActiveCourse(pathname) {
  return courses.find((course) => pathname.includes(`/courses/${course.slug}`));
}

function normalizePathname(pathname) {
  if (!pathname || pathname === '/') {
    return '/';
  }

  return pathname.replace(/\/+$/, '');
}
