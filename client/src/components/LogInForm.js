import React, { useState } from "react";
import axios from "axios";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useFormik, handleSubmit } from "formik";
import { LogInSchema } from "./LogInSchema.js";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5555/login",
        formik.values
      );

      setFormData(response);
      navigate("/dashboard");
      setTimeout(() => navigate("/"), 5000);
    } catch (error) {
      alert("incorrect username or password");
   
    }
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LogInSchema,
    onSubmit,
  });

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-8">
            <br />

            <br />
            <form onSubmit={formik.handleSubmit} method="POST">
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
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.username && formik.touched.username && (
                  <span className="field-error">{formik.errors.username}</span>
                )}
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
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password && (
                  <span className="field-error">{formik.errors.password}</span>
                )}
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