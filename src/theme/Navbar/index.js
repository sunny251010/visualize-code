import React from 'react';
import Navbar from '@theme-original/Navbar';
import CourseLearningNav from '@site/src/components/CourseLearningNav';

export default function NavbarWrapper(props) {
  return (
    <>
      <Navbar {...props} />
      <CourseLearningNav />
    </>
  );
}
