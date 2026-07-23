# ROADMAP - Visualize Code

## 1. Tầm Nhìn

Visualize Code là website học lập trình bằng tiếng Việt, tập trung vào animation trực quan, ví dụ tương tác và lộ trình học rõ ràng. Người học có thể bắt đầu học ngay mà không bắt buộc đăng nhập.

Mục tiêu dài hạn:

- Giải thích các khái niệm lập trình bằng hình ảnh, chuyển động và mô phỏng từng bước.
- Xây dựng lộ trình học cho DSA, Python, C++, OOP và các chủ đề mở rộng.
- Biến mỗi bài học thành một đơn vị học tập đầy đủ: đọc lý thuyết, xem animation, xem ví dụ, đọc code, làm quiz và làm bài tập.
- Phù hợp với người mới bắt đầu, học sinh/sinh viên và lập trình viên muốn ôn tập nhanh.
- Có kiến trúc đủ mở để sau này thêm Supabase, dashboard cá nhân, lưu tiến độ học và mobile app.

Nguyên tắc sản phẩm:

- Học không cần đăng nhập.
- Đăng nhập chỉ dùng cho tính năng cá nhân hóa: lưu tiến độ, điểm quiz, bookmark, streak, ghi chú.
- Nội dung viết bằng tiếng Việt, thân thiện nhưng chính xác.
- Animation phải giúp người học hiểu bài, không chỉ để trang trí.
- Khi phù hợp, mỗi bài nên có cả code C++ và Python.

## 2. Đối Tượng Người Học

- Người mới học lập trình, cần thấy code "chạy như thế nào".
- Sinh viên học Cấu trúc dữ liệu và Giải thuật.
- Người học Python/C++ cần ví dụ rõ ràng, có so sánh cú pháp.
- Người ôn tập phỏng vấn cần hiểu ý tưởng, độ phức tạp và pattern giải bài.

## 3. Navigation Cấp 1

Navigation chính:

- Home
- Courses
- Visualizer
- Quiz
- Blog

`Courses` là dropdown, tối thiểu gồm:

- DSA
- Python
- C++
- OOP
- Algorithms
- Data Structures
- Interview Prep

Hướng mở rộng sau:

- Roadmaps
- Playground
- Challenges
- Community
- Dashboard cá nhân khi có đăng nhập

## 4. Kiến Trúc Tổng Thể

### 4.1 Frontend hiện tại

Công nghệ nền:

- Docusaurus
- React
- MDX cho bài học và blog
- Static assets trong `static/`
- Custom React components trong `src/components/`

Vai trò:

- Docusaurus quản lý docs, blog, sidebar, routing và build static site.
- React components phụ trách animation, visualizer, quiz widget và các block tương tác.
- MDX cho phép nhúng component React trực tiếp vào bài học.

### 4.2 Kiến trúc nội dung

Đề xuất cấu trúc docs:

```text
docs/
  courses/
    dsa/
      arrays/
      linked-list/
      stack-queue/
      sorting/
      recursion/
      graph/
      dynamic-programming/
    python/
    cpp/
    oop/
  visualizer/
  quiz/
```

Mỗi course nên có:

- Trang giới thiệu course.
- Lộ trình bài học.
- Danh sách bài theo độ khó.
- Sidebar riêng.
- Metadata cho topic, level, prerequisites và estimated time.

### 4.3 Kiến trúc component

Nhóm component chính:

- `LessonLayout`: layout thống nhất cho bài học.
- `ConceptIntro`: khối giới thiệu ngắn.
- `TheoryBlock`: trình bày lý thuyết có cấu trúc.
- `AnimationPlayer`: animation từng bước.
- `CodeTabs`: tab code C++ và Python.
- `ComplexityTable`: bảng độ phức tạp.
- `YoutubeEmbed`: nhúng video.
- `QuizBlock`: quiz trong bài học.
- `ExerciseBlock`: bài tập.
- `HintPanel`: gợi ý lời giải theo từng mức.
- `VisualizerShell`: khung visualizer độc lập.

### 4.4 Animation và visualizer

Hướng tiếp cận:

- Bắt đầu bằng React state và CSS animation cho các mô phỏng đơn giản.
- Dùng SVG/Canvas khi cần điều khiển tọa độ, node/edge, tree hoặc graph.
- Tách logic thuật toán khỏi UI animation để dễ test và tái sử dụng.
- Mỗi animation nên có control cơ bản: play, pause, next step, previous step, reset, speed.

Nhóm visualizer cần có:

- Array operations
- Stack / Queue
- Linked List
- Sorting algorithms
- Binary Search
- Recursion call stack
- Tree traversal
- Graph traversal
- Dynamic Programming table

### 4.5 Quiz

Giai đoạn đầu:

- Quiz không cần đăng nhập.
- Chấm điểm trên client.
- Hiển thị giải thích sau khi trả lời.
- Có thể nhúng quiz vào bài học bằng MDX.

Giai đoạn sau:

- Lưu điểm và tiến độ khi người học đăng nhập.
- Tổng hợp điểm theo course.
- Tạo dashboard cá nhân.

### 4.6 Backend tương lai

Khi cần cá nhân hóa, có thể dùng Supabase:

- Auth: đăng nhập bằng email, Google/GitHub.
- Database: profile, progress, quiz attempts, bookmarks, notes.
- Storage: avatar, tài nguyên bổ sung.
- Edge Functions: chấm bài nâng cao, webhook, API riêng.

Nguyên tắc:

- Static learning content vẫn phải truy cập được khi không đăng nhập.
- Supabase chỉ là lớp bổ sung cho tính năng cá nhân hóa.
- Component frontend phải chạy được cả khi không có user session.

### 4.7 Mobile app tương lai

Hướng mở rộng:

- Giai đoạn đầu ưu tiên responsive web.
- Sau đó có thể dùng React Native / Expo.
- Nội dung bài học nên có schema rõ ràng để tái sử dụng trên mobile.
- Animation logic nên tách khỏi Docusaurus nếu có ý định dùng lại.

## 5. Cấu Trúc Một Bài Học

Mỗi bài học nên có các phần:

1. Giới thiệu
2. Mục tiêu bài học
3. Kiến thức cần có
4. Lý thuyết
5. Animation / mô phỏng trực quan
6. Ví dụ minh họa
7. Code C++
8. Code Python
9. Giải thích code từng bước
10. Độ phức tạp
11. Video YouTube
12. Quiz nhanh
13. Bài tập
14. Gợi ý lời giải
15. Lời giải tham khảo
16. Bài tiếp theo

Template MDX hướng tới:

```mdx
---
title: Binary Search
course: dsa
topic: searching
level: beginner
estimatedTime: 20
prerequisites:
  - Array
---

import AnimationPlayer from '@site/src/components/AnimationPlayer';
import CodeTabs from '@site/src/components/CodeTabs';
import QuizBlock from '@site/src/components/QuizBlock';
import ExerciseBlock from '@site/src/components/ExerciseBlock';

## Giới thiệu

## Lý thuyết

## Animation

<AnimationPlayer algorithm="binary-search" />

## Ví dụ

## Code

<CodeTabs cpp={cppCode} python={pythonCode} />

## Độ phức tạp

## Video

## Quiz

<QuizBlock questions={questions} />

## Bài tập

<ExerciseBlock exercises={exercises} />
```

## 6. Phase Và Task Chi Tiết

### Phase 0 - Thống nhất sản phẩm và roadmap

Trạng thái: đang làm.

Task:

- Tạo `ROADMAP.md`.
- Thống nhất tầm nhìn, navigation, cấu trúc bài học và thứ tự phase.
- Xác định course MVP đầu tiên.
- Chọn 3-5 bài học đầu tiên để làm mẫu.
- Chốt style nội dung tiếng Việt: thân thiện, ngắn gọn, có ví dụ.

Kết quả cần có:

- Roadmap được thống nhất.
- Danh sách việc Phase 1 rõ ràng.

### Phase 1 - Thiết lập nền tảng Docusaurus

Mục tiêu:

- Biến scaffold Docusaurus hiện tại thành nền tảng Visualize Code.

Task:

- Cập nhật brand, title, tagline, favicon/logo.
- Cấu hình navbar cấp 1: Home, Courses, Visualizer, Quiz, Blog.
- Tạo dropdown Courses.
- Dọn nội dung mẫu của Docusaurus nếu không cần.
- Tạo cấu trúc docs cho courses.
- Tạo sidebar cho DSA, Python, C++, OOP.
- Cập nhật homepage thành trang giới thiệu sản phẩm học tập, không phải landing page thuần marketing.
- Tạo theme màu sắc, typography và spacing phù hợp với website học tập.
- Kiểm tra responsive desktop/mobile.

Kết quả cần có:

- Website có nhận diện Visualize Code.
- Navigation đúng mục tiêu.
- Chạy local và build được.

### Phase 2 - Thiết kế content system và lesson template

Mục tiêu:

- Có format bài học thống nhất, dễ viết thêm nhiều bài về sau.

Task:

- Tạo lesson template MDX.
- Định nghĩa metadata cho bài học: course, topic, level, estimatedTime, prerequisites.
- Tạo các component nội dung cơ bản: intro, complexity table, video embed, hint panel.
- Tạo `CodeTabs` cho C++ và Python.
- Tạo style riêng cho lesson page.
- Viết guideline ngắn cho tác giả nội dung.
- Tạo 1 bài học mẫu đầy đủ tất cả phần.

Kết quả cần có:

- Thêm bài học mới nhanh và nhất quán.
- Bài học mẫu có đủ các phần cần thiết.

### Phase 3 - MVP course DSA

Mục tiêu:

- Ra mắt lộ trình DSA có các bài học đầu tiên và animation cơ bản.

Đề xuất bài MVP:

- Array là gì?
- Linear Search
- Binary Search
- Stack
- Queue
- Bubble Sort
- Selection Sort
- Recursion cơ bản

Task:

- Tạo trang tổng quan DSA.
- Tạo sidebar DSA.
- Viết nội dung tiếng Việt cho các bài MVP.
- Mỗi bài có C++ và Python.
- Mỗi bài có độ phức tạp.
- Mỗi bài có quiz ngắn.
- Bài nào phù hợp thì có animation.
- Thêm bài tập và gợi ý lời giải.

Kết quả cần có:

- Người học có thể học một mini-course DSA liền mạch.

### Phase 4 - Animation framework

Mục tiêu:

- Xây dựng Animation Framework dùng chung cho toàn bộ website, có thể tái sử dụng giữa các bài học và các khóa học, đảm bảo thống nhất về màu sắc, phong cách hiển thị và trải nghiệm người dùng.

Task:

- Thiết kế data model cho animation step.
- Tạo `AnimationPlayer` với controls: play, pause, next, previous, reset, speed.
- Tạo renderer cho array.
- Tạo renderer cho pointer/index highlight.
- Hỗ trợ caption giải thích từng step.
- Hỗ trợ input mẫu và input tùy chỉnh nếu khả thi.
- Tách algorithm step generator khỏi UI.
- Viết visualizer đầu tiên: Linear Search hoặc Binary Search.

Kết quả cần có:

- Có thể tạo animation mới bằng cách viết step generator.

### Phase 5 - Visualizer hub

Mục tiêu:

- Tạo khu vực Visualizer độc lập để người học tương tác với thuật toán.

Task:

- Tạo trang `/visualizer`.
- Tạo danh sách visualizer theo nhóm: Array, Sorting, Recursion, Tree, Graph.
- Tạo visualizer chi tiết cho Binary Search.
- Tạo visualizer chi tiết cho Sorting cơ bản.
- Cho người dùng nhập data.
- Hiển thị các step và giải thích.
- Link qua lại giữa visualizer và bài học liên quan.

Kết quả cần có:

- Visualizer là một tính năng riêng, không chỉ nằm trong bài học.

### Phase 6 - Quiz system

Mục tiêu:

- Có quiz dùng chung cho bài học và trang Quiz.

Task:

- Định nghĩa schema câu hỏi: single choice, multiple choice, true/false, code reading.
- Tạo `QuizBlock`.
- Hiển thị feedback và giải thích đáp án.
- Tạo trang `/quiz`.
- Lọc quiz theo course/topic/level.
- Lưu kết quả tạm thời trên client.
- Chuẩn bị schema để sau này lưu vào Supabase.

Kết quả cần có:

- Người học làm quiz nhanh mà không cần đăng nhập.

### Phase 7 - Blog và SEO

Mục tiêu:

- Tăng khả năng tìm thấy nội dung và tạo kênh chia sẻ kiến thức.

Task:

- Dọn blog mẫu.
- Tạo categories/tags cho blog: DSA, Python, C++, OOP, Career.
- Viết 3 bài blog đầu tiên.
- Cấu hình SEO metadata.
- Tạo social preview image nếu cần.
- Thêm sitemap/RSS nếu chưa có.
- Kiểm tra title/description cho các trang quan trọng.

Kết quả cần có:

- Blog sẵn sàng để đăng bài đều đặn.

### Phase 8 - Supabase và tính năng cá nhân hóa

Chỉ làm khi MVP học tập đã ổn định.

Mục tiêu:

- Thêm đăng nhập tùy chọn và lưu tiến độ học tập.

Task:

- Tạo Supabase project.
- Thiết kế database schema: profiles, lesson_progress, quiz_attempts, bookmarks, notes.
- Thêm auth provider.
- Tạo dashboard cá nhân.
- Lưu bài đã học.
- Lưu điểm quiz.
- Lưu bookmark và ghi chú.
- Thêm RLS policies.
- Đảm bảo người không đăng nhập vẫn học được.

Kết quả cần có:

- Đăng nhập là tính năng cộng thêm, không chặn việc học.

### Phase 9 - Mở rộng course

Mục tiêu:

- Tăng độ dày nội dung sau khi format đã ổn định.

Course ưu tiên:

- Python cơ bản
- C++ cơ bản
- OOP
- Data Structures nâng cao
- Algorithms nâng cao
- Interview patterns

Task:

- Lập danh sách bài cho từng course.
- Viết nội dung theo template.
- Thêm animation nếu phù hợp.
- Thêm quiz và bài tập.
- Liên kết prerequisites giữa các course.

Kết quả cần có:

- Visualize Code trở thành thư viện học lập trình có lộ trình rõ ràng.

### Phase 10 - Mobile app

Chỉ làm sau khi web và content system đã trưởng thành.

Mục tiêu:

- Đưa trải nghiệm học và visualizer lên mobile.

Task:

- Đánh giá khả năng tái sử dụng content.
- Chọn React Native / Expo.
- Tách package chung nếu cần: lesson schema, quiz schema, animation logic.
- Tạo mobile MVP: course list, lesson reader, quiz, progress.
- Đồng bộ Supabase.

Kết quả cần có:

- Mobile app dùng chung nội dung và hệ thống tiến độ với web.

## 7. Thứ Tự Ưu Tiên MVP

Ưu tiên cao:

- Navigation đúng.
- Lesson template.
- Bài học mẫu đầy đủ.
- DSA mini-course.
- Animation Binary Search hoặc Linear Search.
- Quiz trong bài học.

Ưu tiên trung bình:

- Visualizer hub.
- Blog SEO.
- Multiple courses.
- Input tùy chỉnh cho visualizer.

Ưu tiên sau:

- Đăng nhập.
- Dashboard.
- Supabase.
- Mobile app.
- Leaderboard/community.

## 8. Đề Xuất MVP Đầu Tiên

MVP nên gồm:

- Home giải thích ngắn gọn Visualize Code là gì.
- Courses dropdown hoạt động.
- Course DSA có sidebar.
- 5 bài học DSA đầu tiên:
  - Array là gì?
  - Linear Search
  - Binary Search
  - Stack
  - Queue
- 1 animation thật sự tốt cho Binary Search.
- Quiz ngắn trong mỗi bài.
- Trang Visualizer có ít nhất 1 visualizer.
- Blog được dọn dẹp, có 1 bài mở đầu.

Lý do:

- DSA là chủ đề cần trực quan hóa nhất.
- Binary Search dễ tạo animation rõ ràng và có giá trị học tập cao.
- 5 bài đầu đủ nhỏ để hoàn thành nhanh nhưng đủ lớn để kiểm tra kiến trúc.

## 9. Rủi Ro Và Cách Giảm Thiểu

Rủi ro:

- Quá tập trung vào UI trước khi có nội dung học thật.
- Animation đẹp nhưng khó tái sử dụng.
- Bài học mới viết theo format khác nhau.
- Đăng nhập/Supabase làm phức tạp MVP quá sớm.
- Visualizer logic bị trộn chặt với UI, khó mở rộng.

Cách giảm thiểu:

- Làm 1 bài học mẫu thật đầy đủ trước.
- Tạo animation framework nhỏ, có step model rõ ràng.
- Chưa thêm auth cho đến khi nội dung và quiz ổn định.
- Tách algorithm step generator khỏi component hiển thị.
- Mỗi phase đều có kết quả kiểm tra được.

## 10. Checklist Trước Khi Bắt Đầu Phase 1

- [ ] Thống nhất navigation cấp 1.
- [ ] Thống nhất dropdown Courses.
- [ ] Chọn course MVP đầu tiên.
- [ ] Chọn danh sách bài học mẫu.
- [ ] Chọn animation đầu tiên.
- [ ] Chốt có xóa nội dung mẫu Docusaurus hay giữ tạm.
- [ ] Chốt tone nội dung tiếng Việt.
- [ ] Chốt mức độ ưu tiên của Blog trong MVP.

## 11. Quyết Định Cần Thống Nhất Với Chủ Dự Án

Cần xác nhận:

- Course MVP đầu tiên có phải DSA không?
- Bài animation đầu tiên nên là Binary Search hay Linear Search?
- Có cần giao diện dark mode/light mode ngay Phase 1 không?
- Blog có nằm trong MVP đầu tiên hay chỉ cấu hình sẵn?
- Có muốn giữ website hoàn toàn static trong vài phase đầu không?
- Video YouTube sẽ dùng video từ kênh riêng hay nhúng video tham khảo trước?

## 12. Định Nghĩa Hoàn Thành Cho Từng Phase

Mỗi phase chỉ xem là xong khi:

- Chạy local không lỗi.
- Build production không lỗi.
- Navigation liên quan hoạt động.
- Trang mới responsive.
- Nội dung tiếng Việt đọc tự nhiên.
- Component mới có state rỗng/loading/error nếu cần.
- Không làm hỏng việc học không đăng nhập.

## 13. Hướng Làm Việc Đề Xuất

Sau khi thống nhất roadmap:

1. Bắt đầu Phase 1.
2. Mỗi phase tạo danh sách task nhỏ.
3. Làm từng task, kiểm tra local.
4. Review kết quả với chủ dự án.
5. Chốt rồi mới sang phase tiếp theo.

Nguyên tắc: không mở rộng Supabase, mobile app hoặc dashboard trước khi trải nghiệm học cốt lõi đã tốt.
