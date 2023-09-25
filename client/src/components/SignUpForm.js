import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";


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
  const divStyle = {
    color:"orange",
    backgroundColor: "darkblue",
    width: '100%',
    height: '100%',
  };
  return (
    <div className="container" >
      <div className="row justify-content-center">
        <div className="col-sm-8">
          <h1 className="row justify-content-center" style={{backgroundColor: "darkblue", color:"darkorange",}}>CVG9 Employee Login</h1>
          <br/>
          <br/>
          <br/>
        <form action="/signup" method="POST">
          <div className="form-group">
            <label for="name" className="form-label">
              Name:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your name"
              name="name"
            />
          </div>
          <div className="form-group">
            <label for="email" className="form-label">
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
            <label for="pwd" className="form-label">
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
          <div className="form-check mb-3">
            <label className="form-check-label">
              <input className="form-check-input" type="checkbox" name="remember" />{" "}
              Remember me
            </label>
          </div>
          <button type="submit" className="btn btn-primary" style={{marginRight:"20px"}}>
              LogIn
            </button>
          

        </form>

        </div>

      </div>
    </div>
  );
}

export default SignUpForm;
