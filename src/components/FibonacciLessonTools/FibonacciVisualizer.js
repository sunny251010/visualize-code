import {useEffect, useMemo, useState} from 'react';
import {
  fibonacciCodeLines,
  fibonacciSteps,
} from '@site/src/data/fibonacciContent';
import styles from './styles.module.css';

export default function FibonacciVisualizer({compact = false}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const currentStep = fibonacciSteps[stepIndex];
  const cells = useMemo(() => buildCells(stepIndex), [stepIndex]);

  useEffect(() => {
    if (!playing) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setStepIndex((current) => {
        if (current >= fibonacciSteps.length - 1) {
          setPlaying(false);
          return current;
        }

        return current + 1;
      });
    }, 950);

    return () => window.clearInterval(timer);
  }, [playing]);

  return (
    <div className={styles.visualizer}>
      <div className={styles.toolHeader}>
        <div>
          <span className={styles.eyebrow}>Fibonacci Bottom-up</span>
          <h3>Bảng dp từ F(0) đến F(6)</h3>
        </div>
        <div className={styles.stepBadge}>Bước {stepIndex + 1}/{fibonacciSteps.length}</div>
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
            Reset
          </button>
          <button
            type="button"
            onClick={() => setStepIndex((current) => Math.max(0, current - 1))}
            disabled={stepIndex === 0}>
            Trước
          </button>
          <button type="button" onClick={() => setPlaying((current) => !current)}>
            {playing ? 'Dừng' : 'Chạy'}
          </button>
          <button
            type="button"
            onClick={() => setStepIndex((current) => Math.min(fibonacciSteps.length - 1, current + 1))}
            disabled={stepIndex === fibonacciSteps.length - 1}>
            Sau
          </button>
        </div>
      </div>

      {!compact && (
        <pre className={styles.codeTrace}>
          {fibonacciCodeLines.map((line, index) => (
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

function buildCells(stepIndex) {
  const visibleValues = fibonacciSteps.slice(0, stepIndex + 1);
  const currentStep = fibonacciSteps[stepIndex];

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
