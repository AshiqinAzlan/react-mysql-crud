import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigate } from "react-router-dom";

function CreateStudent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [marks, setMarks] = useState("");
  const [grade, setGrade] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate(); // useNavigate hook to navigate programmatically

  function handleSubmit(e) {
    e.preventDefault(); // Prevent the default form submission behavior
    axios
      .post("http://localhost:5001/create", { name, email, marks, grade, city })
      .then((res) => {
        console.log(res);
        alert("Student created successfully!");
        navigate("/"); // Navigate to the homepage after successful submission
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to create student. Please try again.");
      });
  }

  return (
    <div>
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
          <form onSubmit={handleSubmit}>
            <h2>Add Student</h2>
            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={name} // Controlled component for name
                onChange={(e) => setName(e.target.value)} // Update name state when input value changes
              />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                value={email} // Controlled component for email
                onChange={(e) => setEmail(e.target.value)} // Update email state when input value changes
              />
            </div>
            <div className="mb-3">
              <label>Marks</label>
              <input
                type="text"
                className="form-control"
                value={marks} // Controlled component for name
                onChange={(e) => setMarks(e.target.value)} // Update name state when input value changes
              />
            </div>
            <div className="mb-3">
              <label>Grade</label>
              <input
                type="text"
                className="form-control"
                value={grade} // Controlled component for name
                onChange={(e) => setGrade(e.target.value)} // Update name state when input value changes
              />
            </div>
            <div className="mb-3">
              <label>City</label>
              <input
                type="text"
                className="form-control"
                value={city} // Controlled component for name
                onChange={(e) => setCity(e.target.value)} // Update name state when input value changes
              />
            </div>
            <button className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateStudent;
