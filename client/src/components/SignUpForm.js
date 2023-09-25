import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./Header.js"
import "./Header.css"


function SignUpForm({ updateUser }) {
  // const [userData, setUserData] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });
  const [errors, setErrors] = useState([]);
  // const navigate = useNavigate();
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const config = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       name: userData.name,
  //       password: userData.password,
  //     }),
  //   };
  //   fetch("/login", config).then((resp) => {
  //     if (resp.ok) {
  //       resp.json().then((user) => {
  //         updateUser(user);
  //         navigate("/");
  //       });
  //     } else {
  //       resp.json().then((data) => {
  //         setTimeout(() => {
  //           setErrors([]);
  //         }, 3000);
  //         setErrors(data.errors);
  //       });
  //     }
  //   });
  // };

  return (
    <>
    <Header />
    <div className="container" >
      <div className="row justify-content-center">
        <div className="col-sm-8">
        <h2
            className="row justify-content-center" 
            style={{ color: "darkorange" }}
          >
            CVG9 Employee Login
          </h2>
          <br/>

          <div>
            <img
              className="row justify-content-center" style={{width:"100%", marginLeft:"5px"}}
              src="https://t4.ftcdn.net/jpg/06/29/59/93/240_F_629599337_BHJl5tJee7b5GtRZUOTylDwRR4N4chSZ.jpg"
            />
 
          </div>
        <form action="/signup" method="POST">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="email"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              name="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              name="username"
            />
          </div>
          <div className="mb-3">
            <label  htmlFor = "admin" className="form-label">
              Admin:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter 0 or 1"
              name="admin"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pwd" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="pwd"
              placeholder="Enter password"
              name="password"
            />
          </div>
 

            <a href="/login" className="btn btn-primary">
            LogIn
            </a>
          

        </form>

        </div>

      </div>
    </div>
    </>
  );
}

export default SignUpForm;
