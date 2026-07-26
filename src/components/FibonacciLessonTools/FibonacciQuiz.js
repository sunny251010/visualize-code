import {useEffect, useMemo, useState} from 'react';
import {getFibonacciQuizContent} from '@site/src/data/fibonacciContent';
import {useLanguage} from '@site/src/i18n/language';
import styles from './styles.module.css';

export default function FibonacciQuiz({quiz}) {
  const {language} = useLanguage();
  const defaultQuiz = getFibonacciQuizContent(language);
  const localizedQuiz = {
    ...defaultQuiz,
    ...quiz,
    labels: {
      ...defaultQuiz.labels,
      ...quiz?.labels,
    },
  };
  const {questions, labels, title} = localizedQuiz;
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = useMemo(
    () =>
      questions.reduce((total, question) => {
        return total + (answers[question.id] === question.answerIndex ? 1 : 0);
      }, 0),
    [answers, questions],
  );

  useEffect(() => {
    setAnswers({});
    setSubmitted(false);
  }, [questions]);

  return (
    <div className={styles.quiz}>
      <div className={styles.toolHeader}>
        <div>
          <span className={styles.eyebrow}>Quiz Fibonacci</span>
          <h3>{title}</h3>
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
