import {useMemo, useState} from 'react';
import {pythonFilesQuizQuestions} from '@site/src/data/pythonFilesContent';
import styles from '@site/src/components/FibonacciLessonTools/styles.module.css';

const fallbackLabels = {
  correct: 'Đúng.',
  wrong: 'Chưa đúng.',
  submit: 'Nộp bài',
  retry: 'Làm lại',
};

export default function PythonFilesQuiz({quiz}) {
  const questions = quiz?.questions ?? pythonFilesQuizQuestions;
  const labels = quiz?.labels ?? fallbackLabels;
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = useMemo(
    () =>
      questions.reduce((total, question) => {
        return total + (answers[question.id] === question.answerIndex ? 1 : 0);
      }, 0),
    [answers, questions],
  );

  return (
    <div className={styles.quiz}>
      <div className={styles.toolHeader}>
        <div>
          <span className={styles.eyebrow}>Quiz Python Files</span>
          <h3>{quiz?.title ?? 'Kiểm tra bài File trong Python'}</h3>
        </div>
        <div className={styles.stepBadge}>
          {submitted ? `${score}/${questions.length}` : `${Object.keys(answers).length}/${questions.length}`}
        </div>
      </div>

      <div className={styles.questionList}>
        {questions.map((question, questionIndex) => {
          const selectedAnswer = answers[question.id];
          const isCorrect = selectedAnswer === question.answerIndex;

          return (
            <fieldset className={styles.question} key={question.id}>
              <legend>{questionIndex + 1}. {question.question}</legend>
              <div className={styles.options}>
                {question.options.map((option, optionIndex) => {
                  const isSelected = selectedAnswer === optionIndex;
                  const isAnswer = question.answerIndex === optionIndex;
                  const stateClass = submitted && isAnswer
                    ? styles.optionCorrect
                    : submitted && isSelected && !isCorrect
                      ? styles.optionWrong
                      : '';

                  return (
                    <label className={[styles.option, stateClass].join(' ')} key={option}>
                      <input
                        checked={isSelected}
                        name={question.id}
                        onChange={() =>
                          setAnswers((current) => ({
                            ...current,
                            [question.id]: optionIndex,
                          }))
                        }
                        type="radio"
                      />
                      <span>{option}</span>
                    </label>
                  );
                })}
              </div>
              {submitted && (
                <p className={isCorrect ? styles.feedbackGood : styles.feedbackBad}>
                  {isCorrect ? labels.correct : labels.wrong} {question.explanation}
                </p>
              )}
            </fieldset>
          );
        })}
      </div>

      <div className={styles.quizActions}>
        <button type="button" onClick={() => setSubmitted(true)}>
          {labels.submit}
        </button>
        <button
          type="button"
          onClick={() => {
            setAnswers({});
            setSubmitted(false);
          }}>
          {labels.retry}
        </button>
      </div>
    </div>
  );
}
