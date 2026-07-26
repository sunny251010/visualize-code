import {useEffect, useState} from 'react';
import {getCppRecursionVisualizerContent} from '@site/src/data/cppRecursionContent';
import {useLanguage} from '@site/src/i18n/language';
import styles from '@site/src/components/FibonacciLessonTools/styles.module.css';
import localStyles from './styles.module.css';

export default function CppRecursionVisualizer({compact = false, visualization}) {
  const {language} = useLanguage();
  const defaultVisualization = getCppRecursionVisualizerContent(language);
  const localizedVisualization = {
    ...defaultVisualization,
    ...visualization,
    labels: {
      ...defaultVisualization.labels,
      ...visualization?.labels,
      phases: {
        ...defaultVisualization.labels.phases,
        ...visualization?.labels?.phases,
      },
    },
  };
  const {codeLines, description, frames, labels, title} = localizedVisualization;
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
    <div className={styles.visualizer}>
      <div className={styles.toolHeader}>
        <div>
          <span className={styles.eyebrow}>C++ Recursion</span>
          <h3>{title}</h3>
        </div>
        <div className={styles.stepBadge}>{labels.step} {frameIndex + 1}/{frames.length}</div>
      </div>

      <div className={localStyles.recursionLayout}>
        <div className={localStyles.stackPanel}>
          <span className={localStyles.panelLabel}>Call stack</span>
          <div className={localStyles.stack}>
            {[...frame.stack].reverse().map((value, index) => (
              <div
                className={[
                  localStyles.stackFrame,
                  index === 0 ? localStyles.stackFrameActive : '',
                ].join(' ')}
                key={`${value}-${index}`}>
                <strong>factorial({value})</strong>
                <span>{index === 0 ? labels.processing : labels.waiting}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={localStyles.detailPanel}>
          <span className={localStyles.panelLabel}>{labels.status}</span>
          <div className={localStyles.expression}>{frame.expression}</div>
          <p>{frame.note}</p>
          <div className={styles.traceGrid}>
            <TraceItem label="n" value={frame.n} />
            <TraceItem label={labels.phase} value={formatPhase(frame.phase, labels.phases)} />
            <TraceItem label="return" value={frame.returnValue ?? '-'} />
            <TraceItem label="stack" value={frame.stack.length} />
          </div>
        </div>
      </div>

      <div className={styles.explainRow}>
        <p>{description}</p>
        <div className={styles.controls}>
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
        <pre className={styles.codeTrace}>
          {codeLines.map((line, index) => (
            <code
              className={frame.activeLine === index + 1 ? styles.activeCodeLine : ''}
              key={line}>
              {line}
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

function formatPhase(phase, labels) {
  return labels?.[phase] ?? phase;
}
