import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faInfoCircle, faFilm, faTv, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Navbar({ isAuthenticated, setIsAuthenticated, user }) {
  const navigate = useNavigate();

  function handleLogout() {
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    navigate('/login');
  }

  return (
    <div className="d-flex justify-content-between align-items-center p-3 bg-dark text-light">
      <h1 className="m-0">PopcornStream</h1>

      {isAuthenticated && (
        <ul className="list-unstyled d-flex align-items-center m-0">
          <li className="px-2">
            <NavLink 
              to="/home" 
              className={({ isActive }) => isActive ? 'text-warning' : ''}>
              <FontAwesomeIcon icon={faHome} /> Home
            </NavLink>
          </li>
          <li className="px-2">
            <NavLink 
              to="/about" 
              className={({ isActive }) => isActive ? 'text-warning' : ''}>
              <FontAwesomeIcon icon={faInfoCircle} /> About
            </NavLink>
          </li>
          <li className="px-2">
            <NavLink 
              to="/movies" 
              className={({ isActive }) => isActive ? 'text-warning' : ''}>
              <FontAwesomeIcon icon={faFilm} /> Movies
            </NavLink>
          </li>
          <li className="px-2">
            <NavLink 
              to="/tvshow" 
              className={({ isActive }) => isActive ? 'text-warning' : ''}>
              <FontAwesomeIcon icon={faTv} /> Tvshow
            </NavLink>
          </li>
          
        
        <li className="px-2">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} size="lg" />
          </a>
        </li>
        <li className="px-2">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </a>
        </li>
        <li className="px-2">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
        </li>
        </ul>
      )}

      <ul className="list-unstyled d-flex align-items-center m-0">
        {isAuthenticated ? (
          <>
            <li className="px-2">Welcome, {user?.name || "User"}!</li>
            <li className="px-2">
              <button onClick={handleLogout} className="btn btn-primary">
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="px-2"><NavLink to="/login" className={({ isActive }) => isActive ? 'text-warning' : ''}>Login</NavLink></li>
            <li className="px-2"><NavLink to="/register" className={({ isActive }) => isActive ? 'text-warning' : ''}>Register</NavLink></li>
          </>
        )}

      </ul>
    </div>
  );
}
