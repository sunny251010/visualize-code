import {useEffect} from 'react';
import {useLocation} from '@docusaurus/router';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {getTranslatedToc} from '@site/src/utils/lessonToc';
import {progressService} from '@site/src/services/progressService';
import {
  consumeCourseNavNavigation,
  forceWindowScrollToTop,
} from '@site/src/utils/courseNavScroll';

export default function LearningProgressTracker() {
  const location = useLocation();
  const {toc, frontMatter} = useDoc();
  const lessonToc = getTranslatedToc(toc, frontMatter, (key, fallback) => fallback ?? key);

  useEffect(() => {
    if (typeof window === 'undefined' || lessonToc.length === 0) {
      return;
    }

    if (consumeCourseNavNavigation(location.pathname)) {
      forceWindowScrollToTop();
      return;
    }

    const storedProgress = progressService.getProgress();
    const savedHeading = storedProgress.lastHeadings?.[location.pathname];

    if (!location.hash && savedHeading) {
      window.requestAnimationFrame(() => {
        document.getElementById(savedHeading)?.scrollIntoView();
      });
    }
  }, [location.pathname]);

  useEffect(() => {
    if (typeof window === 'undefined' || lessonToc.length === 0) {
      return undefined;
    }

    const headings = lessonToc
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (headings.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (!visibleEntry) {
          return;
        }

        progressService.recordHeading(location.pathname, visibleEntry.target.id);
      },
      {
        rootMargin: '-20% 0px -65% 0px',
        threshold: [0, 1],
      },
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [location.pathname, lessonToc]);

  return null;
}
