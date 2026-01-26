const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'Mudeer1#', // From your terminal log
    database: 'test',     // Ensure this database exists in MySQL
    port: 3307           // From your terminal log
});

conn.connect(err => {
    if (err) {
        console.error('Connection failed: ' + err.message);
        return;
    }
    console.log('MySQL Connected successfully on port 3307!');
});

module.exports = conn;