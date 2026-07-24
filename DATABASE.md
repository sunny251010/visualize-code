# Database Architecture

This document describes the planned database foundation for Visualize Code.

The current implementation uses local mock data in `src/data/mockDatabase.js` and service wrappers in `src/services/`. The UI should call services instead of importing data files directly. Later, the service internals can be replaced with Supabase queries without changing lesson components.

Related docs:

- `ARCHITECTURE.md`: high-level architecture and feature boundaries.
- `database/supabase-schema.sql`: current proposed core PostgreSQL schema.
- `database/future-schema.md`: prepare-only tables for auth roles, content workflow, monetization, community, and notifications.

## Current Scope

Implemented with mock data:

- Course: DSA
- Section: Dynamic Programming
- Lesson: Fibonacci Bottom-up
- Lesson translations: Vietnamese and English
- User-related models: prepared as schema/services only

Not implemented yet:

- Real Supabase connection
- Authentication
- Remote persistence
- Real bookmark/note/progress UI

## Entities

### Course

Represents a learning path, such as DSA, Python, or C++.

Primary key: `courses.id`

Important fields:

- `id`
- `slug`
- `title`
- `description`
- `icon`
- `order_index`
- `is_published`

### Section

Represents a group inside a course, such as Dynamic Programming, Graphs, or Trees.

Primary key: `sections.id`

Foreign key:

- `sections.course_id -> courses.id`

### Lesson

Represents a concrete lesson, such as Fibonacci.

Primary key: `lessons.id`

Foreign keys:

- `lessons.course_id -> courses.id`
- `lessons.section_id -> sections.id`

Lesson metadata lives here:

- `slug`
- `order_index`
- `difficulty`
- `estimated_time`
- `tags`
- `canonical_path`

### LessonTranslation

Stores translated lesson content.

Primary key: `lesson_translations.id`

Foreign key:

- `lesson_translations.lesson_id -> lessons.id`

Unique constraint:

- `(lesson_id, language)`

Content fields:

- `title`
- `description`
- `learning_objectives`
- `prerequisites`
- `theory_blocks`
- `visualization`
- `code_examples`
- `program_output`
- `complexity`
- `common_mistakes`
- `exercises`
- `quiz`
- `summary`
- `language`

### UserProfile

Prepared for future login.

Primary key: `user_profiles.id`

This should map to `auth.users.id` when Supabase Auth is enabled.

### LearningProgress

Stores lesson progress per user.

Foreign keys:

- `learning_progress.user_id -> user_profiles.id`
- `learning_progress.lesson_id -> lessons.id`

### Bookmark

Stores saved lessons per user.

Foreign keys:

- `bookmarks.user_id -> user_profiles.id`
- `bookmarks.lesson_id -> lessons.id`

### Note

Stores personal notes per user and lesson.

Foreign keys:

- `notes.user_id -> user_profiles.id`
- `notes.lesson_id -> lessons.id`

## Data Flow

Current local flow:

```text
React component
  -> lessonService / courseService / progressService
  -> local mock data or localStorage
```

Future Supabase flow:

```text
React component
  -> lessonService / courseService / progressService
  -> Supabase client
  -> PostgreSQL tables
```

The component API should stay stable.

## Adding a New Bilingual Lesson

1. Add a `lesson` row to mock data or Supabase.
2. Add one `lesson_translation` row for `vi`.
3. Add one `lesson_translation` row for `en`.
4. Create a thin MDX route with metadata and a lesson component.
5. Render content through `lessonService.getLessonPageData({lessonId, language})`.

The UI should not import a specific lesson data file directly.

## Mock Data Still In Use

- `src/data/mockDatabase.js`
- `src/services/courseService.js`
- `src/services/lessonService.js`
- `progressService`, `bookmarkService`, and `noteService` currently persist to `localStorage`.

## Supabase Migration Path

1. Create the tables using `database/supabase-schema.sql`.
2. Enable Supabase Auth.
3. Connect `user_profiles.id` to `auth.users.id`.
4. Replace service internals with Supabase queries.
5. Add Row Level Security policies.
6. Keep the component-facing service API unchanged.
