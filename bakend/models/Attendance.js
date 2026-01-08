// attendence-system\backend\models\Attendance.js
const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    student: { type: String, required: true },
    codeEntered: { type: String, required: true },
    ip: { type: String, required: true },
    period: { type: Number, required: true },  // Period number (1 to 6)
    subject: { type: String, required: true }, // Subject name
    date: { type: String, default: new Date().toISOString().split('T')[0] }, // YYYY-MM-DD format
    time: { type: Date, default: Date.now }
});

const AttendanceRecord = mongoose.model('AttendanceRecord', AttendanceSchema);

module.exports = AttendanceRecord;