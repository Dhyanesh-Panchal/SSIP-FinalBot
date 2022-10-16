const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    Name: String,
    EnrollmentNo: Number,
    PhoneNo: Number
})

module.exports = mongoose.model("Student", StudentSchema);