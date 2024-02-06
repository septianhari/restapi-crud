// Define SQL queries for CRUD operations on the 'students' table

// Get all students
const getStudents = "SELECT * FROM students";

// Get a student by ID
const getStudentById = "SELECT * FROM students WHERE id = $1";

// Check if email already exists
const checkEmailExists = "SELECT s FROM students s WHERE s.email = $1";

// Add a new student
const addStudent = "INSERT INTO students (name, email, age, dob) VALUES ($1, $2, $3, $4)";

// Remove a student by ID
const removeStudent = "DELETE FROM students WHERE id = $1";


// Update a student by ID
const updateStudent = "UPDATE students SET name = $1 WHERE id = $2";

module.exports = {
    getStudents,
    getStudentById,
    checkEmailExists,
    addStudent,
    removeStudent,
    updateStudent,
};
