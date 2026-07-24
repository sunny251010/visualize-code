import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
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
              Mô phỏng Fibonacci Bottom-up dùng cùng animation với bài học DSA/Fibonacci.
            </p>
          </div>
          <FibonacciVisualizer />
          <div className={styles.courseGrid}>
            <Link className={styles.courseCard} to="/courses/dsa/fibonacci">
              <span>Fibonacci Bottom-up</span>
              <p>Mở bài học đầy đủ gồm video, lý thuyết, animation, code và quiz.</p>
            </Link>
            <Link className={styles.courseCard} to="/courses/algorithms">
              <span>Algorithms</span>
              <p>Khu vực dành cho mô phỏng thuật toán theo từng bước giải thích.</p>
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
