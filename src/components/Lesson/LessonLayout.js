import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Heading from '@theme/Heading';
import {normalizeLessonMetadata} from '@site/src/data/lessonMetadata';
import {useTranslation} from '@site/src/i18n/language';
import styles from './styles.module.css';

export default function LessonLayout({children, lessonData}) {
  const {frontMatter, metadata} = useDoc();
  const t = useTranslation();
  const lesson = normalizeLessonMetadata(frontMatter);
  const title =
    lessonData?.translation?.title ??
    (frontMatter.translationKey
      ? t(`${frontMatter.translationKey}.title`, lesson.title ?? metadata.title)
      : lesson.title ?? metadata.title);
  const description =
    lessonData?.translation?.description ??
    (frontMatter.translationKey
      ? t(`${frontMatter.translationKey}.description`, lesson.description)
      : lesson.description);

  return (
    <article className={styles.lesson}>
      <header className={styles.header}>
        <div className={styles.kicker}>
          <span>{formatCourse(lessonData?.course?.slug ?? lesson.course)}</span>
          {(lessonData?.section?.slug ?? lesson.topic) && (
            <span>{formatTopic(lessonData?.section?.slug ?? lesson.topic, t)}</span>
          )}
        </div>
        <Heading as="h1" className={styles.title}>
          {title}
        </Heading>
        {description && (
          <p className={styles.description}>{description}</p>
        )}
        <div className={styles.metaGrid}>
          <MetaItem label={t('lesson.difficulty')} value={formatDifficulty(lesson.difficulty, t)} />
          <MetaItem
            label={t('lesson.estimatedTime')}
            value={lesson.estimatedTime ? `${lesson.estimatedTime} ${t('lesson.minutes')}` : t('lesson.notUpdated')}
          />
          <MetaItem
            label={t('lesson.tags')}
            value={lesson.tags.length > 0 ? lesson.tags.join(', ') : t('lesson.noTags')}
          />
        </div>
      </header>
      <div className={styles.body}>{children}</div>
    </article>
  );
}

function MetaItem({label, value}) {
  return (
    <div className={styles.metaItem}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function formatCourse(course) {
  if (!course) {
    return 'Lesson';
  }

  return course.toUpperCase();
}

function formatTopic(topic, t) {
  const fallback = topic
    .split('-')
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ');

  return t(`topic.${topic}`, fallback);
}

function formatDifficulty(difficulty, t) {
  const labels = {
    beginner: t('lesson.beginner'),
    intermediate: t('lesson.intermediate'),
    advanced: t('lesson.advanced'),
  };

  return labels[difficulty] ?? difficulty ?? t('lesson.beginner');
}
