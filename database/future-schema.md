# Future Database Schema Notes

Tai lieu nay ghi lai cac bang nen chuan bi trong thiet ke, nhung chua can
trien khai thanh tinh nang that trong website hien tai.

Muc tieu:

- Giu UI hien tai on dinh.
- Tranh viet logic login, payment, comment, notification qua som.
- Dam bao khi can mo rong sang Supabase/PostgreSQL thi da co huong tach bang ro rang.

## 1. Scope

### Dang dung hien tai

- `courses`
- `sections`
- `lessons`
- `lesson_translations`
- `learning_progress`
- `bookmarks`
- `notes`
- `user_profiles`

### Prepare only

Nhung bang duoi day chi la de xuat schema. Chua tao UI, service logic that,
API call, Supabase connection, hoac migration production.

## 2. Access Control

### roles

Vai tro tong quat cua nguoi dung.

| Column | Type | Note |
| --- | --- | --- |
| id | uuid | Primary key |
| key | text | Unique, vi du `student`, `instructor`, `editor`, `admin` |
| name | text | Ten hien thi |
| description | text | Optional |
| created_at | timestamptz | Audit |
| updated_at | timestamptz | Audit |

### permissions

Quyen chi tiet de sau nay dung cho admin/editor.

| Column | Type | Note |
| --- | --- | --- |
| id | uuid | Primary key |
| key | text | Unique, vi du `lesson:create`, `lesson:publish` |
| description | text | Optional |
| created_at | timestamptz | Audit |

### user_roles

Gan user voi role.

| Column | Type | Note |
| --- | --- | --- |
| id | uuid | Primary key |
| user_id | uuid | Foreign key -> `user_profiles.id` |
| role_id | uuid | Foreign key -> `roles.id` |
| created_at | timestamptz | Audit |

Nen co unique constraint tren `(user_id, role_id)`.

### role_permissions

Gan permission cho role.

| Column | Type | Note |
| --- | --- | --- |
| id | uuid | Primary key |
| role_id | uuid | Foreign key -> `roles.id` |
| permission_id | uuid | Foreign key -> `permissions.id` |
| created_at | timestamptz | Audit |

Nen co unique constraint tren `(role_id, permission_id)`.

## 3. Content Management

### lesson_versions

Luu lich su phien ban noi dung bai hoc.

| Column | Type | Note |
| --- | --- | --- |
| id | uuid | Primary key |
| lesson_id | uuid | Foreign key -> `lessons.id` |
| version_number | integer | Tang dan theo lesson |
| status | text | `draft`, `review`, `published`, `archived` |
| change_summary | text | Optional |
| created_by | uuid | Foreign key -> `user_profiles.id` |
| created_at | timestamptz | Audit |
| published_at | timestamptz | Optional |

### content_blocks

Neu sau nay can editor manh hon, tach noi dung trong `lesson_translations`
thanh block rieng.

| Column | Type | Note |
| --- | --- | --- |
| id | uuid | Primary key |
| lesson_translation_id | uuid | Foreign key -> `lesson_translations.id` |
| type | text | `paragraph`, `heading`, `code`, `callout`, `quiz`, `exercise`, ... |
| order_index | integer | Thu tu hien thi |
| data | jsonb | Noi dung block |
| created_at | timestamptz | Audit |
| updated_at | timestamptz | Audit |

### media_assets

Quan ly anh, video thumbnail, file phu tro.

| Column | Type | Note |
| --- | --- | --- |
| id | uuid | Primary key |
| owner_id | uuid | Foreign key -> `user_profiles.id`, optional |
| url | text | Public URL hoac storage path |
| type | text | `image`, `video`, `file` |
| alt_text | text | Optional |
| metadata | jsonb | Optional |
| created_at | timestamptz | Audit |

### visualizations

Metadata cho animation/visualizer.

| Column | Type | Note |
| --- | --- | --- |
| id | uuid | Primary key |
| lesson_id | uuid | Foreign key -> `lessons.id` |
| key | text | Unique-ish identifier, vi du `fibonacci-bottom-up-table` |
| type | text | `table`, `graph`, `tree`, `array`, `custom` |
| config | jsonb | Du lieu khoi tao |
| created_at | timestamptz | Audit |
| updated_at | timestamptz | Audit |

## 4. Learning Activity

### quiz_attempts

Luu ket qua lam quiz.

| Column | Type | Note |
| --- | --- | --- |
| id | uuid | Primary key |
| user_id | uuid | Foreign key -> `user_profiles.id` |
| lesson_id | uuid | Foreign key -> `lessons.id` |
| score | numeric | Optional |
| answers | jsonb | Cau tra loi |
| started_at | timestamptz | Audit |
| submitted_at | timestamptz | Optional |

### exercise_submissions

Luu bai nop bai tap/code sau nay.

| Column | Type | Note |
| --- | --- | --- |
| id | uuid | Primary key |
| user_id | uuid | Foreign key -> `user_profiles.id` |
| lesson_id | uuid | Foreign key -> `lessons.id` |
| exercise_id | text | Id trong lesson data hoac FK sau nay |
| language | text | `cpp`, `python`, ... |
| source_code | text | Code nguoi hoc nop |
| result | jsonb | Ket qua cham |
| submitted_at | timestamptz | Audit |

### learning_streaks

Thong ke ngay hoc lien tuc.

| Column | Type | Note |
| --- | --- | --- |
| id | uuid | Primary key |
| user_id | uuid | Foreign key -> `user_profiles.id` |
| current_streak | integer | So ngay hien tai |
| longest_streak | integer | Ky luc |
| last_activity_date | date | Ngay hoc gan nhat |
| updated_at | timestamptz | Audit |

## 5. Monetization

Tat ca bang trong phan nay la future only.

### subscription_plans

| Column | Type | Note |
| --- | --- | --- |
| id | uuid | Primary key |
| key | text | Unique, vi du `free`, `pro_monthly` |
| name | text | Ten goi |
| price_cents | integer | Gia theo don vi nho nhat |
| currency | text | Vi du `USD`, `VND` |
| billing_interval | text | `month`, `year`, `lifetime` |
| is_active | boolean | Dang ban hay khong |

### plan_features

| Column | Type | Note |
| --- | --- | --- |
| id | uuid | Primary key |
| plan_id | uuid | Foreign key -> `subscription_plans.id` |
| feature_key | text | Vi du `advanced_visualizer`, `ai_assistant` |
| limit_value | integer | Optional |

### user_subscriptions

| Column | Type | Note |
| --- | --- | --- |
| id | uuid | Primary key |
| user_id | uuid | Foreign key -> `user_profiles.id` |
| plan_id | uuid | Foreign key -> `subscription_plans.id` |
| status | text | `active`, `trialing`, `past_due`, `canceled` |
| started_at | timestamptz | Audit |
| current_period_end | timestamptz | Optional |
| canceled_at | timestamptz | Optional |

### entitlements

| Column | Type | Note |
| --- | --- | --- |
| id | uuid | Primary key |
| user_id | uuid | Foreign key -> `user_profiles.id` |
| feature_key | text | Feature duoc mo khoa |
| source | text | `plan`, `manual`, `promotion` |
| expires_at | timestamptz | Optional |

### payments, invoices, refunds, coupons, subscription_events

Nhung bang nay phu thuoc vao payment provider sau nay. Khi chon Stripe,
PayOS, hoac provider khac thi moi nen khoa schema chi tiet.

## 6. Community And Feedback

### comments

| Column | Type | Note |
| --- | --- | --- |
| id | uuid | Primary key |
| user_id | uuid | Foreign key -> `user_profiles.id` |
| lesson_id | uuid | Foreign key -> `lessons.id` |
| parent_id | uuid | Self foreign key, optional |
| content | text | Noi dung |
| status | text | `visible`, `hidden`, `deleted` |
| created_at | timestamptz | Audit |
| updated_at | timestamptz | Audit |

### reviews

| Column | Type | Note |
| --- | --- | --- |
| id | uuid | Primary key |
| user_id | uuid | Foreign key -> `user_profiles.id` |
| course_id | uuid | Foreign key -> `courses.id`, optional |
| lesson_id | uuid | Foreign key -> `lessons.id`, optional |
| rating | integer | 1-5 |
| content | text | Optional |
| created_at | timestamptz | Audit |

### reports

| Column | Type | Note |
| --- | --- | --- |
| id | uuid | Primary key |
| reporter_id | uuid | Foreign key -> `user_profiles.id` |
| target_type | text | `comment`, `lesson`, `review` |
| target_id | uuid | Id cua object bi report |
| reason | text | Ly do |
| status | text | `open`, `reviewing`, `resolved`, `dismissed` |
| created_at | timestamptz | Audit |

### notifications

| Column | Type | Note |
| --- | --- | --- |
| id | uuid | Primary key |
| user_id | uuid | Foreign key -> `user_profiles.id` |
| type | text | Loai thong bao |
| title | text | Tieu de |
| body | text | Noi dung |
| data | jsonb | Optional |
| read_at | timestamptz | Optional |
| created_at | timestamptz | Audit |

### notification_preferences

| Column | Type | Note |
| --- | --- | --- |
| id | uuid | Primary key |
| user_id | uuid | Foreign key -> `user_profiles.id` |
| channel | text | `in_app`, `email` |
| type | text | Loai thong bao |
| enabled | boolean | Bat/tat |

## 7. Cross-Cutting Fields

Nhung bang quan trong nen co:

- `created_at`
- `updated_at`
- `deleted_at` neu can soft delete
- `created_by`
- `updated_by`
- `status` neu can workflow

## 8. Implementation Rule

Khi bat dau build mot tinh nang moi:

1. Them/chinh schema trong migration rieng.
2. Them mock data neu UI can test truoc.
3. Them hoac cap nhat service tuong ung.
4. Cho component goi service, khong doc truc tiep Supabase/file data.
5. Sau khi on, thay implementation trong service bang Supabase query.

