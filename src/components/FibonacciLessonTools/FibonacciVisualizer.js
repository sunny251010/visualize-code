import {useEffect, useMemo, useState} from 'react';
import {getFibonacciVisualizerContent} from '@site/src/data/fibonacciContent';
import {useLanguage} from '@site/src/i18n/language';
import styles from './styles.module.css';

export default function FibonacciVisualizer({compact = false, visualization}) {
  const {language} = useLanguage();
  const defaultVisualization = getFibonacciVisualizerContent(language);
  const localizedVisualization = {
    ...defaultVisualization,
    ...visualization,
    labels: {
      ...defaultVisualization.labels,
      ...visualization?.labels,
    },
  };
  const {codeLines, labels, steps, title} = localizedVisualization;
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const currentStep = steps[stepIndex] ?? steps[0];
  const cells = useMemo(() => buildCells(stepIndex, steps), [stepIndex, steps]);

  useEffect(() => {
    setStepIndex(0);
    setPlaying(false);
  }, [steps]);

  useEffect(() => {
    if (!playing) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setStepIndex((current) => {
        if (current >= steps.length - 1) {
          setPlaying(false);
          return current;
        }

        return current + 1;
      });
    }, 950);

    return () => window.clearInterval(timer);
  }, [playing, steps.length]);

  if (!currentStep) {
    return null;
  }

  return (
    <div className={styles.visualizer}>
      <div className={styles.toolHeader}>
        <div>
          <span className={styles.eyebrow}>Fibonacci Bottom-up</span>
          <h3>{title}</h3>
        </div>
        <div className={styles.stepBadge}>{labels.step} {stepIndex + 1}/{steps.length}</div>
      </div>

      <div className={styles.arrayGrid}>
        {cells.map((cell) => (
          <div
            className={[
              styles.cell,
              cell.isCurrent ? styles.cellCurrent : '',
              cell.isSource ? styles.cellSource : '',
              cell.isPending ? styles.cellPending : '',
            ].join(' ')}
            key={cell.index}>
            <span>F({cell.index})</span>
            <strong>{cell.value ?? '?'}</strong>
          </div>
        ))}
      </div>

      <div className={styles.traceGrid}>
        <TraceItem label="i" value={currentStep.index} />
        <TraceItem label="dp[i - 2]" value={currentStep.left === null ? '-' : cells[currentStep.left]?.value} />
        <TraceItem label="dp[i - 1]" value={currentStep.right === null ? '-' : cells[currentStep.right]?.value} />
        <TraceItem label="dp[i]" value={currentStep.value} />
      </div>

      <div className={styles.explainRow}>
        <p>{currentStep.note}</p>
        <div className={styles.controls}>
          <button type="button" onClick={() => setStepIndex(0)}>
            {labels.reset}
          </button>
          <button
            type="button"
            onClick={() => setStepIndex((current) => Math.max(0, current - 1))}
            disabled={stepIndex === 0}>
            {labels.previous}
          </button>
          <button type="button" onClick={() => setPlaying((current) => !current)}>
            {playing ? labels.pause : labels.play}
          </button>
          <button
            type="button"
            onClick={() => setStepIndex((current) => Math.min(steps.length - 1, current + 1))}
            disabled={stepIndex === steps.length - 1}>
            {labels.next}
          </button>
        </div>
      </div>

      {!compact && (
        <pre className={styles.codeTrace}>
          {codeLines.map((line, index) => (
            <code
              className={currentStep.codeLine === index + 1 ? styles.activeCodeLine : ''}
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

function buildCells(stepIndex, steps) {
  const visibleValues = steps.slice(0, stepIndex + 1);
  const currentStep = steps[stepIndex] ?? steps[0];

  return Array.from({length: 7}, (_, index) => {
    const step = visibleValues.find((item) => item.index === index);
    const isSource = currentStep.left === index || currentStep.right === index;

    return {
      index,
      value: step?.value,
      isCurrent: currentStep.index === index,
      isSource,
      isPending: !step,
    };
  });
}
