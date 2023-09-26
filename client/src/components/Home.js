import React from "react";
// import {useState } from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import LogInForm from "./LogInForm.js";
import "./Home.css"

import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5555/home")
      .then((r) => r.json())
      .then((userData) => {
        setUserData(userData);
        console.log(userData);
      });
  }, []);
  console.log(userData);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div>
        <h2 >Welcome To CVG9 Faststart System</h2>
        <h3>Login To view your assignment</h3>
      </div>
      
      <LogInForm />
      <br/>
      <br/>
      <Footer />
    </>
  );
};

export default Home;

// function Home({username}) {

//   return (
//     <>
//     <Header/>
//     <h1 className="row justify-content-center" style={{color:"darkorange", }}>CVG9 FastStar Employee Management System</h1>
//     <h2 className="row justify-content-center" style={{color:"darkorange", }}>LogIn to view you today's assignment</h2>
//     <LoginForm />
//     <label>{username}</label>

//     <Footer />

//     </>

//   )
// }

// export default Home;
