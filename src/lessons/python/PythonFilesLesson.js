import CodeBlock from '@theme/CodeBlock';
import LessonLayout, {
  ComplexitySummary,
  LessonVideo,
  LearningObjectives,
  PracticeList,
  Prerequisites,
} from '@site/src/components/Lesson';
import {
  PythonFilesQuiz,
  PythonFilesVisualizer,
} from '@site/src/components/PythonFilesLessonTools';
import {
  pythonFilesTranslation,
  pythonFilesVideo,
} from '@site/src/data/pythonFilesContent';

const lessonData = {
  course: {slug: 'python'},
  section: {slug: 'python-core'},
  lesson: {
    difficulty: 'beginner',
    estimatedTime: 28,
    tags: ['python', 'files', 'with-open', 'io'],
  },
  translation: {
    title: pythonFilesTranslation.title,
    description: pythonFilesTranslation.description,
  },
};

export default function PythonFilesLesson() {
  return (
    <LessonLayout lessonData={lessonData}>
      <section>
        <h2 id="learning-objectives">Mục tiêu học tập</h2>
        <LearningObjectives items={pythonFilesTranslation.learningObjectives} />
      </section>

      <section>
        <h2 id="prerequisites">Kiến thức cần có</h2>
        <Prerequisites items={pythonFilesTranslation.prerequisites} />
      </section>

      <section>
        <h2 id="lesson-video">Video bài học</h2>
        <LessonVideo video={pythonFilesVideo} />
      </section>

      <section>
        <h2 id="theory">Lý thuyết</h2>
        <p>
          File giúp chương trình lưu dữ liệu sau khi chương trình kết thúc. Ví dụ: lưu ghi chú,
          lưu điểm số, đọc cấu hình, hoặc xuất báo cáo.
        </p>
        <p>
          Trong Python, cách nên dùng nhất là <code>with open(...)</code>. Khối <code>with</code>
          sẽ tự động đóng file khi xử lý xong, giúp tránh quên <code>close()</code>.
        </p>
        <ul>
          <li><strong>r:</strong> đọc file. File phải tồn tại.</li>
          <li><strong>w:</strong> ghi file mới. Nếu file đã có, nội dung cũ bị ghi đè.</li>
          <li><strong>a:</strong> thêm nội dung vào cuối file.</li>
          <li><strong>encoding=&quot;utf-8&quot;:</strong> giúp đọc ghi tiếng Việt ổn định.</li>
        </ul>
      </section>

      <section>
        <h2 id="visualization">Trực quan hóa</h2>
        <PythonFilesVisualizer />
      </section>

      <section>
        <h2 id="code-example">Ví dụ code</h2>
        <CodeBlock language="python">
{`with open('notes.txt', 'w', encoding='utf-8') as file:
    file.write('Xin chào Python\\n')

with open('notes.txt', 'a', encoding='utf-8') as file:
    file.write('Học file với with open\\n')

with open('notes.txt', 'r', encoding='utf-8') as file:
    content = file.read()

print(content)`}
        </CodeBlock>
      </section>

      <section>
        <h2 id="program-output">Kết quả chương trình</h2>
        <CodeBlock language="text">
{`Xin chào Python
Học file với with open`}
        </CodeBlock>
      </section>

      <section>
        <h2 id="complexity">Độ phức tạp</h2>
        <ComplexitySummary time="O(n)" space="O(n)" />
        <p>
          Nếu file có <code>n</code> ký tự, <code>read()</code> cần đọc qua <code>n</code> ký tự
          nên thời gian là <code>O(n)</code>. Khi đọc toàn bộ file vào biến, bộ nhớ cũng là <code>O(n)</code>.
        </p>
      </section>

      <section>
        <h2 id="common-mistakes">Lỗi thường gặp</h2>
        <ul>
          <li>Dùng mode <code>w</code> khi muốn thêm dòng, làm mất nội dung cũ.</li>
          <li>Quên thêm <code>\n</code>, khiến các dòng bị dính liền nhau.</li>
          <li>Không dùng <code>encoding=&quot;utf-8&quot;</code> khi file có tiếng Việt.</li>
          <li>Đọc file quá lớn bằng <code>read()</code> một lần thay vì đọc từng dòng.</li>
        </ul>
      </section>

      <section>
        <h2 id="quiz">Quiz</h2>
        <PythonFilesQuiz />
      </section>

      <section>
        <h2 id="practice">Luyện tập</h2>
        <PracticeList
          items={[
            'Tạo file todo.txt và ghi 3 việc cần làm, mỗi việc một dòng.',
            'Đọc file todo.txt và in từng dòng kèm số thứ tự.',
            'Dùng mode a để thêm một việc mới vào cuối file.',
            'Viết chương trình đếm file có bao nhiêu dòng.',
          ]}
        />
      </section>

      <section>
        <h2 id="summary">Tóm tắt</h2>
        <p>
          Làm việc với file gồm ba ý chính: mở file đúng mode, đọc/ghi dữ liệu, và đóng file.
          Trong Python, <code>with open</code> là cách gọn và an toàn nhất cho phần lớn trường hợp.
        </p>
      </section>
    </LessonLayout>
  );
}
