// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  courseSidebar: [
    {
      type: 'category',
      label: 'Courses',
      link: {
        type: 'generated-index',
        title: 'Courses',
        description: 'Các lộ trình học lập trình của Visualize Code.',
      },
      items: [
        {
          type: 'category',
          label: 'DSA',
          link: {type: 'doc', id: 'courses/dsa/intro'},
          items: ['courses/dsa/intro'],
        },
        {
          type: 'category',
          label: 'Python',
          link: {type: 'doc', id: 'courses/python/intro'},
          items: ['courses/python/intro'],
        },
        {
          type: 'category',
          label: 'C++',
          link: {type: 'doc', id: 'courses/cpp/intro'},
          items: ['courses/cpp/intro'],
        },
        {
          type: 'category',
          label: 'OOP',
          link: {type: 'doc', id: 'courses/oop/intro'},
          items: ['courses/oop/intro'],
        },
        {
          type: 'category',
          label: 'Algorithms',
          link: {type: 'doc', id: 'courses/algorithms/intro'},
          items: ['courses/algorithms/intro'],
        },
        {
          type: 'category',
          label: 'Data Structures',
          link: {type: 'doc', id: 'courses/data-structures/intro'},
          items: ['courses/data-structures/intro'],
        },
        {
          type: 'category',
          label: 'Interview Prep',
          link: {type: 'doc', id: 'courses/interview-prep/intro'},
          items: ['courses/interview-prep/intro'],
        },
      ],
    },
  ],
};

export default sidebars;
