import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Student() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5001/") // Send GET request to the server to fetch all students
      .then((res) => setStudents(res.data)) // Update state with the fetched data
      .catch((err) => console.log(err)); // Log any errors
  }, []);

  // Function to handle the deletion of a student
  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:5001/student/" + id); // Send DELETE request to the server with the student ID
      window.location.reload(); // Reload the page to reflect the changes
    } catch (error) {
      console.log(error); // Log any errors that occur during the deletion
    }
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-80 bg-white rounded p-3">
        <Link to={"/create"} className="btn btn-success">
          Add
        </Link>{" "}
        {/* Link to navigate to the create student page */}
        <table className="table">
          <thead>
            <tr>
              <th>Name</th> {/* Table header for student name */}
              <th>Email</th> {/* Table header for student email */}
              <th>Marks</th>
              <th>Grade</th>
              <th>City</th>
              <th>action</th> {/* Table header for actions (update/delete) */}
            </tr>
          </thead>

          <tbody>
            {students.map(
              (
                data,
                i // Map through the student array to display each student's details
              ) => (
                <tr key={i}>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.marks}</td>
                  <td>{data.grade}</td>
                  <td>{data.city}</td>
                  <td>
                    <Link to={`update/${data.id}`} className="btn btn-warning">
                      Update
                    </Link>

                    <button
                      className="btn btn-danger ms-2"
                      onClick={(e) => handleDelete(data.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Student;
