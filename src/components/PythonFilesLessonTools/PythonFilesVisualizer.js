import {useEffect, useState} from 'react';
import {
  pythonFilesCodeLines,
  pythonFilesFrames,
} from '@site/src/data/pythonFilesContent';
import sharedStyles from '@site/src/components/FibonacciLessonTools/styles.module.css';
import styles from './styles.module.css';

export default function PythonFilesVisualizer({compact = false}) {
  const [frameIndex, setFrameIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const frame = pythonFilesFrames[frameIndex];

  useEffect(() => {
    if (!playing) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setFrameIndex((current) => {
        if (current >= pythonFilesFrames.length - 1) {
          setPlaying(false);
          return current;
        }

        return current + 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [playing]);

  return (
    <div className={sharedStyles.visualizer}>
      <div className={sharedStyles.toolHeader}>
        <div>
          <span className={sharedStyles.eyebrow}>Python Files</span>
          <h3>Mô phỏng đọc và ghi file</h3>
        </div>
        <div className={sharedStyles.stepBadge}>Bước {frameIndex + 1}/{pythonFilesFrames.length}</div>
      </div>

      <div className={styles.fileLayout}>
        <div className={styles.filePanel}>
          <div className={styles.fileHeader}>
            <span>notes.txt</span>
            <strong>mode: {frame.mode}</strong>
          </div>
          <pre className={styles.filePaper}>{formatFileText(frame.disk) || 'File đang rỗng'}</pre>
        </div>

        <div className={styles.statePanel}>
          <div className={styles.statusGrid}>
            <TraceItem label="Trạng thái" value={frame.status} />
            <TraceItem label="Con trỏ" value={frame.pointer} />
            <TraceItem label="Buffer" value={formatFileText(frame.buffer) || '-'} />
          </div>
          <p>{frame.note}</p>
        </div>
      </div>

      <div className={sharedStyles.explainRow}>
        <p>
          File trong Python nên được mở bằng <code>with open(...)</code> để đọc, ghi và đóng file an toàn.
        </p>
        <div className={sharedStyles.controls}>
          <button type="button" onClick={() => setFrameIndex(0)}>
            Reset
          </button>
          <button
            type="button"
            onClick={() => setFrameIndex((current) => Math.max(0, current - 1))}
            disabled={frameIndex === 0}>
            Trước
          </button>
          <button type="button" onClick={() => setPlaying((current) => !current)}>
            {playing ? 'Dừng' : 'Chạy'}
          </button>
          <button
            type="button"
            onClick={() => setFrameIndex((current) => Math.min(pythonFilesFrames.length - 1, current + 1))}
            disabled={frameIndex === pythonFilesFrames.length - 1}>
            Sau
          </button>
        </div>
      </div>

      {!compact && (
        <pre className={sharedStyles.codeTrace}>
          {pythonFilesCodeLines.map((line, index) => (
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
