import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {useTranslation} from '@site/src/i18n/language';
import styles from './styles.module.css';

export function LearningObjectives({items = []}) {
  if (items.length === 0) {
    return null;
  }

  return <Checklist items={items} />;
}

export function Prerequisites({items}) {
  const {frontMatter} = useDoc();
  const t = useTranslation();
  const prerequisites = items ?? frontMatter.prerequisites ?? [];

  if (prerequisites.length === 0) {
    return (
      <p className={styles.muted}>
        {t('lesson.noPrerequisites')}
      </p>
    );
  }

  return <Checklist items={prerequisites} />;
}

export function LessonVideo({video}) {
  const {frontMatter} = useDoc();
  const videoData = video ?? frontMatter.video;

  if (!videoData?.youtubeId) {
    return null;
  }

  return (
    <div className={styles.videoFrame}>
      <iframe
        src={`https://www.youtube.com/embed/${videoData.youtubeId}`}
        title={videoData.title ?? 'Lesson video'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export function VisualizationPlaceholder({title = 'Visualization'}) {
  const t = useTranslation();

  return (
    <Placeholder
      title={title === 'Visualization' ? t('lesson.visualization') : title}
      description={t('lesson.visualizationPlaceholder')}
    />
  );
}

export function ProgramOutputPlaceholder() {
  const t = useTranslation();

  return (
    <Placeholder
      title={t('lesson.programOutput')}
      description={t('lesson.programOutputPlaceholder')}
    />
  );
}

export function QuizPlaceholder() {
  const t = useTranslation();

  return (
    <Placeholder
      title={t('lesson.quiz')}
      description={t('lesson.quizPlaceholder')}
    />
  );
}

export function ComplexitySummary({time, space}) {
  const t = useTranslation();

  if (!time && !space) {
    return null;
  }

  return (
    <div className={styles.complexityGrid}>
      {time && (
        <div>
          <span>{t('lesson.timeComplexity')}</span>
          <strong>{time}</strong>
        </div>
      )}
      {space && (
        <div>
          <span>{t('lesson.spaceComplexity')}</span>
          <strong>{space}</strong>
        </div>
      )}
    </div>
  );
}

export function PracticeList({items = []}) {
  const t = useTranslation();

  if (items.length === 0) {
    return (
      <Placeholder
        title={t('lesson.practice')}
        description={t('lesson.practicePlaceholder')}
      />
    );
  }

  return (
    <ol className={styles.practiceList}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  );
}

function Checklist({items}) {
  return (
    <ul className={styles.checklist}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function Placeholder({title, description}) {
  return (
    <div className={styles.placeholder}>
      <strong>{title}</strong>
      <p>{description}</p>
    </div>
  );
}
