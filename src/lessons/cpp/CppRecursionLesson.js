import CodeBlock from '@theme/CodeBlock';
import LessonLayout, {
  ComplexitySummary,
  LessonVideo,
  LearningObjectives,
  PracticeList,
  Prerequisites,
} from '@site/src/components/Lesson';
import {
  CppRecursionQuiz,
  CppRecursionVisualizer,
} from '@site/src/components/CppRecursionLessonTools';
import {cppRecursionVideo} from '@site/src/data/cppRecursionContent';

const lessonData = {
  course: {slug: 'cpp'},
  section: {slug: 'functions'},
  lesson: {
    difficulty: 'beginner',
    estimatedTime: 30,
    tags: ['cpp', 'recursion', 'call-stack', 'functions'],
  },
  translation: {
    title: 'Đệ quy trong C++',
    description: 'Hiểu cách một hàm tự gọi chính nó, điều kiện dừng, call stack và quá trình trả kết quả.',
  },
};

export default function CppRecursionLesson() {
  return (
    <LessonLayout lessonData={lessonData}>
      <section>
        <h2 id="learning-objectives">Mục tiêu học tập</h2>
        <LearningObjectives
          items={[
            'Hiểu đệ quy là gì và khi nào nên dùng.',
            'Biết vai trò của điều kiện dừng trong hàm đệ quy.',
            'Theo dõi được call stack khi hàm gọi chính nó.',
            'Viết được hàm factorial bằng C++ và phân tích độ phức tạp.',
          ]}
        />
      </section>

      <section>
        <h2 id="prerequisites">Kiến thức cần có</h2>
        <Prerequisites
          items={[
            'Biết khai báo hàm trong C++.',
            'Biết câu lệnh điều kiện if.',
            'Biết phép nhân và kiểu số nguyên cơ bản.',
          ]}
        />
      </section>

      <section>
        <h2 id="lesson-video">Video bài học</h2>
        <LessonVideo video={cppRecursionVideo} />
      </section>

      <section>
        <h2 id="theory">Lý thuyết</h2>
        <p>
          Đệ quy là kỹ thuật trong đó một hàm gọi lại chính nó để giải một bài toán nhỏ hơn.
          Một hàm đệ quy thường có hai phần quan trọng: điều kiện dừng và bước gọi đệ quy.
        </p>
        <ul>
          <li><strong>Điều kiện dừng:</strong> trường hợp nhỏ nhất có thể trả kết quả ngay.</li>
          <li><strong>Bước đệ quy:</strong> gọi lại hàm với dữ liệu nhỏ hơn, gần điều kiện dừng hơn.</li>
        </ul>
        <p>
          Ví dụ với giai thừa: <code>factorial(4)</code> được tính thành
          <code> 4 * factorial(3)</code>, rồi tiếp tục cho tới <code>factorial(1)</code>.
        </p>
      </section>

      <section>
        <h2 id="visualization">Trực quan hóa</h2>
        <CppRecursionVisualizer />
      </section>

      <section>
        <h2 id="code-example">Ví dụ code</h2>
        <CodeBlock language="cpp">
{`#include <iostream>
using namespace std;

int factorial(int n) {
    if (n <= 1) {
        return 1;
    }

    return n * factorial(n - 1);
}

int main() {
    cout << factorial(4);
    return 0;
}`}
        </CodeBlock>
      </section>

      <section>
        <h2 id="program-output">Kết quả chương trình</h2>
        <CodeBlock language="text">24</CodeBlock>
      </section>

      <section>
        <h2 id="complexity">Độ phức tạp</h2>
        <ComplexitySummary time="O(n)" space="O(n)" />
        <p>
          Hàm gọi từ <code>n</code> xuống <code>1</code>, nên thời gian là <code>O(n)</code>.
          Vì mỗi lời gọi chưa trả về nằm trên call stack, bộ nhớ cũng là <code>O(n)</code>.
        </p>
      </section>

      <section>
        <h2 id="common-mistakes">Lỗi thường gặp</h2>
        <ul>
          <li>Quên điều kiện dừng, khiến hàm gọi mãi và gây tràn stack.</li>
          <li>Gọi đệ quy nhưng không làm bài toán nhỏ hơn, ví dụ gọi lại <code>factorial(n)</code>.</li>
          <li>Nhầm thứ tự trả kết quả: lời gọi nhỏ nhất trả về trước, sau đó các lời gọi lớn hơn mới tiếp tục tính.</li>
        </ul>
      </section>

      <section>
        <h2 id="quiz">Quiz</h2>
        <CppRecursionQuiz />
      </section>

      <section>
        <h2 id="practice">Luyện tập</h2>
        <PracticeList
          items={[
            'Viết hàm đệ quy tính tổng từ 1 đến n.',
            'Viết hàm đệ quy tính Fibonacci cơ bản với n nhỏ.',
            'Sửa factorial để in ra n ở mỗi lần gọi hàm, rồi quan sát thứ tự chạy.',
          ]}
        />
      </section>

      <section>
        <h2 id="summary">Tóm tắt</h2>
        <p>
          Đệ quy giúp chia bài toán thành các bài toán nhỏ hơn. Muốn đệ quy chạy đúng,
          hãy luôn xác định điều kiện dừng và đảm bảo mỗi lần gọi tiến gần hơn tới điều kiện đó.
        </p>
      </section>
    </LessonLayout>
  );
}
