import React, {useEffect, useMemo, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {usePluginData} from '@docusaurus/useGlobalData';
import styles from './styles.module.css';

const COURSE_LABELS = {
  algorithms: 'Algorithms',
  cpp: 'C++',
  dsa: 'DSA',
  'data-structures': 'Data Structures',
  'interview-prep': 'Interview Prep',
  oop: 'OOP',
  python: 'Python',
};

const MAX_RESULTS = 8;

function normalizeText(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function getCurrentCourse(pathname) {
  return pathname.match(/^\/courses\/([^/]+)/)?.[1];
}

function scoreItem(item, terms) {
  const title = normalizeText(item.title);
  const description = normalizeText(item.description);
  const tags = normalizeText((item.tags ?? []).join(' '));
  const body = normalizeText(item.searchText);

  return terms.reduce((score, term) => {
    if (!body.includes(term)) {
      return score;
    }

    let nextScore = score + 1;

    if (title.includes(term)) {
      nextScore += 12;
    }

    if (description.includes(term)) {
      nextScore += 5;
    }

    if (tags.includes(term)) {
      nextScore += 4;
    }

    return nextScore;
  }, 0);
}

function getSnippet(item, terms) {
  const fallback = item.description || item.content || '';
  const normalizedFallback = normalizeText(fallback);
  const firstMatch = terms
    .map((term) => normalizedFallback.indexOf(term))
    .filter((index) => index >= 0)
    .sort((a, b) => a - b)[0];

  if (firstMatch === undefined || firstMatch <= 40) {
    return fallback.slice(0, 170);
  }

  return `...${fallback.slice(firstMatch - 40, firstMatch + 130)}`;
}

function getResultType(item) {
  if (item.section === 'blog') {
    return 'Blog';
  }

  return COURSE_LABELS[item.course] ?? 'Docs';
}

export default function SearchBar() {
  const location = useLocation();
  const searchData = usePluginData('visualize-code-search') ?? {items: []};
  const items = searchData.items ?? [];
  const rootRef = useRef(null);
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [scope, setScope] = useState('all');

  const currentCourse = getCurrentCourse(location.pathname);
  const canUseCourseScope = Boolean(currentCourse);

  useEffect(() => {
    if (!canUseCourseScope) {
      setScope('all');
    }
  }, [canUseCourseScope]);

  useEffect(() => {
    function handlePointerDown(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);

    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  useEffect(() => {
    function handleShortcut(event) {
      const target = event.target;
      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }

      if (!isTyping && event.key === '/') {
        event.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    }

    document.addEventListener('keydown', handleShortcut);

    return () => document.removeEventListener('keydown', handleShortcut);
  }, []);

  const terms = useMemo(
    () => normalizeText(query).split(/\s+/).filter(Boolean),
    [query],
  );

  const results = useMemo(() => {
    const scopedItems =
      scope === 'course' && currentCourse
        ? items.filter(
            (item) =>
              item.course === currentCourse ||
              item.permalink.startsWith(`/courses/${currentCourse}`),
          )
        : items;

    if (terms.length === 0) {
      return scopedItems
        .filter((item) => item.permalink.includes('/courses/'))
        .slice(0, 5);
    }

    return scopedItems
      .map((item) => ({item, score: scoreItem(item, terms)}))
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
      .slice(0, MAX_RESULTS)
      .map((result) => result.item);
  }, [currentCourse, items, scope, terms]);

  function openFirstResult() {
    if (results[0]) {
      window.location.href = results[0].permalink;
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      setIsOpen(false);
      inputRef.current?.blur();
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      openFirstResult();
    }
  }

  return (
    <div className={styles.searchBarRoot} ref={rootRef}>
      <label className={styles.searchBox}>
        <span className={styles.searchIcon} aria-hidden="true" />
        <input
          ref={inputRef}
          value={query}
          className={styles.searchInput}
          type="search"
          placeholder="Tìm bài học..."
          aria-label="Tìm kiếm nội dung"
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        <kbd className={styles.shortcut}>/</kbd>
      </label>

      {isOpen && (
        <div className={styles.panel}>
          {canUseCourseScope && (
            <div className={styles.scopes} aria-label="Phạm vi tìm kiếm">
              <button
                className={scope === 'all' ? styles.scopeActive : styles.scopeButton}
                type="button"
                onClick={() => setScope('all')}>
                Tất cả
              </button>
              <button
                className={scope === 'course' ? styles.scopeActive : styles.scopeButton}
                type="button"
                onClick={() => setScope('course')}>
                Course này
              </button>
            </div>
          )}

          <div className={styles.results} role="listbox">
            {results.length > 0 ? (
              results.map((item) => (
                <Link
                  className={styles.result}
                  key={item.id}
                  to={item.permalink}
                  role="option"
                  onClick={() => setIsOpen(false)}>
                  <span className={styles.resultMeta}>{getResultType(item)}</span>
                  <span className={styles.resultTitle}>{item.title}</span>
                  <span className={styles.resultSnippet}>{getSnippet(item, terms)}</span>
                </Link>
              ))
            ) : (
              <div className={styles.empty}>Không có kết quả phù hợp.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
