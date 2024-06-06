import React from 'react'
import Logo from './Logo';
import Search from './Search';

export default function Navbar({ children, query, setQuery, handleClose }) {
    return (
      <nav className="nav-bar">
        <Logo />
        <Search query={query} setQuery={setQuery} handleClose={handleClose} />
        {children}
      </nav>
    );
  }
