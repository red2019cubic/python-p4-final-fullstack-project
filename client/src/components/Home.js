import React from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import LogInForm from "./LogInForm.js";
import "./Home.css";

const Home = () => {


  return (
    <>
      <Header />
      <div>
        <h2>Welcome To CVG9 Faststart System</h2>
        <h3>Login To view your assignment</h3>
      </div>

      <LogInForm />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Home;


