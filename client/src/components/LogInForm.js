import React, { useState } from "react";
import axios from "axios";
import Header from "./Header.js";
import Footer from "./Footer.js";
import "./Header.css";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5555/login",
        formData
      );

      console.log(response.data);
      navigate("/dashboard");
      // Handle successful login, e.g., redirect to a dashboard.
    } catch (error) {
      console.error(error);
      // Handle login error.
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-8">
            <br />

            <br />
            <form onSubmit={handleSubmit} method="POST">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Email:
                </label>

                <input
                  type="text"
                  id="username"
                  className="form-control"
                  placeholder="Enter your email"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <br />
              <button
                type="submit"
                className="btn btn-primary"
                style={{ marginRight: "20px" }}
              >
                LogIn
              </button>

              <a href="/signup" className="btn btn-primary">
                SignUp
              </a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
