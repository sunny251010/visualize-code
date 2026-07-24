export function translateSidebarLabel(label, t) {
  if (typeof label === 'string' && label.startsWith('sidebar.')) {
    return t(label, label);
  }

  return t(`sidebar.${label}`, label);
}
