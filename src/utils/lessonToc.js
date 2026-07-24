export function getTranslatedToc(toc, frontMatter, t) {
  const sourceToc =
    frontMatter.lessonToc?.length > 0 ? frontMatter.lessonToc : toc;

  return sourceToc.map((item) => ({
    ...item,
    value: item.valueKey ? t(item.valueKey, item.value) : item.value,
  }));
}

export function hasLessonToc(toc, frontMatter) {
  return toc.length > 0 || frontMatter.lessonToc?.length > 0;
}
