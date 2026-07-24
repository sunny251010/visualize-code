import CourseCard from '@site/src/components/CourseCard';
import styles from './styles.module.css';

export default function CourseGrid({courses}) {
  return (
    <div className={styles.grid}>
      {courses.map((course) => (
        <CourseCard course={course} key={course.id} />
      ))}
    </div>
  );
}
