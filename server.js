const express = require("express");
const studentsRoutes = require('./src/student/routes');

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello Pevita!"); 
});

app.use("/api/v1/students", studentsRoutes);

app.listen(port, () => console.log(`App listening on port ${port}`));
