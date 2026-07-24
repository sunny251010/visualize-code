import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
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
              Đây là khung trang Quiz cho Phase 1. Hệ thống câu hỏi, chấm điểm trên client và giải thích đáp án sẽ được triển khai ở phase riêng, chưa làm trong bước này.
            </p>
          </div>
          <div className={styles.courseGrid}>
            <Link className={styles.courseCard} to="/courses/dsa">
              <span>DSA Quiz</span>
              <p>Câu hỏi theo bài học DSA sẽ được thêm sau khi lesson template sẵn sàng.</p>
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
