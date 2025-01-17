import React from "react";
import "./navbar.css"; // Make sure this import is correct
import { useState } from "react";
import { Link } from 'react-router-dom';


const Navbar = () => {
  // Track the active menu item
  const [activeItem, setActiveItem] = useState(null);

  const handleClick = (item) => {
    setActiveItem(item); // Set the active item on click
  };

  return (
    <div className="navbar ">
      <div className="logo-container">
              <img src="/logo.png" alt="Logo" width={'40px'} className="pb-2 m-2"/>

              <Link to="/" className="navbar-title custom-link">Crypto</Link>
              </div>   


      <ul className=" flex-fill d-flex flex-column align-items-center ">
        <li
          className={activeItem === "home" ? "btn-grad" : ""}
          onClick={() => handleClick("home")}
        >
          <a href="#home" >Home</a>
        </li>
        <li
          className={activeItem === "about" ? "btn-grad" : ""}
          onClick={() => handleClick("about")}
        >
          <a href="#about">About</a>
        </li>
        <li
          className={activeItem === "services" ? "btn-grad" : ""}
          onClick={() => handleClick("services")}
        >
          <a href="#services">Services</a>
        </li>
        <li
          className={activeItem === "projects" ? "btn-grad" : ""}
          onClick={() => handleClick("projects")}
        >
          <a href="#projects">Projects</a>
        </li>
        <li
          className={activeItem === "contact" ? "btn-grad" : ""}
          onClick={() => handleClick("contact")}
        >
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
