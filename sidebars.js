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
  const introDocId = `courses/${course.slug}/intro`;
  const childItems = [
    {
      type: 'doc',
      id: introDocId,
      label: getCourseSidebarKey(course, 'home'),
    },
    ...course.sections
      .toSorted((a, b) => a.order - b.order)
      .flatMap((section) => buildSectionItems(course, section, introDocId)),
  ];

  return [
    {
      type: 'category',
      label: getCourseSidebarKey(course, 'tutorial'),
      className: 'vc-sidebar-course-root',
      collapsed: false,
      collapsible: false,
      items: childItems,
    },
  ];
}

function buildSectionItems(course, section, introDocId) {
  const lessons = section.lessons
    .toSorted((a, b) => a.order - b.order)
    .filter((lesson) => getDocId(course, lesson) !== introDocId);

  if (lessons.length === 0) {
    return [];
  }

  const items = lessons.map((lesson) => getDocId(course, lesson));
  const shouldFlattenSection = section.title === course.title;

  if (shouldFlattenSection) {
    return items;
  }

  return [
    {
      type: 'category',
      label: section.title,
      collapsed: false,
      collapsible: true,
      items,
    },
  ];
}

function getCourseSidebarKey(course, suffix) {
  return `sidebar.course.${course.id}.${suffix}`;
}

export default sidebars;
