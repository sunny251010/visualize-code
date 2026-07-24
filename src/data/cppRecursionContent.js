export const cppRecursionVideo = {
  youtubeId: 't_R396kTxZE',
  title: 'Video minh họa bài Đệ quy trong C++',
};

export const cppRecursionFrames = [
  {
    phase: 'call',
    n: 4,
    stack: [4],
    activeLine: 2,
    note: 'Gọi factorial(4). Vì n chưa bằng 1 nên hàm tiếp tục gọi factorial(3).',
    expression: 'factorial(4)',
  },
  {
    phase: 'call',
    n: 3,
    stack: [4, 3],
    activeLine: 2,
    note: 'factorial(3) lại gọi factorial(2). Mỗi lần gọi tạo thêm một frame trên call stack.',
    expression: '4 * factorial(3)',
  },
  {
    phase: 'call',
    n: 2,
    stack: [4, 3, 2],
    activeLine: 2,
    note: 'factorial(2) gọi factorial(1). Đây là bước đi xuống của đệ quy.',
    expression: '4 * 3 * factorial(2)',
  },
  {
    phase: 'base',
    n: 1,
    stack: [4, 3, 2, 1],
    activeLine: 1,
    note: 'Đến factorial(1), điều kiện dừng đúng. Hàm trả về 1 và không gọi tiếp nữa.',
    expression: 'factorial(1) = 1',
    returnValue: 1,
  },
  {
    phase: 'return',
    n: 2,
    stack: [4, 3, 2],
    activeLine: 3,
    note: 'Quay lại factorial(2): 2 * factorial(1) = 2 * 1 = 2.',
    expression: 'factorial(2) = 2 * 1 = 2',
    returnValue: 2,
  },
  {
    phase: 'return',
    n: 3,
    stack: [4, 3],
    activeLine: 3,
    note: 'Quay lại factorial(3): 3 * factorial(2) = 3 * 2 = 6.',
    expression: 'factorial(3) = 3 * 2 = 6',
    returnValue: 6,
  },
  {
    phase: 'return',
    n: 4,
    stack: [4],
    activeLine: 3,
    note: 'Quay lại factorial(4): 4 * factorial(3) = 4 * 6 = 24.',
    expression: 'factorial(4) = 4 * 6 = 24',
    returnValue: 24,
  },
];

export const cppRecursionCodeLines = [
  'if (n <= 1) return 1;',
  'return n * factorial(n - 1);',
  '// kết quả được trả ngược từ lời gọi nhỏ nhất',
];

export const cppRecursionQuizQuestions = [
  {
    id: 'base-case',
    question: 'Trong đệ quy, base case dùng để làm gì?',
    options: [
      'Dừng việc gọi hàm lặp lại',
      'Tăng số lần gọi hàm',
      'Tạo thêm biến toàn cục',
      'Làm chương trình chạy song song',
    ],
    answerIndex: 0,
    explanation: 'Base case là điều kiện dừng. Nếu thiếu base case, hàm có thể gọi chính nó mãi cho tới khi tràn stack.',
  },
  {
    id: 'factorial-result',
    question: 'factorial(4) trả về kết quả nào?',
    options: ['4', '10', '16', '24'],
    answerIndex: 3,
    explanation: 'factorial(4) = 4 * 3 * 2 * 1 = 24.',
  },
  {
    id: 'stack',
    question: 'Khi factorial(4) gọi factorial(3), điều gì xảy ra trên call stack?',
    options: [
      'Một frame mới cho factorial(3) được thêm vào stack',
      'Frame factorial(4) bị xóa ngay lập tức',
      'Chương trình bỏ qua factorial(2)',
      'Không có thay đổi nào',
    ],
    answerIndex: 0,
    explanation: 'Mỗi lời gọi hàm chưa trả về sẽ nằm trên call stack. factorial(4) chờ factorial(3) tính xong.',
  },
  {
    id: 'complexity',
    question: 'Với factorial(n) đệ quy, độ phức tạp bộ nhớ do call stack là gì?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
    answerIndex: 2,
    explanation: 'Có tối đa n lời gọi đang chờ trả về, nên call stack dùng O(n) bộ nhớ.',
  },
];
