const fs = require('fs/promises');
const path = require('path');
const {
  createExcerpt,
  parseFileContentFrontMatter,
  parseMarkdownContentTitle,
} = require('@docusaurus/utils/lib/markdownUtils');

const CONTENT_EXTENSIONS = new Set(['.md', '.mdx', '.js', '.jsx']);
const MARKDOWN_EXTENSIONS = new Set(['.md', '.mdx']);

const DATA_FILE_PERMALINKS = new Map([
  ['cppRecursionContent.js', '/courses/cpp/recursion'],
  ['fibonacciContent.js', '/courses/dsa/fibonacci'],
  ['pythonFilesContent.js', '/courses/python/files'],
]);

async function walkFiles(rootDir) {
  const entries = await fs.readdir(rootDir, {withFileTypes: true});
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(rootDir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walkFiles(fullPath)));
    } else if (CONTENT_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function stripMarkdown(content) {
  return content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/import\s+.+?;?\n/g, ' ')
    .replace(/export\s+.+?;?\n/g, ' ')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[`*_>#|~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractJsStrings(content) {
  const strings = [];
  const pattern = /(['"`])((?:\\.|(?!\1)[\s\S])*)\1/g;
  let match;

  while ((match = pattern.exec(content))) {
    const value = match[2]
      .replace(/\\n/g, ' ')
      .replace(/\\'/g, "'")
      .replace(/\\"/g, '"')
      .replace(/\\`/g, '`')
      .trim();

    if (value.length >= 3 && !value.startsWith('@site/')) {
      strings.push(value);
    }
  }

  return strings.join(' ');
}

function getCourseFromPermalink(permalink) {
  const match = permalink.match(/^\/courses\/([^/]+)/);
  return match?.[1];
}

function getTopicFromFilePath(filePath) {
  const filename = path.basename(filePath, path.extname(filePath));
  return filename === 'intro' ? undefined : filename;
}

function getMarkdownPermalink({filePath, rootDir, section, frontMatter}) {
  if (typeof frontMatter.slug === 'string') {
    return frontMatter.slug.startsWith('/')
      ? frontMatter.slug
      : `/${section}/${frontMatter.slug}`.replace(/\/+/g, '/');
  }

  const relativePath = path.relative(rootDir, filePath).replace(/\\/g, '/');
  const withoutExtension = relativePath.replace(/\.(md|mdx)$/i, '');
  const route = withoutExtension.replace(/(^|\/)intro$/, '$1').replace(/\/$/, '');

  if (section === 'docs') {
    return `/${route}`;
  }

  return `/${section}/${route}`;
}

function makeSearchText(parts) {
  return parts
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function readMarkdownItem({filePath, rootDir, section}) {
  const raw = await fs.readFile(filePath, 'utf8');
  const {frontMatter, content} = parseFileContentFrontMatter(raw);
  const {contentTitle} = parseMarkdownContentTitle(content);
  const permalink = getMarkdownPermalink({filePath, rootDir, section, frontMatter});
  const title =
    frontMatter.title ||
    frontMatter.sidebar_label ||
    contentTitle ||
    path.basename(filePath, path.extname(filePath));
  const cleanedContent = stripMarkdown(content);
  const description = frontMatter.description || createExcerpt(content) || '';
  const tags = Array.isArray(frontMatter.tags) ? frontMatter.tags : [];
  const course = frontMatter.course || getCourseFromPermalink(permalink);

  return {
    id: `${section}:${path.relative(rootDir, filePath).replace(/\\/g, '/')}`,
    title,
    description,
    permalink,
    section: section === 'docs' ? 'docs' : 'blog',
    course,
    topic: frontMatter.topic || getTopicFromFilePath(filePath),
    tags,
    content: cleanedContent,
    searchText: makeSearchText([
      title,
      description,
      course,
      frontMatter.topic,
      tags.join(' '),
      cleanedContent,
    ]),
  };
}

async function readDataFileItem({filePath}) {
  const raw = await fs.readFile(filePath, 'utf8');
  const filename = path.basename(filePath);

  if (!DATA_FILE_PERMALINKS.has(filename) && !filename.endsWith('Content.js')) {
    return undefined;
  }

  const canonicalPath =
    raw.match(/canonicalPath:\s*['"`]([^'"`]+)['"`]/)?.[1] ||
    DATA_FILE_PERMALINKS.get(filename);

  if (!canonicalPath) {
    return undefined;
  }

  return {
    permalink: canonicalPath,
    content: stripMarkdown(extractJsStrings(raw)),
  };
}

function mergeDataItems(markdownItems, dataItems) {
  const itemByPermalink = new Map(markdownItems.map((item) => [item.permalink, item]));

  for (const dataItem of dataItems.filter(Boolean)) {
    const target = itemByPermalink.get(dataItem.permalink);

    if (!target) {
      continue;
    }

    target.content = makeSearchText([target.content, dataItem.content]);
    target.searchText = makeSearchText([target.searchText, dataItem.content]);
  }

  return markdownItems;
}

module.exports = function localSearchPlugin(context) {
  const docsDir = path.join(context.siteDir, 'docs');
  const blogDir = path.join(context.siteDir, 'blog');
  const dataDir = path.join(context.siteDir, 'src', 'data');

  return {
    name: 'visualize-code-search',

    getPathsToWatch() {
      return [docsDir, blogDir, dataDir];
    },

    async loadContent() {
      const [docFiles, blogFiles, dataFiles] = await Promise.all([
        walkFiles(docsDir),
        walkFiles(blogDir),
        walkFiles(dataDir),
      ]);

      const markdownInputs = [
        ...docFiles
          .filter((filePath) => MARKDOWN_EXTENSIONS.has(path.extname(filePath)))
          .map((filePath) => ({filePath, rootDir: docsDir, section: 'docs'})),
        ...blogFiles
          .filter((filePath) => MARKDOWN_EXTENSIONS.has(path.extname(filePath)))
          .map((filePath) => ({filePath, rootDir: blogDir, section: 'blog'})),
      ];

      const [markdownItems, dataItems] = await Promise.all([
        Promise.all(markdownInputs.map(readMarkdownItem)),
        Promise.all(dataFiles.map((filePath) => readDataFileItem({filePath}))),
      ]);

      const items = mergeDataItems(markdownItems, dataItems).sort((a, b) =>
        a.title.localeCompare(b.title),
      );

      return {
        items,
        generatedAt: new Date().toISOString(),
      };
    },

    contentLoaded({content, actions}) {
      actions.setGlobalData(content);
    },
  };
};
