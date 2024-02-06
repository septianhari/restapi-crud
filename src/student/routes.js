const { Router } = require('express');
const controller = require('./controller');

// Create a new instance of Express Router
const router = Router();

// Define routes with corresponding controller functions

// Route to get all students
router.get("/", controller.getStudents);

// Route to add a new student
router.post("/", controller.addStudent);

// Route to get a student by ID
router.get("/:id", controller.getStudentById);

// Route to update a student by ID
router.put("/:id", controller.updateStudent);

// Route to remove a student by ID
router.delete("/:id", controller.removeStudent);

// Export the router to be used in the main application
module.exports = router;
