import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {CppRecursionVisualizer} from '@site/src/components/CppRecursionLessonTools';
import {FibonacciVisualizer} from '@site/src/components/FibonacciLessonTools';
import styles from './index.module.css';

export default function VisualizerPage() {
  return (
    <Layout
      title="Visualizer"
      description="Khu vực Visualizer của Visualize Code. Tính năng tương tác sẽ được triển khai ở phase sau.">
      <main className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <Heading as="h1">Visualizer</Heading>
            <p>
              Các mô phỏng bên dưới dùng cùng animation với từng bài học tương ứng.
            </p>
          </div>
          <div className={styles.toolStack}>
            <section className={styles.toolBlock}>
              <h2>Fibonacci Bottom-up</h2>
              <FibonacciVisualizer />
            </section>
            <section className={styles.toolBlock}>
              <h2>Đệ quy trong C++</h2>
              <CppRecursionVisualizer />
            </section>
          </div>
          <div className={styles.courseGrid}>
            <Link className={styles.courseCard} to="/courses/dsa/fibonacci">
              <span>Fibonacci Bottom-up</span>
              <p>Mở bài học đầy đủ gồm video, lý thuyết, animation, code và quiz.</p>
            </Link>
            <Link className={styles.courseCard} to="/courses/cpp/recursion">
              <span>Đệ quy trong C++</span>
              <p>Mở bài học đầy đủ gồm video, call stack, code factorial và quiz.</p>
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
