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

export const cppRecursionFramesEn = [
  {
    phase: 'call',
    n: 4,
    stack: [4],
    activeLine: 2,
    note: 'Call factorial(4). Because n is not 1 yet, the function calls factorial(3).',
    expression: 'factorial(4)',
  },
  {
    phase: 'call',
    n: 3,
    stack: [4, 3],
    activeLine: 2,
    note: 'factorial(3) calls factorial(2). Each call creates one more frame on the call stack.',
    expression: '4 * factorial(3)',
  },
  {
    phase: 'call',
    n: 2,
    stack: [4, 3, 2],
    activeLine: 2,
    note: 'factorial(2) calls factorial(1). This is the downward phase of recursion.',
    expression: '4 * 3 * factorial(2)',
  },
  {
    phase: 'base',
    n: 1,
    stack: [4, 3, 2, 1],
    activeLine: 1,
    note: 'At factorial(1), the base case is true. The function returns 1 and stops making new calls.',
    expression: 'factorial(1) = 1',
    returnValue: 1,
  },
  {
    phase: 'return',
    n: 2,
    stack: [4, 3, 2],
    activeLine: 3,
    note: 'Return to factorial(2): 2 * factorial(1) = 2 * 1 = 2.',
    expression: 'factorial(2) = 2 * 1 = 2',
    returnValue: 2,
  },
  {
    phase: 'return',
    n: 3,
    stack: [4, 3],
    activeLine: 3,
    note: 'Return to factorial(3): 3 * factorial(2) = 3 * 2 = 6.',
    expression: 'factorial(3) = 3 * 2 = 6',
    returnValue: 6,
  },
  {
    phase: 'return',
    n: 4,
    stack: [4],
    activeLine: 3,
    note: 'Return to factorial(4): 4 * factorial(3) = 4 * 6 = 24.',
    expression: 'factorial(4) = 4 * 6 = 24',
    returnValue: 24,
  },
];

export const cppRecursionCodeLinesEn = [
  'if (n <= 1) return 1;',
  'return n * factorial(n - 1);',
  '// results return back from the smallest call',
];

export const cppRecursionQuizQuestionsEn = [
  {
    id: 'base-case',
    question: 'What is the purpose of a base case in recursion?',
    options: [
      'Stop repeated function calls',
      'Increase the number of function calls',
      'Create an extra global variable',
      'Make the program run in parallel',
    ],
    answerIndex: 0,
    explanation: 'The base case is the stopping condition. Without it, the function may keep calling itself until the stack overflows.',
  },
  {
    id: 'factorial-result',
    question: 'What does factorial(4) return?',
    options: ['4', '10', '16', '24'],
    answerIndex: 3,
    explanation: 'factorial(4) = 4 * 3 * 2 * 1 = 24.',
  },
  {
    id: 'stack',
    question: 'When factorial(4) calls factorial(3), what happens on the call stack?',
    options: [
      'A new frame for factorial(3) is added to the stack',
      'The factorial(4) frame is deleted immediately',
      'The program skips factorial(2)',
      'Nothing changes',
    ],
    answerIndex: 0,
    explanation: 'Each function call that has not returned yet stays on the call stack. factorial(4) waits for factorial(3) to finish.',
  },
  {
    id: 'complexity',
    question: 'For recursive factorial(n), what is the space complexity caused by the call stack?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
    answerIndex: 2,
    explanation: 'There can be up to n pending calls, so the call stack uses O(n) memory.',
  },
];

export function getCppRecursionVisualizerContent(language) {
  if (language === 'en') {
    return {
      title: 'Call stack simulation for factorial(4)',
      frames: cppRecursionFramesEn,
      codeLines: cppRecursionCodeLinesEn,
      description: 'Recursion always needs a base case and a recursive step on a smaller problem.',
      labels: {
        step: 'Step',
        processing: 'processing',
        waiting: 'waiting',
        status: 'Status',
        phase: 'phase',
        reset: 'Reset',
        previous: 'Previous',
        play: 'Play',
        pause: 'Pause',
        next: 'Next',
        phases: {
          call: 'function call',
          base: 'base case',
          return: 'return',
        },
      },
    };
  }

  return {
    title: 'M\u00f4 ph\u1ecfng call stack factorial(4)',
    frames: cppRecursionFrames,
    codeLines: cppRecursionCodeLines,
    description: '\u0110\u1ec7 quy lu\u00f4n c\u1ea7n \u0111i\u1ec1u ki\u1ec7n d\u1eebng v\u00e0 b\u01b0\u1edbc g\u1ecdi l\u1ea1i tr\u00ean b\u00e0i to\u00e1n nh\u1ecf h\u01a1n.',
    labels: {
      step: 'B\u01b0\u1edbc',
      processing: '\u0111ang x\u1eed l\u00fd',
      waiting: '\u0111ang ch\u1edd',
      status: 'Tr\u1ea1ng th\u00e1i',
      phase: 'pha',
      reset: 'Reset',
      previous: 'Tr\u01b0\u1edbc',
      play: 'Ch\u1ea1y',
      pause: 'D\u1eebng',
      next: 'Sau',
      phases: {
        call: 'g\u1ecdi h\u00e0m',
        base: '\u0111i\u1ec1u ki\u1ec7n d\u1eebng',
        return: 'tr\u1ea3 v\u1ec1',
      },
    },
  };
}

export function getCppRecursionQuizContent(language) {
  if (language === 'en') {
    return {
      title: 'Check your Recursion understanding',
      questions: cppRecursionQuizQuestionsEn,
      labels: {
        correct: 'Correct.',
        wrong: 'Not quite.',
        submit: 'Submit',
        retry: 'Try again',
      },
    };
  }

  return {
    title: 'Ki\u1ec3m tra hi\u1ec3u b\u00e0i \u0110\u1ec7 quy',
    questions: cppRecursionQuizQuestions,
    labels: {
      correct: '\u0110\u00fang.',
      wrong: 'Ch\u01b0a \u0111\u00fang.',
      submit: 'N\u1ed9p b\u00e0i',
      retry: 'L\u00e0m l\u1ea1i',
    },
  };
}
