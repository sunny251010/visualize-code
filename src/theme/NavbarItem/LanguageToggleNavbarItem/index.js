import LanguageToggle from '@site/src/components/LanguageToggle';

export default function LanguageToggleNavbarItem({mobile}) {
  if (mobile) {
    return (
      <li className="menu__list-item">
        <div className="menu__link">
          <LanguageToggle />
        </div>
      </li>
    );
  }

  return (
    <div className="navbar__item">
      <LanguageToggle />
    </div>
  );
}
