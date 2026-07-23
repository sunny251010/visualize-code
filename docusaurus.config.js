// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Visualize Code',
  tagline: 'Học lập trình bằng animation trực quan',
  favicon: 'img/favicon.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://sunny251010.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/visualize-code/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'sunny251010', // Usually your GitHub org/user name.
  projectName: 'visualize-code', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'vi',
    locales: ['vi'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl:
            'https://github.com/sunny251010/visualize-code/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/sunny251010/visualize-code/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/logo.svg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Visualize Code',
        logo: {
          alt: 'Visualize Code Logo',
          src: 'img/logo.svg',
        },
        items: [
          {to: '/', label: 'Home', position: 'left'},
          {
            type: 'dropdown',
            label: 'Courses',
            position: 'left',
            items: [
              {label: 'DSA', to: '/docs/courses/dsa/intro'},
              {label: 'Python', to: '/docs/courses/python/intro'},
              {label: 'C++', to: '/docs/courses/cpp/intro'},
              {label: 'OOP', to: '/docs/courses/oop/intro'},
              {label: 'Algorithms', to: '/docs/courses/algorithms/intro'},
              {label: 'Data Structures', to: '/docs/courses/data-structures/intro'},
              {label: 'Interview Prep', to: '/docs/courses/interview-prep/intro'},
            ],
          },
          {to: '/visualizer', label: 'Visualizer', position: 'left'},
          {to: '/quiz', label: 'Quiz', position: 'left'},
          {to: '/blog', label: 'Blog', position: 'left'},
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Courses',
            items: [
              {label: 'DSA', to: '/docs/courses/dsa/intro'},
              {label: 'Python', to: '/docs/courses/python/intro'},
              {label: 'C++', to: '/docs/courses/cpp/intro'},
              {label: 'OOP', to: '/docs/courses/oop/intro'},
            ],
          },
          {
            title: 'Practice',
            items: [
              {label: 'Visualizer', to: '/visualizer'},
              {label: 'Quiz', to: '/quiz'},
            ],
          },
          {
            title: 'More',
            items: [
              {label: 'Blog', to: '/blog'},
              {
                label: 'GitHub',
                href: 'https://github.com/sunny251010/visualize-code',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Visualize Code. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
