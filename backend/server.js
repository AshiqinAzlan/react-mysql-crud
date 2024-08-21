const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");

// Enable CORS for all routes
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();

// Create a MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Route to get all data
app.get("/", (req, res) => {
  const sql = "SELECT * FROM student";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Route to create a new student
app.post("/create", (req, res) => {
  const sql =
    "INSERT INTO student(name, email, marks, grade, city) VALUES (?, ?, ?, ?, ?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.marks,
    req.body.grade,
    req.body.city,
  ];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Failed to create student:", err); // Log the specific error
      return res
        .status(500)
        .json({ error: "Failed to create student.", details: err }); // Send detailed error response
    }
    return res
      .status(201)
      .json({ message: "Student created successfully!", data });
  });
});

// Route to update an existing student
app.put("/update/:id", (req, res) => {
  const sql =
    "UPDATE student SET `name` = ?, `email` = ?, `marks` = ?, `grade` = ?, `city` = ? WHERE id = ?";
  const values = [
    req.body.name, // Get name from request body
    req.body.email, // Get email from request body
    req.body.marks, // Get marks from request body
    req.body.grade, // Get grade from request body
    req.body.city, // Get city from request body
  ];
  const id = req.params.id; // Get student ID from route parameters

  db.query(sql, [...values, id], (err, data) => {
    if (err) {
      return res.json(err); // Send error response if query fails
    }
    return res.json(data); // Send success response with data
  });
});

// Route to delete a student
app.delete("/student/:id", (req, res) => {
  const sql = "DELETE FROM student WHERE id = ?";
  const id = req.params.id; // Get student ID from route parameters

  db.query(sql, [id], (err, data) => {
    if (err) {
      return res.json(err); // Send error response if query fails
    }
    return res.json(data); // Send success response with data
  });
});

// Route to get a single student by ID
app.get("/student/:id", (req, res) => {
  const sql = "SELECT * FROM student WHERE id = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (data.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.json(data[0]); // Send the student data
  });
});

app.listen(5001, () => {
  console.log("Server started on Port 5001");
});
