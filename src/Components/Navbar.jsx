import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import Profile from "./Profile";
import { Menu } from "lucide-react";
import { FaGear } from "react-icons/fa6";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };
  return (
    <div className="navbar flex justify-between w-11/12 mx-auto bg-base-100 shadow-sm">
      <div className="">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <Menu></Menu>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/"> Home </NavLink>
            </li>
            <li>
              <NavLink to="/all-products">All Products </NavLink>
            </li>
            <li>
              <NavLink to="/my-imports">My Imports</NavLink>
            </li>
            <li>
              <NavLink to="/my-exports">My Exports</NavLink>
            </li>
            <li>
              <NavLink to="/add-export">Add Export</NavLink>
            </li>
          </ul>
        </div>
        <Link to="/" className="text-accent text-xl font-bold">
          Inter<span className="text-secondary">Trade</span>
        </Link>
      </div>
      <div className=" hidden lg:flex">
        <ul className="menu menu-horizontal px-1 items-center">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/all-products">All Products </NavLink>
          </li>
          <li>
            <NavLink to="/my-imports">My Imports</NavLink>
          </li>
          <li>
            <NavLink to="/my-exports">My Exports</NavLink>
          </li>
          <li>
            <NavLink to="/add-export">Add Export</NavLink>
          </li>
          

          <input
            onChange={(e) => handleTheme(e.target.checked)}
            type="checkbox"
            defaultChecked={localStorage.getItem("theme") === "dark"}
            className="toggle"
          />
        </ul>
      </div>
      <div>
        <Profile></Profile>
      </div>
    </div>
  );
};

export default Navbar;
