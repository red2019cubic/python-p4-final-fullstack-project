import React, { useEffect, useState } from "react";
import "./ViewEmployee.css";
import Header from "./Header.js";
import Footer from "./Footer.js";
import "./Header.css";
import "./Footer.css"


function ViewEmployee() {
    const [data, setData] = useState({}); // Your updated data
    const [response, setResponse] = useState(null);
  


      const payload = {
        // Your updated data goes here
        name: '',
        username: '',
      };
  
      // Make a PATCH request
      const handleUpdate = (id) => {
        fetch('/employees/${id}', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // You may need to include other headers like authentication tokens here
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          // Handle the response (success or error)
          setResponse(response);
          return response.json();
        })
        .then((data) => {
          // Handle the data received after the update
          setData(data);
        })
        .catch((error) => {
          // Handle any errors that occur during the fetch request
          console.error('Error:', error);
        });
    
    };


  
  
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  try {
    useEffect(() => {
      fetch("/employees").then((response) => {
        if (response.ok) {
          response.json().then((employee) => setEmployees(employee));
        }
      });
    }, []);
  } catch (error) {
    console.error(error);
  }
  const handleDelete = (id) => {
    fetch(
      `/employees/${id}`,
      { method: "DELETE" }
    ).then((res) => {
      alert(`${res.name} Record Deleted Successfully`);
    });
  };
  return (
   <>
     <Header /> 
    <div className="table-responsive-sm">
      <div className="formsearch">
        <input
          type="search"
          className="form-control1"
          id="datatable-search-input"
          placeholder="Search Employee By Name"
          aria-label="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div class="outer-wrapper">
        <div class="table-wrapper">
          <table className="styled-table">
            <thead>
              <tr>
                <th scope="col">Employee ID</th>
                <th scope="col">Name</th>
                <th scope="col">Admin</th>
                <th scope="col">Loged IN</th>
                <th scope="col">Loged OUT</th>
                <th scope="col">Delete/Update</th>
              </tr>
            </thead>
            <tbody>
              {employees
                .filter((employee) => {
                  return search?.toLowerCase() === ""
                    ? employee
                    : employee.name?.toLowerCase().includes(search) ||
                        employee.name?.toUpperCase().includes(search) ||
                        (
                          employee.name?.charAt(0)?.toUpperCase() +
                          employee.name?.substr(1, employee.name.length)
                        ).includes(search);
                })
                .map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.admin}</td>
                    <td>{employee.clocked_in}</td>
                    <td>{employee.clocked_in}</td>

                    <td>
                      <button id="btndelete" 
                        onClick={() => handleDelete(employees.id)}>Delete</button>
                      <button id="btnupdate" onClick={() => handleUpdate(employees.id)}>Update</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Footer /> 
    </>
  );
}

export default ViewEmployee;
