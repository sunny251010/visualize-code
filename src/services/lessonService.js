import {
  mockCourses,
  mockLessons,
  mockLessonTranslations,
  mockSections,
} from '@site/src/data/mockDatabase';

export const lessonService = {
  getLessonById(lessonId) {
    return mockLessons.find((lesson) => lesson.id === lessonId);
  },

  getLessonByPath(courseSlug, lessonSlug) {
    const course = mockCourses.find((item) => item.slug === courseSlug);
    if (!course) {
      return undefined;
    }

    return mockLessons.find(
      (lesson) => lesson.courseId === course.id && lesson.slug === lessonSlug,
    );
  },

  getLessonTranslation(lessonId, language) {
    return (
      mockLessonTranslations.find(
        (translation) =>
          translation.lessonId === lessonId && translation.language === language,
      ) ??
      mockLessonTranslations.find(
        (translation) =>
          translation.lessonId === lessonId && translation.language === 'vi',
      )
    );
  },

  getLessonPageData({lessonId, language}) {
    const lesson = this.getLessonById(lessonId);
    if (!lesson) {
      return undefined;
    }

    const course = mockCourses.find((item) => item.id === lesson.courseId);
    const section = mockSections.find((item) => item.id === lesson.sectionId);
    const translation = this.getLessonTranslation(lesson.id, language);

    return {
      course,
      section,
      lesson,
      translation,
    };
  },
};
