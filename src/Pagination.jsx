import React, { useEffect, useState } from "react";

function EmployeePagination() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   fetch(
  //     "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setEmployees(data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setError("failed to fetch data");
  //       setLoading(false);
  //     });
  // }, []);

  // useEffect(() => {
  //   fetch(
  //     "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
  //   )
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setEmployees(data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError("failed to fetch data");
  //       setLoading(false);
  //       alert("failed to fetch data");
  //     });
  // }, []);
  // useEffect(() => {
  //   if (error) {
  //     alert(error);
  //   }
  // }, [error]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
      })
      .catch((error) => console.error("failed to fetch data:", error.message));
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
          width: "95vw",
          height: "40vw",
          border: "50px",
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
              border: "10px solid orange",
              padding: "20px",
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
            padding: "10px",
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
        <footer
          style={{
            display: "block",
            position: "absolute",
            height: "100%",
            width: "100%",
            textAlign: "center",
          }}
        >
          <button onClick={handlePrevious} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </button>
        </footer>
      </div>
    </div>
  );
}

export default EmployeePagination;
