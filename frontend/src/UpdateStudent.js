import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateStudent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [marks, setMarks] = useState("");
  const [grade, setGrade] = useState("");
  const [city, setCity] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch student data when component mounts
  useEffect(() => {
    console.log("Fetching student data for ID:", id);
    axios
      .get(`http://localhost:5001/student/${id}`)
      .then((res) => {
        const student = res.data;
        console.log("Student data fetched:", student);
        setName(student.name);
        setEmail(student.email);
        setMarks(student.marks);
        setGrade(student.grade);
        setCity(student.city);
      })
      .catch((err) => {
        console.error("Error fetching student data:", err);
      });
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .put(`http://localhost:5001/update/${id}`, {
        name,
        email,
        marks,
        grade,
        city,
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.error("Update error:", err);
      });
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Update Student</h2>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Marks</label>
            <input
              type="text"
              className="form-control"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Grade</label>
            <input
              type="text"
              className="form-control"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>City</label>
            <input
              type="text"
              className="form-control"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateStudent;
