import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {
  courseGroups,
  courses,
  getCoursePath,
} from '@site/src/data/courseNavigation';
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
      )}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        className={clsx('clean-btn navbar__link', styles.trigger, {
          [styles.activeTrigger]: isActive,
        })}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setOpen(false);
          }
        }}>
        {label}
        <span className={styles.chevron} aria-hidden="true">⌄</span>
      </button>

      <div className={clsx(styles.panel, open && styles.panelOpen)}>
        <div className={styles.panelGrid}>
          {courseGroups.map((group) => (
            <MegaMenuGroup group={group} key={group.id} onNavigate={() => setOpen(false)} />
          ))}
        </div>
        <Link className={styles.viewAll} to="/courses" onClick={() => setOpen(false)}>
          View All Courses →
        </Link>
      </div>
    </div>
  );
}

function CoursesMegaMenuMobile({label}) {
  return (
    <li className="menu__list-item">
      <details className={styles.mobileDetails}>
        <summary className="menu__link menu__link--sublist">{label}</summary>
        <ul className="menu__list">
          {courseGroups.map((group) => (
            <li className="menu__list-item" key={group.id}>
              <details className={styles.mobileGroup}>
                <summary className="menu__link menu__link--sublist">{group.title}</summary>
                <ul className="menu__list">
                  {getCoursesForGroup(group).map((course) => (
                    <li className="menu__list-item" key={course.id}>
                      {course.comingSoon ? (
                        <span className={clsx('menu__link', styles.mobileMuted)}>
                          {course.title}
                        </span>
                      ) : (
                        <Link className="menu__link" to={getCoursePath(course)}>
                          {course.title}
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
              View All Courses →
            </Link>
          </li>
        </ul>
      </details>
    </li>
  );
}

function MegaMenuGroup({group, onNavigate}) {
  return (
    <section className={styles.group}>
      <h3>{group.title}</h3>
      <div className={styles.groupLinks}>
        {getCoursesForGroup(group).map((course) => {
          if (course.comingSoon) {
            return (
              <span className={clsx(styles.courseLink, styles.comingSoon)} key={course.id}>
                <span>{course.title}</span>
                <small>Coming soon</small>
              </span>
            );
          }

          return (
            <Link
              className={styles.courseLink}
              to={getCoursePath(course)}
              key={course.id}
              onClick={onNavigate}>
              <span>{course.title}</span>
              <small>{course.description}</small>
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
