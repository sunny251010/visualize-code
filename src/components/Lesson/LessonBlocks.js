import {useDoc} from '@docusaurus/plugin-content-docs/client';
import styles from './styles.module.css';

export function LearningObjectives({items = []}) {
  if (items.length === 0) {
    return null;
  }

  return <Checklist items={items} />;
}

export function Prerequisites({items}) {
  const {frontMatter} = useDoc();
  const prerequisites = items ?? frontMatter.prerequisites ?? [];

  if (prerequisites.length === 0) {
    return (
      <p className={styles.muted}>
        Bài học này không yêu cầu kiến thức nền đặc biệt.
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
  return (
    <Placeholder
      title={title}
      description="Khu vực này sẽ được kết nối với visualizer/animation ở phase sau."
    />
  );
}

export function ProgramOutputPlaceholder() {
  return (
    <Placeholder
      title="Program Output"
      description="Khu vực này sẽ hiển thị output hoặc kết quả chạy chương trình khi Code Runner được triển khai."
    />
  );
}

export function QuizPlaceholder() {
  return (
    <Placeholder
      title="Quiz"
      description="Quiz tương tác sẽ được thêm ở phase sau. Bài học hiện vẫn giữ sẵn vị trí để không phải refactor MDX."
    />
  );
}

export function ComplexitySummary({time, space}) {
  if (!time && !space) {
    return null;
  }

  return (
    <div className={styles.complexityGrid}>
      {time && (
        <div>
          <span>Time Complexity</span>
          <strong>{time}</strong>
        </div>
      )}
      {space && (
        <div>
          <span>Space Complexity</span>
          <strong>{space}</strong>
        </div>
      )}
    </div>
  );
}

export function PracticeList({items = []}) {
  if (items.length === 0) {
    return (
      <Placeholder
        title="Practice"
        description="Bài tập luyện tập sẽ được bổ sung khi hệ thống practice hoàn thiện."
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
