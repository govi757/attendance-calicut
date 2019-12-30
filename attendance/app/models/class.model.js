const mongoose = require('mongoose');

const ClassSchema = mongoose.Schema({
    name: String,
    strength: Number,
    totalAttendance: Number,
    userId: String,
    trackAttendance: Array
},
{
    timeStamps: true
});

module.exports = mongoose.model('ClassScema', ClassSchema);