export const fibonacciVideo = {
  youtubeId: 't_R396kTxZE',
  title: 'Video minh họa bài Fibonacci Bottom-up',
};

export const fibonacciSteps = [
  {
    index: 0,
    left: null,
    right: null,
    value: 0,
    codeLine: 1,
    note: 'Khởi tạo F(0) = 0.',
  },
  {
    index: 1,
    left: null,
    right: null,
    value: 1,
    codeLine: 2,
    note: 'Khởi tạo F(1) = 1.',
  },
  {
    index: 2,
    left: 0,
    right: 1,
    value: 1,
    codeLine: 5,
    note: 'F(2) = F(1) + F(0) = 1 + 0 = 1.',
  },
  {
    index: 3,
    left: 1,
    right: 2,
    value: 2,
    codeLine: 5,
    note: 'F(3) = F(2) + F(1) = 1 + 1 = 2.',
  },
  {
    index: 4,
    left: 2,
    right: 3,
    value: 3,
    codeLine: 5,
    note: 'F(4) = F(3) + F(2) = 2 + 1 = 3.',
  },
  {
    index: 5,
    left: 3,
    right: 4,
    value: 5,
    codeLine: 5,
    note: 'F(5) = F(4) + F(3) = 3 + 2 = 5.',
  },
  {
    index: 6,
    left: 4,
    right: 5,
    value: 8,
    codeLine: 5,
    note: 'F(6) = F(5) + F(4) = 5 + 3 = 8.',
  },
];

export const fibonacciCodeLines = [
  'dp[0] = 0',
  'dp[1] = 1',
  'for i = 2..n:',
  '    left = dp[i - 2]',
  '    dp[i] = dp[i - 1] + dp[i - 2]',
  'return dp[n]',
];

export const fibonacciQuizQuestions = [
  {
    id: 'base-cases',
    question: 'Trong lời giải Fibonacci bottom-up, hai giá trị nào cần khởi tạo trước?',
    options: [
      'F(0) = 0 và F(1) = 1',
      'F(0) = 1 và F(1) = 1',
      'F(1) = 0 và F(2) = 1',
      'F(2) = 1 và F(3) = 2',
    ],
    answerIndex: 0,
    explanation: 'Bottom-up cần hai trạng thái nhỏ nhất: F(0) và F(1). Các trạng thái sau dùng lại hai giá trị trước đó.',
  },
  {
    id: 'transition',
    question: 'Công thức chuyển trạng thái đúng là gì?',
    options: [
      'F(i) = F(i - 1) + F(i - 2)',
      'F(i) = F(i - 1) * F(i - 2)',
      'F(i) = F(i - 1) + i',
      'F(i) = F(i - 2) - F(i - 1)',
    ],
    answerIndex: 0,
    explanation: 'Mỗi số Fibonacci bằng tổng hai số đứng liền trước nó.',
  },
  {
    id: 'result',
    question: 'Với n = 6, kết quả F(6) là bao nhiêu?',
    options: ['6', '8', '13', '21'],
    answerIndex: 1,
    explanation: 'Dãy từ F(0) đến F(6) là 0, 1, 1, 2, 3, 5, 8.',
  },
  {
    id: 'complexity',
    question: 'Nếu dùng mảng dp từ 0 đến n, độ phức tạp bộ nhớ là gì?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
    answerIndex: 2,
    explanation: 'Mảng dp có n + 1 ô, nên bộ nhớ tăng tuyến tính theo n.',
  },
];
