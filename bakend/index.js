// attendence-system\backend\index.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const attendanceRoutes = require('./routes/attendanceRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(express.json());


connectDB();

 
app.use('/api/attendance', attendanceRoutes);

 
app.use(express.static(path.join(__dirname, 'frontend')));

// Example API
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend working!" });
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

