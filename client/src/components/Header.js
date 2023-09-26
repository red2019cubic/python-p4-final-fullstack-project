import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="fixed-header">
        <div className="container">
          <ul>
            <li>
              <Link to="/"> Home</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/view">View Employees</Link>
            </li>
            <li>
              <div className="footer-logo">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxGUNWjxAr_TssIaqIwqDUDRb4maXS_ni068VKW7Vpbw&s"
                  alt="Logo"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
