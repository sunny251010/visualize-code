import CodeBlock from '@theme/CodeBlock';
import LessonLayout, {
  CodeTabs,
  LearningObjectives,
  Prerequisites,
  LessonVideo,
  ProgramOutputPlaceholder,
  ComplexitySummary,
  PracticeList,
} from '@site/src/components/Lesson';
import {
  FibonacciQuiz,
  FibonacciVisualizer,
} from '@site/src/components/FibonacciLessonTools';
import {useLanguage} from '@site/src/i18n/language';
import {lessonService} from '@site/src/services/lessonService';

const lessonId = 'lesson_dsa_fibonacci_bottom_up';

export default function FibonacciBottomUpLesson() {
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
    return <FibonacciVisualizer />;
  }

  if (section.type === 'codeExamples') {
    return <CodeExamples examples={content ?? []} />;
  }

  if (section.type === 'programOutput') {
    return <ProgramOutput output={content} />;
  }

  if (section.type === 'complexity') {
    return <Complexity content={content} />;
  }

  if (section.type === 'commonMistakes') {
    return <InlineList items={content ?? []} />;
  }

  if (section.type === 'quiz') {
    return <FibonacciQuiz />;
  }

  if (section.type === 'practice') {
    return <PracticeList items={content} />;
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

function CodeExamples({examples}) {
  return <CodeTabs languages={examples} />;
}

function ProgramOutput({output}) {
  return (
    <>
      <ProgramOutputPlaceholder />
      {output?.value && (
        <CodeBlock language={output.type}>
          {output.value}
        </CodeBlock>
      )}
    </>
  );
}

function Complexity({content}) {
  return (
    <>
      <ComplexitySummary
        time={content?.time}
        space={content?.space}
      />
      {content?.explanation && (
        <p>{renderInlineCode(content.explanation)}</p>
      )}
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
