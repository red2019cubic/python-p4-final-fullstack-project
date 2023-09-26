import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./Header.js";
import "./Header.css";
import "./SignUp.css";
import axios from "axios";
import Footer from "./Footer.js";
import { Formik, ErrorMessage } from "formik"
import * as Yup from "yup"

function SignUpForm() {
  
    const [response, setResponse] = useState(null);
   
    const [formData, setFormData] = useState({
        username: "",
        name: "",
        admin: "",
        password: "",
      });
  
      // Make a PATCH request
      const handleUpdate = (id) => {
        fetch('/employees/${id}', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // You may need to include other headers like authentication tokens here
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          // Handle the response (success or error)
          setResponse(response);
          return response.json();
        })
        .then((data) => {
          // Handle the data received after the update
          setFormData(data);
          alert("Employee Updated Successfully")
        })
        .catch((error) => {
          // Handle any errors that occur during the fetch request
          console.error('Error:', error);
        });
    
    };


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
      const response = await axios.post("/employees", formData);

      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(15, 'Too Long!')
      .required('Required'),
    admin: Yup.string()
      .email('Invalid admin code')
      .required('Required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Required'),
  });

  return (
    <>
    <Formik
    initialValue={{
        name:'',
        username:'',
        admin:"",
        password:"",
    }}
    validationSchema={SignupSchema}
    onSubmit={handleSubmit}
    />
      <Header />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-8">
            <h2 className="row justify-content-center">SignUp Form</h2>
            <br />

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input
                  type="name"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
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
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="admin" className="form-label">
                  Admin:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="admin"
                  placeholder="Enter 0 or 1"
                  name="admin"
                  value={formData.admin}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ marginRight: "20px" }}
              >
                Submit
              </button>

              <button
                
                onClick={() => handleUpdate(formData.id)}
                className="btn btn-primary"
                style={{ marginRight: "20px" }}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <Formik/>
    </>
  );
}

export default SignUpForm;
