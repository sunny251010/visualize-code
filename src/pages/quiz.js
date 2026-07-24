import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {CppRecursionQuiz} from '@site/src/components/CppRecursionLessonTools';
import {FibonacciQuiz} from '@site/src/components/FibonacciLessonTools';
import {PythonFilesQuiz} from '@site/src/components/PythonFilesLessonTools';
import styles from './index.module.css';

export default function QuizPage() {
  return (
    <Layout
      title="Quiz"
      description="Khu vực Quiz của Visualize Code. Các quiz dùng cùng bộ câu hỏi với từng bài học.">
      <main className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <Heading as="h1">Quiz</Heading>
            <p>
              Các quiz bên dưới dùng cùng bộ câu hỏi với từng bài học tương ứng.
            </p>
          </div>
          <div className={styles.toolStack}>
            <section className={styles.toolBlock}>
              <h2>Fibonacci Bottom-up</h2>
              <FibonacciQuiz />
            </section>
            <section className={styles.toolBlock}>
              <h2>Đệ quy trong C++</h2>
              <CppRecursionQuiz />
            </section>
            <section className={styles.toolBlock}>
              <h2>File trong Python</h2>
              <PythonFilesQuiz />
            </section>
          </div>
          <div className={styles.courseGrid}>
            <Link className={styles.courseCard} to="/courses/dsa/fibonacci">
              <span>Fibonacci Bottom-up</span>
              <p>Mở bài học đầy đủ để xem video, animation và phần giải thích.</p>
            </Link>
            <Link className={styles.courseCard} to="/courses/cpp/recursion">
              <span>Đệ quy trong C++</span>
              <p>Mở bài học đầy đủ để xem call stack, code factorial và phần giải thích.</p>
            </Link>
            <Link className={styles.courseCard} to="/courses/python/files">
              <span>File trong Python</span>
              <p>Mở bài học đầy đủ để xem video, animation đọc ghi file và phần giải thích.</p>
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
