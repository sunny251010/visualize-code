const COURSE_NAV_SCROLL_KEY = 'visualize-code:course-nav-scroll-top';
const COURSE_NAV_SCROLL_TTL = 5000;

export function prepareCourseNavNavigation(pathname) {
  if (typeof window === 'undefined') {
    return;
  }

  disableScrollRestoration();

  try {
    window.sessionStorage.setItem(
      COURSE_NAV_SCROLL_KEY,
      JSON.stringify({
        pathname: normalizePathname(pathname),
        createdAt: Date.now(),
      }),
    );
  } catch {
    // Session storage is optional; scrolling to top still works without it.
  }

  forceWindowScrollToTop();
}

export function consumeCourseNavNavigation(pathname) {
  const matches = hasCourseNavNavigation(pathname);

  if (matches) {
    clearCourseNavNavigation();
  }

  return matches;
}

export function hasCourseNavNavigation(pathname) {
  if (typeof window === 'undefined') {
    return false;
  }

  disableScrollRestoration();

  try {
    const value = window.sessionStorage.getItem(COURSE_NAV_SCROLL_KEY);
    if (!value) {
      return false;
    }

    const data = JSON.parse(value);
    const isFresh = Date.now() - data.createdAt < COURSE_NAV_SCROLL_TTL;
    const isTarget = normalizePathname(pathname) === data.pathname;

    if (!isFresh) {
      clearCourseNavNavigation();
    }

    return isFresh && isTarget;
  } catch {
    clearCourseNavNavigation();
    return false;
  }
}

export function clearCourseNavNavigation() {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.sessionStorage.removeItem(COURSE_NAV_SCROLL_KEY);
  } catch {
    // Ignore storage errors.
  }
}

export function forceWindowScrollToTop() {
  if (typeof window === 'undefined') {
    return;
  }

  window.scrollTo({top: 0, left: 0, behavior: 'auto'});

  [0, 16, 50, 120, 250].forEach((delay) => {
    window.setTimeout(() => {
      window.scrollTo({top: 0, left: 0, behavior: 'auto'});
    }, delay);
  });
}

function disableScrollRestoration() {
  if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
}

function normalizePathname(pathname) {
  if (!pathname || pathname === '/') {
    return '/';
  }

  return pathname.replace(/\/+$/, '');
}
