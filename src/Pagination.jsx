import React, { useEffect, useState } from "react";

function EmployeePagination() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return <TablePagination employees={employees} />;
}

function TablePagination({ employees }) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(employees.length / rowsPerPage);

  const startRow = (currentPage - 1) * rowsPerPage;
  const currentRows = employees.slice(startRow, startRow + rowsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Employee Data Table</h2>
      <table
        style={{
          alignItems: "center",
          width: "200%",
          bordercollapse: "collapse",
        }}
      >
        <thead>
          <tr
            style={{
              paddingTop: "12px",
              paddingBottom: "12px",
              textAlign: "left",
              backgroundColor: "#04AA6D",
              color: "white",
              border: "1px solid #ddd",
              padding: "8px",
            }}
          >
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody
          style={{
            padding: "8px",
            border: "1px solid #ddd",
            textAlign: "left",
          }}
        >
          {currentRows.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ border: "1px #ddd", padding: "8px", alignItems: "center" }}>
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default EmployeePagination;
