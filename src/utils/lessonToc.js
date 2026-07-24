import {lessonService} from '@site/src/services/lessonService';

export function getTranslatedToc(toc, frontMatter, t, language) {
  if (frontMatter.lessonId) {
    const lessonToc = lessonService.getLessonToc({
      lessonId: frontMatter.lessonId,
      language,
    });

    if (lessonToc.length > 0) {
      return lessonToc;
    }
  }

  const sourceToc =
    frontMatter.lessonToc?.length > 0 ? frontMatter.lessonToc : toc;

  return sourceToc.map((item) => ({
    ...item,
    value: item.valueKey ? t(item.valueKey, item.value) : item.value,
  }));
}

export function hasLessonToc(toc, frontMatter) {
  return Boolean(frontMatter.lessonId) || toc.length > 0 || frontMatter.lessonToc?.length > 0;
}
