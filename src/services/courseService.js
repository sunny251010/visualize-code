import {
  mockCourses,
  mockLessons,
  mockSections,
} from '@site/src/data/mockDatabase';

export const courseService = {
  getCourses() {
    return [...mockCourses].sort((a, b) => a.order - b.order);
  },

  getCourseById(courseId) {
    return mockCourses.find((course) => course.id === courseId);
  },

  getCourseBySlug(slug) {
    return mockCourses.find((course) => course.slug === slug);
  },

  getSectionsByCourseId(courseId) {
    return mockSections
      .filter((section) => section.courseId === courseId)
      .sort((a, b) => a.order - b.order);
  },

  getLessonsBySectionId(sectionId) {
    return mockLessons
      .filter((lesson) => lesson.sectionId === sectionId)
      .sort((a, b) => a.order - b.order);
  },
};
