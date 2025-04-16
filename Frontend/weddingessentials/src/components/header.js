import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="navbar">
      <div className="logo">💍 WeddingEssentials</div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/invitations">Invitations</Link>
        <Link to="/cakes">Cakes</Link>
        <Link to="/favors">Favors</Link>
      </nav>
    </header>
  );
};

export default Header;
