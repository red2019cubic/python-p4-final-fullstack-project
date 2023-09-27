import React from "react";
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import ViewEmployee from "./ViewEmployee";
import { useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import Logout from "./Logout";

function App() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5555/login",
        formData
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={<LogInForm handleSubmit={handleSubmit} />}
            />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/view" element={<ViewEmployee />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
