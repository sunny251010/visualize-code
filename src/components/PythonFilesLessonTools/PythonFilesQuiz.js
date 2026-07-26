import {useEffect, useMemo, useState} from 'react';
import {pythonFilesTranslations} from '@site/src/data/pythonFilesContent';
import {useLanguage} from '@site/src/i18n/language';
import styles from '@site/src/components/FibonacciLessonTools/styles.module.css';

const fallbackLabels = {
  correct: '\u0110\u00fang.',
  wrong: 'Ch\u01b0a \u0111\u00fang.',
  submit: 'N\u1ed9p b\u00e0i',
  retry: 'L\u00e0m l\u1ea1i',
};

export default function PythonFilesQuiz({quiz}) {
  const {language} = useLanguage();
  const localizedQuiz = quiz ?? pythonFilesTranslations[language]?.quiz;
  const questions = localizedQuiz?.questions ?? pythonFilesTranslations.vi.quiz.questions;
  const labels = localizedQuiz?.labels ?? fallbackLabels;
  const title = localizedQuiz?.title ?? 'Ki\u1ec3m tra b\u00e0i File trong Python';
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
          <span className={styles.eyebrow}>Quiz Python Files</span>
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
