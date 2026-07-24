import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
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
              Đây là khung trang Visualizer cho Phase 1. Các mô phỏng thuật toán tương tác sẽ được triển khai sau khi nền tảng course và lesson template ổn định.
            </p>
          </div>
          <div className={styles.courseGrid}>
            <Link className={styles.courseCard} to="/courses/dsa">
              <span>DSA Visualizers</span>
              <p>Binary Search, Sorting, Stack, Queue và Graph sẽ được ưu tiên trong các phase sau.</p>
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
