import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const courses = [
  {
    title: 'DSA',
    description: 'Cấu trúc dữ liệu và giải thuật với mô phỏng từng bước.',
    to: '/docs/courses/dsa/intro',
  },
  {
    title: 'Python',
    description: 'Nền tảng lập trình rõ ràng, dễ tiếp cận cho người mới.',
    to: '/docs/courses/python/intro',
  },
  {
    title: 'C++',
    description: 'Cú pháp, kiểu dữ liệu và kỹ năng nền cho thuật toán.',
    to: '/docs/courses/cpp/intro',
  },
  {
    title: 'OOP',
    description: 'Class, object và các nguyên lý hướng đối tượng bằng ví dụ.',
    to: '/docs/courses/oop/intro',
  },
];

const lessonParts = [
  'Giới thiệu',
  'Lý thuyết',
  'Animation',
  'Ví dụ',
  'Code C++',
  'Code Python',
  'Độ phức tạp',
  'Quiz',
  'Bài tập',
  'Gợi ý lời giải',
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={styles.hero}>
      <div className="container">
        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Học lập trình bằng tiếng Việt</p>
            <Heading as="h1" className={styles.heroTitle}>
              {siteConfig.title}
            </Heading>
            <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
            <p className={styles.heroText}>
              Một không gian học lập trình tập trung vào trực quan hóa: mỗi khái niệm được giải thích bằng lý thuyết ngắn gọn, ví dụ dễ hiểu, code C++/Python và lộ trình học rõ ràng.
            </p>
            <div className={styles.actions}>
              <Link className="button button--primary button--lg" to="/docs/courses/dsa/intro">
                Bắt đầu với DSA
              </Link>
              <Link className="button button--secondary button--lg" to="/visualizer">
                Xem Visualizer
              </Link>
            </div>
          </div>
          <div className={styles.visualPanel} aria-label="Mô phỏng tĩnh thuật toán Binary Search">
            <div className={styles.panelTopbar}>
              <span />
              <span />
              <span />
            </div>
            <div className={styles.arrayRow}>
              {[2, 5, 8, 12, 16, 23, 38].map((value, index) => (
                <div
                  className={`${styles.arrayCell} ${index === 3 ? styles.arrayCellActive : ''}`}
                  key={value}>
                  {value}
                </div>
              ))}
            </div>
            <div className={styles.trace}>
              <div>
                <strong>left</strong>
                <span>0</span>
              </div>
              <div>
                <strong>mid</strong>
                <span>3</span>
              </div>
              <div>
                <strong>right</strong>
                <span>6</span>
              </div>
            </div>
            <pre className={styles.codePreview}>
              <code>{`target = 12
mid = (left + right) / 2
array[mid] == target`}</code>
            </pre>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description="Visualize Code là website học lập trình bằng tiếng Việt, tập trung vào animation trực quan và lộ trình học rõ ràng.">
      <HomepageHeader />
      <main>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <Heading as="h2">Lộ trình học đầu tiên</Heading>
              <p>
                Phase 1 tạo nền tảng và cấu trúc course. Nội dung chi tiết sẽ được triển khai theo từng phase sau roadmap.
              </p>
            </div>
            <div className={styles.courseGrid}>
              {courses.map((course) => (
                <Link className={styles.courseCard} to={course.to} key={course.title}>
                  <span>{course.title}</span>
                  <p>{course.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.sectionAlt}>
          <div className="container">
            <div className={styles.split}>
              <div>
                <Heading as="h2">Mỗi bài học sẽ có cấu trúc rõ ràng</Heading>
                <p>
                  Visualize Code hướng tới một format học nhất quán để người học không phải đoán bài tiếp theo sẽ có gì.
                </p>
              </div>
              <div className={styles.lessonGrid}>
                {lessonParts.map((part) => (
                  <span key={part}>{part}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <div className={styles.ctaBand}>
              <div>
                <Heading as="h2">Không cần đăng nhập để học</Heading>
                <p>
                  Nội dung học cốt lõi sẽ luôn mở. Đăng nhập, Supabase và dashboard cá nhân chỉ được thêm sau khi trải nghiệm học chính đã ổn định.
                </p>
              </div>
              <Link className="button button--primary" to="/blog/visualize-code-khoi-dau">
                Đọc ghi chú khởi đầu
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
