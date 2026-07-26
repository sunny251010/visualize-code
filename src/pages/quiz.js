import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {CppRecursionQuiz} from '@site/src/components/CppRecursionLessonTools';
import {FibonacciQuiz} from '@site/src/components/FibonacciLessonTools';
import {PythonFilesQuiz} from '@site/src/components/PythonFilesLessonTools';
import {useLanguage} from '@site/src/i18n/language';
import styles from './index.module.css';

const copy = {
  vi: {
    description: 'Khu v\u1ef1c Quiz c\u1ee7a Visualize Code. C\u00e1c quiz d\u00f9ng c\u00f9ng b\u1ed9 c\u00e2u h\u1ecfi v\u1edbi t\u1eebng b\u00e0i h\u1ecdc.',
    intro: 'C\u00e1c quiz b\u00ean d\u01b0\u1edbi d\u00f9ng c\u00f9ng b\u1ed9 c\u00e2u h\u1ecfi v\u1edbi t\u1eebng b\u00e0i h\u1ecdc t\u01b0\u01a1ng \u1ee9ng.',
    cppTitle: '\u0110\u1ec7 quy trong C++',
    pythonTitle: 'File trong Python',
    fullLessonAnimation: 'M\u1edf b\u00e0i h\u1ecdc \u0111\u1ea7y \u0111\u1ee7 \u0111\u1ec3 xem video, animation v\u00e0 ph\u1ea7n gi\u1ea3i th\u00edch.',
    fullLessonStack: 'M\u1edf b\u00e0i h\u1ecdc \u0111\u1ea7y \u0111\u1ee7 \u0111\u1ec3 xem call stack, code factorial v\u00e0 ph\u1ea7n gi\u1ea3i th\u00edch.',
    fullLessonFiles: 'M\u1edf b\u00e0i h\u1ecdc \u0111\u1ea7y \u0111\u1ee7 \u0111\u1ec3 xem video, animation \u0111\u1ecdc ghi file v\u00e0 ph\u1ea7n gi\u1ea3i th\u00edch.',
  },
  en: {
    description: 'The Quiz area of Visualize Code. These quizzes reuse the question sets from each lesson.',
    intro: 'The quizzes below use the same question sets as their corresponding lessons.',
    cppTitle: 'Recursion in C++',
    pythonTitle: 'Files in Python',
    fullLessonAnimation: 'Open the full lesson to see the video, animation, and explanation.',
    fullLessonStack: 'Open the full lesson to see the call stack, factorial code, and explanation.',
    fullLessonFiles: 'Open the full lesson to see the video, file I/O animation, and explanation.',
  },
};

export default function QuizPage() {
  const {language} = useLanguage();
  const text = copy[language] ?? copy.vi;

  return (
    <Layout title="Quiz" description={text.description}>
      <main className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <Heading as="h1">Quiz</Heading>
            <p>{text.intro}</p>
          </div>
          <div className={styles.toolStack}>
            <section className={styles.toolBlock}>
              <h2>Fibonacci Bottom-up</h2>
              <FibonacciQuiz />
            </section>
            <section className={styles.toolBlock}>
              <h2>{text.cppTitle}</h2>
              <CppRecursionQuiz />
            </section>
            <section className={styles.toolBlock}>
              <h2>{text.pythonTitle}</h2>
              <PythonFilesQuiz />
            </section>
          </div>
          <div className={styles.courseGrid}>
            <Link className={styles.courseCard} to="/courses/dsa/fibonacci">
              <span>Fibonacci Bottom-up</span>
              <p>{text.fullLessonAnimation}</p>
            </Link>
            <Link className={styles.courseCard} to="/courses/cpp/recursion">
              <span>{text.cppTitle}</span>
              <p>{text.fullLessonStack}</p>
            </Link>
            <Link className={styles.courseCard} to="/courses/python/files">
              <span>{text.pythonTitle}</span>
              <p>{text.fullLessonFiles}</p>
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
