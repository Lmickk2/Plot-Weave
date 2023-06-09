import { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import logoLarge from "../images/logo-large.png"
import logoSmall from "../images/logo-small.png"
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Header() {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <Link to="/" className="navbar-brand">
      <img src={logoSmall} id="logo-small" className="d-lg-none" alt=""></img>
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      onClick={toggleNavbar}
      aria-controls="navbarNav"
      aria-expanded={!collapsed}
      aria-label="Toggle navigation"
    >
        <FontAwesomeIcon icon={faBars} className="navbar-toggler-icon" style={{color: "#000000",}} />
      </button>
      <div className={`navbar-collapse ${collapsed ? 'collapse' : ''}`} id="navbarNav">
        <ul className="navbar-nav">
        <Link to="/"><img src={logoLarge} id="logo-large" className="navbar-brand d-none d-lg-block"></img></Link>
          <li className="nav-item">
            <Link to="/about" className="nav-link active" onClick={toggleNavbar}>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/community" className="nav-link active" onClick={toggleNavbar}>
            Community
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/create" className="nav-link" onClick={toggleNavbar}>
              Write
            </Link>
          </li>
        </ul>

        {Auth.loggedIn() ? (
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/me" className="nav-link active right" onClick={toggleNavbar}>
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link right" href="/" onClick={logout}>
                Logout
              </a>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/login" className="nav-link right" onClick={toggleNavbar}>
                Login
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Header;
