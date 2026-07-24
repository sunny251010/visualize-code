/**
 * Domain type definitions for Visualize Code.
 *
 * This file intentionally uses JSDoc instead of TypeScript so the current
 * Docusaurus JavaScript setup does not need a tooling migration yet.
 */

/**
 * @typedef {'vi' | 'en'} LanguageCode
 */

/**
 * @typedef {'beginner' | 'intermediate' | 'advanced'} LessonDifficulty
 */

/**
 * @typedef {'draft' | 'review' | 'published' | 'archived'} LessonStatus
 */

/**
 * @typedef {'student' | 'instructor' | 'editor' | 'admin'} RoleKey
 */

/**
 * @typedef {Object} AuditFields
 * @property {string=} createdAt
 * @property {string=} updatedAt
 * @property {string=} deletedAt
 * @property {string=} createdBy
 * @property {string=} updatedBy
 */

/**
 * @typedef {Object} Course
 * @property {string} id
 * @property {string} slug
 * @property {string} title
 * @property {string=} description
 * @property {string=} icon
 * @property {number} order
 * @property {boolean=} isPublished
 */

/**
 * @typedef {Object} Section
 * @property {string} id
 * @property {string} courseId
 * @property {string} slug
 * @property {string} title
 * @property {number} order
 * @property {boolean=} isPublished
 */

/**
 * @typedef {Object} Lesson
 * @property {string} id
 * @property {string} slug
 * @property {string} courseId
 * @property {string} sectionId
 * @property {number} order
 * @property {LessonDifficulty} difficulty
 * @property {number=} estimatedTime
 * @property {string[]} tags
 * @property {string} canonicalPath
 * @property {LessonStatus=} status
 * @property {boolean=} isPublished
 */

/**
 * @typedef {'paragraph' | 'heading' | 'list' | 'code' | 'callout' | 'image' | 'video' | 'visualization' | 'quiz' | 'exercise' | 'summary'} ContentBlockType
 */

/**
 * @typedef {Object} ContentBlock
 * @property {string} id
 * @property {ContentBlockType} type
 * @property {number=} order
 * @property {string=} language
 * @property {Record<string, unknown>=} data
 */

/**
 * @typedef {Object} CodeExample
 * @property {string} id
 * @property {string} language
 * @property {string} title
 * @property {string} code
 */

/**
 * @typedef {Object} LessonTranslation
 * @property {string} id
 * @property {string} lessonId
 * @property {LanguageCode} language
 * @property {string} title
 * @property {string=} description
 * @property {string[]} learningObjectives
 * @property {string[]} prerequisites
 * @property {Array<Record<string, unknown>>} theoryBlocks
 * @property {Record<string, unknown>=} visualization
 * @property {CodeExample[]} codeExamples
 * @property {Record<string, unknown>=} programOutput
 * @property {{time?: string, space?: string, explanation?: string}=} complexity
 * @property {string[]} commonMistakes
 * @property {string[]} exercises
 * @property {Record<string, unknown>=} quiz
 * @property {string[]} summary
 */

/**
 * @typedef {Object} UserProfile
 * @property {string} id
 * @property {string=} displayName
 * @property {string=} avatarUrl
 * @property {LanguageCode=} preferredLanguage
 */

/**
 * @typedef {Object} Role
 * @property {string} id
 * @property {RoleKey} key
 * @property {string} name
 * @property {string=} description
 */

/**
 * @typedef {Object} LearningProgress
 * @property {string} id
 * @property {string} userId
 * @property {string} lessonId
 * @property {'started' | 'completed'} status
 * @property {string=} lastHeadingId
 * @property {number=} progressPercent
 * @property {string=} lastOpenedAt
 * @property {string=} completedAt
 */

/**
 * @typedef {Object} Bookmark
 * @property {string} id
 * @property {string} userId
 * @property {string} lessonId
 * @property {string} createdAt
 */

/**
 * @typedef {Object} Note
 * @property {string} id
 * @property {string} userId
 * @property {string} lessonId
 * @property {string} content
 * @property {string} createdAt
 * @property {string} updatedAt
 */

export {};
