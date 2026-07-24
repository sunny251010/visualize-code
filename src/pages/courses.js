import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import CourseGrid from '@site/src/components/CourseGrid';
import {courses} from '@site/src/data/courseNavigation';
import styles from './index.module.css';

export default function CoursesPage() {
  const sortedCourses = [...courses].sort((a, b) => a.order - b.order);

  return (
    <Layout
      title="Courses"
      description="Tất cả course học lập trình của Visualize Code.">
      <main className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <Heading as="h1">Courses</Heading>
            <p>
              Toàn bộ lộ trình học của Visualize Code. Sau này trang này có thể mở rộng thêm search, filter, tiến độ học và course yêu thích.
            </p>
          </div>
          <CourseGrid courses={sortedCourses} />
        </div>
      </main>
    </Layout>
  );
}
