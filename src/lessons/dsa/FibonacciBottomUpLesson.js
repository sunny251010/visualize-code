import CodeBlock from '@theme/CodeBlock';
import LessonLayout, {
  LearningObjectives,
  Prerequisites,
  LessonVideo,
  VisualizationPlaceholder,
  ProgramOutputPlaceholder,
  ComplexitySummary,
  QuizPlaceholder,
  PracticeList,
} from '@site/src/components/Lesson';
import {useLanguage} from '@site/src/i18n/language';
import {lessonService} from '@site/src/services/lessonService';

const lessonId = 'lesson_dsa_fibonacci_bottom_up';

export default function FibonacciBottomUpLesson() {
  const {language} = useLanguage();
  const pageData = lessonService.getLessonPageData({lessonId, language});

  if (!pageData?.translation) {
    return null;
  }

  const {translation} = pageData;

  return (
    <LessonLayout lessonData={pageData}>
      <h2 id="learning-objectives">{sectionTitle('learningObjectives', language)}</h2>
      <LearningObjectives items={translation.learningObjectives} />

      <h2 id="prerequisites">{sectionTitle('prerequisites', language)}</h2>
      <Prerequisites items={translation.prerequisites} />

      <h2 id="lesson-video">{sectionTitle('lessonVideo', language)}</h2>
      <LessonVideo />

      <h2 id="theory">{sectionTitle('theory', language)}</h2>
      <TheoryBlocks blocks={translation.theoryBlocks} />

      <h2 id="visualization">{sectionTitle('visualization', language)}</h2>
      <VisualizationPlaceholder title={translation.visualization?.title} />

      <h2 id="code-example">{sectionTitle('codeExample', language)}</h2>
      {translation.codeExamples.map((example) => (
        <div key={example.id}>
          <h3>{example.title}</h3>
          <CodeBlock language={example.language}>{example.code}</CodeBlock>
        </div>
      ))}

      <h2 id="program-output">{sectionTitle('programOutput', language)}</h2>
      <ProgramOutputPlaceholder />
      {translation.programOutput?.value && (
        <CodeBlock language={translation.programOutput.type}>
          {translation.programOutput.value}
        </CodeBlock>
      )}

      <h2 id="complexity">{sectionTitle('complexity', language)}</h2>
      <ComplexitySummary
        time={translation.complexity?.time}
        space={translation.complexity?.space}
      />
      {translation.complexity?.explanation && (
        <p>{renderInlineCode(translation.complexity.explanation)}</p>
      )}

      <h2 id="common-mistakes">{sectionTitle('commonMistakes', language)}</h2>
      <ul>
        {translation.commonMistakes.map((mistake) => (
          <li key={mistake}>{renderInlineCode(mistake)}</li>
        ))}
      </ul>

      <h2 id="quiz">{sectionTitle('quiz', language)}</h2>
      <QuizPlaceholder />

      <h2 id="practice">{sectionTitle('practice', language)}</h2>
      <PracticeList items={translation.exercises} />

      <h2 id="summary">{sectionTitle('summary', language)}</h2>
      {translation.summary.map((paragraph) => (
        <p key={paragraph}>{renderInlineCode(paragraph)}</p>
      ))}
    </LessonLayout>
  );
}

function TheoryBlocks({blocks}) {
  return (
    <>
      {blocks.map((block) => {
        if (block.type === 'paragraph') {
          return <p key={block.id}>{renderInlineCode(block.content)}</p>;
        }

        if (block.type === 'list') {
          return (
            <ul key={block.id}>
              {block.items.map((item) => (
                <li key={item}>{renderInlineCode(item)}</li>
              ))}
            </ul>
          );
        }

        if (block.type === 'code') {
          return (
            <CodeBlock key={block.id} language={block.language}>
              {block.code}
            </CodeBlock>
          );
        }

        return null;
      })}
    </>
  );
}

function renderInlineCode(text) {
  return text.split(/(`[^`]+`)/g).map((part) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={part}>{part.slice(1, -1)}</code>;
    }

    return part;
  });
}

function sectionTitle(sectionId, language) {
  const titles = {
    vi: {
      learningObjectives: 'Mục tiêu học tập',
      prerequisites: 'Kiến thức cần có',
      lessonVideo: 'Video bài học',
      theory: 'Lý thuyết',
      visualization: 'Trực quan hóa',
      codeExample: 'Ví dụ code',
      programOutput: 'Kết quả chương trình',
      complexity: 'Độ phức tạp',
      commonMistakes: 'Lỗi thường gặp',
      quiz: 'Quiz',
      practice: 'Luyện tập',
      summary: 'Tóm tắt',
    },
    en: {
      learningObjectives: 'Learning Objectives',
      prerequisites: 'Prerequisites',
      lessonVideo: 'Lesson Video',
      theory: 'Theory',
      visualization: 'Visualization',
      codeExample: 'Code Example',
      programOutput: 'Program Output',
      complexity: 'Complexity',
      commonMistakes: 'Common Mistakes',
      quiz: 'Quiz',
      practice: 'Practice',
      summary: 'Summary',
    },
  };

  return titles[language]?.[sectionId] ?? titles.vi[sectionId];
}
