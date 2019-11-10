const mongoose = require('mongoose');

const ClassSchema = mongoose.Schema({
    name: String,
    strength: Number,
    totalAttendance: Number
},
{
    timeStamps: true
});

module.exports = mongoose.model('ClassScema', ClassSchema);