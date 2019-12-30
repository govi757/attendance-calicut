const mongoose = require('mongoose');

const TotalAttendance = mongoose.Schema({
    classId: String,
    rollNumbers: Array
},
{
    timeStamps: true
});

module.exports = mongoose.model('TotalAttendance', TotalAttendance);