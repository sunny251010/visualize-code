import CodeBlock from '@theme/CodeBlock';
import LessonLayout, {
  LearningObjectives,
  Prerequisites,
  LessonVideo,
  VisualizationPlaceholder,
  ProgramOutputPlaceholder,
  ComplexitySummary,
  QuizPlaceholder,
  PracticeList,
} from '@site/src/components/Lesson';
import {useTranslation} from '@site/src/i18n/language';

const cppCode = `#include <iostream>
#include <vector>
using namespace std;

int fibonacci(int n) {
    if (n <= 1) {
        return n;
    }

    vector<int> dp(n + 1);
    dp[0] = 0;
    dp[1] = 1;

    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}

int main() {
    cout << fibonacci(6);
    return 0;
}`;

const pythonCode = `def fibonacci(n):
    if n <= 1:
        return n

    dp = [0] * (n + 1)
    dp[0] = 0
    dp[1] = 1

    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]

    return dp[n]


print(fibonacci(6))`;

const sequence = `F(0) = 0
F(1) = 1
F(2) = 1
F(3) = 2
F(4) = 3
F(5) = 5
F(6) = 8`;

export default function FibonacciBottomUpLesson() {
  const t = useTranslation();

  return (
    <LessonLayout>
      <h2 id="learning-objectives">{t('fibonacci.objectives.heading')}</h2>
      <LearningObjectives
        items={[
          t('fibonacci.objective.1'),
          t('fibonacci.objective.2'),
          t('fibonacci.objective.3'),
          t('fibonacci.objective.4'),
        ]}
      />

      <h2 id="prerequisites">{t('fibonacci.prerequisites.heading')}</h2>
      <Prerequisites
        items={[
          t('fibonacci.prereq.1'),
          t('fibonacci.prereq.2'),
          t('fibonacci.prereq.3'),
        ]}
      />

      <h2 id="lesson-video">{t('fibonacci.video.heading')}</h2>
      <LessonVideo />

      <h2 id="theory">{t('fibonacci.theory.heading')}</h2>
      <p>{t('fibonacci.theory.1')}</p>
      <ul>
        <li><code>F(0) = 0</code></li>
        <li><code>F(1) = 1</code></li>
        <li><code>F(n) = F(n - 1) + F(n - 2)</code> {t('fibonacci.formula.condition')} <code>n &gt;= 2</code></li>
      </ul>
      <p>{t('fibonacci.theory.2')}</p>
      <p>{t('fibonacci.theory.3')}</p>
      <CodeBlock language="text">{sequence}</CodeBlock>
      <p>{t('fibonacci.theory.4')}</p>

      <h2 id="visualization">{t('fibonacci.visualization.heading')}</h2>
      <VisualizationPlaceholder title={t('fibonacci.visualization.title')} />

      <h2 id="code-example">{t('fibonacci.code.heading')}</h2>
      <h3>C++</h3>
      <CodeBlock language="cpp">{cppCode}</CodeBlock>
      <h3>Python</h3>
      <CodeBlock language="python">{pythonCode}</CodeBlock>

      <h2 id="program-output">{t('fibonacci.output.heading')}</h2>
      <ProgramOutputPlaceholder />
      <CodeBlock language="text">8</CodeBlock>

      <h2 id="complexity">{t('fibonacci.complexity.heading')}</h2>
      <ComplexitySummary time="O(n)" space="O(n)" />
      <p>{t('fibonacci.complexity.note')}</p>

      <h2 id="common-mistakes">{t('fibonacci.mistakes.heading')}</h2>
      <ul>
        <li>{t('fibonacci.mistake.1')}</li>
        <li>{t('fibonacci.mistake.2')}</li>
        <li>{t('fibonacci.mistake.3')}</li>
        <li>{t('fibonacci.mistake.4')}</li>
      </ul>

      <h2 id="quiz">{t('fibonacci.quiz.heading')}</h2>
      <QuizPlaceholder />

      <h2 id="practice">{t('fibonacci.practice.heading')}</h2>
      <PracticeList
        items={[
          t('fibonacci.practice.1'),
          t('fibonacci.practice.2'),
          t('fibonacci.practice.3'),
        ]}
      />

      <h2 id="summary">{t('fibonacci.summary.heading')}</h2>
      <p>{t('fibonacci.summary.1')}</p>
      <p>{t('fibonacci.summary.2')}</p>
    </LessonLayout>
  );
}
