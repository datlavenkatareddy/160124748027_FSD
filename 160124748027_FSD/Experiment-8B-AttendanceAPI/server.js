const express = require("express");
const fs = require("fs");
const csv = require("csv-parser");
const app = express();
app.use(express.json());
let students = [];
fs.createReadStream("students.csv").pipe(csv()).on("data", row => students.push(row)).on("end", () => console.log("CSV loaded"));
app.get("/students", (req, res) => res.json(students));
app.get("/students/low", (req, res) => res.json(students.filter(s => Number(s.Attendance) < 65)));
app.get("/students/high", (req, res) => res.json(students.filter(s => Number(s.Attendance) > 75)));
app.get("/students/:rollno", (req, res) => {
  const student = students.find(s => s.RollNo === req.params.rollno);
  if (!student) return res.status(404).json({ message: "Student not found" });
  res.json(student);
});
app.post("/students", (req, res) => { students.push(req.body); res.status(201).json(req.body); });
app.put("/students/:rollno", (req, res) => {
  const index = students.findIndex(s => s.RollNo === req.params.rollno);
  if (index === -1) return res.status(404).json({ message: "Student not found" });
  students[index] = { ...students[index], ...req.body };
  res.json(students[index]);
});
app.delete("/students/:rollno", (req, res) => {
  const oldLength = students.length;
  students = students.filter(s => s.RollNo !== req.params.rollno);
  if (students.length === oldLength) return res.status(404).json({ message: "Student not found" });
  res.json({ message: "Student deleted successfully" });
});
app.listen(3000, () => console.log("Server running on port 3000"));
