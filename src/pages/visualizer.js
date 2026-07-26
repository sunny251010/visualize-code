import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {CppRecursionVisualizer} from '@site/src/components/CppRecursionLessonTools';
import {FibonacciVisualizer} from '@site/src/components/FibonacciLessonTools';
import {PythonFilesVisualizer} from '@site/src/components/PythonFilesLessonTools';
import {useLanguage} from '@site/src/i18n/language';
import styles from './index.module.css';

const copy = {
  vi: {
    description: 'Khu v\u1ef1c Visualizer c\u1ee7a Visualize Code. C\u00e1c m\u00f4 ph\u1ecfng d\u00f9ng c\u00f9ng animation v\u1edbi t\u1eebng b\u00e0i h\u1ecdc.',
    intro: 'C\u00e1c m\u00f4 ph\u1ecfng b\u00ean d\u01b0\u1edbi d\u00f9ng c\u00f9ng animation v\u1edbi t\u1eebng b\u00e0i h\u1ecdc t\u01b0\u01a1ng \u1ee9ng.',
    cppTitle: '\u0110\u1ec7 quy trong C++',
    pythonTitle: 'File trong Python',
    fullLessonFibonacci: 'M\u1edf b\u00e0i h\u1ecdc \u0111\u1ea7y \u0111\u1ee7 g\u1ed3m video, l\u00fd thuy\u1ebft, animation, code v\u00e0 quiz.',
    fullLessonStack: 'M\u1edf b\u00e0i h\u1ecdc \u0111\u1ea7y \u0111\u1ee7 g\u1ed3m video, call stack, code factorial v\u00e0 quiz.',
    fullLessonFiles: 'M\u1edf b\u00e0i h\u1ecdc \u0111\u1ea7y \u0111\u1ee7 g\u1ed3m video, m\u00f4 ph\u1ecfng \u0111\u1ecdc ghi file, code with open v\u00e0 quiz.',
  },
  en: {
    description: 'The Visualizer area of Visualize Code. These simulations reuse the animation from each lesson.',
    intro: 'The simulations below use the same animation as their corresponding lessons.',
    cppTitle: 'Recursion in C++',
    pythonTitle: 'Files in Python',
    fullLessonFibonacci: 'Open the full lesson with video, theory, animation, code, and quiz.',
    fullLessonStack: 'Open the full lesson with video, call stack, factorial code, and quiz.',
    fullLessonFiles: 'Open the full lesson with video, file I/O simulation, with open code, and quiz.',
  },
};

export default function VisualizerPage() {
  const {language} = useLanguage();
  const text = copy[language] ?? copy.vi;

  return (
    <Layout title="Visualizer" description={text.description}>
      <main className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <Heading as="h1">Visualizer</Heading>
            <p>{text.intro}</p>
          </div>
          <div className={styles.toolStack}>
            <section className={styles.toolBlock}>
              <h2>Fibonacci Bottom-up</h2>
              <FibonacciVisualizer />
            </section>
            <section className={styles.toolBlock}>
              <h2>{text.cppTitle}</h2>
              <CppRecursionVisualizer />
            </section>
            <section className={styles.toolBlock}>
              <h2>{text.pythonTitle}</h2>
              <PythonFilesVisualizer />
            </section>
          </div>
          <div className={styles.courseGrid}>
            <Link className={styles.courseCard} to="/courses/dsa/fibonacci">
              <span>Fibonacci Bottom-up</span>
              <p>{text.fullLessonFibonacci}</p>
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
