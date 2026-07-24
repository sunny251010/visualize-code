export const courseGroups = [
  {
    id: 'programming',
    title: 'Programming',
    courseIds: ['python', 'cpp'],
  },
  {
    id: 'computer-science',
    title: 'Computer Science',
    courseIds: ['dsa', 'algorithms', 'data-structures'],
  },
  {
    id: 'career',
    title: 'Career',
    courseIds: ['interview-prep'],
  },
  {
    id: 'projects',
    title: 'Projects',
    courseIds: ['python-projects', 'web-projects'],
  },
];

export const courses = [
  {
    id: 'dsa',
    slug: 'dsa',
    title: 'DSA',
    description: 'Cấu trúc dữ liệu và giải thuật với mô phỏng trực quan.',
    icon: 'DS',
    order: 1,
    featured: true,
    sections: [
      {
        id: 'dsa-intro',
        title: 'Introduction',
        order: 1,
        lessons: [
          {
            id: 'dsa-introduction',
            slug: '',
            title: 'Introduction',
            description: 'Tổng quan lộ trình DSA.',
            order: 1,
          },
        ],
      },
      {
        id: 'dynamic-programming',
        title: 'Dynamic Programming',
        order: 2,
        lessons: [
          {id: 'fibonacci', slug: 'fibonacci', title: 'Fibonacci Bottom-up', description: 'Bài toán nhập môn quy hoạch động.', order: 1},
          {id: 'climbing-stairs', slug: 'climbing-stairs', title: 'Climbing Stairs', description: 'Đếm số cách leo cầu thang.', order: 2},
          {id: 'house-robber', slug: 'house-robber', title: 'House Robber', description: 'Tối ưu lựa chọn không kề nhau.', order: 3},
          {id: 'coin-change', slug: 'coin-change', title: 'Coin Change', description: 'Tối ưu số đồng xu cần dùng.', order: 4},
          {id: 'longest-common-subsequence', slug: 'longest-common-subsequence', title: 'Longest Common Subsequence', description: 'Tìm dãy con chung dài nhất.', order: 5},
          {id: 'knapsack', slug: 'knapsack', title: 'Knapsack', description: 'Bài toán cái túi kinh điển.', order: 6},
        ],
      },
      {
        id: 'graphs',
        title: 'Graphs',
        order: 3,
        lessons: [
          {id: 'bfs', slug: 'bfs', title: 'BFS', description: 'Duyệt đồ thị theo chiều rộng.', order: 1},
          {id: 'dfs', slug: 'dfs', title: 'DFS', description: 'Duyệt đồ thị theo chiều sâu.', order: 2},
          {id: 'dijkstra', slug: 'dijkstra', title: 'Dijkstra', description: 'Đường đi ngắn nhất với trọng số không âm.', order: 3},
        ],
      },
      {
        id: 'trees',
        title: 'Trees',
        order: 4,
        lessons: [
          {id: 'binary-tree', slug: 'binary-tree', title: 'Binary Tree', description: 'Cây nhị phân và các thao tác cơ bản.', order: 1},
          {id: 'bst', slug: 'bst', title: 'BST', description: 'Binary Search Tree.', order: 2},
        ],
      },
      {
        id: 'sorting',
        title: 'Sorting',
        order: 5,
        lessons: [
          {id: 'merge-sort', slug: 'merge-sort', title: 'Merge Sort', description: 'Sắp xếp trộn.', order: 1},
          {id: 'quick-sort', slug: 'quick-sort', title: 'Quick Sort', description: 'Sắp xếp nhanh.', order: 2},
        ],
      },
    ],
  },
  {
    id: 'python',
    slug: 'python',
    title: 'Python',
    description: 'Lộ trình Python cơ bản cho người mới học lập trình.',
    icon: 'PY',
    order: 2,
    featured: true,
    sections: [
      sectionWithLessons('python-intro', 'Introduction', 1, [
        lesson('python-introduction', '', 'Introduction', 'Tổng quan lộ trình Python.', 1),
      ]),
      sectionWithLessons('python-core', 'Python Core', 2, [
        lesson('basic-syntax', 'basic-syntax', 'Basic Syntax', 'Cú pháp Python cơ bản.', 1),
        lesson('variables', 'variables', 'Variables', 'Biến và kiểu dữ liệu.', 2),
        lesson('operators', 'operators', 'Operators', 'Toán tử trong Python.', 3),
        lesson('conditions', 'conditions', 'Conditions', 'Câu lệnh điều kiện.', 4),
        lesson('loops', 'loops', 'Loops', 'Vòng lặp.', 5),
        lesson('functions', 'functions', 'Functions', 'Hàm và cách tái sử dụng code.', 6),
        lesson('lists', 'lists', 'Lists', 'List và thao tác phổ biến.', 7),
        lesson('dictionary', 'dictionary', 'Dictionary', 'Key-value trong Python.', 8),
        lesson('oop', 'oop', 'OOP', 'Lập trình hướng đối tượng trong Python.', 9),
        lesson('files', 'files', 'Files', 'Đọc ghi file.', 10),
        lesson('projects', 'projects', 'Projects', 'Bài tập dự án nhỏ.', 11),
      ]),
    ],
  },
  simpleCourse('cpp', 'C++', 'Lộ trình C++ cơ bản và nền tảng thuật toán.', 'C++', 3, [
    lesson('cpp-introduction', '', 'Introduction', 'Tổng quan lộ trình C++.', 1),
    lesson('cpp-syntax', 'basic-syntax', 'Basic Syntax', 'Cú pháp C++ cơ bản.', 2),
    lesson('cpp-functions', 'functions', 'Functions', 'Hàm trong C++.', 3),
    lesson('cpp-recursion', 'recursion', 'Recursion', 'Đệ quy trong C++ qua call stack.', 4),
    lesson('cpp-oop', 'oop', 'OOP', 'Class và object trong C++.', 5),
  ]),
  simpleCourse('oop', 'OOP', 'Lập trình hướng đối tượng qua ví dụ trực quan.', 'OO', 4, [
    lesson('oop-introduction', '', 'Introduction', 'Tổng quan OOP.', 1),
    lesson('classes-objects', 'classes-objects', 'Classes and Objects', 'Class và object.', 2),
    lesson('inheritance', 'inheritance', 'Inheritance', 'Kế thừa.', 3),
    lesson('polymorphism', 'polymorphism', 'Polymorphism', 'Đa hình.', 4),
  ]),
  simpleCourse('algorithms', 'Algorithms', 'Các pattern thuật toán và phân tích độ phức tạp.', 'AL', 5, [
    lesson('algorithms-introduction', '', 'Introduction', 'Tổng quan Algorithms.', 1),
    lesson('searching', 'searching', 'Searching', 'Các kỹ thuật tìm kiếm.', 2),
    lesson('sorting-overview', 'sorting', 'Sorting', 'Các thuật toán sắp xếp.', 3),
  ]),
  simpleCourse('data-structures', 'Data Structures', 'Cách tổ chức dữ liệu và thao tác hiệu quả.', 'DS', 6, [
    lesson('data-structures-introduction', '', 'Introduction', 'Tổng quan Data Structures.', 1),
    lesson('arrays', 'arrays', 'Arrays', 'Mảng.', 2),
    lesson('linked-list', 'linked-list', 'Linked List', 'Danh sách liên kết.', 3),
    lesson('stack', 'stack', 'Stack', 'Ngăn xếp.', 4),
    lesson('queue', 'queue', 'Queue', 'Hàng đợi.', 5),
  ]),
  simpleCourse('interview-prep', 'Interview Prep', 'Ôn tập pattern và bài tập phỏng vấn kỹ thuật.', 'IP', 7, [
    lesson('interview-prep-introduction', '', 'Introduction', 'Tổng quan ôn tập phỏng vấn.', 1),
    lesson('two-pointers', 'two-pointers', 'Two Pointers', 'Pattern hai con trỏ.', 2),
    lesson('sliding-window', 'sliding-window', 'Sliding Window', 'Pattern cửa sổ trượt.', 3),
  ]),
  {
    id: 'python-projects',
    slug: 'python-projects',
    title: 'Python Projects',
    description: 'Các dự án Python nhỏ để luyện tập.',
    icon: 'PP',
    order: 20,
    featured: false,
    comingSoon: true,
    sections: [],
  },
  {
    id: 'web-projects',
    slug: 'web-projects',
    title: 'Web Projects',
    description: 'Các dự án web thực hành.',
    icon: 'WP',
    order: 21,
    featured: false,
    comingSoon: true,
    sections: [],
  },
];

export function getCourseById(courseId) {
  return courses.find((course) => course.id === courseId);
}

export function getCoursePath(course) {
  return `/courses/${course.slug}`;
}

export function getLessonPath(course, lesson) {
  return lesson.slug ? `/courses/${course.slug}/${lesson.slug}` : getCoursePath(course);
}

export function getDocId(course, lesson) {
  return lesson.slug
    ? `courses/${course.slug}/${lesson.slug}`
    : `courses/${course.slug}/intro`;
}

export function getFeaturedCourses() {
  return courses.filter((course) => course.featured);
}

function lesson(id, slug, title, description, order) {
  return {id, slug, title, description, order};
}

function sectionWithLessons(id, title, order, lessons) {
  return {id, title, order, lessons};
}

function simpleCourse(id, title, description, icon, order, lessons) {
  return {
    id,
    slug: id,
    title,
    description,
    icon,
    order,
    featured: true,
    sections: [sectionWithLessons(`${id}-core`, title, 1, lessons)],
  };
}
