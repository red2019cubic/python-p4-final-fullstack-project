import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./Header.js";
import "./Header.css";
import "./SignUp.css";
import axios from "axios";
import Footer from "./Footer.js";
import {  useFormik } from "formik"
import { SignUpSchema } from "./SignUpSchema.js";

function SignUpForm() {
  
    const [response, setResponse] = useState(null);
    const onSubmit = async (values, actions) => {
        
    
        try {
          const response = await axios.post("/employees", formData);
    
          console.log(response.data);
          navigate("/");
        } catch (error) {
          console.error(error);
        }
        actions.resetForm()
      };
    const formik = useFormik({
        initialValues:
        {
        name:"",
        username:"",
        admin:'',
        password:"",
    },
    validationSchema:SignUpSchema,
    onSubmit,
});
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


//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };
  const navigate = useNavigate();

  

  return (
    <>

      <Header />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-8">
            <h2 className="row justify-content-center">SignUp Form</h2>
            <br />

            <form onSubmit={formik.handleSubmit} autoComplete="off">
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
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}

                />
                {formik.errors.name && formik.touched.name  && (
                    <span className="field-error">{formik.errors.name}</span>
                )}
            
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
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.errors.username && formik.touched.username  && (
                    <span className="field-error">{formik.errors.username}</span>
                )}
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
                  value={formik.values.admin}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  
                />
                {formik.errors.admin && formik.touched.admin  && (
                    <span className="field-error">{formik.errors.admin}</span>
                )}
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
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  
                />
                {formik.errors.password && formik.touched.password  && (
                    <span className="field-error">{formik.errors.password}</span>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ marginRight: "20px" }}
              >
                Submit
              </button>

              <button
                disable={formik.isSubmitting}
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
     
    </>
  );
}

export default SignUpForm;
