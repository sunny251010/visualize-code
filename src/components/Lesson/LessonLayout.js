import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Heading from '@theme/Heading';
import {normalizeLessonMetadata} from '@site/src/data/lessonMetadata';
import styles from './styles.module.css';

export default function LessonLayout({children}) {
  const {frontMatter, metadata} = useDoc();
  const lesson = normalizeLessonMetadata(frontMatter);
  const title = lesson.title ?? metadata.title;

  return (
    <article className={styles.lesson}>
      <header className={styles.header}>
        <div className={styles.kicker}>
          <span>{formatCourse(lesson.course)}</span>
          {lesson.topic && <span>{formatTopic(lesson.topic)}</span>}
        </div>
        <Heading as="h1" className={styles.title}>
          {title}
        </Heading>
        {lesson.description && (
          <p className={styles.description}>{lesson.description}</p>
        )}
        <div className={styles.metaGrid}>
          <MetaItem label="Difficulty" value={formatDifficulty(lesson.difficulty)} />
          <MetaItem
            label="Estimated time"
            value={lesson.estimatedTime ? `${lesson.estimatedTime} phút` : 'Chưa cập nhật'}
          />
          <MetaItem
            label="Tags"
            value={lesson.tags.length > 0 ? lesson.tags.join(', ') : 'Chưa có tag'}
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

function formatTopic(topic) {
  return topic
    .split('-')
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ');
}

function formatDifficulty(difficulty) {
  const labels = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  };

  return labels[difficulty] ?? difficulty ?? 'Beginner';
}
