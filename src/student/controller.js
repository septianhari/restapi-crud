const pool = require('../../db');
const queries = require('./queries');

// Get all students
const getStudents = (req, res) => {
    pool.query(queries.getStudents, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Error retrieving students from the database.' });
        } else {
            res.status(200).json(results.rows);
        }
    });
};

// Get a student by ID
const getStudentById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getStudentById, [id], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Error retrieving student from the database.' });
        } else {
            const fetchedStudent = results.rows[0];

            if (fetchedStudent) {
                res.status(200).json(fetchedStudent);
            } else {
                res.status(404).json({ error: 'Student not found in the database.' });
            }
        }
    });
};

// Add a new student
const addStudent = (req, res) => {
    const { name, email, age, dob } = req.body;

    // Check if the email is already registered
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.rows.length) {
            // Email is already registered, send response to the client
            res.status(400).send("Email is already registered.");
        } else {
            // Email is not registered, add the student to the database
            pool.query(queries.addStudent, [name, email, age, dob], (error, results) => {
                if (error) {
                    console.error('Error executing query:', error);
                    res.status(500).send('Internal Server Error');
                } else {
                    // Student successfully added, send response to the client
                    res.status(201).send('Student Created Successfully!');
                }
            });
        }
    });
};

// Remove a student by ID
const removeStudent = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.removeStudent, [id], (error, results) => {
        if (error) {
            console.error("Error removing student:", error);
            res.status(500).send("Internal Server Error");
            return;
        }

        const noStudentFound = results.rows.length === 0;
        if (noStudentFound) {
            res.status(404).send("Student not found in the database");
        } else {
            res.status(200).send("Student removed successfully");
        }
    });
};

// Update a student by ID
const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    // Check if the student exists before updating
    pool.query(queries.getStudentById, [id], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (!results.rows.length) {
            return res.status(404).send("Student does not exist in the database");
        }

        // If the student exists, proceed with the update
        pool.query(queries.updateStudent, [name, id], (updateError, updateResults) => {
            if (updateError) {
                console.error('Error executing update query:', updateError);
                res.status(500).send('Internal Server Error');
                return;
            }

            res.status(200).send("Student updated successfully");
        });
    });
};

module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    removeStudent,
    updateStudent,
};
