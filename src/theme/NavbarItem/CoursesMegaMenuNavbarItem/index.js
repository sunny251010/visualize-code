import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {
  courseGroups,
  courses,
  getCoursePath,
} from '@site/src/data/courseNavigation';
import {useTranslation} from '@site/src/i18n/language';
import styles from './styles.module.css';

export default function CoursesMegaMenuNavbarItem({
  label = 'Courses',
  position,
  mobile,
}) {
  if (mobile) {
    return <CoursesMegaMenuMobile label={label} />;
  }

  return <CoursesMegaMenuDesktop label={label} position={position} />;
}

function CoursesMegaMenuDesktop({label, position}) {
  const location = useLocation();
  const t = useTranslation();
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);
  const isActive = location.pathname.includes('/courses');

  useEffect(() => {
    function handleOutsideClick(event) {
      if (!menuRef.current || menuRef.current.contains(event.target)) {
        return;
      }

      setOpen(false);
    }

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className={clsx(
        'navbar__item',
        styles.megaMenuRoot,
        position === 'right' && styles.alignRight,
      )}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(event) => {
        if (!menuRef.current?.contains(event.relatedTarget)) {
          setOpen(false);
        }
      }}>
      <Link
        to="/courses"
        aria-haspopup="true"
        aria-expanded={open}
        className={clsx('clean-btn navbar__link', styles.trigger, {
          [styles.activeTrigger]: isActive,
        })}
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(false)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setOpen(false);
          }
        }}>
        {t('nav.courses', label)}
      </Link>

      <div className={clsx(styles.panel, open && styles.panelOpen)}>
        <div className={styles.panelGrid}>
          {courseGroups.map((group) => (
            <MegaMenuGroup group={group} key={group.id} onNavigate={() => setOpen(false)} />
          ))}
        </div>
        <Link className={styles.viewAll} to="/courses" onClick={() => setOpen(false)}>
          {t('courses.viewAll')}
        </Link>
      </div>
    </div>
  );
}

function CoursesMegaMenuMobile({label}) {
  const t = useTranslation();

  return (
    <li className="menu__list-item">
      <details className={styles.mobileDetails}>
        <summary className="menu__link menu__link--sublist">{t('nav.courses', label)}</summary>
        <ul className="menu__list">
          {courseGroups.map((group) => (
            <li className="menu__list-item" key={group.id}>
              <details className={styles.mobileGroup}>
                <summary className="menu__link menu__link--sublist">{getGroupTitle(group, t)}</summary>
                <ul className="menu__list">
                  {getCoursesForGroup(group).map((course) => (
                    <li className="menu__list-item" key={course.id}>
                      {course.comingSoon ? (
                        <span className={clsx('menu__link', styles.mobileMuted)}>
                          {getCourseTitle(course, t)}
                        </span>
                      ) : (
                        <Link className="menu__link" to={getCoursePath(course)}>
                          {getCourseTitle(course, t)}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
          <li className="menu__list-item">
            <Link className="menu__link menu__link--active" to="/courses">
              {t('courses.viewAll')}
            </Link>
          </li>
        </ul>
      </details>
    </li>
  );
}

function MegaMenuGroup({group, onNavigate}) {
  const t = useTranslation();

  return (
    <section className={styles.group}>
      <h3>{getGroupTitle(group, t)}</h3>
      <div className={styles.groupLinks}>
        {getCoursesForGroup(group).map((course) => {
          if (course.comingSoon) {
            return (
              <span className={clsx(styles.courseLink, styles.comingSoon)} key={course.id}>
                <span>{getCourseTitle(course, t)}</span>
                <small>{t('common.comingSoon')}</small>
              </span>
            );
          }

          return (
            <Link
              className={styles.courseLink}
              to={getCoursePath(course)}
              key={course.id}
              onClick={onNavigate}>
              <span>{getCourseTitle(course, t)}</span>
              <small>{getCourseDescription(course, t)}</small>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function getCoursesForGroup(group) {
  return group.courseIds
    .map((courseId) => courses.find((course) => course.id === courseId))
    .filter(Boolean);
}

function getGroupTitle(group, t) {
  const keys = {
    programming: 'mega.programming',
    'computer-science': 'mega.computerScience',
    career: 'mega.career',
    projects: 'mega.projects',
  };

  return t(keys[group.id], group.title);
}

function getCourseTitle(course, t) {
  return t(`course.${course.id}.title`, course.title);
}

function getCourseDescription(course, t) {
  return t(`course.${course.id}.description`, course.description);
}
