import {useEffect, useState} from 'react';
import {
  pythonFilesCodeLines,
  pythonFilesFrames,
} from '@site/src/data/pythonFilesContent';
import sharedStyles from '@site/src/components/FibonacciLessonTools/styles.module.css';
import styles from './styles.module.css';

const fallbackLabels = {
  step: 'Bước',
  emptyFile: 'File đang rỗng',
  status: 'Trạng thái',
  pointer: 'Con trỏ',
  buffer: 'Buffer',
  description: 'File trong Python nên được mở bằng `with open(...)` để đọc, ghi và đóng file an toàn.',
  reset: 'Reset',
  previous: 'Trước',
  play: 'Chạy',
  pause: 'Dừng',
  next: 'Sau',
};

export default function PythonFilesVisualizer({compact = false, visualization}) {
  const frames = visualization?.frames ?? pythonFilesFrames;
  const codeLines = visualization?.codeLines ?? pythonFilesCodeLines;
  const labels = visualization?.labels ?? fallbackLabels;
  const [frameIndex, setFrameIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const frame = frames[frameIndex] ?? frames[0];

  useEffect(() => {
    setFrameIndex(0);
    setPlaying(false);
  }, [frames]);

  useEffect(() => {
    if (!playing) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setFrameIndex((current) => {
        if (current >= frames.length - 1) {
          setPlaying(false);
          return current;
        }

        return current + 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [frames.length, playing]);

  if (!frame) {
    return null;
  }

  return (
    <div className={sharedStyles.visualizer}>
      <div className={sharedStyles.toolHeader}>
        <div>
          <span className={sharedStyles.eyebrow}>Python Files</span>
          <h3>{visualization?.title ?? 'Mô phỏng đọc và ghi file'}</h3>
        </div>
        <div className={sharedStyles.stepBadge}>{labels.step} {frameIndex + 1}/{frames.length}</div>
      </div>

      <div className={styles.fileLayout}>
        <div className={styles.filePanel}>
          <div className={styles.fileHeader}>
            <span>notes.txt</span>
            <strong>mode: {frame.mode}</strong>
          </div>
          <pre className={styles.filePaper}>{formatFileText(frame.disk) || labels.emptyFile}</pre>
        </div>

        <div className={styles.statePanel}>
          <div className={styles.statusGrid}>
            <TraceItem label={labels.status} value={frame.status} />
            <TraceItem label={labels.pointer} value={frame.pointer} />
            <TraceItem label={labels.buffer} value={formatFileText(frame.buffer) || '-'} />
          </div>
          <p>{frame.note}</p>
        </div>
      </div>

      <div className={sharedStyles.explainRow}>
        <p>{renderInlineCode(labels.description)}</p>
        <div className={sharedStyles.controls}>
          <button type="button" onClick={() => setFrameIndex(0)}>
            {labels.reset}
          </button>
          <button
            type="button"
            onClick={() => setFrameIndex((current) => Math.max(0, current - 1))}
            disabled={frameIndex === 0}>
            {labels.previous}
          </button>
          <button type="button" onClick={() => setPlaying((current) => !current)}>
            {playing ? labels.pause : labels.play}
          </button>
          <button
            type="button"
            onClick={() => setFrameIndex((current) => Math.min(frames.length - 1, current + 1))}
            disabled={frameIndex === frames.length - 1}>
            {labels.next}
          </button>
        </div>
      </div>

      {!compact && (
        <pre className={sharedStyles.codeTrace}>
          {codeLines.map((line, index) => (
            <code
              className={frame.line === index + 1 ? sharedStyles.activeCodeLine : ''}
              key={`${line}-${index}`}>
              {line || ' '}
            </code>
          ))}
        </pre>
      )}
    </div>
  );
}

function TraceItem({label, value}) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function formatFileText(text) {
  return text.replaceAll('\\n', '\n');
}

function renderInlineCode(text) {
  return text.split(/(`[^`]+`)/g).map((part) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={part}>{part.slice(1, -1)}</code>;
    }

    return part;
  });
}
