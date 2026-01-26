const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const conn = require('./db'); // Import connection from db.js
const app = express();

// Middleware [cite: 117-119]
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public')); // Serves validation.js

// 1. Root Route: Serve Registration Page [cite: 121]
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'registration.html'));
});

// 2. Handle Registration [cite: 137-140]
app.post('/register', (req, res) => {
    const { firstName, surname, email, password } = req.body;
    const sql = "INSERT INTO users (first_name, surname, email, password) VALUES (?, ?, ?, ?)";
    conn.query(sql, [firstName, surname, email, password], (err, result) => {
        if (err) throw err;
        res.sendFile(path.join(__dirname, 'success.html'));
    });
});

// 3. Task 1: Serve Login Page [cite: 323-326]
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// 4. Task 1: Handle Login Authentication [cite: 330-346]
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    // SQL query for login [cite: 332]
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    conn.query(sql, [email, password], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            // Login successful [cite: 337]
            res.sendFile(path.join(__dirname, 'dashboard.html'));
        } else {
            // Login failed [cite: 340-343]
            res.send(`<h2>Invalid Email or Password</h2><a href="/login">Try Again</a>`);
        }
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});