# ARCHITECTURE - Visualize Code

## 1. Mục Tiêu Kiến Trúc

Visualize Code cần phát triển từ một website học lập trình tĩnh thành một nền tảng học tập có thể mở rộng, nhưng không được triển khai quá nhiều tính năng thật trước khi trải nghiệm học cốt lõi ổn định.

Nguyên tắc:

- UI không đọc trực tiếp database hoặc file data cụ thể.
- UI gọi qua service layer: `courseService`, `lessonService`, `progressService`, `bookmarkService`, `noteService`.
- Dữ liệu bài học tách khỏi component giao diện.
- Nội dung song ngữ tách theo `lessonId` và `language`.
- Schema thiết kế để sau này chuyển sang Supabase mà không phải viết lại UI.
- Chỉ triển khai thật phần cần cho bài học mẫu và lesson system.

## 2. Phân Tầng Ưu Tiên

### Core now

Những phần cần làm ngay hoặc đang được dùng bởi Fibonacci mẫu:

- Course
- Section
- Lesson
- LessonTranslation
- Lesson metadata
- Lesson content blocks dạng local/mock data
- i18n UI cơ bản
- SEO metadata cơ bản
- Service layer
- Progress mock/localStorage
- Bookmark mock/localStorage
- Note mock/localStorage

### Prepare only

Chỉ thiết kế schema/type/interface, chưa xây UI hoặc business logic thật:

- UserProfile
- Role
- UserRole
- Permission
- RolePermission
- LessonStatus
- LessonVersion
- ContentBlock table riêng
- MediaAsset
- Visualization
- QuizAttempt
- ExerciseSubmission
- LearningStreak
- AuditLog
- Soft delete fields
- Created/updated ownership fields

### Future

Chỉ ghi nhận trong kiến trúc/roadmap, chưa tạo tính năng thật:

- Real Supabase Auth
- Admin dashboard
- Content review workflow
- Subscription plans
- Entitlements
- Payments
- Invoices
- Refunds
- Coupons
- Subscription events
- Comments
- Reviews
- Reports
- Notifications
- Email delivery
- Advanced analytics
- AI assistant
- Certificates

## 3. Domain Modules

### Learning Content

Các object chính:

- `Course`: khóa học như DSA, Python, C++.
- `Section`: nhóm bài trong course như Dynamic Programming, Graphs, Trees.
- `Lesson`: bài học cụ thể như Fibonacci.
- `LessonTranslation`: bản dịch nội dung theo ngôn ngữ.
- `ContentBlock`: block nội dung có cấu trúc, hiện đang nằm trong JSON/mock data.

Hiện tại, `lesson_translations` có thể chứa các mảng JSON như:

- `learning_objectives`
- `prerequisites`
- `theory_blocks`
- `code_examples`
- `common_mistakes`
- `exercises`
- `summary`

Sau này, nếu cần editor/admin mạnh hơn, có thể tách thành bảng `content_blocks`.

### User And Access

Chuẩn bị cho tương lai:

- `UserProfile`: hồ sơ người dùng.
- `Role`: vai trò như student, instructor, editor, admin.
- `UserRole`: gán role cho user.
- `Permission`: quyền chi tiết như `lesson:create`, `lesson:publish`.
- `RolePermission`: gán permission cho role.

Chưa xây đăng nhập thật trong giai đoạn này.

### Learning State

Đang dùng mock/localStorage:

- `LearningProgress`: bài đang học, heading gần nhất, trạng thái.
- `Bookmark`: bài đã lưu.
- `Note`: ghi chú cá nhân.

Chuẩn bị sau:

- `LessonCompletion`: có thể tách riêng nếu cần analytics chi tiết.
- `LearningStreak`: chuỗi ngày học liên tục.
- `QuizAttempt`: lịch sử làm quiz.
- `ExerciseSubmission`: bài nộp của người học.

### Monetization

Chỉ để tương lai:

- SubscriptionPlan
- UserSubscription
- Entitlement
- PlanFeature
- Payment
- Invoice
- Refund
- Coupon
- SubscriptionEvent

Không triển khai UI, API hoặc provider thanh toán ở giai đoạn hiện tại.

### Community And Feedback

Chỉ để tương lai:

- Comment
- Review
- Report
- Notification
- NotificationPreference

## 4. Data Flow Chuẩn

Hiện tại:

```text
React component
  -> service layer
  -> mockDatabase/localStorage
```

Tương lai:

```text
React component
  -> service layer
  -> Supabase client
  -> PostgreSQL tables
```

Điểm quan trọng: component không cần biết dữ liệu đến từ mock file hay Supabase.

## 5. Lesson I18n Strategy

Mỗi lesson có một `lessonId` ổn định.

Ví dụ:

```text
lesson_dsa_fibonacci_bottom_up
```

Mỗi ngôn ngữ có một bản ghi translation riêng:

```text
translation_dsa_fibonacci_bottom_up_vi
translation_dsa_fibonacci_bottom_up_en
```

Quy tắc dịch:

- Thuật ngữ có bản dịch phổ biến thì dịch: Dynamic Programming -> Quy hoạch động.
- Tên riêng giữ nguyên: Fibonacci, Dijkstra, Bellman-Ford.
- Code giữ nguyên.
- Slug nên ổn định và không đổi theo ngôn ngữ ở giai đoạn hiện tại để tránh phức tạp SEO/routing.

## 6. SEO Strategy

Core fields nên có:

- `slug`
- `title`
- `description`
- `canonical_path`
- `tags`
- `is_published`
- `created_at`
- `updated_at`

Prepare only:

- `seo_title`
- `seo_description`
- `canonical_url`
- `thumbnail_asset_id`
- `published_at`
- `updated_by`

Khi làm multi-locale SEO thật, cần quyết định giữa:

- Một URL dùng client-side language switch.
- Hai URL riêng theo locale, ví dụ `/vi/courses/...` và `/en/courses/...`.

Hiện tại ưu tiên client-side switch để giữ trải nghiệm nhanh và không reload.

## 7. Không Làm Ngay

Không triển khai ở bước kiến trúc này:

- Supabase connection thật.
- Auth thật.
- Admin dashboard.
- Payment provider.
- Comment system.
- Notification system.
- Quiz engine.
- Code runner.
- Visualizer engine.

Những phần này chỉ được ghi nhận bằng schema/type/tài liệu để không quên.
