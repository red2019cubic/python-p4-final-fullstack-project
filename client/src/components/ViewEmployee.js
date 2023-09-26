import React, { useEffect, useState } from "react";
import "./ViewEmployee.css";
import Header from "./Header.js";
import Footer from "./Footer.js";
import "./Header.css";
import "./Footer.css";

function ViewEmployee() {
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
    fetch(`/employees/${id}`, { method: "DELETE" }).then((res) => {
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
                        <button
                          id="btndelete"
                          onClick={() => handleDelete(employees.id)}
                        >
                          Delete
                        </button>
          
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
