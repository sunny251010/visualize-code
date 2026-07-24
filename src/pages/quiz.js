import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {FibonacciQuiz} from '@site/src/components/FibonacciLessonTools';
import styles from './index.module.css';

export default function QuizPage() {
  return (
    <Layout
      title="Quiz"
      description="Khu vực Quiz của Visualize Code. Quiz tương tác sẽ được triển khai ở phase sau.">
      <main className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <Heading as="h1">Quiz</Heading>
            <p>
              Quiz Fibonacci dùng cùng bộ câu hỏi với bài học DSA/Fibonacci.
            </p>
          </div>
          <FibonacciQuiz />
          <div className={styles.courseGrid}>
            <Link className={styles.courseCard} to="/courses/dsa/fibonacci">
              <span>Fibonacci Bottom-up</span>
              <p>Mở bài học đầy đủ để xem video, animation và phần giải thích.</p>
            </Link>
            <Link className={styles.courseCard} to="/courses/python">
              <span>Python Quiz</span>
              <p>Ôn cú pháp và tư duy lập trình Python bằng câu hỏi ngắn.</p>
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
