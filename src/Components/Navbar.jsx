import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import Profile from "./Profile";
import { Menu } from "lucide-react";

const Navbar = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const navLinkStyle = ({ isActive }) =>
    `px-3 py-2 rounded-lg font-medium transition-colors duration-200
     ${
       isActive
         ? "text-accent bg-accent/10"
         : "text-base-content hover:text-accent hover:bg-base-200"
     }`;

  return (
    <header className="sticky top-0 z-50 bg-base-100 shadow-sm">
      <div className="navbar w-11/12 mx-auto">
        {/* Left */}
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <Menu size={22} />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-56 rounded-xl bg-base-100 p-2 shadow"
            >
              <li><NavLink to="/" className={navLinkStyle}>Home</NavLink></li>
              <li><NavLink to="/all-products" className={navLinkStyle}>All Products</NavLink></li>
              <li><NavLink to="/my-imports" className={navLinkStyle}>My Imports</NavLink></li>
              <li><NavLink to="/my-exports" className={navLinkStyle}>My Exports</NavLink></li>
              <li><NavLink to="/add-export" className={navLinkStyle}>Add Export</NavLink></li>
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-accent">
            Inter<span className="text-base-content">Trade</span>
          </Link>
        </div>

        {/* Center (Desktop Nav) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal items-center gap-1">
            <li><NavLink to="/" className={navLinkStyle}>Home</NavLink></li>
            <li><NavLink to="/all-products" className={navLinkStyle}>All Products</NavLink></li>
            <li><NavLink to="/my-imports" className={navLinkStyle}>My Imports</NavLink></li>
            <li><NavLink to="/my-exports" className={navLinkStyle}>My Exports</NavLink></li>
            <li><NavLink to="/add-export" className={navLinkStyle}>Add Export</NavLink></li>
          </ul>
        </div>

        {/* Right */}
        <div className="navbar-end gap-4">
          {/* Theme Toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-sm hidden md:inline">Dark</span>
            <input
              type="checkbox"
              className="toggle toggle-accent"
              onChange={(e) => handleTheme(e.target.checked)}
              defaultChecked={theme === "dark"}
            />
          </label>

          {/* Profile Menu */}
          <Profile />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
