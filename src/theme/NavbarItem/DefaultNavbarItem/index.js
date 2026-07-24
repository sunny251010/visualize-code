import React from 'react';
import DefaultNavbarItemOriginal from '@theme-original/NavbarItem/DefaultNavbarItem';
import {useTranslation} from '@site/src/i18n/language';

const labelKeys = {
  Home: 'nav.home',
  Courses: 'nav.courses',
  Visualizer: 'nav.visualizer',
  Quiz: 'nav.quiz',
  Blog: 'nav.blog',
};

export default function DefaultNavbarItem(props) {
  const t = useTranslation();
  const translatedLabel = labelKeys[props.label]
    ? t(labelKeys[props.label])
    : props.label;

  return <DefaultNavbarItemOriginal {...props} label={translatedLabel} />;
}
