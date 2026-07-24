// @ts-check

import {courses, getDocId} from './src/data/courseNavigation.js';

/**
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = Object.fromEntries(
  courses
    .filter((course) => !course.comingSoon)
    .map((course) => [
      `${course.id}Sidebar`,
      buildCourseSidebar(course),
    ]),
);

function buildCourseSidebar(course) {
  return [
    {
      type: 'category',
      label: course.title,
      link: {
        type: 'doc',
        id: `courses/${course.slug}/intro`,
      },
      collapsed: false,
      collapsible: false,
      items: course.sections
        .toSorted((a, b) => a.order - b.order)
        .map((section) => {
          const items = section.lessons
            .toSorted((a, b) => a.order - b.order)
            .map((lesson) => getDocId(course, lesson));

          if (section.lessons.length === 1 && section.lessons[0].slug === '') {
            return {
              type: 'doc',
              id: items[0],
              label: section.lessons[0].title,
            };
          }

          return {
            type: 'category',
            label: section.title,
            collapsed: true,
            collapsible: true,
            items,
          };
        }),
    },
  ];
}

export default sidebars;
