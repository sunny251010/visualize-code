import CodeBlock from '@theme/CodeBlock';
import LessonLayout, {
  CodeTabs,
  ComplexitySummary,
  LessonVideo,
  LearningObjectives,
  PracticeList,
  Prerequisites,
} from '@site/src/components/Lesson';
import {
  PythonFilesQuiz,
  PythonFilesVisualizer,
} from '@site/src/components/PythonFilesLessonTools';
import {useLanguage} from '@site/src/i18n/language';
import {lessonService} from '@site/src/services/lessonService';

const lessonId = 'lesson_python_files';

export default function PythonFilesLesson() {
  const {language} = useLanguage();
  const pageData = lessonService.getLessonPageData({lessonId, language});

  if (!pageData?.translation) {
    return null;
  }

  return (
    <LessonLayout lessonData={pageData}>
      {pageData.sections.map((section) => (
        <LessonSection key={section.id} section={section} />
      ))}
    </LessonLayout>
  );
}

function LessonSection({section}) {
  return (
    <section>
      <h2 id={section.id}>{section.title}</h2>
      <LessonSectionContent section={section} />
    </section>
  );
}

function LessonSectionContent({section}) {
  const {content} = section;

  if (section.type === 'learningObjectives') {
    return <LearningObjectives items={content} />;
  }

  if (section.type === 'prerequisites') {
    return <Prerequisites items={content} />;
  }

  if (section.type === 'lessonVideo') {
    return <LessonVideo video={content} />;
  }

  if (section.type === 'theory') {
    return <TheoryBlocks blocks={content ?? []} />;
  }

  if (section.type === 'visualization') {
    return <PythonFilesVisualizer visualization={content} />;
  }

  if (section.type === 'codeExamples') {
    return <CodeTabs languages={content ?? []} />;
  }

  if (section.type === 'programOutput') {
    return (
      <CodeBlock language={content?.type ?? 'text'}>
        {content?.value ?? ''}
      </CodeBlock>
    );
  }

  if (section.type === 'complexity') {
    return (
      <>
        <ComplexitySummary time={content?.time} space={content?.space} />
        {content?.explanation && <p>{renderInlineCode(content.explanation)}</p>}
      </>
    );
  }

  if (section.type === 'commonMistakes') {
    return <InlineList items={content ?? []} />;
  }

  if (section.type === 'quiz') {
    return <PythonFilesQuiz quiz={content} />;
  }

  if (section.type === 'practice') {
    return <PracticeList items={content ?? []} />;
  }

  if (section.type === 'summary') {
    return <ParagraphList items={content ?? []} />;
  }

  return null;
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

function InlineList({items}) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{renderInlineCode(item)}</li>
      ))}
    </ul>
  );
}

function ParagraphList({items}) {
  return (
    <>
      {items.map((item) => (
        <p key={item}>{renderInlineCode(item)}</p>
      ))}
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
