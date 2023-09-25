import React from "react";
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <main>
        <Router>
          <Routes>
            <Route path="/login" element={<LogInForm />} />
            <Route path="/signup" element={<SignUpForm />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
