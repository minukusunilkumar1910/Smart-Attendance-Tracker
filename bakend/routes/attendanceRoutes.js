// attendence-system\backend\routes\attendanceRoutes.js
const express = require('express');
const Attendance = require('../models/Attendance');
const router = express.Router();

let currentCode = {}; // Use let to allow reassignment

// Generate attendance code
router.post('/generate-code', (req, res) => {
    const { period, subject } = req.body;
    if (!period || !subject) return res.status(400).json({ error: 'Period and Subject required' });

    const code = Math.floor(1000 + Math.random() * 9000).toString();
    currentCode = { code, period: parseInt(period, 10), subject, date: new Date().toISOString().split('T')[0] }; // Reassigning currentCode

    console.log('Generated Code:', currentCode);
    res.json(currentCode);
});

// Submit Attendance
router.post('/submit-attendance', async (req, res) => {
    const { student, code, period } = req.body;
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    try {
        // Check for missing fields
        if (!student || !code || !period) {
            return res.status(400).json({ error: 'Student name, code, and period are required' });
        }

        // Validate the attendance code and period
        if (currentCode.code !== code) {
            return res.status(400).json({ error: 'Invalid attendance code' });
        }

        if (currentCode.period !== parseInt(period, 10)) {
            return res.status(400).json({ error: 'The selected period does not match the teacher\'s selected period' });
        }

        // Check if the student has already submitted attendance for today and the selected period
        const existingRecord = await Attendance.findOne({
            student,
            date: today,
            period: parseInt(period, 10) // Ensure the period is an integer
        });

        // If an existing record is found, return an error
        if (existingRecord) {
            return res.status(400).json({ error: 'Attendance already submitted for this period today.' });
        }

        // Create a new attendance record
        const newRecord = new Attendance({
            student,
            rollNumber: "", // Include roll number if needed
            codeEntered: code,
            period: parseInt(period, 10),
            subject: currentCode.subject,
            date: today,
            ip: req.ip
        });

        await newRecord.save();
        res.json({ message: 'Attendance recorded successfully!' });
    } catch (error) {
        console.error('Error submitting attendance:', error);
        res.status(500).json({ error: 'Failed to submit attendance' });
    }
});

// Other routes...


// ✅ Fetch all attendance records
router.get('/get-all-attendance', async (req, res) => {
    try {
        const { date } = req.query;
        const filter = date ? { date } : {}; // Filter by date if provided
        const records = await Attendance.find(filter).sort({ date: -1, period: 1 });

        res.json(records);
    } catch (error) {
        console.error('Error fetching attendance records:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// ✅ Update student's submitted code (Not commonly needed, but keeping it)
router.put('/update-code', async (req, res) => {
    const { student, newCode } = req.body;

    try {
        const updatedRecord = await Attendance.findOneAndUpdate(
            { student },
            { codeEntered: newCode },
            { new: true }
        );

        if (!updatedRecord) {
            return res.status(404).json({ message: 'Record not found' });
        }

        res.json(updatedRecord);
    } catch (error) {
        console.error('Error updating code:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;






// Add a new student
router.post('/students/add', async (req, res) => {
    const { name, rollNumber, password } = req.body;
    try {
        const newStudent = new Student({ name, rollNumber, password });
        await newStudent.save();
        res.status(201).json({ message: 'Student added successfully!' });
    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).json({ message: 'Failed to add student' });
    }
});

// Get all students
router.get('/students/get-all', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ message: 'Failed to fetch students' });
    }
});


router.post('/students/add', async (req, res) => {
    const { name, rollNumber, password } = req.body;
    try {
        const newStudent = new Student({ name, rollNumber, password });
        await newStudent.save();
        res.status(201).json({ message: 'Student added successfully!' });
    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).json({ message: 'Failed to add student' });
    }
});

router.get('/students/get-all', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {       
        console.error('Error fetching students:', error);
        res.status(500).json({ message: 'Failed to fetch students' });
    }
});

router.delete('/students/delete/:rollNumber', async (req, res) => {
    const { rollNumber } = req.params;
    try {
        await Student.findOneAndDelete({ rollNumber });
        res.json({ message: 'Student deleted successfully!' });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ message: 'Failed to delete student' });
    }
});


module.exports = router;
