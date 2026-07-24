import {
  mockCourses,
  mockLessons,
  mockLessonTranslations,
  mockSections,
} from '@site/src/data/mockDatabase';

const lessonSectionDefinitions = [
  {
    id: 'learning-objectives',
    type: 'learningObjectives',
    title: {
      vi: 'Mục tiêu học tập',
      en: 'Learning Objectives',
    },
    getContent: (translation) => translation.learningObjectives,
  },
  {
    id: 'prerequisites',
    type: 'prerequisites',
    title: {
      vi: 'Kiến thức cần có',
      en: 'Prerequisites',
    },
    getContent: (translation) => translation.prerequisites,
  },
  {
    id: 'lesson-video',
    type: 'lessonVideo',
    title: {
      vi: 'Video bài học',
      en: 'Lesson Video',
    },
    getContent: (translation, lesson) => translation.video ?? lesson.video,
  },
  {
    id: 'theory',
    type: 'theory',
    title: {
      vi: 'Lý thuyết',
      en: 'Theory',
    },
    getContent: (translation) => translation.theoryBlocks,
  },
  {
    id: 'visualization',
    type: 'visualization',
    title: {
      vi: 'Trực quan hóa',
      en: 'Visualization',
    },
    getContent: (translation) => translation.visualization,
  },
  {
    id: 'code-example',
    type: 'codeExamples',
    title: {
      vi: 'Ví dụ code',
      en: 'Code Example',
    },
    getContent: (translation) => translation.codeExamples,
  },
  {
    id: 'program-output',
    type: 'programOutput',
    title: {
      vi: 'Kết quả chương trình',
      en: 'Program Output',
    },
    getContent: (translation) => translation.programOutput,
  },
  {
    id: 'complexity',
    type: 'complexity',
    title: {
      vi: 'Độ phức tạp',
      en: 'Complexity',
    },
    getContent: (translation) => translation.complexity,
  },
  {
    id: 'common-mistakes',
    type: 'commonMistakes',
    title: {
      vi: 'Lỗi thường gặp',
      en: 'Common Mistakes',
    },
    getContent: (translation) => translation.commonMistakes,
  },
  {
    id: 'quiz',
    type: 'quiz',
    title: {
      vi: 'Quiz',
      en: 'Quiz',
    },
    getContent: (translation) => translation.quiz,
  },
  {
    id: 'practice',
    type: 'practice',
    title: {
      vi: 'Luyện tập',
      en: 'Practice',
    },
    getContent: (translation) => translation.exercises,
  },
  {
    id: 'summary',
    type: 'summary',
    title: {
      vi: 'Tóm tắt',
      en: 'Summary',
    },
    getContent: (translation) => translation.summary,
  },
];

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
      sections: buildLessonSections({lesson, translation, language}),
    };
  },

  getLessonToc({lessonId, language}) {
    const pageData = this.getLessonPageData({lessonId, language});

    return (
      pageData?.sections.map((section) => ({
        id: section.id,
        value: section.title,
        level: 2,
      })) ?? []
    );
  },
};

function buildLessonSections({lesson, translation, language}) {
  if (!translation) {
    return [];
  }

  return lessonSectionDefinitions.map((definition) => ({
    id: definition.id,
    type: definition.type,
    title: definition.title[language] ?? definition.title.vi,
    content: definition.getContent(translation, lesson),
  }));
}
