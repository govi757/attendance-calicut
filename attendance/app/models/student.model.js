const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    name: String,
    rollNumber: String,
    parentPhoneNumber: String,
    attendance:Number,
    classId:String
},
{
    timeStamps: true
});
module.exports = mongoose.model('Student', StudentSchema);