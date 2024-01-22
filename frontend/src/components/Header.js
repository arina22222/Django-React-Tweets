import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="app-header">
      <nav className="header-nav">
        <Link to="/">
          <h1>Tweets</h1>
        </Link>
        <div className="right-links">
          <Link to="/about">Let's play</Link>
          <Link to="/aboutme">About Me</Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
