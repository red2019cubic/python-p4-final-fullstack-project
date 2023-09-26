import React from 'react';
import './Footer.css'; // You can create a separate CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">

          <div className="footer-social">
            <ul>
              <li><a href="#"><i className="fab fa-facebook"></i></a></li>
              <li><a href="#"><i className="fab fa-twitter"></i></a></li>
              <li><a href="#"><i className="fab fa-instagram"></i></a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Amazon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
