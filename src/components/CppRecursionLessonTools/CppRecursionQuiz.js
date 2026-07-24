import {useMemo, useState} from 'react';
import {cppRecursionQuizQuestions} from '@site/src/data/cppRecursionContent';
import styles from '@site/src/components/FibonacciLessonTools/styles.module.css';

export default function CppRecursionQuiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = useMemo(
    () =>
      cppRecursionQuizQuestions.reduce((total, question) => {
        return total + (answers[question.id] === question.answerIndex ? 1 : 0);
      }, 0),
    [answers],
  );

  return (
    <div className={styles.quiz}>
      <div className={styles.toolHeader}>
        <div>
          <span className={styles.eyebrow}>Quiz C++</span>
          <h3>Kiểm tra hiểu bài Đệ quy</h3>
        </div>
        <div className={styles.stepBadge}>
          {submitted ? `${score}/${cppRecursionQuizQuestions.length}` : `${Object.keys(answers).length}/${cppRecursionQuizQuestions.length}`}
        </div>
      </div>

      <div className={styles.questionList}>
        {cppRecursionQuizQuestions.map((question, questionIndex) => {
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
                  {isCorrect ? 'Đúng.' : 'Chưa đúng.'} {question.explanation}
                </p>
              )}
            </fieldset>
          );
        })}
      </div>

      <div className={styles.quizActions}>
        <button type="button" onClick={() => setSubmitted(true)}>
          Nộp bài
        </button>
        <button
          type="button"
          onClick={() => {
            setAnswers({});
            setSubmitted(false);
          }}>
          Làm lại
        </button>
      </div>
    </div>
  );
}
