import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Dashboard.css";

function Dashboard() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const formattedTime = currentDate.toLocaleTimeString();

  useEffect(() => {
    fetch("/checksession", {}).then((r) => {
      if (r.ok) {
        r.json().then((userData) => setUserData(userData));
      }
    });
  }, []);

  if (loading) {
    setLoading(loading);
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className="content">
      <h1 style={{ color: "green", fontWeight: "bold"}}>Welcome {userData.name}</h1>
        <h2>
            <br/>
          Your Assignment For Today's Date {formattedDate} {formattedTime}
        </h2>
        <h2 style={{ color: "darkgreen" }}>{userData.task}</h2>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <Footer />
    </>
  );
}

export default Dashboard;
