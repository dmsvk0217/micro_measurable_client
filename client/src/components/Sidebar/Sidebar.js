// Sidebar.js
import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { FaRegMap } from "react-icons/fa";
import { LiaDatabaseSolid } from "react-icons/lia";
import { GoGraph } from "react-icons/go";

function Sidebar({ isOpen, onClose }) {
  const sidebarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
    <div className={`sidebar ${isOpen ? "open" : ""}`} ref={sidebarRef}>
        <div className="side-header">
            <p>App Name</p>
        </div>
        <ul className="side-nav-links">
            <li>
                <FaRegMap className="map-icon"/>
                <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive ? "nav-link-side-active" : "nav-link-side"
                }
                onClick={handleLinkClick}
                >
                지도 보기
                </NavLink>
            </li>
            <hr className="side-div"></hr>
            <li>
                <LiaDatabaseSolid/>
                <NavLink
                to="/realTime"
                className={({ isActive }) =>
                    isActive ? "nav-link-side-active" : "nav-link-side"
                }
                onClick={handleLinkClick}
                >
                실시간 정보 보기
                </NavLink>
            </li>
            <hr className="side-div"></hr>
            <li>
                <GoGraph/>
                <NavLink
                to="/statisticsDay"
                className={({ isActive }) =>
                    isActive ? "nav-link-side-active" : "nav-link-side"
                }
                onClick={handleLinkClick}
                >
                통계 보기
                </NavLink>
            </li>
            <hr className="side-div"></hr>
        </ul>
    </div>
    <span className={`nav-back ${isOpen ? "open" : ""}`} onClick={onClose}></span>
    </>
  );
}

export default Sidebar;
