export const mockCourses = [
  {
    id: 'course_dsa',
    slug: 'dsa',
    title: 'DSA',
    description: 'Cấu trúc dữ liệu và giải thuật với mô phỏng trực quan.',
    icon: 'DS',
    order: 1,
    isPublished: true,
  },
];

export const mockSections = [
  {
    id: 'section_dsa_dynamic_programming',
    courseId: 'course_dsa',
    slug: 'dynamic-programming',
    title: 'Dynamic Programming',
    order: 2,
    isPublished: true,
  },
];

export const mockLessons = [
  {
    id: 'lesson_dsa_fibonacci_bottom_up',
    slug: 'fibonacci',
    courseId: 'course_dsa',
    sectionId: 'section_dsa_dynamic_programming',
    order: 1,
    difficulty: 'beginner',
    estimatedTime: 25,
    tags: ['dsa', 'dynamic-programming', 'fibonacci', 'bottom-up'],
    canonicalPath: '/courses/dsa/fibonacci',
    isPublished: true,
  },
];

export const mockLessonTranslations = [
  {
    id: 'translation_dsa_fibonacci_bottom_up_vi',
    lessonId: 'lesson_dsa_fibonacci_bottom_up',
    language: 'vi',
    title: 'Fibonacci Bottom-up',
    description: 'Học cách giải bài Fibonacci bằng quy hoạch động bottom-up.',
    learningObjectives: [
      'Hiểu ý tưởng quy hoạch động bottom-up qua bài Fibonacci.',
      'Biết cách xây bảng giá trị từ bài toán nhỏ đến bài toán lớn.',
      'Viết được code Fibonacci bottom-up bằng C++ và Python.',
      'Phân tích được độ phức tạp thời gian và bộ nhớ của lời giải.',
    ],
    prerequisites: [
      'Biết khái niệm biến và vòng lặp.',
      'Hiểu mảng/list ở mức cơ bản.',
      'Biết định nghĩa dãy Fibonacci.',
    ],
    theoryBlocks: [
      {
        id: 'definition',
        type: 'paragraph',
        content: 'Dãy Fibonacci được định nghĩa như sau:',
      },
      {
        id: 'formula',
        type: 'list',
        items: [
          '`F(0) = 0`',
          '`F(1) = 1`',
          '`F(n) = F(n - 1) + F(n - 2)` với `n >= 2`',
        ],
      },
      {
        id: 'bottom-up-idea',
        type: 'paragraph',
        content:
          'Cách bottom-up bắt đầu từ hai giá trị nhỏ nhất, sau đó xây dần các kết quả lớn hơn. Thay vì gọi đệ quy nhiều lần, ta lưu lại kết quả đã tính và dùng chúng để tính bước tiếp theo.',
      },
      {
        id: 'example-intro',
        type: 'paragraph',
        content: 'Với `n = 6`, ta tính lần lượt:',
      },
      {
        id: 'sequence',
        type: 'code',
        language: 'text',
        code: `F(0) = 0
F(1) = 1
F(2) = 1
F(3) = 2
F(4) = 3
F(5) = 5
F(6) = 8`,
      },
      {
        id: 'state-transition',
        type: 'paragraph',
        content:
          'Ý tưởng quan trọng: mỗi trạng thái `F(i)` chỉ phụ thuộc vào hai trạng thái trước đó là `F(i - 1)` và `F(i - 2)`.',
      },
    ],
    visualization: {
      type: 'placeholder',
      title: 'Bảng trạng thái Fibonacci',
    },
    codeExamples: [
      {
        id: 'cpp',
        language: 'cpp',
        title: 'C++',
        code: `#include <iostream>
#include <vector>
using namespace std;

int fibonacci(int n) {
    if (n <= 1) {
        return n;
    }

    vector<int> dp(n + 1);
    dp[0] = 0;
    dp[1] = 1;

    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}

int main() {
    cout << fibonacci(6);
    return 0;
}`,
      },
      {
        id: 'python',
        language: 'python',
        title: 'Python',
        code: `def fibonacci(n):
    if n <= 1:
        return n

    dp = [0] * (n + 1)
    dp[0] = 0
    dp[1] = 1

    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]

    return dp[n]


print(fibonacci(6))`,
      },
    ],
    programOutput: {
      type: 'text',
      value: '8',
    },
    complexity: {
      time: 'O(n)',
      space: 'O(n)',
      explanation:
        'Ta duyệt từ `2` đến `n`, nên thời gian là `O(n)`. Mảng `dp` có `n + 1` phần tử, nên bộ nhớ là `O(n)`.',
    },
    commonMistakes: [
      'Quên xử lý trường hợp `n = 0` hoặc `n = 1`.',
      'Tạo mảng `dp` không đủ kích thước.',
      'Dùng lại công thức đệ quy nhưng không lưu kết quả, khiến thời gian tăng rất nhanh.',
      'Nhầm thứ tự cập nhật khi tối ưu bộ nhớ xuống `O(1)`.',
    ],
    exercises: [
      'Tính `F(10)` bằng bảng bottom-up và ghi lại từng giá trị.',
      'Sửa code để chỉ dùng hai biến thay vì mảng `dp`.',
      'Viết hàm trả về toàn bộ dãy Fibonacci từ `F(0)` đến `F(n)`.',
    ],
    quiz: {
      type: 'placeholder',
      questions: [],
    },
    summary: [
      'Bottom-up là cách giải từ bài toán nhỏ lên bài toán lớn. Với Fibonacci, ta bắt đầu từ `F(0)` và `F(1)`, sau đó tính từng giá trị tiếp theo bằng công thức `F(i) = F(i - 1) + F(i - 2)`.',
      'Cách này tránh việc tính lặp lại như đệ quy thuần và là ví dụ nhập môn tốt cho Quy hoạch động.',
    ],
  },
  {
    id: 'translation_dsa_fibonacci_bottom_up_en',
    lessonId: 'lesson_dsa_fibonacci_bottom_up',
    language: 'en',
    title: 'Fibonacci Bottom-up',
    description: 'Learn how to solve Fibonacci with bottom-up dynamic programming.',
    learningObjectives: [
      'Understand bottom-up dynamic programming through Fibonacci.',
      'Build values from smaller subproblems to larger ones.',
      'Write bottom-up Fibonacci code in C++ and Python.',
      'Analyze the time and space complexity of the solution.',
    ],
    prerequisites: [
      'Know variables and loops.',
      'Understand arrays/lists at a basic level.',
      'Know the definition of the Fibonacci sequence.',
    ],
    theoryBlocks: [
      {
        id: 'definition',
        type: 'paragraph',
        content: 'The Fibonacci sequence is defined as:',
      },
      {
        id: 'formula',
        type: 'list',
        items: [
          '`F(0) = 0`',
          '`F(1) = 1`',
          '`F(n) = F(n - 1) + F(n - 2)` where `n >= 2`',
        ],
      },
      {
        id: 'bottom-up-idea',
        type: 'paragraph',
        content:
          'The bottom-up approach starts from the smallest values, then builds larger results step by step. Instead of calling recursion repeatedly, we store computed results and reuse them for the next state.',
      },
      {
        id: 'example-intro',
        type: 'paragraph',
        content: 'For `n = 6`, we compute:',
      },
      {
        id: 'sequence',
        type: 'code',
        language: 'text',
        code: `F(0) = 0
F(1) = 1
F(2) = 1
F(3) = 2
F(4) = 3
F(5) = 5
F(6) = 8`,
      },
      {
        id: 'state-transition',
        type: 'paragraph',
        content:
          'The key idea: each state `F(i)` depends only on the two previous states, `F(i - 1)` and `F(i - 2)`.',
      },
    ],
    visualization: {
      type: 'placeholder',
      title: 'Fibonacci State Table',
    },
    codeExamples: [
      {
        id: 'cpp',
        language: 'cpp',
        title: 'C++',
        code: `#include <iostream>
#include <vector>
using namespace std;

int fibonacci(int n) {
    if (n <= 1) {
        return n;
    }

    vector<int> dp(n + 1);
    dp[0] = 0;
    dp[1] = 1;

    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}

int main() {
    cout << fibonacci(6);
    return 0;
}`,
      },
      {
        id: 'python',
        language: 'python',
        title: 'Python',
        code: `def fibonacci(n):
    if n <= 1:
        return n

    dp = [0] * (n + 1)
    dp[0] = 0
    dp[1] = 1

    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]

    return dp[n]


print(fibonacci(6))`,
      },
    ],
    programOutput: {
      type: 'text',
      value: '8',
    },
    complexity: {
      time: 'O(n)',
      space: 'O(n)',
      explanation:
        'We iterate from `2` to `n`, so the time complexity is `O(n)`. The `dp` array has `n + 1` elements, so the space complexity is `O(n)`.',
    },
    commonMistakes: [
      'Forgetting to handle `n = 0` or `n = 1`.',
      'Creating a `dp` array that is too small.',
      'Using the recursive formula without memoization, causing the runtime to grow very quickly.',
      'Updating variables in the wrong order when optimizing memory to `O(1)`.',
    ],
    exercises: [
      'Compute `F(10)` with a bottom-up table and write down every value.',
      'Change the code to use only two variables instead of a `dp` array.',
      'Write a function that returns the full Fibonacci sequence from `F(0)` to `F(n)`.',
    ],
    quiz: {
      type: 'placeholder',
      questions: [],
    },
    summary: [
      'Bottom-up solves the problem from small cases to larger cases. For Fibonacci, we start with `F(0)` and `F(1)`, then compute each next value with `F(i) = F(i - 1) + F(i - 2)`.',
      'This avoids repeated work from plain recursion and is a good first example of Dynamic Programming.',
    ],
  },
];

export const mockUserProfiles = [];
export const mockLearningProgress = [];
export const mockBookmarks = [];
export const mockNotes = [];
