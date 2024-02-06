// Pada file db.js

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'students',
  password: '',
  port: 5432, // Port default PostgreSQL
});

module.exports = pool;





// const Pool = require("pg").Pool;

// const pool = new Pool({
//     user: "postgres",
//     host: "localhost",
//     database: "students",
//     password: 566666,
//     port: 5432,
// });

// module.export = pool;
