import { NavLink } from "react-router-dom";
import { FiFileText, FiGrid, FiHome } from "react-icons/fi";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <NavLink to="/" className="navbar-brand">
          <FiFileText />
          <span>CMS</span>
        </NavLink>

        <nav className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `navbar-link ${isActive ? "navbar-link-active" : ""}`
            }
          >
            <FiHome /> News
          </NavLink>

          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `navbar-link ${isActive ? "navbar-link-active" : ""}`
            }
          >
            <FiGrid /> Admin
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
