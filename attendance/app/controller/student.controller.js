const Student = require('../models/student.model.js');
const classController = require('./class.controller.js');
exports.create = async(req,res) => {
    if(!req.body.name||!req.body.rollNumber||!req.body.classId) {
        return res.status(400).send({
            message:"Name shouldnot be empty"
        });
    }
    const studentSchema = new Student({
        name: req.body.name,
        attendance: 0,
        classId: req.body.classId,
        rollNumber: req.body.rollNumber,
        parentPhoneNumber: req.body.parentPhoneNumber||"NA"
    });
    var isClassAvailable =false;
await classController.isClassAvailable(req.body.classId, res => {
    isClassAvailable = res;
});
console.log(isClassAvailable);
    if(isClassAvailable) {
        studentSchema.save().then(data => {
            classController.addStrength(req.body.classId);
            res.send(data);
        }).catch(err => {
            res.status(500).send(
                {
                    message: "Server Error" || err
                }
            );
        })
    } else {
        res.send({
            message: "Class not available"
        })
    }
}


exports.findAll = (req,res) => {
    Student.find({classId:req.params.classId}).then(students => {
        res.send(students);
    }).catch(err => {
        res.status(500).send({
            message: "Server Error"||err
        })
    })   
   }

   // Update a Class identified by the classId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Name can not be empty"
        });
    }

    // Find note and update it with the request body
    Student.findByIdAndUpdate(req.params.studentId, {
        name: req.body.name,
        parentPhoneNumber: req.body.parentPhoneNumber
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.studentId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.studentId
        });
    });
};


// Update a Class identified by the classId in the request
exports.addAttendance = (req, res) => {
    // Validate Request

    Student.findById(req.params.studentId)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.studentId
            });            
        }
        // Find Studnet and update attendance it with the request body
    Student.findByIdAndUpdate(req.params.studentId, {
        attendance: student.attendance + 1,
    }, {new: true})
    .then(note => {
        res.send(note);
    }).catch(err => {
        return res.status(500).send({
            message: "Error updating note with id " + req.params.studentId
        });
    });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.studentId
        });
    });
};


// Find a single note with a noteId
exports.findOne = (req, res) => {
    Student.findById(req.params.studentId)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.studentId
            });            
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.studentId
        });
    });
};
