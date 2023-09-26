import React, {useEffect, useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Dashboard.css"

function Dashboard() {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();
    useEffect(() => {
      
          fetch("http://localhost:5555/home")
              .then((r) => r.json())
              .then((userData) => {
                setUserData(userData);
               console.log(userData)
              });
  
     
    }, []);
  console.log(userData)
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <>
      <Header />
      <br /><br /><br />
      <br /><br /><br />
      
      <div className="content">
   
        <h2>Your Assignment For Today {formattedDate } {formattedTime }</h2>
        <h2>{userData.task}</h2>
       
      </div>
      <br /><br /><br />
      <br /><br /><br />
     
      
      <Footer />
      </>
    );
  };

export default Dashboard;
