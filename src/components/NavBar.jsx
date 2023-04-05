import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// importing icons
import homeIcon from "../assets/icons/homeIcon.svg";
import calendarIcon from "../assets/icons/calendarIcon.png";
import sharingIcon from "../assets/icons/shareIcon.svg";

const NavBar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const pages = [
    {
      icon: homeIcon,
      label: "Home",
    },
    {
      icon: calendarIcon,
      label: "dashboard",
    },
    {
      icon: sharingIcon,
      label: "social",
    },
  ];

  const handleItemClick = (index) => {
    setActiveIndex(index);
    navigate(`/${pages[index].label}`);
  };

  return (
    <div className="nav-bar">
      {pages.map((item, index) => (
        <div
          key={index}
          className={`nav-item ${activeIndex === index ? "active" : ""}`}
          onClick={() => handleItemClick(index)}
        >
          <img className="icon" src={item.icon} alt={item.label} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default NavBar;
