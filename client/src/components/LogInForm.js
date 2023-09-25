import React, { useState } from "react";
import axios from "axios";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5555/login",
        formData
      );

      console.log(response.data);
      // Handle successful login, e.g., redirect to a dashboard.
    } catch (error) {
      console.error(error);
      // Handle login error.
    }
  };

  return (
    <div className="container">
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
          <br/>
          <form onSubmit={handleSubmit} action="/login" method="POST">
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
              <label htmlFor="password">Password</label>
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
            <br/>
            <button type="submit" className="btn btn-primary" style={{marginRight:"20px"}}>
              LogIn
            </button>
           
            <a href="/signup" className="btn btn-primary">
              SignUp
            </a>
        
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
