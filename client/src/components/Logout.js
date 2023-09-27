import React from "react";
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import "./Logout.css"
import ViewEmployee from "./ViewEmployee";
function Logout() {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
              navigate('/')
            }
          });
        }
      
      
      return (
        <>
        <Header />
        <br /> <br /> <br /> <br /> <br />
        <div className="row justify-content-center">
            <h2>Are you sure you want to log out?</h2>
          <button style={{width:"200px"}}className="btn btn-primary" onClick={handleLogout}>Logout</button>
        </div>
        <br /> <br /> <br /> <br /> <br />
      
        <Footer />
        </>
      );
    };

export default Logout;
