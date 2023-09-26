import React from "react";
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home"
import { useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";

// import { useNavigate } from "react-router-dom"
function App() {
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
//  const navigate = useNavigate()
 const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5555/login",
        formData
      );

      console.log(response.data);
    //  navigate("/")
      // Handle successful login, e.g., redirect to a dashboard.
    } catch (error) {
      console.error(error);
      // Handle login error.
    }
  };

  return (
    <div className="App">
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
             <Route path="/login" element={<LogInForm handdleSubmit={handleSubmit} />} /> */}
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
           
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
