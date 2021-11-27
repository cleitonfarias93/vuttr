import React from 'react';

// Styles
import './Header.scss';

interface Props {
  title: string;
  subTitle?: string;
}

const Header: React.FC<Props> = ({ title, subTitle }) => (
  <header className="header-component">
    <h1 className="header-component__title">{title}</h1>
    {subTitle && <h2 className="header-component__sub-title">{subTitle}</h2>}
  </header>
);

Header.defaultProps = {
  subTitle: '',
};

export default Header;
