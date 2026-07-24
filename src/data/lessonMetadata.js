export const lessonDifficulties = ['beginner', 'intermediate', 'advanced'];

export const lessonMetadataFields = {
  title: 'Tên bài học, dùng cho heading, SEO và sidebar.',
  description: 'Mô tả ngắn phục vụ SEO, search và course overview.',
  course: 'Course chứa bài học, ví dụ: dsa, python, cpp.',
  topic: 'Nhóm kiến thức trong course, ví dụ: dynamic-programming.',
  difficulty: 'beginner | intermediate | advanced.',
  estimatedTime: 'Thời lượng học dự kiến, tính bằng phút.',
  prerequisites: 'Danh sách kiến thức nên biết trước.',
  tags: 'Danh sách tag để search/filter sau này.',
  order: 'Thứ tự bài học trong section.',
  video: 'Thông tin video tùy chọn: {youtubeId, title}.',
};

export function normalizeLessonMetadata(frontMatter) {
  return {
    title: frontMatter.title,
    description: frontMatter.description,
    course: frontMatter.course,
    topic: frontMatter.topic,
    difficulty: frontMatter.difficulty ?? 'beginner',
    estimatedTime: frontMatter.estimatedTime,
    prerequisites: frontMatter.prerequisites ?? [],
    tags: frontMatter.tags ?? [],
    order: frontMatter.order,
    video: frontMatter.video,
  };
}
