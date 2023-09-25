import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";

function LogInForm({ updateUser }) {
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
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div className="container" style={{color:"blue"}}>
      <div className="row justify-content-center">
        <div className="col-sm-8">
          <h2>CVG9 Employee Login</h2>
        <form action="/login" method="POST">
          <div class="form-group">
            <label for="email" class="form-label">
              Email:
            </label>
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="Enter email"
              name="username"
            />
          </div>
          <div class="mb-3">
            <label for="pwd" class="form-label">
              Password:
            </label>
            <input
              type="password"
              class="form-control"
              id="pwd"
              placeholder="Enter password"
              name="password"
            />
          </div>
          <div class="form-check mb-3">
            <label class="form-check-label">
              <input class="form-check-input" type="checkbox" name="remember" />{" "}
              Remember me
            </label>
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>

        </div>

      </div>
    </div>
  );
}

export default LogInForm;
